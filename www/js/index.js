/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
window.onload = function () {
    document.addEventListener("deviceready", onDeviceReady, false);
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');   
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
   
        console.log('Received Event: ' + id);

        // DEVICE
        $("#info").html('Cordova Version: ' + device.cordova + '<br>');
        $("#info").append(device.model + '<br>');
        $("#info").append(device.platform + ' ' + device.version + '<br>');

        // CAMERA
        //navigator.camera.getPicture(onSuccess, onFail, {
        //    quality: 50, destinationType: Camera.DestinationType.DATA_URL
        //});

        //function onSuccess(imageData) {
        //    var image = document.getElementById('myImage');
        //    image.src = "data:image/jpeg;base64," + imageData;
        //    console.log("image updated");
        //}

        //function onFail(message) {
        //    console.log('Failed because: ' + message);
        //}

        // BATTERY
        window.addEventListener("batterystatus", onBatteryStatus, false);

        function onBatteryStatus(info) {
            $("#battery").html("Level: " + info.level + "<br> isPlugged: " + info.isPlugged);
        }

        // ACCELEROMETER
        function onSuccessAccel(acceleration) {
            $("#accel").html('Acceleration:<br> X: ' + Math.round(acceleration.x, 2) + '<br>' +
                ' Y: ' + Math.round(acceleration.y, 2) + '<br>' +
                ' Z: ' + Math.round(acceleration.z, 2) + '<br>' +
                'Timestamp: ' + acceleration.timestamp + '<br');
        };

        function onErrorAccel() {
            alert('onError!');
        };

        var options = { frequency: 50 };

        var watchID2 = navigator.accelerometer.watchAcceleration(onSuccessAccel, onErrorAccel, options);

        // COMPASS
        function onSuccessCompass(heading) {
            $('#compass').html('Heading: ' + Math.round(heading.magneticHeading) +' Degrees');
        };

        function onErrorCompass(compassError) {
            alert('Compass error: ' + compassError.code);
        };

        var options = {
            frequency: 50
        };

        var watchID = navigator.compass.watchHeading(onSuccessCompass, onErrorCompass, options);

       // CONTACTS
        navigator.contacts.pickContact(function(contact){
            console.log('The following contact has been selected:' + JSON.stringify(contact));
        }, function(err){
            console.log('Error: ' + err);
        });
    }
};
