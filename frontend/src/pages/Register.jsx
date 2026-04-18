import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '', email: '', first_name: '', last_name: '', password: '', password_confirm: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/accounts/register/', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data ? JSON.stringify(err.response.data) : 'Registration failed');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '2rem 0' }}>
            <div className="auth-form-container glass animate-fade-in" style={{ width: '100%', maxWidth: '500px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Join WriteFlow</h2>
                {error && <div style={{ background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid #fecaca' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">First Name</label>
                            <input type="text" name="first_name" className="input-field" onChange={handleChange} required />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Last Name</label>
                            <input type="text" name="last_name" className="input-field" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Username</label>
                        <input type="text" name="username" className="input-field" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Email</label>
                        <input type="email" name="email" className="input-field" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input type="password" name="password" className="input-field" onChange={handleChange} required />
                    </div>
                    <div className="input-group" style={{ marginBottom: '2rem' }}>
                        <label className="input-label">Confirm Password</label>
                        <input type="password" name="password_confirm" className="input-field" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Account</button>
                </form>
                <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" className="text-primary" style={{ fontWeight: '500' }}>Sign in instead</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
