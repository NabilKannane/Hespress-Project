"use client";

import { use } from "react";
import data from "../../data/hespress_data_most_commented.json";
import Pie from "../components/plots/Pie";
import SimplineChart from "../components/plots/SimplineChart";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Récupérer l'article correspondant à l'ID
  const post = data.find((article) => article.post_id === parseInt(id, 10));

  // Vérification si l'article n'existe pas
  if (!post) {
    return <div className="text-center mt-10">Article non trouvé.</div>;
  }

  // Données de démonstration pour les graphiques
  const datachart = [
    { name: "Positive", value: 81 },
    { name: "Neutral", value: 81 },
    { name: "Negative", value: 81 },
  ];

  // Génération dynamique des cartes
  const visualizationCards = [
    { color: "bg-slate-900/60", text: "Total Comments", value: post.comments.length },
    { color: "bg-green-500/60", text: "Positive Comments", value: 30 }, // Exemple dynamique
    { color: "bg-gray-500/50", text: "Neutral Comments", value: 40 }, // Exemple dynamique
    { color: "bg-red-500/60", text: "Negative Comments", value: 11 }, // Exemple dynamique
  ];

  // Trouver les 3 commentaires les plus populaires
  const topComments = post.comments
    .sort((a, b) => b.comment_reaction - a.comment_reaction) // Trier par réactions décroissantes
    .slice(0, 3); // Prendre les 3 premiers


  return (
    <div className="flex h-screen">
      {/* Main Section */}
      <div className="flex-1 flex flex-col mx-28">
        <h1 className="text-3xl font-bold my-6">Article</h1>

        {/* Article Content */}
        <div className="p-6 rounded-xl bg-slate-900/60 shadow-lg ring-1 ring-black/5">
          <div className="flex justify-between mb-5">
            <h2 className="text-sm font-medium text-blue-500">
              {post.post_date}
            </h2>
            <p className="text-xl font-bold mb-3 text-center">{post.title}</p>
            <h2 className="text-sm font-medium text-blue-500">
              {post.category}
            </h2>
          </div>
          <a
            href={post.post_link}
            className="text-blue-200 text-center w-full font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir l'article
          </a>
        </div>

        <h1 className="text-3xl font-bold my-6">Visualisation</h1>

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
            {topComments.map((comment, index) => (
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
        ))}
            </div>

          

            </div>
            <div className="col-span-2 bg-slate-900/60 rounded-lg flex justify-center p-10 ">
              World Cloud Image
            </div>

            <div className="col-span-4  rounded-lg flex justify-center p-10 mb-12" >

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
