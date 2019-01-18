![License][license-image]

# Simple CRUD App Using React-Native
This is	Simple CRUD App including React Navigation, Nativebase and Axios. You can create, update, and delete data with this app. For the backend I'm using expressjs and mysql as database.

## Prerequisites
- JDK 1.8
- Node >= 8.*
- react-native-cli
- mysql

## Database Table
| column | type |
| --- | --- |
| id | int(11) PRIMARY AI |
| name | varchar(200) |
| email | varchar(200) |
| phone | varchar(200) |

## Installation
open terminal and change directory to your desired folder, then:
```
$ git clone https://github.com/naoufalelh/React-Native-App-Contact-Entreprises.git
$ cd YourAppName
$ yarn
$ add this paths:
$ export ANDROID_HOME=/Users/{Account}/Library/Android/sdk
$ export PATH=$ANDROID_HOME/platform-tools:$PATH
$ export PATH=$ANDROID_HOME/tools:$PATH
```

## Running Your App
Make sure you server and mysql already running, then run the app
```
$ react-native run-android
or
$ react-native run-ios
```