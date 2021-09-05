// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    karmaTypescriptConfig : {
        compilerOptions: {
            "target": "es6",
            "lib": [ "dom" ,"es6", "es2017.object"], 
        },
        bundlerOptions: {
//            resolve: {
//                alias : {
//                    'passages' :'tests/helpers/passages.ts'
//               }
//            }
        }
    },
    basePath: '',
    frameworks: ['jasmine', 'karma-typescript' ],
    plugins: [
      require('karma-jasmine'),
      require('karma-typescript'),
      require('karma-chrome-launcher'),
//      require('karma-coverage-istanbul-reporter'),
      require('karma-jasmine-html-reporter'),

    ],
    files: [
        { pattern: "src/**/*.ts"  } ,
        { pattern: "specs/**/*.ts"  },
        { pattern: "specs/helpers/*.ts"  } //Special helpers! 
    ],
    preprocessors: {
       "**/*.ts": "karma-typescript" // *.tsx for React Jsx
    },
//    client:{
//      clearContext: false // leave Jasmine Spec Runner output visible in browser
//    },
    reporters: ['progress',  ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
