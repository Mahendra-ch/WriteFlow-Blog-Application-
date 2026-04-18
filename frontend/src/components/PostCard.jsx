import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';

const PostCard = ({ post }) => {
    return (
        <div className="card glass animate-fade-in">
            {post.image ? (
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            ) : (
                <div className="card-img-placeholder">
                    <h2>WF</h2>
                </div>
            )}
            <div className="card-content">
                <Link to={`/post/${post.id}`}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 'bold' }}>{post.title}</h3>
                </Link>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.content}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <User size={14} />
                        {post.author ? post.author.username : 'Unknown'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={14} />
                        {new Date(post.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
