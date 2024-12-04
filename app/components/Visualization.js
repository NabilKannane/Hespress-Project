import React from 'react'
import Pie from "../components/plots/Pie";
import SimplineChart from "../components/plots/SimplineChart";
import CardArticles from "../components/CardArticles";
import { ArrowUp, ArrowDown } from "iconsax-react";


export default function Visualization({ responseData, showarticles }) {


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
        },
        {
            color: "bg-gray-500/50",
            text: "Neutral Comments",
            value:
                responseData && responseData.sentiment_statistics
                    ? responseData.sentiment_statistics.neutral_comments
                    : 0,
        },
        {
            color: "bg-red-500/60",
            text: "Negative Comments",
            value:
                responseData && responseData.sentiment_statistics
                    ? responseData.sentiment_statistics.negative_comments
                    : 0,
        },
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


    return (
        <>
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
                        <SimplineChart data={responseData.time_based_sentiments} />
                    </div>
                    <div className="rounded-xl bg-slate-900/60 shadow-lg ring-1 ring-black/5 flex justify-center">
                        <Pie data={datachart} />
                    </div>

                    <div className="col-span-2 bg-slate-900/60 rounded-xl text-center p-10">
                        <h1 className="mb-8">Top 3 Positive Comments</h1>
                        {getMostReactedComments().map((comment, index) => (
                            <div
                                key={index}
                                className="mb-6 p-4 bg-slate-800  hover:bg-green-400/40  trasnform duration-700 rounded-xl shadow"
                            >
                                <p className="text-white font-semibold">
                                    {comment.comment}
                                </p>
                                <p className="text-sm flex justify-center items-center text-gray-400 mt-2">
                                    Reactions : {comment.comment_reaction} {<ArrowUp size="20" color="#4ade80" />}
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
                                    Reactions : {comment.comment_reaction} {<ArrowDown size="20" color="#ef4444" />}
                                </p>
                            </div>
                        ))}
                    </div>
                    {showarticles ? (
                        <div className="col-span-4 bg-slate-900/70 rounded-xl mb-10">
                            <CardArticles data={responseData ? responseData.most_commented_posts : null} />

                        </div>) : (<div></div>)
                    }

                </div>
            </div>
        </>
    )
}
