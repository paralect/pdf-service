const PdfService = require('./../../index');

const pdfService = new PdfService({
  serverUrl: 'http://localhost:4444',
  mode: 'development',
});

pdfService.generatePdf(`${__dirname}/src/index.html`, {
  pdfOptions: {
    format: 'Letter',
  },
  templateParams: {
    tasks: [{ billableHours: 80, noneBillableHours: 0, totalAmount: 0, taskName: 'Programming', uninvoicedAmount: 0, items: [{ billableHours: 80, noneBillableHours: 0, totalAmount: 0, fullName: 'Andrew Orsich', avatar: 'https://cache.harvestapp.com/assets/profile_images/abraj_albait_towers.png?1498516481', totalHours: 80, percentFromMax: '100', billablePercent: '100' }], totalHours: 80, percentFromMax: '100', billablePercent: '100' }], projects: [{ billableHours: 80, noneBillableHours: 0, totalAmount: 0, projectName: 'Paralect Care', totalHours: 80, percentFromMax: '100', billablePercent: '100' }], detailsEntries: [{ totalHours: 80, fullName: 'Andrew Orsich', notes: [{ taskId: 8372101, spentOn: 'Monday, August 7th', projectId: 14838809, notes: null, hoursWorked: 8, projectName: 'Paralect Care', taskName: 'Programming' }, { taskId: 8372101, spentOn: 'Tuesday, August 8th', projectId: 14838809, notes: null, hoursWorked: 8, projectName: 'Paralect Care', taskName: 'Programming' }, { taskId: 8372101, spentOn: 'Wednesday, August 9th', projectId: 14838809, notes: null, hoursWorked: 8, projectName: 'Paralect Care', taskName: 'Programming' }, { taskId: 8372101, spentOn: 'Thursday, August 10th', projectId: 14838809, notes: null, hoursWorked: 8, projectName: 'Paralect Care', taskName: 'Programming' }, { taskId: 8372101, spentOn: 'Friday, August 11th', projectId: 14838809, notes: null, hoursWorked: 8, projectName: 'Paralect Care', taskName: 'Programming' }, { taskId: 8372101, spentOn: 'Monday, August 14th', projectId: 14838809, notes: null, hoursWorked: 8, projectName: 'Paralect Care', taskName: 'Programming' }, { taskId: 8372101, spentOn: 'Tuesday, August 15th', projectId: 14838809, notes: null, hoursWorked: 8, projectName: 'Paralect Care', taskName: 'Programming' }, { taskId: 8372101, spentOn: 'Wednesday, August 16th', projectId: 14838809, notes: null, hoursWorked: 8, projectName: 'Paralect Care', taskName: 'Programming' }, { taskId: 8372101, spentOn: 'Thursday, August 17th', projectId: 14838809, notes: 'Programming biiiiiig stuff', hoursWorked: 8, projectName: 'Paralect Care', taskName: 'Programming' }, { taskId: 8372101, spentOn: 'Friday, August 18th', projectId: 14838809, notes: null, hoursWorked: 8, projectName: 'Paralect Care', taskName: 'Programming' }] }], totalBillableHours: 80, totalUnbillableHours: 0, totalHours: 80, totalAmount: 0, totalUninvoicedAmount: 0, client: { id: 5928851, name: 'Paralect', active: true, currency: 'United States Dollar - USD', updated_at: '2017-08-25T15:48:41Z', created_at: '2017-08-25T15:43:35Z', statement_key: '0aef226a68331872cf3368f4f5e4aa5e', default_invoice_kind: 'project', default_invoice_timeframe: '20170801,20170831', address: null, delete_at: null, currency_symbol: '$', details: null, last_invoice_kind: 'project' }, moreThanOneProject: false, from: 'Aug 01', to: 'Aug 31, 2017', reportName: 'Paralect Team Monthly Time Report', rangeParagraph: 'August', rangeEmailString: 'I have prepared a one-month report for', emailTitle: 'Monthly Report', fileName: 'Paralect Team Monthly Time Report ((Aug 01 - Aug 31, 2017)).pdf', templateName: 'monthly_report',
  },
  templateHelpers: {
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
});
