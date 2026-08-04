import branding1Img from '../images/docs-images/branding-1.png';
import branding2Img from '../images/docs-images/branding-2.png';
import branding3Img from '../images/docs-images/branding-3.png';

export const Branding = {
  id: 'branding',
  title: 'Branding',
  description: 'How to make the online interface represent your company',
  blocks: [
    {
      type: 'text',
      text: 'You can upload your logo at [floating-gates.com/profile](https://www.floating-gates.com/profile), in the following tab of the menu:',
    },
    { type: 'figure', img: branding1Img, caption: 'Branding tab' },
    { type: 'text', text: 'As an example, this logo was uploaded to the hub:' },
    { type: 'figure', img: branding2Img, caption: 'Example logo' },
    {
      type: 'text',
      text: 'What you will see next is the presence of your brand in the online CAD at your specific address:',
    },
    { type: 'figure', img: branding3Img, caption: 'Branded CAD' },
  ],
};
