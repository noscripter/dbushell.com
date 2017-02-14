import React, {PropTypes} from 'react';

const Bio = props => {
  const schema = {
    itemScope: true,
    itemType: 'http://schema.org/Person'
  };
  return (
    <section className="b-bio" role="complementary" {...schema}>
      <div className="b-bio__image">
        <img src={props.imageSrc} alt={props.imageAlt}/>
      </div>
      <div className="b-bio__main" itemProp="description">
        <h3><a href={props.href} itemProp="name">{props.title}</a></h3>
        <p className="p--light">{props.text}</p>
      </div>
    </section>
  );
};

Bio.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  title: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string
};

Bio.defaultProps = require('./defaults');

export default Bio;
