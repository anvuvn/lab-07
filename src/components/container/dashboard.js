import { useEffect, useState } from 'react';
import './dashboard.css';
import Posts from '../posts/posts';
import PostDetails from '../postDetails/postDetails';
import { getAll } from '../services/post.service';

const Dashboard = (props) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const [currentTitle, setCurrentTitle] = useState('');
  const [posts, setPosts] = useState([]);

  const itemClickHandler = (post) => {
    setSelectedPost(post);
    console.log(post);
  };
  const updateTitle = () => {
    selectedPost.title = currentTitle;
    setSelectedPost({ ...selectedPost });
  };

  useEffect(() => {
    getAll().then((res) => {
      setPosts(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedPost) setCurrentTitle(selectedPost.title);
  }, [selectedPost]);

  return (
    <div>
      <div className="Container">
        <Posts posts={posts} handleSelectItem={itemClickHandler} />
      </div>

      <div className="row">
        <input
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
        />
        <button onClick={updateTitle}>Change</button>
      </div>

      <div>{selectedPost ? <PostDetails post={selectedPost} /> : ''}</div>
    </div>
  );
};

export default Dashboard;
