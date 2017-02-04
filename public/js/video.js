(function() {
    var canvas = document.getElementById('mycanvas'),
        context = canvas.getContext('2d'),
        video = document.getElementById('myvideo'),
        vendorURL = window.URL || window.webkitURL;

    navigator.getMedia = navigator.getUserMedia  ||
                         navigator.webitgetUserMedia;

    navigator.getMedia({
        video: true,
        audio: false
    }, function(stream) {
        video.src = vendorURL.createObjectURL(stream);
        video.play();
    }, function (error) {
        console.log('an error occured');
    });

    video.addEventListener('play', function() {
        draw(this, context, 400, 300);
    }, false);

    function draw(video, context, width, height) {
        context.drawImage(video, 0, 0, width, height);
        setTimeout(draw, 10, video, context, width, height);
    }


})();
