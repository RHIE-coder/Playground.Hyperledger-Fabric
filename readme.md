# :dart: 환경셋팅

<br>

## :lock: Prerequisites

### :key: remote setting

#### - sshd

```bash
sudo apt-get install openssh-server
sudo service sshd start
sudo service sshd status
```
#### - get ip address

```bash
sudo apt install net-tools
ifconfig
```
<hr>

### :key: install Git, cURL, jq(Optional)

```bash
sudo apt install git
sudo apt install curl
sudo apt install jq
```

#### - just check whether installed `wget` or not

```bash
wget -V
```

<hr>

### :key: Docker

#### - docker : `docker engine`

##### 오래된 버전 지우기
```shell
sudo apt-get remove docker docker-engine docker.io containerd runc
```

##### docker repository 준비
 - 도커 엔진을 새로운 환경에 처음 설치하기 전에 `docker repository`를 준비해야 이 레파지토리로부터 docker를 설치하거나 업데이트를 할 수 있다.

 1. Update the apt package index and install packages to allow apt to use a repository over HTTPS
```shell
sudo apt-get update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

 2. add docker's official GPG key
```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo apt-key fingerprint 0EBFCD88
```

 3. Use the following command to set up the stable repository. To add the nightly or test repository, add the word nightly or text(or both) after the word stable in the commands below.
 ```shell
sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"
 ```

 4. Install Docker Engine
```shell
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io

sudo docker run hello-world
```

 5. If you would like to use docker as a non-root user, you should now consider adding your user to the 'docker' group sith something like:
 ```
sudo usermod -aG docker your-user
 ```

##### (Optional) 설치 삭제

Uninstall the Docker Engine, CLI, and Containerd packages:
```shell
sudo apt-get purge docker-ce docker-ce-cli containerd.io
```

Images, containers, volumes, or customized configuration files on your host are not automatically removed. To delete all images, containers, and volumes:
```shell
sudo rm -rf /var/lib/docker
```


#### - docker : `docker compose`
##### 설치
Run this command to download the current stable release of Docker Compose:
```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Apply executable permissions to the binary:
```shell
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

##### (Optional) 설치 삭제
To uninstall Docker Compose if you installed using curl:
```shell
sudo rm /usr/local/bin/docker-compose
```

##### 설치 확인
check the version of Docker:
```shell
docker --version
```
Make sure the docker daemon is running:
```shell
sudo systemctl start docker
```
check the version of Docker Compose:
```shell
docker-compose --version
```


<hr>

[Fabric 1.4 LTS](./mdsrc/fabric14.md)


