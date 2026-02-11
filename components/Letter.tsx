
import React from 'react';
import { LetterContent } from '../types';

interface LetterProps {
  content: LetterContent;
  visible: boolean;
}

const Letter: React.FC<LetterProps> = ({ content, visible }) => {
  if (!visible) return null;

  return (
    <div className={`mt-4 mb-20 w-full max-w-4xl bg-[#fffaf0] p-6 md:p-16 shadow-2xl rounded-lg border-t-8 border-rose-300 font-handwritten text-gray-800 leading-relaxed transition-all duration-1000 transform ${visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-rose-100 pb-4">
        <h2 className="text-3xl md:text-4xl font-script text-rose-400 italic">Promise Day 2025</h2>
        <span className="text-lg italic text-rose-400">{new Date().toLocaleDateString('ne-NP', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      {content.loading ? (
        <div className="flex flex-col items-center justify-center space-y-6 py-24">
          <div className="w-12 h-12 border-4 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-rose-500 animate-pulse text-2xl">सजाउँदैछु तिम्रो लागि...</p>
        </div>
      ) : (
        <div className="whitespace-pre-wrap text-2xl md:text-3xl min-h-[500px] opacity-0 animate-in fade-in duration-1000 fill-mode-forwards text-left px-2">
          {content.text}
        </div>
      )}

      <div className="mt-16 text-center text-rose-500 font-script text-4xl animate-pulse">
        Happy Promise Day, Rimishu! ❤️
      </div>
    </div>
  );
};

export default Letter;
