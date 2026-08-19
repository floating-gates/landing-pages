/**
 * The documentation table of contents.
 *
 * Each chapter lives in its own file in this folder and exports a plain object
 * with `id`, `title`, an optional `description`, and an array of `blocks`.
 * This file is the only place the ordering and nesting are declared: the array
 * order is the reading order, and `children` becomes sidebar nesting.
 *
 * To add a chapter: create the file, import it here, drop it in the right spot.
 * See README.md in this folder for the block vocabulary.
 */

import { WhatIsGates } from './what-is-gates.js';
import { CoreComponents } from './core-components.js';
import { ProcessOfGates } from './process-of-gates.js';
import { InstallEnterprise } from './installation.js';

import { QuickStart } from './quick-start.js';
import { CreateYourFirstProject } from './create-your-first-project.js';
import { InteractWithYourFirstOrder } from './interact-with-your-first-order.js';
import { ViaAutonomousRoutine } from './via-autnomous-routine.js';
import { PublishYourCadOnline } from './publish-your-cad-online.js';

import { PrepareYourFactory } from './prepare-your-factory.js';
import { ProductionMachines } from './production-machines.js';
import { AvailableMaterials } from './available-materials.js';
import { Branding } from './branding.js';

import { FactoryFeatures } from './manage-what-your-cad-can-do.js';
import { AutomaticQuotations } from './automatic-quotations.js';
import { ParametricDesign } from './parametric-design.js';
import { Model } from './model.js';
import { Variables } from './variables.js';
import { HowItShouldLook } from './how-it-should-look.js';

import { SuspendTheSubscription } from './suspend-the-subscription.js';

/** Attach children to a chapter without mutating the imported object. */
function section(chapter, children) { return { ...chapter, children }} ;

export const docsContents = [
    section(WhatIsGates, [
        CoreComponents,
        InstallEnterprise,
        QuickStart]),
  section(PrepareYourFactory, [
      ProductionMachines,
      AvailableMaterials,
      Branding,
  ]),
  section(ProcessOfGates,
      [CreateYourFirstProject,
       ViaAutonomousRoutine],
    ),
  section(FactoryFeatures, [
    AutomaticQuotations,
    section(ParametricDesign, [
      Model,
      Variables,
      HowItShouldLook,
    ]),
  ]),
  InteractWithYourFirstOrder,
    section(PublishYourCadOnline, [
  SuspendTheSubscription,
    ])
];

export default docsContents;
