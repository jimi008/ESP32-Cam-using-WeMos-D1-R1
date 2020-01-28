function doPost(e) {
  var myRecipient = decodeURIComponent(e.parameter.myRecipient);
  var mySubject = decodeURIComponent(e.parameter.mySubject);
  var myBody = new Date().toString();
  var myFile = e.parameter.myFile;

  var contentType = myFile.substring(myFile.indexOf(":")+1, myFile.indexOf(";"));
  var data = myFile.substring(myFile.indexOf(",")+1);
  data = Utilities.base64Decode(data);
  var blob = Utilities.newBlob(data, contentType, "esp32-cam.jpg");

  // Send a photo as an attachment by using Gmail
  var response = GmailApp.sendEmail(myRecipient, mySubject, myBody,{
      attachments: [blob],
      name: 'Automatic Emailer Script'
    }
  );
  
  //Save camera image to drive
  savetoDrive(blob);
  
  return  ContentService.createTextOutput(response);
}

function savetoDrive(blob) {
   //Save the photo to Google Drive
  var folder, folders = DriveApp.getFoldersByName("ESP32-CAM");
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = DriveApp.createFolder("ESP32-CAM");
  }
  
    // Insert a web image
  //var image = "http://img.labnol.org/logo.png";
  //var blob = UrlFetchApp.fetch(image).getBlob();
  
  
  var file = folder.createFile(blob);    
  file.setDescription("Uploaded by ESP32-CAM");
  var imgId = file.getId();
  Logger.log(imgId);
 
  //send image using GET request to server for Twilio 
  sendPOST(imgId)
  
}

function sendPOST(imgId) {

  // Insert a web image for testing
  //var imgId = "http://img.labnol.org/logo.png"
  
  //If no Image Id from Google Drive Bail early
  if (!imgId) return Logger.log('No Image ID');
  
  var timeStamp = new Date().toString();
  
  var imgDownloadUrL = "https://drive.google.com/uc?export=download-id=" + imgId;

  //var imgDownloadUrL = imgId; //for testing

  // URL where we send POST request for Twilio Whatsapp message
  var url = 'http://server-url/esp32/esp32.php';

  var payload =
      {
        "timestamp" : timeStamp,
        "img" : imgDownloadUrL,
      };

  var options =
      {
        "method"  : "POST",
        "payload" : payload,
        "followRedirects" : true,
        "muteHttpExceptions": true
      };

  var result = UrlFetchApp.fetch(url, options);

  if (result.getResponseCode() == 200) {

    Logger.log("Response: "+result);
   
  }
}


