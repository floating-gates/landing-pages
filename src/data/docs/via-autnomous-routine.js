import createYourFirstProject1Img from '../images/docs-images/create-your-first-project-1.png';
import createYourFirstProject2Img from '../images/docs-images/create-your-first-project-2.png';
import createYourFirstProject3Img from '../images/docs-images/create-your-first-project-3.png';
import createYourFirstProject4Img from '../images/docs-images/create-your-first-project-4.png';
import createYourFirstProject5Img from '../images/docs-images/create-your-first-project-5.png';

export const ViaAutonomousRoutine = {
  id: 'via-autonomous-routine',
  title: 'Using the Autonomous Agent',
  blocks: [
    {
      type: 'text',
      text: 'Click **Place an Order Yourself** on the Dashboard for internal project creation:',
    },
    {
      type: 'figure',
      img: createYourFirstProject1Img,
      caption: 'Place an order yourself',
    },
    { type: 'text', text: 'You will then be redirected to your CAD interface:' },
    {
      type: 'figure',
      img: createYourFirstProject2Img,
      caption: 'CAD interface',
    },
    {
      type: 'text',
      text: 'Load a device using one of the available loaders. If you have set up a model you can directly create a parametric design (right), or you can upload a model of your own with the general uploader (left):',
    },
    {
      type: 'figure',
      img: createYourFirstProject3Img,
      caption: 'Device loaders',
    },
    {
      type: 'text',
      text: 'Once you have loaded a device you can proceed to launching a quote:',
    },
    {
      type: 'figure',
      img: createYourFirstProject4Img,
      caption: 'Launching a quote',
    },
    {
      type: 'text',
      text: 'Using the corresponding button, which will bring you to the following selections:',
    },
    {
      type: 'figure',
      img: createYourFirstProject5Img,
      caption: 'Quote selections',
    },
    {
      type: 'text',
      text: 'Choose your desired machine type (e.g. FDM 3D printer, CNC, or injection molding) and select a material (e.g. Aluminium 6061 or Nylon 6). Fill in the other details and click **Send to Quote**.',
    },
  ],
};
