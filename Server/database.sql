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

CREATE TABLE questionbankmst (
    QuestionBankID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    QuestionTestID INT NOT NULL,
    QuestionGroupID INT DEFAULT 0,
    QuestionGroupSLNO INT,
    QuestionGroupType INT ,
    ClassId INT NOT NULL,
    SubjectID INT NOT NULL,
    ClassSubjectMasterId INT,
    ChapterID INT,
    QuestionTypeID INT DEFAULT 1,
    QuestionDesc01 VARCHAR(500),
    QuestionDesc02 VARCHAR(500),
    Practical BOOLEAN,
    Remarks VARCHAR(500),
    Qalerts VARCHAR(500),
    Question1 VARCHAR(1000) NOT NULL,
    Answer VARCHAR(1000),
    Answer1 VARCHAR(1000),
    Answer2 VARCHAR(1000),
    Answer3 VARCHAR(1000),
    Answer4 VARCHAR(1000),
    Answer5 VARCHAR(500),
    Answer6 VARCHAR(500),
    Answer7 VARCHAR(500),
    Answer8 VARCHAR(500),
    Answer9 VARCHAR(500),
    Answer10 VARCHAR(500),
    RightAnswer VARCHAR(500) NOT NULL,
    IsActive INT,
    AddedDate VARCHAR(20),
    AddedBy VARCHAR(50),
    ModifiedDate VARCHAR(20),
    ModifiedBy VARCHAR(50),
    FileDocument VARCHAR(500),
    Audio VARCHAR(500),
    Video VARCHAR(500),
    Image VARCHAR(500)
);
CREATE TABLE adminusersubjects (
    UsrSubjID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    SubjectID INT NOT NULL, 
    LoginID INT NOT NULL,
    ClassId INT NOT NULL
);
