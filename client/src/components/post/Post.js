import { Link } from "react-router-dom";
import "./post.css";


export default function Post({post}) {
  const PF ="http://localhost:3002/images/"
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt=""/>}
      <div className="postInfo">
        <div className="postCats">
        
{post.categories.map((ct,index) =>(
  <span className="postCat" key={index}>
    
    {ct.name}
  </span>
))}


        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
          {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">{post.dec} </p>
    </div>
  );
}