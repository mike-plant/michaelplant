import { useState } from 'react'

export default function DealAnalyzer() {
  const [formData, setFormData] = useState({
    address: '',
    purchasePrice: '',
    rehabBudget: '',
    targetRent: '',
    timeline: '',
    email: '',
    phone: '',
    notes: '',
    consent: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form processing
    try {
      // In production, this would send to your form handler
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('Deal analysis submitted:', formData)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="form-success">
        <h3>Deal Analysis Request Received!</h3>
        <p>I'll analyze this investment opportunity and provide you with conservative numbers, potential risks, and realistic projections within 1–2 business days.</p>
        <p>Need faster turnaround? <a href="mailto:michael@michaelplant.com">Email me directly</a> or <a href="https://calendly.com/michaelplant" target="_blank" rel="noopener noreferrer">schedule a quick call</a>.</p>
      </div>
    )
  }

  return (
    <form className="deal-analyzer-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        {/* Property Details */}
        <div className="form-section">
          <h3>Investment Property Details</h3>

          <div className="form-group">
            <label htmlFor="address">Property Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Investment St, Cleveland, OH"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="purchasePrice">Purchase Price *</label>
            <input
              type="number"
              id="purchasePrice"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
              placeholder="150000"
              min="0"
              step="1000"
              required
            />
            <span className="field-help">Enter amount without $ or commas</span>
          </div>

          <div className="form-group">
            <label htmlFor="rehabBudget">Estimated Rehab Budget</label>
            <input
              type="number"
              id="rehabBudget"
              name="rehabBudget"
              value={formData.rehabBudget}
              onChange={handleChange}
              placeholder="25000"
              min="0"
              step="1000"
            />
            <span className="field-help">Leave blank if move-in ready</span>
          </div>

          <div className="form-group">
            <label htmlFor="targetRent">Target Monthly Rent</label>
            <input
              type="number"
              id="targetRent"
              name="targetRent"
              value={formData.targetRent}
              onChange={handleChange}
              placeholder="1200"
              min="0"
              step="50"
            />
            <span className="field-help">Your estimated rental income</span>
          </div>

          <div className="form-group">
            <label htmlFor="timeline">Investment Timeline</label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
            >
              <option value="">Select timeline</option>
              <option value="ready-now">Ready to move now</option>
              <option value="30-days">Within 30 days</option>
              <option value="2-3-months">2-3 months</option>
              <option value="exploring">Just exploring options</option>
            </select>
          </div>
        </div>

        {/* Contact & Strategy */}
        <div className="form-section">
          <h3>Contact & Strategy</h3>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Additional Details</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Strategy (BRRR, buy & hold, etc.), financing plans, specific questions..."
              rows="4"
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
              />
              <span className="checkmark"></span>
              I consent to being contacted about this investment analysis *
            </label>
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button
          type="submit"
          className="cta-button primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Analyzing Deal...' : 'Get Deal Analysis'}
        </button>
        <p className="form-disclaimer">
          Educational purposes only — not financial, tax, or legal advice.
        </p>
      </div>
    </form>
  )
}