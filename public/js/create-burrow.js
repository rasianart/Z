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
    let riddle = false,
        answer = false,
        info = false,
        link = false,
        image = false,
        connect1 = false,
        connect2 = false,
        connect3 = false,
        connect4 = false,
        connect5 = false;
    let ridInput = '',
        ansInput = '',
        infInput = '',
        linInput = '',
        imgInput = '',
        conInput1 = 'No Burrow Connection',
        conInput2 = 'No Burrow Connection',
        conInput3 = 'No Burrow Connection',
        conInput4 = 'No Burrow Connection',
        conInput5 = 'No Burrow Connection',
        chosenInput,
        color,
        loginUser,
        inputName;
    let hover = false;

    let user = sessionStorage.user;
    let userColor;
    $.get('/getuser/' + user, (data) => {
        userColor = data.color;
    });

    setTimeout(() => {
        $('#bg-vid').css('opacity', '.5');   //city and all else unless stated otherwise
                            //tracer doesn't need grayscale!
                            //wave need the brightness adjustment! brightness cancels out grayscale and it works!
    }, 2000);

    let vid = document.getElementById("bg-vid");
    // vid.playbackRate = 0.2;  //honeycomb

    let initCircle = (cId, mLeft, mTop) => {
        $(cId).css({'margin-left': mLeft, 'margin-top': mTop});
    }

    initCircle('#c1', '480px', '155px');
    initCircle('#c2', '475px', '200px');
    initCircle('#c3', '500px', '190px');
    initCircle('#c4', '530px', '180px');
    initCircle('#c5', '510px', '170px');
    $('form').css({'opacity': '1'});

    function randCircle() {
        for (let x = 1; x < 6; x++) {
            randomT = Math.floor((Math.random() * 101) + 150);
            randomL = Math.floor((Math.random() * 101) + 450);
            $('#c' + x).css({'margin-left': randomL + 'px', 'margin-top': randomT + 'px'});
        }
    }

    $('.c').mouseenter(function() {
        if (hover === false) {
            randCircle();
        }
    });

    function slideUp(id, px) {
        $(id).css('margin-top', px);
    }

    setTimeout(() => {
        slideUp('#riddle', '75px');
        slideUp('#answer', '225px');
        slideUp('#info', '375px');
        slideUp('#link', '525px');
        slideUp('#image', '675px');
        slideUp('#connect1', '75px');
        slideUp('#connect2', '225px');
        slideUp('#connect3', '375px');
        slideUp('#connect4', '525px');
        slideUp('#connect5', '675px');
    }, 3000);

    let imgBox = $('<div id="img-box"></div>').appendTo('body');
    let img = $('<img id="canvas-img">').appendTo(imgBox);

    let thisUser = sessionStorage.user;

    $('#post').on('click', function() {
        imgInput = new Image();
        imgInput.src = canvas.toDataURL("image/png");
        $('#canvas-img').attr('src', imgInput.src);
        setTimeout(function() {
            $('#img-box').css({'margin-left': '120px', 'margin-top': '25px', 'opacity': '1'});
        }, 100);
        setTimeout(function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawSegments[segment] = [];
            initArr = [];
        }, 200);
        setTimeout(function() {
            $('#img-box, #img-reset, #post').css({'transition': 'all 1s ease', 'opacity': '0'});
            randCircle();
        }, 2000);
    });

    $('#submit-all').on('click', function() {
        if (ridInput === '' || ansInput === '' || infInput === '' || linInput === '' ||  imgInput === '') {
            $('#alert').css('opacity', '1');
            setTimeout(() => {
                $('#alert').css('opacity', '0');
            }, 4500);
        } else {
            let body = {
                name: thisUser,
                userimg: imgInput.src,
                riddle: ridInput,
                answer: ansInput,
                info: infInput,
                link: linInput,
                color: color,
                burrow1: conInput1,
                burrow2: conInput2,
                burrow3: conInput3,
                burrow4: conInput4,
                burrow5: conInput5
            };
            $.post('/updatebio', body, (req, res) => {
                console.log(res);
            });
            $('*').css({'transition': 'all 3s ease', 'opacity': '0'});
            $('body').css({'opacity': '1', 'background-color': 'rgba(40, 40, 40, 1)'});
            setTimeout(() => {
                $.get('/home/', function(data) {});
                window.location.href = "/home/";
            }, 3000);
        }
    })

    $(document).on('keypress', function (e) {
        if (e.which === 13 && $('#' + chosenInput).val() !== '') {
            $('#submit-all').css('opacity', '1');
            $('#c1').css({'margin-left': '500px', 'margin-top': '200px', 'background-color': 'rgba(255, 255, 255, .15)'});
            $('#c2').css({'margin-left': '425px', 'margin-top': '200px', 'background-color': 'rgba(255, 255, 255, .1)'});
            $('#c3').css({'margin-left': '350px', 'margin-top': '200px', 'background-color': 'rgba(255, 255, 255, 0)'});
            $('#c4').css({'margin-left': '575px', 'margin-top': '200px', 'background-color': 'rgba(255, 255, 255, .1)'});
            $('#c5').css({'margin-left': '650px', 'margin-top': '200px', 'background-color': 'rgba(255, 255, 255, 0)'});
            setTimeout(randCircle, 3000);
            setTimeout(function() {
                $('.c').css('background-color', 'rgba(0, 0, 0, 0)');
            }, 3500);

            let onInput = (id, mTop) => {
                $('#' + id).css({'margin-top': '400px'});
                setTimeout(function() {
                    if ($('#' + id).hasClass('connections')) {
                        $('#' + id).css({'width': '0px', 'margin-right': '750px'});
                    } else {
                        $('#' + id).css({'width': '0px', 'margin-left': '750px'});
                    }
                }, 2500);
                setTimeout(function() {
                    $('#' + id).val('');
                    $('#' + id).css({'transition': 'all .5s ease', 'border-radius': '50%', 'width': '22px', 'height': '22px'});
                }, 5000);
                setTimeout(function() {
                    if ($('#' + id).hasClass('connections')) {
                        $('#' + id).css({'transition': 'all 1.5s ease', 'margin-right': '30px', 'margin-top': mTop, 'border': '1px solid white'});
                    } else {
                        $('#' + id).css({'transition': 'all 1.5s ease', 'margin-left': '30px', 'margin-top': mTop, 'border': '1px solid white'});
                    }
                }, 6000);
            }
            setTimeout(() => {
                hover = false;
            }, 7500);

            switch(chosenInput) {
                case 'riddle':
                    ridInput = $('#riddle').val().trim();
                    onInput('riddle', '75px');
                    riddle = false;
                    break;
                case 'answer':
                    ansInput = $('#answer').val().trim().toLowerCase();
                    onInput('answer', '225px');
                    answer = false;
                    break;
                case 'info':
                    infInput = $('#info').val().trim();
                    onInput('info', '375px');
                    info = false;
                    break;
                case 'link':
                    linInput = $('#link').val().trim();
                    onInput('link', '525px');
                    link = false;
                    break;
                case 'image':
                    imgInput = $('#image').val().trim();
                    onInput('image', '675px');
                    image = false;
                    break;
                case 'connect1':
                    conInput1 = $('#connect1').val().trim().toLowerCase();
                    onInput('connect1', '75px');
                    connect1 = false;
                    break;
                case 'connect2':
                    conInput2 = $('#connect2').val().trim().toLowerCase();
                    onInput('connect2', '225px');
                    connect2 = false;
                    break;
                case 'connect3':
                    conInput3 = $('#connect3').val().trim().toLowerCase();
                    onInput('connect3', '375px');
                    connect3 = false;
                    break;
                case 'connect4':
                    conInput4 = $('#connect4').val().trim().toLowerCase();
                    onInput('connect4', '525px');
                    connect4 = false;
                    break;
                case 'connect5':
                    conInput5 = $('#connect5').val().trim().toLowerCase();
                    onInput('connect5', '675px');
                    connect5 = false;
                    break;
            }
        }
    });

    let onClick = (id, textId, cId) => {
        hover = true;
        let newBool = eval(id);
        if (!newBool) {
            $(textId).css('opacity', '0');
            if ($('#' + id).hasClass('minis')) {
                $('#' + id).css({'transition': 'all 1.5s ease', 'margin-left': '750px', 'margin-top': '50px'});
            } else {
                $('#' + id).css({'transition': 'all 1.5s ease', 'margin-right': '750px', 'margin-top': '50px'});
            }
            $(cId).css({'width': '450px', 'height': '450px'});
        }
        setTimeout(function() {
            if ($('#' + id).hasClass('minis')) {
                $('#' + id).css({'transition': 'all 2s ease', 'width': '1000px', 'border': 'none', 'border-bottom': '1px solid white', 'border-radius': '0%', 'margin-left': '250px', 'placeholder': 'Enter riddle as portal protection'});
            } else {
                $('#' + id).css({'transition': 'all 2s ease', 'width': '1000px', 'border': 'none', 'border-bottom': '1px solid white', 'border-radius': '0%', 'margin-right': '250px', 'placeholder': 'Enter riddle as portal protection'});
            }
        }, 1300);
        $('#instruct').css('opacity', '0');
        chosenInput = id;
    }

    $('.minis, .connections').on('click', function() {
        let clickId = $(this).attr('id');
        let newId = clickId.replace('#', '');
        switch(newId) {
            case 'riddle':
                onClick(newId, '#text1', '#c1');
                riddle = true;
                break;
            case 'answer':
                onClick(newId, '#text2', '#c2');
                answer = true;
                break;
            case 'info':
                onClick(newId, '#text3', '#c3');
                info = true;
                break;
            case 'link':
                onClick(newId, '#text4', '#c4');
                link = true;
                break;
            case 'image':
                if (!image) {
                    hover = true;
                    $('#submit-all').css({'transition': 'all .5s ease', 'opacity': '1'});
                    let imgReset = $('<div id="img-reset">Reset</div>').appendTo('body');
                    $('#text5').css('opacity', '0');
                    $('#image').css({'transition': 'all 1.5s ease', 'margin-left': '620px', 'margin-top': '50px'});
                    $('#c5').css({'width': '450px', 'height': '450px'});
                    setTimeout(() => {
                        $('#post').css({'opacity': '1', 'z-index': '15'});
                        $('#image').css('opacity', '0');
                    }, 1300);
                    setTimeout(() => {
                        $('#img-reset').css({'opacity': '1', 'margin-bottom': '50px'});
                        $('#post').css({'width': '150px', 'height': '35px', 'margin-left': '560px', 'border-radius': '0%'});
                        $('#c5').css({'margin-left': '500px', 'margin-top': '200px', 'background-color': 'rgba(255, 255, 255, 0)'});
                    }, 1800);
                    setTimeout(() => {
                        $('#post-text').css({'opacity': '1'});
                    }, 2300);
                }

                image = true;
                break;
            case 'connect1':
                onClick(newId, '#chain1', '#c1');
                connect1 = true;
                break;
            case 'connect2':
                onClick(newId, '#chain2', '#c2');
                connect2 = true;
                break;
            case 'connect3':
                onClick(newId, '#chain3', '#c3');
                connect3 = true;
                break;
            case 'connect4':
                onClick(newId, '#chain4', '#c4');
                connect4= true;
                break;
            case 'connect5':
                $('#submit-all').css({'transition': 'all .5s ease', 'opacity': '1'});
                onClick(newId, '#chain5', '#c5');
                connect5 = true;
                break;
        }
    });

    $(document).on('click', 'div#img-reset', function() {
        drawSegments[segment] = [];
        initArr = [];
        context.clearRect(0, 0, canvas.width, canvas.height);
    })


    let hoverMouse = (miniId, miniHeight, cId, textId) => {
        let mleft;
        let mTop;
        let mRight;
        $('#' + miniId).mouseenter(function() {
            if (hover === false) {
                mLeft = $(cId).css('margin-left');
                mTop = $(cId).css('margin-top');
                $(this).hasClass('connections') ? mRight = '750px' : mRight = '250px';
                let newId = eval(miniId);
                if (!newId) {
                    $(this).css({'width': '30px', 'height': '30px', 'margin-left' : '26px', 'margin-top' : miniHeight + 'px'});
                    $(cId).css({'transition': 'all 1s ease', 'background-color': 'rgba(255, 255, 255, .4)', 'margin-left': mRight , 'margin-top': '180px'});
                    $(textId).css('opacity', '1');
                    if ($(this).attr('id') === 'image') {
                        $('#submit-all').css({'transition': 'all .5s ease', 'opacity': '0'});
                    }
                    if ($(this).hasClass('connections')) {
                        $('#instruct').css('opacity', '1');
                    };
                }
            }
        });
        $('#' + miniId).mouseleave(function() {
            if (hover === false) {
                let newId = eval(miniId);
                if (!newId) {
                    $(this).css({'width': '22px', 'height': '22px', 'margin-left' : '30px', 'margin-top' : (miniHeight + 4) + 'px'});
                    $(cId).css({'background-color': 'rgba(0, 0, 0, 0)', 'margin-left': mLeft, 'margin-top': mTop});
                    $(textId).css('opacity', '0');
                    if ($(this).attr('id') === 'image') {
                        $('#submit-all').css({'transition': 'all .5s ease', 'opacity': '1'});
                    }
                    if ($(this).hasClass('connections')) {
                        if ($(this).attr('id') === 'image') {
                            $('#submit-all').css({'transition': 'all .5s ease', 'opacity': '1'});
                        }
                        $('#instruct').css('opacity', '0');
                    };
                }
            }
        });
    }

    hoverMouse('riddle', 71, '#c1', '#text1');
    hoverMouse('answer', 221, '#c2', '#text2');
    hoverMouse('info', 371, '#c3', '#text3');
    hoverMouse('link', 521, '#c4', '#text4');
    hoverMouse('image', 671, '#c5', '#text5');
    hoverMouse('connect1', 71, '#c1', '#chain1');
    hoverMouse('connect2', 221, '#c2', '#chain2');
    hoverMouse('connect3', 371, '#c3', '#chain3');
    hoverMouse('connect4', 521, '#c4', '#chain4');
    hoverMouse('connect5', 671, '#c5', '#chain5');

    $('#cover-circle').css({'opacity': '0'});
    setTimeout(function(){
        $('#cover-circle').remove();
    }, 10000);

    // tracking.ColorTracker.registerColor('green', function(r, g, b) {
    //   if (r < 50 && g > 200 && b < 50) {
    //     return true;
    //   }
    //   return false;
    // });

    let tracker = new tracking.ColorTracker(['yellow']);

    // function submitLogin(loginName) {
    //     if (login) {
    //         $.get("/login" + loginName, function(data) {
    //             console.log(data);
    //             loginUser = data.name;
    //             let arr = data.Gestures[0].gestureCode;
    //             let dbArr = arr.split(',').map(function(item) {
    //                 return parseInt(item);
    //             });
    //             console.log(dbArr);
    //             getCode(dbArr, dbArr.length);
    //         });
    //     } else if (activate) {
    //         getCode();
    //         let newUser = {
    //             name: loginName
    //         }
    //         $.post('/createuser', newUser, function(data){
    //             console.log(data);
    //             let userKey = data.id;
    //             let newGesture = {
    //                 title: 'shape',
    //                 gestureCode: storeArr.toString(),
    //                 UserId: userKey
    //             };
    //             $.post('/creategesture', newGesture, function(req, res){
    //                 console.log(res);
    //
    //             });
    //         });
    //     }
    // }
    //
    // function getCode(dbArray, dbArrLength) {
    //     context.clearRect(0, 0, canvas.width, canvas.height);
    //     let drawArr = [];
    //     let firstIndex = 0;
    //     let equalize;
    //     let newLength;
    //
    //     myArr = initArr[initArr.length - 1];
    //
    //     if (login){
    //         if (myArr.length > dbArrLength) {
    //             console.log(myArr.length/dbArrLength);
    //             if (myArr.length/dbArrLength < 7.5) {
    //                 equalize = parseInt(myArr.length/dbArrLength);
    //                 newLength = equalize * dbArrLength;
    //             } else {
    //                 incorrect();
    //                 return;
    //             }
    //         } else {
    //             newLength = myArr.length;
    //             equalize = 1;
    //         }
    //     } else {
    //         newLength = myArr.length;
    //         equalize = 5;
    //     }
    //
    //     for (var x = 0; x < newLength; x++) {
    //         if (x % equalize === 0 && x !== 0) {
    //             let newMyArr = myArr.slice(firstIndex, x);
    //             firstIndex = x;
    //             var result = newMyArr.map(function(y) {
    //                 return parseInt(y);
    //             });
    //             var sum = result.reduce(function(a, b) {
    //                 return a + b;
    //             });
    //             var avg = parseInt(sum / result.length);
    //             drawArr.push(avg);
    //         }
    //     }
    //     storeArr = drawArr;
    //
    //     if (activate === false) {
    //         compareCode(dbArray, drawArr);
    //     }
    // }
    //
    // function compareCode(arrDB, arrUser) {
    //     let bigger = '';
    //     let match = [];
    //     let anyFalse = false;
    //     let nullSkips = 0;
    //     let erraticMovement = 0;
    //
    //     if (arrDB.length <= arrUser.length) {
    //         bigger = arrUser.length;
    //     } else {
    //         bigger = arrDB.length;
    //     }
    //
    //     for (var x = 0; x < bigger; x++) {
    //         if (isNaN(arrDB[x]) === true) {
    //             nullSkips++;
    //         } else if (isNaN(arrUser[x]) === true) {
    //             nullSkips++;
    //         } else {
    //             let diff = Math.abs(arrDB[x] - arrUser[x]);
    //             console.log(diff);
    //             if (diff >= 50) {
    //                 match.push(0);
    //                 erraticMovement++;
    //             } else {
    //                 match.push(1);
    //             }
    //         }
    //     }
    //
    //     // if (nullSkips < 10 && erraticMovement < 10) {
    //     if (1 === 1) {
    //         console.log('You may enter.');
    //         // $('#postz').html('enter');
    //         $('.draw-frame').css('opacity', '0');
    //         setTimeout(function() {
    //             $('.draw-frame').remove();
    //         }, 1000);
    //         // $.get('/home', function() {});
    //         // window.location.href = "/home";
    //
    //     } else {
    //         incorrect();
    //     }
    //     console.log("skipped: " + nullSkips);
    //     console.log("erratic: " + erraticMovement);
    //     console.log(match);
    // }
    //
    // function incorrect() {
    //     console.log('Sorry, incorrect password, try again.');
    //     alert('Sorry, incorrect password, try again.');
    //     drawSegments[segment] = [];
    //     initArr = [];
    //     context.clearRect(0, 0, canvas.width, canvas.height);
    // }

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
            // else if (rect.color === 'cyan') {
            //     erase(rect);
            // }
        });
    });

    function draw(rect) {
        drawSegments[segment].push(rect.x + rect.width / 2, rect.y + rect.height / 2);
        initArr.push(drawSegments[0]);
    }

    // function erase(rect) {
    //     context.clearRect(rect.x, rect.y, rect.width, rect.height);
    // }

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
