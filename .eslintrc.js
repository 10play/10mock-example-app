module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'detox'],  
  "globals": {
    "beforeAll":false,
    "fetch": false,
    "jest":false
  },
};
