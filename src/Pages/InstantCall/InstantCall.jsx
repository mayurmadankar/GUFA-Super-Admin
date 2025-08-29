import React, { useState } from "react";
import { Container, Row, Col, Tab, Nav, Card } from "react-bootstrap";
import css from "./InstantCall.module.css";
import OngoingInstantCall from "./OngoingInstantCall";
import CompletedInstantCall from "./CompletedInstantCall";
import AttemptedCall from "./AttemptedCall";
import NotCompletedCall from "./NotCompletedCall";
import Attempted from "./Attempted";
import RequiredDoctor from "./RequiredDoctor";
import Support from "./Support";
import ConsultationAnalytics from "./ConsultationAnalytics";
// import css from "./Doctor.module.css"
const InstantCall = () => {
  const [activeKey, setActiveKey] = useState("attempted_logins");
  return (
    <Container className={`${css.instantCallContainer}`}>
      <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Nav variant="tabs" className="mt-3">
          <Nav.Item>
            <Nav.Link eventKey="attempted_logins" className="text-black">
              Atempted
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="attempted_calls" className="text-black">
              Waiting
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="ongoing_calls" className="text-black">
              Ongoing Call
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="completed_calls" className="text-black">
              Completed Calls
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="not_completed_calls" className="text-black">
              Incompleted Calls
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="consultation_analytics" className="text-black">
              Consultation Analytics
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Required_calls" className="text-black">
              Required Doctor
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="mt-3">
          <Tab.Pane eventKey="attempted_logins">
            <Attempted />
          </Tab.Pane>

          {/* .............Sub tab start here  .................*/}
          <Tab.Pane eventKey="attempted_calls">
            <Tab.Container defaultActiveKey="wait">
              <Nav variant="tabs" className="mt-3">
                <Nav.Item>
                  <Nav.Link eventKey="wait" className="text-black">
                    Wait
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="support" className="text-black">
                    Support
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content className="mt-3">
                <Tab.Pane eventKey="wait">
                  <AttemptedCall />
                </Tab.Pane>
                <Tab.Pane eventKey="support">
                  <Support />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Tab.Pane>
          {/* .............sub tab end here .............. */}

          <Tab.Pane eventKey="ongoing_calls">
            <OngoingInstantCall />
          </Tab.Pane>
          <Tab.Pane eventKey="completed_calls">
            <CompletedInstantCall />
          </Tab.Pane>
          <Tab.Pane eventKey="not_completed_calls">
            <NotCompletedCall />
          </Tab.Pane>
          <Tab.Pane eventKey="consultation_analytics">
            <ConsultationAnalytics />
          </Tab.Pane>
          <Tab.Pane eventKey="Required_calls">
            <RequiredDoctor />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default InstantCall;

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { Table, Spinner, Alert, Button, Pagination } from "react-bootstrap";

// // import React from 'react'

// const InstantCall = () => {
// const [calls, setCalls] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(20); // Fixed per page
//   const [totalPages, setTotalPages] = useState(1);

// // to convert the long and latti into location name
//   const reverseGeocode = async (lat, lon) => {
//     try {
//       const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
//         params: {
//           lat,
//           lon,
//           format: "json",
//           "accept-language": "en",
//           zoom: 18,
//         },
//         headers: {
//           "User-Agent": "BharatTeleClinicApp/1.0 (contact: admin@bharatteleclinic.co)",
//         },
//         timeout: 5000,
//       });

//       const address = response.data?.address;
//       return (
//         address?.suburb ||
//         address?.locality ||
//         address?.city ||
//         address?.town || "Unknown Location"
//       );
//     } catch (error) {
//       console.error("Geocoding failed:", error.message);
//       return "Unknown Location";
//     }
//   };

//   const fetchAttemptedCalls = useCallback(async (currentPage = 1) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = localStorage.getItem("admin_token");
//       const response = await axios.get(`${import.meta.env.VITE_BASEURL}/super_admin/current_instant_consultations`, {
//         params: {
//           type: "ongoing",
//           page: currentPage,
//           per_page: perPage,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(response,"response of attempted call")

//       if (response.data.status === "success") {
//         setCalls(response.data.data.details || []);
//         const total = response.data.data.total || 0;
//         setTotalPages(Math.ceil(total / perPage));
//         setPage(currentPage);
//       } else {
//         throw new Error(response.data.message || "Failed to fetch data");
//       }
//     } catch (err) {
//       setError(err.message || "Server error");
//     } finally {
//       setLoading(false);
//     }
//   }, [perPage]);

//   useEffect(() => {
//     fetchAttemptedCalls(page);
//   }, [fetchAttemptedCalls, page]);

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       fetchAttemptedCalls(newPage);
//     }
//   };

//   return (
//     <div className="container " style={{marginTop:"100px"}}>
//       <h4 className="mb-3">Attempted Video Consultations</h4>

//       {loading ? (
//         <div className="text-center my-4">
//           <Spinner animation="border" variant="primary" />
//           <span className="ms-2">Loading...</span>
//         </div>
//       ) : error ? (
//         <Alert variant="danger" className="text-center">
//           {error}
//           <Button variant="link" onClick={() => fetchAttemptedCalls(page)}>Retry</Button>
//         </Alert>
//       ) : (
//         <>
//           <div className="table-responsive">
//             <Table striped bordered hover>
//               <thead className="table-primary text-center">
//                 <tr>
//                   <th>Sr No.</th>
//                   <th>Session ID</th>
//                   <th>Patient_id</th>
//                   <th>Doctor_id</th>
//                   <th>Patient</th>
//                   <th>Doctor</th>
//                   <th>Speciality</th>
//                   <th>Fees</th>
//                   <th>Location</th>
//                   <th>Time</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody className="text-center">
//                 {calls.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="text-muted">No attempted consultations found.</td>
//                   </tr>
//                 ) : (
//                   calls.map((call, i) => (
//                     <tr key={call.session_id}>
//                       <td>{(page - 1) * perPage + i + 1}</td>
//                       <td>{call.session_id}</td>
//                       <td>{call.patient_id || "-"}</td>
//                       <td>{call.doctor_id || "-"}</td>
//                       <td>{call.patient_name || "N/A"}</td>
//                       <td>{call.doctor_name || "N/A"}</td>
//                       <td>{call.speciality || "-"}</td>
//                       <td>{call.fees || "-"}</td>
//                       <td>{call.location_name || "-"}</td>

//                       <td>
//                         {call.time
//                           ? new Date(call.time).toLocaleString("en-IN", {
//                               timeZone: "Asia/Kolkata",
//                               dateStyle: "short",
//                               timeStyle: "short",
//                             })
//                           : "N/A"}
//                       </td>
//                       <td>
//                         <Button
//                           variant="primary"
//                           size="sm"
//                           onClick={() => alert(`Viewing session: ${call.session_id}`)}
//                         >
//                           View
//                         </Button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </Table>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <Pagination className="justify-content-center mt-3">
//               <Pagination.Prev
//                 disabled={page === 1}
//                 onClick={() => handlePageChange(page - 1)}
//               />
//               {[...Array(totalPages).keys()].map((p) => (
//                 <Pagination.Item
//                   key={p + 1}
//                   active={p + 1 === page}
//                   onClick={() => handlePageChange(p + 1)}
//                 >
//                   {p + 1}
//                 </Pagination.Item>
//               ))}
//               <Pagination.Next
//                 disabled={page === totalPages}
//                 onClick={() => handlePageChange(page + 1)}
//               />
//             </Pagination>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default InstantCall

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import axios from "axios";
// import { Container, Tab, Nav, Table, Spinner, Alert, Button, Pagination } from "react-bootstrap";
// import { FaMapMarkerAlt, FaEye, FaSync, FaSortUp, FaSortDown } from "react-icons/fa";
// import css from "./InstantCall.module.css";
// import debounce from "lodash.debounce";

// const InstantCall = () => {
//   const [ongoingCalls, setOngoingCalls] = useState([]);
//   const [completedCalls, setCompletedCalls] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("ongoing");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [sortConfig, setSortConfig] = useState({ key: 'session_id', direction: 'asc' });

//   const reverseGeocode = async (lat, lon) => {
//     try {
//       const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
//         params: {
//           lat,
//           lon,
//           format: "json",
//           "accept-language": "en",
//           zoom: 18,
//         },
//         headers: {
//           "User-Agent": "BharatTeleClinicApp/1.0 (contact: admin@bharatteleclinic.co)",
//         },
//         timeout: 5000,
//       });

//       const address = response.data?.address;
//       return (
//         address?.suburb ||
//         address?.locality ||
//         address?.city ||
//         address?.town || "Unknown Location"
//       );
//     } catch (error) {
//       console.error("Geocoding failed:", error.message);
//       return "Unknown Location";
//     }
//   };

//   const fetchConsultations = useCallback(async (filter, pageNum = 1, retryCount = 0) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const token = localStorage.getItem("admin_token");
//       const response = await axios.get(`${import.meta.env.VITE_BASEURL}/super_admin/current_instant_consultations`, {
//         params: { filter, page: pageNum, per_page: 10 },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // console.log(response,"response")

//       if (response.data.status === "success") {
//         const consultationsWithLocation = await Promise.all(
//           response?.data?.data?.details.map(async (item) => {
//             let location_name = "Unknown Location";
//             if (item.latitude && item.longitude) {
//               location_name = await reverseGeocode(item.latitude, item.longitude);
//             }
//             return { ...item, location_name };
//           })
//         );

//         if (filter === "ongoing") {
//           setOngoingCalls(consultationsWithLocation);
//         } else {
//           setCompletedCalls(consultationsWithLocation);
//         }
//         setTotalPages(Math.ceil(response.data.data.total / response.data.data.per_page));
//         setPage(pageNum);
//       } else {
//         throw new Error(response.data.message || "Failed to fetch consultations");
//       }
//     } catch (err) {
//       if (retryCount < 3) {
//         setTimeout(() => fetchConsultations(filter, pageNum, retryCount + 1), 1000 * (retryCount + 1));
//       } else {
//         setError(err.response?.data?.message || "Server error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const debouncedFetch = useMemo(() => debounce(fetchConsultations, 300), [fetchConsultations]);

//   useEffect(() => {
//     debouncedFetch(activeTab === "ongoing" ? "ongoing" : "completed", 1);
//     return () => debouncedFetch.cancel();
//   }, [activeTab, debouncedFetch]);

//   const handleSort = (key) => {
//     setSortConfig((prev) => ({
//       key,
//       direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
//     }));
//   };

//   const sortedData = useMemo(() => {
//     const data = activeTab === "ongoing" ? ongoingCalls : completedCalls;
//     return [...data].sort((a, b) => {
//       let aValue = a[sortConfig.key];
//       let bValue = b[sortConfig.key];
//       if (sortConfig.key === 'start_time') {
//         aValue = aValue ? new Date(aValue).getTime() : 0;
//         bValue = bValue ? new Date(bValue).getTime() : 0;
//       }
//       if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
//       if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
//       return 0;
//     });
//   }, [ongoingCalls, completedCalls, activeTab, sortConfig]);

//   const handleViewClick = (sessionId) => {
//     alert(`View consultation details for session ID: ${sessionId}`);
//     console.log(`Navigating to consultation details for session ID: ${sessionId}`);
//   };

//   const renderTable = (data, type) => (
//     <div className="table-responsive">
//       <div className="d-flex justify-content-end mb-2">
//         <Button
//           variant="outline-primary"
//           size="sm"
//           onClick={() => debouncedFetch(type === "ongoing" ? "ongoing" : "completed", 1)}
//         >
//           <FaSync /> Refresh
//         </Button>
//       </div>
//       <Table striped bordered hover className={`${css.customTable} text-center`}>
//         <thead className="bg-primary text-white">
//           <tr>
//             <th onClick={() => handleSort('session_id')} style={{ cursor: 'pointer' }}>
//               # {sortConfig.key === 'session_id' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
//             </th>
//             <th>Session ID</th>
//             <th>Patient</th>
//             <th>Doctor</th>
//             <th>Speciality</th>
//             <th>Fee</th>
//             <th><FaMapMarkerAlt /> Location</th>
//             <th onClick={() => handleSort('start_time')} style={{ cursor: 'pointer' }}>
//               Time {sortConfig.key === 'start_time' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
//             </th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length === 0 ? (
//             <tr>
//               <td colSpan="9" className="text-muted">
//                 No {type} consultations found
//               </td>
//             </tr>
//           ) : (
//             data.map((c, i) => (
//               <tr key={c.session_id}>
//                 <td>{(page - 1) * 10 + i + 1}</td>
//                 <td>{c.session_id}</td>
//                 <td>{c.patient_name}</td>
//                 <td>{c.doctor_name}</td>
//                 <td>{c.speciality}</td>
//                 <td>{c.consultation_fee}</td>
//                 <td>{c.location_name}</td>
//                 <td>
//   {c.start_time
//     ? new Date(c.start_time).toLocaleString("en-IN", {
//         timeZone: "Asia/Kolkata",
//         dateStyle: "short",
//         timeStyle: "short",
//         hour12: true,
//       })
//     : "N/A"}
// </td>
//                 <td>
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     onClick={() => handleViewClick(c.session_id)}
//                   >
//                     <FaEye /> View
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>
//       {totalPages > 1 && (
//         <Pagination className="justify-content-center mt-3">
//           <Pagination.Prev
//             disabled={page === 1}
//             onClick={() => debouncedFetch(activeTab === "ongoing" ? "ongoing" : "completed", page - 1)}
//           />
//           {[...Array(totalPages).keys()].map((p) => (
//             <Pagination.Item
//               key={p + 1}
//               active={p + 1 === page}
//               onClick={() => debouncedFetch(activeTab === "ongoing" ? "ongoing" : "completed", p + 1)}
//             >
//               {p + 1}
//             </Pagination.Item>
//           ))}
//           <Pagination.Next
//             disabled={page === totalPages}
//             onClick={() => debouncedFetch(activeTab === "ongoing" ? "ongoing" : "completed", page + 1)}
//           />
//         </Pagination>
//       )}
//     </div>
//   );

//   return (

//     <Container fluid className={`${css.instantCallContainer} bg-gray-100 min-h-screen p-4`}>
//       <h4 className="mb-4 text-2xl font-bold text-gray-800">Instant Video Consultations</h4>

//       <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
//         <Nav variant="tabs" className="mb-4 border-b-2 border-gray-200">
//           <Nav.Item>
//             <Nav.Link
//               eventKey="ongoing"
//               className={`text-lg font-semibold ${activeTab === "ongoing" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"} hover:text-blue-600`}
//             >
//               🔴 Ongoing
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link
//               eventKey="completed"
//               className={`text-lg font-semibold ${activeTab === "completed" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"} hover:text-blue-600`}
//             >
//                🟢   Completed
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>

//         <Tab.Content>
//           <Tab.Pane eventKey="ongoing">
//             {loading ? (
//               <div className="text-center my-4">
//                 <Spinner animation="border" variant="primary" />
//                 <span className="ml-2 text-gray-600">Loading...</span>
//               </div>
//             ) : error ? (
//               <Alert variant="danger" className="text-center">
//                 {error}
//                 <Button
//                   variant="link"
//                   className="ml-2 text-blue-600"
//                   onClick={() => debouncedFetch("ongoing", 1)}
//                 >
//                   Retry
//                 </Button>
//               </Alert>
//             ) : (
//               renderTable(ongoingCalls, "ongoing")
//             )}
//           </Tab.Pane>
//           <Tab.Pane eventKey="completed">
//             {loading ? (
//               <div className="text-center my-4">
//                 <Spinner animation="border" variant="secondary" />
//                 <span className="ml-2 text-gray-600">Loading...</span>
//               </div>
//             ) : error ? (
//               <Alert variant="danger" className="text-center">
//                 {error}
//                 <Button
//                   variant="link"
//                   className="ml-2 text-blue-600"
//                   onClick={() => debouncedFetch("completed", 1)}
//                 >
//                   Retry
//                 </Button>
//               </Alert>
//             ) : (
//               renderTable(completedCalls, "completed")
//             )}
//           </Tab.Pane>
//         </Tab.Content>
//       </Tab.Container>
//     </Container>
//   );
// };

// export default InstantCall;

// import React, { useState } from 'react'
// import css from "./InstantCall.module.css";
// import { Container, Nav, Tab } from 'react-bootstrap';
// import OngoingInstantCall from './OngoingInstantCall';
// import CompletedInstantCall from './CompletedInstantCall';
// const InstantCall = () => {
//   const [activeKey,setActiveKey]=useState("ongoing")
//   return (
//   <Container className={`${css.instantCallContainer}`}>
//     <h4>Instant Call</h4>
//       <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
//         <Nav variant="tabs" className="mt-3">
//           <Nav.Item>
//             <Nav.Link eventKey="ongoing" className='text-black'>Ongoing</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey="completed" className='text-black'>Completed</Nav.Link>
//         </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey="attempted" className='text-black'>Attempted</Nav.Link>
//         </Nav.Item>
//       </Nav>

//         <Tab.Content >
//           <Tab.Pane eventKey="ongoing">
//             <OngoingInstantCall />
//           </Tab.Pane>

//           <Tab.Pane eventKey="completed">
//             <CompletedInstantCall />
//           </Tab.Pane>

//           <Tab.Pane eventKey="attempted">
//             <CompletedInstantCall />
//           </Tab.Pane>

//         </Tab.Content>
//       </Tab.Container>

//   </Container>
//   )
// }

// export default InstantCall
