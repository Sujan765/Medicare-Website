$(document).ready(function() {
    
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