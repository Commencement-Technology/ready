"use client";
import { Button } from "@/components/ui/button";
import OAuthLoginButton from "@/components/ui/buttons/OAuthLoginButton";
import AuthChoice from "@/components/ui/general/AuthChoice";
import PageTitle from "@/components/ui/general/PageTitle";
import SiteLogoFixed from "@/components/ui/general/SiteLogoFixed";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GlobalContext } from "@/services/GlobalContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const SignUp = () => {
  const { signUp, loggedInUser, oAuth2Login } = useContext(GlobalContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, name);
  };

  if (loggedInUser) {
    return router.push("/library");
  }

  return (
    <div className="p-8 pt-32 pb-20 font-[family-name:var(--font-geist-sans)] max-w-[400px] mx-auto">
      <SiteLogoFixed />
      <PageTitle title="Sign Up" />
      <section className="flex flex-col gap-8 mt-12">
        <form onSubmit={handleSubmit}>
          <section className="flex flex-col gap-6">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <Button type="submit">Sign Up</Button>
          </section>
        </form>
        <AuthChoice
          destination={`/login`}
          title={"Login"}
          text={"Already have an account?"}
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

export default SignUp;
