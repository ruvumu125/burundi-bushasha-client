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
        if (index === 0) return; // Prevent deletion of the first school entry
        setSchool((prev) => prev.filter((_, i) => i !== index)); // Remove school by index
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSchool = [...school];
        updatedSchool[index] = { ...updatedSchool[index], [name]: value };
        setSchool(updatedSchool); // Update the state with the new value for the school entry
    };

    return (
        <>
            {school.map((_, index) => (
                <div key={index} className="border p-4 rounded-md mb-4 relative">
                    {index !== 0 && ( // Show the delete button only for entries after the first
                        <button
                            onClick={() => removeSchool(index)}
                            className="absolute top-2 right-2 text-primary-accent text-sm hover:underline"
                        >
                            Retirer l&apos;Etablissement
                        </button>
                    )}
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                        <fieldset>
                            <legend className="text-sm text-slate-600">Etablissement</legend>
                            <input
                                type="text"
                                name={`degrees[${index}].schoolName`}
                                value={degree.schoolName}
                                onChange={handleChange}
                                placeholder="Etablissement"
                                className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"
                            />
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm text-slate-600">Diplôme</legend>
                            <select
                                name={`school-${index}-diploma`}
                                value={school[index]?.diploma || ""}
                                onChange={(e) => handleChange(index, e)}
                                className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"
                            >
                                <option value="" disabled>
                                    Sélectionner Diplôme
                                </option>
                                {["Primaire", "A3", "Secondaire/A4", "Bac+2/A1", "Bac+3/Licence", "Master", "Doctorat"].map(
                                    (diploma) => (
                                        <option key={diploma} value={diploma}>
                                            {diploma}
                                        </option>
                                    )
                                )}
                            </select>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm text-slate-600">Domaine d&apos;Etude</legend>
                            <input
                                type="text"
                                name={`school-${index}-fieldOfStudy`}
                                value={school[index]?.fieldOfStudy || ""}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Domaine d'Etude"
                                className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"
                            />
                        </fieldset>

                        <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                            {["Année de début", "Année de fin"].map((label, idx) => (
                                <fieldset key={idx}>
                                    <legend className="text-sm text-slate-600">{label}</legend>
                                    <select
                                        name={`school-${index}-${label.toLowerCase().replace(/ /g, "-")}`}
                                        value={school[index]?.[label.toLowerCase().replace(/ /g, "-")] || ""}
                                        onChange={(e) => handleChange(index, e)}
                                        className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"
                                    >
                                        <option value="" disabled>
                                            Sélectionner l&apos;année
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
            <button
                onClick={addSchool}
                className="text-white md:min-w-32 h-10 flex items-center cursor-pointer justify-center md:w-fit w-full mt-3 bg-slate-500 px-10 rounded-md"
            >
                Ajouter Etablissement
            </button>
        </>
    );
};


export default School;
