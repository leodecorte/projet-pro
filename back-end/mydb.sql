-- start the server: $ mysqld --console
-- login:            $ mysql -u root --password=
-- run the script:   mysql> source C:\yourdirectories...\db.sql
-- the script: 

-- DROP DATABASE IF EXISTS mydb;

CREATE DATABASE IF NOT EXISTS mydb;

USE mydb;

CREATE TABLE IF NOT EXISTS `products` (
   `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(128) DEFAULT NULL,
   `description` TEXT,
   `category` VARCHAR(100),
   `price` DOUBLE,
   `img_url` VARCHAR(50) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES (1, 'admin', 'admin@admin.com', '1234');