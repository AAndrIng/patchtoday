/// <reference path="./global.d.ts" />
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/router';
import styles from './App.module.css';  // <-- Import como "styles"

function App() {
  return (
    <div className={styles.appContainer}>  {/* Usa styles.appContainer */}
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
