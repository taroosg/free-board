import { useForm } from "react-hook-form";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js";
import { useEffect } from "react";

const CommentForm = ({ postId }) => {

  const { register, handleSubmit, setValue, getValues } = useForm({
    shouldUnregister: false,
  });

  const onSubmit = async (data) => {
    const result = await addDoc(collection(db, 'posts', postId, 'comments'), {
      ...data,
      timestamp: serverTimestamp(),
    });
    setValue("text", '');
    setValue("code", '');
  };

  useEffect(() => {
    if (localStorage.getItem("XMjhPUZLuTmJcc72")) {
      const json = JSON.parse(localStorage.getItem("XMjhPUZLuTmJcc72"));
      setValue("number", json.number);
      setValue("name", json.name);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <div className="mt-2">
            <input
              {...register("number", { required: true })}
              onChange={(e) => {
                localStorage.setItem("XMjhPUZLuTmJcc72", JSON.stringify({
                  number: e.target.value,
                  name: getValues("name"),
                }));
              }}
              type="number"
              name="number"
              id="number"
              autoComplete="number"
              placeholder="学籍番号"
              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <div className="mt-2">
            <input
              {...register("name", { required: true })}
              onChange={(e) => {
                localStorage.setItem("XMjhPUZLuTmJcc72", JSON.stringify({
                  number: getValues("number"),
                  name: e.target.value,
                }));
              }}
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              placeholder="氏名"
              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <div className="mt-2">
            <textarea
              {...register("text", { required: true })}
              id="text"
              name="text"
              rows="2"
              placeholder="本文"
              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
            </textarea>
          </div>
        </div>

        <div className="col-span-full">
          <div className="mt-2">
            <textarea
              {...register("code", { required: false })}
              id="code"
              name="code"
              rows="3"
              placeholder="必要に応じてここにコードを書きます"
              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
            </textarea>
          </div>
        </div>
        <button
          type="submit"
          className="w-[120px] rounded-md bg-indigo-600 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          コメントする
        </button>
      </div>
    </form>

  )
}

export default CommentForm;