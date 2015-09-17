#Page Shaver

Bookmarklet to try and remove the distracting elements in long blog posts so that they're easier to read.

The bookmarklet to make use of this is:
```
javascript:(function(){var%20tag%20=%20document.createElement('script');tag.setAttribute('type','text/javascript');tag.setAttribute('src','//rawgit.com/thaggie/page-shaver/master/ps.js');document.head.appendChild(tag);})();
```

[This blog post](http://thaggie.github.io/2014/12/30/page-shaver.html) has a link you can drag to your bookmarks bar (or click to test).
