export const HowItShouldLook = {
  id: 'how-it-should-look',
  title: 'How it should look',
  blocks: [
    { type: 'heading', level: 2, text: 'A Complete Simple Model' },
    {
      type: 'code',
      code: `height = 50;
radius = 8;

module support() {
   cylinder(h = height, r = radius);
}

module top_plate() {
   translate([-20, -20, height])
   cube([40, 40, 5]);
}

module final_model() {
   support();
   top_plate();
}

final_model();`,
    },
  ],
};
