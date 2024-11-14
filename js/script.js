'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

const opts = {
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-',
  },
};

const select = {
  all: {
    articles: '.post',
    linksTo: {
      tags: 'a[href^="#tag-"]',
      activeTags: 'a.active[href^="#tag-"]',
      authors: 'a[href^="#author-"]',
      activeAuthors: 'a.active[href^="#author-"]',
    },
  },
  article: {
    title: '.post-title',
    tags: '.post-tags .list',
    author: '.post-author',
  },
  listOf: {
    titles: '.titles',
    tags: '.tags.list',
    authors: '.authors.list',
  },
};

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (const activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (const activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');

};

function generateTitleLinks(customSelector = '', customAuthor = ''){

  /* [DONE] remove contents of titleList */

  document.querySelector(select.listOf.titles).innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(select.all.articles + customSelector + customAuthor);

  for (const article of articles) {

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(select.article.title).innerHTML;

    /* [DONE] create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* [DONE] insert link into titleList */

    document.querySelector(select.listOf.titles).insertAdjacentHTML('beforeend', linkHTML);
  }

  /* Fix bug */

  const links = document.querySelectorAll('.titles a');

  for (const link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };
  for (const tag in tags) {
    console.log(`${tag} is used ${tags[tag]} times`);
    params.max = tags[tag] > params.max ? tags[tag] : params.max;
    params.min = tags[tag] < params.min ? tags[tag] : params.min;
  }
  return params;
}

function calculateTagClass(count, params) {
  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * (opts.tagSizes.count - 1) + 1);
  return `${opts.tagSizes.classPrefix}${classNumber}`;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  const allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(select.all.articles);

  /* [DONE] START LOOP: for every article: */
  for (const article of articles) {

    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(select.article.tags);

    /* [DONE] make html variable with empty string */
    let linksHTML = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* [DONE] START LOOP: for each tag */
    for (const tag of articleTagsArray) {

      /* [DONE] generate HTML of the link */
      const tagHTMLData = {tagKey: tag};
      const tagHTML = templates.tagLink(tagHTMLData);

      /* [DONE] add generated code to html variable */
      linksHTML = linksHTML + tagHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* [DONE] END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = linksHTML;

  /* [DONE] END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(select.listOf.tags);

  const tagsParams = calculateTagsParams(allTags);

  /* [NEW] create variable for all links HTML code */
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for (const tag in allTags) {

    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();

function tagClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!');

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');

  /* [DONE] find all tag links with class active */
  const activeTagLinks = document.querySelectorAll(select.all.linksTo.activeTags);

  /* [DONE] START LOOP: for each active tag link */
  for (const tag of activeTagLinks) {

    /* [DONE] remove class active */
    tag.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(`a[href="${href}"]`);

  /* [DONE] START LOOP: for each found tag link */
  for (const tag of tagLinks) {

    /* [DONE] add class active */
    tag.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-tags~="${tag}"]`);

}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const tagLinks = document.querySelectorAll(select.all.linksTo.tags);

  /* [DONE] START LOOP: for each link */
  for (const tag of tagLinks) {

    /* [DONE] add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  const allAuthors = {};
  const articles = document.querySelectorAll(select.all.articles);

  for (const article of articles) {
    const authorWrapper = article.querySelector(select.article.author);
    const articleAuthor = article.getAttribute('data-author');

    const authorHTMLData = {author: articleAuthor};
    const authorHTML = templates.authorLink(authorHTMLData);
    authorWrapper.innerHTML = authorHTML;

    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
  }
  const authorList = document.querySelector(select.listOf.authors);
  const allAuthorsData = {authors: []};

  for (const author in allAuthors) {
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });
  }
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Author was clicked!');

  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-','');
  const activeAuthorLinks = document.querySelectorAll(select.all.linksTo.activeAuthors);

  for (const authorLink of activeAuthorLinks) {
    authorLink.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll(`a[href="${href}"]`);

  for (const authorLink of authorLinks) {
    authorLink.classList.add('active');
  }

  generateTitleLinks(`[data-author="${author}"]`);
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll(select.all.linksTo.authors);

  for (let author of authorLinks){
    author.addEventListener('click',authorClickHandler);
  }
}

addClickListenersToAuthors();
