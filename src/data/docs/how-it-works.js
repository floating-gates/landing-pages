import twoSurfacesImg from '../images/docs-images/how-gates-work-two-surfaces.webp';
import funnelImg from '../images/docs-images/how-gates-work-funnel.webp';

export const CoreComponents = {
  id: 'how-it-works',
  title: 'Core Components',
  description: 'What Gates does, how it works, and what you need to run it',
    blocks: [
    {
      type: 'text',
      text: 'Gates work using the same baseline two distinct category of clients. They find flaws before your turn on the machines.',
    },
    { type: 'figure', img: twoSurfacesImg, caption: 'Who interact with the machine', full: true },
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
    { type: 'heading', level: 2, text: 'Configuration of the factory' },
    {
      type: 'text',
      text: 'You can configure your factory once. Based on the configuration settings the process works both directions at the same time, which is the reason a quote and a feasibility check can never disagree with each other.',
    },
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
  ],
};
