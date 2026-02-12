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
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4 font-sans text-center overflow-hidden">
      {!isGameFinished ? (
        <div className="max-w-md w-full animate-in fade-in duration-500">
          <h1 className="text-3xl font-bold mb-6 text-pink-600 drop-shadow-sm">Für meine Yaren ❤️</h1>
          <p className="mb-6 text-pink-400 font-medium italic underline decoration-pink-200">Finde alle Paare 🥰</p>
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`w-16 h-16 rounded-xl cursor-pointer transition-all duration-500 shadow-md ${
                  flipped.includes(index) || solved.includes(index) ? 'rotate-y-180 scale-105' : 'bg-gradient-to-br from-pink-400 to-red-300'
                }`}
                style={{
                  backgroundImage: (flipped.includes(index) || solved.includes(index)) 
                    ? `url(/valentine/tile-${card.imgNum}.png)` 
                    : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </div>
        </div>
      ) : !yesPressed ? (
        <div className="flex flex-col items-center animate-in zoom-in duration-700">
          <div className="relative">
             <img src="/valentine/full-image.png" className="w-72 rounded-3xl shadow-2xl mb-8 border-4 border-white rotate-2 transition-transform hover:rotate-0" />
             <div className="absolute -top-4 -right-4 text-4xl animate-pulse">✨</div>
             <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce">💖</div>
          </div>
          <h1 className="text-3xl font-extrabold text-pink-600 mb-8 leading-tight">
            Du hast es geschafft mein Herz! ❤️ <br/> Will you be my Valentine?
          </h1>
          <div className="flex gap-6 justify-center">
             <button 
                className="bg-green-500 hover:bg-green-600 text-white px-12 py-4 rounded-full font-bold text-xl shadow-xl transition-all hover:scale-110 active:scale-95"
                onClick={() => setYesPressed(true)}
             >
               Yes! ❤️
             </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center animate-in slide-in-from-bottom-20 duration-1000">
          {/* Die Liebesbrief-Animation */}
          <div className="relative w-80">
            {/* Briefumschlag Hintergrund */}
            <div className="bg-red-400 w-full h-48 rounded-b-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full border-t-[100px] border-t-transparent border-l-[160px] border-l-red-500 border-r-[160px] border-r-red-500"></div>
            </div>

            {/* Der eigentliche Brief (gleitet nach oben) */}
            <div className="absolute bottom-10 left-4 right-4 bg-white p-6 rounded-lg shadow-lg animate-in slide-in-from-bottom-32 duration-[1500ms] delay-500 fill-mode-forwards z-10 border-t-4 border-pink-300">
              <div className="text-5xl mb-4 text-center">🥰❤️</div>
              <h1 className="text-4xl font-black text-red-600 mb-2">Yay!</h1>
              <div className="border-y-2 border-pink-100 py-4 my-2">
                <p className="text-xl text-pink-600 font-serif leading-relaxed">
                  Ich liebe dich, <br/> 
                  <span className="text-3xl font-bold block mt-2 text-red-500 tracking-widest animate-pulse">YAREN ❤️</span>
                </p>
              </div>
              <p className="mt-4 text-pink-400 italic text-lg">Mein Lieblingsmensch! ✨</p>
              <div className="mt-4 flex gap-2 justify-center text-2xl">
                <span>🌹</span><span>❤️</span><span>🌹</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
