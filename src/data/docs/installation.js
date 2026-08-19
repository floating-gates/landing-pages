import download_bundle_img from '../images/docs-images/download_bundle.png';

export const InstallEnterprise = {
    id: 'install',
    title: 'Install Gates Enterprise Bundle',
    description: 'System requirements, configuration, and setup steps for the Gates Enterprise stack.',
    blocks: [
        // --- Requirements ---
        { type: 'heading', level: 2, text: 'System Requirements' },
        {
            type: 'text',
            text: 'Before installing Gates, ensure your infrastructure meets the hardware and software prerequisites listed below. A valid Enterprise Subscription is required to run this stack.',
        },
        { type: 'heading', level: 3, text: 'Server Requirements' },
        {
            type: 'table',
            headers: ['Component', 'Specification'],
            rows: [
                ['Required Package', 'good2manufacture-server-pkg'],
                ['Operating System', 'RHEL 8 or newer (64-bit)'],
                ['CPU', '4 CPU cores minimum'],
                ['Memory (RAM)', '8 GB minimum (32 GB recommended)'],
                ['Storage', '50 GB SSD available storage'],
                ['Network', 'Stable broadband / internal high-speed network'],
            ],
        },
        { type: 'heading', level: 3, text: 'Client Requirements' },
        {
            type: 'table',
            headers: ['Component', 'Specification'],
            rows: [
                ['Required Package', 'good2manufactured'],
                ['Operating System', 'Windows 10 or 11 (64-bit)'],
                ['Network Connection', 'Stable broadband (5 Mbps minimum)'],
            ],
        },

        { type: 'divider' },

        // --- Download ---
        { type: 'heading', level: 2, text: '1. Download the Software Bundle' },
        {
            type: 'text',
            text: 'Log into the [Admin Panel](https://app.floating-gates.com/dashboard?menu=Admin) to download the Enterprise stack archive and retrieve your license keys, which will be needed during initial setup.',
        },
        { type: 'figure', img: download_bundle_img, caption: 'Downloading the Enterprise bundle and license keys from the Admin Panel' },

        // --- Extract & Configure ---
        { type: 'heading', level: 2, text: '2. Extract and Configure' },
        {
            type: 'text',
            text: 'Extract the downloaded archive and navigate into the stack directory:',
        },
        {
            type: 'code',
            language: 'bash',
            code: 'tar -xzf floating-gates-enterprise-<version>.tar.gz\ncd stack-structure',
        },
        {
            type: 'text',
            text: 'Next, create a `.env` file in the root directory to store runtime variables and license information:',
        },
        {
            type: 'code',
            language: 'env',
            code: 'LICENCE_KEY=your-licence-key\nACCOUNT_EMAIL=your-email-account\nPASSWD_EMAIL=email-account-password\nSMTP_EMAIL_SERVER=your-mail-server\nENABLE_EMAIL=true\n\n# Optional Stack Configuration\nSTACK_PORT=8000\nDOMAIN_NAME=your-domain-name\nSERVER_SUBDOMAIN=app\nHOST_ADDR_GOOD2MANUFACTURED=169.254.1.2:9997\nDEMO_URL=http://demo.your-domain/',
        },

        // --- Startup ---
        { type: 'heading', level: 2, text: '3. Start the Stack' },
        {
            type: 'text',
            text: 'Run `start_gates.sh`. This script configures and launches the NGINX reverse proxy, webserver pod, and floating-gates application pod, then waits for all services to settle before confirming status.',
        },
        {
            type: 'code',
            language: 'bash',
            code: './start_gates.sh',
        },
        {
            type: 'text',
            text: 'Example startup output:',
        },
        {
            type: 'code',
            language: 'text',
            code: 'Configuring nginx-pod...\nConfiguring webserver...\nConfiguring floating-gates.pod...\nConfiguring config for good2manufactured...\nWaiting for services to settle...\nVerifying service status...\nOK: floating-gates-pod is active.\nOK: nginx-pod is active.\nOK: webserver is active.\nOK: good2manufactured is active.\nConfiguring backup script...\nConfiguring bundling script...\n----------------------------------------------------\nDeployment successful! The following ports are active:\n - Webserver: http://localhost:8000\n - HTTP Proxy: http://localhost:8080\n----------------------------------------------------\nYou can check user systemd services at: ~/.config/systemd/user\nDone!',
        },

        // --- Verification & Troubleshooting ---
        { type: 'heading', level: 2, text: '4. Post-Installation Verification' },
        {
            type: 'text',
            text: 'Ensure all service status lines report `OK` before accessing the application. If services fail to reach an active status, check the logs via `journalctl --user -u floating-gates-pod` or your container runtime before attempting a restart.',
        },
        {
            type: 'text',
            text: 'To manually restart the stack service if needed, run:',
        },
        {
            type: 'code',
            language: 'bash',
            code: 'systemctl --user restart floating-gates-pod',
        },
    ],
};
