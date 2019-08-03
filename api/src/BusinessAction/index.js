import validate from 'validate.js'

class BusinessAction {
  static validates(constraints) {
    this.constraints = constraints
  }

  constructor(attributes) {
    this.attributes = attributes
    this.errors = {}
    this.valid = true
  }

  // Run validations
  validate() {
    const errors = validate(this.attributes, this.constructor.constraints);
    if (errors) this._addErrors(errors);
    return this.valid
  }

  perform() {
    if (!this.validate()) return false;
    return this._executePerform()
  }

  // Adds an error for a single field
  _addError(field, errorMessage) {
    this.valid = false
    this.errors[field] = this.errors[field] || []
    this.errors[field].push(errorMessage)
  }

  // Merges errors
  _addErrors(errors) {
    Object.entries(errors).forEach(([field, errorMessages]) =>
      errorMessages.forEach(
        errorMessage => this._addError(field, errorMessage)
      )
    )
  }
}

BusinessAction.constraints = {}

export default BusinessAction
