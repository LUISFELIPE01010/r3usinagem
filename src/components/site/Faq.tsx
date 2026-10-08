import { faqs } from "@/lib/seo";
export function Faq() {
  return (
    <section className="section bg-mist" aria-labelledby="faq-title">
      <div className="container-x grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div><span className="eyebrow">Perguntas frequentes</span><h2 id="faq-title" className="mt-5 text-4xl sm:text-5xl">Dúvidas sobre usinagem industrial em Cubatão e região.</h2></div>
        <div className="divide-y divide-steel/40 border-y border-steel/40">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg font-semibold"><h3 className="text-lg">{f.q}</h3><span aria-hidden className="text-brand transition group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-graphite">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
