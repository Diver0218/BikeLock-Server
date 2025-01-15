const url = "example.com"

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
            sendToken(characteristic);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function sendToken(characteristic)
{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data }) // Convert data to JSON string
    };

    let response = fetch(url, options);
    if (response.ok)
    {
        let data = response.body.json()
        characteristic.writeValue(data.token);
    }
    else
    {
        throw new Error('Request Failed');
    }
}