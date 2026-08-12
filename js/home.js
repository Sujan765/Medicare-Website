$(document).ready(function() {
        // ===== COOKIE CONSENT BANNER =====
    if (getCookie('cookieConsent') === null) {
        setTimeout(function() {
            $('#cookieConsent').slideDown(500);
        }, 1000);
    }

    $('#acceptCookies').on('click', function() {
        setCookie('cookieConsent', 'accepted', 365);
        $('#cookieConsent').slideUp(500);
        console.log('Cookies accepted.');
    });

    $('#declineCookies').on('click', function() {
        setCookie('cookieConsent', 'declined', 30);
        $('#cookieConsent').slideUp(500);
        console.log('Cookies declined.');
    });
    
    // Mobile Navigation
    $('.nav-toggle').on('click', function() {
        $('.nav-menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-times');
    });

    // Stats Animation
    function animateStats() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const count = parseInt($this.data('count'));
            
            if (!$this.hasClass('animated')) {
                $this.addClass('animated');
                let current = 0;
                const timer = setInterval(function() {
                    current += Math.ceil(count / 50);
                    if (current >= count) {
                        current = count;
                        clearInterval(timer);
                    }
                    $this.text(current);
                }, 40);
            }
        });
    }

    setTimeout(animateStats, 500);
    $(window).on('scroll', animateStats);
});
// ===== COOKIE FUNCTIONS =====
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}