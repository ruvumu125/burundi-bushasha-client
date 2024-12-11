import Button from "../components/Button";
import { useState } from "react";

const Experience = () => {
  const [experience, setExperience] = useState([{}]);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 51 }, (_, i) => currentYear - i);

  const addExperience = (e) => {
    e.preventDefault();
    setExperience((prev) => [...prev, {}]); 
  };

  const removeExperience = (index) => {
    setExperience((prev) => prev.filter((_, i) => i !== index)); 
  };

  return (
    <>
      {experience.map((_, index) => (
        <div key={index} className="border p-4 rounded-md mb-4 relative">
          <button
            onClick={() => removeExperience(index)}
            className="absolute top-2 right-2 text-primary-accent text-sm hover:underline"
          >
            Retire l&apos;Expérience
          </button>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
            <fieldset>
              <legend className="text-sm text-slate-600">Employeur</legend>
              <input
                type="text"
                placeholder="Employeur"
                className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"
                required
              />
            </fieldset>
            <fieldset>
              <legend className="text-sm text-slate-600">Catégorie</legend>
              <select
                name={`category-${index}`}
                id={`category-${index}`}
                className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"
                required
              >
                <option value="" disabled selected>
                  Sélectionner Catégorie
                </option>
                {[
                  "Poste par décret",
                  "Directeur Général/Dir",
                  "Cadre de Direction",
                  "Cadre d'Appui",
                  "Agent",
                  "Contrat à court terme",
                  "Journalier",
                ].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset>
              <legend className="text-sm text-slate-600">
                Poste occupé
              </legend>
              <input
                type="text"
                placeholder="Domaine d'Etude"
                className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"
                required
              />
            </fieldset>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
              {["Année de début", "Année de fin"].map((label, idx) => (
                <fieldset key={idx}>
                  <legend className="text-sm text-slate-600">{label}</legend>
                  <select
                    name={`${label.toLowerCase().replace(/ /g, "-")}-${index}`}
                    id={`${label.toLowerCase().replace(/ /g, "-")}-${index}`}
                    className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"
                    required
                  >
                    <option value="" disabled selected>
                      Séléctioner l&apos;année
                    </option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </fieldset>
              ))}
            </div>
          </div>
        </div>
      ))}
      <Button
        onClick={addExperience}
        className="text-white md:min-w-32 h-10 flex items-center cursor-pointer justify-center md:w-fit w-full mt-3 bg-slate-500 px-10 rounded-md"
      >
        Ajouter Expérience
      </Button>
    </>
  );
};

export default Experience;
