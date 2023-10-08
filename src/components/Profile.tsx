import AuthContext from "@/context/AuthContext";
import { getFirebaseAuth } from "@/firebase/config";
import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const handleClickSignOut = async () => {
  const auth = getFirebaseAuth();

  try {
    await signOut(auth);
    toast.success("로그아웃 되었습니다.");
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(error.message);
    }
  }
};

const Profile: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image" />
        <div>
          <div className="profile__email">{user?.email}</div>
          <div className="profile__name">{user?.displayName || "사용자"}</div>
        </div>
      </div>
      <div
        role="presentation"
        className="profile__logout"
        onClick={handleClickSignOut}
      >
        로그아웃
      </div>
    </div>
  );
};

export default Profile;
