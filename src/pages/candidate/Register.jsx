// import { useState } from 'react';
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {getCandidacyFields} from "../../utils/apiFunctions/candidacyFieldApiFunctions.js";
import {upgradeToCandidate} from "../../utils/apiFunctions/memberApiFunctions.js";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";

const AddMem = () => {


  // const headers = useGetHeader();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 51 }, (_, i) => currentYear - i);
  const token = Cookies.get("jwtToken");
  const memberIdNumber=jwtDecode(token).memberIdNumber;
  const username=jwtDecode(token).username;
  const id_user=jwtDecode(token).id;
  const [candidacyField, setCandidacyField] = useState([])

  //saving/update declaration
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [savingSuccessfull, setSavingSuccessfull] = useState(false)
  const [formData, setFormData] = useState({
    id: 0,
    userId: id_user,
    residence: '',
    candidacyFieldCandidateMembers: [
        
    ],
    ethnicity: '',  // Default ethnicity selected
    degrees: [{ id: 0, schoolName: '', memberDegree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
    experience: [{ id: 0, employerName: '', jobCategory: '', jobTitle: '', startDate: '', endDate: '' }],
    politicalHistories: [{ id: 0, politicalOrganisation: '', politicalCategory: '', function: '', startDate: '', endDate: '' }],
    passportPhoto: '',
    identityCardFrontSidePicture: '',
    identityCardBackSidePicture: '',
    certificateOfResidence: '',
    certificateOfRegistration: ''
  });


  useEffect(() => {
    fetchCandidacyFields();
  }, []);

  const fetchCandidacyFields=() => {
    getCandidacyFields()
        .then((data) => {
          setCandidacyField(data)

        })
        .catch((error) => {
        })
  };

  const handleChangefield = (event) => {
    const { id, checked } = event.target;

    setFormData((prevFormData) => {
      // Check if the clicked candidacy field is already in the list
      const updatedCandidacyFields = checked
          ? [
            ...prevFormData.candidacyFieldCandidateMembers,
            { id: 0, candidateId: 0, candidacyField: { id: parseInt(id)} }
          ]
          : prevFormData.candidacyFieldCandidateMembers.filter(
              (candidate) => candidate.candidacyField.id !== parseInt(id)
          );

      return {
        ...prevFormData,
        candidacyFieldCandidateMembers: updatedCandidacyFields,
      };
    });
  };


  // Add a new degree entry
  const addDegree = () => {
    setFormData((prevData) => ({
      ...prevData,
      degrees: [
        ...prevData.degrees,
        { id: 0, schoolName: "", fieldOfStudy: "", startDate: "", endDate: "" },
      ],
    }));
  };

  // Remove a degree entry by index
  const removeDegree = (index) => {
    // Don't remove the last degree entry
    if (formData.degrees.length <= 1) return;

    setFormData((prevData) => {
      const newDegrees = prevData.degrees.filter((_, i) => i !== index);
      return {
        ...prevData,
        degrees: newDegrees,
      };
    });
  };

  // Add a new experience entry
  const addExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        { id: 0, employerName: "", jobCategory: "", jobTitle: "",startDate: "", endDate: "" },
      ],
    }));
  };

  // Remove a experience entry by index
  const removeExperience = (index) => {
    // Don't remove the last degree entry
    if (formData.experience.length <= 1) return;

    setFormData((prevData) => {
      const newExperience = prevData.experience.filter((_, i) => i !== index);
      return {
        ...prevData,
        experience: newExperience,
      };
    });
  };

  // Add a new experience entry
  const addPolitic = () => {
    setFormData((prevData) => ({
      ...prevData,
      politicalHistories: [
        ...prevData.politicalHistories,
        { id: 0, politicalOrganisation: "", politicalCategory: "", function: "",startDate: "", endDate: "" },
      ],
    }));
  };

  // Remove a experience entry by index
  const removePolitic = (index) => {
    // Don't remove the last degree entry
    if (formData.politicalHistories.length <= 1) return;

    setFormData((prevData) => {
      const newPoliticalHistory = prevData.politicalHistories.filter((_, i) => i !== index);
      return {
        ...prevData,
        politicalHistories: newPoliticalHistory,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  // Handle Education input changes
  const handleEducationChange = (e) => {
    const { name, value } = e.target;

    // Match the name to extract the field name, index, and the subField name
    const match = name.match(/degrees\[(\d+)\]\.(\w+)/);
    if (!match) return;

    const [, index, subField] = match;

    setFormData((prevState) => {
      // Ensure degrees is an array and that the index is valid
      const updatedDegrees = [...prevState.degrees];
      if (index >= 0 && index < updatedDegrees.length) {
        updatedDegrees[index] = {
          ...updatedDegrees[index],
          [subField]: value
        };
      }
      return { ...prevState, degrees: updatedDegrees };
    });
  };

  // Handle Experience input changes
  const handleExperienceChange = (e) => {
    const { name, value } = e.target;

    // Match the name to extract the field name, index, and the subField name
    const match = name.match(/experience\[(\d+)\]\.(\w+)/);
    if (!match) return;

    const [, index, subField] = match;

    setFormData((prevState) => {
      // Ensure degrees is an array and that the index is valid
      const updatedExperiences = [...prevState.experience];
      if (index >= 0 && index < updatedExperiences.length) {
        updatedExperiences[index] = {
          ...updatedExperiences[index],
          [subField]: value
        };
      }
      return { ...prevState, experience: updatedExperiences };
    });
  };

  // Handle Experience input changes
  const handlePoliticalHistoryChange = (e) => {
    const { name, value } = e.target;

    // Match the name to extract the field name, index, and the subField name
    const match = name.match(/politicalHistories\[(\d+)\]\.(\w+)/);
    if (!match) return;

    const [, index, subField] = match;

    setFormData((prevState) => {
      // Ensure degrees is an array and that the index is valid
      const updatedPolitical = [...prevState.politicalHistories];
      if (index >= 0 && index < updatedPolitical.length) {
        updatedPolitical[index] = {
          ...updatedPolitical[index],
          [subField]: value
        };
      }
      return { ...prevState, politicalHistories: updatedPolitical };
    });
  };









  // Handle file input changes (for images)
    const handleFileChange = (event) => {
        const { name, files } = event.target;

        if (files && files.length > 0) {
            const file = files[0]; // Access the selected file
            setFormData((prevState) => ({
                ...prevState,
                [name]: file,
            }));
        }
    };


    // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

      try {

          const success = await upgradeToCandidate(formData)

          if (success !== undefined) {

              setErrorMessage("")
              setIsSaving(false)
              setSavingSuccessfull(true);
              setFormData({
                  id: 0,
                  userId: id_user,
                  residence: '',
                  candidacyFieldCandidateMembers: [

                  ],
                  ethnicity: '',  // Default ethnicity selected
                  degrees: [{ id: 0, schoolName: '', memberDegree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
                  experience: [{ id: 0, employerName: '', jobCategory: '', jobTitle: '', startDate: '', endDate: '' }],
                  politicalHistories: [{ id: 0, politicalOrganisation: '', politicalCategory: '', function: '', startDate: '', endDate: '' }],
                  passportPhoto: '',
                  identityCardFrontSidePicture: '',
                  identityCardBackSidePicture: '',
                  certificateOfResidence: '',
                  certificateOfRegistration: ''
              })
              //setSuccessMessage("Veuillez consulter "+newMember.email+" pour confirmer votre inscription.")
              moveToTop();

              // Show success message
              toast.success("Login successful!",{
                  position: "top-right",
                  autoClose: 2500,
                  hideProgressBar: true,
                  closeOnClick:true,
                  pauseOnHover:true,
                  draggable:true,
                  progress:undefined,
                  theme:"colored"
              });

          } else {
              setIsSaving(false)
              setSavingSuccessfull(true);
          }
      } catch (error) {
          console.log(error);
          // setErrorMessage(error.response.data.errors)
          // setIsSaving(false)
          // setSavingSuccessfull(false)
          // moveToTop()
      }
  };

  const moveToTop = () => {
        window.scrollTo(0, 0); // Scroll to the top of the page
  };


  return (
    <div className="w-full min-h-screen bg-slate-100 md:py-5 py-0 md:px-3 px-0 flex md:flex-row flex-col items-center justify-center">
      <div className="max-w-[1200px] bg-white py-10 md:px-10 px-3 rounded-xl">
        <div className="relative w-full flex flex-col justify-center">
          <div className="sticky bg-white top-0 left-0 py-2">
            <small>
              Inscription /
              <Link to="/" className="pl-1 text-primary-accent">
                Accueil
              </Link>
            </small>
          </div>
          <h1 className="text-[2rem] font-bold text-gray-600 mb-4">
            Devenir Candidat
          </h1>
          {
             errorMessage.length>0 &&( <div className="mt-2 mb-6 p-4 bg-red-100 text-red-800 border border-red-400 rounded">
                    <ul className="list-none pl-0">
                        {
                            errorMessage.map((key,index)=>{
                                return(
                                    <li key={index}>{key}</li>
                                )
                            })
                        }
                    </ul>
                </div>)
          }
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <fieldset>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                <input
                  disabled={true}
                  type="text"
                  id="useId"
                  placeholder="User ID"
                  value={memberIdNumber}
                  className={`h-10 bg-gray-100 text-sm px-4 rounded-md focus:border-primary-color border outline-none `}

                />
                <input
                  type="text"
                  disabled={true}
                  id="username"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  className={`h-10 bg-gray-100 text-sm px-4 rounded-md focus:border-primary-color border outline-none `}

                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-lg font-bold text-gray-600 mb-2">
                1. Candidats aux Eléctions
              </legend>

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                {
                  candidacyField.map((candidacy, index) => (
                      <div className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            name="candidacyField"
                            id={candidacy.id}
                            checked={formData.candidacyFieldCandidateMembers.some(
                                (candidate) => candidate.candidacyField.id === candidacy.id
                            )}
                            onChange={handleChangefield}
                        />
                        <label htmlFor={candidacy.id} className="text-gray-600 text-sm">
                          {candidacy.candidacyFieldName}
                        </label>
                      </div>
                  ))
                }
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-lg font-bold text-gray-600 mb-2">
                2. Résidence
              </legend>

              <div className="grid grid-cols-1">
                <input
                    type="text"
                    id="residence"
                    name="residence"
                    placeholder="Mukaza, Bujumbura"
                    value={formData.residence}
                    onChange={handleChange}
                    className={`h-10 bg-gray-100 text-sm px-4 rounded-md focus:border-primary-color border outline-none w-full`}

                />
              </div>

            </fieldset>

            <fieldset>
              <legend className="text-lg font-bold text-gray-600 mb-2">
                4. Education
              </legend>

              {/*Education  section start*/}
              {formData.degrees.map((degree, index) => (
                  <div key={index} className="border p-4 rounded-md mb-4 relative">
                    {index !== 0 && ( // Show the delete button only for entries after the first
                        <button
                            onClick={() => removeDegree(index)}
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
                            value={degree.schoolName || ''}
                            onChange={handleEducationChange}
                            placeholder="Etablissement"
                            className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"
                        />
                      </fieldset>

                      <fieldset>
                        <legend className="text-sm text-slate-600">Diplôme</legend>
                        <select
                            name={`degrees[${index}].memberDegree`}
                            value={degree.memberDegree || ''}
                            onChange={handleEducationChange}
                            className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"
                        >
                          <option value="" disabled>
                            Sélectionner Diplôme
                          </option>
                          <option value="PRIMAIRE">Primaire</option>
                          <option value="A3">A3</option>
                          <option value="SECONDAIRE">Secondaire/A4</option>
                          <option value="A1">Bac+2/A1</option>
                          <option value="BACHELOR">Bac+3/Licence</option>
                          <option value="MASTER">Master</option>
                          <option value="DOCTORATE">Doctorat</option>

                        </select>
                      </fieldset>

                      <fieldset>
                        <legend className="text-sm text-slate-600">Domaine d&apos;Etude</legend>
                        <input
                            type="text"
                            name={`degrees[${index}].fieldOfStudy`}
                            value={degree.fieldOfStudy}
                            onChange={handleEducationChange}
                            placeholder="Domaine d'Etude"
                            className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"
                        />
                      </fieldset>

                      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">

                        <fieldset>
                          <legend className="text-sm text-slate-600">Année de début</legend>
                          <select
                              name={`degrees[${index}].startDate`}
                              value={degree.startDate}
                              onChange={handleEducationChange}
                              className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none">
                              <option value="" disabled>
                                Sélectionner l&apos;année
                              </option>
                              {years.map((year) => (
                                  <option key={year} value={year+"-01"+"-01"}>
                                    {year}
                                  </option>
                              ))}
                          </select>
                        </fieldset>

                        <fieldset>
                          <legend className="text-sm text-slate-600">Année de fin</legend>
                          <select
                              name={`degrees[${index}].endDate`}
                              value={degree.endDate}
                              onChange={handleEducationChange}
                              className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none">
                            <option value="" disabled>
                              Sélectionner l&apos;année
                            </option>
                            {years.map((year) => (
                                <option key={year} value={year+"-01"+"-01"}>
                                  {year}
                                </option>
                            ))}
                          </select>
                        </fieldset>

                      </div>
                    </div>
                  </div>
              ))}
              <button
                  onClick={addDegree}
                  className="text-white md:min-w-32 h-10 flex items-center cursor-pointer justify-center md:w-fit w-full mt-3 bg-slate-500 px-10 rounded-md"
              >
                Ajouter Etablissement
              </button>
              {/*Education section end*/}


            </fieldset>

            <fieldset className="w-full">
              <legend className="text-lg font-bold text-gray-600 mb-2">
                4.Expérience professionelle
              </legend>

              {/*Experience start section*/}
              {formData.experience.map((exp, index) => (
                  <div key={index} className="border p-4 rounded-md mb-4 relative">
                    {index > 0 && ( // Show the remove button only for items after the first
                        <button
                            onClick={() => removeExperience(index)}
                            className="absolute top-2 right-2 text-primary-accent text-sm hover:underline"
                        >
                          Retire l&apos;Expérience
                        </button>
                    )}
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                      <fieldset>
                        <legend className="text-sm text-slate-600">Employeur</legend>
                        <input
                            type="text"
                            placeholder="Employeur"
                            name={`experience[${index}].employerName`}
                            value={exp.employerName}
                            onChange={handleExperienceChange}
                            className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"

                        />
                      </fieldset>
                      <fieldset>
                        <legend className="text-sm text-slate-600">Catégorie</legend>
                        <select
                            name={`experience[${index}].jobCategory`}
                            value={exp.jobCategory || ''}
                            onChange={handleExperienceChange}
                            className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"

                        >
                          <option value="" disabled selected>
                            Sélectionner Catégorie
                          </option>
                          <option value="POST_BY_DECREE">Poste par décret</option>
                          <option value="GENERAL_MANAGER">Directeur Général/Dir</option>
                          <option value="MANAGEMENT_FRAMEWORK">Cadre de Direction</option>
                          <option value="SUPPORT_FRAME">Cadre d'Appui</option>
                          <option value="AGENT">Agent</option>
                          <option value="SHORT_TERM_CONTRACT">Contrat à court terme</option>
                          <option value="DAILY_WORKER">Journalier</option>


                        </select>
                      </fieldset>
                      <fieldset>
                        <legend className="text-sm text-slate-600">Poste occupé</legend>
                        <input
                            type="text"
                            placeholder="Poste occupé"
                            name={`experience[${index}].jobTitle`}
                            value={exp.jobTitle}
                            onChange={handleExperienceChange}
                            className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"

                        />
                      </fieldset>
                      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                        <fieldset>
                          <legend className="text-sm text-slate-600">Année de début</legend>
                          <select
                              name={`experience[${index}].startDate`}
                              value={exp.startDate}
                              onChange={handleExperienceChange}
                              className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none">
                            <option value="" disabled>
                              Sélectionner l&apos;année
                            </option>
                            {years.map((year) => (
                                <option key={year} value={year+"-01"+"-01"}>
                                  {year}
                                </option>
                            ))}
                          </select>
                        </fieldset>

                        <fieldset>
                          <legend className="text-sm text-slate-600">Année de fin</legend>
                          <select
                              name={`experience[${index}].endDate`}
                              value={exp.endDate}
                              onChange={handleExperienceChange}
                              className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none">
                            <option value="" disabled>
                              Sélectionner l&apos;année
                            </option>
                            {years.map((year) => (
                                <option key={year} value={year+"-01"+"-01"}>
                                  {year}
                                </option>
                            ))}
                          </select>
                        </fieldset>
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
              {/*Experience end section*/}

            </fieldset>

            <fieldset>
              <legend className="text-lg font-bold text-gray-600 mb-2">
                5. Appartenance ethnique
              </legend>

              <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
                <div className="flex gap-1">
                  <input
                      type="radio"
                      name="ethnicity"
                      id="umuganwa"
                      value="GANWA"
                      checked={formData.ethnicity === 'GANWA'}
                      onChange={handleChange}
                  />
                  <label htmlFor="umuganwa" className="text-gray-600 text-sm">
                    Umuganwa
                  </label>
                </div>
                <div className="flex gap-1">
                  <input
                      type="radio"
                      name="ethnicity"
                      id="umuhutu"
                      value="HUTU"
                      checked={formData.ethnicity === 'HUTU'}
                      onChange={handleChange}
                  />
                  <label htmlFor="umuhutu" className="text-gray-600 text-sm">
                    Umuhutu
                  </label>
                </div>

                <div className="flex gap-1">
                  <input
                      type="radio"
                      name="ethnicity"
                      id="umututsi"
                      value="TUTSI"
                      checked={formData.ethnicity === 'TUTSI'}
                      onChange={handleChange}
                  />
                  <label htmlFor="umututsi" className="text-gray-600 text-sm">
                    Umututsi
                  </label>
                </div>
                <div className="flex gap-1">
                  <input
                      type="radio"
                      name="ethnicity"
                      id="umutwa"
                      value="TWA"
                      checked={formData.ethnicity === 'TWA'}
                      onChange={handleChange}
                  />
                  <label htmlFor="umutwa" className="text-gray-600 text-sm">
                    Umutwa
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset className="w-full">
              <legend className="text-lg font-bold text-gray-600 mb-2">
                6. Passé politique
              </legend>

              {/*Political history start section*/}
              {formData.politicalHistories.map((political, index) => (
                  <div key={index} className="border p-4 rounded-md mb-4 relative">
                    {/* Button to remove a political experience */}
                    {index !== 0 && ( // Show remove button only if there is more than one item and not for the first one
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
                            name={`politicalHistories[${index}].politicalOrganisation`}
                            value={political.politicalOrganisation}
                            onChange={handlePoliticalHistoryChange}
                            className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"

                        />
                      </fieldset>

                      {/* Political Category */}
                      <fieldset>
                        <legend className="text-sm text-slate-600">
                          Catégorie politique
                        </legend>
                        <select
                            name={`politicalHistories[${index}].politicalCategory`}
                            value={political.politicalCategory || ''}
                            onChange={handlePoliticalHistoryChange}
                            className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none">
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
                            name={`politicalHistories[${index}].function`}
                            value={political.function}
                            onChange={handlePoliticalHistoryChange}
                            className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none"

                        />
                      </fieldset>

                      {/* Start and End Year */}
                      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                        <fieldset>
                          <legend className="text-sm text-slate-600">Année de début</legend>
                          <select
                              name={`politicalHistories[${index}].startDate`}
                              value={political.startDate}
                              onChange={handlePoliticalHistoryChange}
                              className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none">
                            <option value="" disabled>
                              Sélectionner l&apos;année
                            </option>
                            {years.map((year) => (
                                <option key={year} value={year+"-01"+"-01"}>
                                  {year}
                                </option>
                            ))}
                          </select>
                        </fieldset>

                        <fieldset>
                          <legend className="text-sm text-slate-600">Année de fin</legend>
                          <select
                              name={`politicalHistories[${index}].endDate`}
                              value={political.endDate}
                              onChange={handlePoliticalHistoryChange}
                              className="h-10 w-full bg-gray-100 text-gray-700 text-sm px-4 rounded-md focus:border-primary-color border outline-none">
                            <option value="" disabled>
                              Sélectionner l&apos;année
                            </option>
                            {years.map((year) => (
                                <option key={year} value={year+"-01"+"-01"}>
                                  {year}
                                </option>
                            ))}
                          </select>
                        </fieldset>
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
              {/*Political history end section*/}
            </fieldset>

            <fieldset className="w-full">
              <legend className="text-lg font-bold text-gray-600 mb-2">
                7. Téléchargements
              </legend>
              <label
                className="w-full flex justify-center items-center gap-2 text-sm text-gray-600 py-10 rounded-xl border-dashed border"
                htmlFor="cardOne"
              >
                <i className="fi fi-rr-add-image translate-y-0.5"></i> Identité
                1
              </label>
              <input
                  className="hidden"
                  id="cardOne"
                  name="identityCardFrontSidePicture"
                  onChange={handleFileChange}
                  type="file"/>
              <label
                className="w-full flex justify-center items-center gap-2 text-sm text-gray-600 py-10 my-5 rounded-xl border-dashed border"
                htmlFor="cardTwo"
              >
                <i className="fi fi-rr-add-image translate-y-0.5"></i> Identité
                2
              </label>
              <input
                  className="hidden"
                  id="cardTwo"
                  name="identityCardBackSidePicture"
                  onChange={handleFileChange}
                  type="file" />
              <label
                className="w-full flex justify-center items-center gap-2 text-sm text-gray-600 py-10 rounded-xl border-dashed border"
                htmlFor="photo"
              >
                <i className="fi fi-rr-add-image translate-y-0.5"></i> Photo
                passport
              </label>
              <input
                  className="hidden"
                  id="photo"
                  name="passportPhoto"
                  onChange={handleFileChange}
                  type="file" />
              <label
                className="w-full flex justify-center items-center gap-2 text-sm text-gray-600 py-10 mt-5 rounded-xl border-dashed border"
                htmlFor="ceni"
              >
                <i className="fi fi-rr-add-image translate-y-0.5"></i> Bulletin
                d&apos;Inscription CENI
              </label>
              <input
                  className="hidden"
                  id="ceni"
                  name="certificateOfRegistration"
                  onChange={handleFileChange}
                  type="file" />
              <label
                className="w-full flex justify-center items-center gap-2 text-sm text-gray-600 py-10 mt-5 rounded-xl border-dashed border"
                htmlFor="attestation"
              >
                <i className="fi fi-rr-add-image translate-y-0.5"></i>{" "}
                Attestation de Résidence
              </label>
              <input
                  className="hidden"
                  id="attestation"
                  name="certificateOfResidence"
                  onChange={handleFileChange}
                  type="file" />
            </fieldset>

            <div className="flex justify-start">
              <label className="text-gray-500 text-sm font-bold my-4 flex items-start">
                <input
                  className="leading-loose text-pink-600 top-0 translate-y-1"
                  type="checkbox"

                />
                <small className="ml-2 font-normal text-gray-600 text-left">
                  Accept the
                  <Link to="#" className="text-primary-accent px-2">
                    Terms and Conditions
                  </Link>{" "}
                  of the site and the
                  <Link to="#" className="text-primary-accent pl-2">
                    information data policy.
                  </Link>
                </small>
              </label>
            </div>
            <Button type="submit" className="md:w-fit w-full bg-primary-color px-10 relative flex items-center justify-center" disabled={isSaving}>
                  {
                      isSaving && (
                      <svg
                          className="animate-spin h-5 w-5 text-white absolute"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24">

                          <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4">

                          </circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                  )}
                  <span className={`${isSaving ? "opacity-0" : ""}`}>Devenir Candidat</span>
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMem;
