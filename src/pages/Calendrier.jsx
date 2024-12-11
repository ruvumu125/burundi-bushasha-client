import { useState, useEffect } from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { assets } from "../assets/assets";

function Fondateur() {
  const [isVisible, setIsVisible] = useState(true);

  // Handle screen width change to hide or show Sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <>
      <Navbar />
      <div className="w-full flex gap-4 bg-slate-100">
        {isVisible && <Sidebar />}
        <div className="w-full max-w-[1400px] m-auto flex flex-col lg:pr-3 pr-0">
          <div className="w-full h-60 bg-white mt-0 mb-4 lg:rounded-lg rounded-none overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://suetravels.com/wp-content/uploads/2022/08/Burundi-0330-scaled.jpg"
              alt="Community Group"
            />
          </div>
          <h1 className="w-full text-primary-accent text-[2rem] my-4 px-3 lg:px-0 font-bold">
            Calendrier
          </h1>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 sm:px-0 px-3">
            <img
              src={assets.cal}
              className="sm:max-w-[315px] w-full h-[400px] object-cover rounded-xl"
              alt=""
            />
            <section className="bg-white p-10 rounded-xl">
              <h2 className="font-bold text-gray-700 text-xl mb-3">
                Calendrier CENI
              </h2>
              <p className="text-sm text-slate-600">
                Dépôt listes des candidats Députés : 9 au 23 décembre 2024 <br />
                Dépôt listes des candidats Conseillers Communaux : 9 au 18 décembre 2024 <br />
                Dépôt listes des candidats Sénateurs : 5 au 19 mai 2025 <br />
                Dépôt listes des candidats Conseillers de Colline/Quartier : 16 au 25 juin 2024 <br />
              </p>

              <Button className="md:w-fit w-full bg-primary-color rounded-md mt-4 px-10">Télécharger le calendrier</Button>

              
            </section>
            <section className="bg-white p-10 rounded-xl">
              

              <h2 className="font-bold text-gray-700 text-xl my-3">
                Calendrier Burundi Buhire
              </h2>
              <p className="text-sm text-slate-600">
                Envoi des vidéos des candidats avec 20 à 49 parrainages: 13 décembre 2024 <br />
                Envoi des vidéos des candidats avec 50 à 99 parrainages: 14 décembre 2024 <br />
                Envoi des vidéos des candidats avec plus de 100 parrainages: 15 décembre 2024 <br />
                Analyse et vérification du bon voisinage : 13 au 18 décembre 2024 <br />
                Date limite de dépôt dossiers de tous les candidats : 15 décembre 2024 <br />
                Publication des présélectionnés : 17 décembre 2024 <br />
                Compilation des dossiers : 19 décembre 2024 <br />
                Dépôt des listes à la CENI des candidats Communaux: 20 décembre 2024 <br />
                Dépôt des listes à la CENI des candidats Députés: 21 décembre 2024 <br />
              </p>
            </section>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Fondateur;
