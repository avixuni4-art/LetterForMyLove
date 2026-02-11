
import React from 'react';
import { EnvelopeState } from '../types';

interface EnvelopeProps {
  state: EnvelopeState;
  onOpen: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ state, onOpen }) => {
  const isClosed = state === EnvelopeState.CLOSED;
  const isOpening = state === EnvelopeState.OPENING;
  const isOpened = state === EnvelopeState.OPENED;

  return (
    <div className="relative flex items-center justify-center w-[320px] h-[200px] md:w-[450px] md:h-[280px] perspective-1000 transition-all duration-1000">
      {/* Shadow */}
      <div className={`absolute bottom-[-20px] w-4/5 h-6 bg-black/10 blur-xl rounded-full transition-opacity duration-700 ${isOpened ? 'opacity-0' : 'opacity-100'}`} />

      {/* Envelope Container */}
      <div className={`relative w-full h-full transform-style-3d transition-all duration-1000 ${isOpened ? '-translate-y-64 scale-75 opacity-0' : 'scale-100'}`}>
        
        {/* Back Panel (The base of the envelope) */}
        <div className="absolute inset-0 bg-rose-200 border border-rose-300 rounded-sm shadow-inner z-0" />

        {/* The Paper/Letter (Visible briefly while opening) */}
        <div className={`absolute left-1/2 -translate-x-1/2 bottom-4 w-[90%] h-[80%] bg-white shadow-sm transition-transform duration-1000 z-10 ${isOpening || isOpened ? '-translate-y-20' : 'translate-y-0'}`} />

        {/* Left Flap */}
        <div 
          className="absolute inset-0 z-30"
          style={{
            clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
            backgroundColor: '#fecdd3' // rose-200
          }}
        />
        
        {/* Right Flap */}
        <div 
          className="absolute inset-0 z-30"
          style={{
            clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
            backgroundColor: '#fecdd3' // rose-200
          }}
        />

        {/* Bottom Flap */}
        <div 
          className="absolute inset-0 z-40"
          style={{
            clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)',
            backgroundColor: '#fb7185' // rose-400
          }}
        />

        {/* Top Flap (The one that opens) */}
        <div 
          className={`absolute inset-0 origin-top transition-transform duration-700 ease-in-out cursor-pointer z-[50]
            ${isOpening || isOpened ? 'rotate-x-180 z-0' : 'rotate-x-0'}
          `}
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 50%)',
            backgroundColor: '#fda4af', // rose-300
            backfaceVisibility: 'hidden'
          }}
          onClick={isClosed ? onOpen : undefined}
        />

        {/* Heart Seal */}
        {isClosed && (
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-none">
            <button
              onClick={(e) => { e.stopPropagation(); onOpen(); }}
              className="pointer-events-auto flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white rounded-full shadow-xl hover:scale-125 transition-transform animate-pulse border-2 border-rose-100"
              title="Click to Open"
            >
              <span className="text-red-500 text-3xl md:text-4xl">❤️</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Envelope;
