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
    let activate = true;
    let login = true;
    let loginUser;
    let inputName;
    let tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

    $('.portals').on('click', function() {
        inputName = $(this).attr('id');
        // setTimeout(function() {
        //     tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
        // }, 5000);
        // submitLogin(inputName);
    });


//have variable with stored selected users name that will be input into the submit login function

    function submitLogin(loginName) {
        if (login) {
            $.get("/login" + loginName, function(data) {
                console.log(data);
                loginUser = data.name;
                let arr = data.Gestures[0].gestureCode;
                let dbArr = arr.split(',').map(function(item) {
                    return parseInt(item);
                });
                console.log(dbArr);
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
                    // $('#postz').html('enter');
                    // $.get('/home', function() {});
                    // window.location.href = "/home";
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

        // if (nullSkips < 10 && erraticMovement < 10) {
        if (1 === 1) {
            console.log('You may enter.');
            // $('#postz').html('enter');
            $('.draw-frame').css('opacity', '0');
            setTimeout(function() {
                $('.draw-frame').remove();
            }, 1000);
            // $.get('/home', function() {});
            // window.location.href = "/home";

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
