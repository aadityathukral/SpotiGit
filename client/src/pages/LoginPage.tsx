import { Button } from "@/components/ui/button";
import AppDescription from "@/components/AppDescription";
import { handleLogin } from "@/auth/handleLogin";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <AppDescription />
      <Button
        className="mt-4 bg-greenspotify text-blackspotify hover:bg-[#1ED760]"
        onClick={() => handleLogin()}
      >
        Login
      </Button>
    </div>
  );
}
