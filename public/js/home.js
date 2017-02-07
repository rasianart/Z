$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select

$('#create-hole').css({'transition': 'all 5s ease', 'margin-bottom': '400px', 'opacity': '1'});

let initDone = false;

swap();

function swap() {
    $('#portal-contain').children().each(function() {
        let child = $(this);
        let randomH;
        let randomW;
        function chooseHeight() {
            randomH = Math.floor((Math.random() * 700) + 1);
            console.log(randomH);
            if ( randomH > 260 && 410 > randomH ) {
                chooseHeight();
            }
        }
        function chooseWidth() {
            randomW = Math.floor((Math.random() * 1250) + 1);
            console.log(randomW);
            if ( randomW > 475 && randomW < 725 ) {
                chooseWidth();
            }
        }
        chooseHeight();
        chooseWidth();
        child.css({'margin-left': randomW});
        setTimeout(function() {
            if (initDone === false) {
                child.css({'transition': 'all 4.5s linear', 'margin-bottom': randomH, 'height': '16px', 'opacity': '1'});
            } else {
                child.css({'transition': 'all 1.5s linear', 'margin-bottom': randomH, 'height': '16px', 'opacity': '1'});
            }
            setTimeout(function() {
                child.css({'transition': 'all .5s ease'});
                $('#portal-contain').css('margin-bottom', '50px');
                initDone = true;
            }, 500);
        }, 10);
    })
}



$('#create-hole').on('click', () => {
    console.log('create');
    swap();
});

$('.portals').on('click', function() {
    setTimeout(function() {
        $('.portals').css('opacity', '0');
    }, 150);
    $('.portals').css('transition', 'all 1.5s ease');
    let idName = $(this).attr('id');
    let burrow = $('#create-hole');
    let child = $(this);
    let riddle = $(this).attr('data-riddle');
    let answer = $(this).attr('data-answer');
    let answerLine = $('<div id="answer-line"></div>').appendTo('body');
    // let answerInput = $('<input id="answer-input">').appendTo('#answer-line');
    burrow.css({'transition': 'all 1.5s ease', 'margin-bottom': '50px'});
    setTimeout(function() {
        burrow.css({'transition': 'all 1.25s linear', 'height': '0px', 'border-bottom': '1px solid white', 'width': '1200px', 'margin-left': '120px'});
        answerLine.css({'width': '1200px', 'margin-left': '120px', 'opacity': '1'});
    }, 1000);
    setTimeout(function() {
        burrow.html(riddle);
        burrow.css({'transition': 'all 1s ease', 'height': '20px', 'padding-bottom': '10px', 'font-size': '20px'});
        if (burrow.html().length = 220) {
            burrow.css('padding-bottom', '50px');
        } else if (burrow.html().length = 110) {
            burrow.css('padding-bottom', '30px');
        }
    }, 2250);
    child.css('line-height', '300px');
    child.addClass('chosen').removeClass('portals');
    child.css({'transition': 'all 1.55s ease', 'margin-left': '48.7%', 'margin-bottom': '315px', 'height': '50px', 'width': '50px', 'background-color': 'rgba(0, 0, 0, .6)', 'border-radius': '50%', 'line-height': '300px', 'font-size': '20px'});
    let childHMTL = $('<div id="child-html">' + child.html() + '</div>').appendTo('body');
    setTimeout(function() {
        child.css({'transition': 'all 1.25s ease', 'height': '300px', 'width': '300px', 'margin-left': '39.8%', 'margin-bottom': '195px', 'background-color': 'rgba(255, 255, 255, .3)', 'font-size': '30px'});
    }, 1350);
    setTimeout(function() {
        childHMTL.css('opacity', '1');
    }, 2400);
    setTimeout(function() {
        child.html('');
    }, 2650);
    $('#portal-contain').css({'margin-left': '0px'});
    child.siblings().each(function() {
        let sibling = $(this);
            sibling.css({'margin-bottom': '650px', 'height': '0px', 'margin-left': '45%'});
    });
    setTimeout(function() {
        childHMTL.css({'transition': 'all 1s ease', 'width': '0px', 'left': '97px'});
    }, 2350);
    setTimeout(function() {
        childHMTL.css({'border-right': '1px solid rgba(255, 255, 255, 1)'});
    }, 2550);
    setTimeout(function() {
        childHMTL.css({'transition': 'all 1s ease', 'margin-top': '103px', 'height': '20px'});
    }, 3350);
    setTimeout(function() {
        let answerInput = $('<input id="answer-input" autocomplete="off" autofocus type="text">').appendTo('body');
        childHMTL.remove();
    }, 4200);


    // $.get('/portalentrance/' + idName, (data) => {
        // console.log(data);
    // });
    // window.location.href = "/portalentrance" + idName;
})

});
