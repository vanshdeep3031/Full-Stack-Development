import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5001/api/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', padding: 24 }}>
      {/* Nav */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        maxWidth: 900, margin: '0 auto 32px',
        borderBottom: '1px solid #1E293B', paddingBottom: 16,
      }}>
        <span style={{ fontFamily: '"Space Mono", monospace', color: '#38BDF8', fontWeight: 700, fontSize: 16 }}>
          🔐 Protected Dashboard
        </span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ color: '#64748B', fontSize: 13 }}>{user?.email}</span>
          <button onClick={() => navigate('/profile')} style={navBtn}>Profile</button>
          <button onClick={handleLogout} style={{ ...navBtn, background: '#450A0A', borderColor: '#7F1D1D', color: '#FCA5A5' }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* JWT badge */}
        <div style={{
          background: '#022C22', border: '1px solid #064E3B',
          borderRadius: 10, padding: '12px 16px', marginBottom: 24,
          fontSize: 12, color: '#6EE7B7', fontFamily: '"Space Mono", monospace',
        }}>
          ✅ JWT VERIFIED — Token stored in localStorage · Server-validated via /api/verify
        </div>

        {loading ? (
          <div style={{ color: '#64748B', textAlign: 'center', padding: 40 }}>Loading data…</div>
        ) : (
          <>
            <h2 style={{ color: '#E2E8F0', marginBottom: 8, fontFamily: '"Space Mono", monospace' }}>
              {data?.message}
            </h2>
            <p style={{ color: '#64748B', fontSize: 13, marginBottom: 24 }}>
              Last refreshed: {new Date(data?.data?.timestamp).toLocaleString()}
            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {data?.data?.stats.map((s) => (
                <div key={s.label} style={{
                  background: '#111827', border: '1px solid #1F2937',
                  borderRadius: 12, padding: '24px 20px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 40, fontWeight: 700, color: '#38BDF8', fontFamily: '"Space Mono"' }}>
                    {s.value}
                  </div>
                  <div style={{ color: '#64748B', fontSize: 13, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Token preview */}
            <div style={{
              background: '#0F172A', border: '1px solid #1E293B',
              borderRadius: 10, padding: '16px', marginTop: 24,
            }}>
              <div style={{ color: '#64748B', fontSize: 11, marginBottom: 8 }}>JWT PAYLOAD (decoded)</div>
              <pre style={{ color: '#A5B4FC', fontSize: 11, overflow: 'auto' }}>
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const navBtn = {
  background: '#1E293B', border: '1px solid #334155',
  borderRadius: 6, padding: '6px 14px', color: '#94A3B8',
  cursor: 'pointer', fontSize: 13, fontFamily: 'inherit',
};
