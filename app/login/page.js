"use client";
import { Button } from "@/components/ui/button";
import OAuthLoginButton from "@/components/ui/buttons/OAuthLoginButton";
import AuthChoice from "@/components/ui/general/AuthChoice";
import PageTitle from "@/components/ui/general/PageTitle";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GlobalContext } from "@/services/GlobalContext";
import Link from "next/link";
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
    <div className="p-8 pb-20 pt-32 font-[family-name:var(--font-geist-sans)] max-w-[400px] mx-auto">
      <PageTitle title="Login" />
      <section className="flex flex-col gap-8 mt-12">
        <form onSubmit={handleSubmit}>
          <section className="flex flex-col gap-6">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Login</Button>
          </section>
        </form>
        <AuthChoice
          destination={`/signup`}
          title={"Sign up"}
          text={"Don't have an account?"}
        />

        <Separator />
        <OAuthLoginButton
          onClick={oAuth2Login}
          title={"Continue with Google"}
        />
      </section>
    </div>
  );
};

export default Login;
