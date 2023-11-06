const body = document.querySelector("body");
const pageWidth = body.getBoundingClientRect().width;
const photoContainer = document.querySelectorAll(".photo-container");
const footer = document.querySelector("footer");
let counter = 0;

export class App {
  constructor(imagesFile, project1, project2, project3) {
    this.imagesFile = imagesFile;

    // this.loadImagesMobile();
    // this.loadImagesPad();
    // this.loadImagesComp();
    // this.revealNavMenu();
  }

  mutationObserver() {
    const targetNode = document.querySelector('.photo-container');
    const observer = new MutationObserver((mutationList, observer) => {
      for(const mutation of mutationList) {
        const addedNode = mutation.addedNodes[0];
        this.removeStarterTitle();
      }
    })
    const config = {childList: true};
    observer.observe(targetNode, config);
  }

  // Create photos
  createPhotos(imagePlaceholder, imgPath) {
    // const img = new Image();
    // img.src = imgPath;
    // imagePlaceholder.append(img);
    // img.onload = ()=> {

    //   return img
    // }

    const globalClass = this;
    return new Promise(function (resolve, reject) {
      const img = document.createElement("img");
      img.src = imgPath;

      img.addEventListener("load", function () {
        globalClass.removeStarterTitle();
        imagePlaceholder.append(img);
        resolve(img);
      });

      img.addEventListener("error", function () {
        reject(new Error("image not found"));
      });
    });
  }

  // Load images in first 10 containers
  loadImages() {
    const mobVersCont = document.querySelectorAll(".image-placeholder");
    mobVersCont.forEach(async (elem, i) => {
      if (elem.childNodes.length > 0) return;
      await this.createPhotos(elem, `/${this.imagesFile}/${i + 1}.jpg`);
    });
  }

  createMobPhotosContainer() {
    for (let i = counter + 1; i <= 10; i++) {
      this.createElem("div", `.mobile-container`, `image-placeholder`, `${i}`);
    }
    const containersArr = document.querySelectorAll(".image-placeholder");
    containersArr.forEach((el, i) => {
      el.classList.add(`image-placeholder--${i + 1}`);
    });
  }

  //create div containers and add class for pad and compiuter
  createDivContainersForImg(
    columnName,
    increaseI = 2,
    starterI = 1
  ) {
    for (let i = starterI; i <= 10; i += increaseI) {
      this.createElem(
        "div",
        `.${columnName}`,
        `column-placeholder-${i}`,
        `${i}`
      );
      document
        .querySelector(`.column-placeholder-${i}`)
        .classList.add("column-placeholder");
    }
  }

  // When images load remove starter title
  removeStarterTitle() {
    document.querySelector('.photo-container').classList.remove('starter-photo-container');
    if(document.querySelector('.starter-title')) {
      document.querySelector('.starter-title').remove();
    }
  }

  revealNavMenu() {
    const header = document.querySelector("header");

    const obsCall = function (entries, observer) {
      const [entry] = entries;

      let prevScroll = window.pageYOffset;

      window.addEventListener("scroll", () => {
        let currentScroll = window.pageYOffset;
        if (prevScroll > currentScroll && !entry.isIntersecting) {
          document.querySelector(".nav-logo-container").classList.add("show");
        } else {
          document
            .querySelector(".nav-logo-container")
            .classList.remove("show");
        }

        prevScroll = currentScroll;
      });
    };

    const obsOpt = {
      root: null,
      threshold: 0,
    };

    const headerObs = new IntersectionObserver(obsCall, obsOpt);
    headerObs.observe(header);
  }

  loadImagesMobile() {
    if (pageWidth <= 700) {
      // create main div container for mob version
      this.createElem("div", ".photo-container", "mobile-container", 0);

      // create containers for each images for mobile
      this.createMobPhotosContainer();

      // load photos in each images container for first 10 images
      this.loadImages();
    }
  }

  loadImagesTest() {
    for (let i = 1; i <= 10; i++) {
      this.createPhotos(
        document.querySelector(`.column-placeholder-${i}`),
        `${this.imagesFile}/${i}.jpg`
      );
    }
  }

  createElem(type, parentElem, className, data) {
    const newElem = document.createElement(type);
    document.querySelector(parentElem).appendChild(newElem);
    newElem.classList.add(className);
    newElem.dataset.num = data;
  }

  loadImagesPad() {
    if (pageWidth > 700 && pageWidth < 1000) {
      // create column containers
      this.createElem("div", ".photo-container", "pad-container", "0");

      // create 2 columns
      this.createElem("div", ".pad-container", "column--1", "1");
      this.createElem("div", ".pad-container", "column--2", "2");

      //create photo conatiners in column 1 and column 2
      this.createDivContainersForImg("column--1", 2, 1);
      this.createDivContainersForImg("column--2", 2, 2);

      this.loadImagesTest();
    }
  }

  loadImagesComp(maxPhotos) {
    if (pageWidth >= 1000) {
      // this.mutationObserver()
      // Creat comp version container
      this.createElem("div", ".photo-container", "comp-container", 0);

      // Create 3 colomuns
      this.createElem("div", ".comp-container", "column--1", 0.1);
      this.createElem("div", ".comp-container", "column--2", 0.2);
      this.createElem("div", ".comp-container", "column--3", 0.3);

      // Create photo containers in columns
      this.createDivContainersForImg("column--1", 3, 1);
      this.createDivContainersForImg("column--2", 3, 2);
      this.createDivContainersForImg("column--3", 3, 3);

      this.loadImagesTest(0, 12);

    }
  }
}

// const app = new App();
