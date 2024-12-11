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
            Vision
          </h1>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 sm:px-0 px-3">
            <img
              src={assets.vision}
              className="sm:max-w-[315px] w-full h-[400px] object-cover rounded-xl"
              alt=""
            />
            <section className="bg-white p-10 rounded-xl">
              <h2 className="font-bold text-gray-700 text-xl mb-3">
                La Vision
              </h2>
              <p className="text-sm text-slate-600">
                BURUNDI BUSHASHA’ est un mouvement de rassemblement de Burundais
                jeunes et moins jeunes qui aspirent à créer un Burundais
                paisible, juste, équitable, prospère et moderne pour tous.
                ‘BURUNDI BUSHASHA’ est en avant une gouvernance qui a pour
                première priorité la promotion de l’emploi et de
                l’entreprenariat des jeunes Burundais, la valorisation de la
                Femme Burundaise et la considération des personnes âgées.
              </p>
            </section>
            <section className="bg-white p-10 rounded-xl">
              <h2 className="font-bold text-gray-700 text-xl my-3">
                Nos valeurs
              </h2>
              <p className="text-sm text-slate-600">
                1. POUR la non-violence verbale et physique <br />
                2. POUR une justice impartiale, juste et correctionnelle <br />
                3. POUR la promotion de l’excellence et la méritocratie <br />
                4. POUR la promotion d’une nouvelle génération de leaders et de
                leadership <br />
                5. CONTRE les régimes militaires et autoritaires <br />
                6. CONTRE toute forme d’exclusion, de discrimination,
                d’injustice <br />
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Fondateur;
