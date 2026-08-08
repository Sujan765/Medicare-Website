$(document).ready(function() {

    $('.contact-card').on('click', function() {
        var title = $(this).find('h3').text();
        var info = $(this).find('p').text();
        alert('📌 ' + title + ': ' + info);
    });

    
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var subject = $('#subject').val().trim();
        var message = $('#message').val().trim();
        var feedback = $('#formFeedback');

        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Subject:', subject);
        console.log('Message:', message);
    });

});