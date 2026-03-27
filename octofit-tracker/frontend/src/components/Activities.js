import { useEffect, useState } from 'react';

import ResourcePage from './ResourcePage';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

const columns = [
  { key: 'id', label: 'ID', headerClassName: 'text-nowrap' },
  { key: 'user', label: 'User' },
  { key: 'type', label: 'Type' },
  { key: 'duration', label: 'Duration' },
  { key: 'date', label: 'Date' },
];

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadActivities() {
    setLoading(true);
    setError('');
    console.log('Activities endpoint:', endpoint);

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const items = Array.isArray(data) ? data : data.results || [];

      console.log('Activities data:', data);
      setActivities(items);
    } catch (requestError) {
      console.error('Activities fetch failed:', requestError);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadActivities();
  }, []);

  return (
    <ResourcePage
      columns={columns}
      data={activities}
      description="Activity history styled with Bootstrap headings, forms, buttons, cards, tables, and a details modal."
      endpoint={endpoint}
      error={error}
      loading={loading}
      onRefresh={loadActivities}
      title="Activities"
    />
  );
}

export default Activities;