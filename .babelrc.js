module.exports = {
  "presets": [
    ["@babel/preset-env", { "targets": { "node": "current" } }]
  ],
  "plugins": [
    "@babel/plugin-transform-destructuring",
    "@babel/plugin-proposal-object-rest-spread"
  ]
}
