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
      <h1 class="main-title">Privacy Policy</h1>
      <div class="company-info">
        <p class="last-updated">Last Updated: {{ lastUpdated }}</p>
      </div>
    </div>

    <div class="content-wrapper">
      <nav class="table-of-contents">
        <h3>Table of Contents</h3>
        <ul>
          <li><a href="#interpretation" @click="scrollTo('interpretation')">1. Interpretation &amp; Definitions</a></li>
          <li><a href="#data-collection" @click="scrollTo('data-collection')">2. Personal Data We Collect</a></li>
          <li><a href="#product-data" @click="scrollTo('product-data')">3. Product Files and Technical Data</a></li>
          <li><a href="#ai-training" @click="scrollTo('ai-training')">4. AI Training and Third-Party Models</a></li>
          <li><a href="#deployment" @click="scrollTo('deployment')">5. Cloud and On-Premises Processing</a></li>
          <li><a href="#retention" @click="scrollTo('retention')">6. Retention</a></li>
          <li><a href="#transfer" @click="scrollTo('transfer')">7. International Transfers</a></li>
          <li><a href="#delete" @click="scrollTo('delete')">8. Your Rights</a></li>
          <li><a href="#disclosure" @click="scrollTo('disclosure')">9. Disclosure</a></li>
          <li><a href="#security" @click="scrollTo('security')">10. Security</a></li>
          <li><a href="#children" @click="scrollTo('children')">11. Children's Privacy</a></li>
          <li><a href="#links" @click="scrollTo('links')">12. Links to Other Websites</a></li>
          <li><a href="#changes" @click="scrollTo('changes')">13. Changes to this Policy</a></li>
          <li><a href="#contact" @click="scrollTo('contact')">14. Contact Us</a></li>
        </ul>
      </nav>

      <main class="terms-content">
        <section id="interpretation" class="term-section">
          <h2>1. Interpretation &amp; Definitions</h2>
          <p>
            This Privacy Policy explains how Floating Gates di Mattia Samiolo ("Company", "we", "us") collects
            and uses information when you use the Gates platform, the Huckster Interface, the MCP Server,
            Good2Manufacture, and our websites (the "Service").
          </p>
          <p>
            For Cloud Services we generally act as a data controller for account, billing, and website data.
            When a factory or other Customer invites Stakeholders or uploads files that contain personal data,
            we process that personal data as a processor on the Customer's instructions, except where we must
            process it for our own legal obligations or, on the Basic / Freemium plan, for advertising and
            proprietary model-training purposes described below.
          </p>
          <div class="definitions-grid">
            <div class="definition-item"><strong>Account:</strong> A unique account created for You to access the Service or parts of it.</div>
            <div class="definition-item"><strong>Company:</strong> Floating Gates di Mattia Samiolo, {{ contactInfo.address }}, VAT {{ contactInfo.vat }}, also referred to as “We”, “Us”, or “Our”.</div>
            <div class="definition-item"><strong>Country:</strong> Italy.</div>
            <div class="definition-item"><strong>Customer:</strong> The business that administers a Cloud or Enterprise workspace.</div>
            <div class="definition-item"><strong>Device:</strong> Any electronic device used to access the Service.</div>
            <div class="definition-item"><strong>Personal Data:</strong> Any information relating to an identified or identifiable individual.</div>
            <div class="definition-item"><strong>Service:</strong> The Gates application, Huckster Interface, MCP Server, Good2Manufacture software, and associated websites.</div>
            <div class="definition-item"><strong>Service Provider:</strong> A processor that handles data on our behalf, such as hosting, email, or payment providers.</div>
            <div class="definition-item"><strong>User Content:</strong> CAD files, GD&amp;T drawings, project metadata, factory rules, and other materials submitted to the Service.</div>
            <div class="definition-item"><strong>Usage Data:</strong> Data collected automatically during use of the Service, including device, log, and performance information.</div>
            <div class="definition-item"><strong>You:</strong> The individual or organization accessing the Service, including Customers and invited Stakeholders.</div>
          </div>
        </section>

        <section id="data-collection" class="term-section">
          <h2>2. Personal Data We Collect</h2>

          <h5>Account and contact data</h5>
          <p>We collect the information needed to create and administer accounts and to communicate with You:</p>
          <ul>
            <li><strong>Identity and contact data:</strong> name, email address, company name, role, and optionally phone number.</li>
            <li><strong>Account credentials:</strong> encrypted passwords, authentication tokens, and role assignments.</li>
            <li><strong>Billing information:</strong> invoices, plan, VAT details, and transaction records. Payment-card data is handled by our payment processors, not stored by us in full.</li>
            <li><strong>Support communications:</strong> messages You send to {{ contactInfo.email }} or through the Service.</li>
          </ul>

          <h5>Usage Data</h5>
          <p>
            We collect IP address, browser type, operating system, pages visited, feature usage, diagnostic
            logs, and similar technical data to operate, secure, and improve the Service.
          </p>

          <h5>Cookies</h5>
          <p>
            Essential storage remembers your cookie choice. Google Analytics and any future marketing tags
            are non-essential: they stay blocked until you give affirmative consent. There is no pre-ticked
            box, and rejecting is as available as accepting. Consent is stored for 6 months.
          </p>
          <p>
            The full inventory, lifetimes, vendors, and lawful bases are in the
            <a href="/cookie-policy">Cookie Policy</a>.
            You can withdraw or change consent at any time from
            <a href="/cookie-policy#consent">Cookie settings</a>.
          </p>

          <h5>Purposes and legal bases (EU/EEA)</h5>
          <ul>
            <li>Provide and maintain the Service, including authentication and plan limits — contract</li>
            <li>Bill paid subscriptions and keep tax records — contract and legal obligation</li>
            <li>Send service, security, and product-change notices — contract and legitimate interests</li>
            <li>Send marketing only where permitted and, where required, with consent — consent or legitimate interests</li>
            <li>Secure the Service against misuse and abuse — legitimate interests</li>
            <li>On the Basic / Freemium plan, use uploaded CAD and GD&amp;T for advertising and to train our proprietary AI models — legitimate interests or contract, as applicable</li>
          </ul>
        </section>

        <section id="product-data" class="term-section">
          <h2>3. Product Files and Technical Data</h2>
          <p>
            The Service is built to process mechanical design files. User Content typically includes STEP or
            other CAD models, GD&amp;T drawings, file names, project identifiers, factory-specific rules, and
            Analysis Output such as detected issues or feasibility results.
          </p>
          <p>
            User Content is industrial and technical data. It may still contain Personal Data, for example
            drafter names, email addresses, or employee identifiers embedded in title blocks or metadata.
            Customers are responsible for minimizing that data and for telling Stakeholders what will be uploaded.
          </p>
          <p>
            We use User Content to run manufacturability checks, show results in the Huckster Interface or
            local clients, provide support you request, and enforce plan limits. We do not sell User Content.
          </p>
        </section>

        <section id="ai-training" class="term-section">
          <h2>4. AI Training and Third-Party Models</h2>
          <p>
            <strong>Basic / Freemium Cloud plan:</strong> CAD files, GD&amp;T documentation, and related
            project materials uploaded on the free plan may be used (a) in advertising, marketing, case
            studies, demos, and other promotional materials, and (b) to train, evaluate, and improve our
            proprietary AI models. If you cannot allow those uses, choose Standard or Enterprise and do not
            upload those files to a Basic workspace.
          </p>
          <p>
            <strong>Standard Cloud plan:</strong> Projects are treated as private. We process them to provide
            the Service and support, not to train general models.
          </p>
          <p>
            <strong>MCP Server and connected models:</strong> If you enable the MCP Server or another AI
            integration, prompts, tool schemas, and selected file excerpts or results may be sent to the
            model provider you choose, such as Anthropic (Claude), Mistral, or OpenAI. Those providers process
            that data under their own terms and privacy notices. You control which tools and resources are connected.
          </p>
          <p>
            We do not use Standard or Enterprise User Content for advertising or to train our models or
            third-party foundation models. Basic / Freemium training is performed on our proprietary models
            and promotional materials, not published as a public dataset.
          </p>
        </section>

        <section id="deployment" class="term-section">
          <h2>5. Cloud and On-Premises Processing</h2>
          <p>
            <strong>Cloud Services</strong> (Huckster Interface and hosted MCP features) process User Content
            on infrastructure we operate or that our hosting subprocessors operate. A Standard instance may
            be reached at a hostname such as yourcompany.floating-gates.com.
          </p>
          <p>
            <strong>Good2Manufacture</strong> is designed to run on a server and clients inside your network.
            Factory files evaluated locally are not uploaded to us by default. We may receive license checks,
            version information, crash reports, or support packages only if you enable them or send them to us.
          </p>
          <p>
            A Customer that invites suppliers, customers, or employees is responsible for the information
            those people submit and for the legal basis of that submission.
          </p>
        </section>

        <section id="retention" class="term-section">
          <h2>6. Retention</h2>
          <ul>
            <li>Account data is kept while the account is active and for a reasonable period afterward if needed for security or dispute handling.</li>
            <li>Cloud User Content is kept while the project or account remains active, subject to plan storage limits.</li>
            <li>Billing and invoice data is kept for 10 years for Italian tax compliance.</li>
            <li>Marketing data is kept until consent is withdrawn or you object.</li>
            <li>Local Good2Manufacture files follow the Customer's own retention practices.</li>
          </ul>
          <p>
            When data is no longer required, it is deleted or anonymized. Backup copies may persist for a
            limited period before they are overwritten.
          </p>
        </section>

        <section id="transfer" class="term-section">
          <h2>7. International Transfers</h2>
          <p>
            We are established in Italy. If we transfer Personal Data outside the EEA, including to US-based
            hosting, email, payment, or AI providers, we rely on an adequacy decision or
            <strong>Standard Contractual Clauses (SCCs)</strong> approved by the European Commission,
            together with any supplementary measures required.
          </p>
          <p>
            If you send data to a third-party model through the MCP Server, that transfer is initiated by
            your configuration and may leave the EEA according to that provider's location.
          </p>
        </section>

        <section id="delete" class="term-section">
          <h2>8. Your Rights</h2>
          <p>If GDPR applies to you, you may have the following rights:</p>
          <ul>
            <li><strong>Access:</strong> request a copy of your Personal Data</li>
            <li><strong>Rectification:</strong> correct inaccurate data</li>
            <li><strong>Erasure:</strong> request deletion where the law allows</li>
            <li><strong>Restriction:</strong> limit certain processing</li>
            <li><strong>Portability:</strong> receive data you provided in a structured, machine-readable format</li>
            <li><strong>Objection:</strong> object to processing based on legitimate interests or to direct marketing</li>
            <li><strong>Withdraw consent:</strong> where processing is based on consent, without affecting prior lawful use</li>
          </ul>
          <p>
            Contact {{ contactInfo.email }}. We will respond within 30 days, or as otherwise required by law.
            You may also lodge a complaint with the Garante per la protezione dei dati personali or another
            competent supervisory authority.
          </p>
          <p>
            If you use the Service through a Customer's workspace, we may redirect your request to that
            Customer when they are the controller of the relevant data.
          </p>
        </section>

        <section id="disclosure" class="term-section">
          <h2>9. Disclosure</h2>
          <ul>
            <li><strong>Service Providers:</strong> hosting, email, analytics, and payment processors that need the data to work for us.</li>
            <li><strong>AI providers you enable:</strong> model vendors reached through the MCP Server or similar integrations you turn on.</li>
            <li><strong>Business transactions:</strong> data may transfer in a merger, acquisition, or asset sale. We will notify you before it becomes subject to a different policy where required.</li>
            <li><strong>Legal requirements:</strong> we may disclose data if required by law or to protect the rights, property, or safety of the Company, our users, or the public.</li>
          </ul>
        </section>

        <section id="security" class="term-section">
          <h2>10. Security</h2>
          <p>
            We use TLS/SSL in transit, access controls, and monitoring on Cloud Services. In the event of a
            personal-data breach we will notify the competent supervisory authority and affected users within
            72 hours where required by law.
          </p>
          <p>
            You are responsible for protecting credentials, MCP tokens, Stakeholder invitations, and the
            servers on which Good2Manufacture is installed. No method of transmission or storage is completely secure.
          </p>
        </section>

        <section id="children" class="term-section">
          <h2>11. Children's Privacy</h2>
          <p>
            The Service is a professional manufacturing tool and is not intended for anyone under 18, or under
            14 where that is the relevant digital-consent age in Italy. We do not knowingly collect Personal Data
            from children. If you believe we have, contact us so we can delete it.
          </p>
        </section>

        <section id="links" class="term-section">
          <h2>12. Links to Other Websites</h2>
          <p>
            The Service may link to third-party sites or model-provider dashboards. We are not responsible for
            their content or privacy practices. Review the policy of every site or service you use.
          </p>
        </section>

        <section id="changes" class="term-section">
          <h2>13. Changes to this Privacy Policy</h2>
          <p>
            We may update this Policy from time to time. The new version will be posted on this page with a
            revised “Last Updated” date. Where a change is material, we will also provide a more prominent notice
            when required.
          </p>
        </section>

        <section id="contact" class="term-section">
          <h2>14. Contact Us</h2>
          <p>
            For questions or requests about this Privacy Policy or our data practices:
          </p>
          <div class="contact-info">
            <p>Email: {{ contactInfo.email }}</p>
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

/* Same styles as your Terms of Service component */
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

.definitions-grid {
    display: grid;
    gap: 15px;
    margin: 20px 0;
}

.definition-item {
    background: #f8f9fa;
    padding: 4px;
    border-radius: 4px;
    border-color: var(--theme-color);
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

/* Mobile responsiveness same as TOS */
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
    .terms-container { padding: var(--header-stack) 15px 15px; }
    .main-title { font-size: 2rem; }
    .table-of-contents { padding: 15px; }
    .term-section h2 { font-size: 1.2rem; }
}

@media (max-width: 480px) {
    .main-title { font-size: 1.8rem; }
    .definitions-grid { gap: 10px; }
    .definition-item { padding: 10px; }
}
</style>
