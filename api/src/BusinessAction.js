import update from 'lodash.update'

import validate from '@src/validate'
import { sequelize } from '@src/db'

const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

class BusinesActionValidationError {
  constructor(ba, errors) {
    this.name = 'BusinesActionValidationError'
    this.businessAction = ba
    this.errors = ba.errors
  }
}

// Abstract class that implements command object pattern.
// These should be the building block for business logic.
// Organize BAs inside domains.
class BusinessAction {
  // These are options that sub-classes can use
  validationConstraints = {}
  runPerformWithinTransaction = false

  constructor(params) {
    this.params = params || {}

    this.errors = {}
    this.valid = true
  }

  async perform() {
    const valid = await this.validate()

    if (!valid) throw new BusinesActionValidationError(this)

    const result = await this.aroundPerform(this.executePerform.bind(this))

    // Errors could have been added during perform
    if (this.hasErrors()) throw new BusinesActionValidationError(this)

    return result
  }

  executePerform() { throw 'You must define this' }

  async aroundPerform(executePerform) {
    if (!this.runPerformWithinTransaction) return await executePerform()

    let result
    let error

    this.transaction = await sequelize.transaction()

    try {
      result = await executePerform()
    } catch(e) {
      error = e
      this.transaction.rollback()
    }

    this.transaction.commit()

    if (error) { throw error }

    return result
  }

  async validate() {
    try {
      await validate.async(this.params, this.validationConstraints)
    } catch(errors) {
      // The returned errors should be a plain object.
      // Otherwise it must be an error that was thrown while performing the validations
      // Validate.js interface is not very good...
      if (isPlainObject(errors)) {
        this.addErrorsPerField(null, errors)
      } else {
        throw(errors)
      }
    }

    this.valid = !this.hasErrors()

    return this.valid
  }

  hasErrors() {
    return !!(
      Object
        .entries(this.errors)
        .find(([field, errors]) => errors.length > 0 )
    )
  }

  addError(path, error) {
    if (!error) return
    update(this.errors, path, (errors = []) => [...errors, error])
  }

  addErrors(path, errors) {
    if (!errors || errors.length === 0) return
    errors.forEach(e => this.addError(path, e))
  }

  addErrorsPerField(path, errorsPerField) {
    Object
      .entries(errorsPerField)
      .forEach(([field, errorMessages]) => {
        const finalPath =
          [path, field]
            .filter(s => s !== '' && s !== undefined && s !== null)
            .join('.')

        this.addErrors(finalPath, errorMessages)
      })
  }
}

export { BusinesActionValidationError }
export default BusinessAction
