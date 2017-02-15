import React from 'react';

const Newsletter = () => {
  return (
    <aside className="newsletter" role="complementary">
      <form id="newsletter" action="//dbushell.us1.list-manage.com/subscribe/post?u=f1621b8d47b205bc9a898c68f&amp;id=84a4c62ca9" method="post" name="mc-embedded-subscribe-form" target="_blank" noValidate>
        <h4>Side projects newsletter</h4>
        <p className="p--small">Every now and then I release something cool, be the first to know!</p>
        <div className="form form--single newsletter__form">
          <ul className="form__list">
            <li className="form__item">
              <label htmlFor="mce-EMAIL">Email Address</label>
              <input type="email" value="" name="EMAIL" className="field" id="mce-EMAIL" placeholder="me@example.com&hellip;"/>
            </li>
            <li className="form__item">
              <div style={{visibility: 'hidden', display: 'none', position: 'absolute'}} aria-hidden="true">
                <input type="text" name="b_f1621b8d47b205bc9a898c68f_84a4c62ca9" value=""/>
              </div>
              <input className="button" type="submit" value="Subscribe" name="subscribe"/>
            </li>
          </ul>
        </div>
        <div className="newsletter__format">
          <label className="label">Email Format:</label>
          <label htmlFor="mce-EMAILTYPE-0" className="label label--checkbox"><input type="radio" value="html" name="EMAILTYPE" id="mce-EMAILTYPE-0" defaultChecked/> <span>HTML</span></label>
          <label htmlFor="mce-EMAILTYPE-1" className="label label--checkbox"><input type="radio" value="text" name="EMAILTYPE" id="mce-EMAILTYPE-1"/> <span>Text</span></label>
        </div>
      </form>
    </aside>
  );
};

export default Newsletter;
