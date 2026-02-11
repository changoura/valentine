import { useState, useEffect } from "react";

export default function Page() {
  const [solvedTiles, setSolvedTiles] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [yesPressed, setYesPressed] = useState(false);
  const [nextExpected, setNextExpected] = useState(1);

  // Die Teile werden hier einmalig gemischt angezeigt
  const [displayOrder] = useState([5, 3, 8, 1, 9, 4, 7, 2, 6]);

  const handleTileClick = (tileNum) => {
    if (tileNum === nextExpected) {
      setSolvedTiles([...solvedTiles, tileNum]);
      setNextExpected(nextExpected + 1);
      
      if (tileNum === 9) {
        setTimeout(() => setIsSolved(true), 500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4 font-sans text-center">
      {!isSolved ? (
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2 text-pink-600">Klick die Teile in der richtigen Reihenfolge an!</h1>
          <p className="mb-6 text-pink-400 text-sm">Finde Teil {nextExpected} von 9</p>
          
          <div className="grid grid-cols-3 gap-3 w-80 h-80 mx-auto bg-white p-4 rounded-3xl shadow-2xl">
            {displayOrder.map((tile) => (
              <div
                key={tile}
                onClick={() => handleTileClick(tile)}
                className={`w-20 h-20 rounded-lg cursor-pointer transition-all duration-300 transform active:scale-90 border-2 
                  ${solvedTiles.includes(tile) ? 'opacity-30 border-green-300 grayscale' : 'border-pink-200 shadow-sm hover:scale-105'}
                `}
                style={{
                  backgroundImage: `url(/valentine/tile-${tile}.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!solvedTiles.includes(tile) && (
                  <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-10 text-white font-bold rounded-lg">
                    {/* Optional: Hier könnte man die Zahl einblenden, wenn es zu schwer ist */}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : !yesPressed ? (
        <div className="animate-in zoom-in duration-500">
          <img src="/valentine/full-image.png" className="w-80 rounded-2xl shadow-2xl mb-8 mx-auto border-8 border-white" />
          <h1 className="text-4xl font-bold text-pink-600 mb-10">Will you be my Valentine?</h1>
          <div className="flex gap-6 justify-center">
             <button 
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-bold transition-all hover:scale-110 shadow-lg"
                onClick={() => setYesPressed(true)}
             >
               Yes ❤️
             </button>
             <button 
                className="bg-red-400 text-white px-8 py-4 rounded-full font-bold opacity-60"
                onClick={() => alert("Klick lieber auf JA! 😉")}
             >
               No
             </button>
          </div>
        </div>
      ) : (
        <div className="animate-in bounce-in duration-1000">
          <h1 className="text-6xl mb-4">💖</h1>
          <h1 className="text-4xl font-extrabold text-pink-600">Yay! I love you! ❤️</h1>
          <p className="mt-4 text-xl text-pink-400 italic">Ich freue mich riesig auf uns!</p>
        </div>
      )}
    </div>
  );
}
