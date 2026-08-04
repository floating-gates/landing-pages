import productionMachines1Img from '../images/docs-images/production-machines-1.png';
import productionMachines2Img from '../images/docs-images/production-machines-2.png';
import productionMachines3Img from '../images/docs-images/production-machines-3.png';

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
      img: productionMachines1Img,
      caption: 'Machine cost factors',
    },
    { type: 'text', text: 'Custom machines can be generated via:' },
    {
      type: 'figure',
      img: productionMachines2Img,
      caption: 'Creating a custom machine',
    },
    { type: 'text', text: 'Which results in:' },
    {
      type: 'figure',
      img: productionMachines3Img,
      caption: 'Custom machine result',
    },
  ],
};
