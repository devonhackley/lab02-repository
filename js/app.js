'use strict';
let creatureArray = [];
const section = $('#photo-template');
const select = $('select');
let keywordFilter = 'See All';
let seen = [];
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
      displayCreatureDetails(creature);
    }
  });
  keywordFilter = 'See All';
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

const creatureRender = Handlebars.compile($('#creature-template').text());
//helper function to create our elements
const displayCreatureDetails = function(creature) {
  section.append(creatureRender(creature));

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
  seen = [];
  event.preventDefault();
  let filePath = `./data/${event.target.id}.json`;
  select.empty();
  renderData(filePath);
};
renderData('./data/page-1.json');
aLink.on('click', linkHandler);
select.on('change', selectOptionHandler);
