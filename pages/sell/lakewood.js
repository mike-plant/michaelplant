import Head from 'next/head'
import Layout from '../../components/Layout/Layout'
import HomeSaleAnalyzer from '../../components/Forms/HomeSaleAnalyzer'

export default function SellLakewood() {
  return (
    <Layout>
      <Head>
        <title>Sell Your House in Lakewood, OH — Data-Driven & Simple</title>
        <meta name="description" content="Price guidance, timing, and a clear plan to sell in Lakewood. Local tips + a quick Home Sale Analyzer." />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <h1>Sell your Lakewood home with fewer surprises.</h1>
          <p className="subtitle">Local guidance, clear numbers, realistic timelines.</p>
          <a href="#analyzer" className="cta-button">Start with a quick estimate</a>
        </section>

        {/* Who This Is For */}
        <section className="who-for">
          <h2>Who this is for</h2>
          <ul>
            <li><strong>Downsizing</strong> - Moving to something smaller or more manageable</li>
            <li><strong>Moving for work</strong> - Relocating and need a clear timeline</li>
            <li><strong>Inherited property</strong> - Dealing with an estate situation</li>
            <li><strong>Needs work</strong> - Property requires repairs before selling</li>
          </ul>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <h2>How it works</h2>
          <div className="steps">
            <div className="step">
              <h3>1. Walkthrough</h3>
              <p>We assess your property and discuss your timeline</p>
            </div>
            <div className="step">
              <h3>2. Pricing plan</h3>
              <p>Market analysis with realistic pricing strategy</p>
            </div>
            <div className="step">
              <h3>3. Prep options</h3>
              <p>What to fix, what to leave, staging recommendations</p>
            </div>
            <div className="step">
              <h3>4. Listing & negotiation</h3>
              <p>Professional marketing and skilled negotiation</p>
            </div>
          </div>
        </section>

        {/* Lakewood Specifics */}
        <section className="lakewood-specifics">
          <h2>Lakewood specifics</h2>
          <ul>
            <li><strong>Neighborhoods:</strong> Birdtown, Downtown Lakewood, West End - each has different buyer preferences</li>
            <li><strong>Common buyer questions:</strong> School districts, proximity to downtown Cleveland, walkability</li>
            <li><strong>Seasonality tips:</strong> Spring market typically strongest, winter showings focus on location benefits</li>
            <li><strong>Local considerations:</strong> Historic charm vs. modern updates, parking availability</li>
          </ul>
        </section>

        {/* Net Sheet Preview */}
        <section className="net-sheet">
          <h2>Net sheet preview</h2>
          <div className="example">
            <h3>Example: $200,000 sale</h3>
            <div className="line-items">
              <div className="line">Sale Price: <span>$200,000</span></div>
              <div className="line">Agent Commission (6%): <span>-$12,000</span></div>
              <div className="line">Closing Costs: <span>-$3,000</span></div>
              <div className="line">Title/Transfer: <span>-$1,500</span></div>
              <div className="line">Estimated Net: <span className="highlight">$183,500</span></div>
            </div>
            <p className="note">*Actual numbers vary based on property condition and negotiations</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq">
          <h2>Frequently asked questions</h2>
          <div className="faq-items">
            <div className="faq-item">
              <h3>How long does it typically take to sell in Lakewood?</h3>
              <p>Most well-priced homes sell within 30-60 days. Market conditions and pricing strategy are the biggest factors.</p>
            </div>
            <div className="faq-item">
              <h3>Should I make repairs before listing?</h3>
              <p>It depends. Small cosmetic fixes usually pay off, but major renovations often don't. We'll give you specific recommendations based on your property.</p>
            </div>
            <div className="faq-item">
              <h3>How many showings should I expect?</h3>
              <p>Properly priced homes typically see 5-15 showings in the first two weeks. More showings with no offers usually means a pricing adjustment is needed.</p>
            </div>
            <div className="faq-item">
              <h3>What if I get multiple offers?</h3>
              <p>Great problem to have! We'll help you evaluate not just price, but terms, financing, and closing timeline to pick the best overall offer.</p>
            </div>
            <div className="faq-item">
              <h3>Can I sell as-is?</h3>
              <p>Absolutely. We'll price accordingly and market to investors or buyers looking for projects. Sometimes this nets more than fixing everything first.</p>
            </div>
          </div>
        </section>

        {/* Home Sale Analyzer */}
        <section id="analyzer" className="analyzer">
          <h2>Home Sale Analyzer</h2>
          <p>Get a realistic estimate based on your specific property and timeline.</p>
          <HomeSaleAnalyzer />
        </section>

        {/* Trust Section */}
        <section className="trust">
          <h2>Trusted by Cleveland area homeowners</h2>
          <div className="testimonials">
            <blockquote>
              "Michael gave us realistic expectations from day one. No surprises, sold in 45 days."
            </blockquote>
            <blockquote>
              "Helped us decide what repairs were worth it. Saved us thousands."
            </blockquote>
          </div>
          <a href="#" className="reviews-link">See more reviews on Google</a>
        </section>

        {/* Cross Links */}
        <section className="cross-links">
          <h2>Also selling in:</h2>
          <div className="location-links">
            <a href="/sell/west-park">West Park</a>
            <a href="/sell/cleveland">Cleveland</a>
          </div>
          <a href="/resources">Tools & Resources</a>
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