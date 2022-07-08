import {useAppSelector} from "store";
import Link from "next/link";
import SignUpForm from "components/sample-forms/signup-account";
import Text from "components/login-2/text";
import Logo from "components/login-2/logo";
import Footer from "components/login-2/footer";
import { useState } from "react";
import AuthModal from "components/Auth/AuthModal";


const SignUp = () => {
  const config = useAppSelector((state) => state.config);
  const {name} = config;
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <>
      <div className="flex flex-row w-full h-screen overflow-hidden">
        <div className="relative items-start justify-between hidden w-1/2 p-8 text-white lg:flex lg:flex-col bg-login-2">
          <Logo />
          <Text />
          <Footer />
        </div>
        <div className="flex flex-col items-start justify-center w-full p-8 text-gray-900 bg-white dark:bg-gray-900 dark:text-white lg:w-1/2 lg:p-24">
          <p className="mb-2 text-2xl font-bold text-[#464646]">
            Sign Up for {name}
          </p>
          <AuthModal show={showModal} onClose={closeModal}/>
          <button
                    type="button"
                    onClick={openModal}
                    className="ml-4 px-4 py-1 rounded-md bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-500 focus:ring-opacity-50 text-white transition"
                  >
                    Log in
                  </button>
          <div className="flex flex-row w-full mt-8">
            <span className="mr-1 text-secondary">New user?</span>
            <span>
              <Link href="/create-account">
                <a className="text-blue-500">Create account here</a>
              </Link>
            </span>
          </div>
          <div className="w-full">
            <span>
              <Link href="/forgot-password">
                <a className="text-blue-500">Forgot password?</a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
