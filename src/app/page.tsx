"use client";

import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { Chat } from "@/components/chat";
import { InputForm } from "@/components/input-form";
import { ThreeDotsLoader } from "@/components/three-dots-loader";
import { Message } from "@/types/message";

export default function Home() {
  const [chats, setChats] = useState<Message[]>([
    {
      role: "system",
      content: "Specify ChatGPT's behavior",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (message: Message) => {
    try {
      setIsSubmitting(true);
      setChats((prev) => [...prev, message]);

      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: [...chats, message].map((d) => ({
            role: d.role,
            content: d.content,
          })),
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setChats((prev) => [...prev, data.result as Message]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full max-w-2xl bg-white rounded-lg p-10 my-10">
      <div className="mb-10">
        <AnimatePresence>
          {chats.slice(1, chats.length).map((chat, index) => {
            return <Chat content={chat.content} role={chat.role} key={index} />;
          })}
        </AnimatePresence>
        {isSubmitting && (
          <Flex alignSelf="flex-start" px="2rem" py="0.5rem">
            <ThreeDotsLoader />
          </Flex>
        )}
      </div>
      <InputForm onSubmit={handleSubmit} />
    </main>
  );
}
