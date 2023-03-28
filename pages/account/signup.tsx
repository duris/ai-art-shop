import { useRouter } from "next/router";
import { useState } from "react";

export default function Index() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const signUp = () => {
    console.log("call api");
    fetch("/api/signup", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: email,
      }),
    }).then((response) => {
      console.log(response);
      router.push("/");
    });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <input
        name="email"
        type="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={signUp}>Sign Up</button>
    </>
  );
}
