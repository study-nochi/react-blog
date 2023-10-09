import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./config";
import { Post } from "@/types/post.type";

export const getPostList = async () => {
  const col = collection(db, "posts");
  const datas = await getDocs(col);

  const newPosts: Post[] = [];
  datas?.forEach((doc) => {
    const newPost: Post = { ...(doc.data() as Post), id: doc.id };
    newPosts.push(newPost);
  });
  return newPosts;
};

export const getPost = async (id: string) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  const newPost = {
    id: docSnap.id,
    ...(docSnap.data() as Post),
  };

  return newPost;
};
