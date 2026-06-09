"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";
import OSECertificate from "./OSECertificate";
import QrModal from "./QrModal";
import MembershipModal from "./MembershipModal";
import BlanckComponent from "./BlanckComponent";

const MainLear = ({ certificate }) => {
  const [isOpen, setisOpen] = useState(false);
  const [isFormOpen, setisFormOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const handleOpen = () => {
    setisOpen(true);
  };
  const handleClose = () => {
    setisOpen(false);
  };
  const handleFormOpen = () => {
    setisFormOpen(true);
  };
  const handleFormClose = () => {
    setisFormOpen(false);
  };

  const handlseLogoutClose = (e) => {
    setIsLogout(false);
  };
  const handlseLogoutOpen = () => {
    setIsLogout(!isLogout);
  };

  return (
    <div>
      <Navbar
        onOpen={handleOpen}
        onFormOpen={handleFormOpen}
        isLogout={isLogout}
        onOpenProfile={handlseLogoutOpen}
      />
      <div onClick={handlseLogoutClose}>
        <OSECertificate certificateData={certificate} />
        {isOpen && <QrModal isOpen={isOpen} onClose={handleClose} />}
        {isFormOpen && (
          <MembershipModal isOpen={isFormOpen} onClose={handleFormClose} />
        )}
        <BlanckComponent />
      </div>
    </div>
  );
};

export default MainLear;
