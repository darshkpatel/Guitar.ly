import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './styles/nav.module.css';

const Navbar = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  return (
    <nav className={styles.navBar}>
      <div className={!session && loading ? styles.loading : styles.loaded}>
        {/* Logo */}
        <Link href="/">
          <img src="/assets/logo.svg" alt="logo" className={styles.logo} />
        </Link>
        {/* Nav Buttons */}
        <div className={styles.navItems}>
          <Link href="/tune">
            <span
              className={
                router.pathname === '/tune'
                  ? styles.navButtonActive
                  : styles.navButton
              }
            >
              Tune
            </span>
          </Link>
          |
          <Link href="/learn">
            <span
              className={
                router.pathname === '/learn'
                  ? styles.navButtonActive
                  : styles.navButton
              }
            >
              Learn
            </span>
          </Link>
          |
          <Link href="/practice">
            <span
              className={
                router.pathname === '/practice'
                  ? styles.navButtonActive
                  : styles.navButton
              }
            >
              Practice
            </span>
          </Link>
        </div>

        {/* If not Logged In */}
        {!session && (
          <>
            <a href="/api/auth/signin" onClick={signIn}>
              <span className={styles.loginButton}>Login</span>
            </a>
          </>
        )}

        {/* If logged in */}
        {session && (
          <>
            <span
              style={{ backgroundImage: `url(${session.user.image})` }}
              className={styles.avatar}
            />

            <span className={styles.userEmail}>
              {session.user.email} (
              <a
                href="/api/auth/signout"
                onClick={signOut}
                className={styles.logout}
              >
                LogOut
              </a>
              )
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
