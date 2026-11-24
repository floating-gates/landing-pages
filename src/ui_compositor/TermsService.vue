<script setup>
import { contactInfo } from "../config.js";
import Header from "../components/Header.vue"

const lastUpdated = 'November 24, 2026';

function scrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
</script>

<template>
<Header :context="'landing-page'" />
<div class="terms-container">
  <div class="header-section">
    <h1 class="main-title">Terms of Service</h1>
    <div class="company-info">
      <p class="last-updated">Last Updated: {{ lastUpdated }}</p>
    </div>
  </div>
  
  <div class="content-wrapper">
    <nav class="table-of-contents">
      <h3>Table of Contents</h3>
      <ul>
        <li><a href="#acceptance" @click="scrollTo('acceptance')">1. Acceptance of Terms</a></li>
        <li><a href="#description" @click="scrollTo('description')">2. Service Description</a></li>
        <li><a href="#definitions" @click="scrollTo('definitions')">3. Definitions</a></li>
        <li><a href="#eligibility" @click="scrollTo('eligibility')">4. Eligibility</a></li>
        <li><a href="#account" @click="scrollTo('account')">5. Account Registration</a></li>
        <li><a href="#platform-services" @click="scrollTo('platform-services')">6. Platform Services</a></li>
        <li><a href="#responsibilities" @click="scrollTo('responsibilities')">7. User Responsibilities</a></li>
        <li><a href="#intellectual-property" @click="scrollTo('intellectual-property')">8. Intellectual Property</a></li>
        <li><a href="#data-privacy" @click="scrollTo('data-privacy')">9. Data Privacy and Security</a></li>
        <li><a href="#payment" @click="scrollTo('payment')">10. Payment Terms</a></li>
        <li><a href="#limitations" @click="scrollTo('limitations')">11. Service Limitations</a></li>
        <li><a href="#termination" @click="scrollTo('termination')">12. Termination</a></li>
        <li><a href="#disclaimers" @click="scrollTo('disclaimers')">13. Disclaimers</a></li>
        <li><a href="#limitation-liability" @click="scrollTo('limitation-liability')">14. Limitation of Liability</a></li>
        <li><a href="#indemnification" @click="scrollTo('indemnification')">15. Indemnification</a></li>
        <li><a href="#governing-law" @click="scrollTo('governing-law')">16. Governing Law</a></li>
        <li><a href="#changes" @click="scrollTo('changes')">17. Changes to Terms</a></li>
        <li><a href="#partnership" @click="scrollTo('partnership')">18. Partnership Agreements</a></li>
        <li><a href="#contact" @click="scrollTo('contact')">19. Contact Information</a></li>
      </ul>
    </nav>
    
    <main class="terms-content">
      <section id="acceptance" class="term-section">
        <h2>1. Acceptance of Terms</h2>
        <p>
          These Terms of Service ("Terms") constitute a legally binding agreement between you ("User") and
          Floating Gates di Mattia Samiolo ("Company", "we", "us"), a legal entity governed by the laws of Italy.
          By accessing or using the Gates platform, the Huckster Interface, the MCP Server, Good2Manufacture,
          or any related website, software, or documentation (together, the "Platform"), you acknowledge that
          you have read, understood, and agree to be bound by these Terms and by our Privacy Policy.
        </p>
        <p>
          If you are using the Platform on behalf of a company or organization, you represent and warrant that
          you have the legal authority to bind that entity to these Terms. If you do not agree, you must not
          access or use the Platform.
        </p>
      </section>
      
      <section id="description" class="term-section">
        <h2>2. Service Description</h2>
        <p>
          Floating Gates provides software for autonomous detection of discrepancies in CAD files and
          geometric dimensioning and tolerancing (GD&amp;T) documentation. The Platform helps factories,
          engineering teams, suppliers, and customers check designs against Design for Manufacturing (DFM)
          rules before those files move further in a production workflow.
        </p>
        <p>The Platform currently includes:</p>
        <ul>
          <li>
            <strong>Huckster Interface:</strong> a public-facing or organization-hosted web portal where
            suppliers, customers, and employees can submit CAD and GD&amp;T files for manufacturability checks.
          </li>
          <li>
            <strong>MCP Server:</strong> a Model Context Protocol interface that lets compatible AI models
            and agents discover tools and query or act on resources you explicitly connect.
          </li>
          <li>
            <strong>Good2Manufacture:</strong> a local server and client deployment that sits on a factory
            network, watches design files, and evaluates them against your DFM standards.
          </li>
        </ul>
        <p>
          <strong>Critical Disclaimer:</strong> The Company is a software provider. We are not a manufacturer,
          reseller, broker, or party to any contract for the sale, machining, inspection, or delivery of parts.
          Platform output is decision-support only. You remain solely responsible for engineering judgment,
          quality, safety, and any commercial relationship with your suppliers or customers.
        </p>
      </section>
      
      <section id="definitions" class="term-section">
        <h2>3. Definitions</h2>
        <ul>
          <li>
            <strong>"Platform"</strong> means the Gates software and related services, including hosted
            instances under floating-gates.com, local Good2Manufacture software, documentation, and APIs.
          </li>
          <li>
            <strong>"Customer"</strong> means the business that purchases or administers a Cloud or Enterprise plan.
          </li>
          <li>
            <strong>"Stakeholder"</strong> means a supplier, customer, employee, or other person invited to
            submit or review files through a Huckster Interface or connected client.
          </li>
          <li>
            <strong>"User Content"</strong> means CAD files, GD&amp;T drawings, project metadata, factory rules,
            comments, and other materials uploaded to or processed by the Platform.
          </li>
          <li>
            <strong>"Cloud Service"</strong> means hosted Huckster Interface and MCP features operated by the Company.
          </li>
          <li>
            <strong>"Enterprise Deployment"</strong> means Good2Manufacture software licensed for installation
            on systems you control.
          </li>
          <li>
            <strong>"Analysis Output"</strong> means issues, warnings, feasibility results, and other findings
            generated by the Platform.
          </li>
        </ul>
      </section>
      
      <section id="eligibility" class="term-section">
        <h2>4. Eligibility</h2>
        <p>To use the Platform, you must:</p>
        <ul>
          <li>Be at least 18 years of age, or the age of majority in your jurisdiction</li>
          <li>Have the legal capacity to enter into binding agreements</li>
          <li>Use the Platform for a legitimate professional or business purpose</li>
          <li>Not be prohibited from using the Platform under applicable law, including Italian law</li>
          <li>Comply with export-control, sanctions, and confidentiality obligations that apply to your files</li>
        </ul>
      </section>
      
      <section id="account" class="term-section">
        <h2>5. Account Registration and Security</h2>
        <p>
          <strong>5.1 Account Creation:</strong> Access to most Platform features requires an account with
          accurate, complete, and current information. You are responsible for keeping that information up to date.
        </p>
        <p>
          <strong>5.2 Account Security:</strong> You are solely responsible for the confidentiality of credentials,
          API keys, and MCP access tokens. You must notify us promptly of any unauthorized access.
        </p>
        <p>
          <strong>5.3 Roles:</strong> A Customer may invite Stakeholders and assign roles. The Customer is
          responsible for who can upload files, connect factory resources, or enable AI tools.
        </p>
        <p>
          <strong>5.4 Stakeholder Access:</strong> A person who only submits files through a Huckster Interface
          may have limited access. By submitting files, that person also accepts these Terms to the extent they apply.
        </p>
      </section>
      
      <section id="platform-services" class="term-section">
        <h2>6. Platform Services</h2>
        <p>
          <strong>6.1 Huckster Interface:</strong> The Huckster Interface accepts CAD and GD&amp;T submissions
          and runs manufacturability checks against the rules configured for that instance. A Standard Cloud
          instance may use a custom hostname under floating-gates.com. Enterprise Customers may choose whether
          to expose a public Huckster Interface.
        </p>
        <p>
          <strong>6.2 MCP Server:</strong> The MCP Server exposes validated tool schemas and resources to
          compatible AI systems such as Claude, Mistral, and OpenAI clients. You decide which tools and data
          sources to connect. You are responsible for the prompts, permissions, and actions of any agent you enable.
        </p>
        <p>
          <strong>6.3 Good2Manufacture:</strong> Good2Manufacture consists of a server installed on a Linux host
          you control and one or more clients on operator machines. A server without clients cannot see factory
          files. A client without a reachable server cannot evaluate them. Enterprise licenses cover the local
          software and do not transfer ownership of our source code or models.
        </p>
        <p>
          <strong>6.4 Availability:</strong> We aim to keep Cloud Services available, but we do not guarantee
          uninterrupted access. Maintenance, updates, or events outside our control may cause temporary interruption.
          Local deployments depend on your infrastructure.
        </p>
        <p>
          <strong>6.5 Modifications:</strong> We may modify, suspend, or discontinue Cloud features with at least
          one week of notice where reasonably practicable, except where we must act sooner for security or legal reasons.
        </p>
      </section>
      
      <section id="responsibilities" class="term-section">
        <h2>7. User Responsibilities</h2>
        <p>
          <strong>7.1 Customer Responsibilities:</strong> If you administer a factory or organization account, you must:
        </p>
        <ul>
          <li>Configure manufacturing rules, tolerances, and access permissions that match your actual process</li>
          <li>Verify Analysis Output before releasing, quoting, machining, or approving a design</li>
          <li>Ensure Stakeholders have the right to upload the files they submit</li>
          <li>Keep local Good2Manufacture servers, clients, and networks reasonably secure and up to date</li>
          <li>Control which factory systems, files, and credentials are exposed through the MCP Server</li>
        </ul>
        <p>
          <strong>7.2 File and Confidentiality Duties:</strong> You must not upload content you do not have the
          right to process. You are responsible for marking, restricting, and handling trade secrets, export-controlled
          data, and personal data contained in drawings or file metadata.
        </p>
        <p>
          <strong>7.3 Prohibited Activities:</strong> Users must not:
        </p>
        <ul>
          <li>Upload malware, or attempt to probe, reverse engineer, or disrupt the Platform</li>
          <li>Bypass plan limits, authentication, or usage metering</li>
          <li>Use the Platform for unlawful weapons, sanctioned parties, or other illegal purposes</li>
          <li>Share account credentials or MCP tokens with unauthorized parties</li>
          <li>Misrepresent Analysis Output as a certified inspection, CE marking, or legal approval</li>
          <li>Resell or sublicense the software except as expressly allowed in an Enterprise agreement</li>
        </ul>
      </section>
      
      <section id="intellectual-property" class="term-section">
        <h2>8. Intellectual Property Rights</h2>
        <p>
          <strong>8.1 Platform IP:</strong> Floating Gates retains all rights, title, and interest in the Platform,
          including software, models, algorithms, interfaces, documentation, and Analysis Output formats.
        </p>
        <p>
          <strong>8.2 User Content:</strong> You retain ownership of your User Content. You grant us a worldwide,
          non-exclusive, royalty-free license to host, process, transmit, and display that content solely as needed
          to operate the plan you selected and to provide support.
        </p>
        <p>
          <strong>8.3 Plan-specific use of User Content:</strong>
        </p>
        <ul>
          <li>
            <strong>Basic / Freemium (Cloud):</strong> By using the free plan you grant Floating Gates a
            worldwide, non-exclusive, royalty-free, perpetual license to use the CAD files, GD&amp;T
            documentation, and related project materials you upload (a) in advertising, marketing, case
            studies, demos, and other promotional materials for the Company and the Platform, and (b) to
            train, evaluate, and improve our proprietary AI models and detection features.
            We may create screenshots, renders, excerpts, and derived examples for those purposes.
            We will not sell your files as a standalone dataset. Do not upload files you cannot allow us
            to use for advertising or proprietary model training.
          </li>
          <li>
            <strong>Standard (Cloud):</strong> Projects are treated as private. We process them to provide the
            service and support, not to train general models.
          </li>
          <li>
            <strong>Enterprise (local):</strong> Files processed on your Good2Manufacture deployment remain on
            systems you control, except for crash reports, license checks, or support materials you choose to send us.
          </li>
        </ul>
        <p>
          <strong>8.4 Feedback:</strong> Suggestions or improvements you provide may be used by Floating Gates
          without compensation or attribution.
        </p>
      </section>
      
      <section id="data-privacy" class="term-section">
        <h2>9. Data Privacy and Security</h2>
        <p>
          <strong>9.1 Privacy Policy:</strong> Personal data is processed as described in our Privacy Policy,
          including account data, usage logs, and any personal data embedded in uploaded files.
        </p>
        <p>
          <strong>9.2 Cloud vs local processing:</strong> Cloud Services process User Content on infrastructure
          we operate or our subprocessors operate. Enterprise Deployments process factory files on your network.
          Connecting an MCP client or third-party model may send prompts, tool results, or file excerpts to that provider.
        </p>
        <p>
          <strong>9.3 Security:</strong> We apply industry-standard measures to Cloud Services. No system is
          completely secure. You are responsible for access control on local deployments and for the security
          of Stakeholder invitations.
        </p>
      </section>
      
      <section id="payment" class="term-section">
        <h2>10. Payment Terms</h2>
        <p>
          <strong>10.1 Plans:</strong> Current commercial plans are described on our pricing page and may change
          with notice:
        </p>
        <ul>
          <li><strong>Basic / Freemium:</strong> free Cloud Service, with storage and feature limits. Uploaded CAD and GD&amp;T may be used for advertising and for training our proprietary AI models, as described in section 8.3</li>
          <li><strong>Standard:</strong> recurring Cloud subscription, billed monthly, including VAT where applicable</li>
          <li><strong>Enterprise:</strong> one-time or otherwise agreed fee for local Good2Manufacture deployment and related services</li>
        </ul>
        <p>
          <strong>10.2 Billing:</strong> Paid Cloud subscriptions renew until cancelled. Fees are due in the
          currency shown at checkout. We use third-party payment processors and do not store full payment-card data.
        </p>
        <p>
          <strong>10.3 Enterprise:</strong> Enterprise scope, payment schedule, supported hosts, and any public
          Huckster Interface are set in the order form or separate agreement. If those documents conflict with
          these Terms, the Enterprise documents control for that deployment.
        </p>
        <p>
          <strong>10.4 Refunds:</strong> Refund eligibility depends on the plan and the circumstances.
          Claims must be sent to {{ contactInfo.email }} before the first week of the past billing cycle
          and are evaluated against internal usage metrics. Unused Enterprise professional services are
          handled in the applicable order form.
        </p>
      </section>
      
      <section id="limitations" class="term-section">
        <h2>11. Service Limitations and Accuracy</h2>
        <p>
          <strong>11.1 Analysis is not certification:</strong> Analysis Output is generated by automated
          software from the files and rules you provide. It may miss issues, report false positives, or
          fail on unsupported formats, incomplete GD&amp;T, or unusual geometry.
        </p>
        <p>
          <strong>11.2 No manufacturing guarantee:</strong> We do not guarantee that a file marked feasible
          can be produced, inspected, or certified, or that a flagged issue is the only defect in a design.
        </p>
        <p>
          <strong>11.3 Human verification:</strong> Users must have a qualified person review Analysis Output
          before making manufacturing, purchasing, or safety decisions.
        </p>
        <p>
          <strong>11.4 Agents:</strong> Actions taken by an AI agent through the MCP Server are performed
          under your configuration and authority. We are not responsible for commands an agent issues to
          connected tools or data sources.
        </p>
      </section>
      
      <section id="termination" class="term-section">
        <h2>12. Termination</h2>
        <p>
          <strong>12.1 User Termination:</strong> You may stop using Cloud Services and request account closure
          through the Platform or by emailing {{ contactInfo.email }}. Enterprise software use ends according
          to the license term in your order.
        </p>
        <p>
          <strong>12.2 Our Termination Rights:</strong> We may suspend or terminate access for violation of
          these Terms, non-payment, fraud, illegal activity, security risk, or extended inactivity.
        </p>
        <p>
          <strong>12.3 Effect of Termination:</strong> Upon termination of a Cloud account, access ceases and
          we may delete User Content after any legally required retention period. Termination does not give
          you rights in our software. Surviving sections include intellectual property, disclaimers, liability
          limits, indemnification, and governing law.
        </p>
      </section>
      
      <section id="disclaimers" class="term-section">
        <h2>13. Disclaimers</h2>
        <p>
          The Platform is provided "as is" and "as available" without warranties of any kind, express or implied,
          including merchantability, fitness for a particular purpose, title, and non-infringement.
          We do not warrant that the Platform will be uninterrupted, error-free, or free from harmful components,
          or that Analysis Output will identify every design or documentation defect.
          Your use of the Platform is at your sole risk.
        </p>
      </section>
      
      <section id="limitation-liability" class="term-section">
        <h2>14. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Floating Gates shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages, including lost profits, scrap, rework, recall, production
          downtime, data loss, or business interruption.
        </p>
        <p>
          Without limiting the above, we are not liable for parts manufactured from files processed by the Platform,
          for missed or incorrect DFM findings, or for actions taken by an AI agent you connect through the MCP Server.
        </p>
        <p>
          Our total liability for claims arising from these Terms or the Platform shall not exceed the amount
          you paid us for the affected service in the <strong>3 (three) months</strong> preceding the claim,
          or, for a one-time Enterprise license, the license fee paid for the software giving rise to the claim.
          Nothing in these Terms excludes liability that cannot be limited under Italian law.
        </p>
      </section>
      
      <section id="indemnification" class="term-section">
        <h2>15. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Floating Gates and its officers, directors, employees, and
          agents from claims, damages, losses, or expenses arising from:
        </p>
        <ul>
          <li>Your User Content, including alleged infringement or misuse of third-party designs</li>
          <li>Your use of Analysis Output or of an AI agent connected to the Platform</li>
          <li>Your violation of these Terms or of applicable law</li>
          <li>Your configuration of local software, factory network access, or Stakeholder permissions</li>
        </ul>
      </section>
      
      <section id="governing-law" class="term-section">
        <h2>16. Governing Law and Dispute Resolution</h2>
        <p>
          <strong>16.1 Governing Law:</strong> These Terms are governed by the laws of Italy, without regard
          to conflict-of-law principles.
        </p>
        <p>
          <strong>16.2 Dispute Resolution:</strong> The courts of Rovigo, Italy, have jurisdiction, unless
          mandatory consumer or other rules require a different forum. The parties may first attempt to resolve
          a dispute by written notice to {{ contactInfo.email }}.
        </p>
        <p>
          <strong>16.3 Individual Claims:</strong> To the extent permitted by law, claims must be brought on
          an individual basis and not as part of a class or collective action.
        </p>
      </section>
      
      <section id="changes" class="term-section">
        <h2>17. Changes to Terms</h2>
        <p>
          We may modify these Terms at any time. Material changes will be posted on this page and, where
          appropriate, communicated through the Platform or by email. Continued use after the updated Terms
          take effect constitutes acceptance, except where applicable law requires a different process.
        </p>
        <p>
          It is your responsibility to review these Terms periodically.
        </p>
      </section>
      
      <section id="partnership" class="term-section">
        <h2>18. Partnership Agreements</h2>
        
        <strong>18.1 Introduction</strong>
        <p>
          This section applies if you register as a partner ("Partner") in the Floating Gates affiliate program.
          Completing registration and participating in the program means you accept this section in addition
          to the rest of these Terms.
        </p>
        
        <strong>18.2 Becoming a Partner</strong>
        <p>
          Partners register through the official referral portal:
          <a href="https://app.floating-gates.com/referral-login" target="_blank">https://app.floating-gates.com/referral-login</a>.
          After registration, the Company assigns a commission percentage for referred customers who enroll
          in paid Platform services.
        </p>
        
        <strong>18.3 Affiliate Sales Model</strong>
        <p>
          Commission is earned only when a referred customer completes enrollment and remains an active paying
          user in good standing. Payouts are processed on the 1st day of each month. We may adjust commission
          percentages or payout schedules with one week of prior notice.
        </p>
        
        <strong>18.4 Responsibilities of the Partner</strong>
        <p>The Partner agrees to:</p>
        <ul>
          <li>Provide accurate information during registration</li>
          <li>Promote Floating Gates services lawfully and without misleading claims about DFM results</li>
          <li>Avoid unauthorized discounts, spam, and deceptive marketing</li>
          <li>Comply with applicable advertising and data-protection laws</li>
          <li>
            Act as an independent contractor. This section does not create employment, partnership, or a
            joint venture. The Partner is solely responsible for taxes on commissions received.
          </li>
        </ul>
        
        <strong>18.5 Termination</strong>
        <p>We may terminate a Partner account for fraud, marketing-rule violations, reputational harm, breach, or low activity.</p>
        <p>
          Unpaid commissions for valid, active customers at termination will still be disbursed.
          No commission is paid for inactive or cancelled customers.
        </p>
        
        <strong>18.6 Complaints and Communication</strong>
        <p>
          Official communications about the affiliate program must be sent to {{ contactInfo.email }}.
        </p>
        
        <strong>18.7 Amendments</strong>
        <p>
          We may update affiliate terms through official channels. Continued participation constitutes acceptance.
        </p>
      </section>
      
      <section id="contact" class="term-section">
        <h2>19. Contact Information</h2>
        <p>
          For questions about these Terms or the Platform, contact:
        </p>
        <div class="contact-info">
          <p>Email: {{ contactInfo.email }} </p>
          <p>Address: {{ contactInfo.address }}</p>
          <p>VAT: {{ contactInfo.vat }}</p>
        </div>
      </section>
    </main>
  </div>
</div>
</template>

<style scoped>
@reference "../main.css";

.terms-container {
    max-width: 1800px;
    margin: 0 auto;
    padding: var(--header-stack) 20px 20px;
    line-height: 1.6;
    color: #333;
}

.header-section {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 30px;
    border-bottom: 2px solid #e0e0e0;
}

.main-title {
    font-size: 2.5rem;
    margin: 0 0 20px 0;
    color: var(--theme-color);
    font-weight: 700;
}

.last-updated {
    color: #666;
    font-style: italic;
    margin: 0;
}

.content-wrapper {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 40px;
    align-items: start;
}

.table-of-contents {
    position: sticky;
    top: 20px;
    background: #f8f9fa;
    padding: 25px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}

.table-of-contents h3 {
    margin: 0 0 15px 0;
    color: var(--theme-color);
    font-size: 1.1rem;
}

.table-of-contents ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.table-of-contents li {
    margin-bottom: 8px;
}

.table-of-contents a {
    text-decoration: none;
    font-size: 0.9rem;
    cursor: pointer;
    transition: color 0.2s ease;
}

.table-of-contents a:hover {
    color: var(--theme-color);
    text-decoration: underline;
}

.terms-content {
    max-width: none;
}

.term-section {
    margin-bottom: 35px;
    scroll-margin-top: 20px;
}

.term-section h2 {
    color: var(--theme-color);
    font-size: 1.4rem;
    margin: 0 0 15px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #e0e0e0;
}

.term-section p {
    margin-bottom: 15px;
    text-align: justify;
}

.term-section ul {
    margin: 15px 0;
    padding-left: 25px;
}

.term-section li {
    margin-bottom: 8px;
}

.contact-info {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 6px;
    margin: 20px 0;
}

.contact-info p {
    margin: 5px 0;
}

/* Mobile Responsiveness */
@media (max-width: 1024px) {
    .content-wrapper {
        grid-template-columns: 1fr;
        gap: 30px;
    }
    .table-of-contents {
        position: static;
        order: 2;
    }
    .terms-content {
        order: 1;
    }
}

@media (max-width: 768px) {
    .terms-container {
        padding: var(--header-stack) 15px 15px;
    }
    .main-title {
        font-size: 2rem;
    }
    
    .table-of-contents {
        padding: 15px;
    }
    .term-section h2 {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .main-title {
        font-size: 1.8rem;
    }
}
</style>
