
import React, { useState, useEffect, useCallback } from 'react';
import FloatingHearts from './components/FloatingHearts';
import Envelope from './components/Envelope';
import Letter from './components/Letter';
import { generatePromiseLetter } from './services/geminiService';
import { LetterContent, EnvelopeState } from './types';

const App: React.FC = () => {
  const [envelopeState, setEnvelopeState] = useState<EnvelopeState>(EnvelopeState.CLOSED);
  const [letter, setLetter] = useState<LetterContent>({
    text: '',
    loading: true,
    error: null,
  });

  const fetchLetter = useCallback(async () => {
    try {
      const content = await generatePromiseLetter();
      setLetter({ text: content, loading: false, error: null });
    } catch (err) {
      setLetter({ 
        text: 'मेरो मुटुको धड्कन,\n\nआज प्रमिस डेमा म तिमीलाई सधैं साथ दिने र कहिल्यै नछोड्ने वाचा गर्छु। तिमी मेरो संसार हौ।', 
        loading: false, 
        error: 'Failed to generate' 
      });
    }
  }, []);

  useEffect(() => {
    fetchLetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenEnvelope = () => {
    setEnvelopeState(EnvelopeState.OPENING);
    setTimeout(() => {
      setEnvelopeState(EnvelopeState.OPENED);
      // Wait for the opening animation before scrolling
      setTimeout(() => {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }, 700);
  };

  const isOpened = envelopeState === EnvelopeState.OPENED;

  return (
    <div className={`min-h-screen w-full flex flex-col items-center p-4 transition-all duration-1000 bg-[#fff5f5] relative ${isOpened ? 'overflow-y-auto' : 'justify-center overflow-hidden'}`}>
      <FloatingHearts />

      {/* Hero Title (Visible when closed) */}
      {!isOpened && (
        <div className={`mb-16 transition-all duration-1000 transform ${envelopeState === EnvelopeState.CLOSED ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
          <h1 className="text-5xl md:text-7xl font-script text-rose-600 text-center mb-4 drop-shadow-md">
            Happy Promise Day
          </h1>
          <p className="text-gray-500 font-handwritten text-center text-xl md:text-2xl italic px-4">
            Meant for your eyes only, my love...
          </p>
        </div>
      )}

      {/* Main Container */}
      <div className={`w-full flex flex-col items-center z-10 relative ${isOpened ? 'mt-4' : ''}`}>
        {/* Envelope construction */}
        {!isOpened && (
          <div className="relative transition-all duration-500">
            <Envelope state={envelopeState} onOpen={handleOpenEnvelope} />
          </div>
        )}

        {/* The Letter */}
        <Letter 
          content={letter} 
          visible={isOpened} 
        />
      </div>

      {/* Reset/Fold Button */}
      {isOpened && (
        <div className="flex flex-col items-center gap-6 mt-8 mb-20">
          <button 
            onClick={() => {
              setEnvelopeState(EnvelopeState.CLOSED);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-10 py-4 bg-white/90 backdrop-blur-md text-rose-500 rounded-full shadow-2xl hover:bg-rose-500 hover:text-white transition-all duration-300 font-script text-2xl z-20 border border-rose-200 hover:scale-105 active:scale-95"
          >
            Fold it back safely ❤️
          </button>
        </div>
      )}

      <footer className={`mt-8 mb-4 text-rose-300 text-sm font-handwritten transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-40'}`}>
        You are my forever and always.
      </footer>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-x-180 {
          transform: rotateX(180deg);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        html, body {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default App;
