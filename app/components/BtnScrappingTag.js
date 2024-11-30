import React, { useState } from 'react';

const TagInput = () => {
  const [showInput, setShowInput] = useState(false);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleInputChange = (e) => {
    setCurrentTag(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault();
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleBlur = () => {
    if (tags.length === 0) setShowInput(false); // Revenir au bouton si aucun tag n'est ajouté
  };

  const handleSubmit = () => {
    alert(`Tags soumis : ${tags.join(', ')}`);
    setShowInput(false); // Revenir au bouton après soumission
    setTags([]); // Réinitialiser la liste des tags
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="relative w-52">
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
            Scrapping with Tags
          </button>
        )}
      </div>

      <div
        className={`absolute transition-all duration-500 transform ${
          showInput
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-2 scale-90 pointer-events-none'
        } w-full`}
      >
        {showInput && (
          <div className="flex flex-col items-start space-y-2">
            {/* Liste des tags */}
            <div className="flex flex-wrap items-center space-x-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-lg"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => removeTag(index)}
                    className="text-black hover:text-gray-300"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            {/* Champ d'entrée pour ajouter un tag */}
            <input
              type="text"
              placeholder="Add Tag"
              value={currentTag}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="w-full p-2 bg-transparent text-white shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Bouton "OK" */}
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-600 transition duration-500"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagInput;
