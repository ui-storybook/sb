# SB [![npm version](https://badge.fury.io/js/ui-storybook.svg)](https://badge.fury.io/js/ui-storybook)

SB is the **environment** for developers that allow to easily develop and support UI components with any framework.
SB is the **tool** for designers that allows to easily review and test UI components that developers made.
SB is the **storybook** for teams and companies that helped him to keep UI consistent and documented.

![SB demo image](docs/sb-demo.gif)

### How it looks like?
See the demo with [angular material](https://material.angularjs.org/latest/) cards — [Demo](https://ui-storybook.github.io/sb-angular-material-cards-demo/#/?split=true)  
And demo repository — [Demo repository](https://github.com/ui-storybook/sb-angular-material-cards-demo)

### What is supported now?
Basically SB was designed for support any frameworks and libraries. All you components run in isolated scope with that version of framework or library that you need.  
For now SB support only Angular 1.x. Support for NG2, React, Aurelia and Vue.js coming very soon.



### Getting started
Fasted way to add SB to your project is use [sb-cli](https://github.com/ui-storybook/sb-cli):  

```bash
# Installation
npm i -g sb-cli

# Then in your project folder run  
sb-create
```

This will create `sb` folder with all dependencies based on project type.

### Usage
#### Available commands
```bash
# run sb server
npm run sb

# build sb with your project
npm run sb-build

# create new build and publish it to GitHub Pages
npm run sb-publish
```

#### Powered your project
First you need to import your main project module to `sb/index.js`  
For `Angular` based app:

```js

import '../path/to/your/module';
 
// Inject you app module here 
const mainModule = angular.module('sb', [
  'helper',
  'youAppName'
]);

```

Write your stories  
SB provide simple api for you:

```js
// File sb/stories/index.js

import 'ui-storybook/sb';
import 'ui-storybook/stories';

// Create a new section (like page)
let buttons = sb.section('Buttons');

// Then you can add new story and states to section
buttons.story('Simple buttons')

    // add method create new state for story 
    // first param take title of state
    // second take html template that need to render 
    // and third take object which need to load to component scope
    .add('Main button', '<button>{{ vm.title }}</button>', {
        title: 'Hello from SB'
    })
    .add('Success button', '<button>{{ vm.someOtherTitle }}</button>', {
        someOtherTitle: 'You successfully build first story'
    });

``` 

Run SB in browser or load it to GitHub Pages  
`npm run sb` — will load SB server with livereload which allow you to easily develop UI components.  
`npm run sb-publish` — will build and load SB to GitHub Pages.

#### Configuration 
SB use Webpack to build everything. If you need to change ot update build process go to `sb/.webpack` folder:
`server.js` include configuration for browser-sync and webpack HMR.  
`loaders.js` include all loaders.  
`webpack.dev.babel.js` include dev build configuration.   
`webpack.build.babel.js` include production build configuration.

### Contributing

If you find a bug (and you don’t know how to fix it), have trouble following the documentation or have a question or ideas how to improve SB – create an issue!  
If you’re able to patch the bug or add the feature yourself – fantastic, make a pull request with the code! 

Available gulp tasks: 
```bash

# run dev server with demo data
gulp serve  

# create new build
gulp build  

```