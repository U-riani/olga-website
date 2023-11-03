export const imagePopup = function () {
  const openImage = document.querySelector(".open-image");

  document.querySelector("body").addEventListener("click", function (e) {
    if (e.target.src) {
      if (openImage.childNodes[0]) {
        openImage.childNodes[0].remove();
      }
      const src = e.target.getAttribute("src");

      document
        .querySelector(".section--1")
        .classList.toggle("make-section-blur");
      openImage.classList.toggle("hide");

      // create image and add class
      const openImagePromise = function () {
        return new Promise(function (resolve, reject) {
          const img = document.createElement("img");
          img.src = src;
          img.classList.add("style-open-image");

          img.addEventListener("load", function () {
            openImage.append(img);
            resolve(img);
          });

          img.addEventListener("load", function () {
            reject(new Error("image not found"));
          });
        });
      };
      openImagePromise();
    }
  });
};
