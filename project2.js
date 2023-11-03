import { App } from "./renderImages.js";
import { imagePopup } from "./imagePopup.js";

imagePopup();
const project2 = new App("imagesCompress-2");
project2.loadImagesMobile(30);
project2.loadImagesPad(30);
project2.loadImagesComp(20);
project2.revealNavMenu();
