import styles from './footer.module.css';

const Footer = () => (
  <div className={styles.footer}>
    <img alt="footer" src="/assets/footer_guitar.svg" className={styles.footerImg} />
    <span className={styles.footerText}>
      Made with
      {' '}
      <span className={styles.heart}>&#9829;</span>
      {' '}
      by
      {' '}
      <a href="https://github.com/darshkpatel" className={styles.github}>darshkpatel</a>
    </span>
  </div>
);

export default Footer;
