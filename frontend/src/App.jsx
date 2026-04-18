import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetail from './pages/PostDetail';
import CreateEditPost from './pages/CreateEditPost';

const PrivateRoute = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext);
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/post/:id" element={<PostDetail />} />
                        <Route 
                            path="/post/create" 
                            element={
                                <PrivateRoute>
                                    <CreateEditPost />
                                </PrivateRoute>
                            } 
                        />
                        <Route 
                            path="/post/edit/:id" 
                            element={
                                <PrivateRoute>
                                    <CreateEditPost />
                                </PrivateRoute>
                            } 
                        />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
