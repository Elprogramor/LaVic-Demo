import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { OutlineWord } from "@/components/ui/outline-word";
import { ArrowIcon, HeartIcon } from "@/components/ui/icons";

const featuredFlavors = [
  {
    name: "LaVic Limão",
    href: "/produto/limao-1l",
    image: "/products/lavic-limao-cutout.png",
    price: "R$ 18,90",
    caption: "cítrica e refrescante",
  },
  {
    name: "LaVic Morango",
    href: "/produto/morango-1l",
    image: "/products/lavic-morango-cutout.png",
    price: "R$ 19,90",
    caption: "frutada e vibrante",
  },
  {
    name: "LaVic Maracujá",
    href: "/produto/maracuja-1l",
    image: "/flavors/passion-fruit.png",
    price: "Em breve",
    caption: "tropical",
  },
  {
    name: "LaVic Uva Verde",
    href: "/sabores",
    image: "/flavors/green-grape.png",
    price: "Em breve",
    caption: "leve e aromática",
  },
];

function Stars() {
  return <span className="home-stars" aria-label="5 estrelas">★★★★★</span>;
}

export function HomePage() {
  return (
    <div className="page-frame">
      <a className="skip-link" href="#main-content">Ir para o conteúdo</a>

      <section className="home-hero">
        <SiteHeader />
        <span className="eyebrow-pill home-hero-badge">Descubra toda nossa seleção</span>
        <OutlineWord className="home-hero-word">KOMBUCHA</OutlineWord>
        <div className="home-hero-bottle"><Image src="/products/lavic-limao-cutout.png" alt="Garrafa LaVic Kombucha Limão" fill priority sizes="457px" /></div>
        <div className="home-hero-fade" aria-hidden="true" />
        <div className="home-hero-copy">
          <h1>Viva Com Gás.</h1>
          <p>Fermentada naturalmente, refrescante e feita para acompanhar a rotina com personalidade.</p>
        </div>
        <Link href="/sabores" className="button home-hero-cta">ESCOLHA O SEU</Link>
        <aside className="home-hero-mini" aria-label="Produto em destaque">
          <div className="home-hero-mini-media"><Image src="/products/lavic-limao-cutout.png" alt="Garrafa LaVic Limão" fill sizes="145px" /></div>
          <div><strong>LaVic Limão</strong><small>leve, cítrica, viva</small><div className="home-hero-mini-price"><span>R$ 18,90</span><span>★★★★★</span></div></div>
        </aside>
      </section>

      <main id="main-content">
        <section className="home-testimonial" aria-label="Depoimento">
          <div className="home-testimonial-nav">
            <h2>O que falam sobre a Kombucha</h2>
            <div className="home-testimonial-arrows" aria-hidden="true">
              <span className="home-small-arrow"><ArrowIcon direction="left" /></span>
              <span className="home-small-arrow"><ArrowIcon /></span>
            </div>
          </div>
          <blockquote>
            <span className="home-quote-mark" aria-hidden="true">“</span>
            <p>Há muito tempo os probióticos vêm sendo estudados por seus efeitos no organismo. Hoje, ganham ainda mais relevância pela forma como podem apoiar bem-estar, equilíbrio e rotina.</p>
            <footer>
              <span className="testimonial-avatar"><Image src="/home/francis-avatar.png" alt="Francis Moreira" fill sizes="54px" /></span>
              <span><strong>Francis Moreira</strong><small>Profissional convidada</small></span>
            </footer>
          </blockquote>
        </section>

        <section className="home-flavors" aria-labelledby="home-flavors-title">
          <div className="home-flavors-heading">
            <div>
              <h2 id="home-flavors-title">Sabores Engarrafados</h2>
              <p>Garrafas 1 litro e 500 ml</p>
            </div>
            <div className="home-flavors-arrows" aria-hidden="true">
              <span className="home-small-arrow"><ArrowIcon direction="left" /></span>
              <span className="home-small-arrow"><ArrowIcon /></span>
            </div>
          </div>

          <div className="home-flavor-grid">
            {featuredFlavors.map((item) => (
              <article className="home-flavor-card" key={item.name}>
                <Link href={item.href} className="home-flavor-media">
                  <Image src={item.image} alt={item.name} fill sizes="224px" />
                </Link>
                <h3>{item.name}</h3>
                <Stars />
                <p>{item.price}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-rhythm" aria-labelledby="home-rhythm-title">
          <div className="home-rhythm-panel">
            <h2 id="home-rhythm-title">A kombucha que acompanha o seu ritmo.</h2>

            <div className="home-rhythm-stack-card" aria-label="Três garrafas LaVic Limão">
              <span className="home-rhythm-bottle home-rhythm-bottle--1"><Image src="/products/lavic-limao-cutout.png" alt="" fill sizes="190px" /></span>
              <span className="home-rhythm-bottle home-rhythm-bottle--2"><Image src="/products/lavic-limao-cutout.png" alt="" fill sizes="190px" /></span>
              <span className="home-rhythm-bottle home-rhythm-bottle--3"><Image src="/products/lavic-limao-cutout.png" alt="" fill sizes="190px" /></span>
            </div>

            <div className="home-rhythm-content">
              <p className="home-rhythm-lead">Uma experiência construída a partir da fermentação natural, sabores frescos e uma apresentação feita para transformar o produto em parte do momento.</p>
              <div className="home-rhythm-visuals">
                <div className="home-rhythm-visual"><Image src="/products/lavic-limao-cutout.png" alt="LaVic Limão" fill sizes="142px" /></div>
                <div className="home-rhythm-visual home-rhythm-visual--pair">
                  <span><Image src="/products/lavic-limao-cutout.png" alt="" fill sizes="88px" /></span>
                  <span><Image src="/products/lavic-limao-cutout.png" alt="" fill sizes="72px" /></span>
                </div>
              </div>
              <p className="home-rhythm-detail">Da primeira garrafa ao kit para compartilhar, a LaVic organiza a experiência em torno do sabor, do frescor e da simplicidade de escolha.</p>
              <Link href="/sobre" className="home-rhythm-link">Conheça a LaVic</Link>
            </div>
          </div>
        </section>

        <section className="home-intro" aria-labelledby="home-intro-title">
          <h2 id="home-intro-title">Uma breve<br />introdução a<br />quem somos</h2>
          <div className="home-intro-copy">
            <p>A LaVic apresenta a kombucha de um jeito contemporâneo: produto no centro, comunicação clara e uma identidade pensada para transformar o consumo em experiência.</p>
            <div className="home-intro-stats">
              <div><strong>04</strong><span>sabores na coleção demonstrativa atual</span></div>
              <div><strong>1L</strong><span>formato principal disponível</span></div>
            </div>
          </div>
        </section>

        <section className="home-sparkling" aria-labelledby="home-sparkling-title">
          <OutlineWord className="home-sparkling-word home-sparkling-word--right">kombucha</OutlineWord>
          <OutlineWord className="home-sparkling-word home-sparkling-word--left">lavic</OutlineWord>

          <h2 id="home-sparkling-title">Você pode ser elegante e<br />ainda ser saudável!</h2>
          <p className="home-sparkling-description">Uma proposta que une presença, frescor e personalidade para transformar um momento simples em uma experiência marcante.</p>

          <div className="home-sparkling-bottle"><Image src="/products/lavic-espumante-cutout.png" alt="Espumante LaVic" fill sizes="430px" /></div>

          <div className="home-sparkling-purchase">
            <span>Espumante LaVic.</span>
            <strong>R$49,98</strong>
            <div className="home-sparkling-actions">
              <Link href="/encomendas" className="button">Quero saber mais</Link>
              <button type="button" className="home-favorite-button" aria-label="Adicionar aos favoritos"><HeartIcon /></button>
            </div>
            <div className="home-sparkling-thumbs" aria-hidden="true">
              <span><Image src="/products/lavic-espumante-cutout.png" alt="" fill sizes="86px" /></span>
              <span><Image src="/products/lavic-espumante-composition.jpg" alt="" fill sizes="86px" /></span>
              <span><Image src="/products/lavic-limao-composition.jpg" alt="" fill sizes="86px" /></span>
            </div>
          </div>
        </section>

        <section className="home-trust" aria-label="Diferenciais LaVic">
          <div className="home-trust-grid">
            <article><h3>Produto vivo e refrescante</h3></article>
            <article><h3>Qualidade e sabor</h3></article>
            <article><p>Compromisso com a experiência: frescor, apresentação e sabor tratados como parte da mesma entrega LaVic.</p></article>
          </div>
        </section>

        <section className="home-b2b" aria-labelledby="home-b2b-title">
          <div className="home-b2b-panel">
            <div className="home-b2b-copy">
              <span>LaVic para negócios</span>
              <h2 id="home-b2b-title">LaVic no seu negócio.</h2>
              <p>Uma rota comercial direta para cafés, restaurantes, mercados, hotéis, academias, eventos e outros pontos de venda.</p>
              <Link href="/revenda" className="home-b2b-link">Saiba mais</Link>
            </div>
            <div className="home-b2b-bottle home-b2b-bottle--large"><Image src="/products/lavic-limao-cutout.png" alt="Garrafa LaVic Limão" fill sizes="230px" /></div>
            <div className="home-b2b-bottle home-b2b-bottle--small"><Image src="/products/lavic-limao-cutout.png" alt="" fill sizes="200px" /></div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
