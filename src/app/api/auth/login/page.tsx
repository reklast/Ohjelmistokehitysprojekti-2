import { LoginForm } from "@src/components/common/LoginForm";

export default async function Login() {
  return (
    <div className="w-full h-screen flex justify-center items-center sm:min-w-80 bg-login-bg bg-repeat">
      <div className="p-8  2xl:w-1/5 flex flex-col justify-center rounded-xl bg-dark text-white">
        <h1 className="mt-0 text-center text-xl">Placeholder</h1>
        <LoginForm />
      </div>
    </div>
  );
}
