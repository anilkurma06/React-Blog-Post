import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import styles from './BlogPostItem.module.css';

const BlogPostItem = ({ title, summary, date, url, content, comments: initialComments = [], isLoggedIn, userName }) => {
  const [comments, setComments] = useState(initialComments);
  const [expanded, setExpanded] = useState(false);
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleAddComment = (comment) => {
    setComments(prev => [...prev, comment]);
  };

  const handleExpand = () => setExpanded(true);
  const handleClose = (e) => {
    e.stopPropagation();
    setExpanded(false);
  };

  return (
    <div className={styles.blogPostItem}>
      {!expanded ? (
        <div className={styles.preview} onClick={handleExpand} tabIndex={0} role="button" aria-pressed="false">
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.summary}>{summary}</p>
          <p className={styles.date}>Published on {formattedDate}</p>
          <button className={styles.readMoreBtn} onClick={handleExpand} aria-label={`Read more about ${title}`}>Read More</button>
        </div>
      ) : (
        <div className={styles.expandedCard}>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close post">&times;</button>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.date}>Published on {formattedDate}</p>
          <div className={styles.fullContent}>{content || summary}</div>
          <section className={styles.commentsSection} aria-label="Comments">
            <h3>Comments</h3>
            <CommentList comments={comments} />
            <CommentForm
              onSubmit={handleAddComment}
              isLoggedIn={isLoggedIn}
              userName={userName}
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default BlogPostItem;
