import React, {PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';
import {Icon} from '../';

const Nav = props => {
  return (
    <nav className="nav nav--flex" id="nav">
      <h2 className="nav__title">{props.heading}</h2>
      <ul className="nav__list" data-root="true">
        {props.items.map(item => (
          <li key={item.order} className="nav__item" data-priority={item.priority} data-order={item.order}>
            <a href={item.href} className="nav__link">{item.text}</a>
          </li>
        ))}
        <li className="nav__item nav__item--icons" data-priority={props.items.length + 1} data-order={props.items.length + 1}>
          <a className="nav__link nav__link--twitter" rel="me noopener noreferrer" target="_blank" title="David Bushell on Twitter" href="http://twitter.com/dbushell">
            <Icon id="twitter"/>
            <span>@dbushell</span>
          </a>
          <a className="nav__link nav__link--github" rel="me noopener noreferrer" target="_blank" title="David Bushell on GitHub" href="https://github.com/dbushell/">
            <Icon id="github"/>
            <span>GitHub</span>
          </a>
          <a className="nav__link nav__link--codepen" rel="me noopener noreferrer" target="_blank" title="David Bushell on CodePen" href="http://codepen.io/dbushell/">
            <Icon id="codepen"/>
            <span>CodePen</span>
          </a>
        </li>
        <li className="nav__item nav__item--more">
          <button type="button" className="nav__link">
            <Icon id="nav"/>
          </button>
          <ul className="nav__list nav__dropdown"/>
        </li>
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  heading: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      order: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      priority: PropTypes.number.isRequired
    })
  )
};

Nav.defaultProps = require('./defaults');

export default Nav;

export function renderNav(props) {
  return ReactDOMServer.renderToStaticMarkup(<Nav {...props}/>);
}
