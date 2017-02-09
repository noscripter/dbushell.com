import React, {Component, PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';
import {formatTitle} from '../../build/helpers';
import {renderFooter} from '../../components/footer';
import {renderNav} from '../../components/nav';
import {Block, Newsletter, Time} from '../../components';

class Article extends Component {
  render() {
    const props = this.props;
    const title = () => {
      return {__html: formatTitle(props.pageHeading)};
    };
    const body = () => {
      return {__html: props.html};
    };
    const date = () => {
      if (!props.portfolio) {
        return (
          <p className="post__date">
            <Time date={props.dateUnix}/>
          </p>
        );
      }
    };
    return (
      <main className="main main--single">
        <Block classList={['prose', 'post']}>
          <h1 className="post__title" dangerouslySetInnerHTML={title()}/>
          {date()}
          <div className="post__body" dangerouslySetInnerHTML={body()}/>
          <Newsletter/>
          <hr/>
          <p>
            <a rel="me noopener noreferrer" target="_blank" href="http://twitter.com/dbushell">Follow @dbushell on Twitter</a>
            <br/>
            <a href="/blog/">Return to Blog</a>
          </p>
        </Block>
      </main>
    );
  }

  static renderBody(el) {
    return `
${ReactDOMServer.renderToStaticMarkup(el)}
${renderFooter()}
${renderNav()}
`;
  }
}

Article.propTypes = {
  dateUnix: PropTypes.number,
  pageHeading: PropTypes.string,
  html: PropTypes.string,
  portfolio: PropTypes.bool
};

Article.defaultProps = {
  pageHeading: 'Untitled',
  dateUnix: Date.now(),
  html: 'End of file.',
  portfolio: false
};

export default Article;
