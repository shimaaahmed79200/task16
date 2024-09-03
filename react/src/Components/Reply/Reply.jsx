
import { useState } from 'react';
import useStore from '../useStore';

const Reply = ({ reply, postId, commentId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [replyText, setReplyText] = useState(reply.text);
  const [showConfirm, setShowConfirm] = useState(false);
  const [replyToDelete, setReplyToDelete] = useState(null);

  const editReply = useStore((state) => state.editReply);
  const deleteReply = useStore((state) => state.deleteReply);

  const handleSave = () => {
    if (replyText.trim()) {
      editReply(postId, commentId, reply.id, replyText);
      setIsEditing(false);
    }
  };

  const handleShowConfirm = () => setShowConfirm(true);
  const handleDeleteReply = () => {
    if (replyToDelete) {
      deleteReply(postId, commentId, replyToDelete);
      setReplyToDelete(null);
    }
    setShowConfirm(false);
  };

  return (
    <div className="Reply">
      <div className="btns-reply">
      {isEditing ? (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => { handleShowConfirm(); setReplyToDelete(reply.id); }} className='Delete'>Delete</button>
        </>
      )}
      </div>
      

      <div className="repiy-details">
      <img src={reply.userProfilePicture} alt="user profile" />
      <span>{reply.time}</span>
      {isEditing ? (
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
      ) : (
        <p><span className='span'>{reply.user}</span>{reply.text}</p>
      )}
      </div>
      

      
      {showConfirm && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete this reply?</p>
          <button onClick={handleDeleteReply}>Sure</button>
          <button onClick={() => setShowConfirm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Reply;