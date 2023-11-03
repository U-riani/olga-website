import { App } from "./renderImages.js";
import { imagePopup } from "./imagePopup.js";

imagePopup();
const project1 = new App('imagesCompress-1');
project1.loadImagesMobile(0);
project1.loadImagesPad(0);
project1.loadImagesComp(0);
project1.revealNavMenu();