CREATE TABLE IF NOT EXISTS `airports` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `city` varchar(200) NOT NULL,
  `country` varchar(200) NOT NULL,
  `iata` varchar(4) NOT NULL,
  `icao` varchar(4) NOT NULL,
  `lat` float NOT NULL,
  `long` float NOT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `SEARCH` (`name`,`city`,`country`,`iata`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;