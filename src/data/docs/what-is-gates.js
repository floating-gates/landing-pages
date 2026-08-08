import howItWorksImg from '../images/docs-images/what-is-gates-how-it-works.svg';

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
    { type: 'figure', img: howItWorksImg, caption: 'How Gates works' },
    { type: 'heading', level: 2, text: 'Why Gates is worth using' },
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
        ['**Materials**', 'Cost per cm³ plus the physical properties Gates reasons with: density, Young\'s modulus, Poisson ratio, yield strength, ultimate tensile strength, thermal conductivity. Each material is tied to the machines that can run it.'],
        ['**Design Playbook**', 'Your DfM rule profiles. A playbook is attached to a machine, and that pairing is what an analysis is run against.'],
        ['**Economics Forecasts**', 'The quoting model: minimum payment, business overhead, quantity discount bands, tolerance surcharges, surface finish costs, and urgency surcharges.'],
        ['**Autonomous Operations in Network**', 'The remote CAD libraries the agent watches. Each endpoint is an address, a library root path, a compatible machine, and an email to warn when it goes unreachable.'],
    ]},
  ],
};
