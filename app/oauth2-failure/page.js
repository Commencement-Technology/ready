"use client";
import { Button } from "@/components/ui/button";
import OAuthLoginButton from "@/components/ui/buttons/OAuthLoginButton";
import PageTitle from "@/components/ui/general/PageTitle";
import { Separator } from "@/components/ui/separator";
import { GlobalContext } from "@/services/GlobalContext";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

const OAuth2Failure = () => {
  const { oAuth2Login } = useContext(GlobalContext);

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pt-32 pb-20 gap-4 font-[family-name:var(--font-geist-sans)]">
      <PageTitle title="Failed to Sign in" />
      <p>Access denied</p>
      <Separator className="max-w-[300px]" />
      <OAuthLoginButton onClick={oAuth2Login} title={"Continue with Google"} />
      or
      <Button asChild>
        <Link href={`/login`}>
          <Mail className="mr-2 h-4 w-4" /> Continue with email
        </Link>
      </Button>
    </div>
  );
};

export default OAuth2Failure;
