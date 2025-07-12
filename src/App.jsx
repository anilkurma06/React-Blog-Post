import React from 'react';
import SearchBar from './components/SearchBar';
import { Routes, Route } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostForm from '../components/BlogPostForm';
import Layout from './components/Layout';

const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    summary: 'Learn the basics of React and build your first application.',
    date: '2023-01-01',
    url: '/posts/1',
  },
  {
    id: '2',
    title: 'CSS Grid vs. Flexbox',
    summary: 'A comparison of two powerful layout systems in CSS.',
    date: '2023-02-15',
    url: '/posts/2',
  },
  {
    id: '3',
    title: 'Accessibility in Web Development',
    summary: 'Tips for making your web applications more accessible.',
    date: '2023-03-10',
    url: '/posts/3',
  },
];

function App() {
  const [posts, setPosts] = React.useState(samplePosts);
  const [search, setSearch] = React.useState("");
  const [editingPost, setEditingPost] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);

  const handleCreate = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    const post = posts.find((p) => p.id === id);
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setShowForm(false);
    setEditingPost(null);
  };

  const handleFormSubmit = (formData) => {
    if (editingPost) {
      setPosts((prev) => prev.map((p) => (p.id === editingPost.id ? { ...p, ...formData } : p)));
    } else {
      setPosts((prev) => [
        ...prev,
        {
          ...formData,
          id: (prev.length + 1).toString(),
          summary: formData.content.slice(0, 60) + '...',
          url: `/posts/${prev.length + 1}`,
        },
      ]);
    }
    setShowForm(false);
    setEditingPost(null);
  };

  return (
    <Layout>
      <h1>Blog Posts</h1>
      <button onClick={handleCreate} style={{ marginBottom: 24 }}>New Post</button>
      <SearchBar
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {showForm && (
        <BlogPostForm post={editingPost} onSubmit={handleFormSubmit} />
      )}
      <BlogPostList
        posts={posts.filter(
          post =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.summary.toLowerCase().includes(search.toLowerCase())
        )}
        onDelete={handleDelete}
      />
      <Routes>
        <Route path="/posts/:id" element={<p>Post Content Placeholder</p>} />
      </Routes>
    </Layout>
  );
}

export default App;
