$(document).ready(function() {

    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var drawSegments = [
        []
    ];
    var segment = 0;
    var initArr = [];
    var myArr = [];
    let drawArr = [];
    let storeArr = [];
    let activate = false;
    let login = false;
    let loginUser;
    let inputName;

    var tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

    var userInput = $("#user-input");
    var loginForm = $("#login");

    // $(loginForm).on("submit", handleFormSubmit());

    // $('#user-input').val('Din');


    $('#create-button').on('click', function() {
        event.preventDefault();
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (activate === false) {
            $('#login-button').remove();
            $('#create-button').html('activate');
            let inputField = $('<input id="user-input" type="text" class="form-control" placeholder="Enter User Name" name="name">');
            inputField.prependTo('.login-group');
            let instructions = $('<div id="instructions">Enter user name and drag yellow in front of the camera to lock in movement phrase.  click activate to then proceed</div>');
            instructions.appendTo('body');
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
            $('#create-button').remove();
            $('#login-button').html('enter');
            let inputField = $('<input id="user-input" type="text" class="form-control" placeholder="Enter User Name" name="name">');
            inputField.prependTo('.login-group');
            let instructions = $('<div id="instructions">Enter user name and drag yellow in front of the camera to align movement passphrase.  click enter to confirm and proceed</div>');
            instructions.appendTo('body');
            login = true;
        } else {
            handleFormSubmit();
        }
    });


    function handleFormSubmit() {
        // event.preventDefault();
        inputName = $('#user-input').val().trim();
        if (!inputName) {
            return;
        }
        // inputName = userInput.val().trim();
        submitLogin(inputName);
    }

    function submitLogin(loginName) {
        if (login) {
            $.get("/login" + loginName, function(data) {
                loginUser = data.name;
                console.log(data);
                let arr = data.Gestures[0].gestureCode;
                console.log(arr);
                let dbArr = arr.split(',').map(function(item) {
                    return parseInt(item);
                });
                getCode(dbArr, dbArr.length);
            });
        } else if (activate) {
            // myArr = initArr[initArr.length - 1].toString();
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
        myArr = initArr[initArr.length - 1];
        console.log(myArr.length);
        // console.log(dbArrLength);
        console.log(myArr);
        let firstIndex = 0;
        let equalize;
        let newLength;
        if (login){
            if (myArr.length > dbArrLength) {
                equalize = parseInt(myArr.length/dbArrLength);
                newLength = equalize * dbArrLength;
            } else {
                newLength = myArr.length;
                equalize = 1;
            }
        } else {
            newLength = myArr.length;
            equalize = 5;
        }
        console.log(equalize);
        for (var x = 0; x < newLength; x++) {
            if (x % equalize === 0 && x !== 0) {
                // console.log(x + " : " + firstIndex);
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
        console.log(drawArr);
        console.log(drawArr.length);
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
                if (diff >= 100) {
                    match.push(0);
                    erraticMovement++;
                } else {
                    match.push(1);
                }
            }
        }
        console.log(loginUser);
        console.log(inputName);

        if (nullSkips < 20 && erraticMovement < 10 && loginUser === inputName) {
            console.log('You may enter.');
            // window.location.href = "/cms";
            // $.get('/cms', function() {});
        } else {
            console.log('Sorry, incorrect password, try again.');
            alert('Sorry, incorrect password, try again.');
            context.clearRect(0, 0, canvas.width, canvas.height);
            var initArr = [];

        }
        console.log("skipped: " + nullSkips);
        console.log("erratic: " + erraticMovement);
        console.log(match);
    }





    // $('#my-button').on('click', function() {
    //     getCode(condensedArr);
    //     setTimeout(function() {
    //         var initArr = [];
    //         var myArr = [];
    //         var mergeArr = [];
    //     }, 1000);
    // });
    //
    // $('#my-button2').on('click', function() {
    //     // getCode(condensedArr2);
    //     $('#canvas').css('opacity', '1');
    // });
    //
    // $('#my-button3').on('click', function() {
    //     console.log(condensedArr);
    //     console.log(condensedArr2);
    //     let bigger = '';
    //     let match = [];
    //     let anyFalse = false;
    //     if (condensedArr.length <= condensedArr2.length) {
    //         bigger = condensedArr2.length;
    //     } else {
    //         bigger = condensedArr.length;
    //     }
    //     for (var x = 0; x < bigger; x++) {
    //         if (isNaN(condensedArr[x]) === true) {
    //             condensedArr[x] = condensedArr2[x];
    //         } else if (isNaN(condensedArr2[x]) === true) {
    //             condensedArr2[x] = condensedArr[x]
    //         }
    //         let diff = Math.abs(condensedArr[x] - condensedArr2[x]);
    //         console.log(diff);
    //
    //         if (diff >= 50) {
    //             match.push(0);
    //         } else {
    //             match.push(1);
    //         }
    //     }
    //     if (match.indexOf(0) === -1) {
    //         console.log('You may enter.');
    //     } else {
    //         console.log('Sorry, incorrect password, try again.');
    //     }
    //     console.log(match);
    // })
    //




    tracking.track('#video', tracker, {
        camera: true
    });

    tracker.on('track', function(event) {
        if (event.data.length === 0 && drawSegments[segment].length > 0) {
            segment++;

            if (!drawSegments[segment]) {
                drawSegments[segment] = [];
            }
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
