import React from "react";
import Button from '@mui/material/Button';
import { FaHospital } from "react-icons/fa";
import { MdOutlineDevices } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { GiMedicines } from "react-icons/gi";
import { LuWashingMachine } from "react-icons/lu";
import { FcSalesPerformance } from "react-icons/fc";
import { MdOutlineAutoGraph } from "react-icons/md";
import Graph from "../../Components/CircularBar/Graph";
import { FaUserDoctor } from "react-icons/fa6";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";


const Dashboard = () => {
  return (

    <div className="right-content w-100">
    <div className="row dashboardBoxWrapperRow">
      <div className="col-md-8">
        <div className="dashboardBoxWrapper">
          {/** Card Components **/}
          {[
            { title: "Devices Deployed", target:10,actual:8, icon: <MdOutlineDevices style={{color:"#1da256"}}/>, gradient: "dashboardCardOne" },
            { title: "Total Consultations", target: 1000,actual:650, icon: <GiMedicines />, gradient: "dashboardCardTwo" },
            { title: "Avg. Cons/Device/Day", target: 10,actual:8.1, icon: <LuWashingMachine />, gradient: "dashboardCardThree" },
            { title: "Avg. Device Usage(Hr./Day)", target: 16,actual:14.5, icon: <FaUserDoctor />, gradient: "dashboardCardFour" },
            { title: "Repeat Customer Rate(%)", target: 40,actual:33, icon: <FaUserLarge />, gradient: "dashboardCardFive" },
            { title: "Avg. Doc. Res. Time(Sec)", target: 30,actual:22, icon: <FaCalendarAlt />, gradient: "dashboardCardSix" },
            // { title: "Total Sales", value: "₹ 7,86,00.67", icon: <FcSalesPerformance />, gradient: "dashboardCardSeven" },
            // { title: "Total Revenue", value: "₹ 7,86,000.67", icon: <FcSalesPerformance />, gradient: "dashboardCardEight" },
          ].map((card, index) => (
            <div className={`dashboardCard ${card.gradient}`} key={index}>
              <div className="cardContent d-flex justify-content-between align-items-center">
                <div className="text-white">
                  <h4>{card.title}</h4>
                  <div className="d-flex justify-content-between">
                     <h5>{`Target-${card.target}`}</h5>
                      <h5>{`Actual-${card.actual}`}</h5>
                  </div>
                </div>
                {/* <div className="icon">{card.icon}</div> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-md-4 right_dashboard_div">
        <div className="box">
          <div className="cardContent">
            <div className="text-white">
              <h5>Total Sales</h5>
              <h3>₹7,90,990.00</h3>
            </div>
            <div><Graph /></div>
          </div>
        </div>
      </div>


    </div>
  </div>
  );
};

export default Dashboard;
