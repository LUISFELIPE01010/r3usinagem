import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import logo from "@/assets/r3-logo-header.jpg.asset.json";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/r3";

const nav: ReadonlyArray<{ to: "/" | "/servicos" | "/quem-somos" | "/portfolio" | "/seguranca" | "/contato"; label: string; menu?: boolean }> = [
  { to: "/", label: "Início" }, { to: "/servicos", label: "Serviços", menu: true },
  { to: "/quem-somos", label: "Sobre nós" }, { to: "/portfolio", label: "Portfólio" },
  { to: "/seguranca", label: "Segurança" }, { to: "/contato", label: "Contato" },
];
export function Header({ transparent = false }: { transparent?: boolean }) {
  const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>20);fn();window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn)},[]);
  return <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all ${transparent&&!scrolled?"border-transparent bg-carbon/85 backdrop-blur-sm":"border-carbon-foreground/10 bg-carbon shadow-xl"}`}>
    <div className="container-x grid h-[76px] grid-cols-[auto_1fr_auto] items-center gap-4 xl:h-[82px]">
      <Link to="/" aria-label="R3 Usinagem — Início" className="shrink-0"><img src={logo.url} alt="R3 Usinagem" className="h-11 w-auto sm:h-12" /></Link>
      <nav aria-label="Principal" className="hidden justify-center lg:flex">
        {nav.map(item=><div key={item.to} className="group relative"><Link to={item.to} activeOptions={{exact:item.to==="/"}} activeProps={{className:"!text-brand after:scale-x-100"}} className="relative flex items-center gap-1 px-3 py-7 text-[.7rem] font-semibold text-carbon-foreground/85 transition-colors after:absolute after:bottom-[17px] after:left-3 after:right-3 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform hover:text-carbon-foreground xl:px-4">{item.label}{item.menu&&<ChevronDown className="h-3.5 w-3.5"/>}</Link>{item.menu&&<div className="invisible absolute left-0 top-full w-60 border-t-2 border-brand bg-carbon opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">{["Usinagem de Campo","Usinagem de Base","Serviços de Solda","Caldeiraria","Manutenção Industrial"].map(s=><Link key={s} to="/servicos" hash={s.toLowerCase().replaceAll(" ","-").normalize("NFD").replace(/[\u0300-\u036f]/g,"")} className="block border-b border-carbon-foreground/5 px-5 py-3 text-xs text-carbon-foreground/75 hover:bg-brand hover:text-brand-foreground">{s}</Link>)}</div>}</div>)}
      </nav>
      <div className="hidden items-center gap-4 lg:flex">
        <span className="hidden items-center gap-2 text-[.68rem] text-carbon-foreground/85 2xl:flex"><MapPin className="h-4 w-4 text-brand"/>Cubatão - SP</span><span className="hidden h-7 w-px bg-carbon-foreground/15 2xl:block"/><a href={`tel:${PHONE_TEL}`} className="hidden items-center gap-2 text-[.68rem] font-semibold text-carbon-foreground/85 xl:flex"><Phone className="h-4 w-4 text-brand"/>{PHONE_DISPLAY}</a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-base btn-primary !min-h-10 !px-4"><MessageCircle className="h-4 w-4"/>Solicitar orçamento</a>
      </div>
      <button type="button" aria-label={open?"Fechar menu":"Abrir menu"} aria-expanded={open} onClick={()=>setOpen(v=>!v)} className="grid h-11 w-11 place-items-center justify-self-end text-carbon-foreground lg:hidden">{open?<X/>:<Menu/>}</button>
    </div>
    {open&&<nav className="border-t border-carbon-foreground/10 bg-carbon px-5 pb-6 lg:hidden" aria-label="Menu móvel">{nav.map(item=><Link key={item.to} to={item.to} onClick={()=>setOpen(false)} className="block border-b border-carbon-foreground/10 py-4 text-sm font-semibold text-carbon-foreground">{item.label}</Link>)}<a href={WHATSAPP_URL} className="btn-base btn-primary mt-5 w-full"><MessageCircle className="h-4 w-4"/>Solicitar orçamento</a></nav>}
  </header>;
}
