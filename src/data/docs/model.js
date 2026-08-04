export const Model = {
  id: 'model',
  title: 'Model',
  description: 'The Gates parametric CAD model follows the OpenSCAD language',
  blocks: [
    {
      type: 'text',
      text: 'Gates provides a script-based 3D modelling system, which means that every geometric object in your design is described through code. Unlike interactive CAD tools where the user manipulates shapes directly in a graphical interface, the language we follow is already present in industry and is used by OpenSCAD, where models are defined declaratively: you describe the geometry, and the system generates the model. This approach makes OpenSCAD ideal for parametric, reproducible, and programmatically generated designs. The model handler looks like this:',
    },
    { type: 'figure', img: '/docs-images/model-1.png', caption: 'Model handler' },
    {
      type: 'text',
      text: 'This chapter introduces the core concepts, commands, and patterns involved in defining a model from scratch.',
    },
    { type: 'heading', level: 2, text: 'Geometry as Code' },
    {
      type: 'text',
      text: 'A model in OpenSCAD is built using primitives: basic shapes such as cubes, cylinders, spheres, and polyhedra. Each primitive is defined by a function-like command:',
    },
    {
      type: 'code',
      code: `cube([10, 20, 5]);
sphere(r = 15);
cylinder(h = 30, r = 8);`,
    },
    {
      type: 'text',
      text: 'Primitives generate geometry in 3D space but do not yet form a meaningful shape. To build useful models, they must be combined with transformations and Boolean operations.',
    },
    { type: 'heading', level: 2, text: 'Transformations: positioning and orienting geometry' },
    { type: 'text', text: 'OpenSCAD uses transformation operators to place objects in space.' },
    { type: 'heading', level: 3, text: 'Translation' },
    { type: 'text', text: 'Moves an object by a given vector:' },
    { type: 'code', code: 'translate([20, 0, 10]) cube(5);' },
    { type: 'heading', level: 3, text: 'Rotation' },
    { type: 'text', text: 'Rotates an object around the X, Y, or Z axis:' },
    { type: 'code', code: 'rotate([0, 0, 45]) cylinder(r = 5, h = 10);' },
    { type: 'heading', level: 3, text: 'Scaling' },
    { type: 'text', text: 'Scales an object along each axis:' },
    { type: 'code', code: 'scale([1, 2, 1]) sphere(10);' },
    {
      type: 'text',
      text: 'Transformations apply to the shape or block of shapes that follow them. Order matters, as transformations are applied sequentially.',
    },
    { type: 'heading', level: 2, text: 'Boolean operations: constructive solid geometry' },
    {
      type: 'text',
      text: 'OpenSCAD\'s modelling power comes from combining shapes using set operations.',
    },
    { type: 'heading', level: 3, text: 'Union' },
    { type: 'text', text: 'Combines shapes into one:' },
    {
      type: 'code',
      code: `union() {
    cube(10);
    sphere(r = 8);
}`,
    },
    { type: 'heading', level: 3, text: 'Difference' },
    { type: 'text', text: 'Subtracts shapes from the first one:' },
    {
      type: 'code',
      code: `difference() {
    cube(20);
    sphere(r = 12);
}`,
    },
    { type: 'heading', level: 3, text: 'Intersection' },
    { type: 'text', text: 'Keeps only the overlapping part of shapes:' },
    {
      type: 'code',
      code: `intersection() {
    cube(20);
    sphere(r = 15);
}`,
    },
    {
      type: 'text',
      text: 'These operations allow construction of complex geometries by assembling or removing volumes.',
    },
    { type: 'heading', level: 2, text: 'Using modules for reusable components' },
    {
      type: 'text',
      text: 'Modules allow you to structure your model into reusable building blocks. Defining a module:',
    },
    {
      type: 'code',
      code: `module pillar(height, radius) {
      cylinder(h = height, r = radius);
}

// Using a module
pillar(40, 3);
pillar(60, 4);`,
    },
    {
      type: 'text',
      text: 'Modules can contain primitives, transformations, logic, or other modules.',
    },
    { type: 'heading', level: 2, text: 'Hierarchical modelling' },
    {
      type: 'text',
      text: 'Complex models are created by combining simpler parts, each defined in its own module:',
    },
    {
      type: 'code',
      code: `module base() {
    cube([40, 40, 5]);
}

module stand() {
    translate([20, 20, 5])
    cylinder(h = 50, r = 5);
}

module model() {
    base();
    stand();
}

// Use the model
model();`,
    },
    {
      type: 'text',
      text: 'This modular structure reflects real assemblies and is essential for large designs.',
    },
    { type: 'heading', level: 2, text: 'Defining custom shapes with polyhedra' },
    {
      type: 'text',
      text: 'For shapes that cannot be described using primitives and CSG, OpenSCAD provides the `polyhedron` command:',
    },
    {
      type: 'code',
      code: `polyhedron(
    points = [[0,0,0], [10,0,0], [0,10,0], [0,0,10]],
    faces = [[0,1,2], [0,1,3], [1,2,3], [0,2,3]]
);`,
    },
    {
      type: 'text',
      text: 'This provides full control over vertices and faces, though it requires careful construction. Defining a model in OpenSCAD involves combining primitives, transformations, and Boolean logic to form complex structures. With a script-based, parametric approach, models become reproducible, adaptable, and easy to maintain.',
    },
  ],
};
