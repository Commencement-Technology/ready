import Link from "next/link";

const AuthChoice = ({ title, destination, text }) => {
  return (
    <p className="text-center text-sm">
      {text}{" "}
      <Link
        href={destination}
        className="underline text-blue-400 hover:text-blue-600"
      >
        {title}
      </Link>
    </p>
  );
};

export default AuthChoice;
