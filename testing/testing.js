import $ from "jquery";
import Mustache from "mustache";

$(function (){

  var $orders = $("#orders");
  var $name = $("#name");
  var $drink = $("#drink");

  var orderTemplate = "" +
  "<li>" +
  "<p><strong>Name:</strong> {{name}}</p>" +
  "<p><strong>Drink:</strong> {{drink}}</p>" +
  "<button data-id='{{id}}' class='remove'>X</button>" +
  "</li>";

  function addOrder (order) {
    $orders.append(Mustache.render(orderTemplate, order));
  }

  $.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/eddanieles/drinks',
    success:function(orders){
      $.each(orders, function(i, order){
        addOrder(order);
      })
    },
    error:function(){
      alert("error loading orders");
    }
  })

  $("#add-order").on("click",function(){
    var order = {
      name: $name.val(),
      drink: $drink.val(),
    };

    $.ajax({
    type: 'POST',
    url: 'http://rest.learncode.academy/api/eddanieles/drinks',
    data: order,
    success: function(newOrder) {
      addOrder(newOrder);
    },
    error:function(){
      alert("error saving orders");
    }
  });

    $name.val("");
    $drink.val("");
  })

  $orders.delegate(".remove", "click", function(){

    var $li = $(this).closest("li");
    $.ajax({
    type: 'DELETE',
    url: 'http://rest.learncode.academy/api/eddanieles/drinks/' + $(this).attr('data-id'),
    success: function() {
      $li.remove();
    }
  });
  })




})
