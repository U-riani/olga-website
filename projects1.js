import { App } from "./renderImages.js";
import { imagePopup } from "./imagePopup.js";

imagePopup();
const project1 = new App('project-1');
project1.loadImagesMobile(15);
project1.loadImagesPad(15);
project1.loadImagesComp(15);
project1.revealNavMenu();