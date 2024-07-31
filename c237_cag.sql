-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2024 at 04:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `c237_cag`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryId` int(15) NOT NULL,
  `categoryName` varchar(100) NOT NULL,
  `categoryDesc` varchar(200) NOT NULL,
  `categoryImage` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryId`, `categoryName`, `categoryDesc`, `categoryImage`) VALUES
(1, 'Samsung', 'One of the best android brands in the world, originated from South Korea.', 'samsung.png'),
(2, 'Apple', 'Apple manufactures smartphones, tablets, personal computers, and wearable devices.', 'apple.png');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(15) NOT NULL,
  `productName` varchar(100) NOT NULL,
  `productDesc` varchar(200) NOT NULL,
  `productPrice` decimal(10,2) NOT NULL,
  `productQuantity` int(5) NOT NULL,
  `productImage` varchar(500) NOT NULL,
  `categoryId` int(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `productName`, `productDesc`, `productPrice`, `productQuantity`, `productImage`, `categoryId`) VALUES
(1, 'Samsung Galaxy S23', 'With Galaxy S23 in your hands, you can unleash whole new levels of creativity, productivity and possibility — starting with the most important device in your life.', 700.00, 5, 'S23.png', 1),
(3, 'Samsung Galaxy S22', 'Samsung’s Galaxy S22 trio launched as the latest installment of its Galaxy S series at the February 2022 Unpacked event.', 600.00, 10, 'S22.png', 1),
(4, 'Samsung Galaxy S21', 'The Galaxy S21 series has a design similar to its predecessor, with an Infinity-O display containing a circular cutout in the top center for the front selfie camera.', 20.00, 500, 'S21.png', 1),
(5, 'Iphone 14', 'A new, larger 6.7-inch size joins the popular 6.1-inch design, featuring a new dual-camera system, Crash Detection, a smartphone industry-first safety service with Emergency SOS via satellite.', 1200.00, 6, 'iphone14.png', 2),
(9, 'Iphone 13', 'iPhone 13 is designed with the following features to reduce its environmental impact', 900.00, 7, 'iphone13.png', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `ForeignKey` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
