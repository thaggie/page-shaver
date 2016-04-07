(function() {
'use strict';

if (window.location.hash === '#debug-ps') {
    /*jshint debug:true */
    debugger;
}

var ids = [
	'essay',
	'blog',
	'story_content',
	'body-content',
	'story_content',
	'storyContent',
	'contentBody',
	'hldcontent',
	'contentColumn',
	'content',
	'article-container',
	'articleFullText',
	'main_text',
	'main',
	'Blog1',
	'constrictor',
	'pageLeftColumn'
];

var classes = [
    'ArticleCopy' // www.sitepoint.com
];

var stripAll = function(tag) {
	var elements = document.getElementsByTagName(tag);
	elements = Array.prototype.slice.call(elements);
	elements.forEach(function(element){
		element.parentNode.removeChild(element);
	});

};

var clearStyle = function(element) {
	if (element) {
		element.className = '';
		element.removeAttribute('style');
	}
};

var stripToJust = function(element, after) {
	var parentNode = element.parentNode,
	children = parentNode.childNodes,
	nc = children.length,
	i, child, toDelete = [];

	for (i=0; i<nc; ++i) {
		child = children[i];
		if (child !== element) {
			toDelete.push(child);
		}
	}

	toDelete.map(function(node) {
		parentNode.removeChild(node);
	});

	clearStyle(parentNode);
	if (parentNode.parentNode && parentNode !== document.body) {
		stripToJust(parentNode, true);
	}

	if (after) {
		clearStyle(document.body);
		stripAll('link');
		stripAll('style');
	}
};

var styleBody = function() {
	document.body.style.fontSize = '14pt';
	document.body.style.lineHeight = '1.5em';
	document.body.style.maxWidth = '40em';
	document.body.style.margin = '0 auto';
	document.body.style.background = 'none';
};

var articles = document.getElementsByTagName('article');
var content, i;

for (i=0; i<ids.length; ++i) {
	content = document.getElementById(ids[i]);
	if (content) {
		break;
	}
}

var filterOutListItemArticles = function (articles) {
	var filtered = [];
	var article = null;
	var i=0;

	for (i=0; i<articles.length; ++i) {
		article = articles[i];
		switch(article.parentNode.tagName) {
			case 'LI':
			case 'ASIDE':
				break;
			default:
				filtered.push(article);
				break;
		}
	}

	return filtered;
};

var largestArticle = function (articles) {
	articles.sort(function(a, b){return b.clientWidth-a.clientWidth;});
	return articles[0];
};

if (articles.length > 1) {
	articles = filterOutListItemArticles(articles);
}

var findByClasses = function() {

    for (var i=0; i<classes.length; ++i) {
        var elements = document.getElementsByClassName(classes[i]);
        if (elements.length === 1) {
            return elements[i];
        }
    }
};

switch (articles.length) {
	case 0:
	if (content) {
		stripToJust(content);
	} else {
        content = findByClasses();
        if (content) {
            stripToJust(content);
        }
    }
	break;
	case 1:
		stripToJust(articles[0]);
		break;
	default:
        stripToJust(largestArticle(articles));
		break;
}

window.zapIt = stripToJust;
styleBody();


})();
