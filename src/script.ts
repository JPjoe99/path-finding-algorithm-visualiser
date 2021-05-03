import { Grid } from "./Grid";
import { Application } from "./Application";

let grid: Grid = new Grid(45,20);

let app: Application = new Application(grid);

app.startApplication();