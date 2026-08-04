import automaticQuotations1Img from '../images/docs-images/automatic-quotations-1.png';
import automaticQuotations2Img from '../images/docs-images/automatic-quotations-2.png';
import automaticQuotations3Img from '../images/docs-images/automatic-quotations-3.png';
import automaticQuotations4Img from '../images/docs-images/automatic-quotations-4.png';

export const AutomaticQuotations = {
  id: 'automatic-quotations',
  title: 'Automatic Quotations',
  description: 'Let the customer qualify themselves and capture only good prospects',
  blocks: [
    { type: 'heading', level: 2, text: 'Automatic Quote' },
    { type: 'text', text: 'Once it is activated:' },
    {
      type: 'figure',
      img: automaticQuotations1Img,
      caption: 'Activating automatic quotes',
    },
    {
      type: 'text',
      text: 'your hub will show a specific button when your customers are about to quote:',
    },
    {
      type: 'figure',
      img: automaticQuotations2Img,
      caption: 'Automatic quote button',
    },
    { type: 'text', text: 'Below is the location of the feature:' },
    {
      type: 'figure',
      img: automaticQuotations3Img,
      caption: 'Feature location',
    },
    { type: 'text', text: 'A usual output of the automatic quote is:' },
    {
      type: 'figure',
      img: automaticQuotations4Img,
      caption: 'Automatic quote output',
    },
  ],
};
