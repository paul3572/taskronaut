export default {
    testEnvironment: 'node',
    transform: {},
    moduleFileExtensions: ['js', 'mjs'],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)', '../UnitTests/?(*.)+(spec|test).[jt]s?(x)', '**/src/UnitTests/**/*.[jt]s?(x)'],
    testPathIgnorePatterns: ['/node_modules/'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    }
}