export const Variables = {
  id: 'variables',
  title: 'Variables',
  blocks: [
    { type: 'heading', level: 2, text: 'Defining variables' },
    {
      type: 'text',
      text: 'Variables allow you to create parametric models that adapt to different dimensions.',
    },
    { type: 'heading', level: 2, text: 'How they are used in the model code' },
    { type: 'text', text: 'The actions above are translated into:' },
    {
      type: 'code',
      code: `wall_thickness = 2;
outer_radius = 20;`,
    },
    { type: 'text', text: 'and displayed as an annotation above the text editor.' },
  ],
};
