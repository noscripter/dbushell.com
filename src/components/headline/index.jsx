import React, {PropTypes} from 'react';

const Headline = props => {
  return (
    <div className="headline">
      <h1>{props.children}</h1>
    </div>
  );
};

Headline.propTypes = {
  children: PropTypes.node
};

export default Headline;
