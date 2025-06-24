-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2025 at 09:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydrive`
--

--
-- Dumping data for table `content_type`
--

INSERT INTO `content_type` (`id`, `created_at`, `name`) VALUES
(1, '2025-06-24 18:35:21', 'image'),
(2, '2025-06-24 18:35:21', 'application'),
(3, '2025-06-24 18:35:21', 'video'),
(4, '2025-06-24 18:39:08', 'text');

--
-- Dumping data for table `file_type`
--

INSERT INTO `file_type` (`id`, `created_at`, `name`, `content_type_id`, `mime_type_full`) VALUES
(1, '2025-06-03 19:26:59', 'quill-doc', NULL, NULL),
(2, '2025-06-03 19:26:59', 'sheet', NULL, NULL),
(3, '2025-06-23 17:24:42', 'txt', 4, 'plain'),
(4, '2025-06-23 17:24:42', 'pdf', 2, 'pdf'),
(5, '2025-06-23 17:24:42', 'png', 1, 'png'),
(6, '2025-06-23 17:24:42', 'jpg', 1, 'jpeg'),
(7, '2025-06-23 17:24:42', 'webp', 1, NULL),
(8, '2025-06-24 18:47:15', 'svg', 1, 'svg+xml'),
(9, '2025-06-24 18:48:24', 'xlsx', 2, 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
(10, '2025-06-24 18:48:42', 'docx', 2, 'vnd.openxmlformats-officedocument.wordprocessingml.document'),
(11, '2025-06-24 18:54:12', 'exe', 2, 'x-msdownload'),
(12, '2025-06-24 18:57:47', 'xml', 4, 'xml'),
(13, '2025-06-24 18:58:33', 'rar', 2, 'octet-stream'),
(14, '2025-06-24 18:58:33', 'zip', 2, 'octet-stream'),
(15, '2025-06-24 18:58:33', '7z', 2, 'octet-stream');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
