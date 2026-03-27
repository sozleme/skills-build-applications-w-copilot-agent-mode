import { useEffect, useState } from 'react';

import { getApiUrl } from '../utils/api';
import ResourcePage from './ResourcePage';

const endpoint = getApiUrl('teams');

const columns = [
  { key: 'id', label: 'ID', headerClassName: 'text-nowrap' },
  { key: 'name', label: 'Name' },
];

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadTeams() {
    setLoading(true);
    setError('');
    console.log('Teams endpoint:', endpoint);

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const items = Array.isArray(data) ? data : data.results || [];

      console.log('Teams data:', data);
      setTeams(items);
    } catch (requestError) {
      console.error('Teams fetch failed:', requestError);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <ResourcePage
      columns={columns}
      data={teams}
      description="Team records shown with the same Bootstrap card, form, table, and modal pattern."
      endpoint={endpoint}
      error={error}
      loading={loading}
      onRefresh={loadTeams}
      title="Teams"
    />
  );
}

export default Teams;