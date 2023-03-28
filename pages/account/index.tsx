import { useEffect } from "react";
import { useRouter } from "next/router";

// Here you would fetch and return the user
const useUser = () => ({ user: null, loading: false });

export default function AccountPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!(user || loading)) {
      router.push("/account/signin");
    }
  }, [user, loading]);

  return <p>Redirecting...</p>;
}
