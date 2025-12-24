import React from "react";

const LocationSearchPanel = (props) => {
  // sample data for location search panel
  const locations = [
    "26 CX Sundar Das Marg Dausa",
    "45 AB MG Road Jaipur",
    "12 XY Station Road Delhi",
    "78 PQ Ring Road Mumbai",
    "34 LM Park Street Kolkata",
  ];
  return (
    <div>
      {/* this is just a sample data */}

      {locations.map(function (elem, idx) {
        return (
          <div key={idx} onClick={()=> {
            props.setVehiclePanel(true);
            props.setPanelOpen(false);
          }} className="flex gap-4 border-2 p-3 rounded-xl border-gray-50 active:border-black items-center my-2 justify-items-start">
            <h2 className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
