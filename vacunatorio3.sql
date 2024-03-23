-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-01-2024 a las 01:24:45
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
-- Base de datos: `vacunatorio3`
--
CREATE DATABASE IF NOT EXISTS `vacunatorio3` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacunatorio3`;

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
(37716730, 10000000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aplicacion`
--

CREATE TABLE `aplicacion` (
  `idAplicacion` int(11) NOT NULL,
  `DNIPaciente` int(11) NOT NULL,
  `DNIAgente` int(11) NOT NULL,
  `numeroDeSerie` int(11) NOT NULL,
  `fechaDeAplicacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centrodevacunacion`
--

CREATE TABLE `centrodevacunacion` (
  `idCentroDeVacunacion` int(11) NOT NULL,
  `longitud` double NOT NULL,
  `latitud` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `centrodevacunacion`
--

INSERT INTO `centrodevacunacion` (`idCentroDeVacunacion`, `longitud`, `latitud`) VALUES
(1, -66.307769, -33.270915),
(2, -66.283736, -33.307111);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositonacional`
--

CREATE TABLE `depositonacional` (
  `idDepositoNacional` int(11) NOT NULL,
  `longitud` double NOT NULL,
  `latitud` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `depositonacional`
--

INSERT INTO `depositonacional` (`idDepositoNacional`, `longitud`, `latitud`) VALUES
(1, -66.304722, -33.296243),
(2, -58.385468, -34.623038);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositoprovincial`
--

CREATE TABLE `depositoprovincial` (
  `idDepositoProvincial` int(11) NOT NULL,
  `longitud` double NOT NULL,
  `latitud` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `depositoprovincial`
--

INSERT INTO `depositoprovincial` (`idDepositoProvincial`, `longitud`, `latitud`) VALUES
(1, -66.370468, -33.333397);

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
  `fechaDeDescarte` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `descarte`
--

INSERT INTO `descarte` (`idDescarte`, `DNIAgente`, `numeroDeSerie`, `empresaDescartante`, `motivo`, `cantidadDeVacunas`, `fechaDeDescarte`) VALUES
(1, 37716730, 1, 'Clean Harbors', 'Vencida', 50, '2024-01-01'),
(2, 37716730, 1, 'Clean Harbors', 'Vencida', 50, '2024-01-01'),
(3, 37716730, 1, 'Veolia', 'Rotura', 50, '2024-01-01');

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
(1, 'Johnnson', 'Argentina', 'jonharg@gmail.com', '1111333333', -66.306048, -33.275904, 1),
(2, 'Pfizer', 'EEUU', 'pfizereeuu@gmail.com', '1212121212', -66.306048, -33.275904, 1),
(3, 'Bago', 'Alemania', 'bagoal@gmail.com', '1313131313', -66.306048, -33.275904, 1),
(11, 'd', 'Argentina', 'long.eze7773@gmail.com', '1132185230', -66.306048, -33.275904, 0);

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
  `idCentroDeVacunacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `loteinterno`
--

INSERT INTO `loteinterno` (`numeroDeSerie`, `numeroDeLote`, `idLaboratorio`, `cantidadDeVacunasTotales`, `cantidadDeVacunasRestantes`, `fechaDeLlegadaDepositoNacional`, `idDepositoNacional`, `fechaDeSalidaDepositoNacional`, `fechaDeLlegadaDepositoProvincial`, `idDepositoProvincial`, `fechaDeSalidaDepositoProvincial`, `fechaDeLlegadaCentroDeVacunacion`, `idCentroDeVacunacion`) VALUES
(1, 1, 1, 500, 400, '2024-01-01', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 2, 1, 500, 500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 3, 2, 500, 500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 4, 2, 500, 500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 5, 3, 500, 500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 6, 3, 500, 500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
  `fechaDeVencimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `loteproveedor`
--

INSERT INTO `loteproveedor` (`numeroDeLote`, `idLaboratorio`, `tipoDeVacuna`, `nombreComercial`, `cantidadDeLotesInternos`, `fechaDeFabricacion`, `fechaDeCompra`, `fechaDeVencimiento`) VALUES
(1, 1, 'Tuberculosis', 'BCG', 50, '2024-01-01', '2024-01-03', '2029-01-01'),
(2, 1, 'Meningitis-Neumonía', 'Neumococo Conjugada', 50, '2024-01-01', '2024-01-03', '2029-01-01'),
(3, 2, 'Difteria-Tétanos-Hepatitis B', 'Quíntuple', 50, '2024-01-01', '2024-01-03', '2029-01-01'),
(4, 2, 'Antipoliomelítica', 'IPV', 50, '2024-01-01', '2024-01-03', '2029-01-01'),
(5, 3, 'Sarampión-Rubéola-Paperas', 'Triple Viral', 50, '2024-01-01', '2024-01-03', '2029-01-01'),
(6, 3, 'Rotavirus', 'Triple Bacteriana Celular', 50, '2024-01-01', '2024-01-03', '2029-01-01');

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
(37716730, 'Ninguna');

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
  `latitud` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`DNI`, `nombre`, `apellido`, `email`, `fechaDeNacimiento`, `ocupacion`, `genero`, `longitud`, `latitud`) VALUES
(37716730, 'Federico Ivan', 'Cruceño', 'fedeicru@gmail.com', '1994-03-20', 'agente de salud', 'Masculino', -66.306048, -33.275904);

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
(37716730, '2657312733', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `traslado`
--

CREATE TABLE `traslado` (
  `idTraslado` int(11) NOT NULL,
  `numeroDeSerie` int(11) NOT NULL,
  `idCentroDeVacunacion` int(11) NOT NULL,
  `fechaDeSalida` date DEFAULT NULL,
  `fechaDeLlegada` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aplicacion`
--
ALTER TABLE `aplicacion`
  MODIFY `idAplicacion` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `idDepositoProvincial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `descarte`
--
ALTER TABLE `descarte`
  MODIFY `idDescarte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `laboratorio`
--
ALTER TABLE `laboratorio`
  MODIFY `idLaboratorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `loteinterno`
--
ALTER TABLE `loteinterno`
  MODIFY `numeroDeSerie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `loteproveedor`
--
ALTER TABLE `loteproveedor`
  MODIFY `numeroDeLote` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `traslado`
--
ALTER TABLE `traslado`
  MODIFY `idTraslado` int(11) NOT NULL AUTO_INCREMENT;

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
