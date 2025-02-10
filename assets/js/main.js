jQuery(document).ready(function($) {

    var banner_position = $('.banner').offset().top;
    $(window).on('scroll', function() {
        var y_scroll_pos = window.pageYOffset;
        var scroll_pos_test = banner_position;

        if(y_scroll_pos > scroll_pos_test) {
            $('header').addClass('sticky');
            $('#page-top').addClass('page-top');
        }else{
            $('header').removeClass('sticky');
            $('#page-top').removeClass('page-top');
        }
    });

    
    var header = document.querySelector(".only-mobile");
    var navbarHeight = header.offsetHeight;
    var lastScrollTop = 0;

    window.onscroll = function() {scrollHide()};

    function scrollHide() {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        lastScrollTop = st <= 0 ? 0 : st;
    }


    $(document).on('click','.service-wrapper .image-desc li .acc-title', function(e){
        e.preventDefault();
        var parent = $(this).closest('li');
        var section = $(this).closest('.service-wrapper')
        if (! parent.is('.active') ) {
            var image_section =  section.find('.image-wrap');
            image_section.find('.active').removeClass('active');
            image_section.find('.image-slide[data-index='+parent.attr('data-index')+']').addClass('active');
            
            section.find('.image-desc .active').removeClass('active').find('.acc-content').slideUp( 400 );
            parent.addClass('active').find('.acc-content').slideDown( 400 );
        }
    });

    $('.review-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button class="review-prev next-arrow custom-slick-arrow" aria-label="Previous" type="button"></button>',
        nextArrow: '<button class="review-next prev-arrow custom-slick-arrow" aria-label="Next" type="button"></button>',
        dots: false,
        autoplay: true,
        speed: 600,
        autoplaySpeed: 8000,
        infinite: false,
        responsive: [{
            breakpoint: 651,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }]
    });

    $('.partner-slider').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        speed: 600,
        autoplaySpeed: 900, 
        pauseOnHover:true,   
        infinite: true,
        responsive: [
            {
                breakpoint: 1279,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 3
                }
            }

        ]
    });

    var viewportWidth = $(window).width();
    if(viewportWidth < 651) { 
        const toggles = document.querySelectorAll(".accordion-toggle");
        const items = document.querySelectorAll(".usecase-item");

        toggles.forEach((toggle, index) => {
            toggle.addEventListener("click", function(e) {
                e.preventDefault();

                const isActive = items[index].classList.contains("active");

                // Close all items first
                toggles.forEach(t => t.classList.remove("active"));
                items.forEach(i => {
                    i.classList.remove("active");
                    i.style.maxHeight = "0px"; // Collapse all
                });

                // If not already active, open the clicked one
                if (!isActive) {
                    this.classList.add("active");
                    items[index].classList.add("active");

                    // Set height dynamically for smooth expansion
                    const content = items[index].querySelector(".usecase-inner");
                    items[index].style.maxHeight = content.scrollHeight + "px";
                }
            });
        });

        // Set first tab active by default
        toggles[0].classList.add("active");
        items[0].classList.add("active");
        items[0].style.maxHeight = items[0].querySelector(".usecase-inner").scrollHeight + "px";

    } else {
        jQuery.noConflict();
        $('.usecase-category li').click(function(e){
            e.preventDefault();
            let sel = $(this);
            let selLink = sel.find('a');
            let slideIndex = selLink.data('rel');
            if(!selLink.hasClass('active')){
                $('.usecase-category li').find('a').removeClass('active');
                selLink.addClass('active');
                $('#usecase-slider').slick('slickGoTo', slideIndex)
            }
        });
    
        $('#usecase-slider').css({
            'opacity': 0
        });
        setTimeout(function() {
            $('#usecase-slider').css({
                'opacity': 1
            });
            $('#usecase-slider').slick({
                infinite: false,
                dots: false,
                arrows: false,
                draggable: false,
                swipe: false,
                adaptiveHeight: true,
            });
        }, 2000);
    }
});