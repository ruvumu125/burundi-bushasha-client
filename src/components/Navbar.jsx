import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect, useRef, useContext} from 'react';
import PropTypes from 'prop-types';
import { assets } from '../assets/assets';
import Button from './Button';
import Search from './Search';
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {AuthContext} from "./auth/AuthContext.jsx";

function Navbar({ onClick }) {

  const token = Cookies.get("jwtToken");

  const [userRole, setUserRole] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isFan, setIsFan] = useState(false)
  const [search, isSearch] = useState(false)
  const [profileMenu, setProfileMenu] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    auth.handleLogout();

    setUserRole("")
    setIsFan(false);
    navigate("/")
    //window.location.href = "/";
  }

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      iconRef.current &&
      !iconRef.current.contains(event.target)
    ) {
      setProfileMenu(false);
    }
  };

  const searchToggle = () => {
    isSearch((prev) => !prev)
  }

  useEffect(() => {

    if (!token) {
      setIsFan(false);
      setIsLoggedIn(false);
      //return;
    }
    else{
      setIsLoggedIn(true)

      setUserRole(jwtDecode(token).role)

      setIsFan(true)
    }

    const verifyUserRole = () => {

      if (!token) {
        setIsFan(false);
        setIsLoggedIn(false);
        //return;
      }
      setIsLoggedIn(true)

      setUserRole(jwtDecode(token).role)

      setIsFan(true)
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('DOMContentLoaded', verifyUserRole)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('DOMContentLoaded', verifyUserRole)
    };


  }, [isFan]);

  const toggleProfileMenu = () => {
    setProfileMenu((prev) => !prev);
  };

  return (
    <div className="sticky top-0 h-16 flex justify-center items-center bg-white border-b border-slate-100 px-4 z-10">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center lg:gap-5 gap-3">

          <Link to="/">
            <img src={assets.logo} alt="logo" className="w-16" />
          </Link>

          <form className="relative lg:flex items-center hidden gap-2 h-10">
            <input
              className="h-10 pl-10 rounded-full text-[14px] text-slate-500 bg-slate-100 focus:border-primary-color border border-slate-200 outline-none"
              type="text"
              placeholder="Rechercher"
              required
            />
            <i className="fi fi-rr-search absolute text-slate-400 left-3 top-3"></i>
            <button className="hidden bg-primary-color h-10 w-10 text-slate-50 rounded-full">
              <i className="fi fi-rr-search"></i>
            </button>
          </form>

          <div className="hover:text-primary-color lg:hidden">
            <div onClick={searchToggle} className="w-10 h-10 flex lg:w-auto lg:h-auto lg:bg-transparent lg:gap-2 justify-center items-center lg:text-base text-[16px] lg:text-slate-500 text-slate-500 bg-slate-200 cursor-pointer rounded-full"><i className="fi fi-rr-search translate-y-0.5"></i> <label className='lg:block cursor-pointer className="flex gap-2" hidden'>Messages</label></div>
          </div>

          {/* Search form on mobile */}
          {search &&
            <Search>
              <form className="relative flex lg:hidden items-center gap-2 h-10">
                <input
                  className="w-full h-10 pl-10 rounded-full text-[14px] text-slate-500 bg-slate-100 focus:border-primary-color border border-slate-200 outline-none"
                  type="text"
                  placeholder="Rechercher"
                  required
                />
                <i className="fi fi-rr-search absolute text-slate-400 left-3 top-3"></i>
                <button className="hidden bg-primary-color h-10 w-10 text-slate-50 rounded-full">
                  <i className="fi fi-rr-search"></i>
                </button>
              </form>
            </Search>
          }
          <div onClick={onClick} className="hover:text-primary-color lg:hidden">
            <Link className="w-10 h-10 flex lg:w-auto lg:h-auto lg:bg-transparent lg:gap-2 justify-center items-center lg:text-base text-[16px] lg:text-slate-500 text-slate-500 bg-slate-200 rounded-full" to="/sidebar"><i className="fi fi-rr-menu-burger translate-y-0.5"></i> <label className='lg:block cursor-pointer className="flex gap-2" hidden'>Messages</label></Link>
          </div>

        </div>

        <div className="flex items-center lg:gap-20 gap-2">

          {isFan && (
            <>
              <ul className="flex lg:gap-10 gap-2 text-slate-500">
                <li className="hover:text-primary-color hidden lg:block">
                  <Link className="w-10 h-10 flex lg:w-auto lg:h-auto lg:bg-transparent lg:gap-2 justify-center items-center lg:text-base text-xl lg:text-slate-500 text-slate-500 bg-slate-200 rounded-full" to="/"><i className="bi bi-house-door"></i> <label className='lg:block cursor-pointer className="flex gap-2" hidden'>Acceuil</label></Link>
                </li>
                <li className="hover:text-primary-color">
                  <Link className="w-10 h-10 flex lg:w-auto lg:h-auto lg:bg-transparent lg:gap-2 justify-center items-center lg:text-base text-xl lg:text-slate-500 text-slate-500 bg-slate-200 rounded-full" to="/"><i className="bi bi-bell"></i> <label className='lg:block cursor-pointer className="flex gap-2" hidden'>Notifications</label></Link>
                </li>
                <li className="hover:text-primary-color">
                  <Link className="w-10 h-10 flex lg:w-auto lg:h-auto lg:bg-transparent lg:gap-2 justify-center items-center lg:text-base text-xl lg:text-slate-500 text-slate-500 bg-slate-200 rounded-full" to="/"><i className="bi bi-chat"></i> <label className='lg:block cursor-pointer className="flex gap-2" hidden'>Messages</label></Link>
                </li>
              </ul>
              <div ref={iconRef} onClick={toggleProfileMenu} className="relative w-10 h-10 cursor-pointer flex justify-center items-center text-slate-50 bg-slate-400 rounded-full z-50">
                <div className="w-10 h-10 cursor-pointer flex justify-center items-center rounded-full overflow-hidden">
                  <img className='w-full h-full object-cover' src={assets.profile} alt="" />
                </div>

                {profileMenu && (
                  <ul ref={menuRef} className="absolute top-16 right-0 w-56 bg-slate-100 text-slate-500 flex flex-col rounded-3xl p-2">
                    {userRole === "MEMBRE_SYMPATHISANT" && (
                        <>
                          <li>
                            <Link
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-slate-200 hover:text-primary-accent rounded-full"
                                to="/candidate-register"
                            >
                              <i className="fi fi-rr-user-add translate-y-0.5"></i> Devenir candidat
                            </Link>
                          </li>
                          <li>
                            <Link
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-slate-100 hover:text-primary-accent rounded-full"
                                to="/volunteer-register"
                            >
                              <i className="fi fi-rr-user-add translate-y-0.5"></i> Devenir volontaire
                            </Link>
                          </li>
                          <li>
                            <Link
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-slate-100 hover:text-primary-accent rounded-full"
                                to="/parrain-register"
                            >
                              <i className="fi fi-rr-user-add translate-y-0.5"></i> Parrainer membre
                            </Link>
                          </li>
                          <li>
                            <Link
                                onClick={logout}
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-red-500 hover:text-white rounded-full"

                             >
                              <i className="fi fi-rr-exit translate-y-0.5"></i> Deconnexion
                            </Link>
                          </li>
                        </>
                    )}

                    {userRole === "MEMBRE_VOLONTAIRE" && (
                        <>
                          <li>
                            <Link
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-slate-100 hover:text-primary-accent rounded-full"
                                to="/parrain-register"
                            >
                              <i className="fi fi-rr-user-add translate-y-0.5"></i> Parrainer membre
                            </Link>
                          </li>
                          <li>
                            <Link
                                onClick={logout}
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-red-500 hover:text-white rounded-full"

                             >
                              <i className="fi fi-rr-exit translate-y-0.5"></i> Deconnexion
                            </Link>
                          </li>
                        </>
                    )}

                    {userRole === "MEMBRE_CANDIDAT" && (
                        <>
                          <li>
                            <Link
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-slate-100 hover:text-primary-accent rounded-full"
                                to="/parrain-register"
                            >
                              <i className="fi fi-rr-user-add translate-y-0.5"></i> Parrainer membre
                            </Link>
                          </li>
                          <li>
                            <Link
                                onClick={logout}
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-red-500 hover:text-white rounded-full"

                            >
                              <i className="fi fi-rr-exit translate-y-0.5"></i> Deconnexion
                            </Link>
                          </li>
                        </>
                    )}

                    {userRole !== "MEMBRE_SYMPATHISANT" &&
                        userRole !== "MEMBRE_VOLONTAIRE" &&
                        userRole !== "MEMBRE_CANDIDAT" && (
                            <li>
                              <Link
                                  className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-slate-100 hover:text-primary-accent rounded-full"
                                  to="/member-register"
                              >
                                <i className="fi fi-rr-users translate-y-0.5"></i> Devenir membre
                              </Link>
                            </li>
                        )}
                  </ul>
                )}
              </div>
            </>
          )}
          {!isFan && (
            <div className='relative flex gap-2'>
              <Button className='bg-primary-accent'>
                <Link to='/login'>Login</Link>
              </Button>
              <Button className='bg-primary-color' onClick={toggleProfileMenu}>S&apos;inscrire</Button>
              {profileMenu && (
                  <ul ref={iconRef} className="absolute top-12 right-0 w-56 bg-white text-slate-500 flex flex-col rounded-b-3xl p-2">

                    {userRole === "MEMBRE_SYMPATHISANT" && (
                        <>
                          <li>
                            <Link
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-slate-200 hover:text-primary-accent rounded-full"
                                to="/candidate-register"
                            >
                              <i className="fi fi-rr-user-add translate-y-0.5"></i> Devenir candidat
                            </Link>
                          </li>
                          <li>
                            <Link
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-slate-100 hover:text-primary-accent rounded-full"
                                to="/volunteer-register"
                            >
                              <i className="fi fi-rr-user-add translate-y-0.5"></i> Devenir volontaire
                            </Link>
                          </li>
                          <li>
                            <Link
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-slate-100 hover:text-primary-accent rounded-full"
                                to="/parrain-register"
                            >
                              <i className="fi fi-rr-user-add translate-y-0.5"></i> Parrainer membre
                            </Link>
                          </li>
                          <li>
                            <Link
                                onClick={logout}
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-red-500 hover:text-white rounded-full"

                            >
                              <i className="fi fi-rr-exit translate-y-0.5"></i> Deconnexion
                            </Link>
                          </li>
                        </>
                    )}

                    {userRole === "MEMBRE_VOLONTAIRE" && (
                        <>
                          <li>
                            <Link
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-slate-100 hover:text-primary-accent rounded-full"
                                to="/parrain-register"
                            >
                              <i className="fi fi-rr-user-add translate-y-0.5"></i> Parrainer membre
                            </Link>
                          </li>
                          <li>
                            <Link
                                onClick={logout}
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-red-500 hover:text-white rounded-full"

                            >
                              <i className="fi fi-rr-exit translate-y-0.5"></i> Deconnexion
                            </Link>
                          </li>
                        </>
                    )}

                    {userRole === "MEMBRE_CANDIDAT" && (
                        <>
                          <li>
                            <Link
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-slate-100 hover:text-primary-accent rounded-full"
                                to="/parrain-register"
                            >
                              <i className="fi fi-rr-user-add translate-y-0.5"></i> Parrainer membre
                            </Link>
                          </li>
                          <li>
                            <Link
                                onClick={logout}
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-red-500 hover:text-white rounded-full"

                            >
                              <i className="fi fi-rr-exit translate-y-0.5"></i> Deconnexion
                            </Link>
                          </li>
                        </>
                    )}

                    {userRole !== "MEMBRE_SYMPATHISANT" &&
                      userRole !== "MEMBRE_VOLONTAIRE" &&
                      userRole !== "MEMBRE_CANDIDAT" && (
                          <li>
                            <Link
                                className="flex gap-2 py-2 px-5 ease-out delay-75 hover:bg-slate-100 hover:text-primary-accent rounded-full"
                                to="/member-register"
                            >
                              <i className="fi fi-rr-users translate-y-0.5"></i> Devenir membre
                            </Link>
                          </li>
                    )}
                  </ul>
              )}
            </div>
          )}

        </div>
      </div>
    </div >
  );
}

Navbar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Navbar;
