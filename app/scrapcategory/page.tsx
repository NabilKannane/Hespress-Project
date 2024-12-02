"use client";

import React, { useState, FormEvent } from "react";
import { MoonLoader } from "react-spinners";
import MainContent from "../components/MainContent";
import Pie from "../components/plots/Pie";
import SimplineChart from "../components/plots/SimplineChart";
import { ArrowUp, ArrowDown} from "iconsax-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;



interface ResponseData {
  scraped_data: ScrapedData[];
  sentiment_statistics: SentimentStatistics;
  time_based_sentiments: TimeBasedSentiment[];
}

interface ScrapedData {
  post_link: string;
  category: string;
  title: string;
  comments: Comment[];
}

interface Comment {
  post_id: number;
  comment_id: number;
  comment_link_id: string;
  comment: string;
  comment_reaction: number;
  comment_timestamp: string;
}

interface SentimentStatistics {
  total_comments: number;
  positive_comments: number;
  negative_comments: number;
  neutral_comments: number;
  positive_percentage: number;
  negative_percentage: number;
  neutral_percentage: number;
}

interface TimeBasedSentiment {
  time: string;
  Positive: number;
  Neutral: number;
  Negative: number;
}


export default function ArticlePage() {
  const [categoryStats, setCategoryStats] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sectiontarget, setSectiontarget] = useState<string>("");
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
    setSectiontarget("")
  };

  const handleSectionClick = (event: FormEvent,section: string) => {
    console.log(section)
    setSectiontarget(section)
    setSelectedCategories([])
    handleSectionSubmit(event, section)
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
      setResponseData(data); // Met à jour les données de la réponse
    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi des données.");
      console.error(err); // Affiche l'erreur dans la console
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  const visualizationCards = [
    {
      color: "bg-slate-900/60",
      text: "Total Comments",
      value:
        responseData && responseData.sentiment_statistics
          ? responseData.sentiment_statistics.total_comments
          : 0,
    },
    {
      color: "bg-green-500/60",
      text: "Positive Comments",
      value:
        responseData && responseData.sentiment_statistics
          ? responseData.sentiment_statistics.positive_comments
          : 0,
    },
    {
      color: "bg-gray-500/50",
      text: "Neutral Comments",
      value:
        responseData && responseData.sentiment_statistics
          ? responseData.sentiment_statistics.neutral_comments
          : 0,
    },
    {
      color: "bg-red-500/60",
      text: "Negative Comments",
      value:
        responseData && responseData.sentiment_statistics
          ? responseData.sentiment_statistics.negative_comments
          : 0,
    },
  ];

  const datachart = [
    {
      name: "Positive",
      value:
        responseData && responseData.sentiment_statistics
          ? responseData.sentiment_statistics.positive_comments
          : 10,
    },
    {
      name: "Neutral",
      value:
        responseData && responseData.sentiment_statistics
          ? responseData.sentiment_statistics.neutral_comments
          : 10,
    },
    {
      name: "Negative",
      value:
        responseData && responseData.sentiment_statistics
          ? responseData.sentiment_statistics.negative_comments
          : 10,
    },
  ];



  const getMostReactedComments = () => {
    if (responseData?.scraped_data) {
      // Fusionner tous les commentaires de tous les posts
      const allComments = responseData.scraped_data.flatMap(
        (post) => post.comments
      );

      // Trier les commentaires par 'comment_reaction' (nombre de réactions) décroissant
      const sortedComments = allComments.sort(
        (a, b) => b.comment_reaction - a.comment_reaction
      );

      // Retourner les trois premiers commentaires
      return sortedComments.slice(0, 3);
    }

    return [];
  };

  const getTopNegativeComments = () => {
    if (!responseData || !responseData.scraped_data) {
      return [];
    }

    // Collecter tous les commentaires
    const allComments = responseData.scraped_data.flatMap(
      (data) => data.comments
    );

    // Trier les commentaires par 'comment_reaction' (nombre de réactions) décroissant
    const sortedComments = allComments.sort(
      (a, b) => a.comment_reaction - b.comment_reaction
    );

    // Retourner les 3 premiers
    return sortedComments.slice(0, 3);
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
                  onClick={(e)=>handleSectionClick(e,section)}
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
            className={`${selectedCategories.length >= 1
                ? "bg-blue-600"
                : "bg-blue-400/10"
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
          responseData && error && (
            <>
            
              <h1 className="text-2xl capitalize font-bold my-6">
                Visualization
              </h1>
              <div className="min-h-screen ">
                <div className="grid grid-cols-4 gap-6">
                  {visualizationCards.map((card, index) => (
                    <div
                      key={index}
                      className={`p-10 rounded-xl ${card.color} shadow-lg ring-1 ring-black/5`}
                    >
                      <h1 className="font-bold text-6xl">
                        {card.value}
                        <p className="font-normal text-xl mt-4">{card.text}</p>
                      </h1>
                    </div>
                  ))}

                  <div className="py-20 col-span-3 bg-slate-900/60 rounded-xl flex justify-center">
                    <SimplineChart data={responseData.time_based_sentiments}/>
                  </div>
                  <div className="rounded-xl bg-slate-900/60 shadow-lg ring-1 ring-black/5 flex justify-center">
                    <Pie data={datachart} />
                  </div>

                  <div className="col-span-2 bg-slate-900/60 rounded-xl text-center p-10">
                    <h1 className="mb-8">Top 3 Best Comments</h1>
                    {getMostReactedComments().map((comment, index) => (
                      <div
                        key={index}
                        className="mb-6 p-4 bg-slate-800  hover:bg-green-400/40  trasnform duration-700 rounded-xl shadow"
                      >
                        <p className="text-white font-semibold">
                          {comment.comment}
                        </p>
                        <p className="text-sm flex justify-center items-center text-gray-400 mt-2">
                          Reactions : {comment.comment_reaction} {<ArrowUp size="20" color="#4ade80"/>}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="col-span-2 bg-slate-900/60 rounded-xl text-center p-10">
                    <h1 className="mb-8">Top 3 Negative Comments</h1>
                    {getTopNegativeComments().map((comment, index) => (
                      <div
                        key={index}
                        className="mb-6 p-4 bg-slate-800 hover:bg-red-400/40 rounded-xl shadow tranform duration-700"
                      >
                        <p className="text-white font-semibold">
                          {comment.comment}
                        </p>
                        <p className="text-sm flex justify-center items-center text-gray-400 mt-2 ">
                          Reactions : {comment.comment_reaction} {<ArrowDown size="20" color="#ef4444"/>}
                        </p>
                      </div>
                    ))}
                  </div>


                  <MainContent data={responseData}/>

                </div>
              </div>
            </>
          )
        )}

        {error && (
           <div className="bg-red-500/50 text-red-200 p-6 rounded-xl text-center">
           {error}
         </div>
        )}
      </div>
    </div>
  );
}
