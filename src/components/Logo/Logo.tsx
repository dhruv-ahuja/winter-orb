import "./logo.css";

const Logo = () => {
  return (
    <a className="logo-link" href="/" title="WinterOrb">
      <header id="logo" className="logo">
        <img src="./logo.png" className="logo-img" />
        <span className="logo-text">
          <span className="logo-colored-text">Winter</span>Orb
        </span>
      </header>
    </a>
  );
};

export default Logo;
