import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
  return(
    <footer className="footer">
        <span className="copyright">
            Items Random Rater &copy; {(new Date()).getFullYear()} Muhammed Salman Shamsi.
        </span>
    </footer>
  );
};
export default Footer;