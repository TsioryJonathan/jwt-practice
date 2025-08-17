import { login, register } from "@/service/auth";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import LoginForm from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import { assets } from "@/assets/Images/assets";
import { Check, X } from "lucide-react";

function AuthScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* REGISTER */
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const onLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!email || !password) return;
    e.preventDefault();
    try {
      setIsLoading(true);
      await login(email, password);
      setIsLoading(false);
      setStatusMessage("Connexion réussie, redirection…");
      navigate("/todo");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const apiMsg = err?.response?.data?.message;
      setError(apiMsg ?? err.message ?? "Une erreur inconnue est survenue");
      setTimeout(() => setError(null), 2000);
      setIsLoading(false);
    }
  };

  const onRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!newEmail || !newPassword) return;
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await register(username, newEmail, newPassword);

      if (res === "User already exist") {
        setError("User already exists");
        setTimeout(() => setError(null), 1000);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setStatusMessage("Registered succesfully !");
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const apiMsg = err?.response?.data?.message;
      setError(apiMsg ?? err.message ?? "Une erreur inconnue est survenue");
      setTimeout(() => setError(null), 2000);
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 relative">
      <div className="relative">
        <div className="absolute inset-0 -z-1 w-full h-full">
          <img src={assets.landing} className="w-full h-screen object-cover" />
        </div>
      </div>

      {/* Colonne droite */}
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 via-purple-400 to-purple-600">
        <Tabs defaultValue="login" className="w-full ">
          <TabsList className="w-[80%] mb-8 flex justify-around mx-24 bg-gray-200 ">
            <TabsTrigger
              value="login"
              className="cursor-pointer px-6 py-2 rounded-lg data-[state=active]:bg-purple-500! text-black! data-[state=active]:text-white!"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="cursor-pointer px-6 py-2 rounded-lg data-[state=active]:bg-purple-500! text-black! data-[state=active]:text-white!"
            >
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm setEmail={setEmail} setPassword={setPassword} onLogin={onLogin} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm
              setNewEmail={setNewEmail}
              setNewPassword={setNewPassword}
              onRegister={onRegister}
              isLoading={isLoading}
              setUsername={setUsername}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Notifications */}
      {error && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg bg-red-500 text-white text-lg font-bold shadow-lg flex flex-row gap-10 items-center justify-center">
          <X /> {error}
        </div>
      )}
      {statusMessage && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg bg-red-500 text-white text-lg font-bold shadow-lg flex flex-row gap-10 items-center justify-center">
          <Check /> {statusMessage}
        </div>
      )}
    </div>
  );
}

export default AuthScreen;
