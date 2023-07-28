-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 28, 2023 at 04:12 PM
-- Server version: 5.7.36-39-log
-- PHP Version: 7.2.34-38+0~20230214.79+debian10~1.gbp74d00c

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u225399db2`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `pk_category` int(11) NOT NULL,
  `fk_parent_category` int(11) NOT NULL,
  `title` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(256) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`pk_category`, `fk_parent_category`, `title`, `description`) VALUES
(1, 1, 'IT', 'it'),
(2, 1, 'Sport', ''),
(3, 1, 'Politics', ''),
(4, 1, 'World', ''),
(5, 2, 'Computer', ''),
(6, 2, 'Mobile', ''),
(7, 2, 'Web/Apps Development', ''),
(8, 3, 'Quotes', '');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `pk_contact_us` int(11) NOT NULL,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `mobile` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `subject` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `message` varchar(1024) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`pk_contact_us`, `name`, `email`, `mobile`, `subject`, `message`, `created_at`) VALUES
(1, 'pages', 'admin', 'behnam', 'aboozar', '123456778', '2023-06-21 18:00:18'),
(2, 'vahid', 'ttt', 'reza', 'aboozar', 'hihi', '2023-06-21 18:28:32'),
(3, 'vahid', 'svs.3001@gmail.com', '9120192405', 'it', 'this is a test', '2023-06-23 14:07:37'),
(4, 't', 's@g.com', '09120192405', 'tt', 'ttttt', '2023-06-23 14:09:33'),
(5, 'Vahid', 'svs.3001@gmail.com', '09120192405', 'Website', 'Hello please', '2023-07-08 10:38:50'),
(6, 'v', 'v@gmail.com', 'vv', 'vvv', 'vvvvvvvvvv', '2023-07-13 13:41:06'),
(7, 'Vahid', 'svs.3001@gmail.com', '9120192405', 'Projectsss', 'I want a webstie', '2023-07-24 22:29:48');

-- --------------------------------------------------------

--
-- Table structure for table `group_roles`
--

CREATE TABLE `group_roles` (
  `pk_group_role` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(64) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `group_roles`
--

INSERT INTO `group_roles` (`pk_group_role`, `title`) VALUES
('c81d335a-058d-11ee-a331-02420a80ff02', 'Administrator'),
('81526c02-0c88-11ee-a331-02420a80ff02', 'Editor');

-- --------------------------------------------------------

--
-- Table structure for table `medias`
--

CREATE TABLE `medias` (
  `pk_media` int(11) NOT NULL,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `extension` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `size` float NOT NULL,
  `path` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `medias`
--

INSERT INTO `medias` (`pk_media`, `name`, `extension`, `size`, `path`, `created_at`) VALUES
(18, 'AI64b311172b629.png', 'png', 819.65, 'uploads/', '2023-07-15 21:35:19'),
(19, 'austria64b312af424aa.png', 'png', 278.32, 'uploads/', '2023-07-15 21:42:07'),
(20, 'Erwin_Schrödinger_(1933)64b31b29957b1.jpg', 'jpg', 19.46, 'uploads/', '2023-07-15 22:18:17'),
(21, 'mock64b31e0b6c1a8.png', 'png', 32.63, 'uploads/', '2023-07-15 22:30:35'),
(22, '64b473476ee45.png', 'png', 819.65, 'uploads/', '2023-07-16 22:46:34'),
(23, 'ai164b5b5201ccf9.jpg', 'jpg', 314.6, 'uploads/', '2023-07-17 21:39:44'),
(24, '64b8149b5e6f6.jpg', 'jpg', 52.79, 'uploads/', '2023-07-19 16:51:41'),
(25, '64b814a6beb78.jpg', 'jpg', 60.14, 'uploads/', '2023-07-19 16:51:52');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `pk_page` int(11) NOT NULL,
  `title` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `fk_user` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `meta_keyword` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_description` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`pk_page`, `title`, `slug`, `content`, `fk_user`, `meta_keyword`, `meta_description`, `created_at`, `updated_at`) VALUES
(2, 'About Us', 'about_us', '<p class=\"text-center\">MegaTech is an IT company which works in the field of applications, newtork, web design, blockchain and AI. MegaTech is an innovative start-up company.\r\n    </p><h4 class=\"text-center\"><strong>MegaTech Activity Fields</strong>\r\n </h4><div><img class=\"img-thumbnail\" src=\"/images/megatech.png\" /></div>', '783e43d5-f6e1-11ed-abf9-005056c00001', '', '', '2023-07-22 20:01:21', '2023-07-22 20:02:51'),
(3, 'Contact Us', 'contact_us', 'MegaTech is an IT company which works in the field of applications, newtork, web design, blockchain and AI. MegaTech is an innovative start-up company.', '783e43d5-f6e1-11ed-abf9-005056c00001', '', '', '2023-07-22 20:04:09', '2023-07-22 20:04:09'),
(4, 'Impressum', 'impressum', '<p><strong>Offenlegung laut § 25 Mediengesetz\r\n        </strong>\r\n </p><p><strong>Medieninhaber\r\n </strong>\r\n </p><p>MegaTech Co \r\n    </p><p><strong>Geschäftsführer:\r\n </strong>\r\n Milad Tehrani    </p><p><strong>Die Adresse\r\n        </strong>\r\n </p><p>Ludersdorf 247/2 / Bürozentrum 8200 Ludersdorf (Gleisdorf)\r\n    </p><p><br /></p><p><strong>Unternehmensgegenstand\r\n </strong>\r\n </p><p> Betrieb eines Onlinedienstes (Internet-Anzeigen-Portal und)\r\n    </p><p><br /></p><p><strong>Telefonnummer : \r\n            <a href=\"tel:+4366499657071\">\r\n +4366499657071\r\n            </a>\r\n </strong>\r\n </p><p><strong>E-mail:\r\n </strong>\r\n admin@megatechapp.at\r\n    </p><p><br /></p><p><strong>Kammer: \r\n        </strong>\r\n Wirtschaftskammer Wien; Fachgruppe UBIT; Fachgruppe der gewerblichen Finanzdienstleister.\r\n    </p><p><br /></p><p>Anwendbare Vorschriften: Österr. Gewerbeordnung \r\n        <a href=\"https://www.ris.bka.gv.at/\">\r\n https://www.ris.bka.gv.at/\r\n        </a>\r\n </p><p>Sofern die MegaTech im Zuge von \"MegaTech\" in Ausübung des Gewerbes unter \r\n    </p><p><a href=\"https://www.ris.bka.gv.at/\">https://www.ris.bka.gv.at/\r\n </a>\r\n </p><p><br /></p><p>MegaTech ist an folgendem Unternehmen unmittelbar beteiligt:\r\n        <strong>\r\n Mega Tech, Weiz\r\n        </strong>\r\n </p><p><strong><br /></strong>\r\n </p><p><strong>Kontakt:\r\n </strong>\r\n Klick hier bzw. per E-Mail unter \r\n         <strong>\r\n admin@Megatechapp.at\r\n        </strong>\r\n </p><p><strong><br /></strong>\r\n </p><p>Informationen für gewerbliche Kunden zur Mediation: Im Falle einer freiwilligen außergerichtlichen Beilegung von Streitigkeiten mit gewerblichen Nutzern ist MegaTech bereit mit verschiedene Mediationsstellen zusammenzuarbeiten. \r\n    </p><p><br /></p><p><strong>Dem Stiftungsvorstand gehören an: Vorsitzender Generaldirektor\r\n        </strong>\r\n </p><p><strong>1. Einverständnis\r\n        </strong>\r\n </p><p>Megatech stellt Ihnen diese Website MegaTech Website“) und die Serviceleistungen auf Grundlage der folgenden Nutzungsbedingungen zur Verfügung. Durch Zugriff auf irgendeine Seite dieser MegaTech Website erklären Sie sich mit diesen Nutzungsbedingungen einverstanden.\r\n    </p><p><strong>2. Geltungsbereich\r\n        </strong>\r\n </p><p>MegaTech ist ausschließlich für Inhalte verantwortlich, die selbst erstellt, veröffentlicht und verbreitet werden. Die Nutzungsbedingungen gelten für die Inhalte der Website \r\n        <a href=\"http://www.Megatech.at\">\r\n www.Megatech.at\r\n        </a>\r\n sowie aller zu dieser Domain gehörenden Subdomains.\r\n    </p><p><strong>3. Copyright\r\n        </strong>\r\n </p><p>Der gesamte Inhalt (Texte, Bilder, Illustrationen, Grafiken) der Megatech Website (sowie deren Subdomains) unterliegt dem Urheberrecht und anderen Gesetzen zum Schutze geistigen Eigentums. Falls nichts anders angegeben, ist niemand berechtigt, irgendwelche Informationen dieser Website zu kopieren oder wieder zu veröffentlichen. Die dargestellten Inhalte dieser Website dürfen in keiner Weise kopiert, reproduziert, wieder veröffentlicht, herunterladen, verschickt, übertragen oder verteilt werden. Ausschließlich für den nicht kommerziellen Eigengebrauch ist das Herunterladen von Informationen auf einen Computer gestattet, unter der Bedingung, dass das Urheberrecht und die anderen Eigentumsvorbehalte beachtet werden. Ausnahmen von der Regelung sind ausdrücklich durch den Hinweis „Download“ gekennzeichnet und sind mit der entsprechenden Download-Funktionalität hinterlegt.\r\n    </p><p><strong>4. Nutzung\r\n        </strong>\r\n </p><p>Die Megatech Website steht Ihnen kostenlos zur Verfügung und darf nur für private, nicht kommerzielle Zwecke benutzt werden. Jede Art von Support zu Ihrer Unterstützung erfolgt ausschließlich um Sie zu informieren. Megatech behält sich das Recht vor, Änderungen an der Megatech Website vorzunehmen oder auf Anfragen nicht zu antworten oder keinen Support in Verbindung mit der Megatech Website anzubieten. Es ist nicht gestattet, Websites mit anstößigem oder anderweitig ungeeignetem Inhalt mit der Megatech Website zu verknüpfen oder zu verlinken. Auf Aufforderung von Megatech sind Sie verpflichtet, eine solche Verknüpfung rückgängig zu machen.\r\n    </p><p><strong>5. Haftungsbeschränkung\r\n        </strong>\r\n </p><p>Megatech hat keinerlei Kontrolle über den Inhalt von Websites die außerhalb der Megatech Website liegen auf welche direkt oder indirekt durch „Hyperlinks“ Verweisen wurde. Ewand erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten erkennbar waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder die Urheberschaft der verlinkten/verknüpften Seiten hat Ewand keinerlei Einfluss. Deshalb distanziert Ewand sich hiermit ausdrücklich von allen Inhalten aller verlinkten /verknüpften Seiten, die nach der Linksetzung verändert wurden. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.\r\n    </p><p>Die Ewand Website wird von Ihnen auf Ihr eigenes Risiko genutzt. Ewand ist nicht für Schäden verantwortlich, die Ihnen oder Dritten durch die Verwendung der Website entstehen. In jedem Fall ist die Haftung von Ewand für Einkommensausfälle oder entgangenen Gewinn, Verlust von Daten für direkte oder indirekte Schäden, gleich welcher Art, ausgeschlossen. Ewand haftet nicht für Schäden, die sich aus der Nutzung der Ewand Website oder in Verbindung mit der Nutzung, der Unmöglichkeit der Nutzung oder den Ergebnissen der Nutzung dieser Ewand Website, aller mit dieser Ewand Website verbundenen Websites oder dem Inhalt solcher Websites, einschließlich, jedoch nicht beschränkt auf Schäden die durch Fehler, Verzögerungen oder Unterbrechungen in der Übermittlung, bei Störungen der technischen Anlagen und des Services, unrichtige Inhalte, Verlust oder Löschung von Daten entstehen. Sowie Verluste oder Schäden durch Virenbefall Ihrer Computerausstattung, Software, Daten oder anderer Vermögenswerte, die durch Zugriff, Nutzung oder Browsen auf dieser Ewand Website oder durch das Herunterladen von Inhalten dieser Ewand Website oder anderen, mit dieser Ewand Website verbundenen Websites verursacht werden. Dies gilt nicht, soweit z.B. nach dem Produkthaftungsgesetz oder in Fällen des Vorsatzes zwingend gehaftet wird.\r\n    </p><p>Ewand schließt hiermit alle Zusicherungen, Gewährleistungen, Garantien oder sonstige Erklärungen in Bezug auf das Anbieten oder das beabsichtigte Anbieten, eine nicht erfolgte Ausführung oder eine verspätete Ausführung von Serviceleistungen in Verbindung mit der Ewand Website oder in Bezug auf Richtigkeit, Vollständigkeit oder Aktualität der Megatech Website aus.\r\n    </p><p><strong>6. Widerspruch Werbe-Mails\r\n        </strong>\r\n </p><p>Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.\r\n    </p><p><strong>7. Zugriffsdaten\r\n        </strong>\r\n </p><p>Der Websitebetreiber bzw. Seitenprovider erhebt Daten über Zugriffe auf die Seite und speichert diese als „Server-Logfiles“ ab. Folgende Daten werden so protokolliert: Besuchte Website, Uhrzeit zum Zeitpunkt des Zugriffes, Menge der gesendeten Daten in Byte, Quelle/Verweis, von welchem Sie auf die Seite gelangten, Verwendeter Browser, Verwendetes Betriebssystem, Verwendete IP-Adresse (ggf.: in anonymisierter Form). Die erhobenen Daten dienen lediglich statistischen Auswertungen und zur Verbesserung der Website. Der Websitebetreiber behält sich allerdings vor, die Server-Logfiles nachträglich zu überprüfen, sollten konkrete Anhaltspunkte auf eine rechtswidrige Nutzung hinweisen.\r\n    </p><p><strong>8. Anwendbares Recht\r\n        </strong>\r\n </p><p>Diese Nutzungsbedingungen unterliegen österreichischem Recht. Ausschließlicher Gerichtsstand bei Streitfragen in Zusammenhang mit diesen Nutzungsbedingungen ist Wien, Österreich\r\n    </p>', '783e43d5-f6e1-11ed-abf9-005056c00001', 'Impressum1', 'Impressum2', '2023-07-22 20:04:42', '2023-07-27 13:00:43');

-- --------------------------------------------------------

--
-- Table structure for table `parents_category`
--

CREATE TABLE `parents_category` (
  `pk_parent_category` int(11) NOT NULL,
  `title` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(256) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `parents_category`
--

INSERT INTO `parents_category` (`pk_parent_category`, `title`, `description`) VALUES
(1, 'News', 'news'),
(2, 'Projects', 'projects'),
(3, 'Testimonials', 'testimonials');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `pk_post` int(11) NOT NULL,
  `fk_user` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `summary` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fk_category` int(11) NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `thumbnail_path` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_keyword` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_description` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` enum('Published','Unpublished','Draft') COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`pk_post`, `fk_user`, `title`, `slug`, `summary`, `fk_category`, `content`, `thumbnail_path`, `meta_keyword`, `meta_description`, `status`, `created_at`, `updated_at`) VALUES
(1, '783e43d5-f6e1-11ed-abf9-005056c00001', 'Build a Winning AI Strategy for Your Business ', 'artificial_intelligence', 'Artificial intelligence is a kind of catalyst; it’s the next wave of truly transformative technology with potential we cannot yet fully envision or appreciate. Companies will start by using this new technology to do “old things” before discovering the new1', 1, '<p style=\"text-align:justify;\">Recently, like millions of people, I used a ride-sharing app on my \r\nsmartphone. It was pretty uneventful and not something I gave much \r\nthought. Ride-sharing is simple and convenient, and it’s now an <a href=\"https://www.globenewswire.com/news-release/2023/02/22/2612873/0/en/Ride-Sharing-Market-Size-worth-USD-242-73-Billion-Globally-by-2028-at-a-CAGR-of-16-3.html\">$80+ billion</a>\r\n industry. But it wasn’t that long ago that it didn’t even exist. We had\r\n cars, we had riders, and we had drivers; but to work, ride-sharing \r\nneeded smartphones. When they arrived, so did an enormous variety of \r\nconveniences and new experiences — some that became entire industries — \r\nthat we never could have imagined.</p><p style=\"text-align:justify;\">Artificial intelligence is a similar kind of catalyst; it’s the next \r\nwave of truly transformative technology with potential we cannot yet \r\nfully envision or appreciate. It is the defining technology of our time,\r\n changing the way we live and work. In my entire career in tech, I’ve <a href=\"https://hbr.org/podcast/2023/05/how-generative-ai-changes-strategy\">never been more excited</a>\r\n and optimistic than I am now. I have a colleague at Microsoft who talks\r\n about AI like this: You’ve got to use the “new thing” to do old things \r\nbetter. Then, you use the new thing to … do new things. <em>He’s right.</em></p><p style=\"text-align:justify;\">Consider an example from health care. <a href=\"https://paige.ai/\">Paige</a>\r\n is a software company using AI to change the way doctors identify, \r\ndiagnose, and treat cancers. With properly trained and tuned models, AI \r\ncan look at thousands of digital pathology images, pixel by pixel, and \r\ndetect abnormalities faster and with more accuracy. Imagine what these \r\ntools can unlock not only for pathologists and doctors, but for \r\npatients, too. It means earlier disease detection, healthier lives, and \r\nmore time with loved ones.</p><p><img src=\"https://megatechapp.com/uploads/ai164b5b5201ccf9.jpg\" alt=\"\" class=\"img-thumbnail\" /></p>', 'https://megatechapp.com/uploads/ai164b5b5201ccf9.jpg', 'AI, Tech, IT', 'The AI market is moving quickly, and the cycles in and around AI are faster than we’ve ever seen', 'Published', '2023-07-16 22:30:40', '2023-07-26 11:07:14'),
(2, '783e43d5-f6e1-11ed-abf9-005056c00001', 'Generation4 Programming', 'gen4_programming', 'Gen4 programming is the process of configuring and adjusting the settings of a Sevcon Gen4 motor controller', 1, 'Gen4 programming is the process of configuring and adjusting the settings of a Sevcon Gen4 motor controller. This can be done using the Sevcon DVT software, which is a Windows-based application that provides a graphical user interface for accessing the controller\'s parameters.\n\nThe Gen4 controller has a wide range of parameters that can be adjusted, including motor settings, controller settings, and CANopen settings. The specific parameters that need to be adjusted will vary depending on the application.\n\nGen4 programming can be a complex task, but it is essential for getting the most out of the controller. By carefully adjusting the parameters, you can optimize the controller\'s performance for your specific application.\n\nHere are some of the benefits of Gen4 programming:\n\n    Improved performance: By adjusting the controller\'s parameters, you can optimize its performance for your specific application. This can lead to improved acceleration, top speed, and efficiency.\n    Increased safety: By adjusting the controller\'s parameters, you can improve its safety features. For example, you can adjust the controller\'s overcurrent protection to prevent it from overheating.\n    Simplified troubleshooting: By understanding the controller\'s parameters, you can simplify troubleshooting. If the controller is not performing as expected, you can use the DVT software to check the parameters and identify the problem.\n\nIf you are interested in learning more about Gen4 programming, there are a number of resources available online. The Sevcon website has a comprehensive documentation section that includes tutorials, videos, and FAQs. There are also a number of third-party resources available, such as forums and blog posts.\nsmartphone. It was pretty uneventful and not something I gave much \nthought. Ride-sharing is simple and convenient, and it’s now an <a href=\"https://www.globenewswire.com/news-release/2023/02/22/2612873/0/en/Ride-Sharing-Market-Size-worth-USD-242-73-Billion-Globally-by-2028-at-a-CAGR-of-16-3.html\">$80+ billion</a>\n industry. But it wasn’t that long ago that it didn’t even exist. We had\n cars, we had riders, and we had drivers; but to work, ride-sharing \nneeded smartphones. When they arrived, so did an enormous variety of \nconveniences and new experiences — some that became entire industries — \nthat we never could have imagined.</p><p>Artificial intelligence is a similar kind of catalyst; it’s the next \nwave of truly transformative technology with potential we cannot yet \nfully envision or appreciate. It is the defining technology of our time,\n changing the way we live and work. In my entire career in tech, I’ve <a href=\"https://hbr.org/podcast/2023/05/how-generative-ai-changes-strategy\">never been more excited</a>\n and optimistic than I am now. I have a colleague at Microsoft who talks\n about AI like this: You’ve got to use the “new thing” to do old things \nbetter. Then, you use the new thing to … do new things. <em>He’s right.</em></p><p>Consider an example from health care. <a href=\"https://paige.ai/\">Paige</a>\n is a software company using AI to change the way doctors identify, \ndiagnose, and treat cancers. With properly trained and tuned models, AI \ncan look at thousands of digital pathology images, pixel by pixel, and \ndetect abnormalities faster and with more accuracy. Imagine what these \ntools can unlock not only for pathologists and doctors, but for \npatients, too. It means earlier disease detection, healthier lives, and \nmore time with loved ones.</p>', 'https://megatechapp.com/uploads/ai164b5b5201ccf9.jpg', 'AI, Tech, IT', 'The AI market is moving quickly, and the cycles in and around AI are faster than we’ve ever seen', 'Published', '2023-07-16 22:30:40', '2023-07-22 19:01:44'),
(3, '783e43d5-f6e1-11ed-abf9-005056c00001', 'Web3', 'web3', 'Web3 is a vision for the future of the internet that is built on decentralized technologies, such as blockchain and peer-to-peer networks', 1, 'Web3 is a vision for the future of the internet that is built on decentralized technologies, such as blockchain and peer-to-peer networks. The goal of Web3 is to create a more open, transparent, and democratic internet that is not controlled by a small number of centralized companies.\n\nSome of the key features of Web3 include:\n\n    Decentralization: Web3 applications are built on decentralized networks, which means that they are not controlled by a single entity. This makes them more resistant to censorship and fraud.\n    Transparency: All data on Web3 networks is stored in a public ledger, which means that it is transparent and anyone can access it. This makes it easier to audit and verify the provenance of data.\n    Ownership: Web3 users own their own data and digital assets. This means that they can control how their data is used and who has access to it.\n    Equity: Web3 applications are built on open-source software, which means that anyone can participate in their development and improvement. This makes them more equitable and accessible to everyone.\n\nSome of the potential benefits of Web3 include:\n\n    Increased privacy: Web3 applications are more private than traditional web applications because they do not rely on centralized servers. This means that users\' data is less likely to be collected and sold by third parties.\n    Improved security: Web3 applications are more secure than traditional web applications because they are not vulnerable to single points of failure. This makes them more resistant to hacking and fraud.\n    Greater user control: Web3 users have more control over their data and digital assets than traditional web users. This means that they can choose how their data is used and who has access to it.\n    New economic opportunities: Web3 creates new economic opportunities for developers, users, and investors. This is because Web3 applications are built on open-source software, which means that anyone can participate in their development and improvement.\n\nWeb3 is still in its early stages of development, but it has the potential to revolutionize the internet. If it is successful, it could create a more open, transparent, and democratic internet that is not controlled by a small number of centralized companies.\n\nHere are some of the examples of Web3 applications that are currently being developed:\n\n    Decentralized finance (DeFi): DeFi applications allow users to borrow, lend, and invest money without the need for a centralized financial institution.\n    Non-fungible tokens (NFTs): NFTs are digital assets that are unique and cannot be replaced. They can be used to represent ownership of anything from art to music to in-game items.\n    Decentralized autonomous organizations (DAOs): DAOs are organizations that are run by code and not by people. They are governed by a set of rules that are stored on a blockchain, and they are managed by the community of token holders.\n\nThese are just a few examples of the many potential applications of Web3. As the technology continues to develop, we can expect to see even more innovative and groundbreaking applications emerge.', 'https://megatechapp.com/uploads/ai164b5b5201ccf9.jpg', 'AI, Tech, IT', 'The AI market is moving quickly, and the cycles in and around AI are faster than we’ve ever seen', 'Published', '2023-07-16 22:30:40', '2023-07-17 21:44:12'),
(4, '783e43d5-f6e1-11ed-abf9-005056c00001', 'Flutter', 'flutter', 'Flutter is an open-source UI software development kit created by Google', 1, 'Flutter is an open-source UI software development kit created by Google. It is used to develop cross platform applications from a single codebase for any web browser, Fuchsia, Android, iOS, Linux, macOS, and Windows. First described in 2015, Flutter was released in May 2017.\n\nFlutter is a powerful tool that can be used to create beautiful, native-feeling applications for a variety of platforms. It is also very fast and efficient, making it a good choice for developing high-performance applications.\n\nHere are some of the benefits of using Flutter:\n\n    Cross-platform: Flutter apps can be run on Android, iOS, web, and desktop, all from a single codebase. This saves time and money, as you don\'t need to develop separate apps for each platform.\n    Native performance: Flutter apps are compiled to native code, which means that they are as fast and responsive as native apps. This is in contrast to other cross-platform frameworks, which often use a virtual machine, which can lead to performance issues.\n    Beautiful UI: Flutter widgets are built using the Material Design guidelines, which means that they look and feel native on each platform. This gives your apps a consistent and polished look.\n    Fast development: Flutter is a very fast development framework. You can write code quickly and easily, and you can see the results immediately. This makes it a good choice for rapid prototyping and development.\n\nIf you are looking for a powerful and versatile UI framework, Flutter is a great option. It is easy to learn, fast to develop with, and produces beautiful, native-feeling apps.\n\nHere are some of the popular Flutter apps:\n\n    Google Ads: The Google Ads app is a mobile app that helps businesses manage their Google Ads campaigns. It is available on Android and iOS.\n    Reflectly: Reflectly is a journaling app that helps users track their thoughts and feelings. It is available on Android and iOS.\n    Hamilton: Hamilton is a mobile game based on the Broadway musical of the same name. It is available on Android and iOS.\n    QuizUp: QuizUp is a trivia game that allows users to compete against each other in a variety of categories. It is available on Android and iOS.\n    Flutter Gallery: The Flutter Gallery is a collection of example Flutter apps that demonstrate the capabilities of the framework. It is available online.\n\nIf you are interested in learning more about Flutter, there are a number of resources available online. The Flutter website has a comprehensive documentation section that includes tutorials, videos, and FAQs. There are also a number of third-party resources available, such as forums and blog posts.', 'https://megatechapp.com/uploads/ai164b5b5201ccf9.jpg', 'AI, Tech, IT', 'The AI market is moving quickly, and the cycles in and around AI are faster than we’ve ever seen', 'Published', '2023-07-16 22:30:40', '2023-07-17 21:44:12'),
(5, '783e43d5-f6e1-11ed-abf9-005056c00001', 'Wayofhope', 'https://wayofhope.at', 'www.Wayofhope.at', 7, 'Project', 'https://megatechapp.com/uploads/64b814a6beb78.jpg', 'project', '', 'Published', '2023-07-16 22:30:40', '2023-07-19 23:54:43'),
(6, '783e43d5-f6e1-11ed-abf9-005056c00001', 'Ewand', 'https://ewand.at', 'www.Ewand.at', 7, 'Project', 'https://megatechapp.com/uploads/64b8149b5e6f6.jpg', 'project', '', 'Published', '2023-07-16 22:30:40', '2023-07-19 23:54:36'),
(7, '783e43d5-f6e1-11ed-abf9-005056c00001', 'Bill Gates, Co-founder of Microsoft', 'testimonial1', '“The advance of technology is based on making it fit in so that you don\'t really even notice it, so it\'s part of everyday life.”', 8, '<p><img src=\"https://megatechapp.com/uploads/ai164b5b5201ccf9.jpg\" alt=\"\" width=\"660\" height=\"371\" /></p><p>Recently, like millions of people, I used a ride-sharing app on my \r\nsmartphone. It was pretty uneventful and not something I gave much \r\nthought. Ride-sharing is simple and convenient, and it’s now an <a href=\"https://www.globenewswire.com/news-release/2023/02/22/2612873/0/en/Ride-Sharing-Market-Size-worth-USD-242-73-Billion-Globally-by-2028-at-a-CAGR-of-16-3.html\">$80+ billion</a>\r\n industry. But it wasn’t that long ago that it didn’t even exist. We had\r\n cars, we had riders, and we had drivers; but to work, ride-sharing \r\nneeded smartphones. When they arrived, so did an enormous variety of \r\nconveniences and new experiences — some that became entire industries — \r\nthat we never could have imagined.</p><p>Artificial intelligence is a similar kind of catalyst; it’s the next \r\nwave of truly transformative technology with potential we cannot yet \r\nfully envision or appreciate. It is the defining technology of our time,\r\n changing the way we live and work. In my entire career in tech, I’ve <a href=\"https://hbr.org/podcast/2023/05/how-generative-ai-changes-strategy\">never been more excited</a>\r\n and optimistic than I am now. I have a colleague at Microsoft who talks\r\n about AI like this: You’ve got to use the “new thing” to do old things \r\nbetter. Then, you use the new thing to … do new things. <em>He’s right.</em></p><p>Consider an example from health care. <a href=\"https://paige.ai/\">Paige</a>\r\n is a software company using AI to change the way doctors identify, \r\ndiagnose, and treat cancers. With properly trained and tuned models, AI \r\ncan look at thousands of digital pathology images, pixel by pixel, and \r\ndetect abnormalities faster and with more accuracy. Imagine what these \r\ntools can unlock not only for pathologists and doctors, but for \r\npatients, too. It means earlier disease detection, healthier lives, and \r\nmore time with loved ones.</p>', 'https://megatechapp.com/uploads/ai164b5b5201ccf9.jpg', 'AI, Tech, IT', 'The AI market is moving quickly, and the cycles in and around AI are faster than we’ve ever seen', 'Published', '2023-07-16 22:30:40', '2023-07-19 23:54:18'),
(8, '783e43d5-f6e1-11ed-abf9-005056c00001', 'Steve Jobs, Co-founder of Apple', 'testimonial2', '“It\'s not a faith in technology. It\'s faith in people.”', 8, '<p><img src=\"https://megatechapp.com/uploads/ai164b5b5201ccf9.jpg\" alt=\"\" width=\"660\" height=\"371\" /></p><p>Recently, like millions of people, I used a ride-sharing app on my \r\nsmartphone. It was pretty uneventful and not something I gave much \r\nthought. Ride-sharing is simple and convenient, and it’s now an <a href=\"https://www.globenewswire.com/news-release/2023/02/22/2612873/0/en/Ride-Sharing-Market-Size-worth-USD-242-73-Billion-Globally-by-2028-at-a-CAGR-of-16-3.html\">$80+ billion</a>\r\n industry. But it wasn’t that long ago that it didn’t even exist. We had\r\n cars, we had riders, and we had drivers; but to work, ride-sharing \r\nneeded smartphones. When they arrived, so did an enormous variety of \r\nconveniences and new experiences — some that became entire industries — \r\nthat we never could have imagined.</p><p>Artificial intelligence is a similar kind of catalyst; it’s the next \r\nwave of truly transformative technology with potential we cannot yet \r\nfully envision or appreciate. It is the defining technology of our time,\r\n changing the way we live and work. In my entire career in tech, I’ve <a href=\"https://hbr.org/podcast/2023/05/how-generative-ai-changes-strategy\">never been more excited</a>\r\n and optimistic than I am now. I have a colleague at Microsoft who talks\r\n about AI like this: You’ve got to use the “new thing” to do old things \r\nbetter. Then, you use the new thing to … do new things. <em>He’s right.</em></p><p>Consider an example from health care. <a href=\"https://paige.ai/\">Paige</a>\r\n is a software company using AI to change the way doctors identify, \r\ndiagnose, and treat cancers. With properly trained and tuned models, AI \r\ncan look at thousands of digital pathology images, pixel by pixel, and \r\ndetect abnormalities faster and with more accuracy. Imagine what these \r\ntools can unlock not only for pathologists and doctors, but for \r\npatients, too. It means earlier disease detection, healthier lives, and \r\nmore time with loved ones.</p>', 'https://megatechapp.com/uploads/ai164b5b5201ccf9.jpg', 'AI, Tech, IT', 'The AI market is moving quickly, and the cycles in and around AI are faster than we’ve ever seen', 'Published', '2023-07-16 22:30:40', '2023-07-19 23:54:07'),
(9, '783e43d5-f6e1-11ed-abf9-005056c00001', 'Michael Dell, \r\nChief Executive Officer of Dell', 'testimonial3', '“Our business is about technology, yes. But it’s also about operations and customer relationships.”', 8, '<p><img src=\"https://megatechapp.com/uploads/ai164b5b5201ccf9.jpg\" alt=\"\" width=\"660\" height=\"371\" /></p><p>Recently, like millions of people, I used a ride-sharing app on my \r\nsmartphone. It was pretty uneventful and not something I gave much \r\nthought. Ride-sharing is simple and convenient, and it’s now an <a href=\"https://www.globenewswire.com/news-release/2023/02/22/2612873/0/en/Ride-Sharing-Market-Size-worth-USD-242-73-Billion-Globally-by-2028-at-a-CAGR-of-16-3.html\">$80+ billion</a>\r\n industry. But it wasn’t that long ago that it didn’t even exist. We had\r\n cars, we had riders, and we had drivers; but to work, ride-sharing \r\nneeded smartphones. When they arrived, so did an enormous variety of \r\nconveniences and new experiences — some that became entire industries — \r\nthat we never could have imagined.</p><p>Artificial intelligence is a similar kind of catalyst; it’s the next \r\nwave of truly transformative technology with potential we cannot yet \r\nfully envision or appreciate. It is the defining technology of our time,\r\n changing the way we live and work. In my entire career in tech, I’ve <a href=\"https://hbr.org/podcast/2023/05/how-generative-ai-changes-strategy\">never been more excited</a>\r\n and optimistic than I am now. I have a colleague at Microsoft who talks\r\n about AI like this: You’ve got to use the “new thing” to do old things \r\nbetter. Then, you use the new thing to … do new things. <em>He’s right.</em></p><p>Consider an example from health care. <a href=\"https://paige.ai/\">Paige</a>\r\n is a software company using AI to change the way doctors identify, \r\ndiagnose, and treat cancers. With properly trained and tuned models, AI \r\ncan look at thousands of digital pathology images, pixel by pixel, and \r\ndetect abnormalities faster and with more accuracy. Imagine what these \r\ntools can unlock not only for pathologists and doctors, but for \r\npatients, too. It means earlier disease detection, healthier lives, and \r\nmore time with loved ones.</p>', 'https://megatechapp.com/uploads/ai164b5b5201ccf9.jpg', 'AI, Tech, IT', 'The AI market is moving quickly, and the cycles in and around AI are faster than we’ve ever seen', 'Published', '2023-07-16 22:30:40', '2023-07-19 23:53:39'),
(11, '783e43d5-f6e1-11ed-abf9-005056c00001', 'Elon Musk, founder of SpaceX', 'testimonial4', '\"The best process is no process. It weighs nothing. Costs nothing. Can\'t go wrong.”', 8, ' ', '', '', '', 'Published', '2023-07-19 20:15:47', '2023-07-19 23:53:49');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `pk_role` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(64) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`pk_role`, `title`, `description`) VALUES
('1e36bdec-105f-11ee-a331-02420a80ff02', 'ContactUs', 'role_contact_us'),
('2218c3f6-06cf-11ee-a331-02420a80ff02', 'PermissionLevelManagement', 'role_permission_level_management'),
('2499eba9-0707-11ee-a331-02420a80ff02', 'SlideshowManagement', 'role_slideshow_management'),
('5f96a420-26f9-11ee-a331-02420a80ff02', 'PageManagement', 'role_page_management'),
('681c6592-2227-11ee-a331-02420a80ff02', 'MediaManagement', 'role_media_management'),
('69e46abd-0707-11ee-a331-02420a80ff02', 'AdvertisementManagement', 'role_advertisement_management'),
('eccd34ab-1dd6-11ee-a331-02420a80ff02', 'PostManagement', 'role_post_management');

-- --------------------------------------------------------

--
-- Table structure for table `roles_in_group`
--

CREATE TABLE `roles_in_group` (
  `fk_group_role` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `fk_role` varchar(64) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles_in_group`
--

INSERT INTO `roles_in_group` (`fk_group_role`, `fk_role`) VALUES
('c81d335a-058d-11ee-a331-02420a80ff02', '1e36bdec-105f-11ee-a331-02420a80ff02'),
('c81d335a-058d-11ee-a331-02420a80ff02', '2218c3f6-06cf-11ee-a331-02420a80ff02'),
('c81d335a-058d-11ee-a331-02420a80ff02', '2499eba9-0707-11ee-a331-02420a80ff02'),
('c81d335a-058d-11ee-a331-02420a80ff02', '5f96a420-26f9-11ee-a331-02420a80ff02'),
('c81d335a-058d-11ee-a331-02420a80ff02', '681c6592-2227-11ee-a331-02420a80ff02'),
('c81d335a-058d-11ee-a331-02420a80ff02', '69e46abd-0707-11ee-a331-02420a80ff02'),
('c81d335a-058d-11ee-a331-02420a80ff02', 'eccd34ab-1dd6-11ee-a331-02420a80ff02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `pk_user` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `mobile` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `login_attempt` int(11) DEFAULT NULL,
  `is_locked` tinyint(1) DEFAULT NULL,
  `last_locked_date` datetime DEFAULT NULL,
  `is_approved` tinyint(1) DEFAULT NULL,
  `approved_date` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `last_login_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`pk_user`, `username`, `password`, `firstname`, `lastname`, `mobile`, `email`, `login_attempt`, `is_locked`, `last_locked_date`, `is_approved`, `approved_date`, `is_active`, `last_login_date`, `created_at`, `updated_at`, `deleted_at`) VALUES
('24ba69a6-f71d-11ed-a331-02420a80ff02', 'svs.3001@gmail.com', '$2y$10$GlPcuWATBJxvNLVIoDGALeJlgmmLBfgvyd6E8dC9vDIytOMfjy7Ty', 'vahid', 'seyedin', '912', 'svs', NULL, NULL, NULL, NULL, NULL, 0, NULL, '2023-05-20 14:45:46', '2023-05-20 14:45:46', '2023-05-20 14:45:46'),
('783e43d5-f6e1-11ed-abf9-005056c00001', 'admin@megatechapp.com', '$2y$10$qf9qD9.gjaPFooLsv5DgAOXeSvQwEqYlPs25q2lfoIxj4CyDTe8By', 'Main', 'admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '2023-05-20 07:39:21', '2023-05-20 07:39:21', '2023-05-20 07:39:21'),
('bfb47375-f9a9-11ed-a331-02420a80ff02', 'ertebat@gmail.com', '$2y$10$ungckCJ8kiOJCiuzF.Thqu1/Kb8FdWbY/kdhWhEUCoHYF2WNMlCvG', 'behnam', 'Noobe Sag', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users_in_group`
--

CREATE TABLE `users_in_group` (
  `fk_group_role` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `fk_user` varchar(64) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users_in_group`
--

INSERT INTO `users_in_group` (`fk_group_role`, `fk_user`) VALUES
('c81d335a-058d-11ee-a331-02420a80ff02', '783e43d5-f6e1-11ed-abf9-005056c00001'),
('c81d335a-058d-11ee-a331-02420a80ff02', 'bfb47375-f9a9-11ed-a331-02420a80ff02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`pk_category`),
  ADD KEY `categories-parents_category` (`fk_parent_category`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`pk_contact_us`);

--
-- Indexes for table `group_roles`
--
ALTER TABLE `group_roles`
  ADD PRIMARY KEY (`pk_group_role`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `medias`
--
ALTER TABLE `medias`
  ADD PRIMARY KEY (`pk_media`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`pk_page`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `parents_category`
--
ALTER TABLE `parents_category`
  ADD PRIMARY KEY (`pk_parent_category`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`pk_post`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `posts-categories` (`fk_category`),
  ADD KEY `post-users` (`fk_user`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`pk_role`),
  ADD UNIQUE KEY `role_name` (`title`);

--
-- Indexes for table `roles_in_group`
--
ALTER TABLE `roles_in_group`
  ADD PRIMARY KEY (`fk_group_role`,`fk_role`),
  ADD KEY `roles_in_group-roles` (`fk_role`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`pk_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `users_in_group`
--
ALTER TABLE `users_in_group`
  ADD PRIMARY KEY (`fk_group_role`,`fk_user`),
  ADD KEY `users_in_group-users` (`fk_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `pk_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `pk_contact_us` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `medias`
--
ALTER TABLE `medias`
  MODIFY `pk_media` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `pk_page` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `parents_category`
--
ALTER TABLE `parents_category`
  MODIFY `pk_parent_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `pk_post` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories-parents_category` FOREIGN KEY (`fk_parent_category`) REFERENCES `parents_category` (`pk_parent_category`) ON UPDATE NO ACTION;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `post-users` FOREIGN KEY (`fk_user`) REFERENCES `users` (`pk_user`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `posts-categories` FOREIGN KEY (`fk_category`) REFERENCES `categories` (`pk_category`) ON UPDATE NO ACTION;

--
-- Constraints for table `roles_in_group`
--
ALTER TABLE `roles_in_group`
  ADD CONSTRAINT `roles_in_group-group_roles` FOREIGN KEY (`fk_group_role`) REFERENCES `group_roles` (`pk_group_role`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `roles_in_group-roles` FOREIGN KEY (`fk_role`) REFERENCES `roles` (`pk_role`) ON UPDATE NO ACTION;

--
-- Constraints for table `users_in_group`
--
ALTER TABLE `users_in_group`
  ADD CONSTRAINT `users_in_group-group_roles` FOREIGN KEY (`fk_group_role`) REFERENCES `group_roles` (`pk_group_role`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `users_in_group-users` FOREIGN KEY (`fk_user`) REFERENCES `users` (`pk_user`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
