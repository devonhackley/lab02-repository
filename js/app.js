'use strict';
const creatureArray = [];
const section = $('#photo-template');
const select = $('select');
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
});

// display function
const renderPage = function(){
  const seen = new Set();
  section.empty();
  creatureArray.forEach(creature => {
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

    //create options for select - grab keywords
    if(!seen.has(creature.keyword)) {
      select.append(`<option>${creature.keyword}</option>`);
      seen.add(creature.keyword);
    }
  });
};
