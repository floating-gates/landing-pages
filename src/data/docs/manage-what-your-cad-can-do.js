import manageWhatYourCadCanDo1Img from '../images/docs-images/factory-features.png';

export const FactoryFeatures = {
    id: 'manage-what-your-cad-can-do',
    title: 'Factory Features',
    description: 'Configure CAD feature availability, workflow permissions, and user capabilities across your organization.',
    blocks: [
        { type: 'heading', level: 2, text: 'Managing CAD Capabilities' },
        {
            type: 'text',
            text: 'Gates provides granular feature controls to streamline collaboration between manufacturers, internal engineering teams, and external customers. You can enable or disable specific CAD operations, inspection tools, and workflow permissions depending on user role.',
        },
        {
            type: 'text',
            text: 'To access and adjust these settings, navigate to the [Factory Features Panel](https://app.floating-gates.com/?menu=Factory+Features) in the Manufacturing Hub.',
        },
        {
            type: 'figure',
            img: manageWhatYourCadCanDo1Img,
            caption: 'Factory Features management interface and CAD capability toggles',
        },
    ],
};
