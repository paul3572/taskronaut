export default {
    testEnvironment: 'node',
    transform: {},
    moduleFileExtensions: ['js', 'mjs'],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)', '../UnitTests/**/?(*.)+(spec|test).[jt]s?(x)', '**/src/api/UnitTests/**/*.[jt]s?(x)'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    }
}