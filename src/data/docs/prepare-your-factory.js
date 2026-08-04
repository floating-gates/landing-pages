export const PrepareYourFactory = {
  id: 'prepare-your-factory',
  title: 'Prepare your Factory',
  description: 'Prepare your factory so your customers know what you can do',
  blocks: [
    {
      type: 'text',
      text: 'Once you start setting up your factory, two pieces of information are required as a minimum:',
    },
    { type: 'list', ordered: false, items: ['Machines', 'Materials'] },
    {
      type: 'text',
      text: 'These are indicated in orange on the dashboard below. One of each is the minimum needed for a working factory:',
    },
    {
      type: 'figure',
      img: '/docs-images/prepare-your-factory-1.png',
      caption: 'Dashboard warnings',
    },
    {
      type: 'text',
      text: 'To have a functioning factory online via your CAD interface you need to define the following.',
    },
    { type: 'heading', level: 3, text: 'Quick set up of machines' },
    {
      type: 'figure',
      img: '/docs-images/prepare-your-factory-2.png',
      caption: 'Quick machine set-up',
    },
    { type: 'heading', level: 3, text: 'Quick set up of materials' },
    {
      type: 'figure',
      img: '/docs-images/prepare-your-factory-3.png',
      caption: 'Quick material set-up',
    },
    {
      type: 'text',
      text: 'The CAD will then permit the following choices for your customer, and will turn off the warnings in the dashboard:',
    },
    {
      type: 'figure',
      img: '/docs-images/prepare-your-factory-4.png',
      caption: 'Choices in the CAD',
    },
  ],
};
