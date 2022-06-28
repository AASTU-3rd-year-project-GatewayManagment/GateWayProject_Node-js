-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2022 at 07:39 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `userName` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `ID` varchar(32) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`userName`, `password`, `ID`, `email`) VALUES
('admin', '1234', 'ets0512/12', 'naoltamrat11@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

CREATE TABLE `device` (
  `deviceName` varchar(32) NOT NULL,
  `serialNumber` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `device`
--

INSERT INTO `device` (`deviceName`, `serialNumber`) VALUES
('mjijkbk', ',...,'),
('hp', ',kk'),
('Dell', '1223333'),
('hp', '1234'),
('hp', '1234kdkd'),
('hp', '1234kdkd45'),
('hp', '1234kdkd4dd'),
('HP', '33399933'),
('HP', '4545454554545'),
('hp', '6'),
('kljkjlkl', ';lklklk'),
('qwerety', 'bhnjm'),
('microsoft', 'cxcxcx'),
('koko', 'dfdfdf'),
('Toshiba', 'dfkdjfkdfj'),
('qweretr', 'dgvx'),
('f', 'f'),
('hp', 'jjj'),
('hp', 'jmjmjjmjm'),
('jmjm', 'jmjmjjmjm12345'),
('hp', 'jmjmjjmjmx'),
('HP', 'kkjgkjhj'),
('dell', 'lkkdfk445'),
('', 'n'),
('nn', 'nnnnnnnn'),
('HP', 'rakuten'),
('kljkjlkl', 'tryjdty');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `userName` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `ID` varchar(32) NOT NULL,
  `lastLogin` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`userName`, `password`, `ID`, `lastLogin`) VALUES
('emp', '81dc9bdb52d04dc20036dbd8313ed055', 'ets0000/12', '0000-00-00 00:00:00.000000'),
('jj', '81dc9bdb52d04dc20036dbd8313ed055', 'ets0510/12', '2022-06-05 17:29:43.000000'),
('worker', '202cb962ac59075b964b07152d234b70', 'ets0517/12', '2022-06-06 17:15:38.000000');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` varchar(32) NOT NULL,
  `firstName` varchar(32) NOT NULL,
  `lastName` varchar(32) NOT NULL,
  `gender` varchar(32) NOT NULL,
  `user_level` varchar(32) DEFAULT NULL,
  `user_type` varchar(32) DEFAULT NULL,
  `imgUrl` varchar(32) DEFAULT NULL,
  `barCode` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `firstName`, `lastName`, `gender`, `user_level`, `user_type`, `imgUrl`, `barCode`) VALUES
('ets0000/12', 'yero', 'one', 'male', 'other', 'security', 'profile.png', 'ets0000/12'),
('ets0510/12', 'namus', 'shukra', 'male', 'other', 'security', 'profile.png', 'ets0510/12'),
('ets0512/12', 'bekele', 'assefa', 'male', NULL, NULL, 'profile.png', NULL),
('ets0513/12', 'namus', 'shukra', 'male', 'degree', 'student', 'IMG-629768459ec4d8.13310455.jpg', 'ets0513/12'),
('ets0517/12', 'jj', 'one', 'male', 'other', 'security', 'IMG-629caa481c9720.11685179.jpg', 'ets0517/12'),
('ets0540/12', 'barak', 'obama', 'male', 'degree', 'student', 'profile.png', 'ets0540/12'),
('ets0554/12', 'Yohannes ', 'Tilifo', 'male', 'degree', 'student', 'IMG-629c9dd56d0884.78153468.jpg', 'ets052020'),
('ets0554/14', 'jj', 'ayalew', 'female', 'phd', 'student', 'ayalew.jpg', 'ets052211'),
('ets0554/15', 'meklit', 'ayalew', 'female', 'masters', 'staff', 'ayalew.jpg', 'ets052212');

-- --------------------------------------------------------

--
-- Table structure for table `user_device_log`
--

CREATE TABLE `user_device_log` (
  `counter` int(255) NOT NULL,
  `ID` varchar(32) NOT NULL,
  `serialNumber` varchar(32) NOT NULL,
  `entryDate` timestamp NULL DEFAULT current_timestamp(),
  `exitDate` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_device_log`
--

INSERT INTO `user_device_log` (`counter`, `ID`, `serialNumber`, `entryDate`, `exitDate`) VALUES
(61, 'ets0554/14', 'lkkdfk445', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_log`
--

CREATE TABLE `user_log` (
  `ID` varchar(32) NOT NULL,
  `lastEntry` timestamp(6) NULL DEFAULT NULL,
  `lastExit` timestamp(6) NULL DEFAULT NULL,
  `EID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_log`
--

INSERT INTO `user_log` (`ID`, `lastEntry`, `lastExit`, `EID`) VALUES
('ets0513/12', '2022-06-01 13:32:19.000000', '2022-05-28 13:32:19.000000', 25),
('ets0513/12', '2022-06-01 13:32:19.000000', '2022-06-02 07:23:12.000000', 28),
('ets0513/12', '2022-06-02 07:31:47.000000', '2022-06-02 07:23:12.000000', 30),
('ets0513/12', '2022-06-02 07:31:47.000000', '2022-06-02 07:32:39.000000', 31),
('ets0513/12', '2022-06-02 07:33:14.000000', '2022-06-02 07:32:39.000000', 32),
('ets0513/12', '2022-06-02 07:33:14.000000', '2022-06-02 07:33:25.000000', 33),
('ets0513/12', '2022-06-02 07:33:55.000000', '2022-06-02 07:33:25.000000', 34),
('ets0513/12', '2022-06-02 07:41:20.000000', '2022-06-02 07:33:25.000000', 35),
('ets0513/12', '2022-06-02 07:41:20.000000', '2022-06-02 07:41:47.000000', 36),
('ets0513/12', '2022-06-02 09:57:22.000000', '2022-06-02 07:41:47.000000', 39),
('ets0513/12', '2022-06-02 09:57:22.000000', '2022-06-02 09:57:37.000000', 40),
('ets0513/12', '2022-06-04 13:37:07.000000', '2022-06-02 09:57:37.000000', 217),
('ets0513/12', '2022-06-04 13:37:07.000000', '2022-06-04 13:37:26.000000', 218),
('ets0517/12', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 267),
('ets0000/12', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 298),
('ets0510/12', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 299),
('ets0540/12', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 305),
('ets0540/12', '2022-06-06 05:53:53.000000', '0000-00-00 00:00:00.000000', 321),
('ets0540/12', '2022-06-06 05:53:53.000000', '2022-06-06 05:55:07.000000', 322),
('ets0540/12', '2022-06-06 05:56:02.000000', '2022-06-06 05:55:07.000000', 323),
('ets0540/12', '2022-06-06 05:56:02.000000', '2022-06-06 05:56:34.000000', 324),
('ets0510/12', '2022-06-06 06:20:39.000000', '0000-00-00 00:00:00.000000', 325),
('ets0510/12', '2022-06-06 06:20:39.000000', '2022-06-06 06:21:01.000000', 326),
('ets0000/12', '2022-06-06 06:28:30.000000', '0000-00-00 00:00:00.000000', 327),
('ets0000/12', '2022-06-06 06:28:30.000000', '2022-06-06 06:29:09.000000', 328),
('ets0000/12', '2022-06-06 06:30:07.000000', '2022-06-06 06:29:09.000000', 329),
('ets0000/12', '2022-06-09 08:40:03.000000', NULL, 330),
('ets0510/12', '2022-06-08 11:12:38.000000', NULL, 331),
('ets0554/12', '2022-06-09 11:14:57.000000', NULL, 332),
('ets0554/15', '2022-06-09 11:15:38.000000', NULL, 333);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`userName`),
  ADD UNIQUE KEY `uniqueEmail` (`email`),
  ADD KEY `fk_admin-user` (`ID`);

--
-- Indexes for table `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`serialNumber`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`userName`),
  ADD KEY `fk_employee-user` (`ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `barCode` (`barCode`);

--
-- Indexes for table `user_device_log`
--
ALTER TABLE `user_device_log`
  ADD PRIMARY KEY (`counter`),
  ADD KEY `fk_user_device_log-id` (`ID`),
  ADD KEY `fk-user_device_log-device` (`serialNumber`);

--
-- Indexes for table `user_log`
--
ALTER TABLE `user_log`
  ADD PRIMARY KEY (`EID`),
  ADD KEY `fk_user_log-user` (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_device_log`
--
ALTER TABLE `user_device_log`
  MODIFY `counter` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `user_log`
--
ALTER TABLE `user_log`
  MODIFY `EID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=334;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `fk_admin-user` FOREIGN KEY (`ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `fk_employee-user` FOREIGN KEY (`ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_device_log`
--
ALTER TABLE `user_device_log`
  ADD CONSTRAINT `fk-user_device_log-device` FOREIGN KEY (`serialNumber`) REFERENCES `device` (`serialNumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_device_log-id` FOREIGN KEY (`ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_log`
--
ALTER TABLE `user_log`
  ADD CONSTRAINT `fk_user_log-user` FOREIGN KEY (`ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
