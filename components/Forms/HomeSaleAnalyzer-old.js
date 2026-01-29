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

  // Improved address lookup for Cleveland area
  const getClevelandAreaAddresses = async (addressInput) => {
    const searchStrategies = [
      // Strategy 1: Try with just "Ohio" first - most flexible and effective
      addressInput + ' Ohio',
      // Strategy 2: Try adding "road" or "rd" for street addresses
      addressInput + ' road Ohio',
      addressInput + ' rd Ohio',
      // Strategy 3: Try with "Cuyahoga County Ohio" for more specific results
      addressInput + ' Cuyahoga County Ohio',
      // Strategy 4: Try with "Cleveland OH" as last resort (often too restrictive)
      addressInput + ' Cleveland OH'
    ];

    // List of Cleveland area cities/suburbs for filtering
    const clevelandAreaCities = [
      'Cleveland', 'Lakewood', 'Cleveland Heights', 'Shaker Heights',
      'Parma', 'Strongsville', 'Westlake', 'Bay Village', 'Rocky River',
      'Euclid', 'Garfield Heights', 'Maple Heights', 'Beachwood',
      'University Heights', 'South Euclid', 'Lyndhurst', 'Mayfield Heights',
      'Richmond Heights', 'Warrensville Heights', 'Bedford', 'Bedford Heights',
      'Brecksville', 'Broadview Heights', 'Independence', 'Seven Hills',
      'Parma Heights', 'Brook Park', 'Middleburg Heights', 'Berea',
      'Olmsted Falls', 'North Olmsted', 'Fairview Park', 'North Ridgeville'
    ];

    for (const searchTerm of searchStrategies) {
      try {
        console.log('Trying search:', searchTerm);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=us&q=${encodeURIComponent(searchTerm)}`,
          {
            headers: {
              'User-Agent': 'MichaelPlant.com Address Lookup'
            }
          }
        );

        if (!response.ok) {
          console.log(`HTTP error ${response.status} for search: ${searchTerm}`);
          continue;
        }

        const data = await response.json();
        console.log('API returned:', data.length, 'results for:', searchTerm);

        if (data.length > 0) {
          // Filter results to Cleveland area (Cuyahoga County) if we got broader results
          const clevelandAreaResults = data.filter(result => {
            const address = result.address || {};
            return address.county === 'Cuyahoga County' ||
                   clevelandAreaCities.includes(address.city) ||
                   clevelandAreaCities.includes(address.town);
          });

          if (clevelandAreaResults.length > 0) {
            return clevelandAreaResults.map(item => item.display_name);
          }

          // If no Cleveland area results but we have Ohio results, return first few
          if (searchTerm.includes('Ohio')) {
            return data.slice(0, 3).map(item => item.display_name);
          }
        }
      } catch (error) {
        console.log(`Search strategy failed: ${searchTerm}`, error.message);
        continue;
      }
    }

    return []; // No results found
  };

  const handleChange = async (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Address autocomplete with improved search
    if (name === 'address' && value.length > 3) {
      try {
        const suggestions = await getClevelandAreaAddresses(value);
        setAddressSuggestions(suggestions);
        setShowSuggestions(suggestions.length > 0);
      } catch (error) {
        console.log('Address lookup not available:', error.message);
        setAddressSuggestions([]);
        setShowSuggestions(false);
      }
    }
  }

  const selectAddress = (address) => {
    setFormData(prev => ({ ...prev, address }))
    setShowSuggestions(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form processing
    try {
      // In production, this would send to your form handler
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
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
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
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
          >
            <option value="">Choose one</option>
            <option value="move-in-ready">Move-in ready</option>
            <option value="needs-minor-work">Needs some updating</option>
            <option value="needs-major-work">Needs significant work</option>
            <option value="not-sure">Not sure / want your opinion</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email (so I can send you the numbers)</label>
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
          <label htmlFor="notes">Anything else I should know? (optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Special circumstances, timeline, specific questions..."
            rows="3"
          />
        </div>
      </div>

      <div className="form-footer">
        <button
          type="submit"
          className="cta-button primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Getting your numbers...' : 'Get my realistic estimate'}
        </button>
        <p className="form-disclaimer">
          I'll email you back within a day or two with honest numbers. No spam, no sales calls.
        </p>
      </div>
    </form>
  )
}