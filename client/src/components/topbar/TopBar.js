import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
axios.defaults.baseURL ='http://localhost:3002'
export default function Topbar({posts}) {
  
  const { user, dispatch } = useContext(Context);
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const PF= "http://localhost:3002/images/"
  function handleLogout(){
dispatch({type:"LOGOUT"})
  }


 

  function handleSearch(e){
    setSearch(e.target.value)
    const filter = posts.data.filter((e)=>{
     return e.title.toLowerCase().includes(search.toLowerCase())
    } );
    if(search === ""){
      setSearchRes([]);
    }else{
      setSearchRes(filter)
    }
    
  }


  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
           <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>
           <li ><input className="searchInput " type="search" placeholder="Search" onChange={handleSearch}/>
           </li>
           <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </ul>
        
      </div>
      {search.length !==0 && <div className="dataResult">
  { searchRes.map((value, index)=>{
    return(
      <Link to={`post/${value._id}`} key= {index} className="dataItem"  >
        <p>{value.title}</p>
        </Link>
    )
  })}
</div>}
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={PF+user.profilePic}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fa-solid fa-user"></i>
      </div>
    </div>
  );
}
