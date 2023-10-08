import { EMAIL_REGEX } from "@/constants/vaildation";
import { getFirebaseAuth } from "@/firebase/config";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormError from "./FormError";

enum SignUpInputType {
  EMAIL = "email",
  PASSWORD = "password",
  PASSWORD_CONFIRM = "password-confirm",
}

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === SignUpInputType.EMAIL) {
      setEmail(value);
      if (!value?.match(EMAIL_REGEX)) {
        return setError("이메일 형식이 올바르지 않습니다.");
      }
    }
    if (name === SignUpInputType.PASSWORD) {
      setPassword(value);
      if (value?.length < 8) {
        return setError("비밀번호는 8자리 이상으로 입력해주세요");
      }
      if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        return setError(
          "비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요."
        );
      }
    }
    if (name === SignUpInputType.PASSWORD_CONFIRM) {
      setPasswordConfirm(value);

      if (value?.length < 8) {
        return setError("비밀번호는 8자리 이상으로 입력해주세요");
      }
      if (value !== password) {
        return setError(
          "비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요."
        );
      }
    }

    return setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getFirebaseAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("회원가입에 성공하였습니다.");
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form form--lg">
      <h1 className="form__title">회원가입</h1>
      <div className="form__block">
        <label htmlFor={SignUpInputType.EMAIL}>이메일</label>
        <input
          type="text"
          name={SignUpInputType.EMAIL}
          id={SignUpInputType.EMAIL}
          onChange={handleChange}
          value={email}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor={SignUpInputType.PASSWORD}>비밀번호</label>
        <input
          type="password"
          name={SignUpInputType.PASSWORD}
          id={SignUpInputType.PASSWORD}
          onChange={handleChange}
          value={password}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor={SignUpInputType.PASSWORD_CONFIRM}>비밀번호 확인</label>
        <input
          type="password"
          name={SignUpInputType.PASSWORD_CONFIRM}
          id={SignUpInputType.PASSWORD_CONFIRM}
          onChange={handleChange}
          value={passwordConfirm}
          required
        />
      </div>
      <FormError error={error} />
      <div className="form__block">
        계정이 이미 있으신가요?
        <Link to="/sign-up" className="form__link">
          로그인하기
        </Link>
      </div>
      <div className="form__block">
        <input
          type="submit"
          value="회원가입"
          className="form__button--submit"
          disabled={error.length > 0}
        />
      </div>
    </form>
  );
};

export default SignUpForm;
