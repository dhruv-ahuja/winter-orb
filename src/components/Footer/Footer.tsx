import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <hr className="footer-section" />
        <div className="footer-content">
          <div className="footer-declaration">
            This product isn't affiliated with or endorsed by Grinding Gear Games in any way.
          </div>

          <div className="footer-icons">
            <a href="https://github.com/dhruv-ahuja" target="_blank" rel="noopener">
              <img className="footer-icon" src="/github.svg" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
