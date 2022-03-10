import '../styles/globals.css'
import NavBar from '../src/components/NavBar/NavBar';
import IntakeFormOverlay from '../src/components/IntakeFormOverlay/IntakeFormOverlay';

function MyApp({ Component, pageProps }) {
  return (
<<<<<<< HEAD
    <div>
      <NavBar></NavBar>
      <IntakeFormOverlay
        title="DACA Renewal Questions"
        caseType="DACA Renewal" />
    </div>
=======
    <Component {...pageProps} />
>>>>>>> 7956e4143517fe5ce9ec19c15ef0ddfb6fb6bfa9
  )
}

export default MyApp
