-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2024 a las 00:09:36
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vacunatorio2`
--
CREATE DATABASE IF NOT EXISTS `vacunatorio2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacunatorio2`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agentedesalud`
--

CREATE TABLE `agentedesalud` (
  `DNI` int(11) NOT NULL,
  `matricula` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `agentedesalud`
--

INSERT INTO `agentedesalud` (`DNI`, `matricula`) VALUES
(34229421, NULL),
(37716731, 10000000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aplicacion`
--

CREATE TABLE `aplicacion` (
  `idAplicacion` int(11) NOT NULL,
  `DNIPaciente` int(11) NOT NULL,
  `DNIAgente` int(11) NOT NULL,
  `numeroDeSerie` int(11) NOT NULL,
  `fechaDeAplicacion` date NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `aplicacion`
--

INSERT INTO `aplicacion` (`idAplicacion`, `DNIPaciente`, `DNIAgente`, `numeroDeSerie`, `fechaDeAplicacion`, `activo`) VALUES
(1, 34229421, 37716731, 1, '2024-01-01', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centrodevacunacion`
--

CREATE TABLE `centrodevacunacion` (
  `idCentroDeVacunacion` int(11) NOT NULL,
  `longitud` double NOT NULL,
  `latitud` double NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `centrodevacunacion`
--

INSERT INTO `centrodevacunacion` (`idCentroDeVacunacion`, `longitud`, `latitud`, `activo`) VALUES
(1, -65.453582, -33.675319, 1),
(2, -66.28365, -33.307057, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositonacional`
--

CREATE TABLE `depositonacional` (
  `idDepositoNacional` int(11) NOT NULL,
  `longitud` double NOT NULL,
  `latitud` double NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `depositonacional`
--

INSERT INTO `depositonacional` (`idDepositoNacional`, `longitud`, `latitud`, `activo`) VALUES
(1, -66.319155, -33.292288, 1),
(2, -66.319155, -33.292288, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositoprovincial`
--

CREATE TABLE `depositoprovincial` (
  `idDepositoProvincial` int(11) NOT NULL,
  `longitud` double NOT NULL,
  `latitud` double NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `depositoprovincial`
--

INSERT INTO `depositoprovincial` (`idDepositoProvincial`, `longitud`, `latitud`, `activo`) VALUES
(1, -66.319155, -33.292288, 1),
(2, -66.331844, -33.298216, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descarte`
--

CREATE TABLE `descarte` (
  `idDescarte` int(11) NOT NULL,
  `DNIAgente` int(11) NOT NULL,
  `numeroDeSerie` int(11) NOT NULL,
  `empresaDescartante` varchar(255) NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `cantidadDeVacunas` int(11) NOT NULL,
  `fechaDeDescarte` date NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `descarte`
--

INSERT INTO `descarte` (`idDescarte`, `DNIAgente`, `numeroDeSerie`, `empresaDescartante`, `motivo`, `cantidadDeVacunas`, `fechaDeDescarte`, `activo`) VALUES
(1, 37716731, 1, 'Veolia', 'Vencida', 10, '2024-01-01', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laboratorio`
--

CREATE TABLE `laboratorio` (
  `idLaboratorio` int(11) NOT NULL,
  `nombreLaboratorio` varchar(255) NOT NULL,
  `pais` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `longitud` double NOT NULL,
  `latitud` double NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `laboratorio`
--

INSERT INTO `laboratorio` (`idLaboratorio`, `nombreLaboratorio`, `pais`, `email`, `telefono`, `longitud`, `latitud`, `activo`) VALUES
(1, 'Johnnson', 'Argentina', 'long.eze7773@gmail.com', '0111532184', -66.309325, -33.279181, 1),
(2, 'Bago', 'Argentina', 'bayerargentina@gmail.com', '1159487659', -58.392334, -34.633208, 1),
(3, 'Pampa', 'Argentina', 'pampargentina@gmail.com', '1234445678', -66.319155, -33.292288, 1),
(4, 'Johnnso', 'A', 'a@gm.com', '1234567890', -66.319155, -33.292288, 1),
(5, 'dsadsa', 'asadsa', 'a@gm.com', '1234567890', -66.319155, -33.292288, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loteinterno`
--

CREATE TABLE `loteinterno` (
  `numeroDeSerie` int(11) NOT NULL,
  `numeroDeLote` int(11) NOT NULL,
  `idLaboratorio` int(11) NOT NULL,
  `cantidadDeVacunasTotales` int(11) NOT NULL,
  `cantidadDeVacunasRestantes` int(11) NOT NULL,
  `fechaDeLlegadaDepositoNacional` date DEFAULT NULL,
  `idDepositoNacional` int(11) DEFAULT NULL,
  `fechaDeSalidaDepositoNacional` date DEFAULT NULL,
  `fechaDeLlegadaDepositoProvincial` date DEFAULT NULL,
  `idDepositoProvincial` int(11) DEFAULT NULL,
  `fechaDeSalidaDepositoProvincial` date DEFAULT NULL,
  `fechaDeLlegadaCentroDeVacunacion` date DEFAULT NULL,
  `idCentroDeVacunacion` int(11) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `loteinterno`
--

INSERT INTO `loteinterno` (`numeroDeSerie`, `numeroDeLote`, `idLaboratorio`, `cantidadDeVacunasTotales`, `cantidadDeVacunasRestantes`, `fechaDeLlegadaDepositoNacional`, `idDepositoNacional`, `fechaDeSalidaDepositoNacional`, `fechaDeLlegadaDepositoProvincial`, `idDepositoProvincial`, `fechaDeSalidaDepositoProvincial`, `fechaDeLlegadaCentroDeVacunacion`, `idCentroDeVacunacion`, `activo`) VALUES
(1, 1, 1, 50, 40, '2024-01-01', 1, '2024-02-01', '2024-03-01', 1, '2024-04-01', '2024-05-01', 1, 1),
(2, 1, 1, 50, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(3, 2, 1, 50, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(4, 2, 1, 50, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(5, 4, 3, 50, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(6, 1, 1, 50, 50, '2024-01-01', 1, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(7, 4, 3, 50, 50, '2024-01-01', 1, '2024-01-01', '2024-01-01', 1, NULL, NULL, NULL, 1),
(8, 1, 1, 123, 123, '2024-01-01', 1, '2024-01-01', '2024-01-01', 1, '2024-01-01', '2024-01-01', 1, 1),
(9, 1, 1, 123, 123, '2024-01-01', 1, '2024-01-01', '2024-01-01', 1, '2024-01-01', '2024-01-01', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loteproveedor`
--

CREATE TABLE `loteproveedor` (
  `numeroDeLote` int(11) NOT NULL,
  `idLaboratorio` int(11) NOT NULL,
  `tipoDeVacuna` varchar(255) NOT NULL,
  `nombreComercial` varchar(255) NOT NULL,
  `cantidadDeLotesInternos` int(11) NOT NULL,
  `fechaDeFabricacion` date NOT NULL,
  `fechaDeCompra` date NOT NULL,
  `fechaDeVencimiento` date NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `loteproveedor`
--

INSERT INTO `loteproveedor` (`numeroDeLote`, `idLaboratorio`, `tipoDeVacuna`, `nombreComercial`, `cantidadDeLotesInternos`, `fechaDeFabricacion`, `fechaDeCompra`, `fechaDeVencimiento`, `activo`) VALUES
(1, 1, 'Tuberculosis', 'BCG', 500, '2024-01-01', '2024-01-01', '2029-01-01', 1),
(2, 1, 'Tuberculosis', 'BCG', 500, '2024-01-01', '2024-01-01', '2029-02-03', 1),
(3, 2, 'Tuberculosis', 'BCG', 500, '2024-01-01', '2024-01-01', '2029-01-01', 1),
(4, 3, 'Tuberculosis', 'BCG', 500, '2024-01-01', '2024-01-01', '2029-01-02', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patologiabase`
--

CREATE TABLE `patologiabase` (
  `DNI` int(11) NOT NULL,
  `patologiaBase` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `patologiabase`
--

INSERT INTO `patologiabase` (`DNI`, `patologiaBase`) VALUES
(34229421, 'Obesidad'),
(37716731, 'Ninguna');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `DNI` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fechaDeNacimiento` date NOT NULL,
  `ocupacion` varchar(255) NOT NULL,
  `genero` varchar(255) NOT NULL,
  `longitud` double NOT NULL,
  `latitud` double NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`DNI`, `nombre`, `apellido`, `email`, `fechaDeNacimiento`, `ocupacion`, `genero`, `longitud`, `latitud`, `activo`) VALUES
(34229421, 'Jorge Ezequiel', 'Diaz', 'diazezequiel777@gmail.com', '1988-11-09', 'otro', 'Masculino', -66.31088, -33.26451, 1),
(37716731, 'Federico Ivan', 'Cruceño', 'fedeicru@gmail.com', '1994-03-20', 'agente de salud', 'Masculino', -66.310912, -33.264501, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `idRegistro` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idFila` int(11) NOT NULL,
  `nombreDeTabla` varchar(255) NOT NULL,
  `tipoDeAccion` varchar(255) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`idRegistro`, `idUsuario`, `idFila`, `nombreDeTabla`, `tipoDeAccion`, `fecha`) VALUES
(3, 1, 1, 'Usuario', 'Creacion', '2024-03-20'),
(4, 1, 1, 'Usuario', 'Alta', '2024-03-20'),
(5, 1, 1, 'Laboratorio', 'Modificacion', '2024-03-22'),
(6, 1, 34229421, 'Persona', 'Creacion', '2024-03-23'),
(7, 1, 34229421, 'Persona', 'Alta', '2024-03-23'),
(8, 1, 2, 'Laboratorio', 'Creacion', '2024-03-24'),
(9, 1, 2, 'Laboratorio', 'Alta', '2024-03-24'),
(10, 1, 1, 'Centro de vacunacion', 'Creacion', '2024-03-24'),
(11, 1, 1, 'Centro de vacunacion', 'Alta', '2024-03-24'),
(12, 1, 2, 'Centro de vacunacion', 'Creacion', '2024-03-24'),
(13, 1, 2, 'Centro de vacunacion', 'Alta', '2024-03-24'),
(18, 1, 5, 'Laboratorio', 'Creacion', '2024-06-11'),
(19, 1, 5, 'Laboratorio', 'Alta', '2024-06-11'),
(20, 1, 2, 'Usuario', 'Creacion', '2024-06-11'),
(21, 1, 2, 'Usuario', 'Alta', '2024-06-11'),
(22, 1, 1, 'Lote proveeedor', 'Creacion', '2024-06-11'),
(23, 1, 1, 'Lote proveeedor', 'Alta', '2024-06-11'),
(24, 2, 1, 'Deposito Provincial', 'Creacion', '2024-06-11'),
(25, 2, 1, 'Deposito Provincial', 'Alta', '2024-06-11'),
(26, 2, 2, 'Deposito Provincial', 'Creacion', '2024-06-11'),
(27, 2, 2, 'Deposito Provincial', 'Alta', '2024-06-11'),
(28, 2, 1, 'Deposito Nacional', 'Creacion', '2024-06-11'),
(29, 2, 1, 'Deposito Nacional', 'Alta', '2024-06-11'),
(30, 2, 2, 'Deposito Nacional', 'Creacion', '2024-06-11'),
(31, 2, 2, 'Deposito Nacional', 'Alta', '2024-06-11'),
(32, 2, 2, 'Lote proveeedor', 'Creacion', '2024-06-11'),
(33, 2, 2, 'Lote proveeedor', 'Alta', '2024-06-11'),
(34, 2, 1, 'Lote interno', 'Creacion', '2024-06-11'),
(35, 2, 1, 'Lote interno', 'Alta', '2024-06-11'),
(36, 2, 2, 'Lote interno', 'Creacion', '2024-06-11'),
(37, 2, 2, 'Lote interno', 'Alta', '2024-06-11'),
(38, 2, 3, 'Lote interno', 'Creacion', '2024-06-11'),
(39, 2, 3, 'Lote interno', 'Alta', '2024-06-11'),
(40, 2, 4, 'Lote interno', 'Creacion', '2024-06-11'),
(41, 2, 4, 'Lote interno', 'Alta', '2024-06-11'),
(42, 2, 37716731, 'Persona', 'Creacion', '2024-06-11'),
(43, 2, 37716731, 'Persona', 'Alta', '2024-06-11'),
(44, 2, 1, 'Traslado', 'Creacion', '2024-06-11'),
(45, 2, 1, 'Traslado', 'Alta', '2024-06-11'),
(46, 2, 1, 'Descarte', 'Creacion', '2024-06-11'),
(47, 2, 1, 'Descarte', 'Alta', '2024-06-11'),
(48, 2, 1, 'Lote interno', 'Modificacion', '2024-06-11'),
(49, 2, 1, 'Aplicacion', 'Creacion', '2024-06-11'),
(50, 2, 1, 'Aplicacion', 'Alta', '2024-06-11'),
(51, 2, 3, 'Lote proveeedor', 'Creacion', '2024-06-12'),
(52, 2, 3, 'Lote proveeedor', 'Alta', '2024-06-12'),
(53, 2, 4, 'Lote proveeedor', 'Creacion', '2024-06-12'),
(54, 2, 4, 'Lote proveeedor', 'Alta', '2024-06-12'),
(55, 1, 5, 'Lote interno', 'Creacion', '2024-06-13'),
(56, 1, 5, 'Lote interno', 'Alta', '2024-06-13'),
(57, 1, 6, 'Lote interno', 'Creacion', '2024-06-13'),
(58, 1, 6, 'Lote interno', 'Alta', '2024-06-13'),
(59, 1, 7, 'Lote interno', 'Creacion', '2024-06-13'),
(60, 1, 7, 'Lote interno', 'Alta', '2024-06-13'),
(61, 1, 8, 'Lote interno', 'Creacion', '2024-06-13'),
(62, 1, 8, 'Lote interno', 'Alta', '2024-06-13'),
(63, 1, 9, 'Lote interno', 'Creacion', '2024-06-13'),
(64, 1, 9, 'Lote interno', 'Alta', '2024-06-13'),
(65, 1, 3, 'Usuario', 'Creacion', '2024-06-13'),
(66, 1, 3, 'Usuario', 'Alta', '2024-06-13'),
(67, 1, 4, 'Usuario', 'Creacion', '2024-06-13'),
(68, 1, 4, 'Usuario', 'Alta', '2024-06-13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `telefono`
--

CREATE TABLE `telefono` (
  `DNI` int(11) NOT NULL,
  `celular1` varchar(255) DEFAULT NULL,
  `celular2` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `telefono`
--

INSERT INTO `telefono` (`DNI`, `celular1`, `celular2`) VALUES
(34229421, '1132185230', NULL),
(37716731, '2657312733', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `traslado`
--

CREATE TABLE `traslado` (
  `idTraslado` int(11) NOT NULL,
  `numeroDeSerie` int(11) NOT NULL,
  `idCentroDeVacunacion` int(11) NOT NULL,
  `fechaDeSalida` date NOT NULL,
  `fechaDeLlegada` date DEFAULT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `traslado`
--

INSERT INTO `traslado` (`idTraslado`, `numeroDeSerie`, `idCentroDeVacunacion`, `fechaDeSalida`, `fechaDeLlegada`, `activo`) VALUES
(1, 1, 1, '2024-01-01', '2024-02-01', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `rol` varchar(255) NOT NULL,
  `nombreUsuario` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `rol`, `nombreUsuario`, `email`, `password`, `activo`) VALUES
(1, 'Super Admin', 'Eze', 'diazezequiel777@gmail.com', '$2b$05$lftFascR2MOppJMHgkj1iu.SE7Y2LDMfDVi5tvCgNTMlyFdKUp8hG', 1),
(2, 'Agente de salud', 'Federico', 'fedeicru@gmail.com', '$2b$05$x4NmUn8n9JnNCYfzUpRVTODOX3cuqqSGbWHLShQpfnq7WjwSc./l6', 1),
(3, 'Gestor de compras', 'Patricia', 'patobaigorria@gmail.com', '$2b$05$ifOf6qUi1UnStcHGPd9oruu.H1cVoDgUDrH/jiVW7HS6kcPttTzQu', 1),
(4, 'Operador de logistica', 'Lautaro', 'lauchasaucedo@gmail.com', '$2b$05$6jigAHw3HE6ZiOQWv4WBieOOLE27xfHmsrh/wukTxCXbJcvVUCdDG', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agentedesalud`
--
ALTER TABLE `agentedesalud`
  ADD PRIMARY KEY (`DNI`);

--
-- Indices de la tabla `aplicacion`
--
ALTER TABLE `aplicacion`
  ADD PRIMARY KEY (`idAplicacion`),
  ADD KEY `DNIPaciente` (`DNIPaciente`),
  ADD KEY `DNIAgente` (`DNIAgente`),
  ADD KEY `numeroDeSerie` (`numeroDeSerie`);

--
-- Indices de la tabla `centrodevacunacion`
--
ALTER TABLE `centrodevacunacion`
  ADD PRIMARY KEY (`idCentroDeVacunacion`);

--
-- Indices de la tabla `depositonacional`
--
ALTER TABLE `depositonacional`
  ADD PRIMARY KEY (`idDepositoNacional`);

--
-- Indices de la tabla `depositoprovincial`
--
ALTER TABLE `depositoprovincial`
  ADD PRIMARY KEY (`idDepositoProvincial`);

--
-- Indices de la tabla `descarte`
--
ALTER TABLE `descarte`
  ADD PRIMARY KEY (`idDescarte`),
  ADD KEY `DNIAgente` (`DNIAgente`),
  ADD KEY `numeroDeSerie` (`numeroDeSerie`);

--
-- Indices de la tabla `laboratorio`
--
ALTER TABLE `laboratorio`
  ADD PRIMARY KEY (`idLaboratorio`),
  ADD UNIQUE KEY `nombreLaboratorio` (`nombreLaboratorio`);

--
-- Indices de la tabla `loteinterno`
--
ALTER TABLE `loteinterno`
  ADD PRIMARY KEY (`numeroDeSerie`),
  ADD KEY `numeroDeLote` (`numeroDeLote`),
  ADD KEY `idLaboratorio` (`idLaboratorio`),
  ADD KEY `idDepositoNacional` (`idDepositoNacional`),
  ADD KEY `idDepositoProvincial` (`idDepositoProvincial`),
  ADD KEY `idCentroDeVacunacion` (`idCentroDeVacunacion`);

--
-- Indices de la tabla `loteproveedor`
--
ALTER TABLE `loteproveedor`
  ADD PRIMARY KEY (`numeroDeLote`),
  ADD KEY `idLaboratorio` (`idLaboratorio`);

--
-- Indices de la tabla `patologiabase`
--
ALTER TABLE `patologiabase`
  ADD PRIMARY KEY (`DNI`,`patologiaBase`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`DNI`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`idRegistro`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD PRIMARY KEY (`DNI`);

--
-- Indices de la tabla `traslado`
--
ALTER TABLE `traslado`
  ADD PRIMARY KEY (`idTraslado`),
  ADD UNIQUE KEY `traslado_idCentroDeVacunacion_numeroDeSerie_unique` (`numeroDeSerie`,`idCentroDeVacunacion`),
  ADD KEY `idCentroDeVacunacion` (`idCentroDeVacunacion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aplicacion`
--
ALTER TABLE `aplicacion`
  MODIFY `idAplicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `centrodevacunacion`
--
ALTER TABLE `centrodevacunacion`
  MODIFY `idCentroDeVacunacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `depositonacional`
--
ALTER TABLE `depositonacional`
  MODIFY `idDepositoNacional` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `depositoprovincial`
--
ALTER TABLE `depositoprovincial`
  MODIFY `idDepositoProvincial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `descarte`
--
ALTER TABLE `descarte`
  MODIFY `idDescarte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `laboratorio`
--
ALTER TABLE `laboratorio`
  MODIFY `idLaboratorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `loteinterno`
--
ALTER TABLE `loteinterno`
  MODIFY `numeroDeSerie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `loteproveedor`
--
ALTER TABLE `loteproveedor`
  MODIFY `numeroDeLote` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `idRegistro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `traslado`
--
ALTER TABLE `traslado`
  MODIFY `idTraslado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agentedesalud`
--
ALTER TABLE `agentedesalud`
  ADD CONSTRAINT `agentedesalud_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `persona` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `aplicacion`
--
ALTER TABLE `aplicacion`
  ADD CONSTRAINT `aplicacion_ibfk_1` FOREIGN KEY (`DNIPaciente`) REFERENCES `persona` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `aplicacion_ibfk_2` FOREIGN KEY (`DNIAgente`) REFERENCES `agentedesalud` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `aplicacion_ibfk_3` FOREIGN KEY (`numeroDeSerie`) REFERENCES `loteinterno` (`numeroDeSerie`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `descarte`
--
ALTER TABLE `descarte`
  ADD CONSTRAINT `descarte_ibfk_1` FOREIGN KEY (`DNIAgente`) REFERENCES `agentedesalud` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `descarte_ibfk_2` FOREIGN KEY (`numeroDeSerie`) REFERENCES `loteinterno` (`numeroDeSerie`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `loteinterno`
--
ALTER TABLE `loteinterno`
  ADD CONSTRAINT `loteinterno_ibfk_1` FOREIGN KEY (`numeroDeLote`) REFERENCES `loteproveedor` (`numeroDeLote`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `loteinterno_ibfk_2` FOREIGN KEY (`idLaboratorio`) REFERENCES `laboratorio` (`idLaboratorio`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `loteinterno_ibfk_3` FOREIGN KEY (`idDepositoNacional`) REFERENCES `depositonacional` (`idDepositoNacional`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loteinterno_ibfk_4` FOREIGN KEY (`idDepositoProvincial`) REFERENCES `depositoprovincial` (`idDepositoProvincial`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loteinterno_ibfk_5` FOREIGN KEY (`idCentroDeVacunacion`) REFERENCES `centrodevacunacion` (`idCentroDeVacunacion`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `loteproveedor`
--
ALTER TABLE `loteproveedor`
  ADD CONSTRAINT `loteproveedor_ibfk_1` FOREIGN KEY (`idLaboratorio`) REFERENCES `laboratorio` (`idLaboratorio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `patologiabase`
--
ALTER TABLE `patologiabase`
  ADD CONSTRAINT `patologiabase_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `persona` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `registro`
--
ALTER TABLE `registro`
  ADD CONSTRAINT `registro_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD CONSTRAINT `telefono_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `persona` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `traslado`
--
ALTER TABLE `traslado`
  ADD CONSTRAINT `traslado_ibfk_1` FOREIGN KEY (`numeroDeSerie`) REFERENCES `loteinterno` (`numeroDeSerie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `traslado_ibfk_2` FOREIGN KEY (`idCentroDeVacunacion`) REFERENCES `centrodevacunacion` (`idCentroDeVacunacion`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
