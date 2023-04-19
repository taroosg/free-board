import { useState } from "react";
import Comments from "../components/Comments.jsx";
import Posts from "../components/Posts.jsx";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [nowPostId, setNowPostId] = useState('');

  return (
    <div className="min-h-screen max-h-screen flex">
      <Posts
        posts={posts}
        setPosts={setPosts}
        setNowPostId={setNowPostId}
      />
      {
        nowPostId !== ''
          ? <Comments postId={nowPostId} setNowPostId={setNowPostId} />
          : ''

      }
    </div>
  );
};
export default Main;