import Navbar from './Navbar';
import PageFooter from './PageFooter';
import styles from './styles/layout.module.css';

const Layout = ({ children, contentStyle }) => (
  <>
    <div className={styles.container}>
      <header>
        <title>Guitar.ly</title>
      </header>
      <Navbar />
      <div className={styles.content} style={contentStyle}>{children}</div>
      <PageFooter />
    </div>
  </>
);

export default Layout;
