import React from 'react';
import AppRouter from './components/router';
import Navbar from './components/Navbar/Navbar';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
