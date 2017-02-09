import React, {PropTypes} from 'react';

// temporary old markup
const Bio = props => {
  return (
    <div className="prose footer__profile">
      <div className="footer__avatar"/>
      <h3><a href={props.href}>{props.title}</a></h3>
      <p className="p--light">{props.text}</p>
    </div>
  );
};

// const Bio = props => {
//   return (
//     <div className="bio">
//       <div className="bio__image">
//         <img src={props.imageSrc} alt={props.imageAlt}/>
//       </div>
//       <div className="bio__main">
//         <h3><a href={props.href}>{props.title}</a></h3>
//         <p>{props.text}</p>
//       </div>
//     </div>
//   );
// };

Bio.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  title: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string
};

Bio.defaultProps = require('./defaults');

export default Bio;
