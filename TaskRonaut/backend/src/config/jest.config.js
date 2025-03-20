export default {
    testEnvironment: 'node',
    transform: {},
    extensionsToTreatAsEsm: ['.mjs'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.mjs$': '$1.js'
    },
    moduleFileExtensions: ['js', 'mjs'],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)', '../UnitTests/?(*.)+(spec|test).[jt]s?(x)', '**/src/UnitTests/**/*.[jt]s?(x)', '**/src/UnitTests/**.mjs'],
    testPathIgnorePatterns: ['/node_modules/'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    }
}