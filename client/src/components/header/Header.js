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

