import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthGuard = (props) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return <>{props.children}</>;
};

export default AuthGuard;
