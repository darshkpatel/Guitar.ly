import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import styles from './layout.module.css';

const Layout = ({ children }) => (
  <>

    <div className={styles.container}>
      <header>
        <title>Guitar.ly</title>
      </header>
      <Navbar />
      <div className={styles.content}>
        {children}
      </div>
      <Footer />
    </div>
  </>
);

export default Layout;
