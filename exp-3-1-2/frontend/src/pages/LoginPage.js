import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const S = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0B0F1A 0%, #0F172A 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
  },
  card: {
    background: '#111827',
    border: '1px solid #1F2937',
    borderRadius: 16,
    padding: '40px 36px',
    width: '100%', maxWidth: 420,
    boxShadow: '0 32px 80px #00000066',
  },
  label: { fontSize: 13, fontWeight: 500, color: '#94A3B8', marginBottom: 6, display: 'block' },
  input: {
    width: '100%', background: '#0F172A', border: '1px solid #1E293B',
    borderRadius: 8, padding: '11px 14px', color: '#E2E8F0',
    fontSize: 14, outline: 'none', fontFamily: 'inherit',
    transition: 'border-color .2s',
  },
  btn: {
    width: '100%', background: 'linear-gradient(90deg,#0EA5E9,#6366F1)',
    color: '#fff', border: 'none', borderRadius: 8,
    padding: '13px 0', fontWeight: 600, fontSize: 15,
    cursor: 'pointer', marginTop: 8, fontFamily: 'inherit',
    transition: 'opacity .2s',
  },
  error: {
    background: '#450A0A', border: '1px solid #7F1D1D',
    borderRadius: 8, padding: '10px 14px', color: '#FCA5A5',
    fontSize: 13, marginBottom: 16,
  },
  hint: {
    background: '#0C1A2E', border: '1px solid #1E3A5F',
    borderRadius: 8, padding: '10px 14px', color: '#7DD3FC',
    fontSize: 12, marginTop: 16,
  },
};

export default function LoginPage() {
  const { login }    = useAuth();
  const navigate     = useNavigate();
  const location     = useLocation();
  const from         = location.state?.from?.pathname || '/dashboard';

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            fontSize: 28, marginBottom: 8,
            fontFamily: '"Space Mono", monospace', color: '#38BDF8', fontWeight: 700,
          }}>
            🔐 EXP 3.1.2
          </div>
          <div style={{ color: '#64748B', fontSize: 13 }}>Protected Routes · JWT Auth</div>
        </div>

        {error && <div style={S.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Email</label>
            <input
              style={S.input} type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="alice@lab.com"
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={S.label}>Password</label>
            <input
              style={S.input} type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button style={{ ...S.btn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Verifying...' : 'Sign In & Get JWT'}
          </button>
        </form>

        <div style={S.hint}>
          <strong>Demo users:</strong><br />
          alice@lab.com / Alice@123<br />
          bob@lab.com / Bob@123
        </div>
      </div>
    </div>
  );
}
