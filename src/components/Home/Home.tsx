import React from 'react';
import { useLastTenVulnerabilities } from '../../hooks/useNotion';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const { data, loading, error } = useLastTenVulnerabilities();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.homeContainer}>
      <h2 className={styles.slogan}>Your cyber security weekly source!</h2>

      <table className={styles.vulnTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Affected OS</th>
            <th>Description</th>
            <th>Creation Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vuln) => {
            const creationDate = new Date(vuln.creationDate);
            const now = new Date();
            const diffDays = Math.floor(
              (now.getTime() - creationDate.getTime()) / (1000 * 3600 * 24)
            );

            let displayedStatus = vuln.status;
            let statusStyle = {};

            if (diffDays >= 7 && vuln.status !== 'Reported') {
              displayedStatus = 'Reported';
              statusStyle = { color: 'lightgray' };
            }

            return (
              <tr key={vuln.id}>
                <td>
                  <a href={vuln.url} target="_blank" rel="noreferrer">
                    {vuln.title}
                  </a>
                </td>
                <td>{vuln.affectedOS}</td>
                <td>{vuln.description}</td>
                <td>{vuln.creationDate}</td>
                <td style={statusStyle}>{displayedStatus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className={styles.chainsBand}>
        <img src="/assets/bnb-logo.png" alt="BNB" />
        <img src="/assets/avalanche-logo.png" alt="Avalanche" />
      </div>
    </div>
  );
};

export default Home;