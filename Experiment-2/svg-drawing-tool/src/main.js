const svg = document.getElementById("canvas");
const countDisplay = document.getElementById("count");
const undoBtn = document.getElementById("undoBtn");

let circles = [];

// Draw circle on click
svg.addEventListener("click", (event) => {
  const rect = svg.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", 10);
  circle.setAttribute("fill", "blue");

  svg.appendChild(circle);
  circles.push(circle);

  countDisplay.textContent = circles.length;
});

// Undo functionality
undoBtn.addEventListener("click", () => {
  if (circles.length > 0) {
    const lastCircle = circles.pop();
    svg.removeChild(lastCircle);
    countDisplay.textContent = circles.length;
  }
});

