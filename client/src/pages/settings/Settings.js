import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3002";


export default function Settings() {
  const {user,dispatch} = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const PF= "http://localhost:3002/images/"
console.log(file);
  async function handleSubmit(e) {
    e.preventDefault();
     dispatch({type:"UPDATE_START"})
    const updateProfile = {
      userId: user._id,
      username, email, password
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateProfile.profilePic = filename;
      try {
        await axios.post("/upload/", data);
       
      } catch (err) {}
    }
    try {
    const res = await axios.put("/users/"+user._id, updateProfile);
      setSuccess(true);
       dispatch({type:"UPDATE_SUCCESS", payload: res.data})
       
     
    } catch (err) {
       dispatch({type:"UPDATE_FAILURE"})
    }
  }

  async function handleDelete() {
    try {
      await axios.put(`users/delete/${user._id}`,{ isDeleted: true } );
      window.location.replace("/");
    } catch (err) {}
  }





  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={handleDelete}>Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} name="name" onChange={(e)=> setUsername(e.target.value)}/>
          <label>Email</label>
          <input type="email"  placeholder={user.email} name="email" onChange={(e)=> setEmail(e.target.value)}/>
          <label>Password</label>
          <input type="password"  onChange={(e)=> setPassword(e.target.value)}/>
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && <span style={{color: "green", textAlign:"center", marginTop:"20px"}}>Profile has been updated</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
