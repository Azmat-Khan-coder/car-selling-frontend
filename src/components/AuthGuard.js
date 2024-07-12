import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthGuard = (props) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return <>{props.children}</>;
};

export default AuthGuard;
