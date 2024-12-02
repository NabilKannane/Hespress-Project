"use client";

import React, { useState, FormEvent } from "react";
import { MoonLoader } from "react-spinners";
import MainContent from "../components/MainContent";
import Pie from "../components/plots/Pie";
import SimplineChart from "../components/plots/SimplineChart";
import { ArrowUp , ArrowDown} from "iconsax-react";


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
  const [url, setUrl] = useState<string>("");
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mostReactedComments, setMostReactedComments] = useState([]);

  // Fonction pour gérer l'envoi des données
  const handleSubmit = async (event: FormEvent, url: string) => {
    event.preventDefault();
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
            mode: "url",
            targets: [url],
            output_dir: "comments",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Une erreur s'est produite avec la requête.");
      }

      const data: ResponseData = await response.json(); // Typage des données de la réponse

      // Vérifier si la structure des données correspond
      // console.log(data); // Affichez les données dans la console pour voir la structure
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

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value); // Met à jour l'état de l'URL
  };

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
    const allComments = responseData.scraped_data.flatMap((data) => data.comments);
  
      // Trier les commentaires par 'comment_reaction' (nombre de réactions) décroissant
      const sortedComments = allComments.sort(
        (a, b) => a.comment_reaction - b.comment_reaction
      );
  
    // Retourner les 3 premiers
    return sortedComments.slice(0, 3);
  };
  
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col mx-28">
        <h1 className="text-2xl capitalize font-bold my-6">Scrap with URL</h1>

        <section>
          <div className="w-full overflow-x-auto mb-6">
            <div className="flex space-x-4">
              <div className="flex flex-col w-full bg-slate-900/60 p-8 rounded-xl">
                <label className="text-xl font-semibold text-white mb-2">
                  URL
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Enter a URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full p-2 shadow-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/70 bg-slate-700/40 text-xl text-center"
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 w-1/3 rounded-xl hover:bg-blue-700/70 transition duration-500"
                    onClick={(e)=>handleSubmit(e,url)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center items-center h-3/4">
            <MoonLoader color="rgba(43, 88, 209, 1)" />
          </div>
        ) : (
          responseData && (
            <>
              <h1 className="text-2xl capitalize font-bold my-6">Article</h1>
              <div className="p-6 rounded-xl bg-slate-900/60 shadow-lg ring-1 ring-black/5">
                <div className="flex justify-between mb-5">
                <h2 className="text-sm font-medium text-blue-500">
                    {/* {responseData.scraped_data[0]?.date} */}
                  </h2>
                  <p className="text-xl  font-bold mb-3 text-center">
                    {responseData.scraped_data[0]?.title}
                  </p>
                  <h2 className="text-sm font-medium text-blue-500 ">
                    {responseData.scraped_data[0]?.category}
                  </h2>
                </div>
                <a
                  href={responseData.scraped_data[0]?.post_link}
                  className="text-blue-200 text-center w-full font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir l'article
                </a>
              </div>

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
                </div>
              </div>
            </>
          )
        )}

        {error && (
          <div className="text-red-500 text-center my-4">{error}</div>
        )}
      </div>
    </div>
  );
}