import React from 'react';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h2>404 - Page Not Found</h2>
    </div>
  );
};

export default NotFound;
