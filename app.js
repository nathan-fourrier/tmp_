// create an empty modbus client
var ModbusRTU = require("modbus-serial");


var vector = {
    getInputRegister: function(addr, unitID) {
        // Synchronous handling
        return addr;
    },
    getHoldingRegister: function(addr, unitID, callback) {
        // Asynchronous handling (with callback)
        setTimeout(function() {
            // callback = function(err, value)
            callback(null, addr + 8000);
        }, 10);
    },
    getCoil: function(addr, unitID) {
        // Asynchronous handling (with Promises, async/await supported)
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve((addr % 2) === 0);
            }, 10);
        });
    },
    setRegister: function(addr, value, unitID) {
        // Asynchronous handling supported also here
        console.log("set register", addr, value, unitID);
        return;
    },
    setCoil: function(addr, value, unitID) {
        // Asynchronous handling supported also here
        console.log("set coil", addr, value, unitID);
        return;
    },
    readDeviceIdentification: function(addr) {
        return {
            0x00: "MyVendorName",
            0x01: "MyProductCode",
            0x02: "MyMajorMinorRevision",
            0x05: "MyModelName",
            0x97: "MyExtendedObject1",
            0xAB: "MyExtendedObject2"
        };
    }
};

// set the server to answer for modbus requests
const servIP = "127.0.0.1";
const servPort = 8502;
console.log("ModbusTCP listening on modbus: "+servIP+":"+servPort);
var serverTCP = new ModbusRTU.ServerTCP(vector, { host: servIP, port: servPort, debug: true, unitID: 1 });

serverTCP.on("socketError", function(err){
    // Handle socket error if needed, can be ignored
    console.error(err);
});
