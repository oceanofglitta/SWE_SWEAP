
CREATE TABLE USER
(
	UserID              VARCHAR(20)  NOT NULL ,
	Password              VARCHAR(20)  NOT NULL ,
	Email                 VARCHAR(20)  NULL ,
	PwQuestion            VARCHAR(50)  NULL ,
	PwAnswer              VARCHAR(50)  NULL ,
	IsManager              SMALLINT  NOT NULL ,
	PRIMARY KEY(UserID)
);


CREATE TABLE TRANSACTION
(
	TransactionNum        INT  NOT NULL ,
	StockName               VARCHAR(20)  NOT NULL ,
	Quantity              INT  NOT NULL ,
	TransactionDate       DATE  NOT NULL ,
	TransactionType       VARCHAR(10)  NOT NULL ,
	UserID                VARCHAR(20)  NOT NULL ,
	PRIMARY KEY (TransactionNum),
	FOREIGN KEY (UserID) REFERENCES USER(UserID)
);

CREATE TABLE MYSTOCKLIST
(
	UserID                VARCHAR(20)  NOT NULL ,
	HoldingQuantity       INT NULL ,
	HoldingStockName      VARCHAR(20)  NOT NULL 
);


CREATE TABLE CONTEST
(
	ContestNum            INT  NOT NULL ,
	ContestName           VARCHAR(20)  NOT NULL ,
	StartDate             DATE  NOT NULL ,
	FinishDate            DATE  NOT NULL ,
	PreStartDate          DATE  NULL ,
	PreFinishDate         DATE  NULL ,
	PRIMARY KEY(ContestNum)
);

CREATE TABLE PARTICIPATE
(
	UserID              VARCHAR(20)  NOT NULL ,
	ContestNum            INT  NOT NULL ,
	ContestProfit         INT  NULL ,
	InitialProfit         INT  NULL ,
	FinalProfit           INT  NULL ,
	PRIMARY KEY (UserID,ContestNum),
	FOREIGN KEY (UserID) REFERENCES USER(UserID),
	FOREIGN KEY (ContestNum) REFERENCES CONTEST(ContestNum)
);

CREATE TABLE PORTFOLIO
(
	UserID              VARCHAR(20)  NOT NULL ,
	EvaluationPrice       INT  NULL ,
	Profit                INT  NULL ,
	PRIMARY KEY (UserID),
	FOREIGN KEY (UserID) REFERENCES USER(UserID)
);

CREATE TABLE ACCOUNT
(
	UserID              VARCHAR(20)  NOT NULL ,
	TotalAsset            INT  NULL ,
	Asset                 INT  NULL ,
	InitialAsset          INT  NULL ,
	PRIMARY KEY (UserID),
	FOREIGN KEY (UserID) REFERENCES USER(UserID)
);


CREATE TABLE BOARD
(
	BoardNum              INT  NOT NULL ,
	Title                 VARCHAR(50)  NOT NULL ,
	Content               VARCHAR(50)  NOT NULL ,
	LikeCnt               INT  NULL ,
	DayTime               TIMESTAMP  NULL 
);
