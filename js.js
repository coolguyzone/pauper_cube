
(function() {
  'use strict';

  var repeat = function(n, s) { return new Array(n + 1).join(s); };
  var counts = [];
  var output = '\n';
  var nodeList = document.getElementsByTagName('h3');
  for (var idx = 0; idx < nodeList.length; idx += 1) {
    var left = nodeList[idx].textContent + ' ';
    var right = ' ' + (counts[counts.length] = nodeList[idx].nextElementSibling.getElementsByTagName('li').length);
    output += left + repeat(20 - left.length - right.length, '.') + right + '\n';
  }
  var total = String(counts.reduce(function(a, b) { return a + b; }, 0));
  output += repeat(20, '=') + '\n';
  output += repeat(20 - total.length, ' ') + total + '\n';
  output += '\n';
  console.log(output);

  var largeCard = document.getElementById('large-card');
  document.body.addEventListener('mouseover', function(event) {
    if (event.target.tagName === 'IMG') {
      largeCard.alt = event.target.alt;
      largeCard.src = event.target.src;
    }
  }, false);

  var searchLargeCard = document.getElementById('search-large-img');
  document.body.addEventListener('mouseover', function(event) {
    if (event.target.tagName === 'IMG') {
      searchLargeCard.alt = event.target.alt;
      searchLargeCard.src = event.target.src;
    }
  }, false);

}());


//Alex's work

let searchPopup = document.querySelector('#search-popup');
let searchLink = document.querySelector('#search-link');
let popupCloser = document.querySelector('#popup-closer');

//make search button display popup div
searchLink.addEventListener('click', () => {
  searchPopup.classList.remove('hidden');
});

//make closing button in popup div hide the div
popupCloser.addEventListener('click', () => {
  searchPopup.classList.add('hidden');
});

//create a list of all the available cards
let imgs = document.querySelectorAll('img');
let imgUrls = [];
imgs.forEach((element) => {
  imgUrls.push(element.src);
});

imgUrls = imgUrls.map((ele) => {
  ele = ele.substring(0, ele.indexOf('&'));
  ele = ele.substring(ele.indexOf('=') + 1, ele.length).toLowerCase();
  return ele.split('%20').join(' ').split('%27').join(`'`);
})

console.log(imgUrls)

let searchInput = document.querySelector('#search-form input');
let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (imgUrls.indexOf(searchInput.value) > -1) {
    console.log(searchInput.value);
  }

  imgUrls.forEach((ele) => {
    if (ele.indexOf(searchInput.value) > -1) {
      console.log(ele)
    }
  })

})
