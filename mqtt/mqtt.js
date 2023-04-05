require("dotenv").config()
const mqtt = require('mqtt')

// const mqtt_Builder = require('../services/mqtt-service');

const connectMQTT = async () => {
    var client = await mqtt.connect(`mqtt://${process.env.MQTT_BROKER}`, {
        keepalive: 5,
        username: process.env.MQTT_USER,
        password: process.env.MQTT_PASSWORD,
        clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        will: {
            topic: '/iot/will',
            payload: 'device disconnected',
            qos: 0,
            retain: false
        }
    });
   let topics =[
                'iot/+/sensor',
                'iot/+/checkin',
                'iot/+/will',
              ];

    client.on('connect', function () {
        console.log("=====================================")
        console.log('client Mqtt connected:')
        for(let index = 0; index < topics.length; index++){
            const topic = topics[index];
            //console.log('subscribe: ',topic);
            client.subscribe(topic, function(err){
                if(err){
                    console.error(topic+'> ', err)
                }else{
                    console.log(":",topic)
                }
            })
        }
        console.log("=====================================")
    })

    client.on('message', async function (topic, message) {
        try{           
            console.log(topic, message.toString())
            let payload = JSON.parse(message.toString())
            // if (payload.device_Id) {

            //     let topics = topic.split('/');
            //     if (topics[2] === 'checkin') {
            //         // console.log('online: ', payload)
            //       const device = await mqtt_Builder.update_mqtt_checkin_Device(payload)
            //        //  console.log('update device checkin: ',device)

            //        // DeviceService.updateOnline(payload)
            //     }
            //     if (topics[2] === 'will') {
            //         // console.log('offline: ', payload)
            //         const device = await mqtt_Builder.update_mqtt_Offline_Device(payload)
                 
            //     }
            //     if (topics[2] === 'sensor') {
            //         if(topics[1]==='server_ad'){
            //             console.log("serverAD:")
            //             mqtt_Builder.create_mqtt_log_device_AD(payload)
            //             mqtt_Builder.update_mqtt_ObjData_Device_AD(payload) 
            //         }
            //         if(topics[1]==='server_R3'){
            //             console.log("serverR3:")
            //             mqtt_Builder.create_mqtt_log_device_R3(payload)
            //             mqtt_Builder.update_mqtt_ObjData_Device_R3(payload)

            //         }
                    
                           
            //     }   
            // }
        }catch(error){
            console.error(error)
        }
    })
}

module.exports = connectMQTT
