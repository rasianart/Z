$(document).ready(function() {

    console.log(sessionStorage.user);

    let initDone = false;
    let chosen = false;
    let burrowed = false;
    let instruction = "Enter your answer in the form of a movement phrase to enter user's portal ";

    $('#create-hole').css({'transition': 'all 5s ease', 'margin-bottom': '380px', 'opacity': '1'});
    $('#dig').css({'transition': 'all 5s ease', 'margin-bottom': '25px', 'opacity': '1', 'height': '20px'});
    let burrowCircle = $('<div id="burrow-circle"></div>').appendTo('body');

    $('#create-hole').mouseenter(function() {
        $('#burrow-circle').css({'width': '300px', 'height': '300px', 'border': '1px solid white', 'margin-left': '39.6%', 'margin-top': '230px'})
    });
    $('#create-hole').mouseleave(function() {
        if (!burrowed){
            $('#burrow-circle').css({'width': '0px', 'height': '0px', 'border': 'none', 'margin-left': '720px', 'margin-top': '375px'});
        }
    });
    let bottom;
    $('.portals').mouseenter(function() {
        if (!chosen) {
            bottom = $(this).css("margin-bottom");
            let newBtm = parseInt(bottom) - 54 + 'px';
            let img = $(this).attr('data-img');
            console.log(img);
            $(this).css({'background-image': 'url(' + img + ')', 'background-size': '100px 100px', 'height': '125px', 'border-radius': '50%', 'margin-bottom': newBtm, 'background-color': 'rgba(0, 0, 0, .3)', 'padding-top': '55px'});
        }
    });
    $('.portals').mouseleave(function() {
        if (!chosen) {
            console.log('qwe');
            $(this).css({'background-size': '0px 0px', 'height': '16px', 'border-radius': '0%', 'margin-bottom': bottom, 'background-color': 'rgba(0, 0, 0, 0)', 'padding-top': '0px'});
        }
    });

    $('#dig').on('click', () => {
        console.log('create');
        swap();
    });

    $('#create-hole').on('click', () => {
        burrowed = true;
        $('.portals').css({'transition': 'all 1s ease', 'margin-left': '42%', 'margin-bottom': '340px', 'opacity': '0'});
        $('#burrow-circle').css({'width': '0px', 'height': '0px', 'border': 'none', 'margin-left': '720px', 'margin-top': '375px'});
        $('#create-hole').css({'transition': 'all 1s ease', 'opacity': '0'});

        setTimeout(function() {
            $.get('/createburrow/', function(data) {});
             window.location.href = "/createburrow/";
        }, 2000);
    });

    swap();

    function swap() {
        $('#portal-contain').children().each(function() {
            let child = $(this);
            let randomH;
            let randomW;
            function chooseHeight() {
                randomH = Math.floor((Math.random() * 700) + 1);
                if ( randomH > 260 && 410 > randomH ) {
                    chooseHeight();
                }
            }
            function chooseWidth() {
                randomW = Math.floor((Math.random() * 1250) + 1);
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

    $('.portals').on('click', function() {
        // $('#draw-frame').css('z-index', '1');
        chosen = true;
        $('#burrow-circle').remove();
        setTimeout(function() {
            $('.portals').css('opacity', '0');
        }, 150);
        $('.portals').css('transition', 'all 1.5s ease');
        $('#dig').css({'height': '0px', 'margin-bottom': '0px'});
        let idName = $(this).attr('id');
        let burrow = $('#create-hole');
        let child = $(this);
        let riddle = $(this).attr('data-riddle');
        let answer = $(this).attr('data-answer');
        let answerLine = $('<div id="answer-line"></div>').appendTo('body');
        // let answerInput = $('<input id="answer-input">').appendTo('#answer-line');
        burrow.css({'transition': 'all 1.5s ease', 'margin-bottom': '50px', 'pointer-events': 'none'});
        setTimeout(function() {
            burrow.css({'transition': 'all 1.25s linear', 'height': '0px', 'border-bottom': '1px solid white', 'width': '1200px', 'margin-left': '120px'});
            answerLine.css({'width': '1200px', 'margin-left': '120px', 'opacity': '1'});
        }, 1000);
        setTimeout(function() {
            burrow.html(riddle);
            console.log(burrow.html().length);
            burrow.css({'transition': 'all 1s ease', 'height': '20px', 'padding-bottom': '40px', 'font-size': '20px'});
            if (burrow.html().length > 200) {
                burrow.css('padding-bottom', '60px');
            }
            // else if (burrow.html().length > 110) {
            //     burrow.css('padding-bottom', '40px');
            // }
        }, 2250);
        child.css({'background-image': 'none', 'line-height': '300px', 'padding-top': '0px'});
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
        setTimeout(function() {
            let instructionArr = instruction.split('');
            let stringIndex = 0;
            setInterval(function() {
                if (stringIndex < instructionArr.length - 1) {
                    $('#answer-input').val(instructionArr[stringIndex]);
                    stringIndex++;
                    instructionArr[stringIndex] = instructionArr[stringIndex - 1] + instructionArr[stringIndex];
                } else {
                    clearInterval();
                }
            }, 10);
        }, 4700);

        let hasClicked = false;
        setTimeout(function() {
            $('#answer-input').click(function() {
                if (!hasClicked) {
                    $('#answer-input').val('');
                    hasClicked = true;
                }
            });
        }, 5000);

        let firstkey = false;
        let userImg = child.attr('data-img');
        let imgContain = $('<div id="img-contain"></div>').appendTo('body');
        let imgHolder = $('<img id="img-holder">').appendTo(imgContain);
        let submitGuess = $('<div id="submit-guess">Post Z</div>').appendTo('body');

        let ifCorrect = () => {
            $('body').attr('data-correct', 'correct');
            let userAnswer = $('#answer-input').val().trim();
            if (userAnswer === answer) {
                console.log('correct');
                imgHolder.attr('src', userImg);
                imgContain.css({'opacity': '1'});
                $('.chosen').css({'transition': 'all 2s ease', 'background-color': 'rgba(0, 0, 0, .5)'});


                setTimeout(() => {
                    $('#img-holder').css({'width': '0px', 'height': '0px', 'margin-left': '20px', 'margin-top': '180px'});
                    $('#submit-guess').css({'transition': 'all 1.5s ease', 'height': '0px', 'margin-top': '76px'});
                    setTimeout(() => {
                        $('#submit-guess').css({'width': '0px', 'margin-left': '715px', 'opacity': '0'});
                    }, 1000);
                    $('#answer-input').css({'transition': 'all 4s ease', 'width': '0px', 'height': '0px', 'margin-left': '715px', 'margin-top': '400px', 'opacity': '0'});
                    $('#answer-line').css({'transition': 'all 3.5s ease', 'width': '0px', 'height': '0px', 'margin-left': '720px', 'margin-top': '400px'});
                    $('#create-hole').css({'transition': 'all .5s ease', 'padding-bottom': '0px', 'height': '0px'});
                    setTimeout(() => {
                        $('#create-hole').css({'transition': 'all 2.5s ease', 'width': '0px', 'margin-left': '700px'});
                    }, 750);
                    $('.chosen').css({'transition': 'all 5s ease', 'width': '0px', 'height': '0px', 'margin-left': '725px', 'margin-bottom': '360px', 'opacity': '0'});
                    setTimeout(() => {
                        $('#img-holder, #submit-guess, #answer-input, #answer-line, #create-hole, .chosen').remove();
                    }, 6000);
                }, 1500);
                setTimeout(() => {
                    $.get('/portalentrance/' + idName, (data) => {
                        console.log(data);
                    });
                    window.location.href = "/portalentrance/" + idName;
                }, 10000);
            } else {
                console.log('incorrect');
            }
        }

        let submit = () => {
            $('#submit-guess').css({'height': '20px', 'margin-top': '56px', 'opacity': '1'});
            if (!firstkey) {
                $('#answer-input').val('');
                firstkey = true;
            }
        }

        $(document).on('keypress', function(e) {
            submit();
            if (e.which === 13 && $('#answer-input').val() !== '') {
                ifCorrect();
            }
        });

        $(document).on('click', '#submit-guess', function(e) {
            ifCorrect();
            // $.get('/portalentrance/' + idName, (data) => {
            //     console.log(data);
            // });
            // window.location.href = "/portalentrance/" + idName;
        });



        // setTimeout(function() {
        //     let dF = $('<div class="draw-frame"></div').appendTo('body');
        //     let dB = $('<div id="draw-border"></div>').appendTo('.draw-frame');
        //     let vid = $('<video id="video width="400 height="300" preload autoplay loop muted></video').appendTo('.draw-frame');
        //     let can = $('<canvas id="canvas" width="400" height="300"></canvas').appendTo('.draw-frame');
        // }, 5000);

    })

});
