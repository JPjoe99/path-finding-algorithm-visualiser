import { Grid } from "./Grid";
import { Application } from "./Application";

let mainBody = document.getElementById("content");
console.log(mainBody);

var scale = Math.min( 
    screen.availWidth / mainBody.clientWidth, 
    screen.availHeight / mainBody.clientHeight 
);

mainBody.style.transform = `scale(${scale})`;

console.log(scale);

let grid: Grid = new Grid(37,21);

let app: Application = new Application(grid);

app.startApplication();