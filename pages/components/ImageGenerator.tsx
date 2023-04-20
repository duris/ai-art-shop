import { ChangeEvent, FormEvent, useState } from "react";

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
    <div className="image-genertion">
      <h1>Create</h1>
      <form className="our-form" onSubmit={handleSubmit}>
        <input
          className="prompt-field"
          type="text"
          placeholder="Enter description"
          onChange={handleChange}
          minLength={3}
        />
        <button className="prompt-button" disabled={isLoading} type="submit">
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>

      {isLoading == false ? <img src={answer} /> : ""}
    </div>
  );
}
