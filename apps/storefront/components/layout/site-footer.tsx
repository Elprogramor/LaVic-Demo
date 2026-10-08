import Link from "next/link";
import { ArrowIcon } from "@/components/ui/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-shell">
        <div className="site-footer-lead">
          <h2>Subscribe Us</h2>
          <Link href="/sabores" className="arrow-circle" aria-label="Conhecer sabores"><ArrowIcon direction="up" /></Link>
        </div>

        <div className="site-footer-grid">
          <div className="site-footer-links-cluster">
            <div>
              <h3>Shop & information</h3>
              <div className="footer-links">
                <Link href="/sabores">Sabores</Link>
                <Link href="/kits">Kits</Link>
                <Link href="/revenda">Revenda</Link>
                <Link href="/encomendas">Encomendas</Link>
              </div>
            </div>
            <div>
              <h3>LaVic</h3>
              <div className="footer-links">
                <Link href="/sobre">Sobre</Link>
                <Link href="/carrinho">Carrinho</Link>
                <Link href="/checkout">Checkout</Link>
                <Link href="/revenda">Para negócios</Link>
              </div>
            </div>
          </div>

          <div className="site-footer-contact">
            <h3>Prepare your favorite flavor</h3>
            <p>Uma experiência direta para descobrir, escolher e acompanhar a LaVic em um canal próprio.</p>
            <div className="footer-contact-line"><span>Fale com a LaVic</span><ArrowIcon /></div>
            <div className="footer-contact-line"><span>Receba novidades da marca</span><ArrowIcon /></div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <div className="site-footer-legal">
            <Link href="/sobre">Terms</Link>
            <Link href="/sobre">Privacy</Link>
            <Link href="/sobre">Cookies</Link>
            <Link href="/sobre">Legal</Link>
          </div>
          <span>© 2026 LaVic. Todos os direitos reservados.</span>
          <div className="site-footer-social" aria-label="Redes sociais"><span>●</span><span>●</span><span>●</span><span>●</span></div>
        </div>
      </div>
    </footer>
  );
}
