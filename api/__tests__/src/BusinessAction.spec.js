import BusinessAction from '@src/BusinessAction'

describe('BusinessAction', () => {
  const executePerform = jest.fn(_ => 'someReturnValue')
  const BA = class extends BusinessAction {
    _executePerform() {
      return executePerform()
    }
  }
  BA.validates({ someAttribute: { presence: true }})

  describe('#validate', () => {
    describe('when constraits are met', () => {
      it('informs so', () => {
        const ba = new BA({ someAttribute: 'someValue' })
        expect(ba.validate()).toEqual(true)
        expect(ba.errors).toEqual({})
      })
    })

    describe('when constraings are not met', () => {
      const ba = new BA({})
      expect(ba.validate()).toEqual(false)
      expect(ba.errors).toEqual({ someAttribute: ["Some attribute can't be blank"] })
    })
  })

  describe('#perform', () => {
    describe('when action is valid', () => {
      it('performs the action', () => {
        const ba = new BA({ someAttribute: 'someValue' })
        expect(ba.perform()).toEqual('someReturnValue')
        expect(ba.errors).toEqual({})
        expect(executePerform).toHaveBeenCalled()
      })
    })
  })
})
