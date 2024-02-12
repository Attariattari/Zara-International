import { Link } from "react-router-dom";

export default function Logo({ show }) {
  return (
    <Link
      to={"/"}
      className={
        "flex gap-1 md:text-white hover:md:text-white no-underline " +
        (show
          ? "max-md:text-white hover:max-md:text-white"
          : "max-md:text-gray-800 hover:max-md:text-gray-800")
      }
    >
      <div className="logo">
        <img src="https://i.postimg.cc/FzrBBSqP/Tech.png" width style={{
          
        }} />
      </div>
    </Link>
  );
}
