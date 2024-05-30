import {
  faArrowRight,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./search.scss";
import { faCertificate } from "@fortawesome/free-solid-svg-icons/faCertificate";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Suggest from "./Suggest";

function SearchBox(props) {
  const [searchData, setSearchData] = useState([]);
  const [suggest, setSuggest] = useState(false);
  const [inputText, setInputText] = useState('');

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8400/search");
        const data = await response.json();
        setSearchData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setSuggest(text.trim() !== ''); // Check if trimmed text is not empty
  };

  return (
    <Modal
      {...props}
      size="lg"
      // aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <div className="search-bar">
          <input type="text" placeholder="Search" onChange={(e) => { handleChange(e) }} tabIndex={0} value={inputText} />
        </div>
      </Modal.Header>
      <Modal.Body>
        {
          suggest ?
            <Suggest search={inputText}/>
            :
            <>        <div className="choice">
              <p>
                <FontAwesomeIcon icon={faArrowTrendUp} /> Popular Choices.
              </p>
              <ul>
                <li>
                  <div className="each-choice">
                    <a href="#">
                      Moisturizers <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </div>
                </li>
                <li>
                  <div className="each-choice">
                    <a href="#">
                      Sunscreen <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </div>
                </li>
                <li>
                  <div className="each-choice">
                    <a href="#">
                      Combos <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </div>
                </li>
                <li>
                  <div className="each-choice">
                    <a href="#">
                      Serum <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </div>
                </li>
              </ul>
            </div>

              <div className="recommand">
                <p>
                  <FontAwesomeIcon icon={faCertificate} /> Recommended for you
                </p>
                <Slider {...settings}>
                  {searchData.map((item, index) => (
                    <div className="search-product">
                      <div className="product-img-wrap">
                        <img src={item.image.src} alt="" />
                      </div>
                      <div className="search-pro-txt">
                        <p>{item.title}</p>
                        <span>{item.meta_benefits}</span>
                        <p className="price">Rs. {item.discounted_price}</p>
                      </div>
                    </div>
                  ))}
                </Slider>

              </div>
            </>

        }
      </Modal.Body>
    </Modal>
  );
}

export default SearchBox;