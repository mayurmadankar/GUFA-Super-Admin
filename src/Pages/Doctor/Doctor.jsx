// import React from 'react'
// import css from "./Doctor.module.css"
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
// const Doctor = () => {
//     const navigate=useNavigate()
  
//     const handleViewDoctor=()=>{
//       navigate("/doctor/doctor_detail")
//     }
//   return (
//    <div className={`container-fluid ${css.doctor_container}`}>
//      <div className='d-flex justify-content-between'>
//       <div className='d-flex justify-content-between'>
//       <h4 style={{paddingRight:"20px"}}>Doctors</h4>
//       <Button variant="contained" size="small"   sx={{
//         marginBottom: "10px", 
//         marginRight:"20px",
//         padding: "8px 10px", // Adjust padding (vertical & horizontal)
//         fontSize: "12px",  // Adjust text size
//         height: "30px" // Set button height
//         }}>New Doctors </Button>

//       <Button variant="contained" size="small"   sx={{
//         paddingRight:"20px",
//         background:"red",
//         marginBottom: "10px", 
//         padding: "8px 10px", // Adjust padding (vertical & horizontal)
//         fontSize: "12px",  // Adjust text size
//         height: "30px" // Set button height
//         }}>Live.</Button>
//       </div>
    
//       <Button variant="contained" size="small"   sx={{
//         marginBottom: "10px", 
//         padding: "8px 10px", // Adjust padding (vertical & horizontal)
//         fontSize: "12px",  // Adjust text size
//         height: "30px" // Set button height
//         }}><a href='https://bharatteleclinic.co/registration/doctor' target='_blank' style={{color:"white",textDecoration:"none"}}>Add New Doctor</a> </Button>
//       </div>

  
//     <div className="table-responsive">
//       <table className="table text-center">
//         <thead className="thead-light">
//           <tr>
//           <th>Doctor Id</th>
//             <th>Doctor Name</th>
//             <th>Specification</th>
//             <th>Email</th>
//             <th>Number</th>
//             <th>Experience</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr style={{cursor:"pointer"}}>
//             <td>123</td>
//             <td>Sanauar Ansari</td>
//             <td>MBBS</td>
//             <td>sanauar@gmail.com</td>
//             <td>9898989898</td>
//             <td>3</td>
//             <td>Active</td>
//             <td onClick={handleViewDoctor}><button className="btn btn-primary btn-sm">View</button></td>
//           </tr>


//           <tr style={{cursor:"pointer"}}>
//           <td>124</td>
//             <td>Ajit Sharma</td>
//             <td>MBBS</td>
//             <td>sharma@gmail.com</td>
//             <td>9898989898</td>
//             <td>8</td>
//             <td>Active</td>
//             <td onClick={handleViewDoctor}><button className="btn btn-primary btn-sm">View</button></td>
//           </tr>


//           <tr style={{cursor:"pointer"}}>
//           <td>125</td>
//             <td>Amruta Tripathi</td>
//             <td>MBBS</td>
//             <td>amruta@gmail.com</td>
//             <td>9898989898</td>
//             <td>6</td>
//             <td>Active</td>
//             <td onClick={handleViewDoctor}><button className="btn btn-primary btn-sm">View</button></td>
//           </tr>



//           <tr style={{cursor:"pointer"}}>
//           <td>126</td>
//             <td>Ayesha Ansari</td>
//             <td>MBBS</td>
//             <td>ayesha@gmail.com</td>
//             <td>9898989898</td>
//             <td>3</td>
//             <td>Inactive</td>
//             <td onClick={handleViewDoctor}><button className="btn btn-primary btn-sm">View</button></td>
//           </tr>

      
//         </tbody>
//       </table>
//     </div>
//   </div>
//   )
// }

// export default Doctor
