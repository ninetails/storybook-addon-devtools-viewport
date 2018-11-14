const mockMetaTag = {
  setAttribute: jest.fn()
}

const mockStory = jest.fn()

beforeEach(() => {
  jest.spyOn(document, 'createElement').mockImplementation(() => mockMetaTag)
  jest.spyOn(document.head, 'appendChild').mockImplementation(jest.fn)
})

afterAll(jest.restoreAllMocks)

// for now it's not possible to invalidate only './index' module,
// so I'm forced to do all tests on a single test.
//
// issue: https://github.com/facebook/jest/pull/6701
describe('index', () => {
  it('should call addons.register and add meta tag to head', () => {
    expect(document.createElement).not.toHaveBeenCalled()
    expect(mockMetaTag.setAttribute).not.toHaveBeenCalled()
    expect(document.head.appendChild).not.toHaveBeenCalled()

    const decorator = require('.').default

    expect(document.createElement).toHaveBeenCalledWith('meta')
    expect(mockMetaTag.setAttribute).toHaveBeenCalledWith('name', 'viewport')
    expect(mockMetaTag.setAttribute).toHaveBeenCalledWith('content', 'width=device-width, initial-scale=1')
    expect(document.head.appendChild).not.toHaveBeenCalled()
    expect(mockStory).not.toHaveBeenCalled()

    decorator(mockStory)
    expect(mockStory).toHaveBeenCalled()
    expect(document.head.appendChild).toHaveBeenCalledWith(mockMetaTag)
  })
})
