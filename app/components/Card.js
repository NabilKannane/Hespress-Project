export default function Card() {
  return (
    <div>
      {/* Cards */}
      <div class="isolate p-6 rounded-xl bg-slate-900/60 shadow-lg ring-1 ring-black/5">
        <div className="flex justify-between mb-5 ">
          <h2 className="text-ml font-sans text-lime-500">
            Sunday 24 November 2024 -12:23
          </h2>
          <h2 className="text-ml font-thin text-lime-500">Economy</h2>
        </div>
        <h2 className="text-xl font-bold mb-3">
          European Commission continues review of CJEU rulings on Morocco-EU
          agreements
        </h2>
        <p className="font-thin text-gray-400 text-sm">Hespress English</p>
      </div>
    </div>
  );
}
