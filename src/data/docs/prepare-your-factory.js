import prepareYourFactory1Img from '../images/docs-images/prepare-your-factory-1.png';
import prepareYourFactory2Img from '../images/docs-images/prepare-your-factory-2.png';
import prepareYourFactory3Img from '../images/docs-images/prepare-your-factory-3.png';
import prepareYourFactory4Img from '../images/docs-images/prepare-your-factory-4.png';

export const PrepareYourFactory = {
  id: 'prepare-your-factory',
  title: 'Configure Factory to be Used',
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
      img: prepareYourFactory1Img,
      caption: 'Dashboard warnings',
    },
    {
      type: 'text',
      text: 'To have a functioning factory online via your CAD interface you need to define the following.',
    },
    { type: 'heading', level: 3, text: 'Quick set up of machines' },
    {
      type: 'figure',
      img: prepareYourFactory2Img,
      caption: 'Quick machine set-up',
    },
    { type: 'heading', level: 3, text: 'Quick set up of materials' },
    {
      type: 'figure',
      img: prepareYourFactory3Img,
      caption: 'Quick material set-up',
    },
    {
      type: 'text',
      text: 'The CAD will then permit the following choices for your customer, and will turn off the warnings in the dashboard:',
    },
    {
      type: 'figure',
      img: prepareYourFactory4Img,
      caption: 'Choices in the CAD',
    },
  ],
};
