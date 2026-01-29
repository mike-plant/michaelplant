import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Smart Real Estate Help in Cleveland: Sell • Invest • Retirement | Michael Plant</title>
        <meta name="description" content="Straight answers for Cleveland sellers, investors, and hands-off retirement strategies. Tools, plain-English guides, and quick consults." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <h1>Real estate help from someone who actually cares.</h1>
          <p className="subtitle">No sales pitch. No BS. Just straight answers from someone who's been doing this since '99 and genuinely likes helping people figure stuff out.</p>

          <div className="primary-ctas">
            <Link href="/sell/lakewood" className="cta-button primary">Selling your house?</Link>
            <Link href="/invest/dscr" className="cta-button primary">Got an investment deal?</Link>
            <Link href="/retirement" className="cta-button primary">Retirement account questions?</Link>
          </div>
        </section>

        {/* Three Main Tiles */}
        <section className="main-services">
          <div className="service-tiles">
            <div className="tile">
              <h2>Selling Your House?</h2>
              <p>I know Lakewood, West Park, and Cleveland neighborhoods. I'll tell you what your house is actually worth and what needs fixing (or doesn't).</p>
              <div className="tile-links">
                <Link href="/sell/lakewood">Lakewood</Link>
                <Link href="/sell/west-park">West Park</Link>
                <Link href="/sell/cleveland">Cleveland</Link>
              </div>
            </div>

            <div className="tile">
              <h2>Thinking About Investing?</h2>
              <p>I'll help you run the numbers without the confusing jargon. DSCR loans, BRRR strategy, deal analysis—all in plain English.</p>
              <div className="tile-links">
                <Link href="/invest/dscr">DSCR Loans</Link>
                <Link href="/invest/brrr">BRRR Strategy</Link>
              </div>
            </div>

            <div className="tile">
              <h2>Got a 401k or IRA?</h2>
              <p>You can probably buy real estate with it. I'll explain the rules so you don't accidentally break them.</p>
              <div className="tile-links">
                <Link href="/retirement">Learn the rules</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tools */}
        <section className="featured-tools">
          <h2>Free calculators (no strings attached)</h2>
          <p>Seriously. No email required. Just helpful tools because I like helping people figure stuff out.</p>
          <div className="tools-grid">
            <Link href="/resources#deal-analyzer" className="tool-card">
              <h3>Deal Analyzer</h3>
              <p>Is this investment property actually worth it? Let's run the numbers.</p>
            </Link>
            <Link href="/resources#home-sale-analyzer" className="tool-card">
              <h3>Home Sale Calculator</h3>
              <p>What would you actually walk away with after selling? No guessing.</p>
            </Link>
            <Link href="/resources#retirement-checker" className="tool-card">
              <h3>401k/IRA Checker</h3>
              <p>Can your retirement account buy real estate? Quick answer.</p>
            </Link>
          </div>
        </section>

        {/* Recent Shorts - Optional Video Content */}
        <section className="recent-content">
          <h2>Quick answers</h2>
          <div className="content-grid">
            <div className="content-item">
              <h3>Should I sell now or wait?</h3>
              <p>3 factors that matter more than market timing</p>
            </div>
            <div className="content-item">
              <h3>DSCR vs conventional loans</h3>
              <p>When each makes sense for investors</p>
            </div>
            <div className="content-item">
              <h3>Retirement account real estate</h3>
              <p>Rules you can't afford to break</p>
            </div>
          </div>
          <Link href="/resources" className="view-all">View all resources →</Link>
        </section>

        {/* Proof Strip */}
        <section className="social-proof">
          <h2>Trusted by Cleveland owners & investors</h2>
          <div className="testimonials">
            <blockquote>
              "Finally, someone who gives straight answers without the sales pitch."
            </blockquote>
            <blockquote>
              "Helped us avoid a costly mistake on our first investment property."
            </blockquote>
            <blockquote>
              "Sold our house for more than we thought possible in this market."
            </blockquote>
          </div>
          <a href="https://www.google.com/search?q=michael+plant+real+estate+reviews" target="_blank" rel="noopener noreferrer" className="reviews-link">
            Reviews on Google
          </a>
        </section>

        {/* About Preview */}
        <section className="about-preview">
          <h2>Why I do this</h2>
          <p>
            I've been in real estate since '99, but I'm not your typical realtor. I actually enjoy the analytics side—
            figuring out what neighborhoods are doing, what quality looks like from photos, reading market data.
            Plus I genuinely like helping people navigate stuff that can feel overwhelming.
          </p>
          <p>
            Real estate is just one hat I wear. I invest, I build things, and soon I'll be involved with a children's bookstore.
            Common thread? I like helping people figure out what they actually need.
          </p>
          <Link href="/about" className="cta-button secondary">More about me (the real stuff)</Link>
        </section>

        {/* Email Capture - Optional */}
        <section className="email-capture">
          <h2>Get 2 useful tips a month</h2>
          <p>No spam, no sales pitches. Just practical real estate insights for Cleveland.</p>
          <form className="email-form">
            <input type="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </section>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}