import Link from 'next/link';
import styles from '../components/styles/homepage.module.css';

const Homepage = () => (
  <div className={styles.container}>
    <div className={styles.rightContainer}>
      <img
        src="/assets/bottom_flow_black.svg"
        alt="bottom flow"
        className={styles.bottom}
      />
      <img
        src="/assets/logo_text.svg"
        alt="logo and text"
        className={styles.centerImg}
      />
    </div>
    <Link href="/tune">
      <img
        src="/assets/get_started.svg"
        alt="getting started button"
        className={styles.getStarted}
      />
    </Link>
  </div>
);

export default Homepage;
