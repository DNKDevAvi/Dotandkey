import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

function Filter() {

    const scrollElement = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollThreshold = 620; // Adjust the scroll threshold value as needed
    const [data, setData] = useState(null);

    const dispatch = useDispatch();

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
    return (
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
                                    <NavLink to={filter.url}>{filter.name}</NavLink>
                                </li>
                            </>
                        ))}
                    </ul>
                </>
            ))}

        </div>
    )
}

export default Filter