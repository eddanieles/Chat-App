//global jQuery, Handlebars, Router

import $ from "jquery";
import Mustache from "mustache";

$(function (){

  $(".messages").hide()

  var username_text;

  $(".login").on("submit", function(e){
    $(".messages").show();
    username_text = $("#username").val();
    e.preventDefault();
   })

  var $messages_list = $("#messages_list");
  var $username = $("#username");
  var $input_message = $("#input_message");


  var messageTemplate = "<li data-id='{{id}}'>" +
  "<span class='usernames'>{{attributes.username}}</span> " +
  "<span class='dates'>{{attributes.created-at}}:</span> " +
  "<p class='text'>{{attributes.text}} <button class='remove'>Remove Post</button> </p> " +
  "</li>";



  function addMessage (message) {
    $messages_list.append(Mustache.render(messageTemplate, message));
  }

  $.ajax({
    type: 'GET',
    url: 'https://fathomless-woodland-51903.herokuapp.com/messages',
    headers: {
      "Authorization": "Token token=supadupasecret"
    },
    success:function(response) {
      $.each(response.data, function(i, item){
        addMessage(item);
      })
    },
    error: function(){
      alert("error loading messages");
    }
  })

  $("#post_button").on("click",function(){
    var $date = new Date();

    var message_line = {
      username: $username.val(),
      text: $input_message.val(),
      'created-at': $date,
    };

    console.log(message_line);

    $.ajax({
    type: 'POST',
    url: 'https://fathomless-woodland-51903.herokuapp.com/messages',
    headers: {
      "Authorization": "Token token=supadupasecret"
    },
    data: message_line,
    success: function(message) {
      addMessage(message);
    },
    error: function(){
      alert("error posting message");
    }
  });

    $input_message.val("");
  })

  $("#messages_list").on("click", ".remove", function(event){
    console.log(username_text);
    var self = $(this);
    console.log(self.closest("li").children("span.usernames"));
    $.ajax({
      url: `https://fathomless-woodland-51903.herokuapp.com/messages/${self.closest("li").data("id")}`,
      type: "DELETE",
      headers: {
        "Authorization": "Token token=supadupasecret"
      },
      success: function(data){
        self.closest("li").remove()
      }
    })
  })


});
