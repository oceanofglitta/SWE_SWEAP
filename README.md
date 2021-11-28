<h3> 2021-2 DGU Software Engineering Project </h3>
<h1> 'SWEAP' 주식 모의투자 및 경진대회 시스템</h1>

<h3> Team Member & Role</h3>
2018112019 고가현 : Scrum Master, Front, Back<br>
2018112055 박용욱 : Project Manger, Server ,Front, Back<br>
2019111979 이창진 : Front, Back<br>
2019111997 박교녕 : Front, Back<br>
2019112059 이가영 : Database<br>
---

### Project Goal
> 위 프로젝트는 주식에 관심이 있는 사람들이 원하는 주식에 대한 정보를 얻을 수 있고,
모의투자를 진행할 수 있도록 하며, 경진대회를 개최하여 대회에 참여할 수 있는 시스템을 개발하는 것을 목표로 한다.

---
### Development Environment
> Front-end : React<br>
Back-end : Nodejs<br>
Database : MySQL<br>
Server : AWS Ubuntu 20.04.3 LTS
  
---
### Installation

#### 1. Clone git repository and download project folder.
>gh repo clone SWEAP2021/SWE_SWEAP
<br>
https://github.com/SWEAP2021/SWE_SWEAP.git
<br>

#### 2. Install required packages 
```sh
cd sweap
npm install
```

#### 3. Install MySQL Database at AWS Ubuntu 20.04.3 LTS

- AWS Ubuntu 20.04.3 LTS 인스턴스 생성
    - 인바운드 규칙에 포트번호 3306을 추가한다.

- MySQL을 설치 및 기본 세팅을 한다.
    ```sh
    sudo apt-get update
    sudo apt-get install mysql-server
    sudo ufw allow mysql
    sudo systemctl start mysql
    sudo systemctl enable mysql
    ```

- MySQL을 실행 후 외부 접근이 가능하도록 한다.
    ```sh
    sudo service mysql restart
    ```
    ```SQL
    GRANT ALL PRIVILEGES ON *.* TO ‘root’@’%’ IDENTIFIED BY ‘mysql 설치시 최초 설정 비밀번호';
    ```
- 다운받은 프로젝트 폴더의 database 폴더에 있는 final_table.sql 파일을 이용하여 테이블을 생성한다.

- 프로젝트를 실행한다
    ```sh
    npm start 
    ```
 
---
### Instruction
1. 홈 화면 
2. 주식 조회 화면
3. 나의 포트폴리오 화면
4. 주식 매수 매도 화면
5. 모의 투자 경진대회 화면
