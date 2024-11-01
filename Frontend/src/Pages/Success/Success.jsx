import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const Success = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // Use setTimeout for countdown
    const timeoutId = setTimeout(() => {
      if (countdown > 0) {
        setCountdown((prevCount) => prevCount - 1);
      } else {
        navigate("/"); // Navigate when countdown reaches 0
      }
    }, 1000);

    // Cleanup on unmount
    return () => clearTimeout(timeoutId);
  }, [countdown, navigate]); // Dependency on countdown and navigate

  return (
    <section className="notFound">
      <div className="container">
        <img src="/sandwich.png" alt="success" />
        <h1>Redirecting to Home in {countdown} seconds...</h1>
        <Link to={"/"}>
          Back to Home <HiOutlineArrowNarrowRight />
        </Link>
      </div>
    </section>
  );
};

export default Success;
