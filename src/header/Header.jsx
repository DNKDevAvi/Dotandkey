import React, { useState, useRef, useEffect } from "react";
import "./header.scss";
import PerkHeader from "./PerkHeader";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faBus,
  faCaravan,
  faEnvelope,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/logo.avif";
import MegaMenu from "./mega menu/MegaMenu";
import Search from "./search/Search";
import { Modal } from "bootstrap";
import SearchBox from "./search/SearchBox";
import Cart from "./Cart";

function Header(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [icon, setIcon] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    setShowPopup(!showPopup);
    setIcon(!icon);
  };

  const handleSearch = () => {
    setShowSearch(true);
  };

  const handleSearchBlur = () => {
    setShowSearch(false);
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.blur(); // Blur the input element when it receives focus
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [inputRef]);

  return (
    <>
      <PerkHeader />
      <header className="site-header">
        <Container>
          <Row className="w-100">
            <Col md={4} className="align-items-center d-flex">
              <button onClick={handleButtonClick}>
                {icon ? (
                  <FontAwesomeIcon icon={faBars} />
                ) : (
                  <FontAwesomeIcon icon={faTimes} />
                )}
              </button>
              {showPopup && <MegaMenu />}
            </Col>
            <Col md={4} className="text-center">
              <img src={Logo} alt="" />
            </Col>
            <Col
              md={4}
              className="align-items-center d-flex justify-content-end"
            >
              <div className="head-right w-100">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="search"
                  onFocus={() => {
                    handleSearch();
                    handleFocus();
                  }}
                  onClick={() => setModalShow(true)}
                />
                {/* {showSearch ? <Search /> : null} */}
                <SearchBox
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                <ul className="head-right-menu">
                  <li>
                    <div className="each-nav">
                      <FontAwesomeIcon icon={faCaravan} />
                    </div>
                  </li>
                  <li>
                    <div className="each-nav">
                      <Cart />
                    </div>
                  </li>
                  <li>
                    <div className="each-nav">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
}

export default Header;