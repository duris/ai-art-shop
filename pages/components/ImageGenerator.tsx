import { ChangeEvent, FormEvent, useState } from "react";
import styles from "@/styles/Home.module.css";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/get-painting", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });
    const data = await response.json();
    setAnswer(data.text);
    setIsLoading(false);
  }

  function handleChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    setPrompt(target.value);
  }

  return (
    <>
      <h1>What Do You Want a Happy Painting Of?</h1>
      <form className="our-form" onSubmit={handleSubmit}>
        <input className="prompt-field" type="text" onChange={handleChange} />
        <button className="prompt-button" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>

      {isLoading && <div className="loading-spinner"></div>}

      {isLoading == false && <img src={answer} />}
    </>
  );
}
