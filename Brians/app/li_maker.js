import $ from 'jquery';

var liMaker = {
  append: function(restaurant, element){
    $(element).append(`<li>${restaurant.name}</li>`)
  }
}
export default liMaker
