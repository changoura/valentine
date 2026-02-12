import { useState, useEffect } from "react";

export default function Page() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [yesPressed, setYesPressed] = useState(false);

  useEffect(() => {
    const pairImages = [1, 2, 3, 4, 5, 6, 7, 8];
    const deck = [...pairImages, ...pairImages]
      .sort(() => Math.random() - 0.5)
      .map((imgNum, index) => ({ id: index, imgNum }));
    setCards(deck);
  }, []);

  const handleCardClick = (id) => {
    if (flipped.length === 2 || solved.includes(id) || flipped.includes(id)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].imgNum === cards[second].imgNum) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        if (solved.length + 2 === cards.length) {
          setTimeout(() => setIsGameFinished(true), 800);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4 font-sans text-center overflow-hidden relative">
      
      {/* Selbstgebauter Herzregen (ohne extra Paket) */}
      {yesPressed && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      {!isGameFinished ? (
        <div className="max-w-md w-full animate-in fade-in duration-1000">
          <h1 className="text-3xl font-bold mb-6 text-pink-600 drop-shadow-md">Für meine Yaren ❤️</h1>
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`w-16 h-16 rounded-2xl cursor-pointer transition-all duration-500 shadow-lg ${
                  flipped.includes(index) || solved.includes(index) ? 'rotate-y-180 scale-105' : 'bg-white border-2 border-pink-200'
                }`}
                style={{
                  backgroundImage: (flipped.includes(index) || solved.includes(index)) 
                    ? `url(/valentine/tile-${card.imgNum}.png)` 
                    : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {!(flipped.includes(index) || solved.includes(index)) && (
                   <div className="w-full h-full flex items-center justify-center text-2xl opacity-40">🎁</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : !yesPressed ? (
        <div className="flex flex-col items-center animate-in zoom-in duration-1000">
          <img src="/valentine/full-image.png" className="w-72 rounded-3xl shadow-2xl mb-8 border-8 border-white -rotate-2" />
          <h1 className="text-3xl font-extrabold text-pink-600 mb-8 px-4">
            Du hast es geschafft mein Herz! ❤️ <br/> Will you be my Valentine?
          </h1>
          <button 
            className="bg-red-500 hover:bg-red-600 text-white px-14 py-5 rounded-full font-black text-2xl shadow-[0_10px_0_0_rgba(185,28,28)] active:shadow-none active:translate-y-1 transition-all"
            onClick={() => setYesPressed(true)}
          >
            YES! ❤️
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center z-50">
          <div className="relative w-80 h-96 flex items-end justify-center">
            {/* Umschlag */}
            <div className="absolute bottom-0 w-full h-48 bg-red-500 rounded-b-2xl shadow-2xl z-20">
              <div className="absolute top-0 left-0 w-full h-full border-l-[160px] border-l-red-600 border-r-[160px] border-r-red-600 border-t-[100px] border-t-transparent"></div>
            </div>

            {/* Der Brief */}
            <div className="bg-white w-[95%] p-8 rounded-sm shadow-sm animate-letter-up mb-10 z-10 border-t-8 border-pink-400">
              <div className="text-5xl mb-4 animate-bounce text-center">🥰</div>
              <h1 className="text-4xl font-black text-red-600 mb-4 text-center">YAY!</h1>
              <div className="space-y-4 font-serif italic text-pink-700 text-center">
                <p className="text-2xl border-b border-pink-100 pb-2">Ich liebe dich,</p>
                <p className="text-4xl font-bold text-red-500 tracking-tighter">YAREN ❤️</p>
                <p className="text-lg pt-4 border-t border-pink-100 text-center uppercase text-sm font-sans font-bold">Mein Lieblingsmensch! ✨</p>
              </div>
              <div className="mt-6 flex justify-center gap-4 text-3xl">
                <span>🌹</span><span>💍</span><span>🌹</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes letter-up {
          0% { transform: translateY(200px); opacity: 0; }
          100% { transform: translateY(-60px); opacity: 1; }
        }
        @keyframes fall {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-letter-up {
          animation: letter-up 3s ease-out forwards;
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}
