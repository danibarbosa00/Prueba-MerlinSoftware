import { Link } from "react-router-dom";
import "./header.css";
const Header = () => {
  return (
    <>
      <Link to={"/"} className="link-container-header">
        <div className="container-header">
          <h1 className="title-header">Podcaster</h1>
        </div>
      </Link>
    </>
  );
};

export default Header;
