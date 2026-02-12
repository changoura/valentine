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
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4 font-sans text-center">
      {!isGameFinished ? (
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-pink-600 drop-shadow-sm">Für meine Yaren ❤️</h1>
          <p className="mb-6 text-pink-400 font-medium">Finde alle Paare 🥰</p>
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`w-16 h-16 rounded-xl cursor-pointer transition-all duration-500 shadow-md ${
                  flipped.includes(index) || solved.includes(index) ? 'rotate-y-180' : 'bg-gradient-to-br from-pink-400 to-red-300'
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
             <img src="/valentine/full-image.png" className="w-72 rounded-3xl shadow-2xl mb-8 border-4 border-white rotate-2" />
             <div className="absolute -top-4 -right-4 text-4xl">✨</div>
             <div className="absolute -bottom-4 -left-4 text-4xl">💖</div>
          </div>
          <h1 className="text-4xl font-extrabold text-pink-600 mb-8 leading-tight">
            Geschafft! 🥰 <br/> ❤️ <br/> Will you be my Valentine?
          </h1>
          <div className="flex gap-6 justify-center">
             <button 
                className="bg-green-500 hover:bg-green-600 text-white px-12 py-4 rounded-full font-bold text-xl shadow-xl transition-transform hover:scale-110 active:scale-95"
                onClick={() => setYesPressed(true)}
             >
               Yes! ❤️
             </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-1000">
          <div className="text-7xl mb-6 animate-bounce">🥰❤️</div>
          <h1 className="text-5xl font-black text-red-600 drop-shadow-lg mb-4">
            Yay! 
          </h1>
          <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-pink-200">
            <p className="text-2xl text-pink-600 font-serif leading-relaxed">
              Ich liebe dich, <br/> 
              <span className="text-4xl font-bold block mt-2 text-red-500 uppercase tracking-widest">Yaren ❤️</span>
            </p>
          </div>
          <p className="mt-8 text-pink-400 italic text-xl">Du bist mein absoluter Lieblingsmensch! ✨</p>
          <div className="mt-6 flex gap-2 text-3xl">
            <span>🌹</span><span>❤️</span><span>🌹</span>
          </div>
        </div>
      )}
    </div>
  );
}
