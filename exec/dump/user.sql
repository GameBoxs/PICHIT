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

-- 테이블 speakon.user 구조 내보내기
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `name` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `provider` varchar(30) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_a3imlf41l37utmxiquukk8ajc` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 speakon.user:~16 rows (대략적) 내보내기
INSERT INTO `user` (`id`, `created_date`, `email`, `name`, `password`, `provider`, `user_id`) VALUES
	(1, '2023-02-13 03:36:53.524352', NULL, '이', '$2a$10$jZ6ZwjeeE1vvT36IcEjXNOlOhQzoS2MVTJ5g9zAESYh0F1r79ws8i', 'kakao', 'kakao_2629839462'),
	(6, '2023-02-13 03:46:35.436607', NULL, '김', '$2a$10$6eoqR7gMENJfrDHVXt3ZXuQITqc63eSmFZLGEYmW5NbYUVbUS.4tS', 'kakao', 'kakao_2638400696'),
	(28, '2023-02-13 09:01:06.560574', NULL, '김', '$2a$10$nxMqYwXfhoydWJuaxsUBoemgAvAAbSVnAlR3alzxEPGKf2w3RiE0O', 'kakao', 'kakao_2646372607'),
	(30, '2023-02-13 09:18:25.473465', NULL, '임', '$2a$10$lmHfmo30qbnh/J/xVxM7JuYPxTNlYBlSV0x7QY6ZE7OEqktceFCY.', 'kakao', 'kakao_2644976275'),
	(56, '2023-02-14 09:24:54.330137', NULL, '이', '$2a$10$6BRJnzmCIRr4Sc9MyRyccePAC1UvuHMrpaJArZBu9eNY2SSYwOraq', 'kakao', 'kakao_2642745151'),
	(57, '2023-02-14 10:02:11.712956', NULL, '박', '$2a$10$0C3/RAdx.1RyoKzKMK4Ad.elLzzkDUsKDDP8C0aIfxocNS04S6iIq', 'kakao', 'kakao_2649073686'),
	(66, '2023-02-14 10:56:03.384459', NULL, '박', '$2a$10$Jib90LvEpSgAl7jUnfTdVeihQZmouZZl9TIFQTL06cCmnnRF7/Jb6', 'kakao', 'kakao_2665290166'),
	(150, '2023-02-15 09:20:02.175127', NULL, '이', '$2a$10$K83PwGl0dchKRuzdd7cc6ezrogEo4z2H6S7uPMXMaN7G299ls3D3y', 'kakao', 'kakao_2666670241'),
	(151, '2023-02-15 09:22:39.281136', NULL, '김', '$2a$10$d2YiIKZnkJnobmEPewP4leHr3kIzKj/uy98wzYMOt03wlDNsxt4Ja', 'kakao', 'kakao_2666672939'),
	(216, '2023-02-15 17:45:35.769918', NULL, '이', '$2a$10$ijkRccpxUVVCeGH20SVJiubcLc7LUwPxR6/nTjTUgYceoJr6tnKL2', 'kakao', 'kakao_2667357363'),
	(219, '2023-02-15 23:33:08.501001', NULL, '0', '$2a$10$NHQ2Ag2E5duYnBVFa.l7j.vAykbuzdqKMTeCKXVjMmR9JtTGD2b4.', 'kakao', 'kakao_2667832644'),
	(241, '2023-02-15 23:53:22.707703', NULL, '김', '$2a$10$3Q5r6Ped52GPZRgx6iV2qO3pELUrP1M/8zO0P/Q3TlpUwXSRojJmG', 'kakao', 'kakao_2667853989'),
	(278, '2023-02-16 12:31:15.757122', NULL, '박', '$2a$10$Sgr82gOOhLg1Qih2FSt3beRDK2IyIRal3AA0ULJCi6FqdaF9VZTtq', 'kakao', 'kakao_2656469445'),
	(279, '2023-02-16 13:17:01.475895', NULL, '이', '$2a$10$7xaJsC4msI5huMbDKZ66a.v07Brnft6y.INQz.YwWqtOpcr5d6Wyq', 'kakao', 'kakao_2668424323'),
	(282, '2023-02-16 13:19:06.040481', NULL, '박', '$2a$10$gXhewx5sASrsSweY88JCJ.UUzlSMSTdSIRnc.Mcz6YCm151J2E8BW', 'kakao', 'kakao_2652905966'),
	(289, '2023-02-16 16:53:00.201839', NULL, '김', '$2a$10$gUeSYm9cN0EIS8eDQtN3P.U761m/KnSk9w5hc1/W7rS3428ZcGJJG', 'kakao', 'kakao_2646067206'),
	(352, '2023-02-16 17:46:53.921890', NULL, '탱', '$2a$10$xMFR6lr.3xw.iaz/.oNHj.5HVdj2DI.k19pW8rHhLVuHCQUBBT2.K', 'kakao', 'kakao_2654600441'),
	(358, '2023-02-16 21:13:22.348218', NULL, '김', '$2a$10$xloQqvswmOLLGkiUrzpF/eSMVo.NtZZXsK6BJN1/TvsfNomgna4mm', 'kakao', 'kakao_2669080014');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
