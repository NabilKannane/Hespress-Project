import React, { useState } from "react";
import Card from "./Card";

export default function CardArticles({ data }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  // Gestion du cas où data est null ou vide
  if (!data || data.length === 0) {
    return (
      <div
        className={`flex-1 p-6 transform duration-1000 ease-in-out`}
      >
        <h1 className="text-xl font-bold text-center">
          Aucune donnée disponible pour afficher les articles.
        </h1>
      </div>
    );
  }


  console.log(data)
  // Découper les articles en pages
  const paginatedArticles = [];
  for (let i = 0; i < data.length; i += itemsPerPage) {
  

    paginatedArticles.push(data.slice(i, i + itemsPerPage));
  }

  console.log("paginatedArticles" , paginatedArticles)

  // Fonction pour aller à la page suivante
  const nextPage = () => {
    if (currentPage < paginatedArticles.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fonction pour aller à la page précédente
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <div className={`flex-1 p-6 transform duration-1000 ease-in-out`}>
      {/* Vérifiez si les données existent */}
      {paginatedArticles.length > 0 ? (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
            {paginatedArticles[currentPage]?.map((article) => (
              <Card
                key={article.post_id}
                id={article.post_id}
                title={article.title}
                date={article.post_date}
                commentsCount={article.comments ? article.comments.length : 0}
                tags={article.tags}
              />
            ))}
          </div>
  
          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-slate-800/70 text-white rounded-xl disabled:bg-transparent transform duration-1000"
            >
              Précédent
            </button>
            <span>
              Page {currentPage + 1} sur {paginatedArticles.length}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === paginatedArticles.length - 1}
              className="px-4 py-2 bg-slate-800/70 text-white rounded-xl disabled:bg-transparent transform duration-1000"
            >
              Suivant
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Aucune donnée disponible</p>
      )}
    </div>
  );

}
