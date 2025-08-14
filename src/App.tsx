import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import axiosInstance from "./lib/axios-instance";
export default function App() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      const data = res.data;
      localStorage.setItem("token", data.token);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      const apiMsg = err?.response?.data?.message;
      setError(apiMsg ?? err.message ?? "An unknown error occurred");
      setTimeout(() => setError(null), 2000);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoginForm
        className="w-[80%] md:w-[40%]"
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />

      {error && (
        <div className="absolute top-10 left-10 p-2 rounded-lg bg-red-500 text-white text-lg font-bold">
          An error occured: {error}
        </div>
      )}
    </div>
  );
}
