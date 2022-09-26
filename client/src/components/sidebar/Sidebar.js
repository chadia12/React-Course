
import { Link } from "react-router-dom";
import "./sidebar.css";
import axios from "axios";
import { useEffect, useState } from "react";
axios.defaults.baseURL = "http://localhost:3002";


export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(()=>{
     const getCats = async ()=> {
      const res = await axios.get("/categories");
      setCats(res.data);
    }
    getCats();
  },[])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="loveheader.jpg"
          alt=""
        />
        <p>
          Love is such a powerful force. It's there for everyone to embrace-that kind of unconditional love for all of humankind. That is the kind of love that impels people to go into the community and try to change conditions for others, to take risks for what they believe in.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
        {cats.map((c,index) => (
            <Link to={`/?cat=${c.name}`} className="link" key={index}>
            <li className="sidebarListItem" >{c.name}</li>
            </Link>
          ))}
        </ul>
      
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
//https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500