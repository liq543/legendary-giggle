let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let currentPos = 0;


document.addEventListener('keydown', function(e) {
    if (e.code === konamiCode[currentPos]) {
        currentPos++;
        if (currentPos === konamiCode.length) {
            triggerExplosion();
            currentPos = 0;
        }
        conso
    } else {
        currentPos = 0;
    }
});

function triggerExplosion() {
    let imgSrc = "./images/god.png"; // Modify with your image path

    for (let i = 0; i < 100; i++) { // create 100 images
        let img = new Image();
        img.src = imgSrc;
        img.style.position = 'fixed';
        img.style.left = Math.random() * window.innerWidth + 'px';
        img.style.top = Math.random() * window.innerHeight + 'px';
        img.style.transform = `scale(${Math.random() + 0.5})`;
        img.style.transition = 'all 2s ease-out';
        img.style.opacity = 0;

        document.body.appendChild(img);

        requestAnimationFrame(() => {
            img.style.opacity = 1;
            img.style.transform = `scale(${Math.random() * 2 + 1}) translate(${Math.random() * 50 - 25}vw, ${Math.random() * 50 - 25}vh)`;
        });

        // remove the image after animation completes
        setTimeout(() => {
            img.style.opacity = 0;
            setTimeout(() => {
                document.body.removeChild(img);
            }, 2000);
        }, 2000);
    }
}
