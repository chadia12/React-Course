import Topbar from "./components/topbar/TopBar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context/Context";
import axios from "axios";
axios.defaults.baseURL ='http://localhost:3002'


function App() {
   const { user } = useContext(Context);

   const [posts, setposts] = useState([])

   useEffect(()=>{
    (async function fetch(){
      const res = await axios.get('/posts')
      setposts(res)
    })()
   },[])
 // const user = false;

  return (
    <BrowserRouter>
      <Topbar posts={posts}/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={user ? <Homepage /> : <Register />} />
        <Route path="/login" element={user ? <Homepage /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/posts" element={<Homepage />} /> 
        <Route path="*" element={<p>Sorry this page doesn't exist</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
