import Card from "./Card";

export default function MainContent() {
  return (
    <main className="flex-1 p-6 ">
      {/* Welcome Text */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Hespress Project</h1>
        <p>Welcome back!</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
        <Card />
        <Card />
        <Card />

      </div>
    </main>
  );
}
