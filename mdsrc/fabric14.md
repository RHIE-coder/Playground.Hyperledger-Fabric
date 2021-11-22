# :dart: fabric 1.4 prerequisites

## :lock: Install Golang

### :key: Go version 1.12.x is required.

```sh
wget https://golang.org/dl/go1.12.17.linux-amd64.tar.gz
```
 - checksum 확인
`a53dd476129d496047487bfd53d021dd17e0c96895865a0e7d0469ce3db8c8d2`
```sh
sha256sum go1.12.17.linux-amd64.tar.gz
```
```sh
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.12.17.linux-amd64.tar.gz
```

```sh
vi ~/.bashrc

--------
GOPATH=$HOME/go
PATH=$PATH:$GOPATH/bin
--------

. ~/.bashrc
```
```sh
go version
```
<hr>

## :lock: Install NodeJS

### :key: Hyperledger Fabric SDK for Node.js, version 8 is supported from 8.9.4 and higher. Node.js version 10 is supported from 10.15.3 and higher.

```sh
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
```
 - it is recommended that you confirm the version of NPM installed
```
sudo npm install npm@5.6.0 -g
```
```
node -v
npm -v
```
<hr>

## :lock: Start Fabric

### :key: Install Fabric

`curl -sSL http://bit.ly/2ysbOFE | bash -s -- <fabric_version> <fabric-ca_version> <thirdparty_version>`

```sh
curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.12 1.4.9 0.4.22
```

fabric-samples가 생기고 [hyperledger/fabric-samples](https://github.com/hyperledger/fabric-samples) 깃허브 소스코드와 다르게 `bin` 폴더가 생겨난 것을 볼 수 있다.

#### - 환경변수 추가

```sh
vi ~/.bashrc

-----
PATH=$PATH:$HOME/fabric/fabric-samples/bin/
-----

. ~/.bashrc
```

# :dart: Fabric 1.4 Tutorials

## :lock: Writing Your First Application

### :key: 네트워크 구축과 Fabcar APP 준비

#### - 네트워크 구축

```sh
cd fabcar
./startFabric.sh javascript
```

#### - Fabcar APP 준비

```sh
cd fabcar/javascript
npm install
```

<hr>

### :key: Fabcar APP 실행

#### - Enrolling the admin user

```sh
node enrollAdmin.js
```

#### - Register and enroll `user1`

```sh
node registerUser.js
```
#### - Querying the ledger

```js
-----
const result = await contract.evaluateTransaction('queryAllCars');
-----
node query.js
```

#### - The FabCar smart contract

```js
-----
const result = await contract.evaluateTransaction('queryCar', 'CAR4');
-----
node query.js
```

#### - Updating the ledger

```js
-----
await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');
-----
node invoke.js
```

```js
-----
const result = await contract.evaluateTransaction('queryCar', 'CAR12');
-----
node query.js
```

```js
-----
await contract.submitTransaction('changeCarOwner', 'CAR12', 'Dave');
-----
node invoke.js
```

```js
-----
const result = await contract.evaluateTransaction('queryCar', 'CAR12');
-----
node query.js
```