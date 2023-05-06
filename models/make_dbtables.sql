/* 1) run this to create de database*/
CREATE DATABASE sistema_gestion;



/* 2) Then run this to create de tables, wa need to run the app*/
CREATE TABLE `user` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `role` int
);

CREATE TABLE `role` (
  `id` int PRIMARY KEY NOT NULL,
  `type` varchar(100)
);

ALTER TABLE `user` ADD FOREIGN KEY (`role`) REFERENCES `role` (`id`);

INSERT INTO `role` (`id`, `type`) VALUES ('1', 'SuperAdmin'), ('2', 'Admin'), ('3', 'Emprendedor'), ('4', 'Defecto');