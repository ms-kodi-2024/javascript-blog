'use strict';

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
  
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* [DONE] remove contents of titleList */

  document.querySelector(optTitleListSelector).innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);

  for (const article of articles) {

    /* [DONE] get the article id */
  
    const articleId = article.getAttribute('id');
  
    /* [DONE] find the title element */   
    /* [DONE] get the title from the title element */
    
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
    /* [DONE] create HTML of the link */
    
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
  
    /* [DONE] insert link into titleList */
    
    document.querySelector(optTitleListSelector).insertAdjacentHTML('beforeend', linkHTML);    
  }

  /* Fix bug */
  
  const links = document.querySelectorAll('.titles a');

  for (const link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();