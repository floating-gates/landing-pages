export const WhatIsGates = {
  id: 'what-is-gates',
  title: 'What is Gates',
  description: 'Introduction to how Gates is structured',
  blocks: [
    {
      type: 'text',
      text: 'Gates provides to You a Manufacturing Hub to funnel orders, while it hosts publicly a CAD Online to permit Your customers to engineer and price the devices ahead of time. The platform enables your customer to issue orders and to take advantage of feasibility checks, instant quotes, and design optimizations. The proxy is done via two sides.',
    },
    { type: 'heading', level: 3, text: '1. Consumer Side' },
    {
      type: 'text',
      text: 'It is a 3D CAD like App for your customers, where they can find devices you can produce, upload a generic file, automatically get your prices and select the manufacturing method. This 3D app is branded with your details.',
    },
    { type: 'heading', level: 3, text: '2. Manufacturer Side' },
    {
      type: 'text',
      text: 'It is a web app linked to the consumer side from which you can describe your machine and monitor orders.',
    },
    {
      type: 'text',
      text: 'Below is designed the funnelling of the platform and where data can come from:',
    },
    { type: 'figure', img: '/docs-images/what-is-gates-1.jpg', caption: 'Platform funnelling' },
    { type: 'heading', level: 2, text: 'Who This Guide Is For' },
    { type: 'text', text: '**Manufacturers with idle production capacity:**' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Configure machines, materials, and pricing parameters.',
        'Manage orders and production requests.',
        'Review automated manufacturability checks.',
      ],
    },
    { type: 'heading', level: 2, text: 'What\'s the scope' },
    {
      type: 'text',
      text: 'Patching low sales and the high amount of time spent on preliminary studies. Gates increases actual orders by spreading and assessing new customer requests. It streamlines quotes and performs technical checks, allowing manufacturers to operate more efficiently. It provides to your final customers features like:',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Design and configure parts using parametric tools',
        'Simulate manufacturing feasibility',
        'Generate real-time quotations',
        'Prepare validated production files ready for manufacturing',
      ],
    },
    { type: 'divider' },
    { type: 'heading', level: 2, text: 'System Requirements' },
    {
      type: 'text',
      text: 'Before you begin using Gates, ensure your system meets the following minimum requirements to guarantee smooth performance:',
    },
    {
      type: 'table',
      headers: ['Category', 'Minimum Requirement'],
      rows: [
        ['**Browser**', 'Google Chrome (recommended), Microsoft Edge, Firefox, Safari'],
        ['**Memory (RAM)**', '8 GB minimum (16 GB recommended)'],
        ['**Graphics**', 'Integrated GPU or NVIDIA GTX series and above'],
        ['**Internet Connection**', 'Stable broadband (5 Mbps or faster)'],
      ],
    },
    {
      type: 'quote',
      text: '**Tip:** Use Gates on a desktop browser for the best 3D visualization and parameter editing experience.',
    },
    { type: 'heading', level: 2, text: 'Core Modules' },
    {
      type: 'table',
      headers: ['Module', 'What it does'],
      rows: [
        [
          '**Machines Library**',
          'Allows selection from various manufacturing technologies such as 3D printing, CNC machining, and injection molding.',
        ],
        [
          '**Material Library**',
          'Offers a database of compatible materials for each process (e.g. Aluminium, Nylon, ABS).',
        ],
        [
          '**Parametric Design**',
          'Enables users to modify design dimensions and properties dynamically before generation, producing optimized 3D models based on input parameters and chosen configurations.',
        ],
        [
          '**Quotation Engine**',
          'Provides automatic real-time pricing based on model complexity and material usage.',
        ],
        [
          '**Manufacturing Check** (coming soon)',
          'Runs pre-production feasibility tests to detect design errors early.',
        ],
      ],
    },
  ],
};
