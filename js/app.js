'use strict';
const creatureArray = [];
const section = $('#photo-template');
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
  displayImage();
});

// display function
const displayImage = function(){
  section.empty();
  creatureArray.forEach(creature => {
    section.append(
      `<h2>${creature.title}</h2>
      <img src=${creature.url} alt=${creature.keyword}
      <p>${creature.description}</p>
      `
    );
  });
};
