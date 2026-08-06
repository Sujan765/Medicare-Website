$(document).ready(function() {

    console.log('Booking Page JavaScript Loaded Successfully');

    var today = new Date().toISOString().split('T')[0];
    $('#appointmentDate').attr('min', today);
    $('#dob').attr('max', today);

    var urlParams = new URLSearchParams(window.location.search);
    var serviceParam = urlParams.get('service');
    if (serviceParam) {
        $('#serviceType').val(serviceParam);
        console.log('Service pre-filled from URL: ' + serviceParam);
    }

    $('#fullName')
        .on('blur', function() {
            validateName($(this));
        })
        .on('input', function() {
            if ($(this).val().length > 0) {
                validateName($(this));
            }
        });

    $('#email')
        .on('blur', function() {
            validateEmail($(this));
        })
        .on('input', function() {
            if ($(this).val().length > 0) {
                validateEmail($(this));
            }
        });

    $('#phone')
        .on('blur', function() {
            validatePhone($(this));
        })
        .on('input', function() {
            if ($(this).val().length > 0) {
                validatePhone($(this));
            }
        });

    $('#dob').on('blur', function() {
        validateDOB($(this));
    });

    $('#serviceType').on('change', function() {
        validateService($(this));
    });

    $('#appointmentDate').on('blur', function() {
        validateDate($(this));
    });

    $('#appointmentTime').on('change', function() {
        validateTime($(this));
    });

    $('#terms').on('change', function() {
        validateTerms($(this));
    });

    function validateName($field) {
        var value = $field.val().trim();
        var $error = $('#fullNameError');
        if (value.length === 0) {
            $field.addClass('error');
            $error.text('Full name is required');
            return false;
        } else if (value.length < 2) {
            $field.addClass('error');
            $error.text('Name must be at least 2 characters');
            return false;
        } else if (!/^[a-zA-Z\s\-']+$/.test(value)) {
            $field.addClass('error');
            $error.text('Name can only contain letters, spaces, hyphens, and apostrophes');
            return false;
        } else {
            $field.removeClass('error');
            $error.text('');
            return true;
        }
    }

    function validateEmail($field) {
        var value = $field.val().trim();
        var $error = $('#emailError');
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

    function validatePhone($field) {
        var value = $field.val().trim();
        var $error = $('#phoneError');
        if (value.length === 0) {
            $field.addClass('error');
            $error.text('Phone number is required');
            return false;
        } else if (value.replace(/[\s\-\(\)]/g, '').length < 10) {
            $field.addClass('error');
            $error.text('Please enter a valid phone number (minimum 10 digits)');
            return false;
        } else {
            $field.removeClass('error');
            $error.text('');
            return true;
        }
    }

    function validateDOB($field) {
        var value = $field.val();
        var $error = $('#dobError');
        if (!value) {
            $field.addClass('error');
            $error.text('Date of birth is required');
            return false;
        }
        var dob = new Date(value);
        var todayDate = new Date();
        var age = todayDate.getFullYear() - dob.getFullYear();
        var monthDiff = todayDate.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && todayDate.getDate() < dob.getDate())) {
            age--;
        }
        if (age < 1) {
            $field.addClass('error');
            $error.text('You must be at least 1 year old');
            return false;
        } else if (age > 120) {
            $field.addClass('error');
            $error.text('Please enter a valid date of birth');
            return false;
        } else {
            $field.removeClass('error');
            $error.text('');
            return true;
        }
    }

    function validateService($field) {
        var value = $field.val();
        var $error = $('#serviceError');
        if (!value) {
            $field.addClass('error');
            $error.text('Please select a service');
            return false;
        } else {
            $field.removeClass('error');
            $error.text('');
            return true;
        }
    }

    function validateDate($field) {
        var value = $field.val();
        var $error = $('#dateError');
        if (!value) {
            $field.addClass('error');
            $error.text('Please select an appointment date');
            return false;
        }
        var selectedDate = new Date(value);
        var todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        if (selectedDate < todayDate) {
            $field.addClass('error');
            $error.text('Appointment date cannot be in the past');
            return false;
        } else {
            $field.removeClass('error');
            $error.text('');
            return true;
        }
    }

    function validateTime($field) {
        var value = $field.val();
        var $error = $('#timeError');
        if (!value) {
            $field.addClass('error');
            $error.text('Please select an appointment time');
            return false;
        } else {
            $field.removeClass('error');
            $error.text('');
            return true;
        }
    }

    function validateTerms($field) {
        var checked = $field.is(':checked');
        var $error = $('#termsError');
        if (!checked) {
            $error.text('You must agree to the Terms and Conditions');
            return false;
        } else {
            $error.text('');
            return true;
        }
    }

    function validateAllFields() {
        var isValidName = validateName($('#fullName'));
        var isValidEmail = validateEmail($('#email'));
        var isValidPhone = validatePhone($('#phone'));
        var isValidDOB = validateDOB($('#dob'));
        var isValidService = validateService($('#serviceType'));
        var isValidDate = validateDate($('#appointmentDate'));
        var isValidTime = validateTime($('#appointmentTime'));
        var isValidTerms = validateTerms($('#terms'));
        return isValidName && isValidEmail && isValidPhone && 
               isValidDOB && isValidService && isValidDate && 
               isValidTime && isValidTerms;
    }

    $('#bookingForm').on('submit', function(e) {
        e.preventDefault();
        var isValid = validateAllFields();
        if (isValid) {
            var formData = {
                id: Date.now(),
                fullName: $('#fullName').val().trim(),
                email: $('#email').val().trim(),
                phone: $('#phone').val().trim(),
                dob: $('#dob').val(),
                serviceType: $('#serviceType').val(),
                appointmentDate: $('#appointmentDate').val(),
                appointmentTime: $('#appointmentTime').val(),
                doctorPreference: $('#doctorPreference').val() || 'None specified',
                symptoms: $('#symptoms').val().trim() || 'None provided',
                bookingDate: new Date().toLocaleString('en-GB')
            };
            saveBooking(formData);
            showSuccessModal(formData);
            this.reset();
            $('.input-wrapper input, .input-wrapper select, .input-wrapper textarea').removeClass('error');
            $('.error-message').text('');
        } else {
            var firstError = $('.input-wrapper input.error, .input-wrapper select.error, .input-wrapper textarea.error').first();
            if (firstError.length) {
                $('html, body').animate({
                    scrollTop: firstError.offset().top - 120
                }, 500);
                firstError.focus();
            }
        }
    });

    function saveBooking(data) {
        var bookings = JSON.parse(localStorage.getItem('nhsBookings')) || [];
        bookings.push(data);
        localStorage.setItem('nhsBookings', JSON.stringify(bookings));
        localStorage.setItem('nhsLastBooking', JSON.stringify(data));
        console.log('Booking saved to localStorage successfully');
        console.log('Total bookings: ' + bookings.length);
    }

    function showSuccessModal(data) {
        var serviceName = $('#serviceType option:selected').text();
        var summary = '<p><strong>Patient:</strong> ' + data.fullName + '</p>' +
                      '<p><strong>Service:</strong> ' + serviceName + '</p>' +
                      '<p><strong>Date:</strong> ' + formatDate(data.appointmentDate) + '</p>' +
                      '<p><strong>Time:</strong> ' + data.appointmentTime + '</p>' +
                      '<p><strong>Doctor:</strong> ' + data.doctorPreference + '</p>' +
                      '<p><strong>Reference:</strong> NHS-' + String(data.id).slice(-6) + '</p>';
        $('#bookingSummary').html(summary);
        $('#successModal').fadeIn(300);
        setTimeout(function() {
            $('#successModal').fadeOut(300);
        }, 10000);
    }

    window.closeBookingModal = function() {
        $('#successModal').fadeOut(300);
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 400);
    };

    window.validateName = validateName;
    window.validateEmail = validateEmail;
    window.validatePhone = validatePhone;
    window.validateDOB = validateDOB;
    window.validateService = validateService;
    window.validateDate = validateDate;
    window.validateTime = validateTime;
    window.validateTerms = validateTerms;
    window.validateAllFields = validateAllFields;
    window.saveBooking = saveBooking;
    window.showSuccessModal = showSuccessModal;
    window.closeBookingModal = closeBookingModal;

    console.log('Booking page fully initialized and ready');

});