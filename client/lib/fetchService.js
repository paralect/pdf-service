const request = require('request');

module.exports.fetchPdf = (html, pdfOptions, headers, serverUrl) => {
  return request({
    uri: `${serverUrl}/pdf`,
    method: 'POST',
    body: JSON.stringify({
      options: pdfOptions,
      headers,
      html,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

module.exports.fetchImage = (html, imgOptions, headers, serverUrl) => {
  return request({
    uri: `${serverUrl}/image`,
    method: 'POST',
    body: JSON.stringify({
      options: imgOptions,
      headers,
      html,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
