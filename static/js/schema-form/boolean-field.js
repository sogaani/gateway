/**
 * Input Field for JSON-schema type:boolean.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * This Source Code includes react-jsonschema-form
 * released under the Apache License 2.0.
 * https://github.com/mozilla-services/react-jsonschema-form
 * Date on whitch referred: Thu, Mar 08, 2018  1:08:52 PM
 */

'use strict';

const SchemaUtils = require('./schema-utils');
const Utils = require('../utils');

function BooleanField(schema,
                      formData,
                      idSchema,
                      name,
                      definitions,
                      onChange,
                      required = false,
                      disabled = false,
                      readonly = false) {
  this.schema = SchemaUtils.retrieveSchema(schema, definitions, formData);
  this.formData = formData;
  this.idSchema = idSchema;
  this.name = name;
  this.definitions = definitions;
  this.onChange = onChange;
  this.required = required;
  this.disabled = disabled;
  this.readonly = readonly;

  return this;
}

BooleanField.prototype.onBooleanChange = function(event) {
  this.formData = event.target.checked;

  if (this.onChange) {
    this.onChange(this.formData);
  }
};

BooleanField.prototype.render = function() {
  const id = Utils.escapeHtmlForIdClass(this.idSchema.$id);
  const value = this.formData;
  const field = document.createElement('span');
  field.className = 'checkbox';

  field.innerHTML = `
    <input
    type="checkbox"
    id="${id}"
    class="form-control"
    ${value ? 'checked' : ''}
    ${this.required ? 'required' : ''}
    ${this.readonly ? 'readonly' : ''}
    ${this.disabled ? 'disabled' : ''}
    />`;

  const input = field.querySelector(`#${id}`);
  input.onchange = this.onBooleanChange.bind(this);

  return field;
};

module.exports = BooleanField;
