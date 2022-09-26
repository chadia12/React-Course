import { Link } from "react-router-dom";
import "./singlePost.css";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3002";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [dec, setDec] = useState("");
  const [updatePost, setUpdatePost] = useState(false);

  const PF = "http://localhost:3002/images/";

  useEffect(() => {
    async function getPost() {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDec(res.data.dec);
    }
    getPost();
  }, [path]);

  async function handleDelete() {
    try {
      await axios.delete(`posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  }
  
async function handleUpdate(e){
  try {
    await axios.put(`posts/${post._id}`, {
       username: user.username, title,dec ,
    });
    setUpdatePost(false);
    
  } catch (err) {}

}


  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.phot && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {updatePost ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdatePost(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span>
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b className="singlePostAuthor">{post.username}</b>
            </Link>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updatePost ? (
          <textarea
            className="singlePostDescInput"
            value={dec}
            onChange={(e) => setDec(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{dec}</p>
        )}
        {updatePost && <button className="singlePostButton" onClick={handleUpdate}>Update Post</button>}
        

      </div>
    </div>
  );
}
