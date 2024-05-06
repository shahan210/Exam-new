CREATE SCHEMA exam-new

CREATE TABLE Subjects (
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
CREATE TABLE AdminUserLogins (
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

CREATE TABLE QB_AdminUserRights (
    RightID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    code INT,
    remark VARCHAR(100),
    id INT,
    mdule VARCHAR(50),
    BatchID INT
);

