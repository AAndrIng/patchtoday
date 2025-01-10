import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAllVulnerabilities } from '../../hooks/useNotion';
import { useNavigate } from 'react-router-dom';
import styles from './HistoryPage.module.css';

const HistoryPage: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const { data, loading, error } = useAllVulnerabilities();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (loading) return <p>Loading history...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.historyContainer}>
      <h2>History of Vulnerabilities</h2>
      <table className={styles.historyTable}>
        <thead>
          <tr>
            <th>Creation Date</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vuln) => (
            <tr key={vuln.id}>
              <td>{vuln.creationDate}</td>
              <td>
                <a href={vuln.url} target="_blank" rel="noreferrer">
                  {vuln.title}
                </a>
              </td>
              <td>{vuln.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;