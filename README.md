## Файловая структура front-end проекта

    * - заполняется/создается при генерации  

    /template-build  
    ├── /app  
    │   ├── /assets  
    │   │   ├── /css  
    │   │   ├── /fonts  
    │   │   ├── /images  
    │   │   └── /js
    │   │       ├── common.js
    |   |       ├── index.js  
    |   |       └── bundle.js *    
    │   ├── /blocks  
    │   ├── /pug  
    │   │   ├── blocks.pug  
    │   │   └── index.pug  
    │   ├── /stylus  
    │   │   ├── /mixins  
    │   │   │   ├── common.styl  
    │   │   │   └── fonts.styl  
    │   │   ├── main.styl  
    │   │   ├── style.styl  
    │   │   └── variables.styl  
    │   ├── favicon.ico  
    │   └── index.html * 
    ├── /dist * 
    │   ├── /css  
    │   ├── /fonts  
    │   ├── /images  
    │   ├── /js
    |   |   └── bundle.js  
    │   └── index.html 
    ├── /libs  
    ├── /node_modules  
    ├── .gitignore  
    ├── package.json  
    └── yarn.lock  