import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Image as ImageIcon } from 'lucide-react';
import api from '../api';

const CreateEditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            const fetchPost = async () => {
                const res = await api.get(`/blog/posts/${id}/`);
                setTitle(res.data.title);
                setContent(res.data.content);
                if (res.data.image) setPreview(res.data.image);
            };
            fetchPost();
        }
    }, [id, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (isEditMode) {
                await api.patch(`/blog/posts/${id}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/blog/posts/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Error saving post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container animate-fade-in" style={{ maxWidth: '800px', padding: '2rem 1rem' }}>
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '1rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
                    {isEditMode ? 'Edit Story' : 'Write a New Story'}
                </h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Title</label>
                        <input 
                            type="text" 
                            className="input-field" 
                            style={{ fontSize: '1.25rem', fontWeight: '500' }}
                            placeholder="Enter a captivating title..."
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label className="input-label">Content</label>
                        <textarea 
                            className="input-field" 
                            rows="12" 
                            placeholder="Write your story here..."
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label className="input-label">Cover Image (Optional)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <label className="btn btn-secondary" style={{ cursor: 'pointer', display: 'inline-flex' }}>
                                <ImageIcon size={20} />
                                {image ? 'Change Image' : 'Upload Image'}
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    style={{ display: 'none' }} 
                                    onChange={(e) => {
                                        setImage(e.target.files[0]);
                                        setPreview(URL.createObjectURL(e.target.files[0]));
                                    }} 
                                />
                            </label>
                            {preview && (
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Image selected</span>
                            )}
                        </div>
                        {preview && (
                            <img src={preview} alt="Preview" style={{ marginTop: '1rem', width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                        )}
                    </div>
                    
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            <Save size={20} /> {loading ? 'Saving...' : 'Publish'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEditPost;
