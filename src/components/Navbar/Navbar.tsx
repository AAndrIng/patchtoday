import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <nav className={styles.navBar}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logo}>
          PatchToday
        </Link>
      </div>
      <div className={styles.rightSection}>
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>Login / Sign Up</button>
        ) : (
          <>
            <Link to="/history" className={styles.navLink}>
              History
            </Link>
            <Link to="/admin" className={styles.navLink}>
              Admin
            </Link>
            <button
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: window.location.origin,
                  },
                })
              }
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;