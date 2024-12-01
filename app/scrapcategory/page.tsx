"use client";

import React, { useState, FormEvent } from "react";
import { MoonLoader } from "react-spinners";
import MainContent from "../components/MainContent";
import Pie from "../components/plots/Pie";
import SimplineChart from "../components/plots/SimplineChart";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;


// Définir l'interface de la réponse selon la structure réelle de votre API
interface ResponseData {
  [x: string]: any;
  neutral_comments: any;
  positive_comments: any;
  total_comments: any;
  sentiment_statistics: ResponseData | null;
  status: string; // Exemple : statut de la réponse
  data: any; // Vous pouvez typiser cette partie selon la structure de `data` (par exemple, un tableau ou un objet)
}

export default function ArticlePage() {
  
  const [categoryStats, setCategoryStats] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [topicTarget, setTopicTarget] = useState<string>("Headlines");

  const sections: string[] = [
    "Headlines",
    "Most Commented",
    "Most Viewed",
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

  // Fonction pour gérer l'envoi des données
  const handleSubmit = async (event: FormEvent, category: string) => {
    event.preventDefault();
    setTopicTarget(category); // Met à jour la catégorie
    setLoading(true); // Définir l'état de chargement à true
    setError(null); // Réinitialiser les erreurs


    try {
      const response = await fetch(
        `${apiUrl!}/scrape-and-analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mode: "category",
            targets: [category],
            pages: 1,
            output_dir: "comments",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Une erreur s'est produite avec la requête.");
      }

      const data: ResponseData = await response.json(); // Typage des données de la réponse

      // Vérifier si la structure des données correspond
      console.log(data); // Affichez les données dans la console pour voir la structure
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
    }, // Exemple dynamique
    {
      color: "bg-gray-500/50",
      text: "Neutral Comments",
      value:
        responseData && responseData.sentiment_statistics
          ? responseData.sentiment_statistics.neutral_comments
          : 0,
    }, // Exemple dynamique
    {
      color: "bg-red-500/60",
      text: "Negative Comments",
      value:
        responseData && responseData.sentiment_statistics
          ? responseData.sentiment_statistics.negative_comments
          : 0,
    }, // Exemple dynamique
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


  return (
    <>
      {!loading ? (
        <div className="flex h-screen">
          {/* Main Section */}
          <div className="flex-1 flex flex-col mx-24">
            <h1 className="text-2xl capitalize font-medium my-6">
              Scrap with category
            </h1>

            <section>
              {/* Div avec un défilement horizontal et une grille de 4 colonnes et 2 lignes */}
              <div className="w-full overflow-x-auto">
                <div className="grid grid-cols-8 grid-rows-2 gap-4 whitespace-nowrap">
                  {sections.map((section, index) => (
                    <button
                      key={index}
                      className="bg-slate-800/70 p-2 rounded-xl"
                      value={section}
                      onClick={(e) => handleSubmit(e, section.toLowerCase())}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <h1 className="text-2xl capitalize font-bold my-6">
              Visualization
            </h1>

            <div className="min-h-screen ">
              <div className="grid grid-cols-4 gap-6">
                {/* Génération des cartes */}
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

                {/* Graphiques */}
                <div className="py-20 col-span-3 bg-slate-900/60 rounded-lg flex justify-center">
                  <SimplineChart />
                </div>
                <div className="rounded-xl bg-slate-900/60 shadow-lg ring-1 ring-black/5 flex justify-center">
                  <Pie data={datachart} />
                </div>

                <div className="col-span-4 bg-slate-900/60 rounded-lg text-center p-10">
                  <h1 className="mb-8"> Most commented </h1>

                  {/* {topComments.map((comment, index) => (
          <div
            key={comment.comment_id}
            className="p-6 rounded-xl bg-slate-900/60 shadow-lg ring-1 ring-black/5 mb-4 hover:bg-blue-600/70 transform duration-500"
          >
            <p className="text-lg font-bold">#{index + 1} Comment :</p>
            <p className="italic">{comment.comment}</p>
            <p className="text-sm mt-4">
              <span className="font-medium">Réactions :</span> {comment.comment_reaction}
            </p>
            <p className="text-sm">
              <span className="font-medium">Publié le :</span> {comment.comment_timestamp}
            </p>
          </div>
        ))} */}
                  <div></div>
                </div>
              

                <div className="col-span-4  rounded-lg flex justify-center p-10 mb-12"></div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 shadow-lg ring-1 ring-black/5 transform duration-1000">
              <MainContent mymargin={categoryStats ? "ml-28" : ""} />
            </div>
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
