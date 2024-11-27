import data from "../../data/hespress_data_most_commented.json"
import Card from "./Card"

export default function MainContent({ marginTop }) {
  return (
    <main className={`flex-1 p-6  ${marginTop} `}>
      {/* Welcome Text */} 
      <div className="mb-6 mt-6">
        <h1 className="text-3xl font-bold ">HesProject</h1>
        <p className="font-medium mt-2">Beyond the Article: Exploring the Power of Reader Reviews.</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
        {data.map((article) => (
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
    </main>
  );
}
