import React from "react";

type AboutQuestionType = {
  question: string;
  children: React.ReactNode;
};

const AboutQuestion = ({ question, children }: AboutQuestionType) => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <h2 className="text-gray-400 text-lg md:text-xl">{question}</h2>
      <div className="text-xl md:text-2xl">{children}</div>
    </div>
  );
};

export default AboutQuestion;
