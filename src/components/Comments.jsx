import { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore";
import CommentForm from "./CommentForm.jsx";

const Comments = ({ postId, setNowPostId }) => {

  const [loading, setLoading] = useState(true);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [post, setPost] = useState(null);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, "posts", postId);
    getDoc(docRef).then((documentSnapshot) => {
      setPost({ ...documentSnapshot.data(), id: documentSnapshot.id });
    });

    const q = query(collection(db, 'posts', postId, 'comments'), orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (documentSnapshot) => {
      setComments(documentSnapshot.docs.map((x) => ({ ...x.data(), id: x.id })));
      setLoading(false);
    });
    return unsub;
  }, [postId]);

  if (loading) {
    return <p
      className="m-4 text-gray-900 h-screen m-auto flex justify-center items-center text-center"
    >
      Loading now...
    </p>;
  }

  return (
    <div className="border-b border-gray-900/10 p-4 md:w-1/2 min-h-screen max-h-screen flex flex-col">
      <div className="mb-2">
        <div
          className="flex justify-between"
        >
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            コメントフォーム
          </h2>
          <p
            onClick={() => setNowPostId('')}
            className="cursor-pointer text-gray-500 hover:text-gray-900"
          >✗
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsCommentFormOpen(!isCommentFormOpen)}
          className="rounded-md px-3 py-2 text-sm text-gray-900 shadow-sm border border-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {
            isCommentFormOpen ? 'フォームを閉じる' : '投稿する'
          }
        </button>
        {isCommentFormOpen && <CommentForm postId={postId} />}
      </div>

      <div className="flex-1 overflow-auto">
        <h2 className="mt-2 text-base font-semibold leading-7 text-gray-900">
          コメント一覧
        </h2>

        <dl className="text-gray-900 divide-y divide-gray-200 overflow-auto">
          <div className="flex flex-col pb-3 p-2">
            <dt className="mb-1 text-gray-500 md:text-sm">
              {post.number} {post.name} {post.timestamp?.toDate().toLocaleString('en-US', { hour12: false })}
            </dt>
            <dd className="ml-2 mb-1 p-2 text-sm font-semibold">
              {post.text}
            </dd>
            {
              post.code
                ? <dd className="ml-4 mb-1 p-2 text-sm bg-gray-100">
                  <pre>{post.code ?? ''}</pre>
                </dd>
                : ''
            }
          </div>

          {comments.map((x, i) => (
            <div key={i} className="flex flex-col pb-3 p-2">
              <dt className="mb-1 p-2 text-gray-500 md:text-sm">
                {x.number} {x.name} {x.timestamp?.toDate().toLocaleString('en-US', { hour12: false })}
              </dt>
              <dd className="ml-2 mb-1 p-2 text-sm font-semibold">
                {x.text}
              </dd>
              {
                x.code
                  ? <dd className="ml-4 mb-1 p-2 text-sm bg-gray-100">
                    <pre>{x.code ?? ''}</pre>
                  </dd>
                  : ''
              }
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default Comments;