import { signin, signout, useSession } from 'next-auth/client';
import styles from './nav.module.css';


const Nav = () => {
  const [session, loading] = useSession();

  return (
    <nav className={styles.navBar}>
      <noscript>
        <style>{'.nojs-show { opacity: 1; top: 0; }'}</style>
      </noscript>
      <p
        className={`nojs-show ${
          !session && loading ? styles.loading : styles.loaded
        }`}
      >

        <img src="/assets/logo.svg" alt="logo" className={styles.logo} />
        {!session && (
          <>
            <a
              href="/api/auth/signin"
              onClick={(e) => {
                e.preventDefault();
                signin();
              }}
            >
              <span className={styles.navButton}>Login</span>
            </a>
          </>
        )}
        {session && (
          <>
            <span
              style={{ backgroundImage: `url(${session.user.image})` }}
              className={styles.avatar}
            />

            <span className={styles.userEmail}>
              {session.user.email}
              {' '}

              (

              <a
                href="/api/auth/signout"
                onClick={(e) => {
                  e.preventDefault();
                  signout();
                }}
                className={styles.logout}
              >
                LogOut
              </a>
              )

            </span>
          </>
        )}
      </p>
    </nav>
  );
};

export default Nav;
