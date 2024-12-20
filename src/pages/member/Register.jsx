import {useEffect, useState} from 'react';
import Button from "../../components/Button";
import { Link } from 'react-router-dom'
import {getNationalities} from "../../utils/apiFunctions/nationalityApiFunctions.js";
import {getCountries} from "../../utils/apiFunctions/countryApiFunctions.js";
import {registerMember} from "../../utils/apiFunctions/memberApiFunctions.js";
import {useGetHeader} from "../../components/useGetHeader.js";

const Register = () => {

    const headers = useGetHeader();
    //get 18 years ago from now
    const today = new Date();
    const date18YearsAgo = new Date(today.setFullYear(today.getFullYear() - 18))
        .toISOString()
        .split('T')[0];

    //saving/update declaration
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const [savingSuccessfull, setSavingSuccessfull] = useState(false)
    const [newMember, setNewMember] = useState({
        "id": 0,
        "memberIdNumber": "0",
        "firstName": "",
        "lastName": "",
        "dateOfBirth": date18YearsAgo,
        "gender": "",
        "nationalityMembers": [
            {
                "id": 0,
                "userId": 0,
                "nationality": {
                    "id": 0
                }
            }
        ],
        "email": "",
        "isEmailVerified": true,
        "phoneNumber": "",
        "whatsappNumber": "",
        "nomUtilisateur": "",
        "password": "",
        "confirmPassword": "",
        "verificationToken": "",
        "memberType": "MEMBRE_SYMPATHISANT",
        "memberGrade": "SUPER_MEMBER",
        "countryOfBirth": {
            "id": 0
        },
        "placeOfBirth": "",
        "isUserActive": true
    })

    //nationalities selection
    const [nationalities, setNationalities] = useState([])
    const [selectedNationalityId, setSelectedNationalityId] = useState('')
    const [selectedFirstNationalityId, setSelectedFirstNationalityId] = useState('')
    const [selectedFirstNationalityName, setSelectedFirstNationalityName] = useState("---Sélectionner une nationalité ---")
    const [selectedSecondNationalityId, setSelectedSecondNationalityId] = useState('')
    const [selectedSecondNationalityName, setSelectedSecondNationalityName] = useState("---Sélectionner une nationalité ---")

    //countries selection
    const [countries, setCountries] = useState([])
    const [selectedCountryId, setSelectedCountryId] = useState('')
    const [selectedCountryName, setSelectedCountryName] = useState("---Sélectionner un pays ---")

    useEffect(() => {
        fetchNationalites()
        fetchCountries()
    }, []);

    const fetchNationalites=() => {
        getNationalities()
            .then((data) => {
                console.log(data);
                setNationalities(data)

            })
            .catch((error) => {
            })
    };

    const fetchCountries=() => {
        getCountries()
            .then((data) => {
                setCountries(data)
                console.log(data)

            })
            .catch((error) => {
            })
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMember((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCountryOfBirthChange = (e) => {
        const { value } = e.target;
        setNewMember((prev) => ({
            ...prev,
            countryOfBirth: {
                ...prev.countryOfBirth,
                id: parseInt(value, 10), // Ensure the value is stored as a number
            },
        }));
    };

    // Handle changes for Nationalité 1
    const handleNationality1Change = (value) => {
        setNewMember((prev) => {
            const updatedNationalities = [...prev.nationalityMembers];
            updatedNationalities[0] = { nationality: { id: parseInt(value, 10) || 0 } }; // Update Nationalité 1
            return {
                ...prev,
                nationalityMembers: updatedNationalities,
            };
        });
    };

    // Handle changes for Nationalité 2 (optional)
    const handleAddOrUpdateNationality2 = (value) => {
        setNewMember((prev) => {
            const updatedNationalities = [...prev.nationalityMembers];
            const nationality2 = parseInt(value, 10);

            // If Nationalité 2 is selected, add/update it; otherwise, remove it if value is empty
            if (nationality2) {
                if (updatedNationalities[1]) {
                    updatedNationalities[1] = { nationality: { id: nationality2 } };
                } else {
                    updatedNationalities.push({ nationality: { id: nationality2 } });
                }
            } else if (updatedNationalities[1]) {
                updatedNationalities.splice(1, 1); // Remove Nationalité 2
            }

            return {
                ...prev,
                nationalityMembers: updatedNationalities,
            };
        });
    };

    // Handle Gender change
    const handleGenderChange = (e) => {
        setNewMember((prev) => ({
            ...prev,
            gender: e.target.value, // Update gender based on selected radio button value
        }));
    };




    const [formValues, setFormValues] = useState({
        lastName: '',
        firstName: '',
        nomUtilisateur: '',
        email: '',
        password: '',
        confirmPassword: '',
        nationality_one: '',
        nationality_two: '',
        genre: '',
        birthDate: '',
        birthPlace: '',
        country: '',
        phoneSMS: '',
        phoneWhatsApp: '',
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true)

        try {

            const success = await registerMember(newMember)

            if (success !== undefined) {
                setNewMember({
                    "id": 0,
                    "memberIdNumber": "",
                    "firstName": "",
                    "lastName": "",
                    "dateOfBirth": date18YearsAgo,
                    "gender": "",
                    "nationalityMembers": [
                        {
                            "id": 0,
                            "userId": 0,
                            "nationality": {
                                "id": 0
                            }
                        }
                    ],
                    "email": "",
                    "isEmailVerified": true,
                    "phoneNumber": "",
                    "whatsappNumber": "",
                    "nomUtilisateur": "",
                    "password": "",
                    "confirmPassword": "",
                    "verificationToken": "",
                    "memberType": "MEMBRE_SYMPATHISANT",
                    "memberGrade": "SUPER_MEMBER",
                    "countryOfBirth": {
                        "id": 0
                    },
                    "placeOfBirth": "",
                    "isUserActive": true
                })
                setErrorMessage("")
                setIsSaving(false)
                setSavingSuccessfull(true);
                setSuccessMessage("Veuillez consulter "+newMember.email+" pour confirmer votre inscription.")
                moveToTop();
            } else {
                setIsSaving(false)
                setSavingSuccessfull(true);
            }
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.errors)
            setIsSaving(false)
            setSavingSuccessfull(false)
            moveToTop()
        }
    };

    const moveToTop = () => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    return (

       <div className="w-full min-h-screen bg-slate-100 md:py-5 py-0 md:px-3 px-0 flex md:flex-row flex-col items-center justify-center">
          <div className="max-w-[1200px] bg-white py-10 md:px-10 px-3 rounded-xl">
            <div className="relative w-full flex flex-col justify-center">
              <div className='sticky bg-white top-0 left-0 py-2'>
                <small>Inscription /
                  <Link to='/' className='pl-1 text-primary-accent'>Accueil</Link>
                </small>
              </div>
              <h1 className='text-[2rem] font-bold text-gray-600 mb-4'>Inscription Membre</h1>
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
              {
                  savingSuccessfull &&(
                      <div className="mt-2 mb-6 p-4 bg-green-100 text-green-800 border border-green-400 rounded flex items-center">

                          <svg
                              className="h-6 w-6 text-green-800 mr-3"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                              />
                          </svg>
                          {/* Message */}
                          <span>{successMessage}</span>
                      </div>
                  )
              }


              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1 mb-2">
                    <label className="text-gray-500 text-sm" htmlFor="firstName">Nom(s)</label>
                    <input
                      type="text"
                      id='firstName'
                      placeholder="Bukuru"
                      name="firstName"
                      value={newMember.firstName}
                      onChange={handleInputChange}
                      className={`h-10 bg-gray-100 text-sm px-4 rounded-md focus:border-primary-color border outline-none`}
                    />

                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <label className="text-gray-500 text-sm" htmlFor="lastName">Prénom(s)</label>
                    <input
                      type="text"
                      id='lastName'
                      placeholder="Jean"
                      name="lastName"
                      value={newMember.lastName}
                      onChange={handleInputChange}
                      className={`h-10 bg-gray-100 text-sm px-4 rounded-md focus:border-primary-color border outline-none`}
                    />

                  </div>
                </div>
                <div className="flex flex-col gap-1 mb-2">
                  <label className="text-gray-500 text-sm" htmlFor="nomUtilisateur">Nom d&apos;utilisateur</label>
                  <input
                    type="text"
                    id='nomUtilisateur'
                    placeholder="iamjohn"
                    name="nomUtilisateur"
                    value={newMember.nomUtilisateur}
                    onChange={handleInputChange}
                    className={`h-10 bg-gray-100 px-4 text-sm rounded-md focus:border-primary-color border outline-none `}
                  />

                </div>
                <div className="flex flex-col gap-1 mb-2">
                  <label className="text-gray-500 text-sm" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id='email'
                    placeholder="Jean@email.com"
                    name="email"
                    value={newMember.email}
                    onChange={handleInputChange}
                    className={`h-10 bg-gray-100 px-4 text-sm rounded-md focus:border-primary-color border outline-none`}
                  />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1 mb-2">
                    <label className="text-gray-500 text-sm" htmlFor="password">Mot de passe</label>
                    <input
                      type="password"
                      id='password'
                      placeholder="********"
                      name="password"
                      value={newMember.password}
                      onChange={handleInputChange}
                      className={`h-10 bg-gray-100 text-sm px-4 rounded-md focus:border-primary-color border outline-none`}
                    />

                  </div>

                  <div className="flex flex-col gap-1 mb-2">
                    <label className="text-gray-500 text-sm" htmlFor="confirmPassword">Confirmer mot de passe</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="********"
                      value={newMember.confirmPassword}
                      onChange={handleInputChange}
                      className={`h-10 bg-gray-100 text-sm px-4 rounded-md focus:border-primary-color border outline-none`}
                    />

                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

                  <div className="flex flex-col gap-1 mb-2">
                    <label className="text-gray-500 text-sm">Nationalité 1</label>

                    <select
                        id="nationality1"
                        name="nationality1"
                        className="h-10 bg-gray-100 text-sm text-gray-600 px-4 rounded-md focus:border-primary-color border outline-none"
                        value={newMember.nationalityMembers[0]?.nationality?.id || ""}
                        onChange={(e) => handleNationality1Change(e.target.value)}>
                      <option value="">---Sélectionner une nationalité ---</option>
                        {
                            nationalities.map((nationality, index) => (
                                <option
                                    key={index}
                                    value={nationality.id}
                                    selected={nationality.id===selectedFirstNationalityId}
                                >{nationality.nationalityName}</option>                                                        ))
                        }
                    </select>
                  </div>

                  <div className="flex flex-col gap-1 mb-2">
                    <label className="text-gray-500 text-sm">Nationalité 2</label>
                    <select
                        id="nationality2"
                        name="nationality2"
                        className="h-10 bg-gray-100 text-sm text-gray-600 px-4 rounded-md focus:border-primary-color border outline-none"
                        value={newMember.nationalityMembers[1]?.nationality?.id || ""}
                        onChange={(e) => handleAddOrUpdateNationality2(e.target.value)}>

                        <option value="">---Sélectionner une nationalité ---</option>
                        {
                            nationalities.map((nationality, index) => (
                                <option
                                    key={index}
                                    value={nationality.id}
                                    selected={nationality.id===selectedSecondNationalityId}
                                >{nationality.nationalityName}</option>                                                        ))
                        }
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-2">
                  <label className="text-gray-500 text-sm">Genre</label>
                  <div className={`flex gap-10 h-10 bg-gray-100 px-4 rounded-md`}>
                    <div className="flex items-center gap-2">
                      <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="MALE"
                          checked={newMember.gender === "MALE"} // Check if "MALE" is selected
                          onChange={handleGenderChange} // Handle change
                          className="h-4 w-4 text-sm" />
                      <label htmlFor="male" className="text-gray-700 text-sm">Homme</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="FEMALE"
                          checked={newMember.gender === "FEMALE"} // Check if "FEMALE" is selected
                          onChange={handleGenderChange} // Handle change
                          className="h-4 w-4 text-sm" />
                      <label htmlFor="female" className="text-gray-700 text-sm">Femme</label>
                    </div>
                  </div>

                </div>
                <div className="flex flex-col gap-1 mb-2">
                  <label className="text-gray-500 text-sm">Date de naissance</label>
                  <input
                  type="date"
                  name="dateOfBirth"
                  value={newMember.dateOfBirth}
                  onChange={handleInputChange}
                  className={`h-10 bg-gray-100 text-gray-600 px-4 rounded-md focus:border-primary-color border outline-none`}/>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1 mb-2">
                    <label className="text-gray-500 text-sm" htmlFor='birthPlace'>Lieu de naissance</label>
                    <input
                      type="text"
                      id='placeOfBirth'
                      placeholder="Mukaza, Bujumbura"
                      name="placeOfBirth"
                      value={newMember.placeOfBirth}
                      onChange={handleInputChange}
                      className={`h-10 bg-gray-100 text-sm px-4 rounded-md focus:border-primary-color border outline-none`}/>

                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <label className="text-gray-500 text-sm">Pays</label>
                    <select
                        id="countryOfBirth"
                        name="countryOfBirth"
                        value={newMember.countryOfBirth?.id || ""} // Bind the current value
                        onChange={handleCountryOfBirthChange} // Handle changes
                        className="h-10 bg-gray-100 text-sm text-gray-600 px-4 rounded-md focus:border-primary-color border outline-none">
                        <option value="">---Sélectionner un pays ---</option>
                        {
                            countries.map((country, index) => (
                                <option
                                    key={index}
                                    value={country.id}
                                    selected={country.id===selectedCountryId}
                                >{country.countryName}</option>                                                        ))
                        }
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-2">
                  <label className="text-gray-500 text-sm">Telephone/SMS</label>
                  <div className="flex gap-2 sm:flex-row flex-col items-center">
                    <select className="w-full h-10 text-sm text-gray-600 bg-gray-100 px-4 rounded-md focus:border-primary-color border outline-none">
                      <option data-countryCode="BI" value="44" selected>Burundi (+257)</option>
                      <optgroup label="Other countries">
                        <option data-countryCode="DZ" value="213">Algeria (+213)</option>
                        <option data-countryCode="AD" value="376">Andorra (+376)</option>
                        <option data-countryCode="AO" value="244">Angola (+244)</option>
                        <option data-countryCode="AI" value="1264">Anguilla (+1264)</option>
                        <option data-countryCode="AG" value="1268">Antigua &amp; Barbuda (+1268)</option>
                        <option data-countryCode="AR" value="54">Argentina (+54)</option>
                        <option data-countryCode="AM" value="374">Armenia (+374)</option>
                        <option data-countryCode="AW" value="297">Aruba (+297)</option>
                        <option data-countryCode="AU" value="61">Australia (+61)</option>
                        <option data-countryCode="AT" value="43">Austria (+43)</option>
                        <option data-countryCode="AZ" value="994">Azerbaijan (+994)</option>
                        <option data-countryCode="BS" value="1242">Bahamas (+1242)</option>
                        <option data-countryCode="BH" value="973">Bahrain (+973)</option>
                        <option data-countryCode="BD" value="880">Bangladesh (+880)</option>
                        <option data-countryCode="BB" value="1246">Barbados (+1246)</option>
                        <option data-countryCode="BY" value="375">Belarus (+375)</option>
                        <option data-countryCode="BE" value="32">Belgium (+32)</option>
                        <option data-countryCode="BZ" value="501">Belize (+501)</option>
                        <option data-countryCode="BJ" value="229">Benin (+229)</option>
                        <option data-countryCode="BM" value="1441">Bermuda (+1441)</option>
                        <option data-countryCode="BT" value="975">Bhutan (+975)</option>
                        <option data-countryCode="BO" value="591">Bolivia (+591)</option>
                        <option data-countryCode="BA" value="387">Bosnia Herzegovina (+387)</option>
                        <option data-countryCode="BW" value="267">Botswana (+267)</option>
                        <option data-countryCode="BR" value="55">Brazil (+55)</option>
                        <option data-countryCode="BN" value="673">Brunei (+673)</option>
                        <option data-countryCode="BG" value="359">Bulgaria (+359)</option>
                        <option data-countryCode="BF" value="226">Burkina Faso (+226)</option>
                        {/* <option data-countryCode="BI" value="257">Burundi (+257)</option> */}
                        <option data-countryCode="KH" value="855">Cambodia (+855)</option>
                        <option data-countryCode="CM" value="237">Cameroon (+237)</option>
                        <option data-countryCode="CA" value="1">Canada (+1)</option>
                        <option data-countryCode="CV" value="238">Cape Verde Islands (+238)</option>
                        <option data-countryCode="KY" value="1345">Cayman Islands (+1345)</option>
                        <option data-countryCode="CF" value="236">Central African Republic (+236)</option>
                        <option data-countryCode="CL" value="56">Chile (+56)</option>
                        <option data-countryCode="CN" value="86">China (+86)</option>
                        <option data-countryCode="CO" value="57">Colombia (+57)</option>
                        <option data-countryCode="KM" value="269">Comoros (+269)</option>
                        <option data-countryCode="CG" value="242">Congo (+242)</option>
                        <option data-countryCode="CK" value="682">Cook Islands (+682)</option>
                        <option data-countryCode="CR" value="506">Costa Rica (+506)</option>
                        <option data-countryCode="HR" value="385">Croatia (+385)</option>
                        <option data-countryCode="CU" value="53">Cuba (+53)</option>
                        <option data-countryCode="CY" value="90392">Cyprus North (+90392)</option>
                        <option data-countryCode="CY" value="357">Cyprus South (+357)</option>
                        <option data-countryCode="CZ" value="42">Czech Republic (+42)</option>
                        <option data-countryCode="DK" value="45">Denmark (+45)</option>
                        <option data-countryCode="DJ" value="253">Djibouti (+253)</option>
                        <option data-countryCode="DM" value="1809">Dominica (+1809)</option>
                        <option data-countryCode="DO" value="1809">Dominican Republic (+1809)</option>
                        <option data-countryCode="EC" value="593">Ecuador (+593)</option>
                        <option data-countryCode="EG" value="20">Egypt (+20)</option>
                        <option data-countryCode="SV" value="503">El Salvador (+503)</option>
                        <option data-countryCode="GQ" value="240">Equatorial Guinea (+240)</option>
                        <option data-countryCode="ER" value="291">Eritrea (+291)</option>
                        <option data-countryCode="EE" value="372">Estonia (+372)</option>
                        <option data-countryCode="ET" value="251">Ethiopia (+251)</option>
                        <option data-countryCode="FK" value="500">Falkland Islands (+500)</option>
                        <option data-countryCode="FO" value="298">Faroe Islands (+298)</option>
                        <option data-countryCode="FJ" value="679">Fiji (+679)</option>
                        <option data-countryCode="FI" value="358">Finland (+358)</option>
                        <option data-countryCode="FR" value="33">France (+33)</option>
                        <option data-countryCode="GF" value="594">French Guiana (+594)</option>
                        <option data-countryCode="PF" value="689">French Polynesia (+689)</option>
                        <option data-countryCode="GA" value="241">Gabon (+241)</option>
                        <option data-countryCode="GM" value="220">Gambia (+220)</option>
                        <option data-countryCode="GE" value="7880">Georgia (+7880)</option>
                        <option data-countryCode="DE" value="49">Germany (+49)</option>
                        <option data-countryCode="GH" value="233">Ghana (+233)</option>
                        <option data-countryCode="GI" value="350">Gibraltar (+350)</option>
                        <option data-countryCode="GR" value="30">Greece (+30)</option>
                        <option data-countryCode="GL" value="299">Greenland (+299)</option>
                        <option data-countryCode="GD" value="1473">Grenada (+1473)</option>
                        <option data-countryCode="GP" value="590">Guadeloupe (+590)</option>
                        <option data-countryCode="GU" value="671">Guam (+671)</option>
                        <option data-countryCode="GT" value="502">Guatemala (+502)</option>
                        <option data-countryCode="GN" value="224">Guinea (+224)</option>
                        <option data-countryCode="GW" value="245">Guinea - Bissau (+245)</option>
                        <option data-countryCode="GY" value="592">Guyana (+592)</option>
                        <option data-countryCode="HT" value="509">Haiti (+509)</option>
                        <option data-countryCode="HN" value="504">Honduras (+504)</option>
                        <option data-countryCode="HK" value="852">Hong Kong (+852)</option>
                        <option data-countryCode="HU" value="36">Hungary (+36)</option>
                        <option data-countryCode="IS" value="354">Iceland (+354)</option>
                        <option data-countryCode="IN" value="91">India (+91)</option>
                        <option data-countryCode="ID" value="62">Indonesia (+62)</option>
                        <option data-countryCode="IR" value="98">Iran (+98)</option>
                        <option data-countryCode="IQ" value="964">Iraq (+964)</option>
                        <option data-countryCode="IE" value="353">Ireland (+353)</option>
                        <option data-countryCode="IL" value="972">Israel (+972)</option>
                        <option data-countryCode="IT" value="39">Italy (+39)</option>
                        <option data-countryCode="JM" value="1876">Jamaica (+1876)</option>
                        <option data-countryCode="JP" value="81">Japan (+81)</option>
                        <option data-countryCode="JO" value="962">Jordan (+962)</option>
                        <option data-countryCode="KZ" value="7">Kazakhstan (+7)</option>
                        <option data-countryCode="KE" value="254">Kenya (+254)</option>
                        <option data-countryCode="KI" value="686">Kiribati (+686)</option>
                        <option data-countryCode="KP" value="850">Korea North (+850)</option>
                        <option data-countryCode="KR" value="82">Korea South (+82)</option>
                        <option data-countryCode="KW" value="965">Kuwait (+965)</option>
                        <option data-countryCode="KG" value="996">Kyrgyzstan (+996)</option>
                        <option data-countryCode="LA" value="856">Laos (+856)</option>
                        <option data-countryCode="LV" value="371">Latvia (+371)</option>
                        <option data-countryCode="LB" value="961">Lebanon (+961)</option>
                        <option data-countryCode="LS" value="266">Lesotho (+266)</option>
                        <option data-countryCode="LR" value="231">Liberia (+231)</option>
                        <option data-countryCode="LY" value="218">Libya (+218)</option>
                        <option data-countryCode="LI" value="417">Liechtenstein (+417)</option>
                        <option data-countryCode="LT" value="370">Lithuania (+370)</option>
                        <option data-countryCode="LU" value="352">Luxembourg (+352)</option>
                        <option data-countryCode="MO" value="853">Macao (+853)</option>
                        <option data-countryCode="MK" value="389">Macedonia (+389)</option>
                        <option data-countryCode="MG" value="261">Madagascar (+261)</option>
                        <option data-countryCode="MW" value="265">Malawi (+265)</option>
                        <option data-countryCode="MY" value="60">Malaysia (+60)</option>
                        <option data-countryCode="MV" value="960">Maldives (+960)</option>
                        <option data-countryCode="ML" value="223">Mali (+223)</option>
                        <option data-countryCode="MT" value="356">Malta (+356)</option>
                        <option data-countryCode="MH" value="692">Marshall Islands (+692)</option>
                        <option data-countryCode="MQ" value="596">Martinique (+596)</option>
                        <option data-countryCode="MR" value="222">Mauritania (+222)</option>
                        <option data-countryCode="YT" value="269">Mayotte (+269)</option>
                        <option data-countryCode="MX" value="52">Mexico (+52)</option>
                        <option data-countryCode="FM" value="691">Micronesia (+691)</option>
                        <option data-countryCode="MD" value="373">Moldova (+373)</option>
                        <option data-countryCode="MC" value="377">Monaco (+377)</option>
                        <option data-countryCode="MN" value="976">Mongolia (+976)</option>
                        <option data-countryCode="MS" value="1664">Montserrat (+1664)</option>
                        <option data-countryCode="MA" value="212">Morocco (+212)</option>
                        <option data-countryCode="MZ" value="258">Mozambique (+258)</option>
                        <option data-countryCode="MN" value="95">Myanmar (+95)</option>
                        <option data-countryCode="NA" value="264">Namibia (+264)</option>
                        <option data-countryCode="NR" value="674">Nauru (+674)</option>
                        <option data-countryCode="NP" value="977">Nepal (+977)</option>
                        <option data-countryCode="NL" value="31">Netherlands (+31)</option>
                        <option data-countryCode="NC" value="687">New Caledonia (+687)</option>
                        <option data-countryCode="NZ" value="64">New Zealand (+64)</option>
                        <option data-countryCode="NI" value="505">Nicaragua (+505)</option>
                        <option data-countryCode="NE" value="227">Niger (+227)</option>
                        <option data-countryCode="NG" value="234">Nigeria (+234)</option>
                        <option data-countryCode="NU" value="683">Niue (+683)</option>
                        <option data-countryCode="NF" value="672">Norfolk Islands (+672)</option>
                        <option data-countryCode="NP" value="670">Northern Marianas (+670)</option>
                        <option data-countryCode="NO" value="47">Norway (+47)</option>
                        <option data-countryCode="OM" value="968">Oman (+968)</option>
                        <option data-countryCode="PW" value="680">Palau (+680)</option>
                        <option data-countryCode="PA" value="507">Panama (+507)</option>
                        <option data-countryCode="PG" value="675">Papua New Guinea (+675)</option>
                        <option data-countryCode="PY" value="595">Paraguay (+595)</option>
                        <option data-countryCode="PE" value="51">Peru (+51)</option>
                        <option data-countryCode="PH" value="63">Philippines (+63)</option>
                        <option data-countryCode="PL" value="48">Poland (+48)</option>
                        <option data-countryCode="PT" value="351">Portugal (+351)</option>
                        <option data-countryCode="PR" value="1787">Puerto Rico (+1787)</option>
                        <option data-countryCode="QA" value="974">Qatar (+974)</option>
                        <option data-countryCode="RE" value="262">Reunion (+262)</option>
                        <option data-countryCode="RO" value="40">Romania (+40)</option>
                        <option data-countryCode="RU" value="7">Russia (+7)</option>
                        <option data-countryCode="RW" value="250">Rwanda (+250)</option>
                        <option data-countryCode="SM" value="378">San Marino (+378)</option>
                        <option data-countryCode="ST" value="239">Sao Tome &amp; Principe (+239)</option>
                        <option data-countryCode="SA" value="966">Saudi Arabia (+966)</option>
                        <option data-countryCode="SN" value="221">Senegal (+221)</option>
                        <option data-countryCode="CS" value="381">Serbia (+381)</option>
                        <option data-countryCode="SC" value="248">Seychelles (+248)</option>
                        <option data-countryCode="SL" value="232">Sierra Leone (+232)</option>
                        <option data-countryCode="SG" value="65">Singapore (+65)</option>
                        <option data-countryCode="SK" value="421">Slovak Republic (+421)</option>
                        <option data-countryCode="SI" value="386">Slovenia (+386)</option>
                        <option data-countryCode="SB" value="677">Solomon Islands (+677)</option>
                        <option data-countryCode="SO" value="252">Somalia (+252)</option>
                        <option data-countryCode="ZA" value="27">South Africa (+27)</option>
                        <option data-countryCode="ES" value="34">Spain (+34)</option>
                        <option data-countryCode="LK" value="94">Sri Lanka (+94)</option>
                        <option data-countryCode="SH" value="290">St. Helena (+290)</option>
                        <option data-countryCode="KN" value="1869">St. Kitts (+1869)</option>
                        <option data-countryCode="SC" value="1758">St. Lucia (+1758)</option>
                        <option data-countryCode="SD" value="249">Sudan (+249)</option>
                        <option data-countryCode="SR" value="597">Suriname (+597)</option>
                        <option data-countryCode="SZ" value="268">Swaziland (+268)</option>
                        <option data-countryCode="SE" value="46">Sweden (+46)</option>
                        <option data-countryCode="CH" value="41">Switzerland (+41)</option>
                        <option data-countryCode="SI" value="963">Syria (+963)</option>
                        <option data-countryCode="TW" value="886">Taiwan (+886)</option>
                        <option data-countryCode="TJ" value="7">Tajikstan (+7)</option>
                        <option data-countryCode="TH" value="66">Thailand (+66)</option>
                        <option data-countryCode="TG" value="228">Togo (+228)</option>
                        <option data-countryCode="TO" value="676">Tonga (+676)</option>
                        <option data-countryCode="TT" value="1868">Trinidad &amp; Tobago (+1868)</option>
                        <option data-countryCode="TN" value="216">Tunisia (+216)</option>
                        <option data-countryCode="TR" value="90">Turkey (+90)</option>
                        <option data-countryCode="TM" value="7">Turkmenistan (+7)</option>
                        <option data-countryCode="TM" value="993">Turkmenistan (+993)</option>
                        <option data-countryCode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option>
                        <option data-countryCode="TV" value="688">Tuvalu (+688)</option>
                        <option data-countryCode="UG" value="256">Uganda (+256)</option>
                        <option data-countryCode="GB" value="44">UK (+44)</option>
                        <option data-countryCode="UA" value="380">Ukraine (+380)</option>
                        <option data-countryCode="AE" value="971">United Arab Emirates (+971)</option>
                        <option data-countryCode="UY" value="598">Uruguay (+598)</option>
                        <option data-countryCode="US" value="1">USA (+1)</option>
                        <option data-countryCode="UZ" value="7">Uzbekistan (+7)</option>
                        <option data-countryCode="VU" value="678">Vanuatu (+678)</option>
                        <option data-countryCode="VA" value="379">Vatican City (+379)</option>
                        <option data-countryCode="VE" value="58">Venezuela (+58)</option>
                        <option data-countryCode="VN" value="84">Vietnam (+84)</option>
                        <option data-countryCode="VG" value="84">Virgin Islands - British (+1284)</option>
                        <option data-countryCode="VI" value="84">Virgin Islands - US (+1340)</option>
                        <option data-countryCode="WF" value="681">Wallis &amp; Futuna (+681)</option>
                        <option data-countryCode="YE" value="969">Yemen (North)(+969)</option>
                        <option data-countryCode="YE" value="967">Yemen (South)(+967)</option>
                        <option data-countryCode="ZM" value="260">Zambia (+260)</option>
                        <option data-countryCode="ZW" value="263">Zimbabwe (+263)</option>
                      </optgroup>
                    </select>
                    <input
                      type="text"
                      placeholder="79 999 999"
                      name="phoneNumber"
                      value={newMember.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full h-10 text-sm text-gray-600 bg-gray-100 px-4 rounded-md focus:border-primary-color border outline-none `}
                    />
                  </div>

                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 text-sm">Telephone/WhatsApp</label>
                  <div className="flex gap-2 sm:flex-row flex-col items-center">
                    <select className="w-full h-10 text-sm text-gray-600 bg-gray-100 px-4 rounded-md focus:border-primary-color border outline-none">
                      <option data-countryCode="BI" value="44" selected>Burundi (+257)</option>
                      <optgroup label="Other countries">
                        <option data-countryCode="DZ" value="213">Algeria (+213)</option>
                        <option data-countryCode="AD" value="376">Andorra (+376)</option>
                        <option data-countryCode="AO" value="244">Angola (+244)</option>
                        <option data-countryCode="AI" value="1264">Anguilla (+1264)</option>
                        <option data-countryCode="AG" value="1268">Antigua &amp; Barbuda (+1268)</option>
                        <option data-countryCode="AR" value="54">Argentina (+54)</option>
                        <option data-countryCode="AM" value="374">Armenia (+374)</option>
                        <option data-countryCode="AW" value="297">Aruba (+297)</option>
                        <option data-countryCode="AU" value="61">Australia (+61)</option>
                        <option data-countryCode="AT" value="43">Austria (+43)</option>
                        <option data-countryCode="AZ" value="994">Azerbaijan (+994)</option>
                        <option data-countryCode="BS" value="1242">Bahamas (+1242)</option>
                        <option data-countryCode="BH" value="973">Bahrain (+973)</option>
                        <option data-countryCode="BD" value="880">Bangladesh (+880)</option>
                        <option data-countryCode="BB" value="1246">Barbados (+1246)</option>
                        <option data-countryCode="BY" value="375">Belarus (+375)</option>
                        <option data-countryCode="BE" value="32">Belgium (+32)</option>
                        <option data-countryCode="BZ" value="501">Belize (+501)</option>
                        <option data-countryCode="BJ" value="229">Benin (+229)</option>
                        <option data-countryCode="BM" value="1441">Bermuda (+1441)</option>
                        <option data-countryCode="BT" value="975">Bhutan (+975)</option>
                        <option data-countryCode="BO" value="591">Bolivia (+591)</option>
                        <option data-countryCode="BA" value="387">Bosnia Herzegovina (+387)</option>
                        <option data-countryCode="BW" value="267">Botswana (+267)</option>
                        <option data-countryCode="BR" value="55">Brazil (+55)</option>
                        <option data-countryCode="BN" value="673">Brunei (+673)</option>
                        <option data-countryCode="BG" value="359">Bulgaria (+359)</option>
                        <option data-countryCode="BF" value="226">Burkina Faso (+226)</option>
                        {/* <option data-countryCode="BI" value="257">Burundi (+257)</option> */}
                        <option data-countryCode="KH" value="855">Cambodia (+855)</option>
                        <option data-countryCode="CM" value="237">Cameroon (+237)</option>
                        <option data-countryCode="CA" value="1">Canada (+1)</option>
                        <option data-countryCode="CV" value="238">Cape Verde Islands (+238)</option>
                        <option data-countryCode="KY" value="1345">Cayman Islands (+1345)</option>
                        <option data-countryCode="CF" value="236">Central African Republic (+236)</option>
                        <option data-countryCode="CL" value="56">Chile (+56)</option>
                        <option data-countryCode="CN" value="86">China (+86)</option>
                        <option data-countryCode="CO" value="57">Colombia (+57)</option>
                        <option data-countryCode="KM" value="269">Comoros (+269)</option>
                        <option data-countryCode="CG" value="242">Congo (+242)</option>
                        <option data-countryCode="CK" value="682">Cook Islands (+682)</option>
                        <option data-countryCode="CR" value="506">Costa Rica (+506)</option>
                        <option data-countryCode="HR" value="385">Croatia (+385)</option>
                        <option data-countryCode="CU" value="53">Cuba (+53)</option>
                        <option data-countryCode="CY" value="90392">Cyprus North (+90392)</option>
                        <option data-countryCode="CY" value="357">Cyprus South (+357)</option>
                        <option data-countryCode="CZ" value="42">Czech Republic (+42)</option>
                        <option data-countryCode="DK" value="45">Denmark (+45)</option>
                        <option data-countryCode="DJ" value="253">Djibouti (+253)</option>
                        <option data-countryCode="DM" value="1809">Dominica (+1809)</option>
                        <option data-countryCode="DO" value="1809">Dominican Republic (+1809)</option>
                        <option data-countryCode="EC" value="593">Ecuador (+593)</option>
                        <option data-countryCode="EG" value="20">Egypt (+20)</option>
                        <option data-countryCode="SV" value="503">El Salvador (+503)</option>
                        <option data-countryCode="GQ" value="240">Equatorial Guinea (+240)</option>
                        <option data-countryCode="ER" value="291">Eritrea (+291)</option>
                        <option data-countryCode="EE" value="372">Estonia (+372)</option>
                        <option data-countryCode="ET" value="251">Ethiopia (+251)</option>
                        <option data-countryCode="FK" value="500">Falkland Islands (+500)</option>
                        <option data-countryCode="FO" value="298">Faroe Islands (+298)</option>
                        <option data-countryCode="FJ" value="679">Fiji (+679)</option>
                        <option data-countryCode="FI" value="358">Finland (+358)</option>
                        <option data-countryCode="FR" value="33">France (+33)</option>
                        <option data-countryCode="GF" value="594">French Guiana (+594)</option>
                        <option data-countryCode="PF" value="689">French Polynesia (+689)</option>
                        <option data-countryCode="GA" value="241">Gabon (+241)</option>
                        <option data-countryCode="GM" value="220">Gambia (+220)</option>
                        <option data-countryCode="GE" value="7880">Georgia (+7880)</option>
                        <option data-countryCode="DE" value="49">Germany (+49)</option>
                        <option data-countryCode="GH" value="233">Ghana (+233)</option>
                        <option data-countryCode="GI" value="350">Gibraltar (+350)</option>
                        <option data-countryCode="GR" value="30">Greece (+30)</option>
                        <option data-countryCode="GL" value="299">Greenland (+299)</option>
                        <option data-countryCode="GD" value="1473">Grenada (+1473)</option>
                        <option data-countryCode="GP" value="590">Guadeloupe (+590)</option>
                        <option data-countryCode="GU" value="671">Guam (+671)</option>
                        <option data-countryCode="GT" value="502">Guatemala (+502)</option>
                        <option data-countryCode="GN" value="224">Guinea (+224)</option>
                        <option data-countryCode="GW" value="245">Guinea - Bissau (+245)</option>
                        <option data-countryCode="GY" value="592">Guyana (+592)</option>
                        <option data-countryCode="HT" value="509">Haiti (+509)</option>
                        <option data-countryCode="HN" value="504">Honduras (+504)</option>
                        <option data-countryCode="HK" value="852">Hong Kong (+852)</option>
                        <option data-countryCode="HU" value="36">Hungary (+36)</option>
                        <option data-countryCode="IS" value="354">Iceland (+354)</option>
                        <option data-countryCode="IN" value="91">India (+91)</option>
                        <option data-countryCode="ID" value="62">Indonesia (+62)</option>
                        <option data-countryCode="IR" value="98">Iran (+98)</option>
                        <option data-countryCode="IQ" value="964">Iraq (+964)</option>
                        <option data-countryCode="IE" value="353">Ireland (+353)</option>
                        <option data-countryCode="IL" value="972">Israel (+972)</option>
                        <option data-countryCode="IT" value="39">Italy (+39)</option>
                        <option data-countryCode="JM" value="1876">Jamaica (+1876)</option>
                        <option data-countryCode="JP" value="81">Japan (+81)</option>
                        <option data-countryCode="JO" value="962">Jordan (+962)</option>
                        <option data-countryCode="KZ" value="7">Kazakhstan (+7)</option>
                        <option data-countryCode="KE" value="254">Kenya (+254)</option>
                        <option data-countryCode="KI" value="686">Kiribati (+686)</option>
                        <option data-countryCode="KP" value="850">Korea North (+850)</option>
                        <option data-countryCode="KR" value="82">Korea South (+82)</option>
                        <option data-countryCode="KW" value="965">Kuwait (+965)</option>
                        <option data-countryCode="KG" value="996">Kyrgyzstan (+996)</option>
                        <option data-countryCode="LA" value="856">Laos (+856)</option>
                        <option data-countryCode="LV" value="371">Latvia (+371)</option>
                        <option data-countryCode="LB" value="961">Lebanon (+961)</option>
                        <option data-countryCode="LS" value="266">Lesotho (+266)</option>
                        <option data-countryCode="LR" value="231">Liberia (+231)</option>
                        <option data-countryCode="LY" value="218">Libya (+218)</option>
                        <option data-countryCode="LI" value="417">Liechtenstein (+417)</option>
                        <option data-countryCode="LT" value="370">Lithuania (+370)</option>
                        <option data-countryCode="LU" value="352">Luxembourg (+352)</option>
                        <option data-countryCode="MO" value="853">Macao (+853)</option>
                        <option data-countryCode="MK" value="389">Macedonia (+389)</option>
                        <option data-countryCode="MG" value="261">Madagascar (+261)</option>
                        <option data-countryCode="MW" value="265">Malawi (+265)</option>
                        <option data-countryCode="MY" value="60">Malaysia (+60)</option>
                        <option data-countryCode="MV" value="960">Maldives (+960)</option>
                        <option data-countryCode="ML" value="223">Mali (+223)</option>
                        <option data-countryCode="MT" value="356">Malta (+356)</option>
                        <option data-countryCode="MH" value="692">Marshall Islands (+692)</option>
                        <option data-countryCode="MQ" value="596">Martinique (+596)</option>
                        <option data-countryCode="MR" value="222">Mauritania (+222)</option>
                        <option data-countryCode="YT" value="269">Mayotte (+269)</option>
                        <option data-countryCode="MX" value="52">Mexico (+52)</option>
                        <option data-countryCode="FM" value="691">Micronesia (+691)</option>
                        <option data-countryCode="MD" value="373">Moldova (+373)</option>
                        <option data-countryCode="MC" value="377">Monaco (+377)</option>
                        <option data-countryCode="MN" value="976">Mongolia (+976)</option>
                        <option data-countryCode="MS" value="1664">Montserrat (+1664)</option>
                        <option data-countryCode="MA" value="212">Morocco (+212)</option>
                        <option data-countryCode="MZ" value="258">Mozambique (+258)</option>
                        <option data-countryCode="MN" value="95">Myanmar (+95)</option>
                        <option data-countryCode="NA" value="264">Namibia (+264)</option>
                        <option data-countryCode="NR" value="674">Nauru (+674)</option>
                        <option data-countryCode="NP" value="977">Nepal (+977)</option>
                        <option data-countryCode="NL" value="31">Netherlands (+31)</option>
                        <option data-countryCode="NC" value="687">New Caledonia (+687)</option>
                        <option data-countryCode="NZ" value="64">New Zealand (+64)</option>
                        <option data-countryCode="NI" value="505">Nicaragua (+505)</option>
                        <option data-countryCode="NE" value="227">Niger (+227)</option>
                        <option data-countryCode="NG" value="234">Nigeria (+234)</option>
                        <option data-countryCode="NU" value="683">Niue (+683)</option>
                        <option data-countryCode="NF" value="672">Norfolk Islands (+672)</option>
                        <option data-countryCode="NP" value="670">Northern Marianas (+670)</option>
                        <option data-countryCode="NO" value="47">Norway (+47)</option>
                        <option data-countryCode="OM" value="968">Oman (+968)</option>
                        <option data-countryCode="PW" value="680">Palau (+680)</option>
                        <option data-countryCode="PA" value="507">Panama (+507)</option>
                        <option data-countryCode="PG" value="675">Papua New Guinea (+675)</option>
                        <option data-countryCode="PY" value="595">Paraguay (+595)</option>
                        <option data-countryCode="PE" value="51">Peru (+51)</option>
                        <option data-countryCode="PH" value="63">Philippines (+63)</option>
                        <option data-countryCode="PL" value="48">Poland (+48)</option>
                        <option data-countryCode="PT" value="351">Portugal (+351)</option>
                        <option data-countryCode="PR" value="1787">Puerto Rico (+1787)</option>
                        <option data-countryCode="QA" value="974">Qatar (+974)</option>
                        <option data-countryCode="RE" value="262">Reunion (+262)</option>
                        <option data-countryCode="RO" value="40">Romania (+40)</option>
                        <option data-countryCode="RU" value="7">Russia (+7)</option>
                        <option data-countryCode="RW" value="250">Rwanda (+250)</option>
                        <option data-countryCode="SM" value="378">San Marino (+378)</option>
                        <option data-countryCode="ST" value="239">Sao Tome &amp; Principe (+239)</option>
                        <option data-countryCode="SA" value="966">Saudi Arabia (+966)</option>
                        <option data-countryCode="SN" value="221">Senegal (+221)</option>
                        <option data-countryCode="CS" value="381">Serbia (+381)</option>
                        <option data-countryCode="SC" value="248">Seychelles (+248)</option>
                        <option data-countryCode="SL" value="232">Sierra Leone (+232)</option>
                        <option data-countryCode="SG" value="65">Singapore (+65)</option>
                        <option data-countryCode="SK" value="421">Slovak Republic (+421)</option>
                        <option data-countryCode="SI" value="386">Slovenia (+386)</option>
                        <option data-countryCode="SB" value="677">Solomon Islands (+677)</option>
                        <option data-countryCode="SO" value="252">Somalia (+252)</option>
                        <option data-countryCode="ZA" value="27">South Africa (+27)</option>
                        <option data-countryCode="ES" value="34">Spain (+34)</option>
                        <option data-countryCode="LK" value="94">Sri Lanka (+94)</option>
                        <option data-countryCode="SH" value="290">St. Helena (+290)</option>
                        <option data-countryCode="KN" value="1869">St. Kitts (+1869)</option>
                        <option data-countryCode="SC" value="1758">St. Lucia (+1758)</option>
                        <option data-countryCode="SD" value="249">Sudan (+249)</option>
                        <option data-countryCode="SR" value="597">Suriname (+597)</option>
                        <option data-countryCode="SZ" value="268">Swaziland (+268)</option>
                        <option data-countryCode="SE" value="46">Sweden (+46)</option>
                        <option data-countryCode="CH" value="41">Switzerland (+41)</option>
                        <option data-countryCode="SI" value="963">Syria (+963)</option>
                        <option data-countryCode="TW" value="886">Taiwan (+886)</option>
                        <option data-countryCode="TJ" value="7">Tajikstan (+7)</option>
                        <option data-countryCode="TH" value="66">Thailand (+66)</option>
                        <option data-countryCode="TG" value="228">Togo (+228)</option>
                        <option data-countryCode="TO" value="676">Tonga (+676)</option>
                        <option data-countryCode="TT" value="1868">Trinidad &amp; Tobago (+1868)</option>
                        <option data-countryCode="TN" value="216">Tunisia (+216)</option>
                        <option data-countryCode="TR" value="90">Turkey (+90)</option>
                        <option data-countryCode="TM" value="7">Turkmenistan (+7)</option>
                        <option data-countryCode="TM" value="993">Turkmenistan (+993)</option>
                        <option data-countryCode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option>
                        <option data-countryCode="TV" value="688">Tuvalu (+688)</option>
                        <option data-countryCode="UG" value="256">Uganda (+256)</option>
                        <option data-countryCode="GB" value="44">UK (+44)</option>
                        <option data-countryCode="UA" value="380">Ukraine (+380)</option>
                        <option data-countryCode="AE" value="971">United Arab Emirates (+971)</option>
                        <option data-countryCode="UY" value="598">Uruguay (+598)</option>
                        <option data-countryCode="US" value="1">USA (+1)</option>
                        <option data-countryCode="UZ" value="7">Uzbekistan (+7)</option>
                        <option data-countryCode="VU" value="678">Vanuatu (+678)</option>
                        <option data-countryCode="VA" value="379">Vatican City (+379)</option>
                        <option data-countryCode="VE" value="58">Venezuela (+58)</option>
                        <option data-countryCode="VN" value="84">Vietnam (+84)</option>
                        <option data-countryCode="VG" value="84">Virgin Islands - British (+1284)</option>
                        <option data-countryCode="VI" value="84">Virgin Islands - US (+1340)</option>
                        <option data-countryCode="WF" value="681">Wallis &amp; Futuna (+681)</option>
                        <option data-countryCode="YE" value="969">Yemen (North)(+969)</option>
                        <option data-countryCode="YE" value="967">Yemen (South)(+967)</option>
                        <option data-countryCode="ZM" value="260">Zambia (+260)</option>
                        <option data-countryCode="ZW" value="263">Zimbabwe (+263)</option>
                      </optgroup>
                    </select>
                    <input
                      type="text"
                      placeholder="79 999 999"
                      name="whatsappNumber"
                      value={newMember.whatsappNumber}
                      onChange={handleInputChange}
                      className={`w-full h-10 text-sm text-gray-600 bg-gray-100 px-4 rounded-md focus:border-primary-color border outline-none`}
                    />

                  </div>

                </div>
                <div className="flex justify-start">
                  <label className="text-gray-500 text-sm font-bold my-4 flex items-start">
                    <input
                        required={true}
                        className="leading-loose text-pink-600 top-0 translate-y-1"
                        type="checkbox" />
                    <small className="ml-2 font-normal text-gray-600 text-left">Accept the
                      <Link to="#"
                        className="text-primary-accent px-2">
                        Terms and Conditions
                      </Link> of the site and the
                      <Link to="#"
                        className="text-primary-accent pl-2">information
                        data policy.
                      </Link>
                    </small>
                  </label>
                </div>
                  <Button
                      type="submit"
                      className="md:w-fit w-full bg-primary-color px-10 relative flex items-center justify-center"
                      disabled={isSaving}>
                      {isSaving && (
                          <svg
                              className="animate-spin h-5 w-5 text-white absolute"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                          >
                              <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                              ></circle>
                              <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                          </svg>
                      )}
                      <span className={`${isSaving ? "opacity-0" : ""}`}>Devenir Membre</span>
                  </Button>
              </form>
            </div>
          </div>
        </div>
    );
};

export default Register;
