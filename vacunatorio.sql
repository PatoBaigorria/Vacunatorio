-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2023 a las 20:26:33
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vacunatorio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agentedesalud`
--

CREATE TABLE `agentedesalud` (
  `DNI` int(11) NOT NULL,
  `matricula` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `agentedesalud`
--

INSERT INTO `agentedesalud` (`DNI`, `matricula`) VALUES
(34000007, 10000),
(34000008, 10001),
(34000009, 10002);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aplicacion`
--

CREATE TABLE `aplicacion` (
  `idAplicacion` int(11) NOT NULL,
  `DNI` int(11) NOT NULL,
  `matricula` int(11) NOT NULL,
  `numeroDeSerie` int(11) NOT NULL,
  `fechaDeAplicacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aplicacion`
--

INSERT INTO `aplicacion` (`idAplicacion`, `DNI`, `matricula`, `numeroDeSerie`, `fechaDeAplicacion`) VALUES
(1, 34000000, 10000, 1, '2023-09-05'),
(2, 34000001, 10001, 6, '2023-09-05'),
(3, 34000002, 10002, 11, '2023-09-05'),
(4, 34000003, 10000, 16, '2023-09-05'),
(5, 34000004, 10001, 2, '2023-09-05'),
(6, 34000005, 10002, 7, '2023-09-05'),
(7, 34000006, 10000, 12, '2023-09-05'),
(8, 34000007, 10001, 17, '2023-09-05'),
(9, 34000008, 10002, 3, '2023-09-05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centrodevacunacion`
--

CREATE TABLE `centrodevacunacion` (
  `idCentroDeVacunacion` int(11) NOT NULL,
  `longitud` int(11) NOT NULL,
  `latitud` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `centrodevacunacion`
--

INSERT INTO `centrodevacunacion` (`idCentroDeVacunacion`, `longitud`, `latitud`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositonacional`
--

CREATE TABLE `depositonacional` (
  `idDepositoNacional` int(11) NOT NULL,
  `longitud` int(11) NOT NULL,
  `latitud` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `depositonacional`
--

INSERT INTO `depositonacional` (`idDepositoNacional`, `longitud`, `latitud`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositoprovincial`
--

CREATE TABLE `depositoprovincial` (
  `idDepositoProvincial` int(11) NOT NULL,
  `longitud` int(11) NOT NULL,
  `latitud` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `depositoprovincial`
--

INSERT INTO `depositoprovincial` (`idDepositoProvincial`, `longitud`, `latitud`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descarte`
--

CREATE TABLE `descarte` (
  `idDescarte` int(11) NOT NULL,
  `matricula` int(11) NOT NULL,
  `numeroDeSerie` int(11) NOT NULL,
  `empresaDescartante` varchar(50) NOT NULL,
  `motivo` varchar(50) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fechaDeDescarte` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `descarte`
--

INSERT INTO `descarte` (`idDescarte`, `matricula`, `numeroDeSerie`, `empresaDescartante`, `motivo`, `cantidad`, `fechaDeDescarte`) VALUES
(1, 10000, 19, 'Descarte Seguro SA', 'Rotura de caja', 10, '2023-06-15'),
(2, 10001, 2, 'Descarte Seguro SA', 'Rotura de vacuna', 1, '2023-06-15'),
(3, 10002, 8, 'Descarte Seguro SA', 'Rotura de caja', 10, '2023-06-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laboratorio`
--

CREATE TABLE `laboratorio` (
  `idLaboratorio` int(11) NOT NULL,
  `nombreLaboratorio` varchar(50) NOT NULL,
  `pais` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `longitud` int(11) NOT NULL,
  `latitud` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `laboratorio`
--

INSERT INTO `laboratorio` (`idLaboratorio`, `nombreLaboratorio`, `pais`, `email`, `telefono`, `longitud`, `latitud`) VALUES
(1, 'Laboratorio 1', 'EEUU', 'lab1@gmail.com', '10001', 1, 1),
(2, 'Laboratorio 2', 'China', 'lab2@gmail.com', '10002', 1, 2),
(3, 'Laboratorio 3', 'Rusia', 'lab3@gmail.com', '10003', 1, 3),
(4, 'Laboratorio 4', 'Francia', 'lab4@gmail.com', '10004', 1, 4),
(5, 'Laboratorio 5', 'Argentina', 'lab5@gmail.com', '10005', 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loteinterno`
--

CREATE TABLE `loteinterno` (
  `numeroDeSerie` int(11) NOT NULL,
  `numeroDeLote` int(11) NOT NULL,
  `idLaboratorio` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fechaDeLlegadaDepositoNacional` date DEFAULT NULL,
  `idDepositoNacional` int(11) DEFAULT NULL,
  `fechaDeSalidaDepositoNacional` date DEFAULT NULL,
  `fechaDeLlegadaDepositoProvincial` date DEFAULT NULL,
  `idDepositoProvincial` int(11) DEFAULT NULL,
  `fechaDeSalidaDepositoProvincial` date DEFAULT NULL,
  `fechaDeLlegadaCentroDeVacunacion` date DEFAULT NULL,
  `idCentroDeVacunacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `loteinterno`
--

INSERT INTO `loteinterno` (`numeroDeSerie`, `numeroDeLote`, `idLaboratorio`, `cantidad`, `fechaDeLlegadaDepositoNacional`, `idDepositoNacional`, `fechaDeSalidaDepositoNacional`, `fechaDeLlegadaDepositoProvincial`, `idDepositoProvincial`, `fechaDeSalidaDepositoProvincial`, `fechaDeLlegadaCentroDeVacunacion`, `idCentroDeVacunacion`) VALUES
(1, 1, 1, 5, '2023-02-01', 1, '2023-03-01', '2023-04-01', 1, '2023-05-01', '2023-06-01', 1),
(2, 1, 1, 5, '2023-02-01', 1, '2023-03-01', '2023-04-01', 1, '2023-05-01', '2023-06-01', 1),
(3, 2, 1, 5, '2023-02-01', 2, '2023-03-01', '2023-04-01', 2, '2023-05-01', '2023-06-01', 2),
(4, 2, 1, 5, '2023-02-01', 2, '2023-03-01', '2023-04-01', 2, '2023-05-01', '2023-06-01', 2),
(5, 1, 2, 5, '2023-02-01', 3, '2023-03-01', '2023-04-01', 3, '2023-05-01', '2023-06-01', 3),
(6, 1, 2, 5, '2023-02-01', 3, '2023-03-01', '2023-04-01', 3, '2023-05-01', '2023-06-01', 3),
(7, 2, 2, 5, '2023-02-01', 4, '2023-03-01', '2023-04-01', 4, '2023-05-01', '2023-06-01', 4),
(8, 2, 2, 5, '2023-02-01', 4, '2023-03-01', '2023-04-01', 4, '2023-05-01', '2023-06-01', 4),
(9, 1, 3, 5, '2023-02-01', 5, '2023-03-01', '2023-04-01', 5, '2023-05-01', '2023-06-01', 5),
(10, 1, 3, 5, '2023-02-01', 5, '2023-03-01', '2023-04-01', 5, '2023-05-01', '2023-06-01', 5),
(11, 2, 3, 5, '2023-02-01', 6, '2023-03-01', '2023-04-01', 6, '2023-05-01', '2023-06-01', 6),
(12, 1, 4, 5, '2023-02-01', 6, '2023-03-01', '2023-04-01', 6, '2023-05-01', '2023-06-01', 6),
(13, 1, 4, 5, '2023-02-01', 1, '2023-03-01', '2023-04-01', 1, '2023-05-01', '2023-06-01', 1),
(14, 2, 4, 5, '2023-02-01', 1, '2023-03-01', '2023-04-01', 1, '2023-05-01', '2023-06-01', 1),
(15, 2, 4, 5, '2023-02-01', 2, '2023-03-01', '2023-04-01', 2, '2023-05-01', '2023-06-01', 2),
(16, 1, 5, 5, '2023-02-01', 2, '2023-03-01', '2023-04-01', 2, '2023-05-01', '2023-06-01', 2),
(17, 1, 5, 5, '2023-02-01', 3, '2023-03-01', '2023-04-01', 3, '2023-05-01', '2023-06-01', 3),
(18, 2, 5, 5, '2023-02-01', 3, '2023-03-01', '2023-04-01', 3, '2023-05-01', '2023-06-01', 3),
(19, 2, 5, 5, '2023-02-01', 4, '2023-03-01', '2023-04-01', 4, '2023-05-01', '2023-06-01', 4),
(20, 2, 3, 5, '2023-02-01', 4, '2023-03-01', '2023-04-01', 4, '2023-05-01', '2023-06-01', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loteproveedor`
--

CREATE TABLE `loteproveedor` (
  `numeroDeLote` int(11) NOT NULL,
  `idLaboratorio` int(11) NOT NULL,
  `tipoDeVacuna` varchar(25) NOT NULL,
  `nombreComercial` varchar(50) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fechaDeFabricacion` date NOT NULL,
  `fechaDeVencimiento` date NOT NULL,
  `fechaDeCompra` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `loteproveedor`
--

INSERT INTO `loteproveedor` (`numeroDeLote`, `idLaboratorio`, `tipoDeVacuna`, `nombreComercial`, `cantidad`, `fechaDeFabricacion`, `fechaDeVencimiento`, `fechaDeCompra`) VALUES
(1, 1, 'vac A', 'Vacuna A', 10, '2022-01-01', '2027-01-01', '2023-01-01'),
(1, 2, 'vac A', 'Vacuna A', 10, '2022-01-01', '2027-01-01', '2023-01-01'),
(1, 3, 'vac A', 'Vacuna A', 10, '2022-01-01', '2027-01-01', '2023-01-01'),
(1, 4, 'vac A', 'Vacuna A', 10, '2022-01-01', '2027-01-01', '2023-01-01'),
(1, 5, 'vac A', 'Vacuna A', 10, '2022-01-01', '2027-01-01', '2023-01-01'),
(2, 1, 'vac B', 'Vacuna B', 10, '2022-01-01', '2027-01-01', '2023-01-01'),
(2, 2, 'vac B', 'Vacuna B', 10, '2022-01-01', '2027-01-01', '2023-01-01'),
(2, 3, 'vac B', 'Vacuna B', 10, '2022-01-01', '2027-01-01', '2023-01-01'),
(2, 4, 'vac B', 'Vacuna B', 10, '2022-01-01', '2027-01-01', '2023-01-01'),
(2, 5, 'vac B', 'Vacuna B', 10, '2022-01-01', '2027-01-01', '2023-01-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `DNI` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`DNI`) VALUES
(34000000),
(34000001),
(34000002),
(34000003),
(34000004),
(34000005),
(34000006),
(34000007),
(34000008),
(34000009);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patologiabase`
--

CREATE TABLE `patologiabase` (
  `DNI` int(11) NOT NULL,
  `patologiaBase` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `patologiabase`
--

INSERT INTO `patologiabase` (`DNI`, `patologiaBase`) VALUES
(34000000, 'Anginas'),
(34000000, 'Sobrepeso'),
(34000001, 'Alergia'),
(34000002, 'Alergia'),
(34000003, 'Arritmia'),
(34000004, 'Sobrepeso'),
(34000005, ''),
(34000006, 'Angina'),
(34000007, 'Alergia'),
(34000007, 'Angina'),
(34000008, 'Alergia'),
(34000009, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `DNI` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fechaDeNacimiento` date NOT NULL,
  `ocupacion` varchar(50) NOT NULL,
  `genero` varchar(10) NOT NULL,
  `longitud` int(11) NOT NULL,
  `latitud` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`DNI`, `nombre`, `apellido`, `email`, `fechaDeNacimiento`, `ocupacion`, `genero`, `longitud`, `latitud`) VALUES
(34000000, 'Juan', 'Perez', 'jupe00@gmail.com', '1988-01-01', 'Desempleado', 'Masculino', 1, 0),
(34000001, 'Adriana', 'Heredia', 'adhe01@gmail.com', '1988-02-01', 'Obrera', 'Femenino', 1, 1),
(34000002, 'Javier', 'Dominguez', 'javo02@gmail.com', '1988-03-01', 'Albañil', 'Masculino', 1, 2),
(34000003, 'Milena', 'Pueyrredon', 'mipu03@gmail.com', '1988-04-01', 'Gerenta', 'Femenino', 1, 3),
(34000004, 'Ramiro', 'Martinez', 'rama04@gmail.com', '1988-05-01', 'Arquitecto', 'Masculino', 1, 4),
(34000005, 'Lourdes', 'Gonzales', 'logo05@gmail.com', '1988-06-01', 'Musica', 'Femenino', 1, 5),
(34000006, 'Federico', 'Rodriguez', 'fero06@gmail.com', '1988-07-01', 'Docente', 'Masculino', 1, 6),
(34000007, 'Beatriz', 'Hernando', 'behe07@gmail.com', '1988-08-01', 'Medica', 'Femenino', 1, 7),
(34000008, 'Ivan', 'Juarez', 'ivju08@gmail.com', '1988-09-01', 'Medico', 'Masculino', 1, 8),
(34000009, 'Lara', 'Maitena', 'lama09@gmail.com', '1988-10-01', 'Enfermera', 'Femenino', 1, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `telefono`
--

CREATE TABLE `telefono` (
  `DNI` int(11) NOT NULL,
  `celular1` varchar(15) DEFAULT NULL,
  `celular2` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `telefono`
--

INSERT INTO `telefono` (`DNI`, `celular1`, `celular2`) VALUES
(34000000, '1132180000', '1132180001'),
(34000001, '1132180002', NULL),
(34000002, '1132180003', NULL),
(34000003, NULL, NULL),
(34000004, '1132180004', NULL),
(34000005, '1132180005', NULL),
(34000006, NULL, NULL),
(34000007, '1132180006', NULL),
(34000008, '1132180007', NULL),
(34000009, '1132180008', '1132180009');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `traslado`
--

CREATE TABLE `traslado` (
  `idTraslado` int(11) NOT NULL,
  `numeroDeSerie` int(11) NOT NULL,
  `idCentroDeVacunacion` int(11) NOT NULL,
  `fechaDeSalida` date NOT NULL,
  `fechaDeLlegada` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `traslado`
--

INSERT INTO `traslado` (`idTraslado`, `numeroDeSerie`, `idCentroDeVacunacion`, `fechaDeSalida`, `fechaDeLlegada`) VALUES
(1, 5, 1, '2023-07-01', '2023-08-01'),
(2, 10, 2, '2023-07-01', '2023-08-01'),
(3, 15, 5, '2023-07-01', '2023-08-01'),
(4, 20, 6, '2023-07-01', '2023-08-01');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agentedesalud`
--
ALTER TABLE `agentedesalud`
  ADD PRIMARY KEY (`matricula`),
  ADD UNIQUE KEY `DNI` (`DNI`);

--
-- Indices de la tabla `aplicacion`
--
ALTER TABLE `aplicacion`
  ADD PRIMARY KEY (`idAplicacion`),
  ADD KEY `DNI` (`DNI`),
  ADD KEY `numeroDeSerie` (`numeroDeSerie`),
  ADD KEY `matricula` (`matricula`);

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
  ADD KEY `numeroDeSerie` (`numeroDeSerie`),
  ADD KEY `matricula` (`matricula`);

--
-- Indices de la tabla `laboratorio`
--
ALTER TABLE `laboratorio`
  ADD PRIMARY KEY (`idLaboratorio`);

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
  ADD PRIMARY KEY (`numeroDeLote`,`idLaboratorio`),
  ADD KEY `idLaboratorio` (`idLaboratorio`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`DNI`);

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
-- Indices de la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD PRIMARY KEY (`DNI`);

--
-- Indices de la tabla `traslado`
--
ALTER TABLE `traslado`
  ADD PRIMARY KEY (`idTraslado`),
  ADD KEY `idCentroDeVacunacion` (`idCentroDeVacunacion`),
  ADD KEY `numeroDeSerie` (`numeroDeSerie`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aplicacion`
--
ALTER TABLE `aplicacion`
  MODIFY `idAplicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `centrodevacunacion`
--
ALTER TABLE `centrodevacunacion`
  MODIFY `idCentroDeVacunacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `depositonacional`
--
ALTER TABLE `depositonacional`
  MODIFY `idDepositoNacional` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `depositoprovincial`
--
ALTER TABLE `depositoprovincial`
  MODIFY `idDepositoProvincial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `descarte`
--
ALTER TABLE `descarte`
  MODIFY `idDescarte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `laboratorio`
--
ALTER TABLE `laboratorio`
  MODIFY `idLaboratorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `loteinterno`
--
ALTER TABLE `loteinterno`
  MODIFY `numeroDeSerie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `traslado`
--
ALTER TABLE `traslado`
  MODIFY `idTraslado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agentedesalud`
--
ALTER TABLE `agentedesalud`
  ADD CONSTRAINT `agentedesalud_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `persona` (`DNI`);

--
-- Filtros para la tabla `aplicacion`
--
ALTER TABLE `aplicacion`
  ADD CONSTRAINT `aplicacion_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `paciente` (`DNI`),
  ADD CONSTRAINT `aplicacion_ibfk_3` FOREIGN KEY (`numeroDeSerie`) REFERENCES `loteinterno` (`numeroDeSerie`),
  ADD CONSTRAINT `aplicacion_ibfk_4` FOREIGN KEY (`matricula`) REFERENCES `agentedesalud` (`matricula`);

--
-- Filtros para la tabla `descarte`
--
ALTER TABLE `descarte`
  ADD CONSTRAINT `descarte_ibfk_1` FOREIGN KEY (`numeroDeSerie`) REFERENCES `loteinterno` (`numeroDeSerie`),
  ADD CONSTRAINT `descarte_ibfk_2` FOREIGN KEY (`matricula`) REFERENCES `agentedesalud` (`matricula`);

--
-- Filtros para la tabla `loteinterno`
--
ALTER TABLE `loteinterno`
  ADD CONSTRAINT `loteinterno_ibfk_1` FOREIGN KEY (`numeroDeLote`) REFERENCES `loteproveedor` (`numeroDeLote`),
  ADD CONSTRAINT `loteinterno_ibfk_2` FOREIGN KEY (`idLaboratorio`) REFERENCES `loteproveedor` (`idLaboratorio`),
  ADD CONSTRAINT `loteinterno_ibfk_3` FOREIGN KEY (`idDepositoNacional`) REFERENCES `depositonacional` (`idDepositoNacional`),
  ADD CONSTRAINT `loteinterno_ibfk_4` FOREIGN KEY (`idDepositoProvincial`) REFERENCES `depositoprovincial` (`idDepositoProvincial`),
  ADD CONSTRAINT `loteinterno_ibfk_5` FOREIGN KEY (`idCentroDeVacunacion`) REFERENCES `centrodevacunacion` (`idCentroDeVacunacion`);

--
-- Filtros para la tabla `loteproveedor`
--
ALTER TABLE `loteproveedor`
  ADD CONSTRAINT `loteproveedor_ibfk_1` FOREIGN KEY (`idLaboratorio`) REFERENCES `laboratorio` (`idLaboratorio`);

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `persona` (`DNI`);

--
-- Filtros para la tabla `patologiabase`
--
ALTER TABLE `patologiabase`
  ADD CONSTRAINT `patologiabase_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `persona` (`DNI`);

--
-- Filtros para la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD CONSTRAINT `telefono_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `persona` (`DNI`);

--
-- Filtros para la tabla `traslado`
--
ALTER TABLE `traslado`
  ADD CONSTRAINT `traslado_ibfk_1` FOREIGN KEY (`idCentroDeVacunacion`) REFERENCES `centrodevacunacion` (`idCentroDeVacunacion`),
  ADD CONSTRAINT `traslado_ibfk_2` FOREIGN KEY (`numeroDeSerie`) REFERENCES `loteinterno` (`numeroDeSerie`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
