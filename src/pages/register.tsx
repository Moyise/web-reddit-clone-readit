import Head from "next/head";
import Link from "next/link";

export default function Register() {
  return (
    <div className="flex">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="w-40 h-screen bg-center bg-cover"
        style={{
          backgroundImage: "url('/images/bricks.jpg')",
        }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-72">
          <h1 className="mb-2 text-lg font-medium">Sign up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>
          <form>
            <div className="mb-6">
              <input
                type="checkbox"
                className="mr-1 cursor-pointer"
                id="agreement"
              />
              <label htmlFor="agreement" className="text-xs cursor-pointer">
                I agree to get emails about cool stuff on Readit.
              </label>
            </div>
            <div className="mb-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Password"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
              />
            </div>
            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
              Sign Up
            </button>
          </form>
          <small>
            Already a Readitor?
            <Link href="/login">
              <a className="ml-1 text-blue-500 uppercase">Log In</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}