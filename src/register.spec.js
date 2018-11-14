import { register } from '@storybook/addons'

jest.mock('@storybook/addons', () => ({ register: jest.fn() }))

const mockMetaTag = {
  setAttribute: jest.fn()
}

beforeEach(() => {
  jest.spyOn(document, 'createElement').mockImplementation(() => mockMetaTag)
  jest.spyOn(document.head, 'appendChild').mockImplementation(jest.fn)
})

afterAll(jest.restoreAllMocks)

// for now it's not possible to invalidate only './register' module,
// so I'm forced to do all tests on a single test.
//
// issue: https://github.com/facebook/jest/pull/6701
describe('register', () => {
  it('should call addons.register and add meta tag to head', () => {
    expect(register).not.toHaveBeenCalled()
    expect(document.createElement).not.toHaveBeenCalled()
    expect(mockMetaTag.setAttribute).not.toHaveBeenCalled()
    expect(document.head.appendChild).not.toHaveBeenCalled()

    require('./register')

    expect(register).toHaveBeenCalled()

    const callback = register.mock.calls[0][1]

    // calling callback
    callback()

    expect(document.createElement).toHaveBeenCalledWith('meta')
    expect(mockMetaTag.setAttribute).toHaveBeenCalledWith('name', 'viewport')
    expect(mockMetaTag.setAttribute).toHaveBeenCalledWith('content', 'initial-scale=1, maximum-scale=1, user-scalable=no')
    expect(document.head.appendChild).toHaveBeenCalledWith(mockMetaTag)
  })
})
