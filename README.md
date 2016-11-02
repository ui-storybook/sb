# SB [![npm version](https://badge.fury.io/js/ui-storybook.svg)](https://badge.fury.io/js/ui-storybook) [![Gitter Chat](https://badges.gitter.im/owner/repo.png)](https://gitter.im/ui-sb/Lobby)


SB is the environment for developers that allow to easily develop and support UI components with any framework. With it, you can visualize different states of your UI components and develop them interactively.    

![SB demo image](docs/sb-demo.gif)

SB run your app in sandbox, so you can develop without warning about any specific dependency.

## Demo
[Material cards](https://ui-storybook.github.io/sb-angular-material-cards-demo/#/?split=true) — [Source](https://github.com/ui-storybook/sb-angular-material-cards-demo)   

## What is supported now?
Angular 1 — [API](#angular-usage)         
React — [API](#react-usage)         
NG2 — Comming soon  
Aurelia — Comming soon  
Vue.js — Comming soon  

Basically, SB was designed for support any frameworks and libraries. All you components run in isolated scope with that version of framework or library that you need.  
For now SB support Angular 1.x and React. Support for NG2, Aurelia and Vue.js coming very soon.


## Getting started
Fastest way to add SB to your project is to use [sb-cli](https://github.com/ui-storybook/sb-cli):  

```bash
# Installation
npm i -g sb-cli

# Then in your project folder run  
sb-create
```

This will create `sb` folder with all dependencies based on project type.

## Usage
#### Available commands
```bash
# run sb server
npm run sb

# build sb with your project
npm run sb-build

# create new build and publish it to GitHub Pages
npm run sb-publish
```

### Angular usage
First you need to import your main project module to `sb/index.js`  

```js
// Import you app 
import '../path/to/your/module';
 
// And inject it here 
const mainModule = angular.module('sb', [
  'helper',
  'youAppName'
]);

```

Write your stories  
SB provides simple api for you:

```js
// File sb/stories/index.js

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
Also you can use `sb.mock` method for stote your mocks and then use in stories passing mock name instead of object:
```js
sb.mock('week', {
    sunday: 'Sunday', 
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday'
});

let calendar = sb.section('Week');
calendar.story('Days of the week')
  .add('Sunday', '<p>{{ vm.sunday }}</p>', 'week')
  .add('Monday', '<p>{{ vm.monday }}</p>', 'week')
  .add('Tuesday', '<p>{{ vm.tuesday }}</p>', 'week')
  .add('Wednesday', '<p>{{ vm.wednesday }}</p>', 'week')
  .add('Thursday', '<p>{{ vm.thursday }}</p>', 'week')
  .add('Friday', '<p>{{ vm.friday }}</p>', 'week')
  .add('Saturday', '<p>{{ vm.saturday }}</p>', 'week');
``` 


Than simply run `npm run sb` — this will load server with hotreload and run SB with your application.  

### React usage
First you need to import your React components in `sb/index.js` file  

```js
// Example from demo application  
import { Welcome } from './welcome/welcome';
```

The write your stories  
SB provides simple api for you:

```js
// File sb/stories/index.js

// You need import your commponent here too
import { Welcome } from './../welcome/welcome';

// Create a new section (like page)
let overview = sb.section('Welcome section');

// Then you can add new story and states to section
// add method create new state for story 
// first param take title of state
// second take function that return Raact component 
overview.story('SB demo component')
  .add('Hello messages', () => (<Welcome />));
``` 

Than simply run `npm run sb` — this will load server with hotreload and run SB with your application.


### Configuration 
SB use Webpack to build everything. If you need to change or update build process go to `sb/.webpack` folder:
`server.js` include configuration for browser-sync and webpack HMR.  
`loaders.js` include all loaders.  
`webpack.dev.babel.js` include dev build configuration.   
`webpack.build.babel.js` include production build configuration.

## Contributing

If you find a bug (and you don’t know how to fix it), have trouble following the documentation or have a question or ideas how to improve SB – create an issue!  
If you’re able to patch the bug or add the feature yourself – fantastic, make a pull request with the code! 

Available gulp tasks: 
```bash

# run dev server with demo data
gulp serve  

# create new build
gulp build  

```
