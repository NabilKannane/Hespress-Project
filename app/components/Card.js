import Link from "next/link";

export default function Card({
  id,
  date,
  category,
  title,
  tag,
  commentsCount,
}) {
  let num_comments;
  if (commentsCount === 1) {
    num_comments = commentsCount + " comment";
  } else {
    num_comments = commentsCount + " comments";
  }
  return (
    <div>
      {/* Cards */}
      <Link href={`/articles/${id}`}>
        <div className="isolate p-6 min-h-52 rounded-xl bg-slate-900/60 shadow-lg ring-1 ring-black/5 hover:bg-blue-950  transform duration-1000">
          <div className="flex justify-between mb-5 ">
            <h2 className="text-ml font-sans text-blue-500">{date}</h2>
            <h2 className="text-ml font-thin text-white">{category}</h2>
          </div>
          <h2 className="text-xl font-bold mb-3">{title}</h2>

          <h2 className="text-xl text-blue-300 font-bold"> {num_comments} </h2>
          <div>
            {tag.map((tag, index) => (
              <span key={index} className="tfont-thin text-gray-400 text-sm">
                {"#" + tag+" " }
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
