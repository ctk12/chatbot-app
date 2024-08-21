"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import { FormDataType, InfoFillForm, InfoForm, OptionsForm } from './Forms';

type Message = {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
  data?: FormDataType;
  selected?: string;
};

enum TextType {
  InfoFillForm = "InfoFillForm",
  OptionsForm = "OptionsForm",
  InfoForm = "InfoForm",
}

const responses = [
  { question: "Start Again", answer: ["What services do you offer?", "How can I contact support?"] },
  { question: "What services do you offer?", answer: ["We offer web development", "Mobile app development",  "UI/UX design"] },
  { question: "How can I contact support?", answer: ["by email", "contact form"] },
  { question: "We offer web development", answer: "Web development, also known as website development, refers to the tasks associated with creating, building, and maintaining websites and web applications that run online on a browser. It may, however, also include web design, web programming, and database management."},
  { question: "Mobile app development", answer: "Mobile application development is the process of creating software applications that run on a mobile device, and a typical mobile application utilizes a network connection to work with remote computing resources." },
  { question: "What services do you offer?", answer: "User experience design, upon which is the centralized requirements for User Experience Design Research, defines the experience a user would go through when interacting with a company, its services, and its products." },
  { question: "by email", answer: "You can contact support by emailing support@example.com." },
  // Add more predefined questions and answers here
];

const Chat: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello, I am Pritesh. How Can I help you?',
      sender: 'bot',
    },
    {
      id: 0,
      text: "OptionsForm",
      sender: "user",
      options: Array.isArray(responses[0].answer) ? responses[0].answer : [],
    }
  ]);

  const onFormSubmit = (formData: FormDataType) => {
    setLoading(true);
    const thankYouMessageData = getThankYou("form");

    setMessages(prev => {
      const copyPrev = [...prev];
      copyPrev.map(data => {
        if (data.id === 0) {
          data.id = prev.length;
          data.data = formData;
          data.text = TextType.InfoForm;
        }

        return data;
      });
     
      return copyPrev;
    });

    let timer = setTimeout(() => {
      setMessages(prev => {
        const copyPrev = [...prev];
       
        return [...copyPrev, ...thankYouMessageData];
      });
      setLoading(false);
      clearTimeout(timer);
    }, 2000);
  }

  const getThankYou = (type?: string): Message[] => {
    return [
      {
        id: messages.length + 2,
        text: `Thank you for your inquiry. ${type && type === "form" ? "Your submission has been received. Our team will contact you shortly with a response." : "We hope the provided information is helpful. Let me know if you need more help" }`,
        sender: 'bot',
      },
      {
        id: 0,
        text: TextType.OptionsForm,
        sender: 'user',
        options: ["Start Again"],
      }
    ];
  }

  const handleSend = (userInput: string) => {
    setLoading(true);
    const matchingResponse = responses.find(r => {
      return r.question.toLowerCase() === userInput.toLowerCase();
    });
    const response = matchingResponse ? matchingResponse.answer : "Sorry, I don't understand that.";
    const messageData: Message = {
      id: messages.length + 1,
      text: "",
      sender: 'user',
    };
   
    if (Array.isArray(response)) {
      messageData.text =  TextType.OptionsForm;
      messageData.options =  response;
      messageData.id = 0;
    } else if (userInput === "contact form") {
      messageData.text =  TextType.InfoFillForm;
      messageData.id = 0;
    } else {
      messageData.text =  response;
    }

    const thankYouMessageData = getThankYou();

    setMessages(prev => {
      const copyPrev = [...prev];
      copyPrev.map(data => {
        if (data.id === 0) {
          data.id = prev.length;
          data.selected = userInput;
        }

        return data;
      });

      return copyPrev;
    });

    let timer = setTimeout(() => {
      setMessages(prev => {
        const copyPrev = [...prev];
  
        copyPrev.push(messageData);
  
        if (!Array.isArray(response) && userInput !== "contact form") {
          copyPrev.push(...thankYouMessageData);
        }
  
        return copyPrev;
      });
      setLoading(false);
      clearTimeout(timer);
    }, 2000);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <div className="w-full max-h-screen overflow-y-scroll h-full flex-1 bg-white rounded-lg shadow-lg p-4">
      <div className="flex flex-col space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.text === 'InfoFillForm' && (
              <div className="bg-blue-50 p-5 rounded-lg text-black max-w-xs">
                <InfoFillForm onFormSubmit={onFormSubmit} />
              </div>
            )}
            {message.text === 'OptionsForm' && message.options && (
              <div className="bg-blue-50 p-5 rounded-lg text-black max-w-xs">
                <OptionsForm title='Choose Options' options={message.options} onSend={message.id === 0 ? handleSend : () => {}} selected={message?.selected} />
              </div>
            )}
            {message.text === 'InfoForm' && message?.data && (
              <div className="bg-blue-50 p-5 rounded-lg text-black max-w-xs">
                <InfoForm data={message.data} />
              </div>
            )}
            {message.text !== 'InfoForm' && message.text !== 'OptionsForm' && message.text !== 'InfoFillForm' && (
              <>
                {message.id !== 0 && message.sender === 'bot' && (
                  <div className="flex items-center space-x-2 animate-fadeIn">
                    <Image
                      src="/bot.svg"
                      width={40}
                      height={40}
                      alt="Picture of the author"
                    />
                    <div className="bg-gray-100 p-3 rounded-lg text-black max-w-xs">
                      {message.text}
                    </div>
                  </div>
                )}
                {message.id !== 0 && message.sender === 'user' && (
                  <div className="bg-blue-50 p-3 rounded-lg text-black max-w-xs">
                    {message.text}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      {loading && (
        <div className="mt-4 flex justify-start">
          <Image
            src="/bot-load.gif"
            width={60}
            height={50}
            alt="Picture of the author"
          />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chat;
