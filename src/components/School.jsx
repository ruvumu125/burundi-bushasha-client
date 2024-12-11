import Button from "../components/Button";
import { useState } from "react";

const School = () => {
  const [school, setSchool] = useState([{}]); // Initialize with an empty object
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 51 }, (_, i) => currentYear - i);

  const addSchool = (e) => {
    e.preventDefault();
    setSchool((prev) => [...prev, {}]); // Add a new school entry
  };

  const removeSchool = (index) => {
    setSchool((prev) => prev.filter((_, i) => i !== index)); // Remove school by index
  };

  return (
    <>
      {school.map((_, index) => (
        <div key={index} className="border p-4 rounded-md mb-4 relative">
          <button
            onClick={() => removeSchool(index)}
            className="absolute top-2 right-2 text-primary-accent text-sm hover:underline"
          >
            Retire l&apos;Etablissement
          </button>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
            <fieldset>
              <legend className="text-sm text-slate-600">Etablissement</legend>
              <input
                type="text"
                placeholder="Etablissement"
                className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"
                required
              />
            </fieldset>
            <fieldset>
              <legend className="text-sm text-slate-600">Diplôme</legend>
              <select
                name={`diploma-${index}`}
                id={`diploma-${index}`}
                className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"
                required
              >
                <option value="" disabled selected>
                  Sélectionner Diplôme
                </option>
                {[
                  "Primaire",
                  "A3",
                  "Secondaire/A4",
                  "Bac+2/A1",
                  "Bac+3/Licence",
                  "Master",
                  "Doctorat",
                ].map((diploma) => (
                  <option key={diploma} value={diploma}>
                    {diploma}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset>
              <legend className="text-sm text-slate-600">
                Domaine d&apos;Etude
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
        onClick={addSchool}
        className="text-white md:min-w-32 h-10 flex items-center cursor-pointer justify-center md:w-fit w-full mt-3 bg-slate-500 px-10 rounded-md"
      >
        Ajouter Etablissement
      </Button>
    </>
  );
};

export default School;
