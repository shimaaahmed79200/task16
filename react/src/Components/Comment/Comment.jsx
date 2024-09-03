import { useState } from 'react';
import Reply from '../Reply/Reply';
import useStore from '../useStore';

const Comment = ({ comment, postId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState(comment.text);
  const [showConfirm, setShowConfirm] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [newReplyText, setNewReplyText] = useState('');
  const incrementLikesComments = useStore((state) => state.incrementLikesComments);
  const decrementLikesComments = useStore((state) => state.decrementLikesComments);

  const editComment = useStore((state) => state.editComment);
  const deleteComment = useStore((state) => state.deleteComment);
  const addReply = useStore((state) => state.replyComment);

  const handleIncrementComments = () => incrementLikesComments(comment.id);
  const handleDecrementComments = () => decrementLikesComments(comment.id);

  const handleSave = () => {
    if (commentText.trim()) {
      editComment(postId, comment.id, commentText);
      setIsEditing(false);
    }
  };

  const handleShowConfirm = () => setShowConfirm(true);
  const handleDeleteComment = () => {
    if (commentToDelete) {
      deleteComment(postId, commentToDelete);
      setCommentToDelete(null);
    }
    setShowConfirm(false);
  };

  

  const handleAddReply = () => {
    if (newReplyText.trim()) {
      addReply(postId, comment.id, {
        id: Date.now(),
        text: newReplyText,
        userProfilePicture: '../../../public/assets/image-juliusomo.webp'
      });
      setNewReplyText('');
      setShowReplyInput(false);
    }
  };

  return (
    <div className="comment">
      <div className="btns-reply">
      <button onClick={() => setShowReplyInput(!showReplyInput)} className='Repo'>
        {showReplyInput ? 'Cancel Reply' : 'Reply'}
      </button>
      {isEditing ? (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => { handleShowConfirm(); setCommentToDelete(comment.id); }} className='Delete'>Delete</button>
        </>
      )}
      </div>
  
      <div className="wrapper">
      <div className="comment-container">
      <div className="count-container">
        <button onClick={handleDecrementComments}>-</button>
        <label>{comment.Likes || 0}</label>
        <button onClick={handleIncrementComments}>+</button>
      </div>
      
      <div className="comment-details">
        
      
      <img src={comment.userProfilePicture} alt="user profile" />
      <span>{comment.time}</span>
      
      {isEditing ? (
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      ) : (
        <p><span className='span'>{comment.user}</span>{comment.text}</p>
      )}
        
      

      

      

      

      
      </div>
      
      </div>
      {showConfirm && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete this comment?</p>
          <button onClick={handleDeleteComment}>Sure</button>
          <button onClick={() => setShowConfirm(false)}>Cancel</button>
        </div>
      )}

{showReplyInput && (
        <div>
          <input
            type="text"
            value={newReplyText}
            onChange={(e) => setNewReplyText(e.target.value)}
            placeholder="Add a reply..."
          />
          <button onClick={handleAddReply}>Add Reply</button>
        </div>
      )}

      {/* Ensure replies is always an array */}
      <div className="replies">
        {(comment.replies || []).map(reply => (
          <Reply key={reply.id} reply={reply} postId={postId} commentId={comment.id} />
        ))}
      </div>

      

      
    </div>
    </div>
    
  );
};

export default Comment;