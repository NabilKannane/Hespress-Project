"use client";

import React, { useState, FormEvent } from "react";
import { MoonLoader } from "react-spinners";
import MainContent from "../components/MainContent";
import Pie from "../components/plots/Pie";
import SimplineChart from "../components/plots/SimplineChart";

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
  const [url, setUrl] = useState<string>("");
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour gérer l'envoi des données
  const handleSubmit = async (event: FormEvent, url: string) => {
    event.preventDefault();
    setLoading(true); // Définir l'état de chargement à true
    setError(null); // Réinitialiser les erreurs

    try {
      const response = await fetch("https://f2a7-102-100-251-42.ngrok-free.app/scrape-and-analyze/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "url",
          targets: [url],
          output_dir: "comments",
        }),
      });

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
    { color: "bg-slate-900/60", text: "Total Comments", value: responseData && responseData.sentiment_statistics ? responseData.sentiment_statistics.total_comments : 0 },
    { color: "bg-green-500/60", text: "Positive Comments", value: responseData && responseData.sentiment_statistics ? responseData.sentiment_statistics.positive_comments : 0 }, // Exemple dynamique
    { color: "bg-gray-500/50", text: "Neutral Comments", value: responseData && responseData.sentiment_statistics ? responseData.sentiment_statistics.neutral_comments : 0 }, // Exemple dynamique
    { color: "bg-red-500/60", text: "Negative Comments", value: responseData && responseData.sentiment_statistics ? responseData.sentiment_statistics.negative_comments : 0 }, // Exemple dynamique
  ];
  
  const datachart = [
    { name: "Positive", value: responseData && responseData.sentiment_statistics ? responseData.sentiment_statistics.positive_comments : 10 },
    { name: "Neutral", value: responseData && responseData.sentiment_statistics ? responseData.sentiment_statistics.neutral_comments : 10 },
    { name: "Negative", value: responseData && responseData.sentiment_statistics ? responseData.sentiment_statistics.negative_comments : 10 },
  ];

  return (
    <>
      {!loading ? (
        <div className="flex h-screen">
          {/* Main Section */}
          <div className="flex-1 flex flex-col mx-28">
            <h1 className="text-2xl capitalize font-bold my-6">
              Scrap with URL
            </h1>

            <section>
            <section>
  <div className="w-full overflow-x-auto mb-6">
    <div className="flex space-x-4">
      <div className="flex flex-col w-full bg-slate-900/60 p-8 rounded-xl">
        <label className="text-xl font-semibold text-white mb-2">URL</label>
        <div>
          
        </div>
        <div className="flex items-center space-x-2" >
            <input
              type="text"
              placeholder="Enter a URL"
              value={url}            
              className="w-full p-2 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500/70 bg-slate-700/40 text-xl text-center"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 w-1/3 rounded-lg hover:bg-blue-700/70 transition duration-500"
            >
              Submit
            </button>
          </div>
      </div>
     
    </div>
  </div>
</section>

            </section>

            <h1 className="text-2xl capitalize font-bold my-6">Visualization</h1>


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

            <div className="col-span-2 bg-slate-900/60 rounded-lg text-center p-10">
            <h1 className="mb-8"> Most commented </h1>

            <div>
           
            </div>

          

            </div>
            <div className="col-span-2 bg-slate-900/60 rounded-lg flex justify-center p-10 ">
              World Cloud Image
            </div>

            <div className="col-span-4  rounded-lg flex justify-center p-10 mb-12" >

            </div>

          </div>
        </div>


            <div className="p-6 rounded-xl bg-slate-900/40 shadow-lg ring-1 ring-black/5 transform duration-1000">
              {/* <MainContent mymargin={urlStats ? "ml-28" : ""} /> */}
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
