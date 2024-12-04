"use client";

import React, { useState, FormEvent } from "react";
import { MoonLoader } from "react-spinners";
import { ResponseData } from '../api/type';
import Visualization from "../components/Visualization";
import ErrorCard from "../components/ErrorCard"
import { AnimatePresence, motion } from "motion/react"


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ArticlePage() {
  const [url, setUrl] = useState<string>("");
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(true); // Section active

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
  
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col mx-28">
        <h1 className="text-2xl capitalize font-bold my-6"
        onClick={() => {
          setShow(!show);
          console.log(show);

        }}
        >Scrap with URL</h1>
        <AnimatePresence>

        {show && <motion.section layout key="modal" animate={{ x: 0, y: 0, opacity: 1 }} initial={{ x: 0, y: -400, opacity: 0 }} exit={{ x: 0, y: -100, opacity: 0 }} >
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
        </motion.section>
        }
        </AnimatePresence>


        {loading ? (
          <div className="flex justify-center items-center h-3/4">
            <MoonLoader color="rgba(43, 88, 209, 1)" />
          </div>
        ) : (
          responseData && (
            <Visualization responseData={responseData} showarticles={false} />
          )
        )}

        {error && (
          <ErrorCard error = {error} />
        )}
      </div>
    </div>
  );
}