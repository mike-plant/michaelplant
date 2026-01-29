import { useState, useEffect } from 'react'

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

  // DEBUG: Monitor state changes for debugging
  useEffect(() => {
    console.log('🔍 State Update:', {
      showSuggestions,
      suggestionsCount: addressSuggestions.length,
      suggestions: addressSuggestions.slice(0, 2) // Show first 2 for debugging
    })
  }, [addressSuggestions, showSuggestions])

  const searchAddresses = async (addressInput) => {
    // Don't search if too short
    if (addressInput.length < 3) {
      setAddressSuggestions([])
      setShowSuggestions(false)
      return
    }

    console.log('Searching for:', addressInput)
    const startTime = Date.now()

    try {
      // Cleveland area cities for filtering
      const clevelandArea = [
        'Cleveland', 'Lakewood', 'Cleveland Heights', 'Shaker Heights',
        'Parma', 'Strongsville', 'Westlake', 'Bay Village', 'Rocky River',
        'Euclid', 'Garfield Heights', 'Maple Heights', 'Beachwood',
        'University Heights', 'South Euclid', 'Lyndhurst', 'Mayfield Heights',
        'Richmond Heights', 'Warrensville Heights', 'Bedford', 'Bedford Heights',
        'Brecksville', 'Broadview Heights', 'Independence', 'Seven Hills',
        'Parma Heights', 'Brook Park', 'Middleburg Heights', 'Berea',
        'Olmsted Falls', 'North Olmsted', 'Fairview Park', 'North Ridgeville'
      ]

      // Ultra-optimized search strategies - prioritize most likely matches
      const searches = []

      // Strategy 1: Start with the most effective search that covers Cleveland area
      searches.push(`${addressInput} Cuyahoga County Ohio`)

      // Strategy 2: Handle specific Cleveland area patterns
      if (addressInput.toLowerCase().includes('hill')) {
        // "hill" often means "hilliard" in Cleveland
        searches.push(`${addressInput.replace(/hill/i, 'hilliard')} Cuyahoga County Ohio`)
      } else if (addressInput.toLowerCase().includes('hilliard')) {
        // Sometimes people search "hilliard" when they mean "hill"
        searches.push(`${addressInput.replace(/hilliard/i, 'hill')} Cuyahoga County Ohio`)
      } else if (!/\b(road|rd|street|st|ave|avenue|drive|dr|blvd|boulevard|lane|ln|way|court|ct|circle|cir|place|pl)\b/i.test(addressInput)) {
        // Only add street type if it seems to be missing
        searches.push(`${addressInput} road Cuyahoga County Ohio`)
      } else {
        // Fallback to broader Ohio search only if needed
        searches.push(`${addressInput} Ohio`)
      }

      let allResults = []
      let searchCount = 0
      const maxSearches = Math.min(2, searches.length) // Even more aggressive - max 2 searches

      // Smart sequential search with early termination and rate limiting
      for (let i = 0; i < Math.min(maxSearches, searches.length); i++) {
        const searchTerm = searches[i]

        // Rate limiting: wait between requests (Nominatim policy)
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000)) // 1 second between requests
        }

        try {
          searchCount++
          console.log(`Search ${searchCount}: ${searchTerm}`)

          // Use AbortController for proper timeout handling
          const controller = new AbortController()
          const timeoutId = setTimeout(() => {
            console.log(`Request timeout for: ${searchTerm}`)
            controller.abort()
          }, 5000) // Increased to 5 seconds - Nominatim can be slow

          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=us&q=${encodeURIComponent(searchTerm)}`,
            {
              headers: {
                'User-Agent': 'MichaelPlant.com/1.0 (michael@michaelplant.com)', // Proper User-Agent format
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9'
              },
              signal: controller.signal,
              mode: 'cors', // Explicitly set CORS mode
              cache: 'no-cache' // Prevent caching issues
            }
          )

          clearTimeout(timeoutId)

          if (response.ok) {
            const data = await response.json()
            console.log(`Found ${data.length} results for: ${searchTerm}`)

            if (data.length > 0) {
              // Filter for Cleveland area (Cuyahoga County)
              const clevelandResults = data.filter(result => {
                const addr = result.address || {}
                return addr.county === 'Cuyahoga County' ||
                       clevelandArea.includes(addr.city) ||
                       clevelandArea.includes(addr.town) ||
                       clevelandArea.includes(addr.village)
              })

              if (clevelandResults.length > 0) {
                allResults = allResults.concat(clevelandResults)
                console.log(`Got ${clevelandResults.length} Cleveland results, checking if we have enough...`)

                // Early termination: if we have good results from first search, stop
                if (i === 0 && clevelandResults.length >= 2) {
                  console.log(`Early termination: ${clevelandResults.length} good results from first search`)
                  break
                }
                // If we have any exact house number match, we can stop
                const inputTokens = addressInput.toLowerCase().split(' ')
                const hasExactMatch = clevelandResults.some(result => {
                  const addr = result.address || {}
                  return inputTokens.includes(addr.house_number?.toLowerCase())
                })
                if (hasExactMatch) {
                  console.log(`Early termination: Found exact house number match`)
                  break
                }
              }
            }
          } else {
            console.log(`API returned status ${response.status} for: ${searchTerm}`)
            if (response.status === 429) {
              console.log('Rate limited by Nominatim - waiting longer before next request')
              // Wait extra time if rate limited
              await new Promise(resolve => setTimeout(resolve, 2000))
            }
            continue // Skip to next search
          }
        } catch (error) {
          if (error.name === 'AbortError') {
            console.log(`Search timeout for: ${searchTerm} (request took longer than 5 seconds)`)
          } else if (error.message.includes('Failed to fetch')) {
            console.log(`Network error for: ${searchTerm} - possibly CORS or connection issue`)
          } else {
            console.log(`Search failed for: ${searchTerm}`, error.message)
          }
          // Continue to next search on error
        }
      }

      const searchTime = Date.now() - startTime
      console.log(`Search completed in ${searchTime}ms with ${allResults.length} total results`)

      // If no results found with primary strategy, try a simplified fallback search
      if (allResults.length === 0 && addressInput.length >= 5) {
        console.log('No results with primary search - trying simplified fallback')
        try {
          const fallbackSearch = `${addressInput} Cleveland Ohio`
          console.log(`Fallback search: ${fallbackSearch}`)

          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000)

          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=3&countrycodes=us&q=${encodeURIComponent(fallbackSearch)}`,
            {
              headers: {
                'User-Agent': 'MichaelPlant.com/1.0 (michael@michaelplant.com)',
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9'
              },
              signal: controller.signal,
              mode: 'cors',
              cache: 'no-cache'
            }
          )

          clearTimeout(timeoutId)

          if (response.ok) {
            const data = await response.json()
            console.log(`Fallback found ${data.length} results`)
            if (data.length > 0) {
              allResults = data.filter(result => {
                const addr = result.address || {}
                return addr.county === 'Cuyahoga County' ||
                       clevelandArea.includes(addr.city) ||
                       clevelandArea.includes(addr.town) ||
                       clevelandArea.includes(addr.village)
              })
              console.log(`Fallback Cleveland results: ${allResults.length}`)
            }
          }
        } catch (error) {
          console.log('Fallback search failed:', error.message)
        }
      }

      if (allResults.length > 0) {
        // Remove duplicates and rank by relevance
        const uniqueResults = []
        const seen = new Set()

        allResults.forEach(result => {
          const addr = result.address || {}
          const key = `${addr.house_number || ''}-${addr.road || ''}-${addr.city || addr.town || ''}`

          if (!seen.has(key)) {
            seen.add(key)
            uniqueResults.push(result)
          }
        })

        // Sort by relevance - prioritize exact input matches
        const sortedResults = uniqueResults.sort((a, b) => {
          const aAddr = a.address || {}
          const bAddr = b.address || {}

          // Prefer exact house number matches
          const inputTokens = addressInput.toLowerCase().split(' ')
          const aHouseMatch = inputTokens.includes(aAddr.house_number?.toLowerCase())
          const bHouseMatch = inputTokens.includes(bAddr.house_number?.toLowerCase())

          if (aHouseMatch && !bHouseMatch) return -1
          if (!aHouseMatch && bHouseMatch) return 1

          // Prefer street name matches
          const aStreetMatch = inputTokens.some(token =>
            aAddr.road?.toLowerCase().includes(token) || token.includes(aAddr.road?.toLowerCase())
          )
          const bStreetMatch = inputTokens.some(token =>
            bAddr.road?.toLowerCase().includes(token) || token.includes(bAddr.road?.toLowerCase())
          )

          if (aStreetMatch && !bStreetMatch) return -1
          if (!aStreetMatch && bStreetMatch) return 1

          // Prefer Lakewood and Cleveland over other suburbs
          const priorityCities = ['Lakewood', 'Cleveland']
          const aPriority = priorityCities.includes(aAddr.city) || priorityCities.includes(aAddr.town)
          const bPriority = priorityCities.includes(bAddr.city) || priorityCities.includes(bAddr.town)

          if (aPriority && !bPriority) return -1
          if (!aPriority && bPriority) return 1

          return 0
        })

        // Format top 5 results
        const formatted = sortedResults.slice(0, 5).map(result => {
          const addr = result.address || {}
          let display = ''

          // Build: "16707 Hilliard Rd, Lakewood, OH 44107"
          if (addr.house_number && addr.road) {
            display = `${addr.house_number} ${addr.road}`
            const city = addr.city || addr.town
            if (city) display += `, ${city}`
            if (addr.state_code) display += `, ${addr.state_code}`
            if (addr.postcode) display += ` ${addr.postcode}`
          } else {
            display = result.display_name
          }

          return display
        })

        console.log('📍 Setting suggestions:', formatted.length, 'results')
        setAddressSuggestions(formatted)
        setShowSuggestions(true)
        console.log(`Showing ${formatted.length} suggestions in ${searchTime}ms:`, formatted)
      } else {
        setAddressSuggestions([])
        setShowSuggestions(false)
        console.log(`No Cleveland area results found in ${searchTime}ms`)
      }

    } catch (error) {
      console.log('Search error:', error)
      setAddressSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Debounced address search with faster response
    if (name === 'address') {
      if (searchTimeout) clearTimeout(searchTimeout)

      // Balanced debounce - responsive but not too aggressive
      const timeout = setTimeout(() => {
        searchAddresses(value)
      }, 600) // Wait 600ms after user stops typing - balances responsiveness with API limits

      setSearchTimeout(timeout)
    }
  }

  const selectAddress = (address) => {
    console.log('✅ Address selected:', address)
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
            onFocus={() => {
              console.log('🎯 Input focused - suggestions available:', addressSuggestions.length)
              // Re-show suggestions if we have them and the input has content
              if (addressSuggestions.length > 0 && formData.address.length >= 3) {
                setShowSuggestions(true)
              }
            }}
            onBlur={() => {
              console.log('🎯 Input blurred')
              // Don't auto-hide on blur to allow suggestion clicks
            }}
            placeholder="Start typing your Cleveland area address..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            required
          />
          {(() => {
            console.log('🎨 Render check:', { showSuggestions, count: addressSuggestions.length });
            return showSuggestions && addressSuggestions.length > 0 && (
              <div className="address-suggestions" style={{ border: '2px solid #007bff', backgroundColor: '#fff' }}>
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
            )
          })()}
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