import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseAuth } from "@/utils/firebaseConfig";
import { useAuthStore } from "@/store/authStore";
import { toast } from "@/hooks/use-toast";

import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginWithGoogle = () => {
  const { loginWithGoogle, error, isLoading } = useAuthStore();
  const [isrequesting, setIsrequesting] = useState(false);
  const navigate = useNavigate();

  const handleLoginWithGooggle = async () => {
    setIsrequesting(true);
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(firebaseAuth, provider);
      if (user) {
        setIsrequesting(false);
        await loginWithGoogle(user);

        if (error) {
          toast({
            title: error,
            description: "",
          });
        } else {
          navigate("/");
          toast({
            title: "Login successfull",
            description: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        title: error.response?.data?.message || "Failed to login with Google.",
        description: "",
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-10 flex-col gap-10 w-full min-h-screen">
      <FcGoogle className="h-36 w-36" />
      <button
        onClick={handleLoginWithGooggle}
        className="py-4 px-2 rounded-xl bg-[#FFC107] font-bold"
        disabled={isLoading || isrequesting}
      >
        Login with Google
      </button>
    </div>
  );
};

export default LoginWithGoogle;
