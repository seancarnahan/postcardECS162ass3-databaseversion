let writtenMessage = document.getElementById('writtenMessage');
let postcardToDisplay = document.getElementById('postcardToDisplay');
let serverImage = document.getElementById('serverImage');




function start() {
  getPostcardData((callbackData) => {
    console.log("RESPONSE RECIEVED: " + callbackData);

    writtenMessage.style.fontFamily = callbackData[0].font;

    postcardToDisplay.style.backgroundColor = callbackData[0].color;
    writtenMessage.style.backgroundColor = callbackData[0].color;

    writtenMessage.value = callbackData[0].message;

    serverImage.src = './../images/' + callbackData[0].photo;

    let randomString = callbackData[0].randomStr;
    console.log("Random String: " + randomString);


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
  //the query oarams have to be sent here

  let randomString = window.location.search.split('=')[1]
  console.log(randomString);




  xhr.open("GET",'http://localhost:5000/getJsonData?id='+randomString, true);


  xhr.send();
}




start();
