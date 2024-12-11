import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
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
                        Fondateur
                    </h1>
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 sm:px-0 px-3">
                        <img
                            src={assets.profile}
                            className="sm:max-w-[315px] w-full h-[400px] object-cover rounded-xl"
                            alt=""
                        />
                        <section className="bg-white p-10 rounded-xl">
                            <h2 className="font-bold text-gray-700 text-xl mb-3">Information Personelle</h2>
                            <p className="text-sm text-slate-600">
                                Valentin Kaze Kavakure <br />
                                Né le 09 juin 1979 <br />
                                Quartier 3, Ngagara <br />
                                Bujumbura-Maire Burundi<br />
                                Marié Père de 4 enfants <br />
                                Entrepreneur & Fonctionnaire
                            </p>

                            <h2 className="font-bold text-gray-700 text-xl my-3">Vie Politique</h2>
                            <ol className="text-sm text-slate-600">
                                <li>
                                    Candidat Député <br />
                                    aux élections parlementaires de 2010
                                </li>
                                <li>
                                    Candidat Président <br />
                                    aux élections présidentielles de 2020
                                </li>
                            </ol>

                            <h2 className="font-bold text-gray-700 text-xl my-3">Vie Associative</h2>
                            <ol className="text-sm text-slate-600">
                                <li>
                                    Représentant Légal de l’ABSL <br />
                                    A BETTER BURUNDI - BURUNDI BWIZA depuis 2019
                                </li>
                                <li> Président équipe de basketball <br />
                                    MUTANGA UNITED depuis 2012
                                </li>
                            </ol>

                        </section>
                        <section className="bg-white p-10 rounded-xl">
                            <h2 className="font-bold text-gray-700 text-xl mb-3">Éducation/Formation</h2>
                            <ul className="text-sm text-slate-600">
                                <li>1983-1984: École Maternelle, Ngagara Q3</li>
                                <li>1984-1987: École Primaire, Ngagara Q3</li>
                                <li>1987-1989: Primaire Kennedy Lyceum, NY-USA</li>
                                <li>1989-1990: Primaire au Lycée Rochambeau, DC-USA</li>
                                <li>1991-1993: Secondaire au Lycée Rochambeau, DC-USA</li>
                                <li>1994-1996: École Française de Bujumbura</li>
                                <li>1996-1998: Lycée du Saint Esprit, Bujumbura</li>
                                <li>2000-2004: Université du Burundi - Langues Anglaises</li>
                                <li>2001-2005: Université du Burundi - Business Administration</li>
                                <li>2017-2018: Master en Dévelopement en Ligne: Patrimoine et Tourisme</li>
                                <li>2018-Présent: Interprète Français-Anglais</li>
                            </ul>
                        </section>

                        <section className="bg-white p-10 rounded-xl">
                            <h2 className="font-bold text-gray-700 text-xl mb-3">Expérience Professionnelle</h2>
                            <ul className="text-sm text-slate-600">
                                <li>2001-2004: DG Akeza Entertainments</li>
                                <li>Reportage et Montage Photo/Vidéo</li>
                                <li>2004-2006: ONUB - Ressources Humaines</li>
                                <li>Mission Nations Unies, Burundi</li>
                                <li>2007-2008: Directeur Marketing</li>
                                <li>Hotel Top Hill Residence, Kiriri</li>
                                <li>2008-Présent: Cadre de Direction</li>
                                <li>Ministère en charge du Tourisme</li>
                                <li>2008-Présent: PDG Akeza Creations Export Café, Tour Opérateur, Événementiel</li>
                                <li>2018-Présent: COMESA - Institution Régional</li>
                                <li>2021-Présent: Représentant Pays, ABS Belgique</li>
                            </ul>
                        </section>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Fondateur;
