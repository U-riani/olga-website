const body = document.querySelector("body");
const pageWidth = body.getBoundingClientRect().width;
const photoContainer = document.querySelectorAll(".photo-container");
const footer = document.querySelector("footer");
let counter = 0;

export class App {
  constructor(imagesFile) {
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
    const globalClass = this;

    // const img = new Image();
    // img.src = imgPath;
    // img.onload = function() {
    //   globalClass.removeStarterTitle();
    //   imagePlaceholder.append(img);
    // }
    return new Promise(function (resolve, reject) {
      const img = document.createElement("img");
      img.src = imgPath;

      img.addEventListener("load", function () {
        globalClass.removeStarterTitle();
        imagePlaceholder.append(img);
        resolve(img);
      });

      img.addEventListener("load", function () {
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

  createMobPhotosContainer(counter = 0) {
    for (let i = counter + 1; i <= counter + 10; i++) {
      this.createElem("div", `.mobile-container`, `image-placeholder`, `${i}`);
    }
    const containersArr = document.querySelectorAll(".image-placeholder");
    containersArr.forEach((el, i) => {
      el.classList.add(`image-placeholder--${i + 1}`);
    });
  }

  //create div containers and add class for pad and compiuter
  createDivContainersForImg(
    num,
    columnName,
    counter,
    starterI = 10,
    increaseI = 2
  ) {
    for (let i = counter + num; i <= counter + starterI; i += increaseI) {
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

  loadImagesMobile(maxPhotos) {
    if (pageWidth <= 700) {
      // create main div container for mob version
      this.createElem("div", ".photo-container", "mobile-container", 0);

      // create containers for each images for mobile
      this.createMobPhotosContainer();

      // load photos in each images container for first 10 images
      this.loadImages();

      // intersectionObserver for load images
      const obsCallback = (entries, observer) => {
        const [entry] = entries;

        if (!entry.isIntersecting) return;

        counter += 10;
        this.createMobPhotosContainer(counter);

        this.loadImages();

        if (counter >= maxPhotos) {
          loadMoreObserver.unobserve(footer);
        }
      };

      const obsOptions = {
        root: null,
        threshold: 0.9,
      };

      const loadMoreObserver = new IntersectionObserver(
        obsCallback,
        obsOptions
      );

      loadMoreObserver.observe(footer);
    }
  }

  loadImagesTest(counter = 0, maxI = 10) {
    for (let i = counter + 1; i <= counter + maxI; i++) {
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

  loadImagesPad(maxPhotos) {
    if (pageWidth > 700 && pageWidth < 1000) {
      // create column containers
      this.createElem("div", ".photo-container", "pad-container", "0");

      // create 2 columns
      this.createElem("div", ".pad-container", "column--1", "1");
      this.createElem("div", ".pad-container", "column--2", "2");

      //create photo conatiners in column 1 and column 2
      this.createDivContainersForImg(1, "column--1", 0);
      this.createDivContainersForImg(2, "column--2", 0);

      this.loadImagesTest();

      // Intersecting observer for load more photos
      const obsPadObs = (entries, observer) => {
        const [entry] = entries;

        if (!entry.isIntersecting) return;

        counter += 10;
        this.createDivContainersForImg(1, "column--1", counter);
        this.createDivContainersForImg(2, "column--2", counter);

        this.loadImagesTest(counter);

        if (counter >= maxPhotos) {
          padObserver.unobserve(footer);
        }
      };

      const obsOpt = {
        root: null,
        threshold: 0.5,
      };

      const padObserver = new IntersectionObserver(obsPadObs, obsOpt);
      padObserver.observe(footer);
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
      this.createDivContainersForImg(1, "column--1", 0, 12, 3);
      this.createDivContainersForImg(2, "column--2", 0, 12, 3);
      this.createDivContainersForImg(3, "column--3", 0, 12, 3);

      this.loadImagesTest(0, 12);

      // Intersecting observer for load more photos
      const obsComp = (entries, observer) => {
        const [entry] = entries;

        if (!entry.isIntersecting) return;

        counter += 12;
        this.createDivContainersForImg(1, "column--1", counter, 12, 3);
        this.createDivContainersForImg(2, "column--2", counter, 12, 3);
        this.createDivContainersForImg(3, "column--3", counter, 12, 3);

        this.loadImagesTest(counter, 12);

        if (counter >= maxPhotos) {
          compObserver.unobserve(footer);
        }
      };

      const obsOpt = {
        root: null,
        threshold: 0.5,
      };

      const compObserver = new IntersectionObserver(obsComp, obsOpt);
      compObserver.observe(footer);
    }
  }
}

// const app = new App();