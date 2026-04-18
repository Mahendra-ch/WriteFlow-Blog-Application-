import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import api from '../api';
import PostCard from '../components/PostCard';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchPosts = async (query = '') => {
        try {
            setLoading(true);
            const res = await api.get(`/blog/posts/?search=${query}`);
            setPosts(res.data.results || res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPosts(search);
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(to right, var(--primary-color), #ec4899)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                    Discover Amazing Stories
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                    Read, write, and share your perspective with the world. Join our thriving community of writers.
                </p>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', background: 'var(--card-bg)', padding: '0.5rem', borderRadius: '1rem', boxShadow: 'var(--shadow-sm)' }} className="glass">
                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Search articles by title or content..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ border: 'none', background: 'transparent' }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ borderRadius: '0.75rem' }}>
                        <Search size={20} />
                    </button>
                </form>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading stories...</div>
            ) : posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No posts found. Start writing!</div>
            ) : (
                <div className="grid-cols-3">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
