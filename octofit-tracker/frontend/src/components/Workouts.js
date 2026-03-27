import { useEffect, useState } from 'react';

import { getApiUrl } from '../utils/api';
import ResourcePage from './ResourcePage';

const endpoint = getApiUrl('workouts');

const columns = [
  { key: 'id', label: 'ID', headerClassName: 'text-nowrap' },
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'suggested_for', label: 'Suggested For' },
];

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadWorkouts() {
    setLoading(true);
    setError('');
    console.log('Workouts endpoint:', endpoint);

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const items = Array.isArray(data) ? data : data.results || [];

      console.log('Workouts data:', data);
      setWorkouts(items);
    } catch (requestError) {
      console.error('Workouts fetch failed:', requestError);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkouts();
  }, []);

  return (
    <ResourcePage
      columns={columns}
      data={workouts}
      description="Workout recommendations presented with a reusable Bootstrap-first layout."
      endpoint={endpoint}
      error={error}
      loading={loading}
      onRefresh={loadWorkouts}
      title="Workouts"
    />
  );
}

export default Workouts;