import React from "react";

import { NewData } from "../../DummyData/Data";
function FullDisplayWithOutDetails() {
  return (
    <div>
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
    </div>
  );
}

export default FullDisplayWithOutDetails;
