
import styles from '../components/homepage.module.css'

const NextAuth = () => (
  <div className={styles.container}>
        <div className={styles.rightContainer}>
          <img src='/assets/bottom_flow_black.svg'></img>
          <img src='/assets/logo_text.svg'  className={styles.centerImg}></img>
        </div>
          <img src='/assets/get_started.svg'  className={styles.getStarted}></img>
  </div>
)

export default NextAuth
