// import React, { useState } from "react";
// import { HiOutlineArrowNarrowRight } from "react-icons/hi";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const Reservation = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [phone, setPhone] = useState("");
//   const navigate = useNavigate();

//   const handleReservation = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:4000/api/v1/reservation/send",
//         { firstName, lastName, email, phone, date, time },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       toast.success(data.message);
//       setFirstName("");
//       setLastName("");
//       setPhone("");
//       setEmail("");
//       setTime("");
//       setDate("");
//       navigate("/success");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Reservation failed.");
//     }
//   };

//   return (
//     <section className="reservation" id="reservation">
//       <div className="container">
//         <div className="banner">
//           <img src="/reservation.png" alt="res" />
//         </div>
//         <div className="banner">
//           <div className="reservation_form_box">
//             <h1>MAKE A RESERVATION</h1>
//             <p>For Further Questions, Please Call</p>
//             <form onSubmit={handleReservation}>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="First Name"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Last Name"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <input
//                   type="date"
//                   placeholder="Date"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   required
//                 />
//                 <input
//                   type="time"
//                   placeholder="Time"
//                   value={time}
//                   onChange={(e) => setTime(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="email_tag"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <input
//                   type="number"
//                   placeholder="Phone"
//                   min="0"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   required
//                 />
//               </div>
//               <button type="submit" className="reserve-btn">
//                   RESERVE NOW{" "}
//                   <span>
//                     <HiOutlineArrowNarrowRight />
//                   </span>
//                 </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Reservation;
import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/reservation/send",
        { firstName, lastName, email, phone, date, time },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      resetForm();
      navigate("/success");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reservation failed.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setTime("");
    setDate("");
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="Reservation" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A RESERVATION</h1>
            <p>For Further Questions, Please Call</p>
            <form onSubmit={handleReservation}>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  aria-label="First Name"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  aria-label="Last Name"
                />
              </div>
              <div>
                <input
                  type="date"
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  aria-label="Date"
                />
                <input
                  type="time"
                  placeholder="Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  aria-label="Time"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="email_tag"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  min="0"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  pattern="[0-9]*" // Ensures only numbers are input
                  aria-label="Phone"
                />
              </div>
              <button type="submit" className="reserve-btn" disabled={loading}>
                {loading ? "Reserving..." : "RESERVE NOW"}{" "}
                <span>
                  <HiOutlineArrowNarrowRight />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
