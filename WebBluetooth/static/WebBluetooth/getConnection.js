serviceUuid = 'ae578e1d-5457-46e4-9eda-ce03a4534896';
characteristicUuid = '0f3bd0a0-7bc0-448f-bd02-793fb412b4af';
url = 'http://localhost:3498/LockAuth/';

async function getToken() {
    const options = {
        method: 'GET',
    };
    let response = await fetch(url, options);
    let data = await response.json()
    return data.token
}


function connectDevice() {
    //connect to device
    document.getElementById('state').innerHTML = "Connecting...";
    navigator.bluetooth.requestDevice({
        filters: [{ name: 'SmartLock' }, { services: [serviceUuid] }]
    }).then(device => {
        return device.gatt.connect();
    }).then(server => {
        document.getElementById('state').innerHTML = "Connected";
        document.getElementById('state').innerHTML = "Get the Service...";
        return server.getPrimaryService(serviceUuid);
    }).then(service => {
        document.getElementById('state').innerHTML = "Get the Characteristic...";
        return service.getCharacteristic(characteristicUuid);
    }).then(characteristic => {
        document.getElementById('state').innerHTML = "Write Token to Lock...";
        getToken().then(token => {
            characteristic.writeValue(new TextEncoder().encode(token));
        });
        return new Promise(resolve => setTimeout(resolve, 2000));
    }).then(() => {
        document.getElementById('state').innerHTML = "Disconnecting...";
        // return characteristic.service.device.gatt.disconnect();
    }).then(() => {
        document.getElementById('state').innerHTML = "Disconnected";
    }).catch(error => {
        console.error('Error connecting to device:', error);
    });

        //get Token
        // document.getElementById('state').innerHTML = "Getting Token...";
        // token = getToken();

        // //Send Token to Lock
        // document.getElementById('state').innerHTML = "Connecting to Gatt...";
        // let server = device.gatt.connect()
        // .then(server => { 
        //     document.getElementById('state').innerHTML = "Get the Service...";
        //     server.getPrimaryService(serviceUuid)
        // }).then(service => {
        //     document.getElementById('state').innerHTML = "Get the Characteristic...";
        //     service.getCharacteristic(characteristicUuid);
        // }).then(characteristic => {
        //     document.getElementById('state').innerHTML = "Write Token to Lock...";
        //     document.getElementById('state').innerHTML = "Encode Token...";
        //     let encoder = new TextEncoder();
        //     let tokenData = encoder.encode(token);
        //     document.getElementById('state').innerHTML = "Write Token to Lock...";
        //     characteristic.writeValue(tokenData);
        // });
            
        

    //     //disconnect Lock
    //     document.getElementById('state').innerHTML = "Disconecting...";
    //     server.disconnect();

    //     document.getElementById('state').innerHTML = "Disconnected";

    // } catch (error) {
    //     console.error('Error connecting to device:', error);
    // }
}