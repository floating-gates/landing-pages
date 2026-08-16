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
import { Introduction } from './introduction.js';
import { HowItWorks } from './how-it-works.js';
import { ProcessOfGates } from './process-of-gates.js';
import { InstallEnterprise } from './installation.js';

import { CustomerFactoryCommunication } from './customer-factory-communication.js';

import { QuickStart } from './quick-start.js';
import { SetTheFactory } from './set-the-factory.js';
import { CreateYourFirstProject } from './create-your-first-project.js';
import { InteractWithYourFirstOrder } from './interact-with-your-first-order.js';

import { PublishYourCadOnline } from './publish-your-cad-online.js';

import { PrepareYourFactory } from './prepare-your-factory.js';
import { ProductionMachines } from './production-machines.js';
import { AvailableMaterials } from './available-materials.js';
import { Branding } from './branding.js';

import { ManageWhatYourCadCanDo } from './manage-what-your-cad-can-do.js';
import { AutomaticQuotations } from './automatic-quotations.js';
import { ParametricDesign } from './parametric-design.js';
import { Model } from './model.js';
import { Variables } from './variables.js';
import { HowItShouldLook } from './how-it-should-look.js';

import { SuspendTheSubscription } from './suspend-the-subscription.js';
import { Feedback } from './feedback.js';

/** Attach children to a chapter without mutating the imported object. */
function section(chapter, children) { return { ...chapter, children }} ;

export const docsContents = [
  section(WhatIsGates, [Introduction, HowItWorks, ProcessOfGates, InstallEnterprise]),
  CustomerFactoryCommunication,
  section(QuickStart, [
    SetTheFactory,
    CreateYourFirstProject,
    InteractWithYourFirstOrder,
  ]),
  PublishYourCadOnline,
  section(PrepareYourFactory, [
    ProductionMachines,
    AvailableMaterials,
    Branding,
  ]),
  section(ManageWhatYourCadCanDo, [
    AutomaticQuotations,
    section(ParametricDesign, [
      Model,
      Variables,
      HowItShouldLook,
    ]),
  ]),
  SuspendTheSubscription,
  Feedback,
];

export default docsContents;
