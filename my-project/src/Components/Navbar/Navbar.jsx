import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Actions/userActions";
import showNotification from "../../../Utils/showNotification";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [menuState, setMenuState] = useState(false);
  let Location = useLocation();
  const [path, setPath] = useState(Location.pathname);
  useEffect(() => {
    setPath(Location.pathname);
  }, [Location.pathname]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setMenuState(false);
      } else {
        setMenuState(true);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    showNotification("Logout Successfully", "success");
  };

  return (
    <nav className=" border-gray-200 z-10 fixed top-0 w-full left-0 bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img
            src="/icons8-male-user-windows-11-color-72.png"
            className="h-8 mr-3"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            User Auth
          </span>
        </Link>
        <button
          onClick={() => setMenuState(!menuState)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden  focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            menuState ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            <li>
              <Link
                to="/"
                // className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                className={`block py-2 pl-3 pr-4 rounded   md:border-0  md:p-0  ${
                  path != "/auth" ? "text-blue-500" : "text-white"
                } md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent`}
                aria-current="page"
                onClick={() => setMenuState(false)}
              >
                Home
              </Link>
            </li>
            {!user ? (
              <li>
                <Link
                  to="/auth"
                  // className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  className={`block py-2 pl-3 pr-4 rounded   md:border-0  md:p-0  ${
                    path == "/auth" ? "text-blue-500" : "text-white"
                  } md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent`}
                  aria-current="page"
                  onClick={() => setMenuState(false)}
                >
                  Registration
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="#"
                  className={`block py-2 pl-3 pr-4 rounded   md:border-0  md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent`}
                  aria-current="page"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
