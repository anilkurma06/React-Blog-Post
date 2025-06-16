import BlogPostItem from './BlogPostItem';
import styles from './BlogPostList.module.css';

const BlogPostList = ({ posts, onDelete }) => {
  if (!posts || posts.length === 0) {
    return <p className={styles.empty}>No blog posts available.</p>;
  }

  return (
    <div className={styles.blogPostList}>
      {posts.map(post => (
        <BlogPostItem
          key={post.id}
          id={post.id}
          title={post.title}
          summary={post.summary}
          date={post.date}
          url={post.url}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BlogPostList;
