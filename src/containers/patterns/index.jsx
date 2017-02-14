import React from 'react';
import Page from '../page';
import * as Patterns from '../../components';

export default class Main extends Page {
  render() {
    const props = this.props;
    // let postBody = (
    //   <div className="post__body">
    //     {props.children}
    //   </div>
    // );
    // if (props.innerHTML) {
    //   postBody = <div className="post__body" dangerouslySetInnerHTML={{__html: props.innerHTML}}/>;
    // }
    return (
      <main className="main main--page">
        <Patterns.Block classList={['prose', 'post']}>
          <h1 className="main__title">{props.pageHeading}</h1>
          <hr/>
          <h2>Biography</h2>
          <Patterns.Bio/>
          <hr/>
          <h2>Call to Action</h2>
          <Patterns.Cta/>
        </Patterns.Block>
      </main>
    );
  }
}

Main.defaultProps = {
  pageHeading: 'Pattern Library'
};
