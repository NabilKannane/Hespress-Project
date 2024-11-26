"use client";

import Sidebar from "../../components/Sidebar";
import Header from "../../components//Header";

import { use } from "react";
import data from "../../../data/hespress_data_most_commented.json"; // Importer les données des articles

export default function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Utiliser React.use() pour déballer la promesse

  // Trouver l'article correspondant à l'ID
  const post = data.find((article) => article.post_id === parseInt(id));

  if (!post) {
    return <div>Article non trouvé</div>; // Afficher un message si l'article n'est pas trouvé
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col ml-28 mr-10">
        {/* Header */}
        <Header />
        <h1 className="text-3xl font-bold m-6">Article</h1>
        {/* Article[id] Content */}
        <div className="isolate p-6 rounded-xl bg-slate-900/60 shadow-lg ring-1 ring-black/5">
          <div className="flex justify-between mb-5 ">
            <h2 className="text-ml font-medium text-blue-500">
              {post.post_date}
            </h2>
            <p className="text-xl font-bold mb-3 text-center">{post.title}</p>
            <h2 className="text-ml font-medium text-blue-500">{post.category}</h2>
          </div>

          <a
            href={post.post_link}
            className="text-blue-200 text-center w-full font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            See Article 
          </a>
        </div>

        <h1 className="text-3xl font-bold m-6">Statistics</h1>
      </div>
    </div>
  );
}
