import React, { useEffect, useState } from "react";
import WegovySignupModal from "./WegovySignupModal";

const WegovySignupModalWrapper = () => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const alreadyClosed = sessionStorage.getItem("wegovy_signup_modal_closed");

    if (!alreadyClosed) {
      const timer = setTimeout(() => {
        setOpenModal(true);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("wegovy_signup_modal_closed", "true");
    setOpenModal(false);
  };

  return <WegovySignupModal isOpen={openModal} onClose={handleClose} />;
};

export default WegovySignupModalWrapper;
