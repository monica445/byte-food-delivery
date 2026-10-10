import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { SignUpForm } from "../components/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create Account"
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="font-bold text-brand-500 underline hover:text-brand-600"
          >
            Sign In
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthLayout>
  );
}
