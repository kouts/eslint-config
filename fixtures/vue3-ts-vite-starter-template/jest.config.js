module.exports = {
  preset: 'ts-jest',
  // Workaround for https://github.com/kulshekhar/ts-jest/issues/1648
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
  moduleFileExtensions: ['vue', 'js', 'ts'],
  moduleNameMapper: {
    // Fix in order for vue-test-utils to work with Jest 28
    // https://github.com/vuejs/vue-test-utils/issues/1975
    '^@vue/test-utils$': require.resolve('@vue/test-utils'),
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  coverageReporters: ['text', 'json-summary']
}
