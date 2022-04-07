import { IntakeFormOverlay } from '../../components/IntakeFormOverlay/IntakeFormOverlay';
import Layout from "../../components/layout";
import styles from './IntakeForms.module.css'


export default function GenQuestion() {

  return (
    <div>
      <Layout>
        <IntakeFormOverlay/>
      </Layout>
    </div>
    )
}