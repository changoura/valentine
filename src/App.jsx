import { useState, useEffect } from "react";

export default function Page() {
  const [isSolved, setIsSolved] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [yesPressed, setYesPressed] = useState(false);

  // Initialisiere das Puzzle beim Start
  useEffect(() => {
    const initialTiles = Array.from({ length: 9 }, (_, i) => i + 1);
    // Mische die Kacheln zufällig, aber die 9 (Lücke) bleibt am Ende
    const shuffled = [...initialTiles.slice(0, 8).sort(() => Math.random() - 0.5), 9];
    setTiles(shuffled);
  }, []);

  const handleTileClick = (index) => {
    const emptyIndex = tiles.indexOf(9);
    const validMoves = [index - 1, index + 1, index - 3, index + 3];

    if (validMoves.includes(emptyIndex)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);

      // Prüfen, ob gelöst (1 bis 9 in richtiger Reihenfolge)
      if (newTiles.every((tile, i) => tile === i + 1)) {
        setIsSolved(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
      {!isSolved ? (
        <>
          <h1 className="text-2xl font-bold mb-4 text-pink-600 font-serif">Löse das Puzzle für deine Überraschung!</h1>
          <div className="grid grid-cols-3 gap-2 w-72 h-72 bg-white p-2 rounded-lg shadow-xl">
            {tiles.map((tile, index) => (
              <div
                key={index}
                onClick={() => handleTileClick(index)}
                className={`w-20 h-20 border border-pink-200 cursor-pointer rounded-sm ${tile === 9 ? 'bg-pink-50' : ''}`}
                style={tile !== 9 ? {
                  backgroundImage: `url(/valentine/tile-${tile}.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                } : {}}
              />
            ))}
          </div>
          <p className="mt-4 text-pink-400 text-sm italic">Tippe auf ein Teil neben der Lücke, um es zu verschieben.</p>
        </>
      ) : !yesPressed ? (
        <div className="text-center animate-fadeIn">
          <img src="/valentine/full-image.png" className="w-80 rounded-lg shadow-2xl mb-6 mx-auto border-4 border-white" />
          <h1 className="text-4xl font-bold text-pink-600 mb-8">Will you be my Valentine?</h1>
          <div className="flex gap-4 justify-center">
             <button 
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transform transition hover:scale-110 shadow-lg"
                onClick={() => setYesPressed(true)}
             >
               Yes ❤️
             </button>
             <button className="bg-red-400 text-white px-8 py-3 rounded-full font-bold opacity-50 cursor-not-allowed">
               No
             </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-5xl font-bold text-pink-600 animate-bounce">Yay! I love you! ❤️</h1>
          <p className="mt-4 text-xl text-pink-500">Ich freue mich riesig!</p>
        </div>
      )}
    </div>
  );
}
