import React, {useEffect, useState} from "react";
import Button from "../../components/Button";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import {useAuth} from "../../components/auth/AuthContext.jsx";
import {loginUser, verifyEmail} from "../../utils/apiFunctions/loginApiFunctions.js";

const Login = () => {

  const { token } = useParams();

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("")
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage("");

    try {
      const success = await loginUser(login); // Assume loginUser is your API call for logging in
      if (success) {
        const token = success.access_token;
        const refreshToken = success.refresh_token;
        auth.handleLogin(token);
        navigate("/")


      } else {
        setErrorMessage("E-mail ou mot de passe incorrect. Veuillez réessayer.");
        setIsSaving(false);
      }
    } catch (error) {
      setErrorMessage("An error occurred during login. Please try again.");
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-100 px-3 flex md:flex-row flex-col items-center justify-center">
      <div className="md:w-[455px] w-full bg-white rounded-lg">
        <div className="relative w-full flex flex-col justify-center py-20 md:px-10 px-5">
          <div className="sticky bg-white top-0 left-0 py-2">
            <small>Login /
              <Link to="/" className="pl-1 text-primary-accent">Accueil</Link>
            </small>
          </div>
          <h1 className="text-[2rem] font-bold text-gray-600 mb-4">Login</h1>
          {errorMessage &&
              <div className="mb-3 p-4 bg-red-100 text-red-800 border border-red-400 rounded">
                <span>{errorMessage}</span>
              </div>
          }

          <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 mb-2">
              <label className="text-gray-500 text-sm" htmlFor="username">Nom d&apos;utilisateur</label>
              <input
                  value={login.email}
                  onChange={handleInputChange}
                  id="email"
                  name="email"
                  type="email"
                className={`h-10 bg-gray-100 text-sm text-slate-600 px-4 rounded-md focus:border-primary-color border outline-none`}
              />

            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label className="text-gray-500 text-sm" htmlFor="password">Mot de passe</label>
              <input
                  value={login.password}
                  onChange={handleInputChange}
                  id="password"
                  name="password"
                  type="password"
                className={`h-10 bg-gray-100 px-4 text-sm text-slate-600 rounded-md focus:border-primary-color border outline-none`}
              />

            </div>

            <Link to="#" className="text-primary-accent text-sm">
              Mot de passe oublié?
            </Link>

            <Button
              type="submit"
              className="md:w-fit w-full bg-primary-color px-16"
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
              <span className={`${isSaving ? "opacity-0" : ""}`}>Login</span>
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
