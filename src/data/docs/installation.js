export const InstallEnterprise = {
    id: 'install',
    title: 'Install Software in Enterprise Bundle',
    description: 'What Gates does, how it works, and what you need to run it',
    blocks: [
        {
            type: 'text',
            text: 'Before installing Gates, ensure both your have a compatible Linux server or Virtual Machine. To start successfully this stack you need to have a valid Enterprise Subscription.'
        },
        { type: 'heading', level: 1, text: 'Server Requirements' },
        {
            type: 'table',
            headers: ['Component', 'Minimum Requirement'],
            rows: [
                ['Software needed:', 'good2manufacture-server-pkg'],
                ['Operating System', 'RHEL 8 or newer (64-bit)'],
                ['CPU', '4 CPU-cores **minimum**'],
                ['Memory (RAM)', '8 GB **minimum** (32 GB recommended)'],
                ['Storage', '50 GB SSD available storage'],
                ['Network', 'Stable broadband / internal high-speed network'],
            ],
        },
        { type: 'heading', level: 1, text: 'Client Requirements' },
        {
            type: 'table',
            headers: ['Component', 'Minimum Requirement'],
            rows: [
                ['Software needed:', 'good2manufactured'],
                ['Operating System', 'Windows 10 or 11 (64-bit)'],
                ['Network Connection', 'Stable broadband (5 Mbps or faster)'],
            ],
        },

        // --- Installation ---
        { type: 'divider' },
        { type: 'heading', level: 2, text: 'Download and Key insertion' },
        {
            type: 'text',
            text: 'Once your server meets the requirements above. Log into your Floating Gates account and download the Enterprise stack, retrieve your licence keys and insert it in the configuration to start.',
        },
        {
            type: 'code',
            language: 'bash',
            code: 'tar -xzf floating-gates-enterprise-<version>.tar.gz\ncd stack-structure',
        },
        { type: 'heading', level: 2, text: 'Configure the Server' },
        {
            type: 'text',
            text: 'Before starting the stack, create execute/webserver/Rocket.toml from the provided template and fill in your environment-specific values. At minimum, set a unique secret_key, your db_url and project paths, and the correct host_addr_good2manufactured / licence_server_url for your deployment.',
        },
        {
            type: 'code',
            language: 'toml',
            code: '[default]\nport = 8000\nsecret_key = "<generate-a-unique-base64-secret>"\nproject_root_path = "/projects"\nproject_host_root = "/home/<user>/stack-structure/data/projects"\ndomain_name = "localhost"\nserver_subdomain = "app"\nhost_addr_good2manufactured = "169.254.1.2:9997"\ngood2manufacture_bin_path = "/home/<user>/stack-structure/execute/good2manufacture/Good2Manufacture"\nlicence_server_url = "169.254.1.2:9000"\nlicence_key = "<your-licence-key>"\ndb_url = "/databases/fg-database.sqlite3"',
        },
        { type: 'heading', level: 2, text: 'Start the Stack' },
        {
            type: 'text',
            text: 'Run the start script from the root of stack-structure. It configures and brings up the nginx reverse proxy, the webserver pod, and the floating-gates application pod, then waits for services to settle before reporting status.',
        },
        {
            type: 'code',
            language: 'bash',
            code: './start_gates.sh',
        },
        {
            type: 'code',
            language: 'text',
            code: 'Configuring nginx-pod...\nConfiguring webserver...\nConfiguring floating-gates.pod...\nWaiting for services to settle...\nVerifying service status...\nOK: floating-gates-pod is active.\nOK: nginx-pod is active.',
        },
        {
            type: 'text',
            text: 'Both OK lines must appear before the stack is considered up. If either pod fails to reach active status, check the pod logs (e.g. via journalctl or your container runtime\'s logs command) before retrying.',
        },
    ]
}
