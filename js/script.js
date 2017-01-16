                /*  MAIN  */
$(function () {
    $(window).on("load", function() {
    
        $('button').click(function(){
        validateForm()
    })
    
    //hero animation on page load
    fadeInHero()
    
    //fade out/in hero on scroll
    window.addEventListener('scroll', function(){
        heroFadeAsScroll(250)
    });
    
    //parallax effect
    window.addEventListener('scroll', parallax);
    
    //hide/show sticky nav during scroll
    window.addEventListener('scroll', stickyNavEvents($(window)));
    

    //resize events
    var resizeTimer = null;
    $(window).bind('resize', function() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resetOnResize, 100);
    });
    
    $("input, textarea").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
        function(e){
            console.log('transition finished')
            // do something here
            $(this).removeClass('input-warning')
            //$(this).off(e);
    });
    });
})

                                                                                                            $("#someSelector")



                /* FUNCTIONS */


function media_sm(){
    var mq = window.matchMedia( "(min-width: 768px)" );
    if(mq.matches){
        return false
    }
    else{
        return true;
    }
    
}
//@param1 scroll height were logo should fade out by
function heroFadeAsScroll(limit){
    
    var scroll = $(window).scrollTop()-100;
    var newOpacity = 1 - (scroll / limit)
    if(newOpacity > 0){
        //set new opacity
        $('#hero_logo').css('opacity', newOpacity)
    }
    else{
        //logo should be out of focus
        $('#hero_logo').css('opacity', 0)
    }
}

function fadeInHero(){
    $('#hero_logo').show()
    $('#hero_logo').css({
        'animation-name' : 'fadeInHero',
        'animation-duration' : '2s',
        'animation-iteration-count' : 1,
        'animation-timing-function': 'ease-in-out'
    })
}

function showStickyNav(){
    $( ".sticky" ).slideDown( 400, function() {
    // Animation complete.
  });
    
}

function hideStickyNav(){
    $( ".sticky" ).slideUp( 400, function() {
    // Animation complete.
  });
    
}

function resetOnResize(){
    console.log('resized')
    if(media_sm()){
        $('.sticky').css('display','block');
        $('.jumboNav').css('display','none');
    }
    else{
        $('.sticky').css('display','none');
        $('.jumboNav').css('display','block');
    }
}

function parallax(){
        
        if($('#parallax:in-viewport').length > 0){
            var eleOffset = $('#parallax:in-viewport').offset()
            ypos = (window.pageYOffset - eleOffset.top);
            $('#parallax').css('top',ypos * 0.5 + 'px')
        }
    }


function validateForm(){
    
    $('small').hide()
    
    //validate inputs
    var flag = true
    $('input').each(function(i){
        console.log($(this).val())
        if($(this).val().trim() === ""){
            $(this).addClass('input-warning')
            $(this).siblings('small').show()
            flag = false
        }
    })
    
    if($('#email-input').siblings('small').css('display') === 'none' &&      $('#email-input').val().indexOf("@") === -1){
        console.log('invalid email')
        $('#email-input').addClass('input-warning')
        $('#email-input').siblings('small').text("Your email must contain an '@' symbol")
        $('#email-input').siblings('small').show()
         flag = false
    }
    
    //validate textarea
    if($('#inq-input').val().trim() == ""){
        console.log("ta empty")
        $('#inq-input').addClass('input-warning')
        $('#inq-input').siblings('small').show()
        flag = false
    }
    
    return flag
}



function stickyNavEvents(win){
    win.scroll(function(){
        //fade out hero on scroll
        //heroFadeAsScroll($win.scrollTop()-100, 250)
        
        // show/hide stick nav on larger devices
        if(!media_sm()){
            if (win.scrollTop() > 700){
                showStickyNav()
            } 
            else{
                hideStickyNav()
            }
        }
    });
}



