DROP TABLE TRANSACTION; 
DROP TABLE MYSTOCKLIST;

CREATE TABLE MYSTOCKLIST
(
	UserID                VARCHAR(20)  NOT NULL ,
	HoldingQuantity       INT NULL ,
	HoldingStockName      VARCHAR(20)  NOT NULL ,
	HoldingStockId        VARCHAR(20)  NOT NULL ,
	PRIMARY KEY (UserID),
	FOREIGN KEY (UserID) REFERENCES USER(UserID)
);

CREATE TABLE TRANSACTION
(
	TransactionNum        INT  NOT NULL ,
	StockID               VARCHAR(20)  NOT NULL ,
	Quantity              INT  NOT NULL ,
	TransactionDate       DATE  NOT NULL ,
	TransactionType       VARCHAR(10)  NOT NULL ,
	UserID                VARCHAR(20)  NOT NULL ,
	PRIMARY KEY (TransactionNum),
	FOREIGN KEY (StockID) REFERENCES STOCK(StockID),
	FOREIGN KEY (UserID) REFERENCES USER(UserID)
);
