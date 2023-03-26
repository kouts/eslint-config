const base = require('./base')
const javascript = require('./javascript')
const vue = require('./vue')
const vue2 = require('./vue2')
const vue3 = require('./vue3')
const vue3Typescript = require('./vue3')
const nuxt3 = require('./nuxt3')

module.exports = {
  configs: {
    base,
    javascript,
    vue,
    vue2,
    vue3,
    'vue3-typescript': vue3Typescript,
    nuxt3
  }
}
