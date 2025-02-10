function getToken() {
    return "55ed039c-e5a1-44ea-9e43-edb678c6a84b"   // random token
                                                    // TODO get from server
}


async function connectDevice() {
    document.getElementById('state').innerHTML = "Connecting...";
    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ name: 'SmartLock' }]
        });

        document.getElementById('state').innerHTML = "Getting Token...";
        token = getToken();

        document.getElementById('state').innerHTML = "Sending Token...";
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('battery_service'); // Replace with the correct service UUID
        const characteristic = await service.getCharacteristic('battery_level'); // Replace with the correct characteristic UUID
        const encoder = new TextEncoder();
        const tokenData = encoder.encode(token);
        await characteristic.writeValue(tokenData);

        document.getElementById('state').innerHTML = "Disconecting...";
        await server.disconnect();

        document.getElementById('state').innerHTML = "Disconnected";

    } catch (error) {
        console.error('Error connecting to device:', error);
    }
}