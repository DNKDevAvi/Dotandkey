import React, { useState, useEffect } from "react";
import {Modal} from "react-bootstrap";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';


function PerkHeader() {
  const [show, setShow] = useState(false);
  const [perks, setPerks] = useState([]);
  const closeModal = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);
  const [txt, setTxt] = useState(true);
  const [success, setSuccess] = useState("")
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8100/perks");
        const jsonData = await response.json();
        setPerks(jsonData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (id) => {
    setPerks(perks.map(item => {
      if (item.id === id) {
        return { ...item, code: 'Coupon Copied'};
      }
      return item;
    }));
  };

  const handleCopyToClipboard = (code) => {
    // setTxt(false);
    // setSuccess("success");
    navigator.clipboard.writeText(code)
      .then(() => {
        setOpen(true);
      })
      .catch(error => {
        console.error('Error copying to clipboard:', error);
      });
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        X
      </IconButton>
    </React.Fragment>
  );




  return (
    <div className="headerperks">
      <div>
        <p onClick={handleShow}>CLICK HERE FOR MORE OFFERS</p>
      </div>

      <Modal
        show={show}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Perks To Love</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {perks ? (            
              perks.map((item, index) =>
                <>
                  <div className="each-perk">
                    <div className="perk-img-wrap">
                      <img src={item.img} alt=""/>
                    </div>                   
                    <div className="perk-txt">
                      <p dangerouslySetInnerHTML={ { __html: item.text } }></p>
                      {
                        item.code ? 
                        <span className={success} onClick={() =>{ handleItemClick(item.id); handleCopyToClipboard(item.code)}}><b>
                          {txt?"Copy Code:":null}</b>{item.code}</span>
                          :
                          null
                      }
                      
                      
                    </div>
                  </div>
                </>
              )
             

          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
      
      </Modal>

      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message="Coupon Copied"
        action={action}
      />

    </div>

    
  );
}

export default PerkHeader;
