//gets the window width
let windows = {
  width: document.documentElement.clientWidth,
};

//gets a element by id
const spin = document.getElementById("front");

let ang = 0;
let angStart = 0;
let isStart = false;

//gets the the mouse x and y
const angXY = (e) => {
  const bcr = spin.getBoundingClientRect();
  const radius = bcr.width / 2;
  const { clientX, clientY } = e.touches ? e.touches[0] : e;
  const y = clientY - bcr.top - radius;
  const x = clientX - bcr.left - radius;
  /* returns the angle in radians */
  return Math.atan2(y, x);
};

/* set the start to true and sets the angle */
const mouseDown = (e) => {
  isStart = true;
  angStart = angXY(e) - ang;
};

/* rotate when you move */
const mouseMove = (e) => {
  if (!isStart) return;
  /* preventDefault is used so the browser does not do what it normally wouid  */
  e.preventDefault();
  ang = angXY(e) - angStart;
  spin.style.transform = `rotate(${ang}rad)`;
};

/* sets start to false when you remove you'r finger or stops holding the mouse down */
const mouseUp = (e) => {
  isStart = false;
};

/* if windows width is over 768 use the mouse else use touch */
if (windows.width > 768) {
  spin.addEventListener("mousedown", mouseDown);
  spin.addEventListener("mousemove", mouseMove);
  spin.addEventListener("mouseup", mouseUp);
} else {
  spin.addEventListener("touchstart", mouseDown);
  spin.addEventListener("touchmove", mouseMove);
  spin.addEventListener("touchend", mouseUp);
}
