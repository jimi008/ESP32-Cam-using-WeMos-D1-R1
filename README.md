# ESP32-Cam-using-WeMos-D1-R1
Capture image using ESP32-Cam (OV2640) using ESP8266 WeMos D1 R1 WiFI Processor with Uno and send to email, save to Google Drive and send to Whatsapp using Twilio


<b>Requirements:</b>
1. ESP8266 WeMos D1 R1 WiFI Processor with Uno  (https://protosupplies.com/product/esp8266-di-wifi-with-uno-footprint/)
2. ESP32-Cam Ai-Thinker with OV2640 camera (https://robu.in/product/ai-thinker-esp32-cam-development-board-wifibluetooth-with-ov2640-camera-module/)
3. Breadboard
4. 10kom resistor
5. Push button

### ESP8266 WeMos D1 R1 WiFI Processor with Uno

![WeMos D1 R1 FootPrint](https://github.com/jimi008/ESP32-Cam-using-WeMos-D1-R1/blob/master/ESP8266-D1-WiFi-with-UNO-Footprint-Top.jpg
)
![WeMos D1 R1 Pinout](https://github.com/jimi008/ESP32-Cam-using-WeMos-D1-R1/blob/master/ESP8266-D1-R1-Pinout-2.jpg
)
![WeMos D1 R1 Pin Difference](https://github.com/jimi008/ESP32-Cam-using-WeMos-D1-R1/blob/master/Wemos-D1-Pin-Differences.pdf%20(1).jpg
)

### ESP32-Cam Ai-Thinker with OV2640

![ESP32-Camera Pins](https://github.com/jimi008/ESP32-Cam-using-WeMos-D1-R1/blob/master/esp32_camera_pins.jpg
)

### General Description

In this project we will use ESP32-cam to capture image using OV2640 and send it to email, save to Google Drive and send to Whatsapp using Twilio. We can use the ESP32-cam with FTDI programmer because its doesn’t come with a USB connector but in this projet we are using ESP8266 WeMos D1 R1 WiFI Processor with Uno to upload the code and proceed further. 

Further we are using Google Apps Script (https://developers.google.com/apps-script) to send the image data to email, save to Google Drive and send to Whatsapp using Twilio API. 

#### Schematic 
![ESP32-Camera & ESP8266 WeMos D1 R1 Schematic](https://github.com/jimi008/ESP32-Cam-using-WeMos-D1-R1/blob/master/Schematic%20.png
)

There are three `GND` pins and two pins for power: either 3.3V or 5V.

`UOT` and `UOR` are the serial pins. You need these pins to upload code to your board. Additionally, `GPIO 0` also plays an important role, since it determines whether the ESP32 is in flashing mode or not. When `GPIO 0 (Io0)` is connected to `GND`, the ESP32 is in flashing mode. After You finished uploading 
1. Remove jumper wire  X
2. Press the RST button 

We used GPIO2 for push button input

![ESP32-Camera](https://github.com/jimi008/ESP32-Cam-using-WeMos-D1-R1/blob/a474ff55644356018ad69ff5a604c345db788602/bazaar1003541_esp32cam3.jpg
)

![ESP32-Camera](https://github.com/jimi008/ESP32-Cam-using-WeMos-D1-R1/blob/a474ff55644356018ad69ff5a604c345db788602/bazaar1003542_esp32cam2.jpg
)

### Install ESP32 board
In this example, we use Arduino IDE to program the ESP32-CAM board. So, you need to have Arduino IDE installed as well as the ESP32 board using [Arduino core for the ESP32](https://github.com/espressif/arduino-esp32). Follow one of the next tutorials to install the ESP32 board, if you haven’t already:

#### Installation instructions using Arduino IDE Boards Manager

- Stable release link: `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`

Starting with 1.6.4, Arduino allows installation of third-party platform packages using Boards Manager. We have packages available for Windows, Mac OS, and Linux (32, 64 bit and ARM).

- Install the current upstream Arduino IDE at the 1.8 level or later. The current version is at the [Arduino website](http://www.arduino.cc/en/main/software).
- Start Arduino and open Preferences window.
- Enter one of the release links above into *Additional Board Manager URLs* field. You can add multiple URLs, separating them with commas.
- Open Boards Manager from Tools > Board menu and install *esp32* platform (and don't forget to select your `ESP32` board from Tools > Board menu after installation). In our case board is `ESP32 Wrover Module`.

### Development

After finishing the installation, clone this repository or download directly from Github and open [esp32_cam.ino](esp32_cam.ino). Before uploading the code, you need to insert your network credentials in the following variables:

        const char* ssid = "REPLACE_WITH_YOUR_SSID";
        const char* password = "REPLACE_WITH_YOUR_PASSWORD";

Also commnet out the respective camera model line, in our case it is 
        #define CAMERA_MODEL_AI_THINKER //We have this model of Esp32-cam
Further you need to replace the `myScript` Google Apps Script url with your own script url, `myRecipient` with your own email & `mySubject` with your subject.

        String myScript = "/macros/s/**********/exec";    //Create your Google Apps Script and replace the "myScript" path.
        String myRecipient = "youremail@gmail"; //Enter your Email address
        String mySubject = "Image Captured from Arduino Esp32-Cam"; //Enter some subject
        
You can create new project in [Google apps script](https://script.google.com/home/my) and copy the code from [code.gs](Code.gs) and replace POST request url with your own server url. We used Siteground shared hosting for this purpose and any basic hosting can be used for this purpose. 
`var url = 'http://server-url/esp32/esp32.php';`

Publish your script with anonymouse access. 

IMAGE

Upload [esp32.php](esp32.php) to your server along with [Twilio PHP SDK](https://github.com/twilio/twilio-php/archive/master.zip) that we have included in php file. Replace the Twilio Account Sid and Auth Token. Find your Account Sid and Auth Token at [twilio.com/console](https://twilio.com/console)


https://github.com/jimi008/ESP32-Cam-using-WeMos-D1-R1/blob/master/esp32.php#L23-L24

https://github.com/jimi008/ESP32-Cam-using-WeMos-D1-R1/blob/a474ff55644356018ad69ff5a604c345db788602/esp32.php#L23-L24


[https://github.com/jimi008/ESP32-Cam-using-WeMos-D1-R1/blame/a474ff55644356018ad69ff5a604c345db788602/esp32.php#L23-L24]

[https://github.com/jimi008/ESP32-Cam-using-WeMos-D1-R1/blob/a474ff55644356018ad69ff5a604c345db788602/esp32.php#L23-L24]
