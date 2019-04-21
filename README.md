# Smart Home Backend

This project is a node server that aim to control iot devices in your home. For now, it's controlling yeelight bulbs but more will come !

It uses a room-based system to define which user can interact with each devices.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
node
pm2
yarn
mongodb database running
```

A Xiaomi Yeelight with [developer mode on](https://www.yeelight.com/en_US/developer).

A .env file containing all secrets :

```
DB_HOST=localhost
DB_PORT=27017

WEBSOCKET_PORT=<choose_a_port>

EXPRESS_PORT=<choose_a-port>

MQTT_HOST=localhost

JWT_SECRET_KEY=<generate_a_random_key>

SALT=<any_integer-will-do>
```

### Installing

To install this project in develop mode, clone it and run

```
yarn && yarn nodemon
```

### Deployment

To deploy the server, I recommend using a raspberry with a 64 bits OS. I personnaly use [debian buster](https://wiki.debian.org/RaspberryPi3). You can use this server either to control the lights through a web interface or through smart switches (thanks to the project [zigbee2mqtt](https://www.zigbee2mqtt.io/)). If you just want the first one, only read the mandatory sections.

#### Database (mandatory)

Connect to your raspberry and install docker. Then run

```
docker run -d -p 27017:27017 -v $HOME/data:/data --restart=always --name=smart-home-db mongo
```

This will instantiate a container containing your mongo database.

#### MQTT Broker (optionnal)

You'll need an MQTT Broker to allow the zigbee2mqtt to communicate with the server. I use [Mosquitto](https://mosquitto.org/) but every broker will do.

#### Zigbee2mqtt (optionnal)

I will not describe how to install this project because their site is very complete. You can run it using pm2.

When you're finished with those steps, it's time to install the node server itself. First, build the server using

```
yarn build
```

Then run it for the first time.

```
yarn start
```

#### User creation

If you want to use the exposed API, you need to create a user to have a JWT token which is used to authenticate.

The server now expose two endpoints /user and /login. To create the first user, make a POST call to <your_raspberry_ip>:6769/user with this body :

```
{
	"firstName": "John",
	"lastName": "Smith",
	"pseudo": "Light Master", -> this is unique and is used as an identifier
	"password": "password",
	"checkPassword": "password"
}
```

Now that a first user is created, you can communicate via websocket on the port defined in tthe environment file. You can go to the API section to understand how to communicate.

#### Room and permissions

Each device is binded to a room and each room has users. In the config.js file you can manage each room. Here is an example :

```
const rooms = [
  {
    roomId: "room_1",
    users: [{ pseudo: "John" }],
    yeelights: [{ name: "John's Room", deviceId: <yeelight_1_id> }]
  },
  {
    roomId: "room_2",
    users: [{ pseudo: "Dave" }],
    yeelights: [{ name: "Dave's Room", deviceId: <yeelight_2_id> }]
  },
  {
    roomId: "living_room",
    users: [{ pseudo: "John" }, { pseudo: "Dave" }],
    yeelights: [{ name: "Living Room", deviceId: <yeelight_3_id>" }]
  }
];
```

Here, John can control his light and the one from the living room but not the one from Dave's room.

The server needs to restart to load the new config. After a change in config, always check in the logs that the server did not crash (a bad config file will cause a crash).

You can now send command !

#### Add smart switch

If you installed everything needed to use zigbee smart switches, you first need to [pair your smart swicth with your zigbee bridge](https://www.zigbee2mqtt.io/getting_started/pairing_devices.html). Go see the logs from the zigbee2mqtt module, when you interact with the smart switch, you should see messages like this one :

```
019-4-21 20:01:46 MQTT publish: topic 'zigbee2mqtt/<smart_switch_id>', payload '{"linkquality":63,"battery":100,"voltage":3025,"click":"single"}'
```

You also must go look the server logs to see the yeelight's id.

Now you can configure your server, open the config.js file at the root of the project. To add a smart switch :

```
const switches = [
  {
    switchId: <smart_switch_id>,
    yeelightId: <yeelight_id>
  }
];
```

And restart the server. The switch should command your light now !

### API

This is a work in progress.

## Authors

**Louis Kraemer**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
