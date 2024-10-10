"use client";
import { Button } from "@/components/ui/button";
import OAuthLoginButton from "@/components/ui/buttons/OAuthLoginButton";
import AuthChoice from "@/components/ui/general/AuthChoice";
import PageTitle from "@/components/ui/general/PageTitle";
import SiteLogoFixed from "@/components/ui/general/SiteLogoFixed";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GlobalContext } from "@/services/GlobalContext";
import { siteTitle } from "@/utils/content";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";

const SignUp = () => {
  const { loading, signUp, user, oAuth2Login, errorMessage } =
    useContext(GlobalContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, name);
  };

  useEffect(() => {
    document.title = `Sign up | ${siteTitle}`;
  }, []);

  if (user) {
    return router.push("/library");
  }

  return (
    <div className="p-8 pt-32 pb-20 font-[family-name:var(--font-geist-sans)] max-w-[400px] mx-auto">
      <SiteLogoFixed />
      <PageTitle title="Sign Up" />
      <section className="flex flex-col gap-8 mt-12">
        {!!errorMessage && (
          <p className="text-center text-sm text-red-400">{errorMessage}</p>
        )}
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
            <Button
              type="submit"
              disabled={
                email.trim().length === 0 || password.trim().length === 0
              }
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign up"
              )}
            </Button>
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
