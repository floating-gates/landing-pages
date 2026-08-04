import setTheFactory1Img from '../images/docs-images/set-the-factory-1.png';
import setTheFactory2Img from '../images/docs-images/set-the-factory-2.png';
import setTheFactory3Img from '../images/docs-images/set-the-factory-3.png';

export const SetTheFactory = {
  id: 'set-the-factory',
  title: 'Set the Factory',
  description: 'How to configure your factory',
  blocks: [
    {
      type: 'text',
      text: 'Navigate to **Set Up your Factory** to reach the [factory description](https://floating-gates.com/dashboard).',
    },
    {
      type: 'figure',
      img: setTheFactory1Img,
      caption: 'Set up your factory',
    },
    { type: 'heading', level: 2, text: 'Select your machines' },
    {
      type: 'text',
      text: 'Select one of your predefined machines if it is ready to go. Click on the tile and set the cost parameters for the system:',
    },
    { type: 'figure', img: setTheFactory2Img, caption: 'Selecting machines' },
    { type: 'heading', level: 2, text: 'Select your materials' },
    { type: 'text', text: 'Select which predefined materials you can handle:' },
    {
      type: 'figure',
      img: setTheFactory3Img,
      caption: 'Selecting materials',
    },
    { type: 'text', text: 'Now check the summary to confirm everything is correct.' },
  ],
};
