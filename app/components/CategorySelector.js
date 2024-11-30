import React, { useState } from 'react';

const CategorySelector = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['Headlines', 'MostCommented', 'Most view', 'Politics' , 'Economy' , 'Society' , 'Culture' , 'Sports' , 'Mena' , 'International' , 'Media'];

  // Fonction pour gérer le changement de catégorie
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setShowDropdown(false); // Fermer le menu après sélection
  };

  return (
    <div className="relative w-64">
      <div
        className={`transition-all duration-500 transform ${
          showDropdown ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {!showDropdown && (
          <button
            onClick={() => setShowDropdown(true)}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg w-full hover:bg-blue-600 transition duration-700"
            aria-expanded={showDropdown}
            aria-controls="category-dropdown"
          >
            {selectedCategory || 'Scrapping with category'}
          </button>
        )}
      </div>

      <div
        className={`absolute transition-all duration-500 transform ${
          showDropdown
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-4 scale-90 pointer-events-none'
        } w-full shadow-xl`}
      >
        {showDropdown && (
          <select
            autoFocus
            onBlur={() => setShowDropdown(false)} // Ferme le menu si l'utilisateur clique en dehors
            onChange={handleCategoryChange}
            className="w-full p-2 bg-blue-500 text-white rounded-lg focus:outline-none"
            size={categories.length > 4 ? 4 : categories.length} // Permet un scroll si les options sont nombreuses
          >
            {categories.map((category, index) => (
              <option key={index} value={category} className="mt-2">
                {category}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;
