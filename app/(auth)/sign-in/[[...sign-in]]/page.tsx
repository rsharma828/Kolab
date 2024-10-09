import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <div>
      <main className="auth-page">
        <SignIn />
      </main>
    </div>
  );
};

export default SignInPage;
