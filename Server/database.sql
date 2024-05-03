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
    ClassId INT AUTO_INCREMENT PRIMARY KEY,
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