import customerFactoryCommunication1Img from '../images/docs-images/customer-factory-communication-1.svg';
import customerFactoryCommunication2Img from '../images/docs-images/customer-factory-communication-2.png';
import customerFactoryCommunication3Img from '../images/docs-images/customer-factory-communication-3.png';
import customerFactoryCommunication4Img from '../images/docs-images/customer-factory-communication-4.png';
import customerFactoryCommunication5Img from '../images/docs-images/customer-factory-communication-5.png';
import customerFactoryCommunication6Img from '../images/docs-images/customer-factory-communication-6.png';
import customerFactoryCommunication7Img from '../images/docs-images/customer-factory-communication-7.png';

export const CustomerFactoryCommunication = {
  id: 'customer-factory-communication',
  title: 'Customer-Factory Communication',
  description: 'How to communicate with your customers',
  blocks: [
    {
      type: 'text',
      text: 'The conversation between manufacturer and customer is deployed under the following schema:',
    },
    {
      type: 'figure',
      img: customerFactoryCommunication1Img,
      caption: 'Communication schema',
    },
    { type: 'heading', level: 2, text: 'In short' },
    { type: 'text', text: 'Below is the process with visuals.' },
    {
      type: 'heading',
      level: 3,
      text: 'Customer chooses a design of yours, or uploads a custom design',
    },
    { type: 'text', text: 'Once a customer accesses the online CAD, there can be two options:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Upload a custom 3D file in `.STL` or `.STEP` format',
        'Generate one device from your catalogue',
      ],
    },
    {
      type: 'figure',
      img: customerFactoryCommunication2Img,
      caption: 'CAD-Side',
    },
    { type: 'heading', level: 3, text: 'Customer asks for a quotation' },
    {
      type: 'text',
      text: 'From the online CAD interface the customer decides how the device should be built, the quantity, and leaves notes. Then they can proceed to auto quote (optional) and send the project for an in-depth evaluation by the manufacturer.',
    },
    {
      type: 'figure',
      img: customerFactoryCommunication3Img,
      caption: 'Requesting a quotation',
    },
    { type: 'heading', level: 3, text: 'Factory proposes a price' },
    {
      type: 'text',
      text: 'The factory can consult how the automatic quote has proposed a draft of the price and then decide the definitive price.',
    },
    {
      type: 'figure',
      img: customerFactoryCommunication4Img,
      caption: 'Factory-Side',
    },
    { type: 'heading', level: 3, text: 'Customer decides to accept or refuse' },
    {
      type: 'text',
      text: 'From the CAD interface, the customer can accept or refuse the price.',
    },
    {
      type: 'figure',
      img: customerFactoryCommunication5Img,
      caption: 'CAD-side',
    },
    { type: 'text', text: 'If the customer refuses, the project simply stops there.' },
    { type: 'heading', level: 3, text: 'Manufacturer sends payment details' },
    {
      type: 'text',
      text: 'Gates does not impose a payment method by itself, it lets the factory decide which method they prefer. Depending on your organization you can send an invoice or request a direct payment, as detailed below:',
    },
    {
      type: 'figure',
      img: customerFactoryCommunication6Img,
      caption: 'Payment details',
    },
    { type: 'heading', level: 3, text: 'Shipment' },
    { type: 'text', text: 'The address is recorded inside the project description:' },
    {
      type: 'figure',
      img: customerFactoryCommunication7Img,
      caption: 'Shipment address',
    },
  ],
};
