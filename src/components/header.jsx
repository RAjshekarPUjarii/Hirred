import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  BriefcaseBusiness,
  Heart,
  LucideShoppingBasket,
  PenBox,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Header = () => {
  const [showSign, setShowSign] = useState(false);

  const [search, setSearch] = useSearchParams();

  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSign(true);
    }
  }, [search]);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      // console.log(e.target,e.currentTarget);

      setShowSign(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="p-4 flex justify-between items-center ">
        <Link>
          <img src="/logo.png" alt="logo" className="h-20" draggable="false" />
        </Link>
        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSign(true)}>
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-jobs">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSign && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black
        bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
