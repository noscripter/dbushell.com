'use strict';

import fs from 'fs';
import Handlebars from 'handlebars';
import {render} from 'enzyme';
import {html as beautify} from 'js-beautify';
import {markdown} from './process';

/**
 * Format page title to avoid orphans on desktop.
 */
export function formatTitle(title) {
  const esc = Handlebars.Utils.escapeExpression;
  const words = title.split(' ');
  if (words.length > 3 && words[words.length - 1].length < 9) {
    const pos = title.lastIndexOf(' ');
    title = esc(title.substr(0, pos)) + '<span class="nbsp">&nbsp;</span>' + esc(title.substr(pos + 1));
  } else {
    title = esc(title);
  }
  return title;
}

/**
 * Convert Markdown file content to HTML.
 */
export function md2HTML(file) {
  return markdown(fs.readFileSync(file, 'utf8'));
}

/**
 * Beautified HTML to help compare snapshots.
 */
export const outerHTML = el => beautify(
  (typeof el.html === 'function' ? el.html() : render(el).html()),
  // eslint-disable-next-line camelcase
  {indent_size: 2}
);
