$(document).ready(function() {

    console.log(sessionStorage.user);

    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    let drawSegments = [
        []
    ];
    let segment = 0;
    let initArr = [];
    let myArr = [];
    let drawArr = [];
    let storeArr = [];
    let activate = true;
    let login = true;
    let loginUser;
    let inputName;
    let dbArr;
    let dbArrLength;
    let correctFunc;
    let nullSkips = 0;
    let erraticMovement = 0;
    let user = sessionStorage.user;
    let initDone = false;
    let chosen = false;
    let burrowed = false;
    let instruction = "Enter answer to enter user's portal ";

    let tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

    $('.portals').on('click', function() {
        let name = $(this).attr('data-name');
        $.get('/getgesture/' + name, (data) => {
            let arr = data.burrowcode;
            dbArr = arr.split(',').map(function(item) {
                return parseInt(item);
            });
            dbArrLength = dbArr.length;
        });
    });

    setTimeout(() => {
        $('#bg-vid').css('opacity', '1');
    }, 1000);

    let initCircle = (cId, mLeft, mTop) => {
        $(cId).css({'margin-left': mLeft, 'margin-top': mTop});
    }

    initCircle('#c1', '4px', '10px');
    initCircle('#c2', '15px', '15px');
    initCircle('#c3', '10px', '4px');
    initCircle('#c4', '20px', '7px');
    initCircle('#c5', '13px', '12px');
    $('form').css({'opacity': '1'});

    function randCircle() {
        randomT = Math.floor((Math.random() * 20) + 1);
        randomL = Math.floor((Math.random() * 20) + 1);
        $(this).css({'margin-left': randomL + 'px', 'margin-top': randomT + 'px'});
    }

    $('.portals').mouseenter(function() {
        $(this).children().each(randCircle);
    });

    $('#create-hole').css({'transition': 'all 5s ease', 'margin-bottom': '380px', 'opacity': '1'});
    $('#dig').css({'transition': 'all 5s ease', 'margin-bottom': '25px', 'opacity': '1', 'height': '20px'});
    let burrowCircle = $('<div id="burrow-circle">create</div>').appendTo('body');

    $('#create-hole').mouseenter(function() {
        $('#burrow-circle').css({'width': '300px', 'height': '300px', 'border': '1px solid white', 'margin-left': '39.6%', 'margin-top': '230px', 'color': 'rgba(255, 255, 255, 1)', 'padding-top': '120px'})
    });
    $('#create-hole').mouseleave(function() {
        if (!burrowed){
            $('#burrow-circle').css({'width': '0px', 'height': '0px', 'border': 'none', 'margin-left': '720px', 'margin-top': '375px', 'color': 'rgba(255, 255, 255, 0)', 'padding-top': '0px'});
        }
    });
    let bottom;
    $('.portals').mouseenter(function() {
        if (!chosen) {
            let img = $(this).attr('data-img');
            $(this).children(":first").css({'background-image': 'url(' + img + ')', 'height': '125px', 'width': '125px', 'background-size': '100px 100px', 'margin-left': '-25px', 'margin-top': '-25px'});
            $(this).children().eq(1).css({'height': '90px', 'width': '90px', 'margin-left': '0px', 'margin-top': '0px'});
        }
    });
    $('.portals').mouseleave(function() {
        if (!chosen) {
            $(this).children(":first").css({'background-size': '0px 0px', 'height': '50px', 'width': '50px', 'margin-left': '13px', 'margin-top': '13px'});
            $(this).children().eq(1).css({'height': '50px', 'width': '50px', 'margin-left': '10px', 'margin-top': '10px'});
        }
    });

    $('#dig').on('click', () => {
        swap();
        $.get('/dig', (data) => {
            let index = 0;
            $('#portal-contain').children().each(function() {
                $(this).attr({'data-name': data[index].name, 'data-img': data[index].userimg, 'data-riddle': data[index].riddle, 'data-answer': data[index].answer});
                $(this).contents().filter(function(){ return this.nodeType == 3; }).first().replaceWith(data[index].name);
                index++;
            })
        })
    });

    $('#create-hole').on('click', () => {
        burrowed = true;
        $('.portals').css({'transition': 'all 1s ease', 'margin-left': '42%', 'margin-bottom': '340px', 'opacity': '0'});
        $('#burrow-circle').css({'width': '0px', 'height': '0px', 'border': 'none', 'margin-left': '720px', 'margin-top': '375px', 'color': 'rgba(255, 255, 255, 0)', 'padding-top': '0px'});
        $('#create-hole').css({'transition': 'all 1s ease', 'opacity': '0'});
        $('#bg-vid').css('opacity', '0');
        $('#dig').css({'transition': 'all 1s ease', 'opacity': '0', 'margin-bottom': '350px'});

        setTimeout(function() {
            $.get('/createburrow/', function(data) {});
             window.location.href = "/createburrow/";
        }, 5000);
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
                    child.children().css({'transition': 'all 5s ease', 'opacity': '1'});
                } else {
                    child.css({'transition': 'all 1.5s linear', 'margin-bottom': randomH, 'height': '16px', 'opacity': '1'});
                    child.children().css({'transition': 'all 2s ease', 'opacity': '1'});
                }
                setTimeout(function() {
                    child.css({'transition': 'all .5s ease'});
                    $('#portal-contain').css('margin-bottom', '50px');
                    initDone = true;
                }, 500);
            }, 10);
            setTimeout(() => {
                child.children().css({'transition': 'all 1s ease'});
            }, 5000);
        })
    }

    $('.portals').on('click', function() {
        setTimeout(() => {
            $('#bg-vid').css({'transition': 'all 3s ease', 'opacity': '.6'});
        }, 1500);
        $(this).children(":first").css({'background-size': '0px 0px', 'height': '50px', 'width': '50px', 'margin-left': '13px', 'margin-top': '13px'});
        $(this).children().eq(1).css({'height': '50px', 'width': '50px', 'margin-left': '10px', 'margin-top': '10px'});
        $(this).children().css('opacity', '0');
        chosen = true;
        $('#burrow-circle').remove();
        setTimeout(function() {
            $('.portals').css('opacity', '0');
        }, 150);
        $('.portals').css('transition', 'all 1.5s ease');
        $('#dig').css({'height': '0px', 'margin-bottom': '0px'});
        let idName = sessionStorage.user;
        let burrowName = $(this).attr('data-name');
        let burrow = $('#create-hole');
        let child = $(this);
        let parent = $(this).parent();
        let riddle = $(this).attr('data-riddle');
        let answer = $(this).attr('data-answer');
        let answerLine = $('<div id="answer-line"></div>').appendTo('body');
        child.addClass('chosen').removeClass('portals');
        child.css({'transition': 'all .5s ease', 'height': '50px', 'width': '50px'});
        setTimeout(() => {
            child.css({'transition': 'all 1.55s ease', 'margin-left': '48.7%', 'margin-bottom': '200px', 'height': '50px', 'width': '50px', 'background-color': 'rgba(0, 0, 0, .6)', 'border-radius': '50%', 'line-height': '300px', 'font-size': '20px'});
        }, 100);
        setTimeout(() => {
            child.children().remove();
        }, 1000);
        let childHMTL = $('<div id="child-html">' + child.html() + '</div>').appendTo('body');
        setTimeout(function() {
            child.css({'transition': 'all .9s ease', 'height': '300px', 'width': '300px', 'margin-left': '39.8%', 'margin-bottom': '195px', 'background-color': 'rgba(255, 255, 255, .3)', 'font-size': '30px', 'opacity': '1'});
        }, 1700);
        setTimeout(function() {
            childHMTL.css('opacity', '1');
        }, 2400);
        setTimeout(function() {
            child.html('');
        }, 2650);
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
        }, 2250);

        $('#portal-contain').css({'margin-left': '0px'});
        child.siblings().each(function() {
            let sibling = $(this);
                sibling.css({'margin-bottom': '660px', 'height': '0px', 'margin-left': '47.4%'});
                setTimeout(() => {
                    sibling.children().css({'transition': 'all .7s ease', 'height': '0px'});
                }, 300);
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
            }, 1);
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
        let userImg = $(this).attr('data-img');
        let imgContain = $('<div id="img-contain"></div>').appendTo('body');
        let imgHolder = $('<img id="img-holder">').appendTo(imgContain);
        let submitGuess = $('<div id="submit-guess">Post Z</div>').appendTo('body');

        let ifCorrect = () => {
            let userAnswer = $('#answer-input').val().trim().toLowerCase();
            if (userAnswer === answer) {
                $('#answer-input').css({'transition': 'all 1.5s ease', 'opacity': '0'});
                setTimeout(() => {
                    $('#answer-input').val('Follow movement passphrase with personal color to enter burrow');
                    $('#answer-input').css({'opacity': '1'});
                }, 1500);
                imgHolder.attr('src', userImg);
                imgContain.css({'opacity': '1'});
                $('.chosen').css({'transition': 'all 2s ease', 'background-color': 'rgba(0, 0, 0, .5)'});
                let oldArr = ['1', '2'];
                setInterval(() => {
                    if (initArr.length > 1) {
                            if (initArr.length  ===  oldArr.length) {
                                getCode(dbArr, dbArrLength);
                                drawSegments[segment] = [];
                                initArr = [];
                                context.clearRect(0, 0, canvas.width, canvas.height);
                            }
                        oldArr.length = initArr.length;
                    }
                }, 1000);
                correctFunc = () => {
                    $('body').attr('data-correct', 'correct');
                    $('#access').css({'z-index': '1000', 'opacity': '1'});
                    setTimeout(() => {
                        $('#access').css('opacity', '0');
                    }, 1500);
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
                        $('#bg-vid').css('opacity', '0');
                    }, 1500);
                    setTimeout(() => {
                        $.get('/portalentrance/' + burrowName, (data) => {
                            console.log(data);
                        });
                        window.location.href = "/portalentrance/" + burrowName;
                    }, 9000);
                }
            } else {
                console.log('incorrect');
                $('#alert').css('opacity', '1');
                setTimeout(() => {
                    $('#alert').css('opacity', '0');
                }, 4500);
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
        });

    })

    function submitLogin(loginName) {
        if (login) {
            $.get("/login" + loginName, function(data) {
                loginUser = data.name;
                let arr = data.Gestures[0].gestureCode;
                let dbArr = arr.split(',').map(function(item) {
                    return parseInt(item);
                });
                getCode(dbArr, dbArr.length);
            });
        } else if (activate) {
            getCode();
            let newUser = {
                name: loginName
            }
            $.post('/createuser', newUser, function(data){
                let userKey = data.id;
                let newGesture = {
                    title: 'shape',
                    gestureCode: storeArr.toString(),
                    UserId: userKey
                };
                $.post('/creategesture', newGesture, function(req, res){
                });
            });
        }
    }

    function getCode(dbArray, dbArrLength) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        let drawArr = [];
        let firstIndex = 0;
        let equalize;
        let newLength;

        myArr = initArr[initArr.length - 1];

        if (login){
            console.log(myArr.length/dbArrLength);
            console.log(myArr.length);
            console.log(dbArrLength);

            if (myArr.length > dbArrLength) {
                if (myArr.length/dbArrLength < 7.5) {
                    equalize = parseInt(myArr.length/dbArrLength);
                    newLength = equalize * dbArrLength;
                } else {
                    incorrect();
                    return;
                }
            } else {
                newLength = myArr.length;
                equalize = 1;
            }
        } else {
            newLength = myArr.length;
            equalize = 5;
        }

        for (var x = 0; x < newLength; x++) {
            if (x % equalize === 0 && x !== 0) {
                let newMyArr = myArr.slice(firstIndex, x);
                firstIndex = x;
                var result = newMyArr.map(function(y) {
                    return parseInt(y);
                });
                var sum = result.reduce(function(a, b) {
                    return a + b;
                });
                var avg = parseInt(sum / result.length);
                drawArr.push(avg);
            }
        }
        storeArr = drawArr;
        compareCode(dbArray, drawArr);
    }

    function compareCode(arrDB, arrUser) {
        let bigger = '';
        let match = [];
        let anyFalse = false;
        let nullSkips = 0;
        let erraticMovement = 0;

        if (arrDB.length <= arrUser.length) {
            bigger = arrUser.length;
        } else {
            bigger = arrDB.length;
        }

        for (var x = 0; x < bigger; x++) {
            if (isNaN(arrDB[x]) === true) {
                nullSkips++;
            } else if (isNaN(arrUser[x]) === true) {
                nullSkips++;
            } else {
                let diff = Math.abs(arrDB[x] - arrUser[x]);
                console.log(diff);
                if (diff >= 100) {
                    match.push(0);
                    erraticMovement++;
                } else {
                    match.push(1);
                }
            }
        }

        console.log(match);

        if (nullSkips < 10 && erraticMovement < dbArr.length * .25) {
            console.log('You may enter.');
            console.log("skipped: " + nullSkips);
            console.log("erratic: " + erraticMovement);
            console.log("erraticMax: " + dbArr.length * .25);
            console.log(match);
            $('.draw-frame').css('opacity', '0');
            setTimeout(function() {
                $('.draw-frame').remove();
            }, 1000);
            correctFunc();
        } else {
            incorrect();
        }
    }

    function incorrect() {
        console.log('Sorry, incorrect password, try again.');
        console.log("skipped: " + nullSkips);
        console.log("erratic: " + erraticMovement);
        console.log("erraticMax: " + dbArr.length * .25);
        $('#alert').html('Incorrect Movement Phrase <br> Please Try Again');
        $('#alert').css('opacity', '1');
        setTimeout(() => {
            $('#alert').css('opacity', '0');
        }, 4500);
        drawSegments[segment] = [];
        initArr = [];
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    tracking.track('#video', tracker, {
        camera: true
    });

    tracker.on('track', function(event) {
        if (event.data.length === 0 && drawSegments[segment].length > 0) {
            segment++;
        }

        event.data.forEach(function(rect) {
            if (rect.color === 'yellow') {
                draw(rect);
            }
        });
    });

    function draw(rect) {
        drawSegments[segment].push(rect.x + rect.width / 2, rect.y + rect.height / 2);
        initArr.push(drawSegments[0]);
    }

    function erase(rect) {
        context.clearRect(rect.x, rect.y, rect.width, rect.height);
    }

    function isInsideRect(x, y, rect) {
        return rect.x <= x && x <= rect.x + rect.width &&
            rect.y <= y && y <= rect.y + rect.height;
    }

    (function loop() {
        for (var i = 0, len = drawSegments.length; i < len; i++) {
            drawSpline(context, drawSegments[i], 0.5, false);
        }

        drawSegments = [drawSegments[drawSegments.length - 1]];
        segment = 0;

        requestAnimationFrame(loop);
    }());

});
