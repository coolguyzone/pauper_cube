
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

//parse the names out of the list of URLs
imgUrls = imgUrls.map((ele) => {
  ele = ele.substring(0, ele.indexOf('&'));
  ele = ele.substring(ele.indexOf('=') + 1, ele.length).toLowerCase();
  return ele.split('%20').join(' ').split('%27').join(`'`);
})

//search functionality
let searchInput = document.querySelector('#search-form input');
let searchForm = document.querySelector('#search-form');
let searchList = document.querySelector('#search-results ul');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  //clear previous search Results
  searchList.innerHTML = '';
  //check for exact match
  if (imgUrls.indexOf(searchInput.value) > -1) {
    let newCard = document.createElement('li');
    newCard.innerHTML = `<li data-checked="true"><a href="http://gatherer.wizards.com/Pages/Card/Details.aspx?name=${
      searchInput.value
    }"><img src="http://gatherer.wizards.com/Handlers/Image.ashx?name=${
      searchInput.value
    }&amp;set=&amp;type=card" alt="Arcbound Worker"></a></li>`;
    searchList.append(newCard);
  }
//check for partial match
  else { imgUrls.forEach((ele) => {
    if (ele.indexOf(searchInput.value) > -1) {
      let newCard = document.createElement('li');
      newCard.innerHTML = `<li data-checked="true"><a href="http://gatherer.wizards.com/Pages/Card/Details.aspx?name=${
        ele
      }"><img src="http://gatherer.wizards.com/Handlers/Image.ashx?name=${
        ele
      }&amp;set=&amp;type=card" alt="Arcbound Worker"></a></li>`;
      searchList.append(newCard);
      }
    })
  }
//check for no results
  if (searchList.innerHTML === '') {
    searchList.innerHTML = '<h1>No Results!</h1>';
  }
});

//gather text information for cards

const url = 'https://api.magicthegathering.io/v1/cards?name=grim monolith';




imgUrls.shift();
imgUrls.shift();

let allCardData = [];

let counter = imgUrls.length;
let searchTextButton = document.querySelector('#search-text-button');


imgUrls.forEach((element) => {
  fetch(`https://api.magicthegathering.io/v1/cards?name=${element}`)
    .then((res) => {
      return res.json();
    })
    .then ((res) => {
      allCardData.push([element, res.cards[0].text]);
      counter --;
      if (counter === 0) {
        searchTextButton.innerHTML = "Text Search";
      }
    })
})


searchTextButton.addEventListener('click', (event) => {
  event.preventDefault();
  //clear previous search Results
  searchList.innerHTML = '';


//check for partial match
   allCardData.forEach((ele) => {
     if (ele[1] != undefined) {
       if (ele[1].toLowerCase().indexOf(searchInput.value) > -1) {
         let newCard = document.createElement('li');
         newCard.innerHTML = `<li data-checked="true"><a href="http://gatherer.wizards.com/Pages/Card/Details.aspx?name=${
           ele[0]
         }"><img src="http://gatherer.wizards.com/Handlers/Image.ashx?name=${
           ele[0]
         }&amp;set=&amp;type=card" alt="Arcbound Worker"></a></li>`;
         searchList.append(newCard);
         }
     }

    })

    // for (let i = 0; i < allCardData.length; i++) {
    //   let cardText = allCardData[i][1];
    //   if (cardText != undefined) {
    //     if (cardText.indexOf(searchInput.value) > -1) {
    //       let newCard = document.createElement('li');
    //       newCard.innerHTML = `<li data-checked="true"><a href="http://gatherer.wizards.com/Pages/Card/Details.aspx?name=${
    //         allCardData[i][0]
    //       }"><img src="http://gatherer.wizards.com/Handlers/Image.ashx?name=${
    //         allCardData[i][0]
    //       }&amp;set=&amp;type=card" alt="Arcbound Worker"></a></li>`;
    //       searchList.append(newCard);
    //       }
    //   }
    //
    // }

//check for no results
  if (searchList.innerHTML === '') {
    searchList.innerHTML = '<h1>No Results!</h1>';
  }
});
