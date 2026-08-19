import publishYourCadOnline1Img from '../images/docs-images/publish-your-cad-online-1.png';
import publishYourCadOnline2Img from '../images/docs-images/publish-your-cad-online-2.png';
import publishYourCadOnline3Img from '../images/docs-images/publish-your-cad-online-3.png';
import publishYourCadOnline4Img from '../images/docs-images/publish-your-cad-online-4.png';

export const PublishYourCadOnline = {
  id: 'publish-your-cad-online',
  title: 'Subscription to Gates in Cloud',
  description: 'Follow these instructions to make the CAD visible online',
  blocks: [
    { type: 'heading', level: 2, text: 'Exit Demo mode and set up your Hub' },
    {
      type: 'text',
      text: 'If no actions are taken inside the platform, the only hub available to you is the demo at [demo.floating-gates.com](https://demo.floating-gates.com). From the demo you can see all the features that are available to consumers. However, to make your CAD available you need to follow the steps listed below:',
    },
    {
      type: 'figure',
      img: publishYourCadOnline1Img,
      caption: 'Exiting demo mode',
    },
    { type: 'heading', level: 2, text: 'Select your URL' },
    {
      type: 'figure',
      img: publishYourCadOnline2Img,
      caption: 'Selecting your URL',
    },
    {
      type: 'text',
      text: 'Once you have completed the transaction the hub will be immediately ready and you can start to operate in it.',
    },
    { type: 'heading', level: 2, text: 'How direct debit is set up' },
    {
      type: 'text',
      text: 'Once you choose your selected plan you will be redirected to a page similar to the one below, managed by GoCardless:',
    },
    {
      type: 'figure',
      img: publishYourCadOnline3Img,
      caption: 'GoCardless mandate',
    },
    { type: 'text', text: 'Then you are asked to input the IBAN and account holder name.' },
    {
      type: 'figure',
      img: publishYourCadOnline4Img,
      caption: 'Entering bank details',
    },
    {
      type: 'text',
      text: 'Once the procedure is completed your CAD will be ready for the world to access.',
    },
  ],
};
