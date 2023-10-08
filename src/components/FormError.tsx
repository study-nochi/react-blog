import React from "react";

interface FormErrorProps {
  error?: string;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (error && error?.length > 0) {
    return (
      <div className="form__block">
        <div className="form__error">{error}</div>
      </div>
    );
  }

  return null;
};

export default FormError;
