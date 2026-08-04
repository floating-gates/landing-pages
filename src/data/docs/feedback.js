import feedback1Img from '../images/docs-images/feedback-1.png';

export const Feedback = {
  id: 'feedback',
  title: 'Feedback',
  description: 'We are looking forward to hearing back from you',
  blocks: [
    { type: 'text', text: 'Gates offers three primary ways to leave feedback:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'GitHub issues',
        'Email at [contact@floating-gates.com](mailto:contact@floating-gates.com)',
        'Reviews using F6S.com',
      ],
    },
    { type: 'text', text: 'To reach those easily we set up the **admin** page as follows:' },
    {
      type: 'figure',
      img: feedback1Img,
      caption: 'Feedback options on the admin page',
    },
    { type: 'text', text: 'You can use whichever is most convenient.' },
  ],
};
