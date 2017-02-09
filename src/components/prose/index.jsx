import React, {PropTypes} from 'react';

const Prose = props => {
  return (
    <div className="prose">{props.children}</div>
  );
};

Prose.propTypes = {
  children: PropTypes.node
};

export default Prose;
