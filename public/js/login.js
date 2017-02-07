$(document).ready(function() {

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
    let inputName;

    let tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

    let userInput = $("#user-input");
    let loginForm = $("#login");

    let z = $('<div id="z">Z</div>');
    z.appendTo('body');
    // let o = $('<div id="o">O</div>');
    // o.appendTo('body');

    $('#login-button').mouseenter(function() {
        $('#login-border').css({"width": '170px', 'height': '44px', 'left': '-10px', 'bottom': '-10px'});
    });
    $('#login-button').mouseleave(function() {
        $('#login-border').css({"width": '150px', 'height': '24px', 'left': '0px', 'bottom': '0px'});
    });
    $('#create-button').mouseenter(function() {
        $('#create-border').css({"width": '170px', 'height': '44px', 'right': '-10px', 'bottom': '-10px'});
    });
    $('#create-button').mouseleave(function() {
        $('#create-border').css({"width": '150px', 'height': '24px', 'right': '0px', 'bottom': '0px'});
    });

    $('#create-button').on('click', function() {
        event.preventDefault();

        context.clearRect(0, 0, canvas.width, canvas.height);
        if (activate === false) {
            $('#z').css('opacity', '0');
            let createBar = $('#create-button');
            createBar.html('enter user name');
            createBar.css('width', '1040px');
            $('#login-button').css('opacity', '0');
            $('#login-border, #create-border').css('opacity', '0');
            setTimeout(function() {
                $('#login-border').css({'width': '1040px', 'height': '1px', 'opacity': '1'});
                $('#create-border, #login-button, #z').remove();
                createBar.css({'height': '0px', 'overflow': 'visible', 'background-color': 'rgba(255, 255, 255, 0)'});
                setTimeout(function() {
                    createBar.css({"border-top": 'none', "border-left": 'none',"border-right": 'none'});
                }, 350);
                let inputField = $('<input id="user-input" type="text" class="form-control" autocomplete="off" autofocus name="name">');
                inputField.prependTo('.login-group');
            }, 1000);

            let input = $('#user-input');
            $(document).on('keypress', function(e) {
                if (e.which == 13 && input.val() !== '') {
                    e.preventDefault();
                    $('#create-button').css({'transition': 'all 0s ease', 'border': 'none'});
                    setTimeout(function() {
                        $('#create-button').css({'transition': 'all 2.5s ease', 'opacity': '0', 'margin-bottom': '600px'});
                    }, 10);
                    $('#login-border').css({'transition': 'all 3.5s ease', 'margin-bottom': '760px', 'width': '0px', 'left': '520px'});
                    setTimeout(function(){
                        $('#login-border').css({'width': '1040px', 'left': '0px'});
                    }, 3500);
                    setTimeout(function(){
                        $('#login-border').css({'background-color': 'rgba(255, 255, 255, .1)', 'border-color': 'rgba(255, 255, 255, .5)'});
                    }, 4200);
                    let instructions = $('<div id="instructions">Choose a green object.  &nbsp;&nbsp;Hold it in your hand, pressed against your stomach.  &nbsp;&nbsp;Slowly raise yellow object, facing your camera, and begin to lock in movement phrase.  &nbsp;&nbsp;Once compelte, lower to stomach again and click activate to proceed</div>');
                    instructions.appendTo('#login-border');
                    setTimeout(function(){
                        $('#login-border').css({'transition': 'all 3.5s ease', 'height': '100px', 'margin-bottom': '660px', 'background-color': 'rgba(255, 255, 255, .05)', 'border': '1px solid #666'});
                        instructions.css('opacity', '1');
                    }, 6800);
                    $('#user-input').remove();
                    setTimeout(function() {
                        $('#draw-border').css({'opacity': '.3', 'width': '400px', 'height': '400px', 'left': '300px', 'top': '250px'});
                    }, 4000);
                }
            });
            activate = true;
        } else {
            handleFormSubmit();
            // $.post('/userlogin', )
        }
    });

    $('#login-button').on('click', function() {
        event.preventDefault();
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (login === false) {
            $('#z').css('opacity', '0');
            let loginBar = $('#login-button');
            loginBar.html('enter user name');
            loginBar.css('width', '1040px');
            $('#create-button').css('opacity', '0');
            $('#login-border, #create-border').css('opacity', '0');
            setTimeout(function() {
                $('#create-border').css({'transition': 'all 0s ease', 'width': '1040px', 'height': '1px', 'opacity': '1'});
                $('#login-border, #create-button, #z').remove();
                loginBar.css({'height': '0px', 'overflow': 'visible', 'background-color': 'rgba(255, 255, 255, 0)'});
                setTimeout(function() {
                    loginBar.css({"border-top": 'none', "border-left": 'none',"border-right": 'none'});
                }, 350);
                let inputField = $('<input id="user-input" type="text" class="form-control" autocomplete="off" autofocus name="name">');
                inputField.prependTo('.login-group');
            }, 1000);
            let input = $('#user-input');
            $(document).on('keypress', function(e) {
                if (e.which == 13 && input.val() !== '') {
                    e.preventDefault();
                    $('html').css('backgrouond-color', '#000');
                    $('#login-button').css({'transition': 'all 0s ease', 'border': 'none'});
                    setTimeout(function() {
                        $('#login-button').css({'transition': 'all 2.5s ease', 'opacity': '0', 'margin-bottom': '600px'});
                    }, 10);
                    $('#create-border').css({'transition': 'all 3.5s ease', 'margin-bottom': '760px', 'width': '0px', 'right': '520px'});
                    setTimeout(function(){
                        $('#create-border').css({'width': '1040px', 'right': '0px'});
                    }, 3500);
                    setTimeout(function(){
                        $('#create-border').css({'background-color': 'rgba(255, 255, 255, .1)', 'border-color': 'rgba(255, 255, 255, .5)'});
                    }, 4200);
                    let instructions = $('<div id="instructions">Choose a green object.  &nbsp;&nbsp;Hold it in your hand, pressed against your stomach.  &nbsp;&nbsp;Slowly raise yellow object, facing your camera, and begin to lock in movement phrase.  &nbsp;&nbsp;Once compelte, lower to stomach again and click activate to proceed</div>');
                    instructions.appendTo('#create-border');
                    setTimeout(function(){
                        $('#create-border').css({'transition': 'all 3.5s ease', 'height': '100px', 'margin-bottom': '660px', 'background-color': 'rgba(255, 255, 255, .05)', 'border': '1px solid #666'});
                        instructions.css('opacity', '1');
                    }, 6800);
                    $('#user-input').remove();
                    setTimeout(function() {
                        $('#draw-border').css({'opacity': '.3', 'width': '400px', 'height': '400px', 'left': '300px', 'top': '250px'});
                    }, 4000);
                }
            });
            login = true;
        } else {
            handleFormSubmit();
        }
    });


    function handleFormSubmit() {
        inputName = $('#user-input').val().trim();
        if (!inputName) {
            return;
        }
        submitLogin(inputName);
    }

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
                console.log(data);
                let userKey = data.id;
                let newGesture = {
                    title: 'shape',
                    gestureCode: storeArr.toString(),
                    UserId: userKey
                };
                $.post('/creategesture', newGesture, function(req, res){
                    console.log(res);
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
                console.log(myArr.length/dbArrLength);
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
                console.log(diff);
                if (diff >= 50) {
                    match.push(0);
                    erraticMovement++;
                } else {
                    match.push(1);
                }
            }
        }

        if (nullSkips < 10 && erraticMovement < 10) {
            console.log('You may enter.');
            // window.location.href = "/home";
            // $.get('/home', function() {});
        } else {
            incorrect();
        }
        console.log("skipped: " + nullSkips);
        console.log("erratic: " + erraticMovement);
        console.log(match);
    }

    function incorrect() {
        console.log('Sorry, incorrect password, try again.');
        alert('Sorry, incorrect password, try again.');
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
            // if (!drawSegments[segment]) {
            //     drawSegments[segment] = [];
            // }
        }

        event.data.forEach(function(rect) {
            if (rect.color === 'yellow') {
                draw(rect);
            } else if (rect.color === 'cyan') {
                erase(rect);
            }
        });
    });

    function draw(rect) {
        drawSegments[segment].push(rect.x + rect.width / 2, rect.y + rect.height / 2);
        // console.log(drawSegments[0]);
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
