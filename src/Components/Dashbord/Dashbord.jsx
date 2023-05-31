import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashbord.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  console.log(error);

  const navigate = useNavigate();

  const [image, setImage] = useState(null)

const onImageChange = (event) => {
 if (event.target.files && event.target.files[0]) {
   setImage(URL.createObjectURL(event.target.files[0]));
 }
}
  
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log(data);
      
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <div className="dashboard">

<div className="dashboard">
       <div className="dashboard__container">
       <input type="file" onChange={onImageChange} className="filetype" />

       {image !==[] ? 
       <div style={{width:"170px" ,height:"270px"}}>
        <img  src ={image} alt="" style={{width:"100%" ,height:"100%"}} />
       </div> : 
       <></>
       }
         
       </div>
       <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
     </div>
     </div>
  );
}
export default Dashboard;