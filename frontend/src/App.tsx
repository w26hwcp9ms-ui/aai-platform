import { useEffect, useState } from 'react';
import './App.css';

type ApiVersion = {
  name: string;
  version: string;
  env: string;
};

type Plan = {
  code: string;
  name: string;
  monthly_price_cents: number;
  currency: string;
  monthly_generations: number;
};

const API_URL = 'http://127.0.0.1:8000';

function App() {
  const [version, setVersion] = useState<ApiVersion | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/version`).then((r) => r.json()),
      fetch(`${API_URL}/plans`).then((r) => r.json()),
    ])
      .then(([v, p]) => {
        setVersion(v);
        setPlans(p);
      })
      .catch(() => setError('Failed to load backend'));
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h1>AAI Platform</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section style={{ marginTop: 16 }}>
        <h2>Backend</h2>
        {version ? (
          <pre style={{ background: '#f5f5f5', padding: 12, overflow: 'auto' }}>
            {JSON.stringify(version, null, 2)}
          </pre>
        ) : (
          !error && <p>Loading...</p>
        )}
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>Plans</h2>
        {plans.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Code</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Name</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Price</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Monthly generations</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.code}>
                  <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{p.code}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{p.name}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>
                    {(p.monthly_price_cents / 100).toFixed(2)} {p.currency}
                  </td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{p.monthly_generations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !error && <p>Loading plans...</p>
        )}
      </section>
    </div>
  );
}

export default App;