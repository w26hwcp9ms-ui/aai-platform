import { useEffect, useState } from 'react';
import './App.css';

type ApiVersion = {
  name: string;
  version: string;
  env: string;
};

function App() {
  const [data, setData] = useState<ApiVersion | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/version')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setError('Failed to load backend /version'));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>AAI Platform</h1>

      <h2 style={{ marginTop: 20 }}>Backend status</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data ? (
        <pre style={{ background: '#f5f5f5', padding: 12 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
}

export default App;