---
date: 2016-07-14 10:00:00+00:00
draft: true
slug: wordpress-theme-emma-leicester
template: single.html
title: 'Building a WordPress Theme'
---

I was delighted when [Base Creative](https://www.basecreative.co.uk/) asked me to help build their beautifully designed website for the portfolio of [Emma Leicester](http://www.emmaleicester.co.uk/). 
It’s always a joy to work for Base Creative knowing that my role is made easier by the care and attention they deliver.

<p class="post__image">![Website design for Emma Leicester by Base Creative, London](/images/blog/wordpress-theme-emma-leicester.png)</p>

As always I started with a flat HTML build so that I could focus on CSS and the design’s responsiveness in the browser.

## Responsive Patterns


The design for the “article” component (used for blog listings) proved most challenging to code. The screenshots below show how articles sit within a grid, resize, and change layout across breakpoints.

<p class="post__image">![Blog design for Emma Leicester by Base Creative, London](/images/blog/wordpress-eleicester-articles.png)</p>

Through experimentation in the browser I discovered the optional image size to cover all breakpoints. CSS is used to effectively center and crop the image if the aspect ratio for its container differs.

It’s important to avoid multiple images because this makes content management a chore.

Flexbox is used in supporting browsers for perfect alignment of content. It’s remarkably tricker otherwise to get those buttons aligned to the bottom of the container! 

## Moving to WordPress

With HTML and CSS ready as static templates it becomes a much easier process to deconstruct and reassemble these into a WordPress theme, rather than doing both simultaneously.

I use [MAMP PRO](https://www.mamp.info/en/) because its super quick to set up local WordPress installs. To really make the most of WordPress as a CMS I find the [Advanced Custom Fields](https://www.advancedcustomfields.com/) plugin to be indispensable.

## Infinite Scroll

Infinite scroll is super simple to implement for WordPress themes!

After some trial and error I found the aptly named, if a tad longwinded, [“Infinite Scroll and Load More Ajax Pagination”](https://wordpress.org/plugins/infinite-scroll-and-load-more-ajax-pagination/) plugin to do exactly what I needed (without the feature bloat that spoils many plugins).

For the infinite scroll to work you implement the blog as standard with “Previous” and “Next” pagination. At this stage blog pages are now perfectly **accessible** and **indexable**. Then you tell the plugin your CSS selectors:

<p class="post__image">![WordPress infinite scroll plugin settings](/images/blog/wordpress-infinite-scroll-plugin.png)</p>

These selectors match the HTML structure I’ve used for blog listings and pagination:

```markup
<div class="grid grid--infinite">
  <div class="grid__item grid__item--infinite">
    <article class="article"> ... </article> 
  </div>
  <!-- grid__item repeats per post -->
</div>
<div class="pagination">
  <a class="button button--pagination-prev" href="">Previous</a>
  <a class="button button--pagination-next" href="">Next</a>
</div>
```

I’m using modifier classes with `--infinite` to ensure grids used elsewhere on the page are ignored by the plugin. Once setup, the plugin uses JavaScript to replace the pagination with a customisable “More” button:

<p class="post__image">![WordPress infinite scroll loading](/images/blog/wordpress-infinite-load.gif)</p>

When clicked, blog articles from previous pages are loaded and appended to the grid. There is of course an option to automatically load new articles on scroll for the true “infinite scroll” effect. Personally I prefer a button because unexpected changes that force the page to repaint can cause scroll lag and jumpiness on mobile.

This is a clean example of progressive enhancement in action.

## Final Thoughts

Thanks again to [Base Creative](https://www.basecreative.co.uk/) for allowing me to work on this project.