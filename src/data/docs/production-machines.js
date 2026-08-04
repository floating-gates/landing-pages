export const ProductionMachines = {
  id: 'production-machines',
  title: 'Production Machines',
  description: 'Define how your factory is composed of machines',
  blocks: [
    {
      type: 'text',
      text: 'To pick a machine that is compatible with the automatic quotation function, you are asked to insert the cost factors necessary to calculate the price of an object:',
    },
    {
      type: 'figure',
      img: '/docs-images/production-machines-1.png',
      caption: 'Machine cost factors',
    },
    { type: 'text', text: 'Custom machines can be generated via:' },
    {
      type: 'figure',
      img: '/docs-images/production-machines-2.png',
      caption: 'Creating a custom machine',
    },
    { type: 'text', text: 'Which results in:' },
    {
      type: 'figure',
      img: '/docs-images/production-machines-3.png',
      caption: 'Custom machine result',
    },
  ],
};
