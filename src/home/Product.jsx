import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./product.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from "../store/cartSlice";
import Cart from "../header/Cart";
import { toggleCartDrawer } from "../store/cartSlice";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Product() {
  const [data, setData] = useState(null);
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
      <Container className="text-center">
        <div>
          {/* <p>{isScrolled ? 'You have scrolled past the threshold!' : 'Keep scrolling...'}</p> */}
        </div>
        <Row className="mt-5">
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
              {data?.map((tab) => (
                <Container className="mb-5">
                  <div key={tab.id}>
                    <Row>
                      <Col md={12}>
                        <h2 className="mb-4">{tab.heading}</h2>
                        <ul
                          class="nav nav-pills mb-3 justify-content-evenly w-100"
                          id="pills-tab"
                          role="tablist"
                        >
                          {tab.label.map((label, index) =>
                            tab.label.length > 1 ? (
                              <>
                                <li
                                  key={label.id}
                                  class="nav-item"
                                  role="presentation"
                                >
                                  <button
                                    key={index}
                                    className={
                                      index === 0
                                        ? "nav-link active"
                                        : "nav-link"
                                    }
                                    id={`pills-${label.name}-tab`}
                                    data-bs-toggle="pill"
                                    data-bs-target={`#pills-${label.name}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={`pills-${label.name}`}
                                    aria-selected="true"
                                  >
                                    {label.name}
                                  </button>
                                </li>
                              </>
                            ) : null
                          )}
                        </ul>

                        {tab.label.map((label, index) =>
                          tab.label.length > 1 ? (
                            
                            <div
                              key={index}
                              className="tab-content"
                              id="pills-tabContent"
                            >
                              <div
                                key={index}
                                className={
                                  index === 0
                                    ? "tab-pane fade show active"
                                    : "tab-pane fade show"
                                }
                                id={`pills-${label.name}`}
                                role="tabpanel"
                                aria-labelledby={`pills-${label.name}-tab`}
                              >
                                <Slider {...settings}>
                                  {label.products.map((item) => (
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
                                  ))}
                                </Slider>
                              </div>
                            </div>
                          ) :

                            <Slider {...settings}>
                              {label.products.map((item) => (
                                <>
                                  {
                                    item.image !== "" ?

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
                                      :
                                      <div className="each-pro">
                                        <div className="video-wrap">
                                          <video
                                            muted
                                            loop
                                            autoPlay>
                                            <source src={item.video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                          </video>
                                        </div>


                                      </div>
                                  }
                                </>
                              ))}
                            </Slider>
                        )}
                      </Col>
                    </Row>
                  </div>
                </Container>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Product;