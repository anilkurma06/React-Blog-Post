import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogPostItem.module.css';

const BlogPostItem = ({ id, title, summary, date, url, onDelete }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={styles.blogPostItem}>
      <Link to={url} className={styles.title}>
        <h2>{title}</h2>
      </Link>
      <p className={styles.summary}>{summary}</p>
      <p className={styles.date}>Published on {formattedDate}</p>
      {onDelete && (
        <button
          onClick={() => onDelete(id)}
          style={{
            marginTop: 12,
            background: '#ff0000',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '6px 18px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default BlogPostItem;
