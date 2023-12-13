import React, { useState } from 'react';

const SearchBar = ({ setSearchURL, setSearchCOLOR, onSearch, setPage }) => {
  const [searchValue, setSearchValue] = useState('');
  const [colorValue, setColorValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchURL(searchValue);
    setPage(1);
    onSearch();
  };

  const colorOptions = [
    { value: '', label: 'Sélectionnez une couleur' },
    { value: 'Red', label: 'Rouge' },
    { value: 'Blue', label: 'Bleu' },
    { value: 'Green', label: 'Vert' },
    { value: 'Yellow', label: 'Jaune' },
    { value: 'Black', label: 'Noir' },
    { value: 'White', label: 'Blanc' },
    { value: 'Cream', label: 'Crème' },
    { value: 'Orange', label: 'Orange' },
    { value: 'Pink', label: 'Rose' },
    { value: 'Brown', label: 'Marron' },
    { value: 'Grey', label: 'Gris' },
    { value: 'Purple', label: 'Violet' },
  ];

  const handleColorChange = (event) => {
    setColorValue(event.target.value);
    console.log("Choix d'une nouvelle couleur : ", event.target.value);
  };

  const handleColorClick = () => {
    console.log("Envoi de la requête à l'API");
    setSearchCOLOR(colorValue);
    setPage(1);
    onSearch();
  };

  return (
    <div className="bg-gray-200 p-2 flex flex-wrap items-center justify-between">
      <div className="flex items-center mb-2 md:mb-0 w-full md:w-auto">
        <input
          type="text"
          placeholder="Rechercher par marque ou modèle..."
          className="p-2 w-full md:w-72 rounded border-custom-focus-blue md:mr-2 text-center md:text-left"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button
          onClick={handleSearchClick}
          className="px-1 py-2 mx-0.5 my-1 text-white bg-custom-blue rounded hover:bg-custom-hover-blue disabled:opacity-50"
        >
          Rechercher
        </button>
      </div>
      <div className="flex items-center w-full md:w-auto">
        <select
          value={colorValue}
          onChange={handleColorChange}
          className="p-2 w-full md:w-64 bg-white rounded border-custom-focus-blue md:mr-2 text-center md:text-left"
        >
          {colorOptions.map((color, index) => (
            <option key={index} value={color.value}>
              {color.label}
            </option>
          ))}
        </select>
        <button
          onClick={handleColorClick}
          className="px-1 py-2 mx-0.5 my-1 text-white bg-custom-blue rounded hover:bg-custom-hover-blue disabled:opacity-50"
        >
          Rechercher
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
