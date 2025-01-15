function connectDevice() {
    navigator.bluetooth.requestDevice({ })
        .then(device => {
            // Device is selected, do something with it
            console.log('Selected device:', device);
            // Connect to the device and perform further actions
            return device.gatt.connect();
        })
        .then(server => {
            // Device is connected, do something with the server
            console.log('Connected server:', server);
            // Perform operations on the server
            // ...
        })
        .catch(error => {
            // Handle any errors that occur during the process
            console.error('Error:', error);
        });
}