:scroll: PDF Service
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
===========
![Stack](https://raw.githubusercontent.com/paralect/stack/master/stack-component-template/stack.png)

###### [CLIENT API](client/README.md) | [SERVER API](server/README.md) | [CONTRIBUTING](CONTRIBUTING.md)
> Pdf service can be used for pdf generating (reports, receipts and etc.) from the html sources.

Features
========
Here are a few examples to get you started:

* :rocket: Generate PDF(screenshots) from the html as a string / file.
* :package: Build your assets without headache.


Installation
========

You should start pdf server first. It is easy to mange if you have docker:

```
docker pull paralect/pdf-service
docker run -d -p 3000:3000 paralect/pdf-service
```

After that install client library:

```
npm i @paralect/pdf-service-client
```

Quick example
=============
In your js file write these lines:

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

Full API Reference
=================
Explore the API documentation([client side](client/README.md) and [server side](server/README.md)) and [examples](client/samples) to learn more.

Change Log
=================

This project adheres to [Semantic Versioning](http://semver.org/).
Every release is documented on the Github [Releases](https://github.com/paralect/pdf-service/releases) page.

License
=================

Ship is released under the [MIT License](LICENSE).

Contributing
=================

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

Contributors
=================

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/14125982?v=4" width="100px;"/><br /><sub><b>KuhArt</b></sub>](https://github.com/KuhArt)<br />[💻](https://github.com/paralect/pdf-service/commits?author=KuhArt "Code") [📖](https://github.com/paralect/pdf-service/commits?author=KuhArt "Documentation") [🐛](https://github.com/paralect/pdf-service/issues?q=author%3AKuhArt "Bug reports") | [<img src="https://avatars2.githubusercontent.com/u/2989199?v=4" width="100px;"/><br /><sub><b>Uladzimir Mitskevich</b></sub>](https://github.com/umitskevich)<br />[🤔](#ideas-umitskevich "Ideas, Planning, & Feedback") [🐛](https://github.com/paralect/pdf-service/issues?q=author%3Aumitskevich "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/12069883?v=4" width="100px;"/><br /><sub><b>NesterenkoNikita</b></sub>](https://github.com/NesterenkoNikita)<br />[🤔](#ideas-NesterenkoNikita "Ideas, Planning, & Feedback") [🐛](https://github.com/paralect/pdf-service/issues?q=author%3ANesterenkoNikita "Bug reports") | [<img src="https://avatars3.githubusercontent.com/u/681396?v=4" width="100px;"/><br /><sub><b>Andrew Orsich</b></sub>](http://paralect.com)<br />[🤔](#ideas-anorsich "Ideas, Planning, & Feedback") [🐛](https://github.com/paralect/pdf-service/issues?q=author%3Aanorsich "Bug reports") [🎨](#design-anorsich "Design") | [<img src="https://avatars2.githubusercontent.com/u/6461311?v=4" width="100px;"/><br /><sub><b>Evgeny Zhivitsa</b></sub>](https://github.com/ezhivitsa)<br />[💻](https://github.com/paralect/pdf-service/commits?author=ezhivitsa "Code") [🎨](#design-ezhivitsa "Design") | [<img src="https://avatars2.githubusercontent.com/u/21078183?v=4" width="100px;"/><br /><sub><b>Женя Филиппович</b></sub>](https://github.com/filipochka97)<br />[🐛](https://github.com/paralect/pdf-service/issues?q=author%3Afilipochka97 "Bug reports") |
| :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!