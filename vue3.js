const javascript = require.resolve('./javascript.js')
const vue = require.resolve('./vue.js')

module.exports = {
  env: {
    'vue/setup-compiler-macros': true
  },
  extends: ['plugin:vue/vue3-recommended', vue, javascript]
}
