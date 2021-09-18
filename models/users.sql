
SET sql_safe_updates = FALSE;

USE defaultdb;
DROP DATABASE IF EXISTS HTN CASCADE;
CREATE DATABASE IF NOT EXISTS HTN;

USE HTN;

CREATE TABLE Users (
    id UUID PRIMARY KEY,
    email varchar NOT NULL UNIQUE,
    "name" varchar NOT NULL,
    "password" varchar NOT NULL,
    high_score NUMERIC,
    
    balance INT8
);