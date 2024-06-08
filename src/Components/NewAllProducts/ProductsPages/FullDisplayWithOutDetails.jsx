import React, { useEffect } from "react";

import { NewData } from "../../DummyData/Data";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";
function FullDisplayWithOutDetails() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const Navigate = () => {
    navigate("/SingleProduct");
  };
  return (
    <>
      <div onClick={Navigate} className="cursor-pointer">
        <div>
          <img src={NewData.img} alt="NewData Image" />
        </div>
        <div className="multyimage">
          <img src={NewData.imga} alt="NewData Image" />
          <img src={NewData.imgb} alt="NewData Image" />
        </div>
        <div className="Fullimage">
          <img src={NewData.imgc} alt="NewData Image" />
        </div>
        <div className="multyimage">
          <img src={NewData.imgd} alt="NewData Image" />
          <img src={NewData.imge} alt="NewData Image" />
        </div>
        <div className="Fullimage">
          <img src={NewData.imgf} alt="NewData Image" />
        </div>
        <div className="Fullimage">
          <img src={NewData.imgg} alt="NewData Image" />
        </div>
        <div className="Fullimage">
          <img src={NewData.imgi} alt="NewData Image" />
        </div>
      </div>{" "}
      <Footer />
    </>
  );
}

export default FullDisplayWithOutDetails;
