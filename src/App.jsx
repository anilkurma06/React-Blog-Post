import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostForm from '../components/BlogPostForm';

const initialPosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: 'Learn the basics of React and build your first application.',
    summary: 'Learn the basics of React and build your first application.',
    author: 'John Doe',
    date: '2023-01-01',
    url: '/posts/1',
  },
  {
    id: '2',
    title: 'CSS Grid vs. Flexbox',
    content: 'A comparison of two powerful layout systems in CSS.',
    summary: 'A comparison of two powerful layout systems in CSS.',
    author: 'Jane Smith',
    date: '2023-02-15',
    url: '/posts/2',
  },
  {
    id: '3',
    title: 'Accessibility in Web Development',
    content: 'Tips for making your web applications more accessible.',
    summary: 'Tips for making your web applications more accessible.',
    author: 'Alex Lee',
    date: '2023-03-10',
    url: '/posts/3',
  },
];

function BlogPostView({ posts, onEdit, onDelete }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);
  const navigate = useNavigate();
  if (!post) return <p>Post not found.</p>;
  return (
    <div style={{ maxWidth: 800, margin: '40px auto', background: '#fff', padding: 32, borderRadius: 8 }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 24,
          background: '#f0f0f0',
          color: '#333',
          border: '1px solid #ccc',
          borderRadius: 4,
          padding: '8px 18px',
          fontSize: 16,
          cursor: 'pointer',
        }}
      >
        ← Back
      </button>
      <h2>{post.title}</h2>
      <p style={{ color: '#999', fontSize: 14 }}>By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
      <div style={{ margin: '24px 0', fontSize: 16 }}>{post.content}</div>
      <button onClick={() => onEdit(post.id)} style={{ marginRight: 16 }}>Edit</button>
      <button onClick={() => { onDelete(post.id); navigate('/'); }} style={{ color: '#fff', background: '#ff0000', border: 'none', borderRadius: 4, padding: '8px 18px', cursor: 'pointer' }}>Delete</button>
    </div>
  );
}

function App() {
  const [posts, setPosts] = React.useState(initialPosts);
  const [editingPost, setEditingPost] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    const post = posts.find((p) => p.id === id);
    setEditingPost(post);
    setShowForm(true);
    navigate(`/edit/${id}`);
  };

  const handleFormSubmit = (formData) => {
    if (editingPost) {
      setPosts((prev) => prev.map((p) => (p.id === editingPost.id ? { ...p, ...formData, summary: formData.content.slice(0, 60) + '...' } : p)));
      setShowForm(false);
      setEditingPost(null);
      navigate('/');
    } else {
      const newId = (posts.length + 1).toString();
      setPosts((prev) => [
        ...prev,
        {
          ...formData,
          id: newId,
          summary: formData.content.slice(0, 60) + '...',
          url: `/posts/${newId}`,
        },
      ]);
      setShowForm(false);
      setEditingPost(null);
      navigate('/');
    }
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setShowForm(false);
    setEditingPost(null);
  };

  return (
    <>
      <h1>Blog Posts</h1>
      <button
        onClick={() => {
          setEditingPost(null);
          setShowForm(true);
          navigate('/new');
        }}
        style={{
          marginBottom: 24,
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          padding: '10px 28px',
          fontSize: 16,
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseOver={e => (e.target.style.background = '#0056b3')}
        onMouseOut={e => (e.target.style.background = '#007bff')}
      >
        New Post
      </button>
      <Routes>
        <Route path="/" element={<BlogPostList posts={posts} />} />
        <Route path="/posts/:id" element={<BlogPostView posts={posts} onEdit={handleEdit} onDelete={handleDelete} />} />
        <Route path="/edit/:id" element={<BlogPostForm post={editingPost} onSubmit={handleFormSubmit} />} />
        <Route path="/new" element={<BlogPostForm onSubmit={handleFormSubmit} />} />
      </Routes>
    </>
  );
}

export default App;
