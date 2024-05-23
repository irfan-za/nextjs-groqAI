"use client";

import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: content.value }),
      });
      const data = await res.json();
      setAiResponse(data.content);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      content.value = "";
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-0">
      <h1 className="text-2xl font-semibold text-red-400">
        <span className="font-normal text-sm text-gray-700">chat with</span>{" "}
        Groq AI
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-4 p-2 sm:p-4 bg-white rounded-lg shadow-lg space-x-2"
      >
        <input
          type="text"
          id="content"
          placeholder="Ask me something..."
          className="border border-gray-300 rounded-lg p-2 max-w-[200px] sm:max-w-none focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-400 hover:bg-red-500"
          } text-white px-4 py-2 rounded-lg focus:outline-none text-sm sm:text-base`}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      {aiResponse && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg max-w-[400px]">
          <h2 className="text-lg font-semibold text-red-400">AI Response</h2>
          <p className="text-gray-600 max-h-80 overflow-y-auto  ">
            {aiResponse}
          </p>
        </div>
      )}
    </main>
  );
}
