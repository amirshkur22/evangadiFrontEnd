import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import evangadiLogoW from "../../assets/images/evangadiLogoW.png";
import evangadiLogoB from "../../assets/images/evangadiLogoB.png";
import "bootstrap/dist/css/bootstrap.min.css";
import headerStyle from "./header.module.css";

const HomePageHeader = () => {
  const navigate = useNavigate();
  const [navBackground, setNavBackground] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleScroll = () => {
    setNavBackground(window.scrollY > 50);
  };
  const handleNavCollapse = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      //best practice to avoid memory leaks
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth > 992) {
      setIsMenuOpen(false);
    }
  }, [screenWidth]);

  return (
    <>
      <header className={`${navBackground ? headerStyle.scroll : ""}`}>
        <nav className={headerStyle.navContainer}>
          <div className={headerStyle.imageContainer}>
            <Link to="/">
              <img src={evangadiLogoW} alt="Logo" />
            </Link>
          </div>
          {!isMenuOpen && (
            <>
              <div className={headerStyle.middlePart}>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/academy">Academy</Link>
                  </li>
                  <li>
                    <Link to="/scholarship">Scholarship</Link>
                  </li>
                  <li>
                    <Link to="/immersive">Immersive</Link>
                  </li>
                  <li>
                    <Link to="/placement">Placement</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              <div className={headerStyle.btnContainer}>
                <button type="button" onClick={() => navigate("/login")}>
                  Sign in
                </button>
              </div>
            </>
          )}

          <RiMenu3Fill
            style={{ color: "orange", fontSize: "1.5em" }}
            onClick={handleNavCollapse}
            className={headerStyle.menuIcon}
          />
        </nav>
      </header>
      <div
        className={`${headerStyle.menu} ${isMenuOpen ? headerStyle.open : ""}`}
      >
        <div>
          <Link to="/">
            <img src={evangadiLogoB} alt="Logo" width={200} />
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/academy">Academy</Link>
          </li>
          <li>
            <Link to="/scholarship">Scholarship</Link>
          </li>
          <li>
            <Link to="/immersive">Immersive</Link>
          </li>
          <li>
            <Link to="/placement">Placement</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/login">Sign in</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HomePageHeader;
