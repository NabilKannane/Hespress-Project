"use client";

import React, { useState, FormEvent } from "react";
import { MoonLoader } from "react-spinners";
import { Add } from "iconsax-react";
import Visualization from "../components/Visualization";
import { ResponseData } from '../api/type';
import ErrorCard from "../components/ErrorCard"


const apiUrl = process.env.NEXT_PUBLIC_API_URL;


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
        `${apiUrl!}/scrape-and-analyze`,
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
                  className="w-full p-2 shadow-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/70 bg-slate-700/40 text-xl text-center"
                />
                <button
                  onClick={handleAddTag}
                  className="bg-slate-500 text-white px-4 py-2 rounded-xl hover:bg-blue-700/70 transition duration-500"
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
          <ErrorCard error = {error} />
        )}

        {responseData && (
          <Visualization responseData={responseData} showarticles={false} />
        )}
      </div>
    </div>
  );
}
