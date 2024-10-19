import logo from "../images/logo.svg";
import "../App.css";

const NavBar = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" width={100} />
      <p>Pexels - Image Fetcher</p>
      <a
        className="App-link"
        href="https://www.pexels.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pexels
      </a>
    </header>
  );
};

export default NavBar;
