import "./assets/styles/main.css";

import { renderer } from "./app/game";
import { Momo } from "./app/game";

let momoDog = new Momo();
renderer(momoDog);
