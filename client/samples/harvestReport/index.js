const PdfService = require('./../../index');

const pdfService = new PdfService({
  serverUrl: 'http://localhost:4444',
  mode: 'development',
});

pdfService.generatePdf(`${__dirname}/src/index.html`, {
  pdfOptions: {
    format: 'Letter',
  },
  templateSystem: {
    params: {
      tasks: [{
        billableHours: 80,
        noneBillableHours: 0,
        totalAmount: 0,
        taskName: 'Programming',
        uninvoicedAmount: 0,
        items: [{
          billableHours: 80,
          noneBillableHours: 0,
          totalAmount: 0,
          fullName: 'Andrew Orsich',
          avatar: 'https://cache.harvestapp.com/assets/profile_images/abraj_albait_towers.png?1498516481',
          totalHours: 80,
          percentFromMax: '100',
          billablePercent: '100',
        }],
        totalHours: 80,
        percentFromMax: '100',
        billablePercent: '100',
      }],
    },
    helpers: {
      currency: Handlebars => (amount) => {
        const htmlData = parseFloat(Handlebars.escapeExpression(amount))
          .toFixed(2)
          .replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `,${c}` : c))
          .concat(' USD');

        return new Handlebars.SafeString(htmlData);
      },
      hours: Handlebars => (hours) => {
        const htmlData = parseFloat(Handlebars.escapeExpression(hours)).toFixed(2);

        return new Handlebars.SafeString(htmlData);
      },
    },
    partials: {
      hello: '<h1> Hello! </h1>',
    },
  },
});
