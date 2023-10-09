import { Timestamp } from "firebase/firestore";

export interface PostProps {
  id?: string;
  uid: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface PostData {
  id?: string;
  uid: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
