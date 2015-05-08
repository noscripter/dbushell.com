dbushell-com
============

> Build process and source for [dbushell.com](http://dbushell.com/)

## What’s in here?

Quite a lot! It builds my website by:

* compiling Markdown and Handlebars templates using [Metalsmith](http://www.metalsmith.io/) to generate a static site
* processing assets — SVG, CSS, JavaScript etc — using [Grunt](http://gruntjs.com/) tasks

## Can I build it?

You can try, it probably won’t work! The build process is configured for my servers and there are outside dependencies. If you’re familiar with Grunt and Node you may find the tasks useful. Feel free to copy / adapt them for your own use.

Why Grunt **and** Metalsmith? Long story... my website used to be WordPress using Grunt for assets. Needing to migrate from WordPress, I decided to experiment with Metalsmith. Rather than reimplementing my asset automation I just integrated a Metalsmith task.

Everything in directories prefixed `src-` is mine!

* * *

Copyright © [David Bushell](http://dbushell.com) | [@dbushell](http://twitter.com/dbushell)
