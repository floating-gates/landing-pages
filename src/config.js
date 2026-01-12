// Theme Colors
const themeColor       = '#223843';
const themeColorOrange = '#D77A61';
const themeColorWhite  = '#EFF1F3';
const themeColorLille  = '#D8D3D8';
const themeColorGold   = '#D8B4A0';

// URLs
const demo_url              = import.meta.env.VITE_DEMO_URL;
const app_login_url         = import.meta.env.VITE_APP_URL
const partner_app_login_url = import.meta.env.VITE_PARTNER_APP_URL

const youtubeVideoUrl = 'https://www.youtube.com/embed/-og2OKAT_UE?autoplay=1'
const git_book_url = "https://floating-gates.gitbook.io/gates-docs"
const survey_link  = "https://forms.gle/JYHXxX2anVp14X6a6"

const display_price_list = [
    {name: 'Basic'     , price: '' },
    {name: 'Standard'  , price: '49.00' },
    {name: 'Pro'       , price: 'Coming Soon' },
    {name: 'Enterprise', price: ''}
];

// Contact Info
const contactInfo = {
    address: 'Via Capitello Rasa 28, Lendinara (RO), 45026, Italy',
    phone: '+39 3493822812',
    email: 'contact@floating-gates.com',
    website: 'https://floating-gates.com',
    vat: 'IT01675720294'
};

// Exporting all
export {
    themeColor, themeColorOrange, themeColorWhite, themeColorLille,
    themeColorGold, survey_link, contactInfo, display_price_list,
    git_book_url, demo_url, app_login_url, partner_app_login_url,
    youtubeVideoUrl
};
