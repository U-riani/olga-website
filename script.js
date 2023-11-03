import { App } from "./renderImages.js";
import { imagePopup } from "./imagePopup.js";


imagePopup();
const mainPage = new App('images');
mainPage.loadImagesMobile(30);
mainPage.loadImagesPad(40);
mainPage.loadImagesComp(36);
mainPage.revealNavMenu();