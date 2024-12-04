"use client";

import React, { useState, FormEvent } from "react";
import { MoonLoader } from "react-spinners";
import Visualization from "../components/Visualization";
import { ResponseData } from '../api/type';
import ErrorCard from "../components/ErrorCard"


const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export default function ArticlePage() {
  // const [categoryStats, setCategoryStats] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sectiontarget, setSectiontarget] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const sections: string[] = ["Headlines", "Most Commented", "Most Viewed"];

  const categories = [
    "Politics",
    "Regional",
    "Economy",
    "Society",
    "Art & Culture",
    "Sawt & Soura",
    "Accidents",
    "Sports",
    "Mena",
    "Medias",
    "International",
    "Tamazight",
    "Moroccans of the world",
    "Varieties",
    "Automoto",
  ];

  const handleCategoryClick = (category: string) => {
    // Si la catégorie est déjà sélectionnée, on la retire, sinon on l'ajoute
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((item) => item !== category); // Désélectionner
      } else {
        return [...prevSelectedCategories, category]; // Sélectionner
      }
    });
    setSectiontarget("");
  };

  const handleSectionClick = (event: FormEvent, section: string) => {
    console.log(section);
    setSectiontarget(section);
    setSelectedCategories([]);
    handleSectionSubmit(event, section);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl!}/scrape-and-analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "category",
          targets: selectedCategories,
          pages: 1,
          output_dir: "comments",
        }),
      });

      if (!response.ok) {
        throw new Error("Une erreur s'est produite avec la requête.");
      }

      const data: ResponseData = await response.json();
      setResponseData(data);
    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi des données.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionSubmit = async (event: FormEvent, section: string) => {
    event.preventDefault();
    setLoading(true); // Définir l'état de chargement à true
    setError(null); // Réinitialiser les erreurs

    try {
      const response = await fetch(`${apiUrl!}/scrape-and-analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: section.toLowerCase(), // Utilise le nom de la section (par exemple "headlines", "most commented", etc.)
          targets: [""], // Vous pouvez définir ici des cibles spécifiques si nécessaire
          pages: 1,
          output_dir: "comments",
        }),
      });

      if (!response.ok) {
        throw new Error("Une erreur s'est produite avec la requête.");
      }

      const data: ResponseData = await response.json();
      console.log(response.json());
      setResponseData(data); // Met à jour les données de la réponse
    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi des données.");
      console.error(err); // Affiche l'erreur dans la console
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  return (
    <div className="flex h-screen">
      {/* Main Section */}
      <div className="flex-1 flex flex-col mx-24">
        <h1 className="text-2xl capitalize font-medium my-6">
          Scrap with category
        </h1>

        <section>
          {/* Boutons des sections */}
          <div className="w-full overflow-x-auto">
            <div className="grid grid-cols-3 grid-rows-1 gap-4 whitespace-nowrap mb-4">
              {sections.map((section, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-xl transform duration-700 ${sectiontarget === section
                      ? "bg-green-600/70 text-slate-200"
                      : "bg-slate-800/70"
                    }`} // Ajout de la couleur si sélectionnée
                  value={section}
                  onClick={(e) => handleSectionClick(e, section)}
                >
                  {section}
                </button>
              ))}
            </div>
            <p className="font-medium my-4 ">Categories</p>
            <div className="grid grid-cols-8 grid-rows-2 gap-4 whitespace-nowrap">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-xl transform duration-500 ${selectedCategories.includes(category)
                      ? "bg-blue-700/80 text-blue-300"
                      : "bg-slate-800/70 "
                    }`} // Style activé pour les catégories sélectionnées
                  value={category}
                  onClick={() => handleCategoryClick(category)} // Utilise handleCategoryClick pour gérer la sélection/désélection
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Affichage du bouton seulement si une seule catégorie est sélectionnée */}

        <div className="mt-6">
          <button
            onClick={(e) => handleSubmit(e)} // Assurez-vous que la fonction est appelée
            className={`${selectedCategories.length >= 1 ? "bg-blue-600" : "bg-blue-400/10"
              } text-white p-4 rounded-xl w-full shadow-xl transform duration-700`}
            disabled={selectedCategories.length >= 1 ? false : true} // Désactive le bouton si aucune catégorie n'est sélectionnée
          >
            Scrap Category
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-3/4">
            <MoonLoader color="rgba(43, 88, 209, 1)" />
          </div>
        ) : (
          responseData && <Visualization responseData={responseData} showarticles={true} />
        )}

        {error && (
          <ErrorCard error={error} />
        )}
      </div>
    </div>
  );
}
