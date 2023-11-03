import { App } from "./renderImages.js";
import { imagePopup } from "./imagePopup.js";

imagePopup();
const project3 = new App("imagesCompress-3");
project3.loadImagesMobile(30);
project3.loadImagesPad(30);
project3.loadImagesComp(20);
project3.revealNavMenu();
