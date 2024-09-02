import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  // console.log(user);
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/post-jobs" : "/jobs");
      })
      .catch((err) => {
        console.log("Error Updating Role ");
      });
  };

  useEffect(
    (role) => {
      if (user?.unsafeMetadata?.role) {
        navigate(role === "recruiter" ? "/post-jobs" : "/jobs");
      }
    },
    [user]
  );

  if (!isLoaded) {
    return (
      <div>
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h1 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am ...
      </h1>
      <div className="mt-16 grid grid-cols-2 gap-6 w-full md:px-32">
        <Button
          variant={"blue"}
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("Candidate")}
        >
          Candidate
        </Button>
        <Button
          variant={"destructive"}
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
