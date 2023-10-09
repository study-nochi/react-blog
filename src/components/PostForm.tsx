import AuthContext from "@/context/AuthContext";
import { getPost } from "@/firebase/api";
import { db } from "@/firebase/config";
import { Post } from "@/types/post.type";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

enum PostFormInput {
  TITLE = "title",
  SUMMARY = "summary",
  CONTENT = "content",
}

const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState<Post | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post) {
        const postRef = doc(db, "posts", post.id!);
        await updateDoc(postRef, {
          title,
          summary,
          content,
          updatedAt: new Date()?.toLocaleDateString(),
          uid: user?.uid,
        });
        toast.success("게시글을 수정하였습니다.");
        navigate(`/posts/${post.id}`);
        return;
      }

      await addDoc(collection(db, "posts"), {
        title,
        summary,
        content,
        createdAt: new Date()?.toLocaleDateString(),
        email: user?.email,
      });
      toast.success("게시글을 생성했습니다.");
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === PostFormInput.TITLE) {
      setTitle(value);
    }
    if (name === PostFormInput.SUMMARY) {
      setSummary(value);
    }
    if (name === PostFormInput.CONTENT) {
      setContent(value);
    }
  };

  useEffect(() => {
    if (params?.id) {
      getPost(params.id)
        .then((newPost) => {
          setPost(newPost);

          setTitle(newPost.title);
          setSummary(newPost.summary);
          setContent(newPost.content);
        })
        .catch((error: FirebaseError) => {
          toast.error(error.message);
        });
    }
  }, [params?.id]);

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__block">
        <label htmlFor={PostFormInput.TITLE}>제목</label>
        <input
          type="text"
          name={PostFormInput.TITLE}
          id={PostFormInput.TITLE}
          onChange={handleChange}
          value={title}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor={PostFormInput.SUMMARY}>요약</label>
        <input
          type="text"
          name={PostFormInput.SUMMARY}
          id={PostFormInput.SUMMARY}
          onChange={handleChange}
          value={summary}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor={PostFormInput.CONTENT}>내용</label>
        <textarea
          name={PostFormInput.CONTENT}
          id={PostFormInput.CONTENT}
          onChange={handleChange}
          value={content}
          required
        />
      </div>
      <div className="form__block">
        <input type="submit" value={post ? "수정" : "제출"} className="form__button--submit" />
      </div>
    </form>
  );
};

export default PostForm;
