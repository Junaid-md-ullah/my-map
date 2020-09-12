import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const MapContainer = () => {
  const [selected, setSelected] = useState({});
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [defaultCenter, setDefaultCenter] = useState();

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };
  // current lat, lng which is Bhairab Bazar
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      setDefaultCenter({
        lat: data.coords.latitude,
        lng: data.coords.longitude,
      });
    });
  }, []);

  const onSelect = (defaultCenter) => {
    setSelected(defaultCenter);
    setShow(true);
  };
  const handleClose = () => {
    const coordinatesValue = document.getElementById("coordinates").value;
    console.log(name, coordinatesValue);
    setShow(false);
    setName("");
  };
  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyC9FwqsIr3ksc2kYvZCZEKrTgYoLZAw-hg">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
          <Marker
            position={defaultCenter}
            onClick={() => onSelect(defaultCenter)}
          />
        </GoogleMap>
      </LoadScript>

      {/* Modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="coordinates">Current coordinates</label>
          <input
            className="ml-2"
            type="text"
            value={selected.lat + "," + selected.lng}
            id="coordinates"
          />
          <label htmlFor="name">Enter Your Name</label>
          <input
            className="ml-2"
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MapContainer;
