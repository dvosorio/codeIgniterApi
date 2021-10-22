-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 22-10-2021 a las 18:13:43
-- Versión del servidor: 5.6.41
-- Versión de PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `konecta_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha_compra` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`id`, `id_producto`, `cantidad`, `total`, `fecha_compra`) VALUES
(1, 2, 5, '2500.00', '2021-10-22 18:07:41'),
(2, 2, 10, '5000.00', '2021-10-22 18:08:44'),
(3, 2, 10, '5000.00', '2021-10-22 18:09:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `referencia` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `peso` int(11) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `stock` int(11) NOT NULL,
  `fecha_registro` datetime NOT NULL,
  `fecha_ultima_venta` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre_producto`, `referencia`, `precio`, `peso`, `categoria`, `stock`, `fecha_registro`, `fecha_ultima_venta`) VALUES
(2, 'Membresía Millennium', 'Cualquier cosa', '500.00', 1, 'membresías', 9974, '2021-10-22 17:19:48', '2021-10-22 18:09:28');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
