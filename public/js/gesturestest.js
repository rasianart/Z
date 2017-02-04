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
    var condensedArr = [];
    var condensedArr2 = [];
    var mergeArr = [];
    let drawArr = [];

    var tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

    var userInput = $("#user-input");
    var loginForm = $("#login");

    $(loginForm).on("submit", handleFormSubmit);

    $('#user-input').val('Din');


    function handleFormSubmit(event) {
        event.preventDefault();
        console.log($('#user-input').val().trim());
        if (!userInput.val().trim()) {
            return;
        }
        let userNameInput = userInput.val().trim();
        submitLogin(userNameInput);
    }

    function submitLogin(login) {
        $.get("/login" + login, function(data) {
            let Arr = data.Gestures[0].gestureCode;
            console.log(Arr);
            let dbArr = Arr.split(',').map(function(item) {
                return parseInt(item);
            });
            console.log("dbArry: " + dbArr.length);
            // dbArrModulo = dr.length
            // getCode(dbArr.length, compareCode(dbArr, drawArr));
            getCode(dbArr, dbArr.length);

        });
    }

    function getCode(dbArray, dbArrLength) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        myArr = initArr[initArr.length - 1];
        // console.log(myArr.length);
        // console.log(myArr);
        let firstIndex = 0;
        // console.log(dbArrLength);
        let equalize = Math.round(myArr.length/dbArrLength);
        // let equalize = myArr.length/dbArrLength;
        // console.log(equalize);
        let newLength = equalize * dbArrLength;
        for (var x = 0; x < newLength; x++) {
            if (x % equalize === 0 && x !== 0) {
                let newMyArr = myArr.slice(firstIndex, x);
                firstIndex = x;
                // console.log(newMyArr);
                var result = newMyArr.map(function(y) {
                    return Math.round(y);
                });
                // console.log(result);
                var sum = result.reduce(function(a, b) {
                    return a + b;
                });
                var avg = Math.round(sum / result.length);
                drawArr.push(avg);
            }
        }
        console.log(drawArr);
        console.log(drawArr.length);
        // cb;
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
        console.log(arrDB);
        console.log(arrUser);
        for (var x = 0; x < bigger; x++) {
            if (isNaN(arrDB[x]) === true) {
                // arrDB[x] = arrUser[x];
                nullSkips++;
                console.log('skipped');
            } else if (isNaN(arrUser[x]) === true) {
                // arrUser[x] = arrDB[x];
                nullSkips++;
                console.log('skipped');
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
        if (match.indexOf(0) === -1 && nullSkips < 20 && erraticMovement < 5) {
            console.log('You may enter.');
        } else {
            console.log('Sorry, incorrect password, try again.');
        }
        console.log("erratic: " + erraticMovement);
        console.log(match);
    }


    $('#my-button').on('click', function() {
        getCode(condensedArr);
        setTimeout(function() {
            var initArr = [];
            var myArr = [];
            var mergeArr = [];
        }, 1000);
    });

    $('#my-button2').on('click', function() {
        // getCode(condensedArr2);
        $('#canvas').css('opacity', '1');
    });

    $('#my-button3').on('click', function() {
        console.log(condensedArr);
        console.log(condensedArr2);
        let bigger = '';
        let match = [];
        let anyFalse = false;
        if (condensedArr.length <= condensedArr2.length) {
            bigger = condensedArr2.length;
        } else {
            bigger = condensedArr.length;
        }
        for (var x = 0; x < bigger; x++) {
            if (isNaN(condensedArr[x]) === true) {
                condensedArr[x] = condensedArr2[x];
            } else if (isNaN(condensedArr2[x]) === true) {
                condensedArr2[x] = condensedArr[x]
            }
            let diff = Math.abs(condensedArr[x] - condensedArr2[x]);
            console.log(diff);

            if (diff >= 50) {
                match.push(0);
            } else {
                match.push(1);
            }
        }
        if (match.indexOf(0) === -1) {
            console.log('You may enter.');
        } else {
            console.log('Sorry, incorrect password, try again.');
        }
        console.log(match);
    })





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
