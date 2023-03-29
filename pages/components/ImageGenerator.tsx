import { ChangeEvent, FormEvent, useState } from "react";
import styles from "@/styles/Home.module.css";
import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  Heading,
} from "@chakra-ui/react";

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
      <Heading>Create</Heading>
      <form className="our-form" onSubmit={handleSubmit}>
        <input
          className="prompt-field"
          type="text"
          placeholder="Enter description"
          onChange={handleChange}
          minLength={3}
        />
        <Button
          colorScheme="facebook"
          className="prompt-button"
          isDisabled={isLoading}
          type="submit"
          w={100}
        >
          {isLoading ? (
            <CircularProgress size={5} isIndeterminate color="blue.600" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>

      {isLoading == false ? (
        <img src={answer} />
      ) : (
        <CircularProgress isIndeterminate color="blue.600" />
      )}
    </div>
  );
}
