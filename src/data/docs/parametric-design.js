import parametricDesign1Img from '../images/docs-images/parametric-design-1.png';
import parametricDesign2Img from '../images/docs-images/parametric-design-2.png';

export const ParametricDesign = {
  id: 'parametric-design',
  title: 'Parametric Design',
  blocks: [
    { type: 'heading', level: 2, text: 'Create a Parametric Device' },
    { type: 'text', text: 'Let\'s set up a solenoid as an example.' },
    {
      type: 'list',
      ordered: true,
      items: [
        '**Create the model.** Start a new parametric device from the editor.',
        '**Set up the variables.** See [Variables](#manage-what-your-cad-can-do/parametric-design/variables).',
        '**Set up the model body.** See [Model](#manage-what-your-cad-can-do/parametric-design/model).',
      ],
    },
    { type: 'heading', level: 2, text: 'Make sure the feature is active' },
    { type: 'text', text: 'Be sure the feature is set to ON.' },
    {
      type: 'figure',
      img: parametricDesign1Img,
      caption: 'Parametric design toggle',
    },
    { type: 'heading', level: 2, text: 'Verify your catalogue online' },
    {
      type: 'text',
      text: 'The final stage of the procedure is verifying the presence of devices once you interact with your CAD online:',
    },
    { type: 'figure', img: parametricDesign2Img, caption: 'Catalogue online' },
    {
      type: 'text',
      text: 'You should see the device and the parameters you allow to be changed.',
    },
  ],
};
