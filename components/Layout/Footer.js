import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* NAP (Name, Address, Phone) */}
          <div className="footer-section nap">
            <h3>Michael Plant Real Estate</h3>
            <div className="contact-info">
              <p>Cleveland, OH Area</p>
              <p>Phone: <a href="tel:+1234567890">(123) 456-7890</a></p>
              <p>Email: <a href="mailto:michael@michaelplant.com">michael@michaelplant.com</a></p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section links">
            <h4>Services</h4>
            <ul>
              <li><Link href="/sell/lakewood">Sell in Lakewood</Link></li>
              <li><Link href="/sell/west-park">Sell in West Park</Link></li>
              <li><Link href="/sell/cleveland">Sell in Cleveland</Link></li>
              <li><Link href="/invest/dscr">DSCR Loans</Link></li>
              <li><Link href="/invest/brrr">BRRR Strategy</Link></li>
              <li><Link href="/retirement">Retirement Accounts</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section resources">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/resources">Tools & Calculators</Link></li>
              <li><Link href="/about">About Michael</Link></li>
              <li><a href="https://www.google.com/search?q=michael+plant+real+estate+reviews" target="_blank" rel="noopener noreferrer">Google Reviews</a></li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="footer-section social-legal">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://linkedin.com/in/michaelplant" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://facebook.com/michaelplantre" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
            <div className="legal-links">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </div>
          </div>
        </div>

        {/* Micro CTAs */}
        <div className="footer-ctas">
          <a href="https://calendly.com/michaelplant" target="_blank" rel="noopener noreferrer" className="footer-cta">
            Get a quick consult
          </a>
          <a href="mailto:michael@michaelplant.com" className="footer-cta">
            Ask a question
          </a>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="footer-bottom">
          <p className="disclaimer">
            Educational purposes only — not financial, tax, or legal advice.
            <Link href="/disclaimer"> Full disclaimer</Link>
          </p>
          <p className="copyright">
            © {new Date().getFullYear()} Michael Plant Real Estate. All rights reserved.
          </p>
          <p className="tagline">Straight answers. No hype.</p>
        </div>
      </div>
    </footer>
  )
}