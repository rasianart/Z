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
    let activate = false;
    let login = false;
    let loginUser;
    let inputName = '';
    let color = '';
    let loginColor;
    let imgInput;
    let userInput = $("#user-input");
    let loginForm = $("#login");
    let initClick = false;

    let tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

    let z = $('<div id="z">Z</div>');
    z.appendTo('body');

    setTimeout(() => {
        $('#bg-vid').css('opacity', '.8');
        $('#container').css('opacity', '.8');
    }, 2500);

    let btmCover = $('<div id="btm-cover" class="cover"></div>').appendTo('body');
    let topCover = $('<div id="top-cover" class="cover"></div>').appendTo('body');
    setTimeout(function() {
        $('.login-group').css({'transition': 'all 3s ease' ,'opacity': '1'});
        setTimeout(function() {
            $('#create-button, #login-button').css({'transition': 'all 3.5s ease', 'box-shadow': '0px 0px 60px 20px #999999'});
        }, 650);
    }, 1500);
    setTimeout(function() {
        $('#btm-cover').css({'margin-top': '530px', 'margin-right': '550px', });
        $('#top-cover').css({'margin-top': '40px', 'margin-left': '550px', });
    }, 500);
    setTimeout(function() {
        $('#btm-cover').css({'transition': 'all 1.5s linear', 'margin-right': '175px'});
    }, 650);
    setTimeout(function() {
        $('#top-cover').css({'transition': 'all 1.5s linear', 'margin-left': '175px'});
    }, 600);
    setTimeout(function() {
        $('.cover').remove();
    }, 2800);

    let imgBox = $('<div id="img-box"></div>').appendTo('body');
    let img = $('<img id="canvas-img">').appendTo(imgBox);

    $(document).on('click', 'div#postz', function(e) {
            imgInput = new Image();
            imgInput.src = canvas.toDataURL("png");
            console.log(inputName);
            sessionStorage.setItem("user", inputName);
    });

    if (initClick === false) {
        $('#login-button').mouseenter(function() {
            $('#login-button').css({'transition': 'all 1s ease', 'box-shadow': '0px 0px 0px 0px #999999'});
            $('#login-border').css({"width": '170px', 'height': '44px', 'left': '-10px', 'bottom': '-10px'});
        });
        $('#login-button').mouseleave(function() {
            if (initClick === false) {
                $('#login-button').css({'transition': 'all 1.6s ease', 'box-shadow': '0px 0px 60px 20px #999999'});
            }
            $('#login-border').css({"width": '150px', 'height': '24px', 'left': '0px', 'bottom': '0px'});
        });
        $('#create-button').mouseenter(function() {
            $('#create-button').css({'transition': 'all 1s ease', 'box-shadow': '0px 0px 0px 0px #999999'});
            $('#create-border').css({"width": '170px', 'height': '44px', 'right': '-10px', 'bottom': '-10px'});
        });
        $('#create-button').mouseleave(function() {
            if (initClick === false) {
                $('#create-button').css({'transition': 'all 1.6s ease', 'box-shadow': '0px 0px 60px 20px #999999'});
            }
            $('#create-border').css({"width": '150px', 'height': '24px', 'right': '0px', 'bottom': '0px'});
        });
    }

    let wait = false;
    $('#create-button').on('click', function() {
        event.preventDefault();
        context.clearRect(0, 0, canvas.width, canvas.height);
        initClick = true;
        $('#create-button, #login-button').css('background-color', 'transparent');
        $('#create-button, #login-button').css({'transition': 'all 1s ease'});
        $('#z').css({'transition': 'all 1s ease', 'opacity': '0'});
        let createBar = $('#create-button');
        if (inputName === '') {
            createBar.html('create user name');
        }
        createBar.css('width', '1040px');
        $('#login-button').css('opacity', '0');
        $('#login-border, #create-border').css('opacity', '0');
        setTimeout(function() {
            $('#login-border').css({'transition': 'all 0s ease', 'width': '1040px', 'height': '1px', 'opacity': '1'});
            $('#create-border, #login-button').remove();
            createBar.css({'height': '0px', 'overflow': 'visible', 'background-color': 'rgba(255, 255, 255, 0)'});
            setTimeout(function() {
                createBar.css({"border-top": 'none', "border-left": 'none',"border-right": 'none'});
            }, 350);
            let inputField = $('<input id="user-input" type="text" class="form-control" autocomplete="off" autofocus name="name">');
            inputField.prependTo('.login-group');
        }, 1000);
        setTimeout(function() {
            $('#z').remove();
        }, 2000);

        let input = $('#user-input');
        $(document).on('keypress', function(e) {
            if (e.which == 13 && input.val() !== '' && inputName === '') {
                e.preventDefault();
                inputName = $('#user-input').val().trim().toLowerCase();
                $('#user-input').val('');
                createBar.html('enter a color: cyan, yellow, or magenta. this color will be tracked to record movement phrase');
                setTimeout(() => {
                    wait = true;
                }, 100);
            }
        });
        $(document).on('keypress', function(event) {
            if (event.which == 13 && input.val() !== '' && inputName !== '' && wait === true) {
                event.preventDefault();
                color = $('#user-input').val().trim().toLowerCase();
                if (color === 'cyan' ||  color === 'yellow' || color === 'magenta') {
                    $('body').attr('data-login', 'true');
                    sessionStorage.setItem("user", inputName);
                    $('#bg-vid').css('opacity', '.4');
                    $('#create-button').css({'transition': 'all 0s ease', 'border': 'none'});
                    setTimeout(function() {
                        $('#create-button').css({'transition': 'all 2.5s ease', 'opacity': '0', 'margin-bottom': '600px'});
                    }, 10);
                    $('#login-border').css({'transition': 'all 2.8s ease', 'margin-bottom': '760px', 'width': '0px', 'left': '520px'});
                    setTimeout(function(){
                        $('#login-border').css({'width': '1040px', 'left': '0px'});
                    }, 2400);
                    setTimeout(function(){
                        $('#login-border').css({'background-color': 'rgba(255, 255, 255, .1)', 'border-color': 'rgba(255, 255, 255, .5)'});
                    }, 2900);
                    let instructions = $('<div id="instructions">Choose a ' + color + ' object.  &nbsp;&nbsp;Hold it in your hand, pressed against your stomach.  &nbsp;&nbsp;Slowly raise ' + color + ' object, facing your camera, and begin to lock in movement phrase.  &nbsp;&nbsp;Once compelte, lower to stomach again and click activate to proceed</div>');
                    instructions.appendTo('#login-border');
                    setTimeout(function(){
                        $('#login-border').css({'transition': 'all 2.5s ease', 'height': '100px', 'margin-bottom': '660px', 'background-color': 'rgba(255, 255, 255, .05)', 'border': '1px solid #666'});
                        instructions.css('opacity', '1');
                    }, 4500);
                    $('#user-input').remove();
                    setTimeout(function() {
                        $('#draw-border').css({'opacity': '.5', 'width': '400px', 'height': '400px', 'left': '300px', 'top': '250px'});
                    }, 2666);
                    let postZ = $('<div id="postz">Post Z</div>');
                    postZ.appendTo('body');
                    let reset = $('<div id="reset">Reset</div>');
                    reset.appendTo('body');
                    setTimeout(function() {
                        postZ.css({'height': '50px', 'margin-bottom': '15px;'});
                        reset.css({'height': '50px', 'margin-bottom': '15px;'});
                    }, 5500);
                } else {
                    createBar.html('Please enter either cyan, yellow, or magenta');
                }
            }
        });
        activate = true;
    });

    $(document).on('click', 'div#reset', () => {
        drawSegments[segment] = [];
        initArr = [];
        context.clearRect(0, 0, canvas.width, canvas.height);
    })

    $('#login-button').on('click', function() {
        event.preventDefault();
        context.clearRect(0, 0, canvas.width, canvas.height);
        initClick = true;
        $('#create-button, #login-button').css('background-color', 'transparent');
        $('#create-button, #login-button').css({'transition': 'all 1s ease'});
        $('#z').css({'transition': 'all 1s ease', 'opacity': '0'});
        let loginBar = $('#login-button');
        loginBar.html('enter user name');
        loginBar.css('width', '1040px');
        $('#create-button').css('opacity', '0');
        $('#login-border, #create-border').css('opacity', '0');
        setTimeout(function() {
            $('#create-border').css({'transition': 'all 0s ease', 'width': '1040px', 'height': '1px', 'opacity': '1'});
            $('#login-border, #create-button').remove();
            loginBar.css({'height': '0px', 'overflow': 'visible', 'background-color': 'rgba(255, 255, 255, 0)'});
            setTimeout(function() {
                loginBar.css({"border-top": 'none', "border-left": 'none',"border-right": 'none'});
            }, 350);
            let inputField = $('<input id="user-input" type="text" class="form-control" autocomplete="off" autofocus name="name">');
            inputField.prependTo('.login-group');
        }, 1000);
        setTimeout(function() {
            $('#z').remove();
        }, 2000);
        let input = $('#user-input');
        $(document).on('keypress', function(e) {
            if (e.which == 13 && input.val() !== '') {
                e.preventDefault();
                inputName = $('#user-input').val().trim().toLowerCase();
                $.get('/getuser/' + inputName, (data) => {
                    loginColor = data.color;
                    if (data !== '') {
                        sessionStorage.setItem("user", data.name);
                        $('body').attr('data-login', 'true');
                        $('html').css('backgrouond-color', '#000');
                        $('#bg-vid').css('opacity', '.4');
                        $('#login-button').css({'transition': 'all 0s ease', 'border': 'none'});
                        setTimeout(function() {
                            $('#login-button').css({'transition': 'all 2.5s ease', 'opacity': '0', 'margin-bottom': '600px'});
                        }, 10);
                        $('#create-border').css({'transition': 'all 2.8s ease', 'margin-bottom': '760px', 'width': '0px', 'right': '520px'});
                        setTimeout(function(){
                            $('#create-border').css({'width': '1040px', 'right': '0px'});
                        }, 2400);
                        setTimeout(function(){
                            $('#create-border').css({'background-color': 'rgba(255, 255, 255, .1)', 'border-color': 'rgba(255, 255, 255, .5)'});
                        }, 2900);
                        let instructions = $('<div id="instructions">Prepare your login color.  &nbsp;&nbsp;Hold it in your hand, pressed against your stomach.  &nbsp;&nbsp;Slowly raise your color, facing your camera, and begin to lock in movement phrase.  &nbsp;&nbsp;Once compelte, lower to stomach again and click activate to proceed</div>');
                        instructions.appendTo('#create-border');
                        setTimeout(function(){
                            $('#create-border').css({'transition': 'all 2.5s ease', 'height': '100px', 'margin-bottom': '660px', 'background-color': 'rgba(255, 255, 255, .05)', 'border': '1px solid #666'});
                            instructions.css('opacity', '1');
                        }, 4500);
                        $('#user-input').remove();
                        setTimeout(function() {
                            $('#draw-border').css({'opacity': '.5', 'width': '400px', 'height': '400px', 'left': '300px', 'top': '250px'});
                        }, 2666);
                        let postZ = $('<div id="postz">Post Z</div>');
                        let reset = $('<div id="reset">Reset</div>');
                        reset.appendTo('body');
                        postZ.appendTo('body');
                        setTimeout(function() {
                            postZ.css({'height': '50px', 'margin-bottom': '15px;'});
                            reset.css({'height': '50px', 'margin-bottom': '15px;'});
                        }, 5500);
                    } else {
                        $('#user-input').val('');
                        $('#alert').html('User Does Not Exist');
                        $('#alert').css('opacity', '1');
                        setTimeout(() => {
                            $('#alert').css('opacity', '0');
                        }, 2500);
                    }
                });
            }
        });
        login = true;
    });

    $(document).on('click', 'div#postz', handleFormSubmit);

    function handleFormSubmit() {
        if (!inputName) {
            return;
        }
        submitLogin(inputName);
    }

    function submitLogin(loginName) {
        if (login) {
            $.get("/login" + loginName, function(data) {
                console.log(data);
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
                name: loginName.toLowerCase(),
                color: color,
                loginimg: imgInput.src
            }
            $.post('/createuser', newUser, function(data){
                console.log(data);
                let userKey = data.id;
                let newGesture = {
                    title: 'shape',
                    gestureCode: storeArr.toString(),
                    UserId: userKey
                };
                $.post('/creategesture', newGesture, function(req, res){
                    console.log(res);
                    correct();
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
        if (activate === false) {
            compareCode(dbArray, drawArr);
        }
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
                if (diff >= 50) {
                    match.push(0);
                    erraticMovement++;
                } else {
                    match.push(1);
                }
            }
        }

        if (nullSkips < 10 && erraticMovement < arrDB.length * .25) {
            correct();
        } else {
            incorrect();
        }
        console.log("skipped: " + nullSkips);
        console.log("erratic: " + erraticMovement);
        console.log("erraticMax: " + arrDB.length * .25);
        console.log(match);
    }

    function correct() {
        console.log('You may enter.');
        $('#access').css({'opacity': '1'});
        setTimeout(() => {
            $('#access').css('opacity', '0');
        }, 1500);
        $('#postz').html('enter');
        $('.draw-frame').css('opacity', '0');
        setTimeout(function() {
            $('.draw-frame').remove();
        }, 1000);
        $('#bg-vid').css({'transition': 'all 2s ease', 'opacity': '0'});
    }

    function incorrect() {
        console.log('Sorry, incorrect password, try again.');
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
            if (rect.color === color || loginColor) {
                draw(rect);
            }
        });
    });

    let x = 0;
    function draw(rect) {
        // if (x % 2 === 0) {
            drawSegments[segment].push(rect.x + rect.width / 2, rect.y + rect.height / 2);
            // console.log(drawSegments);
            initArr.push(drawSegments[0]);
        // }
        x++;
    }

    function isInsideRect(x, y, rect) {
        return rect.x <= x && x <= rect.x + rect.width &&
            rect.y <= y && y <= rect.y + rect.height;
    }

    (function loop() {
        for (var i = 0, len = drawSegments.length; i < len; i++) {
            // if (i % 2 === 0) {
                drawSpline(context, drawSegments[i], 0.5, false);
            // }
        }

        drawSegments = [drawSegments[drawSegments.length - 1]];
        segment = 0;

        requestAnimationFrame(loop);
    }());

});
