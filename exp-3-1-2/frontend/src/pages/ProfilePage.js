import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/api/profile', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => setProfile(r.data)).catch(() => {});
  }, [token]);

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', padding: 24 }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <button onClick={() => navigate('/dashboard')} style={{
          background: 'none', border: 'none', color: '#38BDF8',
          cursor: 'pointer', fontSize: 14, marginBottom: 24, fontFamily: 'inherit',
        }}>
          ← Back to Dashboard
        </button>
        <div style={{
          background: '#111827', border: '1px solid #1F2937',
          borderRadius: 16, padding: 32,
        }}>
          <h2 style={{ color: '#E2E8F0', fontFamily: '"Space Mono", monospace', marginBottom: 24 }}>
            🔒 Protected Profile
          </h2>
          {profile ? (
            <>
              <Row label="Name"       value={profile.user?.name} />
              <Row label="Email"      value={profile.user?.email} />
              <Row label="User ID"    value={profile.user?.id} />
              <Row label="Join Date"  value={profile.joinDate} />
              <Row label="Last Login" value={new Date(profile.lastLogin).toLocaleString()} />
            </>
          ) : (
            <div style={{ color: '#64748B' }}>Loading…</div>
          )}
          <button onClick={() => { logout(); navigate('/login'); }} style={{
            marginTop: 24, background: '#450A0A', border: '1px solid #7F1D1D',
            borderRadius: 8, padding: '10px 20px', color: '#FCA5A5',
            cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
          }}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
      <span style={{ color: '#64748B', fontSize: 12, width: 90, flexShrink: 0, paddingTop: 2 }}>{label}</span>
      <span style={{ color: '#E2E8F0', fontSize: 14 }}>{value}</span>
    </div>
  );
}
