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

-- 테이블 speakon.interview_room 구조 내보내기
DROP TABLE IF EXISTS `interview_room`;
CREATE TABLE IF NOT EXISTS `interview_room` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `contact_way` varchar(200) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `finished` tinyint(1) NOT NULL,
  `max_person_count` int(11) NOT NULL,
  `password` varchar(20) DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `title` varchar(30) NOT NULL,
  `manager_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK94qumlnbn8yiam4c50jkqfcku` (`manager_id`),
  CONSTRAINT `FK94qumlnbn8yiam4c50jkqfcku` FOREIGN KEY (`manager_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 speakon.interview_room:~16 rows (대략적) 내보내기
INSERT INTO `interview_room` (`id`, `created_date`, `contact_way`, `description`, `finished`, `max_person_count`, `password`, `start_date`, `title`, `manager_id`) VALUES
	(2, '2023-02-13 03:43:31.849903', NULL, '삼성 모의면접방입니다.', 1, 2, NULL, '2023-02-13 00:00:00.000000', '삼성 모의면접', 1),
	(7, '2023-02-13 03:47:09.496910', NULL, '모의면접 스터디원 구합니다', 0, 2, NULL, '2023-02-13 15:00:00.000000', '네이버 최종 준비', 6),
	(31, '2023-02-13 09:29:08.886446', NULL, '카카오 1차 면접 준비', 1, 2, '2', '2023-04-01 12:00:00.000000', '카카오 1차 면접준비', 30),
	(67, '2023-02-14 10:56:15.991665', NULL, 'ㄱㄱㄱㄱㄱㄱ', 1, 4, NULL, '2023-02-14 00:00:00.000000', '카카오 1차 면접준비', 57),
	(83, '2023-02-14 10:59:39.218559', NULL, 'ㅁㄴㅇㄴㅁㅇㅁㄴ', 0, 2, NULL, '2023-02-14 00:00:00.000000', 'CS 면접 대비방', 57),
	(85, '2023-02-14 10:59:44.098198', NULL, 'ㅁㄴㅇㅁㄴㅇㅁㄴ', 0, 2, NULL, '2023-02-14 00:00:00.000000', '인성 면접 준비', 57),
	(130, '2023-02-14 15:47:43.306459', NULL, '하이요', 1, 2, NULL, '2023-02-15 00:00:00.000000', '카카오 2차 면접준비', 1),
	(152, '2023-02-15 09:22:57.618454', NULL, '하이하이', 1, 2, NULL, '2023-02-15 00:00:00.000000', '스터디', 151),
	(171, '2023-02-15 12:06:48.064091', NULL, '1234', 1, 2, NULL, '2023-02-16 09:00:00.000000', '모의 면접 스터디', 6),
	(173, '2023-02-15 13:37:22.381179', NULL, '포드림 2차 면접 대비 스터디입니다.', 1, 2, NULL, '2023-02-25 00:00:00.000000', '카카오 2차 면접대비', 30),
	(198, '2023-02-15 17:12:44.720215', NULL, 'ㅇㄴㄹ', 1, 2, NULL, '2023-02-18 00:00:00.000000', '카카오 2차 면접대비', 28),
	(217, '2023-02-15 23:32:14.130968', '01089648573', '예의바른 고양이 주영', 1, 2, NULL, '2023-02-15 15:00:00.000000', '주영이 면접', 6),
	(242, '2023-02-15 23:53:51.364710', '전화', '아', 0, 3, '1234', '2023-02-23 15:00:00.000000', '카인턴 1차 면접대비', 241),
	(264, '2023-02-16 11:52:41.897798', 'ㅎㅎㅎ', '민지들어와', 1, 2, NULL, '2023-02-18 18:00:00.000000', 'CS면접대비', 28),
	(280, '2023-02-16 13:18:54.416098', '', '다들 화이팅', 1, 4, NULL, '2023-02-15 15:00:00.000000', 'ㅎ', 279),
	(290, '2023-02-16 17:25:04.775801', '카카오톡(2heedol)', '당근 마켓 1차 면접을 대비하는 방입니다.', 1, 4, NULL, '2023-02-15 15:00:00.000000', '당근마켓 1차 대비', 1),
	(359, '2023-02-16 21:13:59.649980', 'ㅇㄴ', 'ㅇㄴ', 0, 2, NULL, '2023-02-22 15:00:00.000000', '당근마켓 1차 대비', 358),
	(361, '2023-02-16 21:27:01.090994', '01089648573', '3월 10일 진행 되는 현대 오토에버 면접 준비하실 분 구합니다.', 0, 4, NULL, '2023-02-17 00:00:00.000000', '현대 오토에버 면접 준비', 6),
	(391, '2023-02-16 23:49:28.143795', '010-1234-5678', '싸피 면접 준비 스터디 입니드', 1, 3, NULL, '2023-03-04 09:00:00.000000', 'SSAFY 면접 준비', 30),
	(409, '2023-02-16 23:56:06.262394', '', '123', 1, 3, NULL, '2023-02-23 00:00:00.000000', '비디오테스트', 30),
	(456, '2023-02-17 00:39:38.879995', '010-8964-8573', '싸피 10기 면접을 위한 면접 스터디 방 입니다. ', 0, 4, NULL, '2023-02-17 00:00:00.000000', 'SSAFY 10기 면접 준비 방 ', 6),
	(460, '2023-02-17 01:33:19.588960', '010-1234-5678', '싸피 면접 준비 스터디 입니드', 0, 3, NULL, '2023-03-04 00:00:00.000000', 'SSAFY 면접 준비', 30);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
