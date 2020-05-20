import { Particle } from './particle';
import { Utils } from './util';

(() => {

    window.addEventListener('load', function () {
        init();
        render();
    })

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        init();
    }

    const offscreencanvas = document.createElement('canvas'),
        offscreenctx = offscreencanvas.getContext('2d'),
        canvas = document.querySelector('#canvas'),
        ctx = canvas.getContext('2d');

    let amount = 0, particles = [];

    function init() {

        // RequestAnimationFrame
        (function () {
            const requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;
        })();

        const WIDTH = window.innerWidth;
        const HEIGHT = window.innerHeight;

        offscreencanvas.width = WIDTH;
        offscreencanvas.height = HEIGHT;

        offscreenctx.drawImage('../dist/images/img.png', WIDTH / 2, HEIGHT / 2);
        const imgData = offscreenctx.getImageData(0, 0, WIDTH, HEIGHT).data;

        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        const skip = 150;
        for (let x = 0; x < WIDTH; x += Math.round(WIDTH / skip)) {
            for (let y = 0; y < HEIGHT; y += Math.round(WIDTH / skip)) {
                if (imgData[((x + y * WIDTH) * 4) + 3] > skip) {
                    particles.push(new Particle(x, y));
                }
            }
        }
        amount = particles.length;
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < amount; i++) {
            let p = particles[i];
            p.update();
            p.draw();
        }
        requestAnimationFrame(render);
    }
})();