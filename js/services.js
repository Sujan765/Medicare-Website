$(document).ready(function() {
    $(".service-card").click(function() {
        var name = $(this).find("h3").text();
        var price = $(this).find("span").text();
        alert("You picked " + name + " - " + price);
    });
});a