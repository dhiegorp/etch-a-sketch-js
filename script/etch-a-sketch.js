

const STROKE_SIZE = 10;
const MOVE_AMOUNT = 10;
const canvas = document.querySelector('#etch-a-sketch');
const context = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');


const { width, height } = canvas;

/* randomize from 0 until num-1 */
const randomize = num => Math.floor(Math.random() * num);

/* randomize cursor color */
const HUElette = (saturation = '100%', luminance = '50%') => context.strokeStyle = `hsl(${randomize(361)}, ${saturation}, ${luminance})`;


/* randomizing coordinates for the cursor */
let x = randomize(width);
let y = randomize(height);

/* initiate a canvas context and start a randomly positioned cursor */
const init = context => {
    HUElette();
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = STROKE_SIZE;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y);
    context.stroke();
}

/* draws a line given a arrow key to set position */
const draw = options => {
    context.beginPath();
    context.moveTo(x, y);
    handlePosition(options);
    context.lineTo(x, y);
    HUElette();
    context.stroke();
}

/* handle cursor position based on pressed keys */
const handlePosition = (options) => {
    handlePositionArrowUp(options);
    handlePositionArrowDown(options);
    handlePositionArrowLeft(options);
    handlePositionArrowRight(options);
}

/* handle cursor position in case of an arrow up key detected*/
const handlePositionArrowUp = ({ key }) => {
    if (key === 'ArrowUp') {
        y -= MOVE_AMOUNT;
    }
}

/* handle cursor position in case of an arrow down key detected */
const handlePositionArrowDown = ({ key }) => {
    if (key === 'ArrowDown') {
        y += MOVE_AMOUNT;
    }
}

/* handle cursor position in case of an arrow left key detected */
const handlePositionArrowLeft = ({ key }) => {
    if (key === 'ArrowLeft') {
        x -= MOVE_AMOUNT;
    }
}

/* handle cursor position in case of an arrow right key detected */
const handlePositionArrowRight = ({ key }) => {
    if (key === 'ArrowRight') {
        x += MOVE_AMOUNT;
    }
}


/* if a valid key is pressed, draw to the correct direction */
function handleKey(event) {
    if (event.key.includes('Arrow')) {
        event.preventDefault();
        draw({ key: event.key })
    }
}


/* clear the canvas */
const clearScreen = () => {
    canvas.classList.add('shake');
    context.clearRect(0, 0, width, height);
    canvas.addEventListener('animationend', () => {
        canvas.classList.remove('shake');
    },
        { once: true }
    );

}

/* handle the 'shake'button */
const handleShakeButton = () => {
    clearScreen();
    x = randomize(width);
    y = randomize(height);
    init(context);

}

shakeButton.addEventListener(`click`, handleShakeButton);

/*listen for keyboard input*/
window.addEventListener('keydown', handleKey);


/*initiate etch-a-sketch*/
init(context);

