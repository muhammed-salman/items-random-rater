import React from 'react';

const Footer = () => {
  return(
    <footer className="footer">
        <span className="copyright">
            Items Random Rater &copy; {(new Date()).getFullYear()} Muhammed Salman Shamsi.
        </span>
    </footer>
  );
};
export default Footer;