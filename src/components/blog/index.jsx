import React, {PropTypes} from 'react';
import {Time} from '../';

// temporary old markup
const Blog = props => {
  const attr = {
    className: 'prose footer__blog',
    role: 'complementary'
  };
  return (
    <aside {...attr}>
      <h3>{props.heading}</h3>
      <ul>
        {props.items.map(item => (
          <li key={item.id}>
            <a rel="bookmark" href={item.href}>{item.title}</a>
            <Time date={item.date}/>
          </li>
        ))}
      </ul>
    </aside>
  );
};

// const Blog = props => {
//   const attr = {
//     className: 'blog',
//     role: 'complementary'
//   };
//   return (
//     <aside {...attr}>
//       <Prose>
//         <h3>{props.heading}</h3>
//       </Prose>
//       <ul className="blog__list">
//         {props.items.map(item => (
//           <li key={item.id} className="blog__item">
//             <a rel="bookmark" href={item.href}>{item.title}</a>
//             <Time date={item.date}/>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// };

Blog.propTypes = {
  heading: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      href: PropTypes.string,
      date: PropTypes.number
    })
  )
};

Blog.defaultProps = require('./defaults');

export default Blog;
