
import  { useState } from 'react';
import useStore from '../useStore';

const NewPost = () => {
  const addPost = useStore((state) => state.addPost);
  const [newPostText, setNewPostText] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddPost = () => {
    if (newPostText) {
      addPost({
        id: Date.now(),
        userProfilePicture:'../../../public/assets/image-amyrobson.webp', // صورة بروفايل افتراضية
        time: 'Just now',
        text: newPostText,
        comments: []
      });
      setNewPostText('');
      setShowInput(false);
    }
  };

  return (
    <div className='NewPost-container'>
      <button onClick={() => setShowInput(!showInput)} className='newPost'>
        {showInput ? 'Cancel' : 'Add New Post'}
      </button>

      {showInput && (
        <div>
          <input
            type="text"
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
          />
          <button onClick={handleAddPost} className='add'>Add</button>
        </div>
      )}
    </div>
  );
};

export default NewPost;

    
