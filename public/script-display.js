let writtenMessage = document.getElementById('writtenMessage');
let postcardToDisplay = document.getElementById('postcardToDisplay');
let serverImage = document.getElementById('serverImage');




function start() {
  getPostcardData((callbackData) => {
    console.log("---ENTERED CALLBACK---");
    console.log(callbackData);

    writtenMessage.style.fontFamily = callbackData.font;

    postcardToDisplay.style.backgroundColor = callbackData.color;
    writtenMessage.style.backgroundColor = callbackData.color;

    writtenMessage.value = callbackData.message;

    serverImage.src = './../images/' + callbackData.photo;
  });
}


function getPostcardData (callback) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      console.log("CALLBACK STARTED");

      callback(xhr.response);
    }
  }

  //type, url/file, async
  xhr.open("GET",'http://localhost:5000/getJsonData', true);

  xhr.send();
}




start();
