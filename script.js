import {App} from './renderImages.js';
const projectsPage = new App(`main`);

document.querySelectorAll('.photo-container').forEach(function(el, i) {
    projectsPage.createPhotos(el, `main/${i + 1}.jpg`);
})

document.querySelectorAll('.projects').forEach(function(e) {
    e.addEventListener('click', function() {
        
    })
})