
import useStore from './Components/useStore';
import Post from './Components/Post/Post';
import NewPost from './Components/NewPost/NewPost';
import './App.css'

const App = () => {
  const posts = useStore((state) => state.posts);

  return (
    <div className="App">
      
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
      <NewPost />
    </div>
  );
};

export default App;







