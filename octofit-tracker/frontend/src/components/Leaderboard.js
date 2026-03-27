import { useEffect, useState } from 'react';

import { getApiUrl } from '../utils/api';
import ResourcePage from './ResourcePage';

const endpoint = getApiUrl('leaderboards');

const columns = [
  { key: 'id', label: 'ID', headerClassName: 'text-nowrap' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
];

function Leaderboard() {
  const [leaderboardEntries, setLeaderboardEntries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadLeaderboard() {
    setLoading(true);
    setError('');
    console.log('Leaderboard endpoint:', endpoint);

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const items = Array.isArray(data) ? data : data.results || [];

      console.log('Leaderboard data:', data);
      setLeaderboardEntries(items);
    } catch (requestError) {
      console.error('Leaderboard fetch failed:', requestError);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeaderboard();
  }, []);

  return (
    <ResourcePage
      columns={columns}
      data={leaderboardEntries}
      description="Leaderboard standings with uniform Bootstrap controls and detail modals."
      endpoint={endpoint}
      error={error}
      loading={loading}
      onRefresh={loadLeaderboard}
      title="Leaderboard"
    />
  );
}

export default Leaderboard;