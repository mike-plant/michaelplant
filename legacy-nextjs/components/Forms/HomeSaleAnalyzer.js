import { useState } from 'react'

export default function HomeSaleAnalyzer() {
  const [formData, setFormData] = useState({
    address: '',
    condition: '',
    email: '',
    notes: ''
  })

  const [addressSuggestions, setAddressSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const searchAddresses = async (addressInput) => {
    if (addressInput.length < 3) {
      setAddressSuggestions([])
      setShowSuggestions(false)
      return
    }

    console.log('Searching for:', addressInput)

    try {
      // Use Google Places API for address autocomplete
      // Note: You'll need to add your Google API key to environment variables
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE'

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(addressInput)}&types=address&components=country:US|administrative_area:OH|locality:Cleveland|locality:Lakewood|locality:Cleveland Heights|locality:Shaker Heights&key=${apiKey}`
      )

      if (response.ok) {
        const data = await response.json()
        console.log('Google Places API response:', data)

        if (data.predictions && data.predictions.length > 0) {
          const suggestions = data.predictions
            .slice(0, 5)
            .map(prediction => prediction.description)

          setAddressSuggestions(suggestions)
          setShowSuggestions(true)
          console.log('Showing suggestions:', suggestions)
        } else {
          setAddressSuggestions([])
          setShowSuggestions(false)
        }
      } else {
        console.log('Google Places API error:', response.status)
        setAddressSuggestions([])
        setShowSuggestions(false)
      }
    } catch (error) {
      console.log('Address search error:', error)
      setAddressSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'address') {
      if (searchTimeout) clearTimeout(searchTimeout)
      const timeout = setTimeout(() => searchAddresses(value), 500)
      setSearchTimeout(timeout)
    }
  }

  const selectAddress = (address) => {
    setFormData(prev => ({ ...prev, address }))
    setShowSuggestions(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form submitted:', formData)
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
        <h3>Thanks!</h3>
        <p>I'll take a look at this and get back to you with realistic numbers within a day or two. No sales pitch, just honest assessment.</p>
        <p>Quick question in the meantime? <a href="mailto:michael@michaelplant.com">Just email me</a>.</p>
      </div>
    )
  }

  return (
    <form className="home-sale-form" onSubmit={handleSubmit}>
      <h3>What's your house actually worth?</h3>
      <p>Just need the address and I'll give you realistic numbers. No 20-question quiz.</p>

      <div className="simple-form">
        <div className="form-group address-group">
          <label htmlFor="address">Property Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Start typing your Cleveland area address..."
            autoComplete="off"
            required
          />
          {showSuggestions && addressSuggestions.length > 0 && (
            <div className="address-suggestions">
              {addressSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => selectAddress(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="condition">What shape is it in?</label>
          <select id="condition" name="condition" value={formData.condition} onChange={handleChange}>
            <option value="">Choose one</option>
            <option value="move-in-ready">Move-in ready</option>
            <option value="needs-minor-work">Needs some updating</option>
            <option value="needs-major-work">Needs significant work</option>
            <option value="not-sure">Not sure / want your opinion</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email (so I can send you the numbers)</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Anything else I should know? (optional)</label>
          <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="Special circumstances, timeline, specific questions..." rows="3" />
        </div>
      </div>

      <div className="form-footer">
        <button type="submit" className="cta-button primary" disabled={isSubmitting}>
          {isSubmitting ? 'Getting your numbers...' : 'Get my realistic estimate'}
        </button>
        <p className="form-disclaimer">I'll email you back within a day or two with honest numbers. No spam, no sales calls.</p>
      </div>
    </form>
  )
}