import spacePortfolioImage from '../asset/spaceportfolio.png';
import spaceXAboutImage from '../asset/spacexabout.png';
import spaceXProjectsImage from '../asset/spacexprojects.png';
import grandmaFoodsImage from '../asset/pickles.png';
import plaplaCabsImage from '../asset/cabpooling.png';
import liveformingImage from '../asset/liveforming.png';
import freshiesDashboardImage from '../asset/admindashboard.png';
import freshiesAnalyticsImage from '../asset/adminanalytics.png';
import freshiesVendorsImage from '../asset/dminvendors.png';
import rakzsHomeImage from '../asset/photography.png';
import rakzsAboutImage from '../asset/photoaboutme.png';
import rakzsPackagesImage from '../asset/photopackages.png';
import royalGalleryImage from '../asset/royalgallery.png';
import royalHomeImage from '../asset/royal.png';
import royalAboutImage from '../asset/royalabout.png';

export interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  name: string;
  summary: string;
  images: string[];
  tools?: string;
  link?: string;
  adminLink?: string;
  isGithub?: boolean;
  badge?: string;
}

export const HERO_PORTRAIT_URL =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

export const MARQUEE_IMAGES: string[] = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

export const ABOUT_DECORATIVE_IMAGES = {
  moon: {
    url: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    alt: '3D sculpted crescent moon icon',
  },
  objectBottomLeft: {
    url: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    alt: 'Abstract glossy 3D geometric object',
  },
  lego: {
    url: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    alt: '3D modular building block icon',
  },
  groupBottomRight: {
    url: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    alt: 'Cluster of floating 3D sculptural forms',
  },
} as const;

export const ABOUT_PARAGRAPH =
  'I am a Frontend Developer with 2 years of experience specializing in React.js, JavaScript, and React Native. I build modern, responsive web and mobile applications, including e-commerce projects, using HTML, CSS, Tailwind CSS, Bootstrap, Redux, and API integration.';

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'freshies-online-grocery-store',
    number: '01',
    category: 'webdesign',
    name: 'Freshies - Online Grocery Store',
    summary:
      'A fresh grocery storefront paired with an admin portal for managing vendors and reviewing store analytics.',
    images: [
      liveformingImage,
      freshiesDashboardImage,
      freshiesAnalyticsImage,
      freshiesVendorsImage,
    ],
    tools: 'React JS, JavaScript, Tailwind CSS, Responsive UI',
    link: 'https://livefarmering.vercel.app/',
    adminLink: 'https://livefarmering.vercel.app/admin-login',
    isGithub: false,
    badge: 'New',
  },
  {
    id: 'grandmas-foods',
    number: '02',
    category: 'E-commerce',
    name: "Grandma's Foods",
    summary:
      'An online storefront for pickles, spices, sweets, and other homemade foods.',
    images: [grandmaFoodsImage],
    link: 'https://pickles-murex.vercel.app/',
  },
  {
    id: 'space-x-portfolio',
    number: '03',
    category: 'Developer Portfolio',
    name: 'SpaceX Portfolio',
    summary:
      'A space-inspired developer portfolio featuring an introduction and selected project work.',
    images: [spacePortfolioImage, spaceXAboutImage, spaceXProjectsImage],
    link: 'https://prahsnathspacex.vercel.app/',
  },
  {
    id: 'rakzs-studio-photography',
    number: '04',
    category: 'Photography',
    name: 'RAKZS Studio',
    summary:
      'A photography and cinematic film studio for weddings, couples, family celebrations, business events, and brands.',
    images: [rakzsHomeImage, rakzsAboutImage, rakzsPackagesImage],
    link: 'https://rakzs-studio.vercel.app/',
    badge: 'New',
  },
  {
    id: 'royal-palace-gallery',
    number: '05',
    category: 'Restaurant & Gallery',
    name: 'Royal Palace Gallery',
    summary:
      'A restaurant website showcasing Royal Palace dining, signature dishes, interiors, and banquet spaces in Hyderabad.',
    images: [royalGalleryImage, royalHomeImage, royalAboutImage],
    link: 'https://royal-lime.vercel.app/',
  },
  {
    id: 'plapla-cabs',
    number: '06',
    category: 'Ride Booking',
    name: 'Plapla Cabs',
    summary:
      'A cab-booking experience for finding affordable rides and planning trips.',
    images: [plaplaCabsImage],
  },
];
