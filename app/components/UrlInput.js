import React, { useState } from 'react';

const UrlInput = () => {
  const [showInput, setShowInput] = useState(false);
  const [url, setUrl] = useState('');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleBlur = () => {
    // Si le champ d'entrée est vide, revenir au bouton
    if (!url) setShowInput(false);
  };

  const handleSubmit = () => {
    alert(`URL soumis : ${url}`);
    setShowInput(false); // Revenir au bouton après soumission
    setUrl(''); // Réinitialiser l'input
  };

  return (
    <div className="relative w-64">
      <div
        className={`transition-all duration-500 transform ${
          showInput ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {!showInput && (
          <button
            onClick={() => setShowInput(true)}
            className=" bg-blue-500 px-8 py-3 rounded-lg text-white hover:bg-blue-600 transition duration-500"
          >
            Scrapping with URL
          </button>
        )}
      </div>

      <div
        className={`absolute transition-all duration-500 transform ${
          showInput
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-4 scale-90 pointer-events-none'
        } w-full`}
      >
        {showInput && (
          <div className="flex items-center space-x-2" >
            <input
              type="text"
              placeholder="Entrez une URL"
              value={url}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="w-full p-2 bg-transparent shadow-lg hover:bg-blue-950/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-400"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-500"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlInput;
