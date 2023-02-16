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

-- 테이블 speakon.data_file 구조 내보내기
DROP TABLE IF EXISTS `data_file`;
CREATE TABLE IF NOT EXISTS `data_file` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `content_type` varchar(50) NOT NULL,
  `original_file_name` varchar(100) NOT NULL,
  `stored_file_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 speakon.data_file:~39 rows (대략적) 내보내기
INSERT INTO `data_file` (`id`, `created_date`, `content_type`, `original_file_name`, `stored_file_name`) VALUES
	(4, '2023-02-13 03:44:30.608814', 'application/pdf', '프로젝트_첫걸음.pdf', 'b2936faf-468e-4690-9e00-e9049dc21732.pdf'),
	(10, '2023-02-13 03:47:33.566601', 'application/pdf', '정보처리기사20220424(해설집).pdf', 'bf9e9030-522d-4898-8a44-962f95723282.pdf'),
	(18, '2023-02-13 03:52:00.903488', 'video/webm', '2_6.webm', 'dea890b5-1709-4d91-87c6-59ed2fdd0baa.webm'),
	(24, '2023-02-13 03:53:07.793728', 'video/webm', '2_1.webm', '9535e92b-5de7-46a9-9655-89e2f4514666.webm'),
	(34, '2023-02-13 09:29:26.340891', 'application/pdf', 'Jira가 뭔데.pdf', 'fa63d352-e3db-428a-a48e-f65da565e4f9.pdf'),
	(44, '2023-02-13 09:32:17.961318', 'video/webm', '31_1.webm', '713e184b-67c1-4fe7-91ba-e1d66bd93877.webm'),
	(50, '2023-02-13 09:33:15.727781', 'video/webm', '31_30.webm', 'd5dac689-7be2-4e78-8e73-4857f8119d74.webm'),
	(54, '2023-02-13 13:32:29.835121', 'application/pdf', 'D105_중간발표자료.pdf', '22e2b256-ed42-4c51-9480-1cf8ab51d332.pdf'),
	(62, '2023-02-14 10:06:02.399255', 'application/pdf', '헌터초보만.pdf', 'ed3f03b3-f60f-43ff-85ee-e4e0cd2f5610.pdf'),
	(69, '2023-02-14 10:56:39.849665', 'application/pdf', '헌터초보만.pdf', '6b31b9b8-3926-4539-af68-f2c9e4e29880.pdf'),
	(72, '2023-02-14 10:58:23.246358', 'video/webm', '67_66.webm', '994878b5-32cf-4259-9d4b-b2e872f93ed3.webm'),
	(87, '2023-02-14 10:59:47.839891', 'application/pdf', '헌터초보만.pdf', '6fd7e569-a553-4b1e-8836-7364a5e02553.pdf'),
	(114, '2023-02-14 11:04:21.263657', 'video/webm', '85_66.webm', 'a2a097da-12c0-4e38-81f1-9eca368c9d85.webm'),
	(126, '2023-02-14 12:49:37.064915', 'video/webm', '67_57.webm', 'fbad06d2-482c-4033-a41e-ecc7c8f7d034.webm'),
	(136, '2023-02-14 15:48:45.368532', 'video/webm', '130_30.webm', '0d95a192-24e3-449e-8ef4-53f4777f78ed.webm'),
	(140, '2023-02-14 15:49:11.264852', 'video/webm', '130_1.webm', '8cb8eeaa-0ca6-42e1-a9f0-23e0667a3481.webm'),
	(154, '2023-02-15 09:23:45.285882', 'application/pdf', '포폴_프론트엔드 개발자 장준혁.pdf', '399537e8-abbb-4f4d-b06e-3f264b791cd4.pdf'),
	(157, '2023-02-15 09:24:35.760297', 'application/pdf', '이희수 이력서.pdf', '6f3f94e0-a9ce-4913-8a66-58edec0c1c4c.pdf'),
	(165, '2023-02-15 09:27:32.811596', 'video/webm', '152_1.webm', '3e06a74e-493a-4f48-b15c-ce830a3fdd22.webm'),
	(182, '2023-02-15 13:38:12.469006', 'application/pdf', '포폴.pdf', 'c68a6e78-018d-476c-b6a1-adf47e8cb578.pdf'),
	(184, '2023-02-15 13:38:19.093443', 'application/pdf', 'D105_중간발표자료.pdf', '16b0c89d-172a-49a0-bf33-125f14d95ff2.pdf'),
	(193, '2023-02-15 13:52:37.552404', 'video/webm', '173_1.webm', 'e8fbb11e-0108-4f63-bd98-d4d2e2bdb8d3.webm'),
	(200, '2023-02-15 17:12:49.059666', 'application/pdf', '230203_노트북 반출 신청서_086362_김지현_5월31일.pdf', '275faacb-56ed-4042-b781-ac584d70e142.pdf'),
	(206, '2023-02-15 17:12:59.349150', 'application/pdf', '정보처리기사20220424(해설집).pdf', '263cd217-e0fe-494e-9ccf-31f38cddca86.pdf'),
	(210, '2023-02-15 17:14:04.932021', 'video/webm', '198_6.webm', 'fd3197b4-ff21-490d-9461-b2a2e7368f3d.webm'),
	(214, '2023-02-15 17:14:18.586433', 'video/webm', '198_28.webm', 'd38fd97f-d57a-4e71-961f-69a7973ea9b7.webm'),
	(221, '2023-02-15 23:33:52.774368', 'application/pdf', '정보처리기사20220424(해설집).pdf', '18544bc8-ea3e-41dd-be5a-09d860f3c06d.pdf'),
	(226, '2023-02-15 23:34:53.590471', 'application/pdf', 'PICHIT.pdf', '9e702107-b45c-43f1-8454-d3c7e670f7c4.pdf'),
	(231, '2023-02-15 23:37:37.626048', 'video/webm', '217_219.webm', 'ff81c8d7-a0c9-4785-8571-674ee2e28873.webm'),
	(237, '2023-02-15 23:38:53.416044', 'video/webm', '217_6.webm', 'f1c67060-cdeb-4c3d-895c-887600c66a4e.webm'),
	(247, '2023-02-15 23:57:03.951301', 'application/pdf', '3D프린팅적층방향을고려한위상최적설계의실험적검증.pdf', '5e3b66e0-b837-4e0d-be44-4d6f9516bd1f.pdf'),
	(252, '2023-02-16 00:06:02.489616', 'video/webm', '171_241.webm', '1ccc6b69-1417-4616-9982-83cb78c098d7.webm'),
	(256, '2023-02-16 00:07:52.653923', 'video/webm', '171_6.webm', '28ebc742-2aec-4506-9830-48df80a55380.webm'),
	(266, '2023-02-16 11:52:53.097231', 'application/pdf', '230203_노트북 반출 신청서_086362_김지현_5월31일.pdf', 'ba68e276-ee5a-4167-a57f-ee84e1df12a7.pdf'),
	(269, '2023-02-16 11:53:10.596562', 'application/pdf', '정보처리기사20220424(해설집).pdf', '9bcf4522-a3b8-4b03-8082-fef341f58675.pdf'),
	(272, '2023-02-16 11:55:09.648970', 'video/webm', '264_6.webm', 'd3732091-4afd-467b-b857-6e81afb83931.webm'),
	(275, '2023-02-16 11:55:47.626898', 'video/webm', '264_28.webm', '410e0cfb-383d-4fb7-9692-e52cff0670a9.webm'),
	(284, '2023-02-16 13:19:39.953836', 'image/jpeg', 'KakaoTalk_20230205_154654172.jpg', '6bcebdf6-61cd-421f-b141-bbc530d7597d.jpg'),
	(287, '2023-02-16 13:23:42.484995', 'video/webm', '280_282.webm', '41388fde-5039-4451-97ec-e9b1d61ee9e0.webm'),
	(293, '2023-02-16 17:25:15.656222', 'application/pdf', '포폴.pdf', 'e70b32ff-3a94-4340-abfc-6019bdbbfa96.pdf'),
	(295, '2023-02-16 17:25:19.016439', 'application/pdf', '230206_출결변경요청서_이효진[구미_공통 1반].docx.pdf', 'bd2b7eb0-639c-4e6d-9f2f-a004f40056b7.pdf'),
	(298, '2023-02-16 17:25:43.159654', 'application/pdf', 'Jira가 뭔데.pdf', '6030a9f9-bfcb-4f0b-baed-580ea08b03ae.pdf'),
	(328, '2023-02-16 17:41:26.723948', 'video/webm', '290_289.webm', '0996aaa0-a997-4508-8421-0b337ff902a7.webm'),
	(341, '2023-02-16 17:43:47.852566', 'video/webm', '290_56.webm', '0d031ee6-0fdc-46b0-a9c9-0a6ca194f0b0.webm'),
	(353, '2023-02-16 17:46:59.639703', 'video/webm', '290_1.webm', '1baf10d6-d70c-4dcb-befb-c57f2ac21621.webm'),
	(368, '2023-02-16 22:37:59.589975', 'application/pdf', '정보처리기사20220424(해설집).pdf', '9b4c9e60-4704-441a-b308-07353214c749.pdf'),
	(387, '2023-02-16 23:16:11.620515', 'application/pdf', '포폴.pdf', '46e2944f-2c37-4d75-852e-4650908183b3.pdf'),
	(393, '2023-02-16 23:49:35.204154', 'application/pdf', '공통PJT_포팅_메뉴얼.pdf', 'c89e86bd-1e29-4b90-9f4e-3e2be6a39084.pdf'),
	(396, '2023-02-16 23:50:54.208892', 'application/pdf', 'Sample 이력서.pdf', '2b8f1fdd-165c-4f88-9f4a-5cb20279c66b.pdf'),
	(399, '2023-02-16 23:51:11.958336', 'application/pdf', '포폴.pdf', '672d9312-caf1-40d6-a4f7-e824c1eb0002.pdf'),
	(430, '2023-02-17 00:24:03.859617', 'video/webm', '391_1.webm', 'd574817f-8e6d-4849-a18c-fc74f7b79564.webm'),
	(448, '2023-02-17 00:29:25.182567', 'video/webm', '391_30.webm', 'f63a64b1-287b-4207-92e9-ac169689ca74.webm'),
	(458, '2023-02-17 00:57:09.564290', 'application/pdf', 'Sample 이력서.pdf', '3cc3a1bf-038c-4df2-9c9b-a10fe5207568.pdf'),
	(464, '2023-02-17 01:34:40.376376', 'application/pdf', '공통PJT_포팅_메뉴얼.pdf', 'd2bb17ca-d57c-4114-8ef7-a10697a7cb51.pdf');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
