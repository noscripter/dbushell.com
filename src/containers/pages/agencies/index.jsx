import path from 'path';
import Page from '../../page';

export default class Main extends Page {}

Main.defaultProps = {
  pageHeading: 'Working with Agencies',
  innerHTML: Page.getHTML(path.join(__dirname, 'content.md'))
};
