import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "./banner.scss";
import TopNav from "./TopNav";

function Banner() {
  const [index, setIndex] = useState(0);
  const [banner, setBanner] = useState();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8500/banner");
        const data = await response.json();
        setBanner(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <TopNav />
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {banner?.map((item) => (
          <Carousel.Item>
            <a href={item.url}>
              <img src={item.banImg} alt="" />
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default Banner;
