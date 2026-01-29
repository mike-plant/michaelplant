import Head from 'next/head'
import Layout from '../../components/Layout/Layout'
import HomeSaleAnalyzer from '../../components/Forms/HomeSaleAnalyzer'

export default function SellWestPark() {
  return (
    <Layout>
      <Head>
        <title>Sell Your House in West Park, OH — Local Market Expertise</title>
        <meta name="description" content="West Park home selling guidance with local market insights. Get realistic pricing and a clear selling plan." />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <h1>Sell your West Park home with confidence.</h1>
          <p className="subtitle">Local market knowledge, realistic pricing, clear process.</p>
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

        {/* West Park Specifics */}
        <section className="west-park-specifics">
          <h2>West Park specifics</h2>
          <ul>
            <li><strong>Neighborhoods:</strong> Kamm's Corners, West Boulevard area - family-oriented communities</li>
            <li><strong>Common buyer questions:</strong> Public transportation access, shopping centers, family amenities</li>
            <li><strong>Seasonality tips:</strong> Family buyers most active spring through early fall</li>
            <li><strong>Local considerations:</strong> Parking, yard space, proximity to I-480 for commuters</li>
          </ul>
        </section>

        {/* Net Sheet Preview */}
        <section className="net-sheet">
          <h2>Net sheet preview</h2>
          <div className="example">
            <h3>Example: $150,000 sale</h3>
            <div className="line-items">
              <div className="line">Sale Price: <span>$150,000</span></div>
              <div className="line">Agent Commission (6%): <span>-$9,000</span></div>
              <div className="line">Closing Costs: <span>-$2,500</span></div>
              <div className="line">Title/Transfer: <span>-$1,200</span></div>
              <div className="line">Estimated Net: <span className="highlight">$137,300</span></div>
            </div>
            <p className="note">*Actual numbers vary based on property condition and negotiations</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq">
          <h2>Frequently asked questions</h2>
          <div className="faq-items">
            <div className="faq-item">
              <h3>How long does it typically take to sell in West Park?</h3>
              <p>Well-priced family homes usually sell within 45-75 days. Location within West Park and school district factors matter.</p>
            </div>
            <div className="faq-item">
              <h3>Should I make repairs before listing?</h3>
              <p>Focus on safety and cosmetic issues. Family buyers notice details but also appreciate move-in ready homes. We'll prioritize what matters most.</p>
            </div>
            <div className="faq-item">
              <h3>How many showings should I expect?</h3>
              <p>Family-focused properties typically see 8-20 showings in the first month. Weekend showings are especially important here.</p>
            </div>
            <div className="faq-item">
              <h3>What if I get multiple offers?</h3>
              <p>We'll help evaluate not just price, but financing strength and family compatibility with the neighborhood. Terms matter as much as price.</p>
            </div>
            <div className="faq-item">
              <h3>Can I sell as-is?</h3>
              <p>Yes, but family buyers are often more selective. We'll position it properly and price for the investor or renovation-minded buyer market.</p>
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
              "Understood the West Park market perfectly. Got us top dollar for our family home."
            </blockquote>
            <blockquote>
              "Made the whole process stress-free. Great communication throughout."
            </blockquote>
          </div>
          <a href="#" className="reviews-link">See more reviews on Google</a>
        </section>

        {/* Cross Links */}
        <section className="cross-links">
          <h2>Also selling in:</h2>
          <div className="location-links">
            <a href="/sell/lakewood">Lakewood</a>
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