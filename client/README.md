Pdf service client side
===========
This is the client side of **PDF service** description.
The main aim of this part is to build html file with inline css, font and images.
To use it you should [start the server](../server/README.md) first.

Index
=====
  1. [Overview](#overview)
  2. [Installation](#installation)
  3. [Quick example](#quick-example)
  4. [API](#api)
      1. [generatePdf(*pdfPath*, \[options\])](#generatepdfpdfpath-options)
      2. [generatePdfByContent(*html*, \[options\])](#generatepdfbycontenthtml-options)
      3. [Pdf options](#pdf-options)
      4. [generateImage(*imgPath*, \[options\])](#generateimageimgpath-options)
      5. [generateImageByContent(*html*, \[options\])](#generateimagebycontenthtml-options)
      6. [Image options](#image-options)
  5. [Debugging](#debugging)
  6. [Examples](#examples)

Overview
=======
This is the client library that provides easy pdf and image generation.
Here some features that can help you to develop awesome things:
   1. :bicyclist: Handlebars under the hood. You create your images and pdfs with dynamical content.
   2. :package: Webpack will manage all your assets. You just need to save assets near to your html template.
   3. :question: Maybe is it your feature? You can request new feature in [issues](https://github.com/paralect/pdf-service/issues) or add new pr

Init
====
You should install @paralect/pdf-service-client:
```
npm i @paralect/pdf-service-client
```

Quick example
==========
In your js file write these lines (be sure that you started [server](server/README.md)):

```
const PdfService = require('@paralect/pdf-service-client'); // require client pdf service library
const fs = require('fs'); // fs to write file

// pdf service init
const pdfService = new PdfService({
  serverUrl: 'http://localhost:3000',
  mode: 'development',
});

// generate pdf by html string
pdfService.generatePdfByContent('<body><h1>Hello, {{name}}!</h1></body>', {
  pdfOptions: {
    format: 'Letter',
  },
  templateSystem: {
    params: {
      name: 'Your name',
    },
  },
}).then((pdfStream) => {
  const writeStream = fs.createWriteStream('./hello.pdf');

  pdfStream.pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('Hello pdf was created!');
  });
});
```

Execution of this code should generate pdf file with 'Hello, Your name' string.

A bit of constructor explanation:
``` javascript
const pdfService = new PdfService({
  serverUrl: 'http://localhost:3000', // optional
  mode: 'development', // optional
});
```

  1. **serverUrl** - you can provide url to [server](../server/README.md) (look options sections [here](https://www.npmjs.com/package/wkhtmltopdf)). **http://localhost:3000** will be used as default.
  2. **mode** - mode can be **production** or **development**. In production mode you have to build assets before you invoke generatePdf method.

API
=====
When you initialise pdf service it will provide you several methods.

generatePdf(*pdfPath*, \[options\])
-----------------------------------
Let's describe these options:
  1. **pagePath** - it is the path to **html** file which will be transformed to pdf.
  2. **options** - it is optional param. You can see more in [Pdf options section](#pdf-options).

This method returns **stream** with your pdf file.

**Note:** You page that was specified by **pagePath** should be placed with all assets in one directory.
 This directory should be isolated from other codebase.
 You have this restriction because build of all assets looks for all files that was placed in the same directory with your html source.
 Look to [Example](#example) for more details.

generatePdfByContent(*html*, \[options\])
--------
Let's describe these options:
  1. **html** - it is the html text which will be transformed to pdf.
  2. **options** - it is optional param. You can see more in [Pdf options section](#pdf-options).

This method returns **stream** with your pdf file.

Pdf options
--------
  Here is the example of **image options**:
``` javascript
  {
    pdfOptions: { // optional
      format: 'Letter',
    },
    headers: { // optional
      Authorization: 'Bearer ...'
    },
   templateSystem: { // optional
      params: {
      tasks: [{}],
      },
      helpers: {
        hours: Handlebars => (hours) => {
          const htmlData = parseFloat(Handlebars.escapeExpression(hours)).toFixed(2);

          return new Handlebars.SafeString(htmlData);
        },
      },
      partials: {
        hello: '<h1> Hello! </h1>',
      },
    },
  }
```

Let's describe these options:
  2. **pdfOptions** - you can provide pdf options (look options sections [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions)).
  3. **headers** - you can provide headers which will be used on the page, for example you can add authorization header (look [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagesetextrahttpheadersheaders))
  4. **templateSystem** - if you are using [Handlebars](http://handlebarsjs.com/) template then you can provide properties which is used on template (params, helpers, partials).


generateImage(*imgPath*, \[options\])
-----------------------------------
Let's describe these options:
  1. **pagePath** - it is the path to **html** file which will be transformed to pdf.
  2. **options** - it is optional param. You can see more in [Image options section](#image-options).

This method returns **stream** with your img file.

**Note:** You page that was specified by **pagePath** should be placed with all assets in one directory.
 This directory should be isolated from other codebase.
 You have this restriction because build of all assets looks for all files that was placed in the same directory with your html source.
 Look to [Example](#example) for more details.

generateImageByContent(*html*, \[options\])
--------
Let's describe these options:
  1. **html** - it is the html text which will be transformed to pdf.
  2. **options** - it is optional param. You can see more in [Image options section](#image-options).

Image options
-------------
  Here is the example of **pdf options**:
``` javascript
  {
    imgOptions: { // optional
      format: 'Letter',
    },
    headers: { // optional
      Authorization: 'Bearer ...'
    },
   templateSystem: { // optional
      params: {
      tasks: [{}],
      },
      helpers: {
        hours: Handlebars => (hours) => {
          const htmlData = parseFloat(Handlebars.escapeExpression(hours)).toFixed(2);

          return new Handlebars.SafeString(htmlData);
        },
      },
      partials: {
        hello: '<h1> Hello! </h1>',
      },
    },
  }
```

Let's describe these options:
  2. **imgOptions** - you can provide image options (look options sections [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagescreenshotoptions)).
  3. **headers** - you can provide headers which will be used on the page, for example you can add authorization header (look [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagesetextrahttpheadersheaders))
  4. **templateSystem** - if you are using [Handlebars](http://handlebarsjs.com/) template then you can provide properties which is used on template (params, helpers, partials).

Debugging
=========
To start library in debug mode you just need to start it with **DEBUG=pdf-service**.
This will provide additional logs.

Examples
========
You can find the samples in [here](./samples). To run the sample just write in samples directory:
```
 docker-compose up -d
 node index.js
```
The first command should start pdf server which listen on **4444** port.
You can specify another port in docker-compose.yml file.
All works in this way:

That's all folks!

Change Log
=================

This project adheres to [Semantic Versioning](http://semver.org/).
Every release is documented on the Github [Releases](https://github.com/paralect/pdf-service/releases) page.

License
=================

Ship is released under the [MIT License](https://github.com/paralect/pdf-service/blob/master/LICENSE).

Contributing
=================

Please read [CONTRIBUTING.md](https://github.com/paralect/pdf-service/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

Contributors
=================

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/14125982?v=4" width="100px;"/><br /><sub><b>KuhArt</b></sub>](https://github.com/KuhArt)<br />[💻](https://github.com/paralect/pdf-service/commits?author=KuhArt "Code") [📖](https://github.com/paralect/pdf-service/commits?author=KuhArt "Documentation") [🐛](https://github.com/paralect/pdf-service/issues?q=author%3AKuhArt "Bug reports") | [<img src="https://avatars2.githubusercontent.com/u/2989199?v=4" width="100px;"/><br /><sub><b>Uladzimir Mitskevich</b></sub>](https://github.com/umitskevich)<br />[🤔](#ideas-umitskevich "Ideas, Planning, & Feedback") [🐛](https://github.com/paralect/pdf-service/issues?q=author%3Aumitskevich "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/12069883?v=4" width="100px;"/><br /><sub><b>NesterenkoNikita</b></sub>](https://github.com/NesterenkoNikita)<br />[🤔](#ideas-NesterenkoNikita "Ideas, Planning, & Feedback") [🐛](https://github.com/paralect/pdf-service/issues?q=author%3ANesterenkoNikita "Bug reports") | [<img src="https://avatars3.githubusercontent.com/u/681396?v=4" width="100px;"/><br /><sub><b>Andrew Orsich</b></sub>](http://paralect.com)<br />[🤔](#ideas-anorsich "Ideas, Planning, & Feedback") [🐛](https://github.com/paralect/pdf-service/issues?q=author%3Aanorsich "Bug reports") [🎨](#design-anorsich "Design") | [<img src="https://avatars2.githubusercontent.com/u/6461311?v=4" width="100px;"/><br /><sub><b>Evgeny Zhivitsa</b></sub>](https://github.com/ezhivitsa)<br />[💻](https://github.com/paralect/pdf-service/commits?author=ezhivitsa "Code") [🎨](#design-ezhivitsa "Design") | [<img src="https://avatars2.githubusercontent.com/u/21078183?v=4" width="100px;"/><br /><sub><b>Женя Филиппович</b></sub>](https://github.com/filipochka97)<br />[🐛](https://github.com/paralect/pdf-service/issues?q=author%3Afilipochka97 "Bug reports") |
| :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
