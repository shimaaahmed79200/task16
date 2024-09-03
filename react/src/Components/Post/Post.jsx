import  { useState } from 'react';
import Comment from '../Comment/Comment';
import useStore from '../useStore';

const Post = ({ post }) => {
  const [newComment, setNewComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  
  const incrementLikes = useStore((state) => state.incrementLikes);
  const decrementLikes = useStore((state) => state.decrementLikes);
  const deletePost = useStore((state) => state.deletePost);
  const addComment = useStore((state) => state.addComment);

  const handleIncrement = () => incrementLikes(post.id);
  const handleDecrement = () => decrementLikes(post.id);
  
  const handleShowConfirm = () => setShowConfirm(true);
  const handleDeletePost = () => {
    if (postToDelete) {
      deletePost(postToDelete);
      setPostToDelete(null);
    }
    setShowConfirm(false);
  };
  const handleCancel = () => {
    setPostToDelete(null);
    setShowConfirm(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(post.id, {
        id: Date.now(),
        text: newComment,
        userProfilePicture: '../../../public/assets/image-maxblagun.webp' 
      });
      setNewComment('');
      setShowCommentInput(false);
    }
  };

  return (
    <div className="container">
      <div className="post">
      <div className="count-container">
        <button onClick={handleDecrement}>-</button>
        <label>{post.Likes || 0}</label>
        <button onClick={handleIncrement}>+</button>
      </div>
      
      <div className="pepo">
      <div className="btns">
      <button className='Delete' onClick={() => { handleShowConfirm(); setPostToDelete(post.id); }}>Delete</button>
      
      <button className='reply' onClick={() => setShowCommentInput(!showCommentInput)}>
        {showCommentInput ? 'Cancel' : 'Reply'}
      </button>
      

      </div>
      {showConfirm && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete this post?</p>
          <button onClick={handleDeletePost}>Confirm</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
      <div className="post-details">
      <img src={post.userProfilePicture} alt="user profile" />
      <span>{post.time}</span>
      <div className="post-content">
        <p>{post.text}</p>
      </div>
      </div>
      

      </div>
      
      {/* Likes Display and Buttons */}
      

      

      {/* Confirmation Dialog */}
      
      {/* Add Comment Section */}
      
      
    </div>
    {showCommentInput && (
        <div>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleAddComment}>Reply</button>
        </div>
      )}
      
      

      <div className="comments">
        {post.comments.map(comment => (
          <Comment key={comment.id} comment={comment} postId={post.id} />
        ))}
      </div>
    </div>
    
  );
};

export default Post;