import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";

export default function DashboardLayout() {
  return (

<div className="flex h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col ml-28"> {/* Ajout de `ml-20` pour espace après la barre */}
        {/* Header */}
        <Header />

        {/* Main Content */}
        <MainContent />
      </div>
    </div>
 
  );
}
