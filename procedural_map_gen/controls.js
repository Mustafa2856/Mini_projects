const canvas = document.getElementById("canvas");
const g = canvas.getContext("2d");

const draw = () => {
	g.fillStyle = "black";
	g.fillRect(0,0,canvas.width,canvas.height);
}

draw();
