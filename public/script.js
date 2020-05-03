let indieFlower = document.getElementById("fontOne");
let dancingScript = document.getElementById("fontTwo");
let longCang = document.getElementById("fontThree");
let homemadeApple = document.getElementById("fontFour");
let allFonts = document.querySelectorAll(".font");

let imgLabel = document.getElementById("imgLabel");

let colorOne = document.getElementById("colorOne");
let colorTwo = document.getElementById("colorTwo");
let colorThree = document.getElementById("colorThree");
let colorFour = document.getElementById("colorFour");
let colorFive = document.getElementById("colorFive");
let colorSix = document.getElementById("colorSix");
let colorSeven = document.getElementById("colorSeven");
let colorEight = document.getElementById("colorEight");
let colorNine = document.getElementById("colorNine");
let allColors = document.querySelectorAll(".color");
let changeBackgroundColor = document.getElementById("postcardToDisplay");
let writtenMessage = document.getElementById("writtenMessage");

let inpFile = document.getElementById("fileChooser");
let img = document.getElementById("serverImage");
let controls = document.getElementById("controls");
let imgContainer = document.getElementById("imageSelectorWrapper");

let replaceImageBox = document.getElementById("replaceImageBox");
let replaceImageContainer = document.getElementById("replaceImageContainer");
let repFile = document.getElementById("replaceFileChooser");
let replaceAndImageWrap = document.getElementById("imageAndReplaceWrap");

let changeWidth = document.querySelectorAll(".changeWidth");
let message = document.getElementById("message");
let messageBox = document.querySelectorAll(".messageBox");

let sharePostcardBox = document.getElementById("sharePostcardBox");
let currFileName = "";
let currMessage = "";
let currFont = "Indie Flower";
let currColor = "#e6e2cf";

// console.log(messageBox[0].style.paddingTop);


// ---FONT SWITCHER ---
let previous = 0;
let fontDictOn = ["fontOneOn", "fontTwoOn", "fontThreeOn", "fontFourOn"];
let fontDictOff = ["fontOneOff", "fontTwoOff", "fontThreeOff", "fontFourOff"];

// ---Color Switch ---
let prevColor = 0;
let colorChoices = ["#e6e2cf", "#dbcaac", "#c9cbb3", "#bbc9ca", "#a6a5b5", "#b5a6ab", "#eccfcf", "#eceeeb", "#bab9b5" ];

let imgSize;

function start(){
  //fonts
  indieFlower.classList.add("fontOneOn");
  dancingScript.classList.add("fontTwoOff");
  longCang.classList.add("fontThreeOff");
  homemadeApple.classList.add("fontFourOff");

  //colors
  allColors[0].style.borderStyle = "solid";
  allColors[0].style.borderWidth = "thin";

}

img.addEventListener("load", e => {
  imgLabel.textContent = "Uploading...";
});

// -------------- IMAGE FILE CHOOSER HERE ---------------
inpFile.addEventListener("change", function() {
  const file = this.files[0];
  uploadImage(file);
  currFileName = file.name;




  if (file) {
    const reader = new FileReader();

    //Choose Image text, and all other pieces of that
    controls.style.display = "none";
    img.style.display = "block";


    //find dimensions
    reader.onload = (function(file) {
      var image = new Image();
      image.src = file.target.result;



      image.onload = function () {


        if (this.width > this.height) {
          imgSize = "wide";
          changeBackgroundColor.style.height = "55vh";

          if (document.documentElement.clientWidth <= 600) {
            //MOBILE
            changeBackgroundColor.style.height = "70vh";

            replaceAndImageWrap.style.paddingBottom = "60px";
            message.style.paddingTop = "1vh";
            replaceAndImageWrap.style.height = "55%";

            //border line
            message.style.borderTop = "thin";
            message.style.borderStyle = "solid";
            message.style.marginTop = "15px";


          } else {
            imgContainer.style.height = "60%";
          }
        } else {
          imgSize = "tall";
          changeBackgroundColor.style.height = "80vh";

          if (document.documentElement.clientWidth <= 600) {
            //MOBILE
            replaceAndImageWrap.style.paddingBottom = "60px";
            message.style.marginTop = "1vh";
            messageBox[0].style.paddingTop = "0px";
            replaceAndImageWrap.style.height = "65%";

            //border line
            message.style.borderTop = "thin";
            message.style.borderStyle = "solid";
            message.style.marginTop = "15px";



          } else {
            imgContainer.style.height = "85%";
          }
        }
      }
    });


    //set img src
    reader.addEventListener("load", function() {

      img.setAttribute("src", this.result);

    });

    reader.readAsDataURL(file);

    //fix styling Desktop
    imgContainer.style.borderStyle = 'none';
    replaceImageContainer.style.display = 'flex';
    replaceAndImageWrap.style.marginRight = "0px";
    replaceAndImageWrap.style.marginTop = "0px";



  } else {

    controls.style.display = null;
    img.style.display = null;
    img.setAttribute("src", "");
  }
});

repFile.addEventListener("change", function() {
  const file = this.files[0];
  currFileName = file.name;

  uploadImage(file);

  if (file) {
    const reader = new FileReader();

    controls.style.display = "none";
    img.style.display = "block";

    //find dimensions
    reader.onload = (function(file) {
      var image = new Image();
      image.src = file.target.result;

      image.onload = function () {


        if (this.width > this.height) {
          imgSize = "wide";
          changeBackgroundColor.style.height = "55vh";

          if (document.documentElement.clientWidth <= 600) {
            //MOBILE
            changeBackgroundColor.style.height = "70vh";

            replaceAndImageWrap.style.paddingBottom = "60px";
            message.style.paddingTop = "1vh";
            replaceAndImageWrap.style.height = "55%";

            //border line
            message.style.borderTop = "thin";
            message.style.borderStyle = "solid";
            message.style.marginTop = "15px";


          } else {
            imgContainer.style.height = "60%";
          }
        } else {
          imgSize = "tall";
          changeBackgroundColor.style.height = "80vh";

          if (document.documentElement.clientWidth <= 600) {
            //MOBILE
            replaceAndImageWrap.style.paddingBottom = "60px";
            message.style.marginTop = "1vh";
            messageBox[0].style.paddingTop = "0px";
            replaceAndImageWrap.style.height = "65%";

            //border line
            message.style.borderTop = "thin";
            message.style.borderStyle = "solid";
            message.style.marginTop = "15px";
          } else {
            imgContainer.style.height = "85%";
          }
        }
      }
    });




    reader.addEventListener("load", function() {
      img.setAttribute("src", this.result);
    });

    reader.readAsDataURL(file);

    imgContainer.style.borderStyle = 'none';
    replaceImageContainer.style.display = 'flex';
  }
});










//----FONTS START HERE --------------
indieFlower.addEventListener("click", () => {
  allFonts[previous].classList.remove(fontDictOn[previous]);
  allFonts[previous].classList.add(fontDictOff[previous]);

  writtenMessage.style.fontFamily = "Indie Flower";
  currFont = "Indie Flower";
  previous = 0;

  allFonts[previous].classList.remove(fontDictOff[previous]);
  indieFlower.classList.add(fontDictOn[previous]);
});


dancingScript.addEventListener("click", () => {
  allFonts[previous].classList.remove(fontDictOn[previous]);
  allFonts[previous].classList.add(fontDictOff[previous]);

  writtenMessage.style.fontFamily = "Dancing Script";
  currFont = "Dancing Script";
  previous = 1;

  allFonts[previous].classList.remove(fontDictOff[previous]);
  dancingScript.classList.add(fontDictOn[previous]);
});


longCang.addEventListener("click", () => {
  allFonts[previous].classList.remove(fontDictOn[previous]);
  allFonts[previous].classList.add(fontDictOff[previous]);

  writtenMessage.style.fontFamily = "Long Cang";
  currFont = "Long Cang";
  previous = 2;

  allFonts[previous].classList.remove(fontDictOff[previous]);
  longCang.classList.toggle(fontDictOn[previous]);
});


homemadeApple.addEventListener("click", () => {
  allFonts[previous].classList.remove(fontDictOn[previous]);
  allFonts[previous].classList.add(fontDictOff[previous]);

  writtenMessage.style.fontFamily = "Homemade Apple";
  currFont = "Homemade Apple";
  previous = 3;

  allFonts[previous].classList.remove(fontDictOff[previous]);
  homemadeApple.classList.toggle(fontDictOn[previous]);
});

// ---COLOR SWITCHER ---

//-------- CLICK COLOR -------------

for(let c = 0; c < allColors.length; c++) {
  allColors[c].addEventListener('click', () => {
    selectColor(c);
  });
}


//prevColor
function selectColor(newColor) {
  allColors[prevColor].style.borderStyle = "";
  allColors[prevColor].style.borderWidth = "";

  allColors[newColor].style.borderStyle = "solid";
  allColors[newColor].style.borderWidth = "thin";

  changeBackgroundColor.style.backgroundColor = colorChoices[newColor];
  writtenMessage.style.backgroundColor = colorChoices[newColor];

  currColor = colorChoices[newColor];

  prevColor = newColor;


}

//-------- MOUSE OVER COLOR -------------


colorOne.addEventListener("mouseover", () => {
  colorOne.style.borderStyle = "dashed";
  colorOne.style.borderWidth = "thin";
});

colorTwo.addEventListener("mouseover", () => {
  colorTwo.style.borderStyle = "dashed";
  colorTwo.style.borderWidth = "thin";
});

colorThree.addEventListener("mouseover", () => {
  colorThree.style.borderStyle = "dashed";
  colorThree.style.borderWidth = "thin";
});

colorFour.addEventListener("mouseover", () => {
  colorFour.style.borderStyle = "dashed";
  colorFour.style.borderWidth = "thin";
});

colorFive.addEventListener("mouseover", () => {
  colorFive.style.borderStyle = "dashed";
  colorFive.style.borderWidth = "thin";
});

colorSix.addEventListener("mouseover", () => {
  colorSix.style.borderStyle = "dashed";
  colorSix.style.borderWidth = "thin";
});

colorSeven.addEventListener("mouseover", () => {
  colorSeven.style.borderStyle = "dashed";
  colorSeven.style.borderWidth = "thin";
});

colorEight.addEventListener("mouseover", () => {
  colorEight.style.borderStyle = "dashed";
  colorEight.style.borderWidth = "thin";
});

colorNine.addEventListener("mouseover", () => {
  colorNine.style.borderStyle = "dashed";
  colorNine.style.borderWidth = "thin";
});

//-------- MOUSE LEAVE COLOR -------------

colorOne.addEventListener("mouseout", () => {
  colorOne.style.borderStyle = "";
  colorOne.style.borderWidth = "";

  allColors[prevColor].style.borderStyle = "solid";
  allColors[prevColor].style.borderWidth = "thin";
});

colorTwo.addEventListener("mouseout", () => {
  colorTwo.style.borderStyle = "";
  colorTwo.style.borderWidth = "";

  allColors[prevColor].style.borderStyle = "solid";
  allColors[prevColor].style.borderWidth = "thin";
});

colorThree.addEventListener("mouseout", () => {
  colorThree.style.borderStyle = "";
  colorThree.style.borderWidth = "";

  allColors[prevColor].style.borderStyle = "solid";
  allColors[prevColor].style.borderWidth = "thin";
});

colorFour.addEventListener("mouseout", () => {
  colorFour.style.borderStyle = "";
  colorFour.style.borderWidth = "";

  allColors[prevColor].style.borderStyle = "solid";
  allColors[prevColor].style.borderWidth = "thin";
});

colorFive.addEventListener("mouseout", () => {
  colorFive.style.borderStyle = "";
  colorFive.style.borderWidth = "";

  allColors[prevColor].style.borderStyle = "solid";
  allColors[prevColor].style.borderWidth = "thin";
});

colorSix.addEventListener("mouseout", () => {
  colorSix.style.borderStyle = "";
  colorSix.style.borderWidth = "";

  allColors[prevColor].style.borderStyle = "solid";
  allColors[prevColor].style.borderWidth = "thin";
});

colorSeven.addEventListener("mouseout", () => {
  colorSeven.style.borderStyle = "";
  colorSeven.style.borderWidth = "";

  allColors[prevColor].style.borderStyle = "solid";
  allColors[prevColor].style.borderWidth = "thin";
});

colorEight.addEventListener("mouseout", () => {
  colorEight.style.borderStyle = "";
  colorEight.style.borderWidth = "";

  allColors[prevColor].style.borderStyle = "solid";
  allColors[prevColor].style.borderWidth = "thin";
});

colorNine.addEventListener("mouseout", () => {
  colorNine.style.borderStyle = "";
  colorNine.style.borderWidth = "";

  allColors[prevColor].style.borderStyle = "solid";
  allColors[prevColor].style.borderWidth = "thin";
});


/*------ShARE POSTCARD------ */
let sharePostCardData = {
    "photo": "",
     "message": "",
     "font": "",
     "color": ""
   };

sharePostcardBox.addEventListener("click", () => {
  sharePostCardData.photo = currFileName;
  sharePostCardData.message = writtenMessage.value;
  sharePostCardData.font = currFont;
  sharePostCardData.color = currColor;

  let data = JSON.stringify(sharePostCardData);

  //write ajax request
  loadSharePostCardData(data);

  //display new html file
  displayNewUrl();


});

function loadSharePostCardData(data) {
  const xhr = new XMLHttpRequest();

  //type, url/file, async
  xhr.open("POST",'http://localhost:5000/send', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  // xhr.onloadend = (e) => {
  //   window.location = 'http://localhost:5000/display';
  // }

  xhr.send(data);
  console.log("SENT DATA!");
}

function displayNewUrl() {
  const xhr = new XMLHttpRequest();

  //type, url/file, async
  xhr.open("GET",'http://localhost:5000/', true);
  xhr.responseType = "document";
  xhr.send();

  //change url
  changeURL();
}

function changeURL() {
  window.location = 'http://localhost:5000/display';
  //window.location.href = 'sean-carnahan-display.html';
}

/*----UPLOAD IMAGE----*/
function uploadImage(fileToUpload) {
  const formData = new FormData();

  formData.append('newImage',fileToUpload, fileToUpload.name);

  const xhr = new XMLHttpRequest();

  xhr.open("POST", "/upload", true);

  xhr.onloadend = function(e) {
    console.log("IMG upload callback initiated");
    console.log(xhr.responseText);

    //display img -> might need to move this code to sharePostcardBox upload reuqest
    //let newImage = document.getElementById("serverImage");
    //newImage.src = "https://image-upload-example.glitch.me/images/"+selectedFile.name;
    //newImage.src = "http://localhost:5000/"+selectedFile.name;
  }

  xhr.send(formData);

}



start();












// UPLOAD IMAGE using a post request
// Called by the event listener that is waiting for a file to be chosen
// function uploadFile() {
//
//     // get the file chosen by the file dialog control
//     const selectedFile = document.getElementById('fileChooser').files[0];
//     // store it in a FormData object
//     const formData = new FormData();
//     // name of field, the file itself, and its name
//     formData.append('newImage',selectedFile, selectedFile.name);
//
//     // build a browser-style HTTP request data structure
//     const xhr = new XMLHttpRequest();
//     // it will be a POST request, the URL will this page's URL+"/upload"
//     xhr.open("POST", "/upload", true);
//
//     // callback function executed when the HTTP response comes back
//     xhr.onloadend = function(e) {
//         // Get the server's response body
//         console.log(xhr.responseText);
//         // now that the image is on the server, we can display it!
//         let newImage = document.getElementById("serverImage");
//         newImage.src = "https://image-upload-example.glitch.me/images/"+selectedFile.name;
//     }
//
//     // actually send the request
//     xhr.send(formData);
// }
//
// // Add event listener to the file input element
// document.getElementById("fileChooser").addEventListener("change",uploadFile);
