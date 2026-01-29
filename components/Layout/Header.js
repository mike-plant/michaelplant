import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        {/* Brand/Logo */}
        <div className="brand">
          <Link href="/">
            <div className="primary-logo">
              <img src="/images/michael-plant-logo.png" alt="Michael Plant Real Estate" className="logo-image" />
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="nav">
          <div className="nav-item dropdown">
            <span className="nav-link">Sell</span>
            <div className="dropdown-content">
              <Link href="/sell/lakewood">Lakewood</Link>
              <Link href="/sell/west-park">West Park</Link>
              <Link href="/sell/cleveland">Cleveland</Link>
            </div>
          </div>

          <div className="nav-item dropdown">
            <span className="nav-link">Invest</span>
            <div className="dropdown-content">
              <Link href="/invest/dscr">DSCR Loans</Link>
              <Link href="/invest/brrr">BRRR Strategy</Link>
            </div>
          </div>

          <Link href="/retirement" className="nav-item">
            <span className="nav-link">Retirement</span>
          </Link>

          <Link href="/resources" className="nav-item">
            <span className="nav-link">Resources</span>
          </Link>

          <Link href="/about" className="nav-item">
            <span className="nav-link">About</span>
          </Link>

          <div className="nav-item">
            <a href="mailto:michael@michaelplant.com" className="nav-link contact">Contact</a>
          </div>
        </nav>

        {/* Brokerage Logo */}
        <div className="brokerage-brand">
          <img src="/images/redone-realty-logo.png" alt="REDONE REALTY" className="brokerage-image" />
        </div>

        {/* Mobile menu toggle - vanilla JS compatible */}
        <button className="mobile-toggle" onClick={() => {
          const nav = document.querySelector('.nav');
          nav.classList.toggle('mobile-open');
        }}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}