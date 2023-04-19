import { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import PostForm from "./PostForm.jsx";

const Posts = ({ posts, setPosts, setNowPostId }) => {

  const [loading, setLoading] = useState(true);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (documentSnapshot) => {
      setPosts(documentSnapshot.docs.map((x) => ({ ...x.data(), id: x.id })));
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) {
    return <p
      className="m-4 text-gray-900 h-screen m-auto flex justify-center items-center text-center"
    >
      Loading now...
    </p>;
  }

  return (

    <div className="border-b border-gray-900/10 p-4 md:w-1/2 min-h-screen max-h-screen flex flex-col">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          講義用掲示板投稿フォーム
        </h2>
        <button
          type="button"
          onClick={() => setIsPostFormOpen(!isPostFormOpen)}
          className="rounded-md px-3 py-2 text-sm text-gray-900 shadow-sm border border-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {
            isPostFormOpen ? 'フォームを閉じる' : '投稿する'
          }
        </button>
        {isPostFormOpen && <PostForm />}
      </div>
      <div className="flex-1 overflow-auto">
        <h2 className="mt-4 text-base font-semibold leading-7 text-gray-900">
          投稿一覧
        </h2>
        <dl className="text-gray-900 divide-y divide-gray-200 overflow-auto">
          {posts.map((x, i) => (
            <div key={i} className="flex flex-col pb-3">
              <dt className="mb-1 p-2 text-gray-500 md:text-sm">
                {x.number} {x.name} {x.timestamp?.toDate().toLocaleString('en-US', { hour12: false })}
              </dt>
              <dd className="ml-2 mb-1 p-2 text-sm font-semibold">
                {x.text}
              </dd>
              {
                x.code
                  ? <dd className="ml-2 mb-1 p-2 text-sm bg-gray-100">
                    <pre>{x.code ?? ''}</pre>
                  </dd>
                  : ''
              }
              <dd className="ml-2 mb-1 text-sm">
                <button
                  type="button"
                  onClick={() => setNowPostId(x.id)}
                  className="rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  コメント
                </button>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
export default Posts;