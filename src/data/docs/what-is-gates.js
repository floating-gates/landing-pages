import howItWorksImg from '../images/docs-images/what-is-gates-how-it-works.webp';

export const WhatIsGates = {
  id: 'what-is-gates',
  title: 'What is Gates',
  description: 'What Gates does, how it works, and what you need to run it',
  blocks: [
    {
      type: 'text',
      text: 'Autonomous Detection of Design Errors for Manufacturing and Future Maintenance. It read **Computer-Aided Design (CAD) files** that are available on your network. It holds each file up against the machines you actually own and the design rules you actually enforce, and based on them identifies the parts that can\'t be made and flags them before they proceed to production.',
    },
    {
      type: 'text',
      text: 'A person **always** decides what to do about a flag. Gates **never** touches your geometry.',
    },
    {
      type: 'text',
      text: 'The same checking engine can be used through an online CAD at your own address, so the parts that arrive from your own customers and suppliers can be ensured to have been checked through the same mechanism.',
    },
    { type: 'figure', img: howItWorksImg, caption: 'How Gates checks your factory' },
    { type: 'heading', level: 2, text: 'What this software will not do' },
      { type: 'text', text: 'Gates platform has not been tought to do the following: ' },
    {
      type: 'list',
      items: [
        '**It does not modify your CAD.** Gates reports; you revise.',
        '**It does not take payment.** When a customer accepts a price, you send payment details by whichever method you already use, an invoice or a direct transfer. Gates stays out of the transaction.',
        '**It does not set your prices.** It drafts a quote from your own cost inputs and leaves the final number to you.',
        '**It does not replace a design review.** It removes the mechanical part of one so that your reviewers can spend their attention on judgement calls.',
      ],
    },
    { type: 'heading', level: 2, text: 'Why using it?' },
    {
      type: 'text',
      text: 'About 20% of engineering issues can be missed during a traditional design review. Around 40% of drawings are saved in a configuration that cannot be manufactured as required. Catch these issues in CAD and it\'s cheap to revert and change. Catch them later, during production, and you can run into issues like over-tolerancing, wasted stock, rework, and field failures.',
    },
    {
      type: 'text',
      text: 'The more subtle version of the same problem is drift. Design guidelines exist and everyone agrees with them, but nobody checks every file against them every time. This is why Gates is worth using: it checks **every time**.',
    },

    // --- Core Modules ---
    { type: 'divider' },
    { type: 'heading', level: 2, text: 'Core Modules' },
    {
      type: 'text',
      text: 'The following are the core modules offered by Floating Gates, which can be used to manage the manufacturing hub.',
    },
    {
      type: 'table',
      headers: ['Module', 'Description'],
      rows: [
        ['**Early Manufacturing Issues discovery**', 'Provided your Design for Manufacturing rules profile. A playbook is attached to a machine, and that pairing is what a manufacturing analysis is run against.'],
        ['**Economics Forecasts**', 'Given the CAD details the quoting model communicate with no human intervention the minimum payment, business overhead, quantity discount bands, tolerance surcharges, surface finish costs, and urgency surcharges.'],
        ['**Autonomous Operations**', 'The software can run autonomously in the network to discover issues ahead of time in every PC on the factory floor. Each endpoint is constatnly under analysis, and it emails you when it finds an unreachable design.'],
    ]},
  ],
};
