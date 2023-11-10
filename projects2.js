import { App } from "./renderImages.js";
import { imagePopup } from "./imagePopup.js";

imagePopup();
const project1 = new App('project-2');

project1.loadImagesMobile();
project1.loadImagesPad();
project1.loadImagesComp();
project1.revealNavMenu();