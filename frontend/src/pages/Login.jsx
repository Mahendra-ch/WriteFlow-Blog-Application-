import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError('Invalid credentials or network error.');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
            <div className="auth-form-container glass animate-fade-in" style={{ width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Welcome Back</h2>
                {error && <div style={{ background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid #fecaca' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Username</label>
                        <input type="text" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="input-group" style={{ marginBottom: '2rem' }}>
                        <label className="input-label">Password</label>
                        <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign In</button>
                </form>
                <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link to="/register" className="text-primary" style={{ fontWeight: '500' }}>Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
