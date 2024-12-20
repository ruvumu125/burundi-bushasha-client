import { useState } from "react";

const Politic = () => {
  // State to manage multiple political experiences
  const [politic, setPolitic] = useState([{ partyName: "", category: "", position: "", startYear: "", endYear: "" }]);

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Generate an array of 51 years, from the current year going back
  const years = Array.from({ length: 51 }, (_, i) => currentYear - i);

  // Function to add a new political experience
  const addPolitic = (e) => {
    e.preventDefault();
    setPolitic((prev) => [
      ...prev,
      { partyName: "", category: "", position: "", startYear: "", endYear: "" },
    ]);
  };

  // Function to remove a specific political experience
  const removePolitic = (index) => {
    setPolitic((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle input change for dynamic form fields
  const handleInputChange = (index, field, value) => {
    const updatedPolitic = [...politic];
    updatedPolitic[index][field] = value;
    setPolitic(updatedPolitic);
  };

  return (
      <>
        {politic.map((entry, index) => (
            <div key={index} className="border p-4 rounded-md mb-4 relative">
              {/* Button to remove a political experience */}
              {politic.length > 1 && index > 0 && ( // Show remove button only if there is more than one item and not for the first one
                  <button
                      type="button"
                      onClick={() => removePolitic(index)}
                      className="absolute top-2 right-2 text-primary-accent text-sm hover:underline"
                  >
                    Retirer le passé politique
                  </button>
              )}

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                {/* Political Party Name */}
                <fieldset>
                  <legend className="text-sm text-slate-600">
                    Nom de la formation politique
                  </legend>
                  <input
                      type="text"
                      placeholder="Nom de la formation politique"
                      value={entry.partyName}
                      onChange={(e) =>
                          handleInputChange(index, "partyName", e.target.value)
                      }
                      className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"

                  />
                </fieldset>

                {/* Political Category */}
                <fieldset>
                  <legend className="text-sm text-slate-600">
                    Catégorie politique
                  </legend>
                  <select
                      name={`category-${index}`}
                      id={`category-${index}`}
                      value={entry.category}
                      onChange={(e) =>
                          handleInputChange(index, "category", e.target.value)
                      }
                      className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"

                  >
                    <option value="" disabled>
                      Sélectionner Catégorie
                    </option>
                    <option value="parti-politique">Parti politique</option>
                    <option value="coalition-politique">Coalition politique</option>
                    <option value="candidat-independant">
                      Candidat indépendant
                    </option>
                  </select>
                </fieldset>

                {/* Position/Responsibilities */}
                <fieldset>
                  <legend className="text-sm text-slate-600">
                    Poste/Responsabilités
                  </legend>
                  <input
                      type="text"
                      placeholder="Poste/Responsabilités"
                      value={entry.position}
                      onChange={(e) =>
                          handleInputChange(index, "position", e.target.value)
                      }
                      className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"

                  />
                </fieldset>

                {/* Start and End Year */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                  {["startYear", "endYear"].map((field, idx) => (
                      <fieldset key={idx}>
                        <legend className="text-sm text-slate-600">
                          {field === "startYear" ? "Année de début" : "Année de fin"}
                        </legend>
                        <select
                            name={`${field}-${index}`}
                            id={`${field}-${index}`}
                            value={entry[field]}
                            onChange={(e) =>
                                handleInputChange(index, field, e.target.value)
                            }
                            className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"

                        >
                          <option value="" disabled>
                            Séléctionner l&apos;année
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

        {/* Add New Political Experience Button */}
        <button
            onClick={addPolitic}
            className="text-white h-10 flex items-center cursor-pointer justify-center mt-3 bg-slate-500 px-10 rounded-md"
        >
          Ajouter le Passé politique
        </button>
      </>
  );
};

export default Politic;
