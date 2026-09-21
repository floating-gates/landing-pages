import { app_login_url } from "../../config.js";

export const insight_from_clients = {
    id: "cad-mistakes-and-rapid-manufacturing",
    title: "What Quietly Increase Manufacturing Costs",
    excerpt: "Discover the subtle design choices that inflate production costs and how high-velocity hardware teams build at the speed of software.",
    content: [
        {
            sub_title: "The Silent Cost Drivers in 3D Modeling",
            sub_content: "Most 3D models look impressive, but few are actually production-ready. In practice, costly delays and revisions usually stem from small design decisions made early in CAD. Seven common issues silently inflate manufacturing costs: feature trees built without a revision strategy, cosmetic fillets that add machining time without functional value, missing draft angles in molded components, sharp internal corners requiring non-standard tooling, ignoring tool accessibility during design, overly tight tolerances without functional justification, and designing parts without assembly logic."
        },
        {
            sub_title: "Treating Manufacturing as the Development Engine",
            sub_content: "Insights from interviewing nearly 900 mechanical engineers across diverse industries reveal a clear pattern: the best hardware teams don't finish a design and toss it over the wall to manufacturing. Instead, they collapse the CAD/Part/Testing loop, optimizing for hours between a design change and a physical test rather than weeks between revision cycles. By updates in CAD being tested and built overnight, this compounding cycle turns years of development into months."
        },
        {
            sub_title: "Building Momentum and Shared Data Systems",
            sub_content: "High-performing teams build in-house capability for multi-axis machining, sheet metal, welding, 3D printing, and inspection so vendor lead times never block the speed of learning. Furthermore, they run operations on shared data-tracking cycle times, scrap causes, yield variation, and material performance for weekly iteration. Eliminating the divide between design and production gives teams deeper insight into the fabrication pipeline, enables faster prototyping, and ensures cleaner scaling."
        }
    ],
    image: "https://floating-gates-pub.nbg1.your-objectstorage.com/article_cad_mistakes.svg",
    author: "Mattia Samiolo",
    callToActionLink: app_login_url,
    callToActionText: "Explore the Value",
};
