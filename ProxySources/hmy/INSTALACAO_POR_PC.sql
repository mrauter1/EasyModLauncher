-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Máquina: localhost:3306
-- Data de Criação: 23-Fev-2016 às 19:19
-- Versão do servidor: 10.0.20-MariaDB-cll-lve
-- versão do PHP: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de Dados: `jglqzthq_celosoftware`
--

-- --------------------------------------------------------

--
-- Structure for view `INSTALACAO_POR_PC`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`cpses_jgdjmUnSX5`@`localhost` SQL SECURITY DEFINER VIEW `INSTALACAO_POR_PC` AS select `install_count`.`id` AS `ID`,cast(`install_count`.`date` as date) AS `DATE`,(case when (`install_count`.`step` like '%Finalizou%') then 1 else 0 end) AS `FINISHED`,`install_count`.`country` AS `country`,`install_count`.`info` AS `INFO`,`install_count`.`file_name` AS `FILE_NAME` from `install_count`;

--
-- VIEW  `INSTALACAO_POR_PC`
-- Dados: Nenhum
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
