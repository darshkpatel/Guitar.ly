import Nav from './Nav';
import Footer from './Footer';
import styles from './layout.module.css';

const Layout = ({ children }) => (
  <>

    <div className={styles.container}>
      <header>
        <title>Guitar.ly</title>
      </header>
      <Nav />
      <div className={styles.content}>
        {children}
      </div>
      <Footer />
    </div>
  </>
);

export default Layout;
