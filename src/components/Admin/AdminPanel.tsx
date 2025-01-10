import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAdminCheck } from '../../hooks/useAdminCheck';
import styles from './AdminPanel.module.css';

const AdminPanel: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const isAdmin = useAdminCheck();

  if (!isAuthenticated || !isAdmin) {
    return <div className={styles.error}>Access Denied</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <h2>Admin Panel</h2>
      <p>Logs of users and transactions will appear here.</p>
    </div>
  );
};

export default AdminPanel;