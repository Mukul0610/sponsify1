import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <SignIn />
      <div className="text-gray-400  text-sm mt-2 flex">
        <p>Forgot Password?</p>
        <Link href="/forget-password" className="text-white font-semibold ml-2">
          Reset here
        </Link>
      </div>
    </div>
  );
}