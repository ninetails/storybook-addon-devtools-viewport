const metaTag = document.createElement('meta')
metaTag.setAttribute('name', 'viewport')
metaTag.setAttribute('content', 'width=device-width, initial-scale=1')

export default story => {
  document.head.appendChild(metaTag)
  return story()
}
