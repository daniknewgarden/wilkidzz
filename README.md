# Wilkidzz landing

## Download project and install modules

Download - `git clone https://github.com/daniknewgarden/wilkidzz.git`
**To run and build this project you must install [Node and npm](https://nodejs.org/en/download/)**.
After downloading run `npm install` to download dependencies.

## Start and build

`npm start` - start project in development mode.
`npm run build` - build production code.

## Project structure

.
├── dist
├── src/
│ ├── js/
│ │ └── menu.js
│ ├── static/
│ │ └── images/
│ ├── styles/
│ │ ├── header/
│ │ ├── main/
│ │ ├── footer/
│ │ ├── utils/
│ │ └── app.scss
│ ├── index.html
│ └── index.js
├── .babelrc
├── .gitignore
├── package.json
├── package-lock.json
├── postcss.config.js
└── webpack.config.js

### Main folders

The final project is in the **_dist_** folder, run `npm run build` to create it.
The source code is in **_src_** folder.

### Class names

![template with class names](https://i.imgur.com/iG0brFm.png)

**Most blocks have separate SCSS files**.
_Good luck!)_
