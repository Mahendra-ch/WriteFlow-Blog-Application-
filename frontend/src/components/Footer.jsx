import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ color: 'var(--text-muted)' }}>
                    &copy; {new Date().getFullYear()} WriteFlow Blogging System.
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)' }}>
                        Made with <Heart size={16} className="text-primary" /> by a Fresher
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
