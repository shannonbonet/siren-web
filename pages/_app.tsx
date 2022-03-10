import '../styles/globals.css'
import NavBar from '../src/components/NavBar/NavBar';
import IntakeFormOverlay from '../src/components/IntakeFormOverlay/IntakeFormOverlay';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <NavBar></NavBar>
      <IntakeFormOverlay
        title="DACA Renewal Questions"
        caseType="DACA Renewal" />
    </div>
  )
}

export default MyApp
