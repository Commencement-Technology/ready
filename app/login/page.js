"use client";
import { Button } from "@/components/ui/button";
import OAuthLoginButton from "@/components/ui/buttons/OAuthLoginButton";
import { Input } from "@/components/ui/input";
import { GlobalContext } from "@/services/GlobalContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const Login = () => {
  const { login, loggedInUser, oAuth2Login } = useContext(GlobalContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (!!loggedInUser) {
    return router.push("/library");
  }

  return (
    <div className="p-8 pb-20 pt-32 font-[family-name:var(--font-geist-sans)] max-w-[500px] mx-auto">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
      <p>Or</p>
      <OAuthLoginButton onClick={oAuth2Login} title={"Continue with Google"} />
    </div>
  );
};

export default Login;
