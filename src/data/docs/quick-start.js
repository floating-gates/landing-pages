export const QuickStart = {
  id: 'quick-start',
  title: 'Quick Start',
  description: 'Set up your factory online and start a project as if you were one of your own customers',
  blocks: [
    { type: 'heading', level: 2, text: 'Access Gates and go to the Dashboard' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Open your web browser and navigate to [floating-gates.com](https://floating-gates.com).',
        'Click on **Log In** from the homepage and register.',
      ],
    },
    { type: 'figure', img: '/docs-images/quick-start-1.png', caption: 'Logging in' },
    {
      type: 'list',
      ordered: false,
      items: [
        'You will then be redirected into the [Dashboard](https://floating-gates.com/dashboard).',
      ],
    },
    { type: 'heading', level: 2, text: 'Choose your Hub address' },
    {
      type: 'text',
      text: 'Once logged in you will reach the dashboard, which asks you what kind of subscription plan you want and at what address you plan to host your client App:',
    },
    { type: 'figure', img: '/docs-images/quick-start-2.png', caption: 'Choosing a hub address' },
    {
      type: 'text',
      text: 'Select the name of the hub and the plan you want based on the features you would like to use. The payment is held by GoCardless:',
    },
    { type: 'figure', img: '/docs-images/quick-start-3.png', caption: 'GoCardless' },
    { type: 'heading', level: 2, text: 'What you can do as a Factory and as a Consumer' },
    {
      type: 'text',
      text: 'Gates separates what you can do and what a customer can do, as per below:',
    },
    {
      type: 'table',
      headers: ['Feature / Action', 'Factory', 'Customer'],
      rows: [
        ['Create Projects', 'No', 'Yes'],
        ['Parametric Design Configuration', 'Yes', 'No'],
        ['Machine Configuration', 'Yes', 'No'],
        ['Material Set-up', 'Yes', 'No'],
        ['Quotation Generation', 'No', 'Yes'],
        ['Parametric Model Generation', 'No', 'Yes'],
        ['Manufacturing Checks', 'Not yet available', 'Not yet available'],
        ['Order Approval', 'Yes', 'No'],
        ['Branding Customization', 'Yes', 'No'],
      ],
      align: ['', 'center', 'center'],
    },
  ],
};
