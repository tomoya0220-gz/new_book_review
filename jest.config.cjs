module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFilesAfterEnv: ['<rootDir>/src/pages/Login.jsx'],
  testEnvironment: 'jsdom',
};
