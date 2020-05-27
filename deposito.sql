-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Servidor: 3.18.6.71:3306
-- Tiempo de generación: 06-05-2020 a las 22:19:47
-- Versión del servidor: 5.6.40-log
-- Versión de PHP: 5.6.40-15+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `plp_deposito`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo_has_data`
--

CREATE TABLE `articulo_has_data` (
  `id` int(11) NOT NULL,
  `artcode` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `text` text COLLATE utf8_spanish2_ci NOT NULL,
  `pdf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `imagen` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `precio` double NOT NULL,
  `promo` tinyint(4) NOT NULL,
  `habilitado` tinyint(1) NOT NULL DEFAULT '1',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `ts_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ts_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `articulo_has_data`
--

INSERT INTO `articulo_has_data` (`id`, `artcode`, `text`, `pdf`, `imagen`, `precio`, `promo`, `habilitado`, `deleted`, `ts_create`, `ts_update`) VALUES
(1, 'AABBCC11', 'Testing', 'testpdf.pdf', 'test.jpg', 200.2, 0, 1, 1, '2020-05-05 21:19:15', '2020-05-06 18:16:38'),
(2, 'SFI-02', 'La descripcion de SFI-02', '', '', 899.2, 1, 1, 0, '2020-05-06 17:36:14', '2020-05-06 17:36:14'),
(4, 'FIBRCTO1X8SC', 'La descripcion de FIBRCTO1X8SC modificada y el precio igual', NULL, NULL, 12222.2, 0, 1, 0, '2020-05-06 17:40:20', '2020-05-06 17:52:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id` int(11) NOT NULL,
  `tipo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `habilitado` int(11) NOT NULL,
  `ts_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ts_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`id`, `tipo`, `descripcion`, `habilitado`, `ts_create`, `ts_update`) VALUES
(1, 'Administrador', 'Administrador', 1, '2020-04-27 22:09:58', '2020-04-27 22:09:58'),
(2, 'Manager', 'Manager regional', 1, '2020-04-27 22:09:58', '2020-04-27 22:09:58'),
(3, 'Vendedor', 'Vendedor PLP', 1, '2020-04-27 22:09:58', '2020-04-27 22:09:58'),
(5, 'Proveedor', 'Proveedor externo', 1, '2020-04-27 22:11:04', '2020-04-27 22:11:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presupuesto`
--

CREATE TABLE `presupuesto` (
  `id` int(11) NOT NULL,
  `id_lote` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `descuento` double NOT NULL DEFAULT '0',
  `comentario` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '0' COMMENT '0 : pendientes | 1 aprobadas',
  `ts_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ts_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `presupuesto`
--

INSERT INTO `presupuesto` (`id`, `id_lote`, `id_vendedor`, `id_cliente`, `descuento`, `comentario`, `estado`, `ts_created`, `ts_update`) VALUES
(2, '9063087f-986d-4b75-864b-6996f28aa5aa', 5, 5, 0, 'todo bien', 0, '2020-05-05 20:18:35', '2020-05-05 21:28:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presupuesto_has_articulo`
--

CREATE TABLE `presupuesto_has_articulo` (
  `id` int(11) NOT NULL,
  `id_lote` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `artcode` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `cantidad` double NOT NULL,
  `precio_unitario` double NOT NULL,
  `ts_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ts_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `presupuesto_has_articulo`
--

INSERT INTO `presupuesto_has_articulo` (`id`, `id_lote`, `artcode`, `cantidad`, `precio_unitario`, `ts_create`, `ts_update`) VALUES
(3, '9063087f-986d-4b75-864b-6996f28aa5aa', 'AABBCC11', 1, 200.2, '2020-05-05 20:18:35', '2020-05-05 20:18:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `id_region` int(11) NOT NULL,
  `permiso` int(11) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `ts_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ts_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`, `id_region`, `permiso`, `deleted`, `ts_create`, `ts_update`) VALUES
(1, 'plpargentina', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 1, 1, 0, '2020-04-27 22:12:57', '2020-05-04 21:48:10'),
(2, 'plpargentinamanager', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 1, 2, 0, '2020-04-27 22:12:57', '2020-05-04 21:47:48'),
(3, 'plpargentinavendedor', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 1, 3, 0, '2020-04-27 22:12:57', '2020-05-04 21:47:40'),
(5, 'proveedor1', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 1, 5, 0, '2020-04-27 22:12:57', '2020-04-27 23:14:05'),
(6, 'nachodz', '0fd01512052c431cb2e48955dde53e8cdc0bccea', 1, 3, 0, '2020-05-05 17:13:38', '2020-05-05 17:13:38'),
(7, 'nachodz', '8fe49f5a2e09aa1215d6c1c882c58bb58ffccbf3', 1, 3, 1, '2020-05-05 17:19:08', '2020-05-05 20:22:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_has_datos`
--

CREATE TABLE `usuario_has_datos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `documento` varchar(30) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `mail` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `direccion` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `telefono` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ts_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ts_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuario_has_datos`
--

INSERT INTO `usuario_has_datos` (`id`, `id_usuario`, `nombre`, `apellido`, `documento`, `mail`, `direccion`, `telefono`, `ts_create`, `ts_update`) VALUES
(1, 5, 'Roberto', 'Gomez', NULL, 'dezanignacio@gmail.com', NULL, NULL, '2020-05-05 06:05:53', '2020-05-05 15:22:49'),
(2, 6, 'Ignacio', 'De Zan', '33110235', 'nachodz_4@hotmail.com', 'Corrientes 111', '123444', '2020-05-05 17:13:38', '2020-05-05 18:23:02'),
(3, 7, 'Ignacio', 'De Zan', '33110235', 'nachodz_4@hotmail.com', NULL, '123', '2020-05-05 17:19:09', '2020-05-05 17:19:09');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulo_has_data`
--
ALTER TABLE `articulo_has_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `artcode` (`artcode`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `presupuesto`
--
ALTER TABLE `presupuesto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `presupuesto_has_articulo`
--
ALTER TABLE `presupuesto_has_articulo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario_has_datos`
--
ALTER TABLE `usuario_has_datos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulo_has_data`
--
ALTER TABLE `articulo_has_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `presupuesto`
--
ALTER TABLE `presupuesto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `presupuesto_has_articulo`
--
ALTER TABLE `presupuesto_has_articulo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `usuario_has_datos`
--
ALTER TABLE `usuario_has_datos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
