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
  const apis = ["shop-all","sunscreen","http://localhost:8820/moisturizer","http://localhost:8830/serums-oils","http://localhost:8840/face-wash"]

  // console.log({name})

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
          <Col md={12}><h2 className="mb-4" style={{ textTransform: 'capitalize' }}>{name}</h2></Col>
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
            <Row>
              <Col md={12}>
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  {api?.map((tab, index) => (
                    <li
                      key={tab.id}
                      class="nav-item"
                      role="presentation">
                      <button
                        key={index}
                        className={
                          index === 0
                            ? "nav-link active"
                            : "nav-link"
                        }
                        id={`pills-${tab.name}-tab`}
                        data-bs-toggle="pill"
                        data-bs-target={`#pills-${tab.name}`}
                        type="button"
                        role="tab"
                        aria-controls={`pills-${tab.name}`}
                        aria-selected="true">{tab.name}</button>
                    </li>
                  ))}
                </ul>
              </Col>
              <div class="tab-content" id="pills-tabContent">
                {}
                {api?.map((tab, index) => (
                  <div
                    key={index}
                    className={
                      index === 0
                        ? "tab-pane fade show active"
                        : "tab-pane fade show"
                    }
                    id={`pills-${tab.name}`}
                    role="tabpanel"
                    aria-labelledby={`pills-${tab.name}-tab`}>
                    <div className="row">
                      {tab.products.map((item) => (
                        <div className="col-md-3">
                          <div className="each-pro">
                            <div className="product-img-wrap">
                              <img src={item.image} alt="" />
                              <span>{item.tag}</span>
                            </div>
                            <div className="pro-txt">
                              <p>{item.name}</p>
                              <span>{item.altText}</span>
                              <p className="price">
                                Rs. {item.price}
                              </p>
                            </div>
                            <div className="variant"></div>
                            <button onClick={() => handleAddToCart(item)}>Add to cart</button>
                          </div>
                        </div>


                      ))}
                    </div>


                  </div>

                ))}


              </div>
            </Row>


          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Plp;
