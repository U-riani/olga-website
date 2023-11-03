import {App} from './renderImages.js';
const projectsPage = new App();

document.querySelectorAll('.photo-container').forEach(function(el, i) {
    projectsPage.createPhotos(el, `/images/${i + 1}.jpg`);
})

document.querySelectorAll('.projects').forEach(function(e) {
    e.addEventListener('click', function() {
        
    })
})