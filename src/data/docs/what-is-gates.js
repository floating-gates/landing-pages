import howItWorksImg from '../images/docs-images/what-is-gates-how-it-works.svg';
import twoSurfacesImg from '../images/docs-images/how-gates-work-two-surfaces.svg';
import funnelImg from '../images/docs-images/how-gates-work-funnel.png';
import pipelineImg from '../images/docs-images/process-of-gates-pipeline.svg';

export const WhatIsGates = {
  id: 'what-is-gates',
  title: 'What is Gates',
  description: 'What Gates does, how it works, and what you need to run it',
  blocks: [
    // --- What is Gates ---
    {
      type: 'text',
      text: 'Gates is a manufacturability checker that lives inside your factory.',
    },
    {
      type: 'text',
      text: 'It is able to read the **Computer-Aided Design (CAD) files** that are available on your network. It holds each file up against the machines you actually own and the design rules you actually enforce, and based on them identifies the parts that can\'t be made and flags them before they proceed to production.',
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

    // --- Introduction ---
    { type: 'divider' },
    { type: 'heading', level: 2, text: 'Introduction' },
    {
      type: 'text',
      text: 'Floating Gates is a software which provides automated error detection in mechanical designs which are based on Factory Networks.',
    },
    { type: 'heading', level: 3, text: 'Purpose' },
    {
      type: 'text',
      text: 'This documentation website provides a comprehensive guide to the Floating Gates platform, detailing its structure, features and processes.',
    },
    { type: 'heading', level: 3, text: 'Scope' },
    {
      type: 'text',
      text: 'This documentation covers all aspects of the Floating Gates platform, including detailed explanations of multiple user flows and interactions.',
    },
    { type: 'heading', level: 3, text: 'Audience' },
    {
      type: 'text',
      text: 'This documentation is intended for the customers of the Floating Gates platform, and the technical teams responsible for deploying and maintaining the system. The main intended audience for this guide are **manufacturers with idle production capacity.**',
    },
    { type: 'heading', level: 3, text: 'Non-goals' },
    { type: 'text', text: 'The Gates platform will not do the following:' },
    {
      type: 'list',
      ordered: false,
      items: [
        '**It does not modify your CAD.** Gates reports; you revise.',
        '**It does not take payment.** When a customer accepts a price, you send payment details by whichever method you already use, an invoice or a direct transfer. Gates stays out of the transaction.',
        '**It does not set your prices.** It drafts a quote from your own cost inputs and leaves the final number to you.',
        '**It does not replace a design review.** It removes the mechanical part of one so that your reviewers can spend their attention on judgement calls.',
      ],
    },

    // --- How Gates Work ---
    { type: 'divider' },
    { type: 'heading', level: 2, text: 'How Gates work' },
    { type: 'heading', level: 3, text: 'How Gates decide' },
    {
      type: 'text',
      text: 'Gates work on three important mechanisms. They are processed together to ensure that the flaws are identified earlier during checks.',
    },
    { type: 'heading', level: 3, text: '1. DfM Rules Check' },
    {
      type: 'text',
      text: 'Every CAD file design is measured against a centralised Design Playbook. This includes your own Design for Manufacturability (DfM) rules, engineering constraints, tolerances, and standardised practices. The playbook is written once and applied consistently, which ensures the same result regardless of time or circumstance.',
    },
    { type: 'heading', level: 3, text: '2. CAD as a Graph' },
    {
      type: 'text',
      text: 'Gates maps the individual manufacturing features and their relationships as an attributed graph. This mechanism allows it to detect problems a CAD viewer can only show and not catch. Examples for this can be an undercut a 3-axis tool can\'t reach, a wall too thin for the material, or a fixture with nowhere to grip.',
    },
    { type: 'heading', level: 3, text: '3. In-Network Operation' },
    {
      type: 'text',
      text: 'Gates runs through your existing infrastructure, with the process performed entirely behind your firewall. The geometry is read at its source, ensuring your intellectual property **never** leaves your environment.',
    },
    { type: 'heading', level: 3, text: 'Configuration of the factory' },
    {
      type: 'text',
      text: 'You can configure your factory once. Based on the configuration settings the process works both directions at the same time, which is the reason a quote and a feasibility check can never disagree with each other.',
    },
    { type: 'figure', img: twoSurfacesImg, caption: 'The two surfaces of the platform' },
    {
      type: 'table',
      headers: ['Surface', 'Where it runs', 'What it is for'],
      rows: [
        ['**Manufacturing Hub**', 'app.floating-gates.com', 'Configure the factory, watch the scan results, review incoming orders, set final prices.'],
        ['**good2manufactured agent**', 'A Windows service on your own machine.', 'Watch the file system, route every step file through the DfM pipeline before it reaches production.'],
        ['**Online CAD**', 'your-name.floating-gates.com', 'Your very own 3D app where you and your internal teams configure a part, see whether you can make it, and see what it costs.'],
      ],
    },
    {
      type: 'text',
      text: 'These surfaces sit right in the middle of a funnel, as shown below.',
    },
    { type: 'figure', img: funnelImg, caption: 'Where requests come from and where they are routed' },
    {
      type: 'text',
      text: 'The requests can come from internal teams, leads, existing customers, new customers, even your own inventory. Based on the requests received, the Online CAD and the Manufacturing Hub communicate with each other to check and price each one. Then the response gets routed to whichever class of machine can actually produce it: subtractive, forming, forging, or additive.',
    },
    { type: 'heading', level: 3, text: 'Where prices come from' },
    {
      type: 'text',
      text: 'Gates never invents or assumes a number. Every line in a quote traces back to something you entered in the **Economics** module, which means you can always explain the price to a customer.',
    },
    {
      type: 'table',
      headers: ['Line', 'Where it is extracted from'],
      rows: [
        ['Material cost', 'Cost per cm³ of the chosen material'],
        ['Machining time', 'Machine hourly rate and throughput'],
        ['Tolerance adjustment', 'Your tolerance surcharge table'],
        ['Surface finish', 'Your surface finish cost table'],
        ['Quantity discount', 'Your discount bands, subtracted'],
        ['Delivery adjustment', 'Your urgency surcharges'],
        ['Setup price', 'Setup cost of the chosen machine'],
        ['**Price per unit, then total**', 'The sum, multiplied by quantity'],
      ],
    },
    {
      type: 'text',
      text: 'The automatic quote is a **draft**. You will always see it before your customer commits to the quote, and you are the one responsible for setting the final number.',
    },

    // --- Process of Gates ---
    { type: 'divider' },
    { type: 'heading', level: 2, text: 'Process of Gates' },
    { type: 'heading', level: 3, text: 'Customer\'s pipeline' },
    {
      type: 'text',
      text: 'The online CAD offered by Gates is a streamlined pipeline and not a form. Each step unlocks the next gradually, so a part cannot be ordered before it has been checked against your rules and priced against your costs.',
    },
    { type: 'heading', level: 3, text: '1. Upload' },
    {
      type: 'text',
      text: 'The customer starts by uploading a CAD file, either as an STL or STEP format, or by selecting from your catalogue if the part already exists in your system.',
    },
    { type: 'heading', level: 3, text: '2. Material' },
    {
      type: 'text',
      text: 'Materials are assigned per face rather than per part, meaning different surfaces or features of the same component can be assigned different materials where it is required.',
    },
    {
      type: 'text',
      text: 'Only machines that have been marked compatible with the part\'s geometry and requirements are shown as options, narrowing the choice to what\'s actually **viable**.',
    },
    { type: 'heading', level: 3, text: '3. Finishes' },
    {
      type: 'text',
      text: 'Surface finish options are pulled from your finish table, so the customer only sees finishes you\'ve configured as available.',
    },
    { type: 'heading', level: 3, text: '4. Manufacturing Analysis' },
    {
      type: 'text',
      text: 'This is where your design playbook runs: all the rules and logic you\'ve defined for feasibility, tolerancing, and producibility get applied here.',
    },
    { type: 'heading', level: 3, text: '5. Economic Analysis' },
    {
      type: 'text',
      text: 'Based on the prior steps, the system calculates quantity-based pricing and delivery date.',
    },
    { type: 'heading', level: 3, text: '6. Commit' },
    {
      type: 'text',
      text: 'The final step, where the order is confirmed and lands directly in your Manufacturing Hub for fulfillment.',
    },
    { type: 'figure', img: pipelineImg, caption: 'The customer pipeline' },
    {
      type: 'text',
      text: 'In practice, that means the enquiries that you receive are the ones you can actually make, while the ones with flaws are dismissed via the online CAD. You spend your time reviewing work worth your time while skipping through requests that cannot be done effectively.',
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
        ['**Machines**', 'Your fleet, from presets (FDM, SLS, SLA, CNC 3-axis, CNC 5-axis, injection moulding) or defined from scratch. Each carries a running cost per hour, a throughput in cm³ per hour, and a setup cost per project.'],
        ['**Materials**', 'Cost per cm³ plus the physical properties Gates reasons with: density, Young\'s modulus, Poisson ratio, yield strength, ultimate tensile strength, thermal conductivity. Each material is tied to the machines that can run it.'],
        ['**Design Playbook**', 'Your DfM rule profiles. A playbook is attached to a machine, and that pairing is what an analysis is run against.'],
        ['**Economics**', 'The quoting model: minimum payment, business overhead, quantity discount bands, tolerance surcharges, surface finish costs, and urgency surcharges.'],
        ['**Network**', 'The remote CAD libraries the agent watches. Each endpoint is an address, a library root path, a compatible machine, and an email to warn when it goes unreachable.'],
        ['**Brand**', 'Your logo, applied to the online CAD your customers see.'],
      ],
    },

    // --- Prerequisites ---
    { type: 'divider' },
    { type: 'heading', level: 2, text: 'Prerequisites' },
    {
      type: 'text',
      text: 'Before accessing Floating Gates, ensure that your system meets the following minimum requirements for smooth performance:',
    },
    {
      type: 'table',
      headers: ['Category', 'Minimum Requirement'],
      rows: [
        ['Browser', 'Google Chrome (recommended), Microsoft Edge, Firefox, Safari.'],
        ['Memory (RAM)', '8 GB **minimum** (16 GB recommended).'],
        ['Graphics', 'Integrated GPU or NVIDIA GTX series and above.'],
        ['Internet Connection', 'Stable broadband (5 Mbps or faster).'],
        ['Agent Host', 'Windows 10 or 11 (64-bit), 4 GB RAM, Enterprise plan.'],
      ],
    },
    {
      type: 'quote',
      text: '**Tip:** Use Gates on a desktop browser for the best 3D visualization and parameter editing experience.',
    },
  ],
};
