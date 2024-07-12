import AuthGuard from "@/components/AuthGuard";
import SubmitCar from "@/components/SubmitCar";

export default function Login() {
  return (
    <AuthGuard>
      <SubmitCar />
    </AuthGuard>
  );
}
