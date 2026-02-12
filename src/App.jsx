import { useState, useEffect } from "react";

export default function Page() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [yesPressed, setYesPressed] = useState(false);

  // Spiel initialisieren
  useEffect(() => {
    // Wir nehmen die ersten 8 Bilder und verdoppeln sie für die Paare
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4 font-sans text-center">
      {!isGameFinished ? (
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-pink-600">Finde alle Paare! ❤️</h1>
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`w-16 h-16 rounded-lg cursor-pointer transition-all duration-300 transform ${
                  flipped.includes(index) || solved.includes(index) ? 'rotate-y-180' : 'bg-pink-400 shadow-md'
                }`}
                style={{
                  backgroundImage: (flipped.includes(index) || solved.includes(index)) 
                    ? `url(/valentine/tile-${card.imgNum}.png)` 
                    : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: (flipped.includes(index) || solved.includes(index)) ? 'white' : ''
                }}
              />
            ))}
          </div>
        </div>
      ) : !yesPressed ? (
        <div className="animate-in zoom-in duration-500">
          <img src="/valentine/full-image.png" className="w-80 rounded-2xl shadow-2xl mb-8 mx-auto border-8 border-white" />
          <h1 className="text-4xl font-bold text-pink-600 mb-10">Du hast es geschafft mein Herz! ❤️<br/>Will you be my Valentine ?</h1>
          <div className="flex gap-6 justify-center">
             <button className="bg-green-500 text-white px-10 py-4 rounded-full font-bold shadow-lg" onClick={() => setYesPressed(true)}>Yes ❤️</button>
             <button className="bg-red-400 text-white px-8 py-4 rounded-full font-bold opacity-60" onClick={() => alert("Och nööö, klick auf JA! 😉")}>No</button>
          </div>
        </div>
      ) : (
        <div className="animate-in bounce-in duration-1000">
          <h1 className="text-6xl mb-4">🥰</h1>
          <h1 className="text-4xl font-extrabold text-pink-600">Yay! Ich liebe dich Yaren! ❤️</h1>
        </div>
      )}
    </div>
  );
}
