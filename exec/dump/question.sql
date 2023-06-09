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

-- 테이블 speakon.question 구조 내보내기
DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `content` varchar(200) NOT NULL,
  `started_time` datetime(6) DEFAULT NULL,
  `interview_join_id` bigint(20) NOT NULL,
  `writer_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK72euct009rfu57da23fku7aw` (`interview_join_id`),
  KEY `FKmw3k1iih6cjoa4854rb38wifw` (`writer_id`),
  CONSTRAINT `FK72euct009rfu57da23fku7aw` FOREIGN KEY (`interview_join_id`) REFERENCES `interview_join` (`id`),
  CONSTRAINT `FKmw3k1iih6cjoa4854rb38wifw` FOREIGN KEY (`writer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 speakon.question:~55 rows (대략적) 내보내기
INSERT INTO `question` (`id`, `created_date`, `content`, `started_time`, `interview_join_id`, `writer_id`) VALUES
	(12, '2023-02-13 03:48:18.544628', '삼성에 지원한 이유가 무엇인가요?', '2023-02-13 03:52:27.516665', 3, 6),
	(13, '2023-02-13 03:48:55.364639', '지원동기를 말해주세요.', '2023-02-13 03:51:22.391402', 9, 1),
	(14, '2023-02-13 03:48:59.594174', '향후 입사하게 된다면 이루고 싶은 목표가 있나요?', '2023-02-13 03:52:41.839073', 3, 6),
	(15, '2023-02-13 03:49:02.206394', '왜 개발자가 되고 싶나요?', '2023-02-13 03:51:42.589029', 9, 1),
	(38, '2023-02-13 09:30:16.338766', '태블릿의 기종이 뭔가요?', '2023-02-13 09:32:37.238246', 32, 1),
	(39, '2023-02-13 09:30:19.921628', '태블릿이 좋은가요?', '2023-02-13 09:32:56.214596', 32, 1),
	(40, '2023-02-13 09:30:40.389036', '질문1', '2023-02-13 09:31:32.090936', 33, 30),
	(41, '2023-02-13 09:30:44.820964', '질문2', '2023-02-13 09:31:50.415650', 33, 30),
	(74, '2023-02-14 10:58:47.337748', '질문', NULL, 71, 57),
	(75, '2023-02-14 10:58:47.760325', '1', NULL, 71, 57),
	(77, '2023-02-14 10:58:59.439674', 'ㅇ', NULL, 71, 57),
	(78, '2023-02-14 10:58:59.480784', 'ㅇㄴ', NULL, 71, 57),
	(79, '2023-02-14 10:58:59.502833', 'ㅇㄴㅁ', NULL, 71, 57),
	(80, '2023-02-14 10:59:00.174519', 'ㅁㅇㅁㄴㅇㄴㅁㅇ', NULL, 71, 57),
	(81, '2023-02-14 10:59:00.324851', '', NULL, 71, 57),
	(82, '2023-02-14 10:59:00.459033', '', NULL, 71, 57),
	(90, '2023-02-14 11:00:06.829531', 'ㅁㄴㄻㄴㄻㄴㅇㄻㄴㄻㄴㄹ', '2023-02-14 11:00:44.864363', 89, 57),
	(91, '2023-02-14 11:00:08.298985', 'ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴ', '2023-02-14 11:03:02.273645', 89, 57),
	(92, '2023-02-14 11:00:08.967776', '', NULL, 89, 57),
	(93, '2023-02-14 11:00:09.406858', '', '2023-02-14 11:03:14.353268', 89, 57),
	(94, '2023-02-14 11:00:09.628770', '', NULL, 89, 57),
	(95, '2023-02-14 11:00:09.814711', '', NULL, 89, 57),
	(96, '2023-02-14 11:00:09.986875', '', '2023-02-14 11:02:52.693925', 89, 57),
	(97, '2023-02-14 11:00:10.169658', '', NULL, 89, 57),
	(98, '2023-02-14 11:00:10.345732', '', NULL, 89, 57),
	(99, '2023-02-14 11:00:10.511777', '', NULL, 89, 57),
	(100, '2023-02-14 11:00:10.704935', '', '2023-02-14 11:02:39.577366', 89, 57),
	(101, '2023-02-14 11:00:10.887550', '', '2023-02-14 11:02:44.844166', 89, 57),
	(102, '2023-02-14 11:00:11.070678', '', NULL, 89, 57),
	(103, '2023-02-14 11:00:11.381933', '', NULL, 89, 57),
	(104, '2023-02-14 11:00:11.538553', '', NULL, 89, 57),
	(105, '2023-02-14 11:00:11.709283', '', NULL, 89, 57),
	(106, '2023-02-14 11:00:11.867581', '', NULL, 89, 57),
	(107, '2023-02-14 11:00:12.035851', '', NULL, 89, 57),
	(133, '2023-02-14 15:48:12.543577', '행복', '2023-02-14 15:48:57.444846', 131, 30),
	(134, '2023-02-14 15:48:13.543260', '뮤', '2023-02-14 15:48:34.874637', 132, 1),
	(159, '2023-02-15 09:24:57.149663', '프론트엔드 개발자가 되고 싶은 이유는 무엇인가요?', NULL, 153, 1),
	(160, '2023-02-15 09:25:06.860188', '10년 뒤에 어떤 개발자가 되어있었으면 좋겠나요?', NULL, 153, 1),
	(161, '2023-02-15 09:25:43.078220', '싸피가 무엇인가요?', '2023-02-15 09:26:36.222160', 156, 151),
	(162, '2023-02-15 09:25:47.787810', '자기소개해주세요', NULL, 156, 151),
	(163, '2023-02-15 09:25:54.868529', 'get방식과 post방식의 차이는?', NULL, 156, 151),
	(186, '2023-02-15 13:39:37.721747', '본인 성격의 장단점을 말씀해주세요', '2023-02-15 13:48:20.982335', 177, 30),
	(187, '2023-02-15 13:40:04.164578', '디스패처 서블릿에 대해 설명해보세요', '2023-02-15 13:49:47.394557', 177, 30),
	(188, '2023-02-15 13:44:40.009224', '인터셉터와 필터의 차이를 알려주세요.', NULL, 174, 1),
	(189, '2023-02-15 13:47:44.123099', '이 회사에 입사하고 싶은 이유는?', '2023-02-15 13:51:12.107171', 177, 30),
	(203, '2023-02-15 17:12:56.001041', 'ㅁㄻㄴㅇㄹㄴㅁㅇㄹ', '2023-02-15 17:13:27.197855', 202, 28),
	(204, '2023-02-15 17:12:57.434194', 'ㄹㅇㄴㅁㄹㅇㄴㄹㄴㅇㅁㄹ', '2023-02-15 17:13:49.059205', 202, 28),
	(223, '2023-02-15 23:33:53.700403', '자기소개서 어디감', '2023-02-15 23:38:13.731419', 218, 219),
	(224, '2023-02-15 23:34:08.082946', '주영이는 언제부터 예뻤나요?', '2023-02-15 23:36:44.913994', 220, 6),
	(225, '2023-02-15 23:34:27.579382', '주영이는 왜 예의가 바른가요?', '2023-02-15 23:37:12.247466', 220, 6),
	(228, '2023-02-15 23:35:51.420569', '민지는 왜 기여워요?', '2023-02-15 23:38:23.887345', 218, 219),
	(245, '2023-02-15 23:55:19.422024', '저 내일 면접임', NULL, 172, 241),
	(246, '2023-02-15 23:56:59.341662', '우리 회사에 지원한 이유가 무엇인가요?', '2023-02-16 00:05:01.674404', 244, 6),
	(249, '2023-02-15 23:57:51.952406', '해당 논문을 쓰면서 가장 어려웠던 점이 무엇인가요?', '2023-02-16 00:05:27.221389', 244, 6),
	(271, '2023-02-16 11:53:22.503119', '비선형이 무엇인가요?', '2023-02-16 11:55:18.016421', 265, 6),
	(300, '2023-02-16 17:25:54.743549', '오', NULL, 291, 56),
	(301, '2023-02-16 17:25:57.640412', '진짜 pdf네', NULL, 291, 56),
	(302, '2023-02-16 17:26:13.430354', '희수는 무슨 한자인가요', '2023-02-16 17:44:32.925832', 291, 56),
	(304, '2023-02-16 17:26:23.351356', '프론트 엔드 개발자를 희망하시는 이유가 무엇인가요?', '2023-02-16 17:41:36.906124', 292, 1),
	(305, '2023-02-16 17:26:24.637525', '어떤 직무를 원하시나요?', NULL, 292, 289),
	(306, '2023-02-16 17:26:46.884580', 'jira 좋아하시나요', '2023-02-16 17:41:09.635097', 297, 56),
	(307, '2023-02-16 17:26:56.692014', '왜 이렇게 건방지신가요', '2023-02-16 17:40:34.261061', 297, 56),
	(308, '2023-02-16 17:27:03.007771', '희망 연봉이 어떻게 되시나요?', '2023-02-16 17:43:18.402709', 292, 289),
	(309, '2023-02-16 17:27:05.735710', 'KIM JH 남자라는 칭호가 따라다니게 된 이유가 무엇인가요?', '2023-02-16 17:39:53.425881', 297, 1),
	(310, '2023-02-16 17:27:28.749255', '야근은 필수고 포괄 임금제 인데 괜찮으신가요?', '2023-02-16 17:46:03.443167', 291, 289),
	(311, '2023-02-16 17:27:32.190794', '기쁠 때 무엇을 해야하나요?', '2023-02-16 17:39:13.040941', 297, 1),
	(312, '2023-02-16 17:27:40.929161', '회사에 궁금한점 있으신가요?', NULL, 291, 289),
	(313, '2023-02-16 17:27:42.842046', '자신은 상중하 중 어떤 남자라고 생각하나요?', '2023-02-16 17:37:30.162051', 297, 56),
	(314, '2023-02-16 17:27:48.302976', '술은 잘 마시나요?', '2023-02-16 17:43:59.164154', 291, 289),
	(315, '2023-02-16 17:27:54.362726', '운전 면허증은 있으신가요?', NULL, 291, 289),
	(316, '2023-02-16 17:28:02.742612', '만약 상사가 능력이 부족하다면 어떻게 하실 건가요?', '2023-02-16 17:42:22.718922', 292, 1),
	(317, '2023-02-16 17:28:06.129242', '엔프피라고 했는데 별로 안 활발하시네요', NULL, 291, 56),
	(366, '2023-02-16 21:32:33.026816', '안녕하세요 동주님', NULL, 360, 6),
	(367, '2023-02-16 21:32:42.060595', '면접 진행 해주세요!', NULL, 360, 6),
	(401, '2023-02-16 23:53:02.073659', '자신의 성격 장단점에 대해 말해주세요', '2023-02-17 00:19:46.616460', 398, 30),
	(402, '2023-02-16 23:53:10.654367', '디스패처 서블릿에 대해 설명해주세요', '2023-02-17 00:21:12.708828', 398, 30),
	(403, '2023-02-16 23:53:45.373032', '백엔드 개발자가 되고 싶은 이유가 무엇인가요?', '2023-02-17 00:24:27.914009', 392, 1),
	(404, '2023-02-16 23:53:46.099557', '우리 회사에 지원한 동기를 말해 보시오 .', '2023-02-17 00:26:57.445035', 392, 6),
	(405, '2023-02-16 23:53:55.826033', '팀 프로젝트를 진행 할 때 어려웠던 점을 극복 한 경험이 있나요?  경험이 있다면 구체적으로 극복한 점을 이야기 해주세요 ', '2023-02-17 00:27:41.547303', 392, 6),
	(406, '2023-02-16 23:53:56.728607', 'Rest 개념에 대해 설명해 보세요.', '2023-02-17 00:25:22.990826', 392, 1),
	(407, '2023-02-16 23:54:05.619658', '프레임워크와 라이브러리의 차이에 대해 설명해 보세요.', '2023-02-17 00:26:00.888756', 392, 1),
	(408, '2023-02-16 23:54:14.248461', '마지막으로 하고 싶은 말씀이 있으신가요?', '2023-02-17 00:28:42.468203', 392, 1),
	(415, '2023-02-16 23:59:45.687108', '우리 회사에 지원한 동기를 말해 보시오 ', '2023-02-17 00:22:08.102944', 398, 6),
	(416, '2023-02-16 23:59:53.188904', '팀 프로젝트를 진행 할 때 어려웠던 점을 극복 한 경험이 있나요?  경험이 있다면 구체적으로 극복한 점을 이야기 해주세요 ', '2023-02-17 00:22:50.305708', 398, 6);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
