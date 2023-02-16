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

-- 테이블 speakon.interview_recording 구조 내보내기
DROP TABLE IF EXISTS `interview_recording`;
CREATE TABLE IF NOT EXISTS `interview_recording` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `data_file_id` bigint(20) DEFAULT NULL,
  `interview_join_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_3dl9s7clhdt7eyx7npwnvgay` (`interview_join_id`),
  KEY `FKi040hbg13x77ewpeloi4q7mks` (`data_file_id`),
  CONSTRAINT `FK25mga9n668gjo8p63lpbc0skr` FOREIGN KEY (`interview_join_id`) REFERENCES `interview_join` (`id`),
  CONSTRAINT `FKi040hbg13x77ewpeloi4q7mks` FOREIGN KEY (`data_file_id`) REFERENCES `data_file` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 speakon.interview_recording:~20 rows (대략적) 내보내기
INSERT INTO `interview_recording` (`id`, `created_date`, `data_file_id`, `interview_join_id`) VALUES
	(19, '2023-02-13 03:52:00.909312', 18, 9),
	(25, '2023-02-13 03:53:07.794830', 24, 3),
	(45, '2023-02-13 09:32:17.968464', 44, 33),
	(51, '2023-02-13 09:33:15.729115', 50, 32),
	(73, '2023-02-14 10:58:23.256875', 72, 71),
	(115, '2023-02-14 11:04:21.264831', 114, 89),
	(127, '2023-02-14 12:49:37.065921', 126, 68),
	(137, '2023-02-14 15:48:45.378022', 136, 132),
	(141, '2023-02-14 15:49:11.266009', 140, 131),
	(166, '2023-02-15 09:27:32.813497', 165, 156),
	(194, '2023-02-15 13:52:37.561199', 193, 177),
	(211, '2023-02-15 17:14:04.933807', 210, 202),
	(215, '2023-02-15 17:14:18.587450', 214, 199),
	(232, '2023-02-15 23:37:37.631947', 231, 220),
	(238, '2023-02-15 23:38:53.417135', 237, 218),
	(253, '2023-02-16 00:06:02.490786', 252, 244),
	(257, '2023-02-16 00:07:52.654891', 256, 172),
	(273, '2023-02-16 11:55:09.649945', 272, 268),
	(276, '2023-02-16 11:55:47.627924', 275, 265),
	(288, '2023-02-16 13:23:42.486125', 287, 283),
	(329, '2023-02-16 17:41:26.725206', 328, 297),
	(342, '2023-02-16 17:43:47.855855', 341, 292),
	(354, '2023-02-16 17:46:59.640739', 353, 291),
	(431, '2023-02-17 00:24:03.860730', 430, 398),
	(449, '2023-02-17 00:29:25.183620', 448, 392);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
