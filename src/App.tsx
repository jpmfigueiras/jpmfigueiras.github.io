import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { ProgressBar } from './components/layout/ProgressBar'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { Home } from './pages/Home'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProgressBar />
        <Header />
        <Home />
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  )
}
