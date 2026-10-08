import { ADDRESS, INSTAGRAM_URL, services } from "./r3";
export const SITE_URL = "https://r3usinagem.com.br";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
type Crumb = { name: string; path: string };
export function seo(o: { path: string; title: string; description: string; crumbs?: Crumb[]; schemas?: object[] }) {
  const url = SITE_URL + (o.path === "/" ? "/" : o.path);
  const schemas = [...(o.schemas ?? [])];
  if (o.crumbs) schemas.push({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ name: "Home", path: "/" }, ...o.crumbs].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: SITE_URL + c.path })) });
  return {
    meta: [
      { title: o.title }, { name: "description", content: o.description },
      { property: "og:title", content: o.title }, { property: "og:description", content: o.description },
      { property: "og:url", content: url }, { property: "og:type", content: "website" }, { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: OG_IMAGE }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Técnico da R3 Usinagem em planta industrial em Cubatão/SP" },
      { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:title", content: o.title }, { name: "twitter:description", content: o.description }, { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: schemas.map((s) => ({ type: "application/ld+json", children: JSON.stringify(s) })),
  };
}
const business = { "@id": `${SITE_URL}/#business` };
export const organizationSchema = { "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE_URL}/#org`, name: "R3 Usinagem", url: SITE_URL, logo: `${SITE_URL}/favicon.png`, sameAs: [INSTAGRAM_URL], telephone: "+55-13-99707-6274" };
export const localBusinessSchema = {
  "@context": "https://schema.org", "@type": "LocalBusiness", ...business, name: "R3 Usinagem", url: SITE_URL, image: OG_IMAGE, logo: `${SITE_URL}/favicon.png`,
  description: "Usinagem de campo, usinagem de base, soldagem, caldeiraria e manutenção industrial em Cubatão, Baixada Santista e todo o Brasil.",
  telephone: "+55-13-99707-6274", address: { "@type": "PostalAddress", streetAddress: "Rua Pedro de Toledo, 179 — Vila Paulista", addressLocality: "Cubatão", addressRegion: "SP", postalCode: "11510-090", addressCountry: "BR" },
  areaServed: [{ "@type": "City", name: "Cubatão" }, { "@type": "AdministrativeArea", name: "Baixada Santista" }, { "@type": "Country", name: "Brasil" }],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "07:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "07:00", closes: "16:00" },
  ],
  sameAs: [INSTAGRAM_URL], parentOrganization: { "@id": `${SITE_URL}/#org` },
};
export const servicesSchemas = services.map((s) => ({ "@context": "https://schema.org", "@type": "Service", name: s.title, serviceType: s.title, description: `${s.description} Inclui: ${s.applications.join(", ")}.`, provider: business, areaServed: ["Cubatão", "Baixada Santista", "Brasil"] }));
export const faqs = [
  { q: "O que é usinagem de campo e quando ela é necessária?", a: "Usinagem de campo é a usinagem feita diretamente no local onde o equipamento está instalado, sem precisar desmontá-lo e transportá-lo até uma oficina. Ela é indicada quando a remoção do equipamento é inviável, cara ou demorada — por exemplo, na recuperação de eixos, flanges e alojamentos durante paradas de manutenção." },
  { q: "A R3 Usinagem atende fora de Cubatão e da Baixada Santista?", a: "Sim. A R3 Usinagem tem base em Cubatão/SP, atende toda a Baixada Santista e realiza serviços em todo o Brasil, com deslocamento da equipe e dos equipamentos até a planta do cliente." },
  { q: "Quais equipamentos a R3 Usinagem utiliza?", a: "Na oficina, a R3 Usinagem trabalha com torno mecânico, torno CNC, fresadora, mandrilhadora e retífica cilíndrica, entre outros equipamentos, para usinagem de peças sob medida." },
  { q: "Qual o prazo médio para um orçamento de usinagem?", a: "O prazo médio para envio de um orçamento é de 3 dias úteis, a partir do recebimento das informações do serviço, como fotos, desenhos ou medidas." },
  { q: "Como solicitar um orçamento à R3 Usinagem?", a: `Pelo WhatsApp (13) 99707-6274, pelo formulário da página de Contato ou pessoalmente na base da empresa: ${ADDRESS}.` },
];
export const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
