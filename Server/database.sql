CREATE SCHEMA exam-new

CREATE TABLE subjectsmaster (
    SubjectID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    SubjectName VARCHAR(100),
    QDescription VARCHAR(250),
    AddedDate VARCHAR(25),
    AddedBy VARCHAR(50),
    ModifiedDate    VARCHAR(25),
    ModifiedBy VARCHAR(50),
    ExamID INT,
    IsActive VARCHAR(10) 
);
CREATE TABLE classmaster (
    ClassId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    ClAutoId INT AUTO_INCREMENT,
    SLNo INT,
    QstClass VARCHAR(100),
    CLNAME VARCHAR(50),
    SECNAME VARCHAR(20),
    AddedDate VARCHAR(19), 
    AddedBy VARCHAR(50),
    ModifiedDate VARCHAR(19), 
    ModifiedBy VARCHAR(50),
    IsActive INT 
);
CREATE TABLE adminuserlogins (
    LoginID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    UserName VARCHAR(50) NOT NULL,
    UserPassword VARCHAR(50) NOT NULL,
    UserType INT,
    EmailID VARCHAR(50),
    PhNo VARCHAR(50),
    UserLocation VARCHAR(50),
    AddedBy VARCHAR(50),
    AddedDate vARCHAR(20),
    ModifiedBy VARCHAR(50),
    ModifiedDate vARCHAR(20),
    RightsDetails VARCHAR(255) NOT NULL
);

CREATE TABLE adminuserrights (
    RightID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    code INT,
    remark VARCHAR(100),
    id INT,
    mdule VARCHAR(50),
    BatchID INT
);
CREATE TABLE examdefinitiontmst (
    QuestionTestID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    AcaYear INT,
    ExamDate DATETIME,
    ExamName VARCHAR(250),
    ClassId INT,
    SubjectID INT,
    AddedBy VARCHAR(50),
    AddedDate DATETIME,
    ModifiedBy VARCHAR(50),
    ModifiedDate DATETIME,
    ALTMTHour INT,
    ALTMTMin INT,
    ALTMTSec INT,
    ExamHeading VARCHAR(2000),
    ExamSubHeading VARCHAR(1500)
);
