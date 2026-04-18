import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, PenSquare, LogIn, UserPlus } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header glass">
            <div className="container">
                <Link to="/" className="brand">
                    <BookOpen size={28} className="text-primary" />
                    WriteFlow
                </Link>
                
                <nav className="nav-links">
                    {user ? (
                        <>
                            <Link to="/post/create" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                                <PenSquare size={18} />
                                Write
                            </Link>
                            <button onClick={handleLogout} className="nav-link" style={{ background:'none', border:'none', cursor:'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <LogOut size={18} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <LogIn size={18} />
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                                <UserPlus size={18} />
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
