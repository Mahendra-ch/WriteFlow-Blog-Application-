import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Edit2, Trash2, ArrowLeft, Clock, User } from 'lucide-react';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await api.get(`/blog/posts/${id}/`);
                setPost(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await api.delete(`/blog/posts/${id}/`);
                navigate('/');
            } catch (error) {
                console.error("Failed to delete", error);
            }
        }
    };

    if (loading) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading post...</div>;
    if (!post) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Post not found</div>;

    const isAuthor = user && post.author && user.id === post.author.id;

    return (
        <div className="container animate-fade-in" style={{ maxWidth: '800px', padding: '2rem 1rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                <ArrowLeft size={16} /> Back to Home
            </Link>
            
            <div className="glass" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                {post.image && (
                    <img src={post.image} alt={post.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
                )}
                
                <div style={{ padding: '2.5rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.2' }}>{post.title}</h1>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User size={18} className="text-primary" />
                                {post.author ? post.author.username : 'Unknown'}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={18} className="text-primary" />
                                {new Date(post.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        
                        {isAuthor && (
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <Link to={`/post/edit/${post.id}`} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                                    <Edit2 size={16} /> Edit
                                </Link>
                                <button onClick={handleDelete} className="btn btn-danger" style={{ padding: '0.5rem 1rem' }}>
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <div style={{ fontSize: '1.125rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                        {post.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
