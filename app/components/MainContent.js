import React, { useState } from "react";
import data from "../../data/hespress_data_most_commented.json";
import Card from "./Card";

export default function MainContent({ mymargin }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  // Découper les articles en pages de 6
  const paginatedArticles = [];
  for (let i = 0; i < data.length; i += itemsPerPage) {
    paginatedArticles.push(data.slice(i, i + itemsPerPage));
  }

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
    <div className={`flex-1 p-6 transform duration-1000 ease-in-out ${mymargin}`}>
      {/* Welcome Text */}
      {/* <div className="mb-6 mt-6">
        <h1 className="text-3xl font-bold">HesProject</h1>
        <p className="font-medium mt-2">
          Beyond the Article: Exploring the Power of Reader Reviews.
        </p>
      </div> */}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
        {paginatedArticles[currentPage].map((article) => (
          <Card
            key={article.post_id}
            id={article.post_id}
            date={article.post_date}
            category={article.category}
            title={article.title}
            tag={article.tags}
            commentsCount={article.comments ? article.comments.length : 0}
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


    </div>
  );
}
