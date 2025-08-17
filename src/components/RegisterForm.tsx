import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";

export type RegisterFormProps = {
  className?: string;
  setNewEmail: Dispatch<SetStateAction<string>>;
  setNewPassword: Dispatch<SetStateAction<string>>;
  setUsername: Dispatch<SetStateAction<string>>;
  onRegister: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
};

export function RegisterForm({
  className,
  setNewEmail,
  setNewPassword,
  onRegister,
  isLoading,
  setUsername,
}: RegisterFormProps) {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className={cn("max-h-screen flex items-center justify-center p-6 bg-transparent", className)}>
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-gray-900">Welcome, join us</h1>
          <p className="text-sm text-gray-500">Create an account and start tracking your todo</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <fieldset disabled={isLoading} className="space-y-6 mb-10">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700">
                Username
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="username"
                  type="username"
                  placeholder="stanley_chan"
                  className="pl-9 border-gray-300 text-black focus:border-violet-500 focus:ring-violet-500"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="stanley@gmail.com"
                  className="pl-9 border-gray-300 text-black focus:border-violet-500 focus:ring-violet-500"
                  required
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-700">
                Password{" "}
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-10 border-gray-300 text-black focus:border-violet-500 focus:ring-violet-500"
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-gray-100"
                >
                  {showPwd ? <EyeOff className="h-4 w-4 text-gray-600" /> : <Eye className="h-4 w-4 text-gray-600" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white" onClick={(e) => onRegister(e)}>
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating ...</span>
                </span>
              ) : (
                "Create an account"
              )}
            </Button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
