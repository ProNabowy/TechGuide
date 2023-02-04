const  canvasStyle = () =>
{
    const parent = document.querySelector("#canvas-parent");
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const maxDepth = 40;
    const particleAmount = 700;

    let speed = 0.09; //default value
    let maxDistributionX;
    let maxDistributionY;
    canvas.width = parent.clientWidth;


    // add size When Window Scroll

    const window_scrolling = () =>
    {
        window.addEventListener("scroll", () =>
        {
            if(window.scrollY < 10)
            {
                speed = 0.09;
            }
            speed += 0.09;
        });
    }
    
    window_scrolling();

    const particles = new Array(particleAmount);

    const setWindowRelatedProperties = () => {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        maxDistributionX = window.innerWidth / 8;
        maxDistributionY = window.innerHeight / 4;
    };

    setWindowRelatedProperties();

    window.addEventListener('resize', setWindowRelatedProperties);

    context.fillStyle = 'rgb(4,16,49)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    const placeParticles = () => {
        for (let i = 0; i < particles.length; i += 1) {
            particles[i] = {
                x: random(-maxDistributionX, maxDistributionX),
                y: random(-maxDistributionY, maxDistributionY),
                z: random(1, maxDepth),
            };
        }
    };

    const moveParticles = () => {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // .3 or .5 looks good, 1 for no shade
        context.fillStyle = '#0E1525';
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i += 1) {
            particles[i].z -= speed;

            if (particles[i].z <= 0) {
                particles[i].x = random(-maxDistributionX, maxDistributionX);
                particles[i].y = random(-maxDistributionY, maxDistributionY);
                particles[i].z = maxDepth;
            }

            const k = 100 / particles[i].z;
            const newX = particles[i].x * k + centerX;
            const newY = particles[i].y * k + centerY;

            if (newX >= 0 && newX <= canvas.clientWidth && newY >= 0 && newY <= canvas.clientHeight) {
                const size = (1 - particles[i].z / maxDepth) * 35;
                context.beginPath();
                context.fillStyle = 'white';
                context.arc(newX, newY, size / 2, 0, Math.PI * 2, false);
                context.closePath();
                context.fill();
            }
        }

        window.requestAnimationFrame(moveParticles);
    };

    placeParticles();
    window.requestAnimationFrame(moveParticles);

}
canvasStyle();