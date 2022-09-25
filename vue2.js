const javascript = require.resolve('./javascript.js')
const vue = require.resolve('./vue.js')

module.exports = {
  extends: ['plugin:vue/recommended', vue, javascript]
}
