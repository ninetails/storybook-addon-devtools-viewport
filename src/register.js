import addons from '@storybook/addons'

const metaTag = document.createElement('meta')
metaTag.setAttribute('name', 'viewport')
metaTag.setAttribute('content', 'initial-scale=1, maximum-scale=1, user-scalable=no')

addons.register('storybook-addon-fix-responsive-devtools', () => {
  document.head.appendChild(metaTag)
})
