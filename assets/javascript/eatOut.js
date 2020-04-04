
var uiCoords = document.getElementById("button-here");
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        uiCoords.innerHTML = "Location: " + position.coords.latitude + "," + position.coords.longitude;
    });
} else {
    console.log("Geolocation is not supported by this browser.");
};

$(document).ready(function () {

    var foodtopics = [];

    function displayButtons() {
        $(".buttons-view").empty();

        for (var i = 0; i < foodtopics.length; i++) {
            var showButton = $("<button>");

            showButton.addClass("btnClass");
            showButton.addClass("animation-target")
            showButton.attr("data-food", foodtopics[i]);
            showButton.text(foodtopics[i]);
            $(".buttons-view").append(showButton);
        }
    }
$("#button-here").on("click", function(event) {
    event.preventDefault();
    var food = $("#food-input").val().trim();
    foodtopics.push(food);
    displayButtons();
});

function displayRecipes() {
    var food = $(this).attr("data-food");
    //Need Zomato API link
    var queryURL = 

    $.ajax({
        url:queryURL,
        method: "GET"
    })
    .then(function(response) {
        $("#recipe-col-1").empty();
        $("#recipe-col-2").empty();
        $("#recipe-col-3").empty(); 
        var foodResults = response.results;

        //If no information on search is available, alert the user. Need to turn this into a modal
        if (foodResults.length === 0) {
            //Need to change alert 
            alert('Sorry, there are no recipe for this topic');
            var itemindex = foodTopics.indexOf(food);
            // otherwise display button
            if (itemindex > -1) {
                foodTopics.splice(itemindex, 1);
                displayButtons();
                    }
                }
                for (var j = 0; j < foodResults.length; j++) {
                   
                    var foodDiv = $("<div>");
                    var r = $("<h5>").text(foodResults[j].DailyMenuCategory.name);
                    var q = $("<h5>").text(foodResults[j].DailyMenuItem.name);
                    var p = $("<h9>").text(foodResults[j].DailyMenuItem.price);
                    // var u = $("<href>").text(results[j].recipe.url);

                    // var foodDiv = $("<a href=" + results[j].recipe.url + "</a>");
                    var foodImage = $("<img>");
                    foodImage.attr("src", foodResults[j].RestaurantL3.featured_image);
                    foodImage.attr("url", foodResults[j].RestaurantL3.featured_image);
                    foodImage.addClass("image");
                    foodDiv.append(foodImage);
                    foodDiv.addClass("card", "card-img-top", "card-body");
                    foodDiv.append(q);
                    // foodDiv.append(u);
                    // u.attr("href");
                    // var modalLink = foodResults[j].summary;
                    foodDiv.attr("data-summary", foodResults[j].summary);
                    //used bounce.js for animation of card
                    foodDiv.addClass("animation-target");
                
                    foodDiv.click(function () {
                        console.log($(this));
                        $("#modalWindow").modal("show");
                        // CHASE - Fetch the summary
                        var summary = $(this).attr('data-summary')
                        // CHASE - Put summary in body
                        $(".modal-body").html(summary);
                      });

                    if (j >= 0 && j < 3) {
                        $("#recipe-col-1").append(foodDiv);
                    } else if (j >= 3 && j < 7) {
                        $("#recipe-col-2").append(foodDiv);
                    } else {
                        $("#recipe-col-3").append(foodDiv);
                    }
                }
            })

