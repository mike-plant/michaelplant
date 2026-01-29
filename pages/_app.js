import '../styles/globals.css'
import '../styles/pages.css'
import '../styles/forms.css'

// This file enables global CSS and any future global state
// Works with static export and vanilla fallbacks
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp