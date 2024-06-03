import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PlpBanner from "./PlpBanner";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from "../store/cartSlice";
import { toggleCartDrawer } from "../store/cartSlice";

function Plp() {
  const params = useParams();
  const { name } = params;
const [data, setData] = useState(null);
const [api, setAPi] = useState(null);
const scrollElement = useRef(null);
const [isScrolled, setIsScrolled] = useState(false);
const scrollThreshold = 620; // Adjust the scroll threshold value as needed
const dispatch = useDispatch();


const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 1,
      },
    },
  ],
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8700/tabs");
      const jsonData = await response.json();
      dispatch(setData(jsonData));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  fetchData();
}, [dispatch]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8800/${name}`);
      const jsonData = await response.json();
      dispatch(setAPi(jsonData));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  fetchData();
}, [dispatch]);

const handleAddToCart = (product) => {
  dispatch(addToCart(product));
  dispatch(toggleCartDrawer());
};

const handleScroll = () => {
  if (window.scrollY >= scrollThreshold) {
    setIsScrolled(true);
  } else {
    setIsScrolled(false);
  }
};

useEffect(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

  return (
    <>
      <PlpBanner />
      <Container className="text-center">
        <Row className="mt-5">
          <Col md={12}><h2 className="mb-4" style={{textTransform:'capitalize'}}>{name}</h2></Col>
          <Col md={3}>
            <div className={`filter ${isScrolled ? 'sticky' : ''}`} ref={scrollElement}>
              <div className="fil-head d-flex justify-content-between align-items-center">
                <h4>Filter</h4>
                <FontAwesomeIcon icon={faFilter} />
              </div>


              {data?.filter(select => select.heading === "Bestsellers" || select.heading === "Skin Concerns").map((item) => (

                <>
                  <h6>{item.heading}</h6>
                  <ul>
                    {item.label.map((filter) => (
                      <>
                        <li>
                          <a href={`${filter.url}`}>{filter.name}</a>
                        </li>
                      </>
                    ))}
                  </ul>
                </>
              ))}

            </div>

          </Col>
          <Col md={9}>
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              {api?.map((tab, index) => (
              <Container>
                hello
              </Container>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Plp;
