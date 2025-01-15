function connectDevice() {
    navigator.bluetooth.requestDevice(
        {
            filter:
            {
                name: "BikeLock"
            } 
        })
        .then(device => {
            console.log('Selected device:', device);
            return device.gatt.connect();
        })
        .then(server => {
            console.log('Connected server:', server);
            return server.getPrimaryService('your_service_uuid');
        })
        .then(service => {
            return service.getCharacteristic('your_characteristic_uuid');
        })
        .then(characteristic => {
            const data = new Uint8Array([1, 2, 3]); // Example data to send
            return characteristic.writeValue(data);
        })
        .then(() => {
            console.log('Value written successfully');
        })
        .catch(error => {
            console.error('Error:', error);
        });
}