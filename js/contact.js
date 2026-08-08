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

        
        feedback
            .removeClass('error')
            .addClass('success')
            .html('✅ Form submitted successfully!');

        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Subject:', subject);
        console.log('Message:', message);
    });

});