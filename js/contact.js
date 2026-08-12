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

        var errors = [];

        if (name === '') {
            errors.push('Full name is required');
        }

        if (email === '') {
            errors.push('Email address is required');
        } else if (!email.includes('@') || !email.includes('.')) {
            errors.push('Please enter a valid email address');
        }

        if (subject === '') {
            errors.push('Subject is required');
        }

        if (message === '') {
            errors.push('Message is required');
        }

        if (errors.length > 0) {
            feedback
                .removeClass('success')
                .addClass('error')
                .html('❌ ' + errors.join('<br>'));
            return;
        }

        var contactData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: new Date().toLocaleString()
        };

        localStorage.setItem('contactMessage', JSON.stringify(contactData));

        feedback
            .removeClass('error')
            .addClass('success')
            .html('✅ Thanks ' + name + '! Your message has been sent successfully.');

        this.reset();

        console.log('Contact message saved:', JSON.parse(localStorage.getItem('contactMessage')));
    });

    
    var savedContact = JSON.parse(localStorage.getItem('contactMessage'));
    if (savedContact) {
        console.log('Previously saved contact message:', savedContact);
        $('#formFeedback')
            .removeClass('error')
            .addClass('success')
            .html('📩 You have a previously saved message from ' + savedContact.name + '.');
    }

    
    $('.faq-question').on('click', function() {
        var parent = $(this).parent('.faq-item');

        if (parent.hasClass('active')) {
            parent.removeClass('active');
        } else {
            $('.faq-item').removeClass('active');
            parent.addClass('active');
        }
    });

});