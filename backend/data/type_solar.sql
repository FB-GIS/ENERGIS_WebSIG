-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : db.3wa.io
-- Généré le : sam. 21 mars 2026 à 09:24
-- Version du serveur :  5.7.33-0ubuntu0.18.04.1-log
-- Version de PHP : 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `fredericbaron_energis`
--

-- --------------------------------------------------------

--
-- Structure de la table `type_solar`
--

CREATE TABLE `type_solar` (
  `id` int(11) NOT NULL,
  `type_project` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `type_solar`
--

INSERT INTO `type_solar` (`id`, `type_project`) VALUES
(1, 'SOL'),
(2, 'SERRE'),
(3, 'OMBRIERE'),
(4, 'TOITURE'),
(49, 'TESSST'),
(52, '');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `type_solar`
--
ALTER TABLE `type_solar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type_project` (`type_project`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `type_solar`
--
ALTER TABLE `type_solar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
