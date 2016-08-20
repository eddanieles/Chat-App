import $ from 'jquery';
import data from './data';
import liMaker from './li_maker';

$(document).ready(() => {
  data.forEach((restaurant) => liMaker.append(restaurant, "#restaurants"))
})
