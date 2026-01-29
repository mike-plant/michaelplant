import Head from 'next/head'
import Layout from '../../components/Layout/Layout'
import HomeSaleAnalyzer from '../../components/Forms/HomeSaleAnalyzer'

export default function SellCleveland() {
  return (
    <Layout>
      <Head>
        <title>Sell Your House in Cleveland, OH — Local Market Experts</title>
        <meta name="description" content="Cleveland home selling with neighborhood-specific expertise. Realistic pricing and proven process." />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <h1>Sell your Cleveland home the smart way.</h1>
          <p className="subtitle">Neighborhood expertise, honest pricing, proven results.</p>
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

        {/* Cleveland Specifics */}
        <section className="cleveland-specifics">
          <h2>Cleveland specifics</h2>
          <ul>
            <li><strong>Neighborhoods:</strong> Ohio City, Tremont, Detroit Shoreway - each market has unique characteristics</li>
            <li><strong>Common buyer questions:</strong> Safety, downtown commute, upcoming development projects</li>
            <li><strong>Seasonality tips:</strong> Urban markets stay more active year-round than suburban</li>
            <li><strong>Local considerations:</strong> Historic districts, zoning issues, parking arrangements</li>
          </ul>
        </section>

        {/* Net Sheet Preview */}
        <section className="net-sheet">
          <h2>Net sheet preview</h2>
          <div className="example">
            <h3>Example: $180,000 sale</h3>
            <div className="line-items">
              <div className="line">Sale Price: <span>$180,000</span></div>
              <div className="line">Agent Commission (6%): <span>-$10,800</span></div>
              <div className="line">Closing Costs: <span>-$2,700</span></div>
              <div className="line">Title/Transfer: <span>-$1,300</span></div>
              <div className="line">Estimated Net: <span className="highlight">$165,200</span></div>
            </div>
            <p className="note">*Actual numbers vary based on property condition and negotiations</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq">
          <h2>Frequently asked questions</h2>
          <div className="faq-items">
            <div className="faq-item">
              <h3>How long does it typically take to sell in Cleveland?</h3>
              <p>Urban properties vary widely by neighborhood. Well-positioned homes in desirable areas sell in 30-60 days.</p>
            </div>
            <div className="faq-item">
              <h3>Should I make repairs before listing?</h3>
              <p>Depends on the neighborhood and buyer type. Some areas favor renovation projects, others want move-in ready. We'll guide you based on your specific location.</p>
            </div>
            <div className="faq-item">
              <h3>How many showings should I expect?</h3>
              <p>Urban properties often see fewer but more serious showings. 5-12 showings typically indicates good market interest.</p>
            </div>
            <div className="faq-item">
              <h3>What if I get multiple offers?</h3>
              <p>In competitive Cleveland neighborhoods, we'll help you evaluate financing quality, inspection terms, and closing flexibility alongside price.</p>
            </div>
            <div className="faq-item">
              <h3>Can I sell as-is?</h3>
              <p>Cleveland has an active investor market. We can position your property for investors or first-time buyers looking for projects.</p>
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
              "Knows the Cleveland market inside and out. Sold for more than we expected."
            </blockquote>
            <blockquote>
              "Handled all the urban property complexities we didn't even know about."
            </blockquote>
          </div>
          <a href="#" className="reviews-link">See more reviews on Google</a>
        </section>

        {/* Cross Links */}
        <section className="cross-links">
          <h2>Also selling in:</h2>
          <div className="location-links">
            <a href="/sell/lakewood">Lakewood</a>
            <a href="/sell/west-park">West Park</a>
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