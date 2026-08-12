$(document).ready(function() {

    
    $('.service-card').on('click', function(e) {
        if ($(e.target).is('.book-btn') || $(e.target).closest('.book-btn').length) return;
        var name = $(this).find('h3').text();
        var price = $(this).find('.price-badge').text();
        alert('✅ ' + name + ' - ' + price);
    });

    
    $('.book-btn').on('click', function(e) {
        e.stopPropagation();
        var service = $(this).closest('.service-card').find('h3').text();
        console.log('Booking initiated for: ' + service);
    });

    
    function animateCounters() {
        $('.stat-number').each(function() {
            var target = parseInt($(this).data('target'));
            var current = 0;
            var increment = Math.ceil(target / 50);
            var $this = $(this);

            var timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    $this.text(target + '+');
                    clearInterval(timer);
                } else {
                    $this.text(current);
                }
            }, 30);
        });
    }

    
    var triggered = false;
    $(window).on('scroll', function() {
        if (!triggered) {
            var heroTop = $('.hero-section').offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();
            if (windowBottom > heroTop + 100) {
                triggered = true;
                animateCounters();
            }
        }
    });

});
