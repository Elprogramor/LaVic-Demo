import Link from "next/link";
import { ArrowIcon } from "@/components/ui/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-shell">
        <div className="site-footer-lead">
          <h2>Viva com gás.<br />Viva LaVic.</h2>
          <Link href="/sabores" className="arrow-circle" aria-label="Conhecer sabores"><ArrowIcon direction="up" /></Link>
        </div>

        <div className="site-footer-grid">
          <div className="site-footer-links-cluster">
            <div>
              <h3>LAVIC</h3>
              <div className="footer-links">
                <span>Uma experiência digital demonstrativa para apresentar produto, marca e relacionamento em um único canal próprio.</span>
              </div>
            </div>
            <div>
              <h3>NAVEGAÇÃO</h3>
              <div className="footer-links">
                <Link href="/sabores">Sabores</Link>
                <Link href="/kits">Kits</Link>
                <Link href="/revenda">Revenda</Link>
                <Link href="/sobre">Sobre</Link>
              </div>
            </div>
          </div>

          <div className="site-footer-contact">
            <h3>AJUDA</h3>
            <p>Um canal demonstrativo pensado para ajudar a marca a vender, contar história e criar relacionamento sem depender apenas de terceiros.</p>
            <div className="footer-contact-line"><span>Encomendas</span><ArrowIcon /></div>
            <div className="footer-contact-line"><span>Contato</span><ArrowIcon /></div>
            <div className="footer-contact-line"><span>Checkout</span><ArrowIcon /></div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <div className="site-footer-legal">
            <Link href="/sobre">Privacidade</Link>
            <Link href="/sobre">Termos</Link>
            <Link href="/sobre">Cookies</Link>
          </div>
          <span>© 2026 LaVic. Todos os direitos reservados.</span>
          <div className="site-footer-social" aria-label="Redes sociais"><span>●</span><span>●</span><span>●</span><span>●</span></div>
        </div>
      </div>
    </footer>
  );
}
