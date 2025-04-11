let score=1
let tree=document.getElementById('tree')
let deer=document.getElementsByClassName('deer')

document.addEventListener('DOMContentLoaded', function() {
    const bottles = document.querySelectorAll('.bottle');
    const bin = document.getElementById('bin');

    bottles.forEach(bottle => {
        let isDragging = false;
        let offsetX, offsetY;

        bottle.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - bottle.getBoundingClientRect().left;
            offsetY = e.clientY - bottle.getBoundingClientRect().top;
            bottle.style.cursor = 'grabbing';
            bottle.style.zIndex = '1000';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;

            bottle.style.left = `${x}px`;
            bottle.style.top = `${y}px`;

            // Check collision with bin
            const bottleRect = bottle.getBoundingClientRect();
            const binRect = bin.getBoundingClientRect();

            if (isColliding(bottleRect, binRect)) {
                bin.style.height = '20%';
                bin.style.width = '17%';
            } else {
                bin.style.height = '18%';
                bin.style.width = '15';
            }
        });

        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            bottle.style.cursor = 'grab';
            bottle.style.zIndex = '3';

            // Check if dropped over bin
            const bottleRect = bottle.getBoundingClientRect();
            const binRect = bin.getBoundingClientRect();

            if (isColliding(bottleRect, binRect)) {
                bottle.style.display = 'none'; // Hide the bottle
                score++
                if (score<6) {
                    tree.style.backgroundImage = 'url("public/images/tree-stage' + score + '.png")'
                }
                else {
                    deer[0].style.display = 'flex'
                    deer[1].style.display = 'flex'
                }
                bin.style.height = '18%';
                bin.style.width = '15'

            }

        });
    });

    // Helper function for collision detection
    function isColliding(rect1, rect2) {
        return !(rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom);
    }
});