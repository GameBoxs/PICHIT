-- --------------------------------------------------------
-- 호스트:                          i8d107.p.ssafy.io
-- 서버 버전:                        10.10.2-MariaDB-1:10.10.2+maria~ubu2204 - mariadb.org binary distribution
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 테이블 speakon.resume 구조 내보내기
DROP TABLE IF EXISTS `resume`;
CREATE TABLE IF NOT EXISTS `resume` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `data_file_id` bigint(20) DEFAULT NULL,
  `interview_join_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_cqdyl0iq0s1ljs0a76b0u274s` (`interview_join_id`),
  KEY `FK3gm07hg29hodkbaom74awoqok` (`data_file_id`),
  CONSTRAINT `FK2o054tdllt78dh9ydck7rm950` FOREIGN KEY (`interview_join_id`) REFERENCES `interview_join` (`id`),
  CONSTRAINT `FK3gm07hg29hodkbaom74awoqok` FOREIGN KEY (`data_file_id`) REFERENCES `data_file` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 speakon.resume:~18 rows (대략적) 내보내기
INSERT INTO `resume` (`id`, `created_date`, `data_file_id`, `interview_join_id`) VALUES
	(5, '2023-02-13 03:44:30.617417', 4, 3),
	(11, '2023-02-13 03:47:33.567681', 10, 9),
	(35, '2023-02-13 09:29:26.348302', 34, 33),
	(55, '2023-02-13 13:32:29.836138', 54, 32),
	(70, '2023-02-14 10:56:39.850712', 69, 68),
	(88, '2023-02-14 10:59:47.841014', 87, 86),
	(155, '2023-02-15 09:23:45.291867', 154, 153),
	(158, '2023-02-15 09:24:35.761360', 157, 156),
	(183, '2023-02-15 13:38:12.477853', 182, 177),
	(185, '2023-02-15 13:38:19.094565', 184, 174),
	(201, '2023-02-15 17:12:49.064776', 200, 199),
	(207, '2023-02-15 17:12:59.350315', 206, 202),
	(222, '2023-02-15 23:33:52.786452', 221, 218),
	(227, '2023-02-15 23:34:53.591648', 226, 220),
	(248, '2023-02-15 23:57:03.952327', 247, 244),
	(267, '2023-02-16 11:52:53.098298', 266, 265),
	(270, '2023-02-16 11:53:10.597620', 269, 268),
	(285, '2023-02-16 13:19:39.954834', 284, 283),
	(294, '2023-02-16 17:25:15.657791', 293, 291),
	(296, '2023-02-16 17:25:19.017493', 295, 292),
	(299, '2023-02-16 17:25:43.160700', 298, 297),
	(369, '2023-02-16 22:37:59.590939', 368, 362),
	(394, '2023-02-16 23:49:35.205216', 393, 392),
	(397, '2023-02-16 23:50:54.209889', 396, 395),
	(400, '2023-02-16 23:51:11.959398', 399, 398),
	(459, '2023-02-17 00:57:09.565314', 458, 457),
	(465, '2023-02-17 01:34:40.377388', 464, 461);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
