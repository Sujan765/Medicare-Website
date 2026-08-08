$(document).ready(function() {

    console.log('Contact Page Loaded Successfully');

    // ==========================================
    // 1. REAL-TIME VALIDATION
    // ==========================================

    $('#contactName')
        .on('blur', function() {
            validateContactName($(this));
        })
        .on('input', function() {
            if ($(this).val().length > 0) {
                validateContactName($(this));
            }
        });

    $('#contactEmail')
        .on('blur', function() {
            validateContactEmail($(this));
        })
        .on('input', function() {
            if ($(this).val().length > 0) {
                validateContactEmail($(this));
            }
        });

    $('#contactSubject')
        .on('blur', function() {
            validateContactSubject($(this));
        })
        .on('input', function() {
            if ($(this).val().length > 0) {
                validateContactSubject($(this));
            }
        });

    $('#contactMessage')
        .on('blur', function() {
            validateContactMessage($(this));
        })
        .on('input', function() {
            if ($(this).val().length > 0) {
                validateContactMessage($(this));
            }
        });

    // ==========================================
    // 2. VALIDATION FUNCTIONS
    // ==========================================

    function validateContactName($field) {
        var value = $field.val().trim();
        var $error = $('#contactNameError');
        if (value.length === 0) {
            $field.addClass('error');
            $error.text('Full name is required');
            return false;
        } else if (value.length < 2) {
            $field.addClass('error');
            $error.text('Name must be at least 2 characters');
            return false;
        } else {
            $field.removeClass('error');
            $error.text('');
            return true;
        }
    }

    function validateContactEmail($field) {
        var value = $field.val().trim();
        var $error = $('#contactEmailError');
        if (value.length === 0) {
            $field.addClass('error');
            $error.text('Email address is required');
            return false;
        } else if (!isValidEmail(value)) {
            $field.addClass('error');
            $error.text('Please enter a valid email address');
            return false;
        } else {
            $field.removeClass('error');
            $error.text('');
            return true;
        }
    }

    function validateContactSubject($field) {
        var value = $field.val().trim();
        var $error = $('#contactSubjectError');
        if (value.length === 0) {
            $field.addClass('error');
            $error.text('Subject is required');
            return false;
        } else if (value.length < 3) {
            $field.addClass('error');
            $error.text('Subject must be at least 3 characters');
            return false;
        } else {
            $field.removeClass('error');
            $error.text('');
            return true;
        }
    }

    function validateContactMessage($field) {
        var value = $field.val().trim();
        var $error = $('#contactMessageError');
        if (value.length === 0) {
            $field.addClass('error');
            $error.text('Message is required');
            return false;
        } else if (value.length < 10) {
            $field.addClass('error');
            $error.text('Message must be at least 10 characters');
            return false;
        } else {
            $field.removeClass('error');
            $error.text('');
            return true;
        }
    }

    function validateAllContactFields() {
        var isValidName = validateContactName($('#contactName'));
        var isValidEmail = validateContactEmail($('#contactEmail'));
        var isValidSubject = validateContactSubject($('#contactSubject'));
        var isValidMessage = validateContactMessage($('#contactMessage'));
        return isValidName && isValidEmail && isValidSubject && isValidMessage;
    }

    // ==========================================
    // 3. FORM SUBMISSION
    // ==========================================

    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        var isValid = validateAllContactFields();

        if (isValid) {
            var contactData = {
                id: Date.now(),
                name: $('#contactName').val().trim(),
                email: $('#contactEmail').val().trim(),
                subject: $('#contactSubject').val().trim(),
                message: $('#contactMessage').val().trim(),
                date: new Date().toLocaleString('en-GB')
            };

            // Save to localStorage
            var messages = JSON.parse(localStorage.getItem('nhsContactMessages')) || [];
            messages.push(contactData);
            localStorage.setItem('nhsContactMessages', JSON.stringify(messages));

            console.log('Message saved:', contactData);

            // Show success
            $('#contactForm').hide();
            $('#contactSuccess').fadeIn(300);

            // Reset after 5 seconds
            setTimeout(function() {
                $('#contactForm')[0].reset();
                $('#contactForm').fadeIn(300);
                $('#contactSuccess').hide();
                $('.input-wrapper input, .input-wrapper textarea').removeClass('error');
                $('.error-message').text('');
            }, 5000);
        }
    });

    // ==========================================
    // 4. FAQ TOGGLE (Click to expand)
    // ==========================================

    $('.faq-item').on('click', function() {
        $(this).toggleClass('active');
        $(this).find('p:last-child').slideToggle(300);
    });

    // ==========================================
    // 5. EXPOSE FUNCTIONS GLOBALLY
    // ==========================================

    window.validateContactName = validateContactName;
    window.validateContactEmail = validateContactEmail;
    window.validateCont\actSubject = validateContactSubject;
    window.validateContactMessage = validateContactMessage;
    window.validateAllContactFields = validateAllContactFields;

    console.log('Contact Page Initialized Successfully');
});