import { useEffect, useState } from 'react';

import ResourcePage from './ResourcePage';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

const columns = [
  { key: 'id', label: 'ID', headerClassName: 'text-nowrap' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'team', label: 'Team' },
];

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    setLoading(true);
    setError('');
    console.log('Users endpoint:', endpoint);

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const items = Array.isArray(data) ? data : data.results || [];

      console.log('Users data:', data);
      setUsers(items);
    } catch (requestError) {
      console.error('Users fetch failed:', requestError);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <ResourcePage
      columns={columns}
      data={users}
      description="Registered users from the Django backend with a consistent Bootstrap presentation."
      endpoint={endpoint}
      error={error}
      loading={loading}
      onRefresh={loadUsers}
      title="Users"
    />
  );
}

export default Users;