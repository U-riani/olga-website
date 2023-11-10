import {App} from './renderImages.js';
const projectsPage = new App(`main`);

document.querySelectorAll('.photo-container').forEach(function(el, i) {
    projectsPage.createPhotos(el, `projects/${i + 1}.jpg`);
})