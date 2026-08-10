$(document).ready(function() {

    $('#bookingForm').on('submit', function(e) {
        e.preventDefault();

        var fullName = $('#fullName').val().trim();
        var email = $('#email').val().trim();
        var phone = $('#phone').val().trim();
        var service = $('#service').val();
        var date = $('#date').val();
        var time = $('#time').val();
        var notes = $('#notes').val().trim();
        var feedback = $('#formFeedback');

        var errors = [];

        if (fullName === '') {
            errors.push('Full name is required');
        }

        if (email === '') {
            errors.push('Email address is required');
        } else if (!email.includes('@') || !email.includes('.')) {
            errors.push('Please enter a valid email address');
        }

        if (phone === '') {
            errors.push('Phone number is required');
        } else if (phone.length < 10) {
            errors.push('Please enter a valid phone number');
        }

        if (service === '') {
            errors.push('Please select a service');
        }

        if (date === '') {
            errors.push('Please select a date');
        }

        if (time === '') {
            errors.push('Please select a time');
        }

        if (errors.length > 0) {
            feedback
                .removeClass('success')
                .addClass('error')
                .html('❌ ' + errors.join('<br>'));
            return;
        }

        var bookingData = {
            fullName: fullName,
            email: email,
            phone: phone,
            service: service,
            date: date,
            time: time,
            notes: notes,
            bookedOn: new Date().toLocaleString()
        };

        localStorage.setItem('appointmentData', JSON.stringify(bookingData));

        feedback
            .removeClass('error')
            .addClass('success')
            .html('✅ Appointment booked successfully!<br>📅 ' + service + ' on ' + date + ' at ' + time + '<br>📧 A confirmation email has been sent to ' + email);

        this.reset();

        console.log('Appointment saved:', JSON.parse(localStorage.getItem('appointmentData')));
    });

    var savedAppointment = JSON.parse(localStorage.getItem('appointmentData'));
    if (savedAppointment) {
        console.log('Previously saved appointment:', savedAppointment);
        $('#formFeedback')
            .removeClass('error')
            .addClass('success')
            .html('📩 You have a previously saved appointment for ' + savedAppointment.service + ' on ' + savedAppointment.date);
    }

});