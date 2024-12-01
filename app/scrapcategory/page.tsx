"use client";

import React, { useState, FormEvent } from "react";
import { MoonLoader } from "react-spinners";
import MainContent from "../components/MainContent";
import Pie from "../components/plots/Pie";
import SimplineChart from "../components/plots/SimplineChart";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ResponseData {
  [x: string]: any;
  neutral_comments: any;
  positive_comments: any;
  total_comments: any;
  sentiment_statistics: ResponseData | null;
  status: string;
  data: any;
}

export default function ArticlePage() {
  const [categoryStats, setCategoryStats] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [topicTarget, setTopicTarget] = useState<string>("Headlines");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Suivi des catégories sélectionnées

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
    setLoading(true);  // Définir l'état de chargement à true
    setError(null);    // Réinitialiser les erreurs
  
    try {
      const response = await fetch(`${apiUrl!}/scrape-and-analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: section,  // Utilise le nom de la section (par exemple "headlines", "most commented", etc.)
          targets: [""],  // Vous pouvez définir ici des cibles spécifiques si nécessaire
          pages: 1,
          output_dir: "comments",
        }),
      });
  
      if (!response.ok) {
        throw new Error("Une erreur s'est produite avec la requête.");
      }
  
      const data: ResponseData = await response.json();
      setResponseData(data);  // Met à jour les données de la réponse
    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi des données.");
      console.error(err);  // Affiche l'erreur dans la console
    } finally {
      setLoading(false);  // Fin du chargement
    }
  };
  

  const visualizationCards = [
    {
      color: "bg-slate-900/60",
      text: "Total Comments",
      value: responseData && responseData.sentiment_statistics ? responseData.sentiment_statistics.total_comments : 0,
    },
    {
      color: "bg-green-500/60",
      text: "Positive Comments",
      value: responseData && responseData.sentiment_statistics ? responseData.sentiment_statistics.positive_comments : 0,
    },
    {
      color: "bg-gray-500/50",
      text: "Neutral Comments",
      value: responseData && responseData.sentiment_statistics ? responseData.sentiment_statistics.neutral_comments : 0,
    },
    {
      color: "bg-red-500/60",
      text: "Negative Comments",
      value: responseData && responseData.sentiment_statistics ? responseData.sentiment_statistics.negative_comments : 0,
    },
  ];

  const datachart = [
    {
      name: "Positive",
      value: responseData && responseData.sentiment_statistics ? responseData.sentiment_statistics.positive_comments : 10,
    },
    {
      name: "Neutral",
      value: responseData && responseData.sentiment_statistics ? responseData.sentiment_statistics.neutral_comments : 10,
    },
    {
      name: "Negative",
      value: responseData && responseData.sentiment_statistics ? responseData.sentiment_statistics.negative_comments : 10,
    },
  ];

  return (
    <>
      {!loading ? (
        <div className="flex h-screen">
          {/* Main Section */}
          <div className="flex-1 flex flex-col mx-24">
            <h1 className="text-2xl capitalize font-medium my-6">Scrap with category</h1>

            <section>
              {/* Boutons des catégories */}
              <div className="w-full overflow-x-auto">
                <div className="grid grid-cols-3 grid-rows-1 gap-4 whitespace-nowrap mb-4">
                  {sections.map((section, index) => (
                    <button
                      key={index}
                      className={`bg-slate-800/70 p-4 rounded-xl ${
                        topicTarget === section.toLowerCase() ? "bg-blue-600" : ""
                      }`} // Ajout de la couleur si sélectionnée
                      value={section}
                      onClick={(e) => handleSubmit(e)}
                    >
                      {section}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-8 grid-rows-2 gap-4 whitespace-nowrap">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className={`bg-slate-800/70 p-4 rounded-xl ${
                        selectedCategories.includes(category) ? "bg-blue-600" : ""
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
    className={`${
      selectedCategories.length >= 1 ? "bg-blue-700" : "bg-slate-950"
    } text-white p-4 rounded-xl w-full`}
    disabled={selectedCategories.length >= 1 ? false : true} // Désactive le bouton si aucune catégorie n'est sélectionnée
  >
    Scrap Category : {selectedCategories.length}
  </button>
</div>

           

            {responseData && (
              <>
                <h1 className="text-2xl capitalize font-bold my-6">Visualization</h1>

                <div className="min-h-screen">
                  <div className="grid grid-cols-4 gap-6">
                    {/* Génération des cartes */}
                    {visualizationCards.map((card, index) => (
                      <div key={index} className={`p-10 rounded-xl ${card.color} shadow-lg ring-1 ring-black/5`}>
                        <h1 className="font-bold text-6xl">
                          {card.value}
                          <p className="font-normal text-xl mt-4">{card.text}</p>
                        </h1>
                      </div>
                    ))}

                    {/* Graphiques */}
                    <div className="py-20 col-span-3 bg-slate-900/60 rounded-lg flex justify-center">
                      <SimplineChart />
                    </div>
                    <div className="rounded-xl bg-slate-900/60 shadow-lg ring-1 ring-black/5 flex justify-center">
                      <Pie data={datachart} />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-slate-900/40 shadow-lg ring-1 ring-black/5 transform duration-1000">
                  <MainContent mymargin={categoryStats ? "ml-28" : ""} data={responseData} />
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-3/4">
          <MoonLoader color="rgba(43, 88, 209, 1)" />
        </div>
      )}
    </>
  );
}
