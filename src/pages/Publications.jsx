import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Publications() {
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
            Publications
          </h1>
          <div className="w-full grid grid-cols-1 gap-4 lg:pl-0 pl-3 pb-10">
            <Link
              to={
                "https://drive.google.com/file/d/1B5NQWeVF3yI4rWVK3XuZX1S4_54W0SGN/view?usp=drive_link"
              }
              className="w-full p-4 text-slate-700 hover:text-primary-accent bg-white rounded-lg"
            >
              <i className="fi fi-rr-file-pdf inline-block mr-1 translate-y-0.5"></i>
              Décret portant organisation et Fonctionnement CENI_2024.pdf
            </Link>
            <Link
              to={
                "https://drive.google.com/file/d/18YjwvIvA7xYgry2lSCr9oO8jL-zb8RDm/view?usp=drive_link"
              }
              className="w-full p-4 text-slate-700 hover:text-primary-accent bg-white rounded-lg"
            >
              <i className="fi fi-rr-file-pdf inline-block mr-1 translate-y-0.5"></i>
              Constitution du Burundi_2005.pdf
            </Link>
            <Link
              to={
                "https://drive.google.com/file/d/1jwIsU6w9NLSDNi_P1UOswn2uIg2_o6AS/view?usp=drive_link"
              }
              className="w-full p-4 text-slate-700 hover:text-primary-accent bg-white rounded-lg"
            >
              <i className="fi fi-rr-file-pdf inline-block mr-1 translate-y-0.5"></i>
              Constitution du Burundi_7 juin 2018.pdf
            </Link>
            <Link
              to={
                "https://drive.google.com/file/d/1g_tubi7QsJrgFNPVuv0H3HpZ_TowEcAP/view?usp=drive_link"
              }
              className="w-full p-4 text-slate-700 hover:text-primary-accent bg-white rounded-lg"
            >
              <i className="fi fi-rr-file-pdf inline-block mr-1 translate-y-0.5"></i>
              Code Electoral du Burundi_2024.pdf
            </Link>
            <Link
              to={
                "https://drive.google.com/file/d/1uQvzrszUkQ2QRxbsKWovHqa9NKxBI3Bv/view?usp=drive_link"
              }
              className="w-full p-4 text-slate-700 hover:text-primary-accent bg-white rounded-lg"
            >
              <i className="fi fi-rr-file-pdf inline-block mr-1 translate-y-0.5"></i>
              Code Electoral du Burundi_2019.pdf
            </Link>
            <Link
              to={
                "https://drive.google.com/file/d/1o_PinRrRZIgm-Vfbz26W8DkwUANhRV_P/view?usp=drive_link"
              }
              className="w-full p-4 text-slate-700 hover:text-primary-accent bg-white rounded-lg"
            >
              <i className="fi fi-rr-file-pdf inline-block mr-1 translate-y-0.5"></i>
              CENI_Dépôt des insignes des Partis Politiques_Nov 2024.pdf
            </Link>
            <Link
              to={
                "https://drive.google.com/file/d/1FhLoHqiMoHIzCsgV6dq3U7Wq9Uv7IB1G/view?usp=drive_link"
              }
              className="w-full p-4 text-slate-700 hover:text-primary-accent bg-white rounded-lg"
            >
              <i className="fi fi-rr-file-pdf inline-block mr-1 translate-y-0.5"></i>
              CENI_Arretée sur la présentation des candidatures_30 Oct 2024.pdf
            </Link>
            <Link
              to={
                "https://drive.google.com/file/d/1MRc-RuDjfnctGHn6E4WMKPHtUylZ6Usg/view?usp=drive_link"
              }
              className="w-full p-4 text-slate-700 hover:text-primary-accent bg-white rounded-lg"
            >
              <i className="fi fi-rr-file-pdf inline-block mr-1 translate-y-0.5"></i>
              Calendrier-Electoral-Echéance-2025-Fin mandat-envoye.pdf
            </Link>
            <Link
              to={
                "https://drive.google.com/file/d/1PIiRgNnZ1iV-lliPKOCfv6GthCL-0veb/view?usp=drive_link"
              }
              className="w-full p-4 text-slate-700 hover:text-primary-accent bg-white rounded-lg"
            >
              <i className="fi fi-rr-file-pdf inline-block mr-1 translate-y-0.5"></i>
              Transmission et Nomination SG FPN IMBONEZA_26 nov 2024.pdf
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Publications;
