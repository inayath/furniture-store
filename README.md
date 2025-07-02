# Furniture Store  

## Tech Stack
- Next.js Material UI MySQL

## Features
- Admins can add furniture via `/api/furniture` POST
- Showing dummy data now if api fails


## Setup
1. Create MySQL DB `furniture_store` with table:

```sql
CREATE TABLE furniture (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10,2),
  stock INT
);
CREATE TABLE sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  furniture_id INT,
  quantity INT,
  total_price DECIMAL(10,2),
  sold_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (furniture_id) REFERENCES furniture(id)
);


Update db details in lib/db.js

npm install
npm run dev
