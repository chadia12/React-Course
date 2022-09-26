import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Feel free to try</span>
        <span className="headerTitleLg">MY BLOG</span>
      </div>
      <img
        className="headerImg"
        src="headerpic.jpg"
        alt=""
      />
    </div>
  );
}

//https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940