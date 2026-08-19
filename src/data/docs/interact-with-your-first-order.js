import interactWithYourFirstOrder1Img from '../images/docs-images/interact-with-your-first-order-1.png';
import interactWithYourFirstOrder2Img from '../images/docs-images/interact-with-your-first-order-2.png';
import interactWithYourFirstOrder3Img from '../images/docs-images/interact-with-your-first-order-3.png';
import interactWithYourFirstOrder4Img from '../images/docs-images/interact-with-your-first-order-4.png';
import interactWithYourFirstOrder5Img from '../images/docs-images/interact-with-your-first-order-5.png';
import interactWithYourFirstOrder6Img from '../images/docs-images/interact-with-your-first-order-6.png';

export const InteractWithYourFirstOrder = {
  id: 'interact-with-your-first-order',
  title: 'Manufacturing Commitments',
  blocks: [
    { type: 'heading', level: 2, text: 'Check the Dashboard' },
    { type: 'text', text: 'You will see that an order appears:' },
    {
      type: 'figure',
      img: interactWithYourFirstOrder1Img,
      caption: 'Order on the dashboard',
    },
    { type: 'heading', level: 2, text: 'Inspect the order' },
    {
      type: 'text',
      text: 'From the order you can download the device, inspect it, and produce a price for it:',
    },
    {
      type: 'figure',
      img: interactWithYourFirstOrder2Img,
      caption: 'Inspecting the order',
    },
    { type: 'heading', level: 2, text: 'Set the price' },
    { type: 'text', text: 'Use the price input below and send the quote:' },
    {
      type: 'figure',
      img: interactWithYourFirstOrder3Img,
      caption: 'Setting the price',
    },
    {
      type: 'text',
      text: 'In the meantime the user has been sent an email with your formal offer, and they can accept or refuse it:',
    },
    {
      type: 'figure',
      img: interactWithYourFirstOrder4Img,
      caption: 'Customer accepting the offer',
    },
    { type: 'text', text: 'Once accepted:' },
    {
      type: 'figure',
      img: interactWithYourFirstOrder5Img,
      caption: 'Order accepted',
    },
    {
      type: 'text',
      text: 'From now on you can start manufacturing the device. Later, you can send the invoices and declare the shipment. Once you have declared the order shipped, it is considered closed.',
    },
    {
      type: 'figure',
      img: interactWithYourFirstOrder6Img,
      caption: 'Declaring shipment',
    },
    { type: 'text', text: 'Done, you have sold a propeller.' },
  ],
};
