"use client";

import React, { useState, FormEvent } from "react";
import { MoonLoader } from "react-spinners";
import Pie from "../components/plots/Pie";
import SimplineChart from "../components/plots/SimplineChart";
import { ArrowUp, ArrowDown, Add } from "iconsax-react";

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
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log(tags);
    if (tags.length === 0) {
      setError("Veuillez ajouter au moins un tag.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://f2a7-102-100-251-42.ngrok-free.app/scrape-and-analyze/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mode: "tag",
            targets: tags,
            pages: 2,
            output_dir: "comments",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("An error occurred with the request.");
      }

      const data: ResponseData = await response.json();
      setResponseData(data);
    } catch (err) {
      setError("An error occurred while sending the data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col mx-28">
        <h1 className="text-2xl capitalize font-bold my-6">Scrap with Tags</h1>

        <section>
          <div className="w-full overflow-x-auto mb-6">
            <div className="flex flex-col w-full bg-slate-900/60 px-8 py-4 rounded-xl">
              <label className="text-xl font-medium text-white mb-4">
                Tags
              </label>
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter a tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="w-full p-2 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500/70 bg-slate-700/40 text-xl text-center"
                />
                <button
                  onClick={handleAddTag}
                  className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700/70 transition duration-500"
                >
                  <Add size="25" color="#d9e3f0" variant="Outline" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center px-3 py-1 bg-slate-500 hover:bg-blue-500/50 transform duration-700 text-white rounded-full"
                  >
                    {tag}
                    <button
                      className="ml-2 text-gray-300 hover:text-red-500"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="w-full flex justify-center">
                {tags.length > 0 && (
                  <button
                    className="bg-blue-700/40 text text-white px-6 py-2 rounded-xl mb-4 w-full mt-8 hover:bg-green-700/70 transition duration-500"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>


        {loading && (
          <div className="flex justify-center items-center h-3/4">
            <MoonLoader color="rgba(43, 88, 209, 1)" />
          </div>
        )}

        {error && (
          <div className="bg-red-500/50 text-red-200 p-6 mt-8 rounded-xl text-center">
            {error}
          </div>
        )}

        {responseData && (
          <>
            {/* Place the rest of your visualization and result components here */}
            <h1 className="text-2xl capitalize font-bold my-6">Results</h1>
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

                <div className="py-20 col-span-3 bg-slate-900/60 rounded-lg flex justify-center">
                  <SimplineChart />
                </div>
                <div className="rounded-xl bg-slate-900/60 shadow-lg ring-1 ring-black/5 flex justify-center">
                  <Pie data={datachart} />
                </div>

                <div className="col-span-2 bg-slate-900/60 rounded-lg text-center p-10">
                  <h1 className="mb-8">Top 3 Best Comments</h1>
                  {getMostReactedComments().map((comment, index) => (
                    <div
                      key={index}
                      className="mb-6 p-4 bg-slate-800  hover:bg-green-400/40  trasnform duration-700 rounded-lg shadow"
                    >
                      <p className="text-white font-semibold">
                        {comment.comment}
                      </p>
                      <p className="text-sm flex justify-center items-center text-gray-400 mt-2">
                        Reactions : {comment.comment_reaction}{" "}
                        {<ArrowUp size="20" color="#4ade80" />}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="col-span-2 bg-slate-900/60 rounded-lg text-center p-10">
                  <h1 className="mb-8">Top 3 Negative Comments</h1>
                  {getTopNegativeComments().map((comment, index) => (
                    <div
                      key={index}
                      className="mb-6 p-4 bg-slate-800 hover:bg-red-400/40 rounded-lg shadow tranform duration-700"
                    >
                      <p className="text-white font-semibold">
                        {comment.comment}
                      </p>
                      <p className="text-sm flex justify-center items-center text-gray-400 mt-2 ">
                        Reactions : {comment.comment_reaction}{" "}
                        {<ArrowDown size="20" color="#ef4444" />}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
