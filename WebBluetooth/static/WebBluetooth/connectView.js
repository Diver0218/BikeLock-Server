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

    device = navigator.bluetooth.requestDevice({
        filter:
        {
            name: "BikeLock"
        } 
    });
    let server = device.gatt.connect();
    let tokenTransfer_Service = server.getPrimaryService('your_service_uuid');
    let idTransfer_Service = server.getPrimaryService('your_service_uuid');
    let token_Characteristic = tokenTransfer_Service.getCharacteristic('your_characteristic_uuid');
    let id_Characteristic = idTransfer_Service.getCharacteristic('your_characteristic_uuid');

    let lockID = getLockID(id_Characteristic);
    sendToken(token_Characteristic, lockID);


}

function sendToken(characteristic, lockID)
{
    const data = {
        lockID: lockID
    };
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
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

function getLockID(characteristic)
{
    return characteristic.readValue()
        .then(value => {
            // Process the value here
            console.log('Lock ID:', value);
            return value;
        })
        .catch(error => {
            console.error('Error reading characteristic value:', error);
        });
}