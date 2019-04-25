'use strict';
let creatureArray = [];
const section = $('#photo-template');
const select = $('select');
let keywordFilter = 'See All';
const seen = [];
let aLink = $('a');

const Creature = function(url, title, description, keyword, horns){
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  creatureArray.push(this);
};

// grab data and render
const renderData = function(filePath) {
  /*
  './data/page-1.json'
  */
  $.get(filePath, data => {
    data.forEach(obj => {
      new Creature(obj.image_url, obj.title, obj.description, obj.keyword, obj.horns);
    });
    renderPage();
    renderSelectOptions();
  });
};

// display function
const renderPage = function(){
  section.empty();

  creatureArray.forEach(creature => {
    //if keywordFilter is set, filter
    if(keywordFilter !== 'See All') {
      if(creature.keyword === keywordFilter) {
        displayCreatureDetails(creature);
      }
    } else {
      //select.empty();
      displayCreatureDetails(creature);
    }
  });
  keywordFilter = 'See All';
  select.on('change', selectOptionHandler);
};

//function to render select options
const renderSelectOptions = function() {
  select.append(`<option>See All</option>`);
  creatureArray.forEach(creature => {
    if(!seen.includes(creature.keyword)) {
      select.append(`<option>${creature.keyword}</option>`);
      seen.push(creature.keyword);
    }
  });
};

//helper function to create our elements
const displayCreatureDetails = function(creature) {
  section.append(
    `<div>
    <h2>${creature.title}</h2>
    <ul>
    <li><img src=${creature.url} alt=${creature.keyword}></li>
    <li><p>${creature.description}</p></li>
    </ul>
    </div>
    `
  );
};

//helper function to put event handler on select
const selectOptionHandler = function() {
  event.preventDefault();
  keywordFilter = select[0].selectedOptions[0].value;
  renderPage();
};

//event listener for links to navigate to diff pages
const linkHandler = function(event) {
  creatureArray = [];
  console.log('EVENT! ', event);
  event.preventDefault();
  const filePath = `./data/${event.target.id}.json`;
  renderData(filePath);
  //event.id
};

renderData('./data/page-2.json');
aLink.on('click', linkHandler);
