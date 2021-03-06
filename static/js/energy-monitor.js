/**
 * EnergyMonitor
 *
 * UI element representing a device which can monitor power usage.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const Thing = require('./thing');

class EnergyMonitor extends Thing {
  /**
   * EnergyMonitor Constructor (extends Thing).
   *
   * @param {Object} description Thing description object.
   * @param {String} format 'svg', 'html', or 'htmlDetail'.
   */
  constructor(description, format) {
    super(
      description,
      format,
      {
        baseIcon: '/optimized-images/thing-icons/energy_monitor.svg',
      }
    );
  }

  /**
   * Find any properties required for this view.
   */
  findProperties() {
    this.powerProperty = null;

    // Look for properties by type first.
    for (const name in this.displayedProperties) {
      const type = this.displayedProperties[name].property['@type'];

      if (type === 'InstantaneousPowerProperty') {
        this.powerProperty = name;
        break;
      }
    }

    // If necessary, match on name.
    if (this.powerProperty === null &&
        this.displayedProperties.hasOwnProperty('instantaneousPower')) {
      this.powerProperty = 'instantaneousPower';
    }
  }

  get icon() {
    return this.element.querySelector('webthing-energy-monitor-capability');
  }

  /**
   * Update the display for the provided property.
   * @param {string} name - name of the property
   * @param {*} value - value of the property
   */
  updateProperty(name, value) {
    super.updateProperty(name, value);

    if (!this.displayedProperties.hasOwnProperty(name)) {
      return;
    }

    if (name === this.powerProperty) {
      value = parseFloat(value);
      this.icon.power = value;
    }
  }

  iconView() {
    return `
      <webthing-energy-monitor-capability>
      </webthing-energy-monitor-capability>`;
  }
}

module.exports = EnergyMonitor;
