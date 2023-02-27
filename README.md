
# Vaccine4all
A flexible covid-19 vaccination management system with separate user and admin site.
Users can register with their birth certificate and see the status of their vaccination info.
They can take vaccine from different centers for different doses. Also it is not mandatory to take same vaccine as previous.
Centers can set appointment,update vaccine storage, vaccination status of a person and verification.
## Authors

- [PrinceZarzees](https://github.com/PrinceZarzees)
* [AbrarHasnat](https://github.com/abrarhasanat)
# Language and Applications Used
* NodeJs (BackEnd)
* ReactJs,HTML,CSS (FrontEnd)
* SQL Plus
* Oracle 19c (Database)



## Oracle Installation and Setup

At first you have to install Oracle  
[Oracle Installation Guideline](http://www.rebellionrider.com/how-to-install-oracle-database-19c-on-windows-10/)  

After that 

Step 1: Open 'SQL Plus' application. 

Step 2: Connect via 'System' User.  
Username: **system** or **sys as sysdba**  
Password: Set by you at the time of installation 

Step 3: Type below command  
```bash
  SQL> alter session set "_ORACLE_SCRIPT"=true;
```
Step 4: Type below command  
```bash
  SQL> create user vforall identified by vforall;
```
It will create a user named 'vforall' with password 'vforall'.  

Step 5: Type below command  
```bash
  SQL> grant create session to vforall;
  SQL> grant all privileges to vforall;
```
Step 6: Type connect command
```bash
  SQL> connect
  Enter user-name: vforall
  Enter password:
```
Now user is ready to use.  
Execute the provided sql dump file.  
For database creation, sql queries and table configurations [Navicat premium 16](https://www.navicat.com/en/products/navicat-premium) was used.

## Node Installation  
* Install [Node](https://nodejs.org/en/) 
* Clone the repository  
Install all the dependencies from package.json  

```cd ``` to backend directory  

```npm i ```  
```npm install ```  

start the app  
```npm start ```   

go to http://localhost:5000/api/person/  for user site.  
go to http://localhost:5000/api/center/  for admin site.

## Features of Admin site  
* Login to the system with required password for a center
* Update Storage (add or remove a particular amount of vaccines from a center)
* Creating appointment based on registration,storage,limit and previous vaccination info
* Vaccinate someone and verification
* Issue a certificate after giving at least 2 dose

## Features of User site
* Register with birth certificate
* Choosing center according to user's convenience
* Update info like changing center
* Seeing vaccination status with brief description of time and place where vaccinated
## Optimizations

PL/SQL features like Triggers,functions and procedure were used to insert,update and delete info. Queries were done such that unnecessary info get excluded.





## API Reference
```http
post  ("api/center/login")
post  ("api/center/login/update_vacc_info")
post  ("api/center/set_appointment")
get   ("api/center/:cid")
post  ("api/center/:cid/update_storage")
get   ("api/center/:cid/islegal")
get   ("api/center/:cid/bid")
post  ("api/person/login")
post  ("api/person/login/:pid/view_certificate")
get   ("api/person/getDivision")
get   ("api/person/getDistrictByDivision")
get   ("api/person/getThanaByDistrict")
get   ("api/person/getCenterByThana")
get   ("api/person/:pid/getPersonInfo")
patch ("api/perosn/:pid/updateInfo")

```

for any problem
npm i sass --save-dev
npm i react-redux
npm install --save google-maps-react
npm audit fix --force 
then npm install
