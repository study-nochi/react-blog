import { EMAIL_REGEX } from "@/constants/vaildation";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormError from "./FormError";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "@/firebase/config";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";

enum LoginInputType {
  EMAIL = "email",
  PASSWORD = "password",
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === LoginInputType.EMAIL) {
      setEmail(value);
      if (!value?.match(EMAIL_REGEX)) {
        return setError("이메일 형식이 올바르지 않습니다.");
      }
    }
    if (name === LoginInputType.PASSWORD) {
      setPassword(value);
      if (value?.length < 8) {
        return setError("비밀번호는 8자리 이상으로 입력해주세요");
      }
    }

    return setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("로그인에 성공하였습니다.");
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form form--lg">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor={LoginInputType.EMAIL}>이메일</label>
        <input
          type="text"
          name={LoginInputType.EMAIL}
          id={LoginInputType.EMAIL}
          onChange={handleChange}
          value={email}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor={LoginInputType.PASSWORD}>비밀번호</label>
        <input
          type="password"
          name={LoginInputType.PASSWORD}
          id={LoginInputType.PASSWORD}
          onChange={handleChange}
          value={password}
          required
        />
      </div>
      <FormError error={error} />
      <div className="form__block">
        계정이 없으신가요?
        <Link to="/sign-up" className="form__link">
          회원가입하기
        </Link>
      </div>
      <div className="form__block">
        <input type="submit" value="로그인" className="form__button--submit" />
      </div>
    </form>
  );
};

export default LoginForm;
