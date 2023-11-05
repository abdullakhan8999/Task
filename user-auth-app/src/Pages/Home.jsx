import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const Home = () => {
  //methods
  const nav = useNavigate();

  //states
  const [homePageLoading, setHomePageLoading] = useState(true);
  const { role } = useSelector((state) => state.user.user);
  const { user, userLoading } = useSelector((state) => state.user);

  //Effects
  useEffect(() => {
    //delay
    setInterval(() => {
      setHomePageLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    if (!user) {
      nav("/auth");
    }
  }, [user, nav]);
  return (
    <>
      {homePageLoading || userLoading ? (
        <Loader />
      ) : (
        <div className="max-w-screen-xl pt-28 mb-6 flex-col flex flex-wrap font-medium items-center text-lg md:text-xl justify-center mx-auto p-4">
          Welcome To Home Page
          <img
            src={user.picture || user.avatar?.url}
            alt="avatar/userPic"
            className="w-40 my-4 h-40 rounded-full"
          />
          <div className="capitalize text-left text-lg md:text-xl">
            <h1 className="">Name: {user.name}</h1>
            <h1 className="">Email: {user.email}</h1>
            <h1 className="">Role: {user.sub ? "user" : role}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
