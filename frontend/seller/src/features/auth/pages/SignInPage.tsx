import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { SignInForm } from "../components/SignInForm";

export default function SignInPage() {
  return (
    <AuthLayout
      title="Sign In"
      footer={
        <>
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="font-bold text-brand-500 underline hover:text-brand-600"
          >
            Sign Up
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthLayout>
  );
}
