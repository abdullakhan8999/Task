import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userForgotPassword } from "../../Actions/userActions";
import Loader from "../../Components/Loader";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { userLoading } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");

  const handleSendEmail = (e) => {
    e.preventDefault();
    dispatch(userForgotPassword(email));
    setEmail("");
  };
  return (
    <>
      {userLoading ? (
        <Loader />
      ) : (
        <div className="bg-slate-200 fixed h-full w-full">
          <form
            onSubmit={handleSendEmail}
            className=" rounded-lg bg-neutral-300 flex-wrap flex items-center justify-center gap-2 md:gap-6 min-h-[300px] max-w-[500px]  mx-auto mt-28"
          >
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter Email.."
              className="border w-[60%] border-gray-400 bg-slate-900 text-white p-3 rounded "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded  hover:bg-blue-600 transition-colors ease-in-out duration-300 cursor-pointer"
              name="button"
              id="button"
            >
              Send Emails
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
