'use strict';
const creatureArray = [];
const section = $('#photo-template');
const select = $('select');
let keywordFilter = '';
const seen = [];

const Creature = function(url, title, description, keyword, horns){
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  creatureArray.push(this);
};

// grab data and render
$.get('./data/page-1.json', data => {
  data.forEach(obj => {
    new Creature(obj.image_url, obj.title, obj.description, obj.keyword, obj.horns);
  });
  renderPage();
  renderSelectOptions();
});

// display function
const renderPage = function(){
  section.empty();

  creatureArray.forEach(creature => {
    //if keywordFilter is set, filter
    if(keywordFilter) {
      if(creature.keyword === keywordFilter) {
        displayCreatureDetails(creature);
      }
    } else {
      select.empty();
      displayCreatureDetails(creature);
    }

  });
  keywordFilter = '';
  select.on('change', selectOptionHandler);
};

//function to render select options
const renderSelectOptions = function() {
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
    <li><img src=${creature.url} alt=${creature.keyword}</li>
    <li><p>${creature.description}</p></li>
    </ul>
    </div>
    `
  );
};

//helper function to put event handler on select
const selectOptionHandler = function() {
  event.preventDefault();
  console.log('SELECT value??? ', select[0].selectedOptions[0].value);
  console.log('value??? ', select[0].options[select[0].options.selectedIndex].value);
  keywordFilter = select[0].selectedOptions[0].value; //select[0].options.selectedOptions[0].value;
  renderPage();
};
