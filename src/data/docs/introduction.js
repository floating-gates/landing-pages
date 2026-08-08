export const Introduction = {
  id: 'introduction',
  title: 'Introduction',
  description: 'What Gates does, how it works, and what you need to run it',
    blocks: [
    { type: 'heading', level: 2, text: 'What it does not do' },
    { type: 'text', text: 'Gates platform will not do the following:' },
    { type: 'list',
      ordered: false,
      items: [
        '**It does not modify your CAD.** Gates reports; you revise.',
        '**It does not take payment.** When a customer accepts a price, you send payment details by whichever method you already use, an invoice or a direct transfer. Gates stays out of the transaction.',
        '**It does not set your prices.** It drafts a quote from your own cost inputs and leaves the final number to you.',
        '**It does not replace a design review.** It removes the mechanical part of one so that your reviewers can spend their attention on judgement calls.',
      ],
    },
    { type: 'heading', level: 2, text: 'Scope' },
    {
      type: 'text',
      text: 'This documentation covers all aspects of the Gates platform, including detailed explanations of multiple user flows and interactions. Provided that Gates is a software stack which provides automated error detection in mechanical designs.',
    },
    { type: 'heading', level: 2, text: 'Audience' },
    {
      type: 'text',
      text: 'This documentation is intended for the customers, and the technical teams responsible for deploying and maintaining the system.',
    },
  ],
};
