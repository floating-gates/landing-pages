export const AvailableMaterials = {
  id: 'available-materials',
  title: 'Available Materials',
  blocks: [
    {
      type: 'text',
      text: 'Materials need to be coupled with machines. Once a machine is selected as available it can be coupled with more than one material.',
    },
    {
      type: 'figure',
      img: '/docs-images/available-materials-1.png',
      caption: 'Coupling materials with machines',
    },
    { type: 'text', text: 'This is equivalent to saying:' },
    {
      type: 'list',
      ordered: false,
      items: [
        'Use Aluminium 5083 with a CNC 3-axis',
        'Use Aluminium 6061 with a CNC 3-axis and an SLS 3D printer',
        'Use Polypropylene with an FDM 3D printer and an SLS 3D printer',
      ],
    },
    { type: 'text', text: 'Insert a new material:' },
    {
      type: 'figure',
      img: '/docs-images/available-materials-2.png',
      caption: 'Inserting a new material',
    },
    {
      type: 'figure',
      img: '/docs-images/available-materials-3.png',
      caption: 'New material form',
    },
  ],
};
