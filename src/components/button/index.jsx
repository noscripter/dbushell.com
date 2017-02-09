import React, {PropTypes} from 'react';

/**
 * button__label
 */

export const ButtonLabel = props => {
  return (
    <span className="button__label">{props.children}</span>
  );
};

ButtonLabel.propTypes = {
  children: PropTypes.node
};

/**
 * button
 */

const attr = {
  className: 'button'
};

const Button = props => {
  const label = <ButtonLabel>{props.text}</ButtonLabel>;
  let button;
  if (props.submit) {
    button = <button type="submit" {...attr}>{label}</button>;
  } else {
    button = <a href={props.href} {...attr}>{label}</a>;
  }
  return button;
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  submit: PropTypes.bool
};

export default Button;
