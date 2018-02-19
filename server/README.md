PDF service server side
=======================
This is server side of **PDF service** description.

Index
=====
  1. [Overview](#overview)
  2. [Build manually](#build-manually)
  3. [Or Use Docker Image](#or-use-docker-image)
  4. [API](#api)
      1. [POST /pdf](#post-pdf)
      2. [POST /image](#post-image)
  5. [Debugging](#debugging)
  6. [Examples](#examples)

Overview
========
It is the simple HTTP server was written on [koa](http://koajs.com/) which handle POST request:
  [POST /pdf](#post-pdfhtml)
Body of the request should consist of **url** or **html** properties.
 1. **url** - is site url. Server will generate pdf if you provide this option.
 2. **html** - it is html page code. Server will generate pdf from this page.

**Note:** If you provide two properties. Server will generate pdf by url.

To prevent wkhtmltopdf installing server should be [started](#build-and-start-the-server) from docker container.

Build manually
==============
Build and start the container.
To build the image of the server you in root server directory you should run:

```
docker build ./
```

After that the docker image will be built.
On the next step you should start the container.
For example, to start the image on 3000 port you can run:

```
docker run -d -p 3000:3000 image_id
```

Also image exposes only 3000 port, so you should use this port when you map ports.

Or Use Docker Image
===================
Image can be loaded from Docker Hub (docker pull paralect/pdf-service).
The reference to this image [here](https://hub.docker.com/r/paralect/pdf-service/).

```
docker pull paralect/pdf-service
docker run -d -p 3000:3000 paralect/pdf-service
```

Here is the sample of using with docker-compose
``` YAML
version: '2'

services:
  pdf-service:
    image: paralect/pdf-service
    ports:
      - "4444:3000"
```
If you place this code to **docker-compose.yml** file then you are able to run it by command:
``` YAML
docker-compose up -d
```

API
===
This is api reference.

POST /pdf
---------
This request can have a html text and special pdf options (look options sections [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions))in body. Also this request can have headers which will be used on the page, for examle you can add authorization header (look [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagesetextrahttpheadersheaders))
The sample of request to localhost with Fetch API:

``` javascript
fetch('http://localhost:3000/pdf', {
    method: 'POST',
    body: JSON.stringify({
      options,
      html,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
  });
```

Or if you want to generate pdf by url.

``` javascript
fetch('http://localhost:3000/pdf', {
    method: 'POST',
    body: JSON.stringify({
      options,
      "url": "https://google.com",
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
  });
```

POST /image
------------------
This request can have a html text and special image options (look options sections [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagescreenshotoptions))
The sample of request to localhost with Fetch API:

``` javascript
fetch('http://localhost:3000/pdf', {
    method: 'POST',
    body: JSON.stringify({
      options,
      html,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
  });
```

Or if you want to generate pdf by url.

``` javascript
fetch('http://localhost:3000/pdf', {
    method: 'POST',
    body: JSON.stringify({
      options,
      "url": "https://google.com",
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
  });
```

Debugging
=========
To run server in debug mode you should provide **DEBUG=true** environment variable.

Change Log
=================

This project adheres to [Semantic Versioning](http://semver.org/).
Every release is documented on the Github [Releases](https://github.com/paralect/pdf-service/releases) page.

License
=================

Ship is released under the [MIT License](https://github.com/paralect/pdf-service/blob/master/LICENSE).

Contributing
============

Please read [CONTRIBUTING.md](https://github.com/paralect/pdf-service/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

Contributors
============

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/14125982?v=4" width="100px;"/><br /><sub><b>KuhArt</b></sub>](https://github.com/KuhArt)<br />[💻](https://github.com/paralect/pdf-service/commits?author=KuhArt "Code") [📖](https://github.com/paralect/pdf-service/commits?author=KuhArt "Documentation") [🐛](https://github.com/paralect/pdf-service/issues?q=author%3AKuhArt "Bug reports") | [<img src="https://avatars2.githubusercontent.com/u/2989199?v=4" width="100px;"/><br /><sub><b>Uladzimir Mitskevich</b></sub>](https://github.com/umitskevich)<br />[🤔](#ideas-umitskevich "Ideas, Planning, & Feedback") [🐛](https://github.com/paralect/pdf-service/issues?q=author%3Aumitskevich "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/12069883?v=4" width="100px;"/><br /><sub><b>NesterenkoNikita</b></sub>](https://github.com/NesterenkoNikita)<br />[🤔](#ideas-NesterenkoNikita "Ideas, Planning, & Feedback") [🐛](https://github.com/paralect/pdf-service/issues?q=author%3ANesterenkoNikita "Bug reports") | [<img src="https://avatars3.githubusercontent.com/u/681396?v=4" width="100px;"/><br /><sub><b>Andrew Orsich</b></sub>](http://paralect.com)<br />[🤔](#ideas-anorsich "Ideas, Planning, & Feedback") [🐛](https://github.com/paralect/pdf-service/issues?q=author%3Aanorsich "Bug reports") [🎨](#design-anorsich "Design") | [<img src="https://avatars2.githubusercontent.com/u/6461311?v=4" width="100px;"/><br /><sub><b>Evgeny Zhivitsa</b></sub>](https://github.com/ezhivitsa)<br />[💻](https://github.com/paralect/pdf-service/commits?author=ezhivitsa "Code") [🎨](#design-ezhivitsa "Design") | [<img src="https://avatars2.githubusercontent.com/u/21078183?v=4" width="100px;"/><br /><sub><b>Женя Филиппович</b></sub>](https://github.com/filipochka97)<br />[🐛](https://github.com/paralect/pdf-service/issues?q=author%3Afilipochka97 "Bug reports") |
| :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!