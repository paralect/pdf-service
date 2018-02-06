const request = require('needle');

module.exports.fetchPdf = (html, pdfOptions, headers, serverUrl) => {
  const requestStream = request.post(`${serverUrl}/pdf`, {
    options: pdfOptions,
    headers,
    html,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return requestStream;
};

module.exports.fetchImage = (html, imgOptions, headers, serverUrl) => {
  const requestStream = request.post(`${serverUrl}/pdf`, {
    options: imgOptions,
    headers,
    html,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return requestStream;
};
