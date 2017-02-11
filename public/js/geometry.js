var group;
var container, container2, controls, stats;
var particlesData = [];
var camera, scene, renderer;
var positions, colors;
var particles;
var pointCloud;
var particlePositions;
var linesMesh;

var maxParticleCount = 1000;
var particleCount = 75;
var r = 1800;
var rHalf = r / 2;

var effectController = {
    showDots: true,
    showLines: true,
    minDistance: 150,
    limitConnections: false,
    maxConnections: 20,
    particleCount: 500
};

init();
animate();

function initGUI() {

    var gui = new dat.GUI();

    // gui.add( effectController, "showDots" ).onChange( function( value ) { pointCloud.visible = value; } );
    gui.add(effectController, "showLines").onChange(function(value) {
        linesMesh.visible = value;
    });
    gui.add(effectController, "minDistance", 10, 300);
    gui.add(effectController, "limitConnections");
    gui.add(effectController, "maxConnections", 0, 30, 1);
    gui.add(effectController, "particleCount", 0, maxParticleCount, 1).onChange(function(value) {

        particleCount = parseInt(value);
        particles.setDrawRange(0, particleCount);

    });

}

function init() {

    // initGUI();

    container = document.getElementById('container');
    // container2 = document.getElementById( 'container2' );

    //

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
    camera.position.z = 1750;

    // controls = new THREE.OrbitControls( camera, container );

    scene = new THREE.Scene();
    if ($('#create-hole').html() === 'Burrow') {
        scene.background = new THREE.Color("rgb(40, 40, 40)");
    }else {
        scene.background = new THREE.Color("rgb(125, 125, 125)");
    }


    group = new THREE.Group();
    scene.add(group);

    // var helper = new THREE.BoxHelper( new THREE.Mesh( new THREE.BoxGeometry( r, r, r ) ) );
    // helper.material.color.setHex( 0x080808 );
    // helper.material.blending = THREE.AdditiveBlending;
    // helper.material.transparent = true;
    // group.add( helper );

    var segments = maxParticleCount * maxParticleCount;

    positions = new Float32Array(segments * 3);
    colors = new Float32Array(segments * 3);
    // console.log(colors);

    var pMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 3,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: false
    });

    particles = new THREE.BufferGeometry();
    particlePositions = new Float32Array(maxParticleCount * 3);

    for (var i = 0; i < maxParticleCount; i++) {

        var x = Math.random() * r - r / 2;
        var y = Math.random() * r - r / 2;
        var z = Math.random() * r - r / 2;

        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;

        // add it to the geometry
        particlesData.push({
            velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
            numConnections: 0
        });

    }

    particles.setDrawRange(0, particleCount);
    particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));

    // create the particle system
    // pointCloud = new THREE.Points( particles, pMaterial );
    // group.add( pointCloud );

    var geometry = new THREE.BufferGeometry();

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3).setDynamic(true));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3).setDynamic(true));
    // console.log(colors);
    geometry.computeBoundingSphere();

    geometry.setDrawRange(0, 0);
    // console.log(THREE.VertexColors);

    var material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors,
        blending: THREE.AdditiveBlending,
        transparent: true
    });

    if ($('#create-hole').html() === 'Burrow') {
        material.transparent = false;
        material.color.setHex(0x000000);
    }

    $(document).on('keypress', function(e) {
        if (e.which === 13 && $('#answer-input').val() !== '') {
            setTimeout(() => {
                let body = $('body').attr('data-correct');
                if (body === 'correct') {
                    material.transparent = true;
                    let int = 0;
                    setInterval(() => {
                        material.color = new THREE.Color("rgb(" + int + ", " + int + "," + int + ")");
                        int++;
                    }, 100);
                }
            }, 10);
        }
    });

    $(document).on('click', '#submit-guess', function(e) {
        material.transparent = true;
        let int = 0;
        setInterval(() => {
            material.color = new THREE.Color("rgb(" + int + ", " + int + "," + int + ")");
            int++;
        }, 10);
    });

    // material.color.setHex(0x660000);
    // material.color = new Color( 0x000000 );

    linesMesh = new THREE.LineSegments(geometry, material);

    group.add(linesMesh);

    //

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    container.appendChild(renderer.domElement);
    // container2.appendChild( renderer2.domElement );

    //

    // stats = new Stats();
    // console.log(container);
    // container.appendChild( stats.domElement );

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    var vertexpos = 0;
    var colorpos = 0;
    var numConnected = 0;

    for (var i = 0; i < particleCount; i++)
        particlesData[i].numConnections = 0;

    for (var i = 0; i < particleCount; i++) {

        // get the particle
        var particleData = particlesData[i];

        particlePositions[i * 3] += particleData.velocity.x;
        particlePositions[i * 3 + 1] += particleData.velocity.y;
        particlePositions[i * 3 + 2] += particleData.velocity.z;

        if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf)
            particleData.velocity.y = -particleData.velocity.y;

        if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
            particleData.velocity.x = -particleData.velocity.x;

        if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf)
            particleData.velocity.z = -particleData.velocity.z;

        if (effectController.limitConnections && particleData.numConnections >= effectController.maxConnections)
            continue;

        // Check collision
        for (var j = i + 1; j < particleCount; j++) {

            var particleDataB = particlesData[j];
            if (effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections)
                continue;

            var dx = particlePositions[i * 3] - particlePositions[j * 3];
            var dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
            var dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
            var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < effectController.minDistance) {

                particleData.numConnections++;
                particleDataB.numConnections++;

                var alpha = 1.0 - dist / effectController.minDistance;

                positions[vertexpos++] = particlePositions[i * 3];
                positions[vertexpos++] = particlePositions[i * 3 + 1];
                positions[vertexpos++] = particlePositions[i * 3 + 2];

                positions[vertexpos++] = particlePositions[j * 3];
                positions[vertexpos++] = particlePositions[j * 3 + 1];
                positions[vertexpos++] = particlePositions[j * 3 + 2];

                colors[colorpos++] = alpha;
                // console.log(alpha);
                colors[colorpos++] = alpha;
                colors[colorpos++] = alpha;

                colors[colorpos++] = alpha;
                colors[colorpos++] = alpha;
                colors[colorpos++] = alpha;

                numConnected++;
            }
        }
    }

    // w = new Worker("/js/worker.js");
    //
    // w.onmessage = function(event){
    //
    //     var vertexpos = 0;
    //     var colorpos = 0;
    //     var numConnected = 0;
    //
    //     let data = event.data;
    //     console.log(data);
    //     positions[vertexpos] = data[0]
    //     colors[colorpos] = data[1];
    //     numConnected = data[2];
    //
    //     linesMesh.geometry.setDrawRange(0, numConnected * 2);
    //     linesMesh.geometry.attributes.position.needsUpdate = true;
    //     linesMesh.geometry.attributes.color.needsUpdate = true;
    //
    //     render();
    // };


    linesMesh.geometry.setDrawRange(0, numConnected * 2);
    linesMesh.geometry.attributes.position.needsUpdate = true;
    linesMesh.geometry.attributes.color.needsUpdate = true;

    // pointCloud.geometry.attributes.position.needsUpdate = true;

    requestAnimationFrame(animate);


    // stats.update();
    render();

}

function render() {

    // var time = Date.now() * 0.001;
    //
    // group.rotation.y = time * 0.1;
    renderer.render(scene, camera);

}

// particleCount = 1000;
// linesMesh.scale.set(.1,.1,.1);

// $(document).on('click', function() {
//     let s = 1
//     setInterval(function() {
//         if (particleCount < 1000) {
//             particleCount += 4;
//             s -= .004;
//             linesMesh.scale.set(s, s, s);
//         }
//     }, 1);
// })

let login = false;
$('#login-button').on('click', () => {
    login = true;
});

$(document).on('keypress', function(e) {
    if (e.which == 13 && $('#user-input').val() !== '' && $('body').attr('data-page') === 'login') {
        e.preventDefault();
        let inputData = $('#user-input').val();
        if ( inputData === 'cyan' || inputData === 'yellow' || inputData === 'magenta' || login) {

            let num = 125;
            setTimeout(function() {
                setInterval(function() {
                    num -= 1;
                    if(num > 40 ) {
                        scene.background = new THREE.Color("rgb(" + num + ", " + num + "," + num + ")");
                    }
                }, 1);
            }, 2000);

            let s = 1;
            setInterval(function() {
                if (particleCount < 750) {
                    particleCount += 6;
                    s -= .006;
                    linesMesh.scale.set(s, s, s);
                }
            }, 1);
        }
    }
});

$(document).on('click', 'div#postz', function() {
    setTimeout(function() {
        if ($('#postz').html() == 'enter') {
            $('#login, #postz, #reset').remove();
            let s = 1;
            setInterval(function() {
                if (particleCount > 75) {
                    particleCount -= 50;
                    s += .05;
                    linesMesh.scale.set(s, s, s);
                } else {
                    setTimeout(function() {
                        // let user = $('body').attr('data-user');
                        $('#container').remove();
                        $.get('/home/', function(data) {});
                        window.location.href = "/home/";
                    }, 2000);
                }
            }, 1);
        }
    }, 250);
});

//home

if ($('#create-hole').html() === 'Burrow') {
    particleCount = 0;
    // let s = 1;
    setTimeout(function() {
        setInterval(function() {
            if (particleCount < 150) {
                particleCount += 1;
                // s -= .05;
                // linesMesh.scale.set(s, s, s);
            }
        }, 1);
    }, 500);


    let num = 40;
    setTimeout(function() {
        setInterval(function() {
            num += 1;
            if(num < 160 ) {
                scene.background = new THREE.Color("rgb(" + num + ", " + num + "," + num + ")");
            }
        }, 5);
    }, 750);
}

$('.portals').on('click', function() {
    let s = 1;
    setInterval(function() {
        if (particleCount < 750) {
            particleCount += 6;
            s -= .0075;
            // s -= .0075;
            linesMesh.scale.set(s, s, s);
        }
    }, 10);
//this animation is for right answer
    let correctAnswer = () => {
        setTimeout(() => {
            let body = $('body').attr('data-correct');
            if (body === 'correct') {
                setTimeout(function() {
                    setInterval(function() {
                        if (particleCount > 50) {
                            particleCount -= 5;
                            s += .01;
                            // s -= .0075;
                            linesMesh.scale.set(s, s, s);
                        }
                    }, 1);
                }, 2100);
            }
        }, 10);
    }

    $(document).on('keypress', function(e) {
        if (e.which === 13 && $('#answer-input').val() !== '') {
            correctAnswer();
        }
    });

    $(document).on('click', '#submit-guess', function(e) {
        correctAnswer();
    });

});

//create burrow

$('#create-hole').on('click', function() {
    let s = 1;
    setInterval(function() {
        if (particleCount < 350) {
            particleCount += 1;
            s -= .005;
            linesMesh.scale.set(s, s, s);
        }
    }, 1);

    let num = 125;
    setInterval(function() {
        num += 1;
        if(num < 256 ) {
            scene.background = new THREE.Color("rgb(" + num + ", " + num + "," + num + ")");
        }
    }, 1);
})
