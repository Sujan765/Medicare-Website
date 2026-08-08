$(document).ready(function() {

    // Click effect on contact cards
    $('.contact-card').on('click', function() {
        var title = $(this).find('h3').text();
        var info = $(this).find('p').text();
        alert('📌 ' + title + ': ' + info);
    });

});