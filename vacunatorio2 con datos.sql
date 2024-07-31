-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-07-2024 a las 08:58:56
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `agentedesalud`
--

INSERT INTO `agentedesalud` (`DNI`, `matricula`) VALUES
(12345615, NULL),
(12345623, NULL),
(12345639, NULL),
(12345675, NULL),
(12345679, NULL),
(37716731, 10000000),
(12345603, 15935785),
(12345607, 15935786),
(12345611, 15935787),
(12345619, 15935789),
(12345627, 15935791),
(12345631, 15935792),
(12345635, 15935793),
(12345643, 15935795),
(12345647, 15935796),
(12345651, 15935797),
(12345655, 15935798),
(12345659, 15935799),
(12345663, 15935800),
(12345667, 15935801),
(12345671, 15935802),
(12345683, 15935805),
(12345687, 15935806),
(12345691, 15935807),
(12345695, 15935808),
(12345699, 15935809);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aplicacion`
--

INSERT INTO `aplicacion` (`idAplicacion`, `DNIPaciente`, `DNIAgente`, `numeroDeSerie`, `fechaDeAplicacion`, `activo`) VALUES
(1, 34229421, 12345695, 1, '2024-06-02', 1),
(2, 27013989, 12345695, 8, '2024-06-20', 1),
(3, 34229421, 12345695, 5, '2024-05-01', 1),
(4, 47669942, 12345695, 2, '2024-07-19', 1),
(5, 49221038, 12345695, 2, '2024-07-03', 1),
(6, 12345641, 12345695, 2, '2024-07-14', 1),
(7, 12345641, 12345695, 8, '2024-01-02', 1),
(8, 49221038, 12345695, 8, '2024-01-02', 1),
(9, 50479934, 12345695, 4, '2024-06-17', 1),
(10, 12345677, 12345695, 9, '2024-07-30', 1),
(11, 12345657, 12345695, 9, '2024-07-30', 1),
(12, 12345665, 12345695, 9, '2023-01-01', 1),
(13, 12345657, 12345695, 9, '2023-01-01', 1),
(14, 12345661, 12345695, 9, '2024-01-01', 1),
(15, 12345665, 12345695, 9, '2024-01-01', 1),
(16, 34229421, 12345695, 9, '2024-01-01', 1),
(17, 12345675, 12345695, 9, '2024-02-01', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centrodevacunacion`
--

CREATE TABLE `centrodevacunacion` (
  `idCentroDeVacunacion` int(11) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `localidad` varchar(255) NOT NULL,
  `provincia` varchar(255) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `centrodevacunacion`
--

INSERT INTO `centrodevacunacion` (`idCentroDeVacunacion`, `direccion`, `localidad`, `provincia`, `activo`) VALUES
(1, 'La Cruz 301', 'La Ribera', 'San Luis', 1),
(2, 'Los Medicos 1587', 'Las Mojarras', 'Catamarca', 1),
(3, 'Sargento Cabral 203', 'Los Molinos', 'Córdoba', 1),
(4, 'Calle Falsa 123', 'Rafael Calzada', 'Buenos Aires', 1),
(5, 'Avenida Siempreviva 742', 'Villa San Miguel', 'Córdoba', 1),
(6, 'Callejón Diagon Alley 4', 'Las Rosas', 'Santa Fe', 1),
(7, 'Boulevard de los Sueños Rotos 100', '4ta Sección', 'Mendoza', 1),
(8, 'Avenida de Mayo 1200', 'Resistencia', 'Chaco', 1),
(9, 'Pasaje del Terror 666', 'Corrientes', 'Corrientes', 1),
(10, 'Calle del Sol 111', 'Pindapoy', 'Misiones', 1),
(11, 'Ruta 40 Km 400', 'Las Talas', 'San Juan', 1),
(12, 'Calle de las Estrellas 10', 'Diamante', 'Entre Ríos', 1),
(13, 'Avenida del Libertador 8500', 'Salta', 'Salta', 1),
(14, 'Pasaje de los Sueños 99', 'La Florida', 'Tucumán', 1),
(15, 'Calle de la Amistad 55', 'Los Nogales', 'Jujuy', 1),
(16, 'Boulevard del Parque 300', 'La Ribera', 'San Luis', 1),
(17, 'Calle de la Paz 1', 'Santa Rosa', 'La Pampa', 1),
(18, 'Avenida de las Palmeras 120', 'Fortín Soledad', 'Formosa', 1),
(19, 'Calle de los Vientos 500', 'Barrio Castelli', 'Chubut', 1),
(20, 'Avenida de los Tilos 600', 'Mariano Moreno', 'Neuquén', 1),
(21, 'Boulevard del Mar 800', 'Jaramillo', 'Santa Cruz', 1),
(22, 'Calle de las Flores 70', 'Machigasta', 'La Rioja', 1),
(23, 'Pasaje de los Poetas 150', 'El Alamito', 'Catamarca', 1),
(24, 'Calle de los Sueños 99', 'Puerto Argentino', 'Tierra del Fuego, Antártida e Islas del Atlántico Sur', 1),
(25, 'Avenida de los Próceres 1400', 'Cinco Saltos', 'Río Negro', 1),
(26, 'Calle de las Nubes 200', 'Malbrán', 'Santiago del Estero', 1),
(27, 'Av. de los Libertadores 1500', 'Don Orione', 'Buenos Aires', 1),
(28, 'Calle de los Aromos 120', 'Las Quintas', 'Córdoba', 1),
(29, 'Pasaje de los Cedros 130', 'Bouquet', 'Santa Fe', 1),
(30, 'Calle de los Pinos 140', '3ra Sección', 'Mendoza', 1),
(31, 'Avenida del Estadio 1100', 'Concepción del Bermejo', 'Chaco', 1),
(32, 'Calle de los Andes 160', 'Tatacua', 'Corrientes', 1),
(33, 'Boulevard de los Héroes 500', 'San José', 'Misiones', 1),
(34, 'Calle de los Gigantes 170', 'Las Talas', 'San Juan', 1),
(35, 'Avenida del Centro 1200', 'Concordia', 'Entre Ríos', 1),
(36, 'Calle de las Almas 180', 'Colonia Santa Rosa', 'Salta', 1),
(37, 'Pasaje del Amanecer 190', 'Famaillá', 'Tucumán', 1),
(38, 'Calle del Descanso 2', 'Libertador General San Martín', 'Jujuy', 1),
(39, 'Boulevard del Puente 400', 'Villa Mercedes', 'San Luis', 1),
(40, 'Calle del Refugio 3', 'Santa Rosa', 'La Pampa', 1),
(41, 'Avenida de las Brisas 500', 'Fortín Soledad', 'Formosa', 1),
(42, 'Calle de los Sauces 210', 'Kilómetro 3 - General Mosconi', 'Chubut', 1),
(43, 'Boulevard de los Arroyos 800', 'Mariano Moreno', 'Neuquén', 1),
(44, 'Calle de los Ríos 220', 'Caleta Olivia', 'Santa Cruz', 1),
(45, 'Avenida de las Lomas 600', 'Villa Unión', 'La Rioja', 1),
(46, 'Calle de los Cielos 230', 'Las Mojarras', 'Catamarca', 1),
(47, 'Pasaje del Bosque 240', 'Ushuaia', 'Tierra del Fuego, Antártida e Islas del Atlántico Sur', 1),
(48, 'Calle del Silencio 1', 'Cipolletti', 'Río Negro', 1),
(49, 'Avenida del Norte 250', 'Casares', 'Santiago del Estero', 1),
(50, 'Calle de los Poetas 99', 'Claypole', 'Buenos Aires', 1),
(51, 'Boulevard del Faro 700', 'Los Molinos', 'Córdoba', 1),
(52, 'Calle de las Rosas 260', 'Presidente Roca', 'Santa Fe', 1),
(53, 'Avenida de los Abedules 1400', '1ra Sección', 'Mendoza', 1),
(54, 'Pasaje del Mirador 270', 'Isla del Cerrito', 'Chaco', 1),
(55, 'Calle de los Álamos 280', 'Bella Vista', 'Corrientes', 1),
(56, 'Boulevard de los Lagos 800', 'Apóstoles', 'Misiones', 1),
(57, 'Calle de los Suspiros 290', 'Las Talas', 'San Juan', 1),
(58, 'Avenida del Sol 300', 'Benito Legerén', 'Entre Ríos', 1),
(59, 'Calle de los Sueños 310', 'San Carlos de Bariloche', 'Río Negro', 1),
(60, 'Pasaje de las Estrellas 320', 'Villa Recaste', 'Tucumán', 1),
(61, 'Calle del Alba 4', 'Aguas Calientes', 'Jujuy', 1),
(62, 'Boulevard del Monte 1000', 'El Chorrillo', 'San Luis', 1),
(63, 'Calle de los Encantos 330', 'Anzoátegui', 'La Pampa', 1),
(64, 'Avenida de los Arrayanes 500', 'Los Chiriguanos', 'Formosa', 1),
(65, 'Calle de los Nogales 340', 'Caleta Olivares', 'Chubut', 1),
(66, 'Boulevard de los Naranjos 800', 'Mariano Moreno', 'Neuquén', 1),
(67, 'Calle de los Cedros 350', 'Pico Truncado', 'Santa Cruz', 1),
(68, 'Avenida del Parque 1400', 'Anguinán', 'La Rioja', 1),
(69, 'Calle de los Tilos 360', 'Alto de las Juntas', 'Catamarca', 1),
(70, 'Pasaje de los Sueños 370', 'Río Grande', 'Tierra del Fuego, Antártida e Islas del Atlántico Sur', 1),
(71, 'Calle del Horizonte 10', 'Cipolletti', 'Río Negro', 1),
(72, 'Avenida de los Libros 380', 'Malbrán', 'Santiago del Estero', 1),
(73, 'Calle de los Poetas 99', 'Burzaco', 'Buenos Aires', 1),
(74, 'Boulevard del Arte 1400', 'Santa Rosa de Calamuchita', 'Córdoba', 1),
(75, 'Calle de las Colinas 390', 'Armstrong', 'Santa Fe', 1),
(76, 'Avenida de los Abedules 1500', 'Bermejo', 'Mendoza', 1),
(77, 'Pasaje de los Pinos 400', 'General Vedia', 'Chaco', 1),
(78, 'Calle de los Sauces 410', 'Corrientes', 'Corrientes', 1),
(79, 'Boulevard del Valle 800', 'Apóstoles', 'Misiones', 1),
(80, 'Calle de los Robles 420', 'La Rinconada', 'San Juan', 1),
(81, 'Avenida del Desierto 1300', 'Benito Legerén', 'Entre Ríos', 1),
(82, 'Calle de las Acacias 430', 'Colonia Santa Rosa', 'Salta', 1),
(83, 'Pasaje de las Flores 440', 'Alderetes', 'Tucumán', 1),
(84, 'Calle de los Cedros 11', 'Palpalá', 'Jujuy', 1),
(85, 'Boulevard del Lago 1100', 'Cerro Colorado', 'San Luis', 1),
(86, 'Calle de los Nogales 450', 'Anguil', 'La Pampa', 1),
(87, 'Avenida del Jardín 600', 'Bartolomé de las Casas', 'Formosa', 1),
(88, 'Calle de los Álamos 460', 'Acceso Norte', 'Chubut', 1),
(89, 'Boulevard del Campo 800', 'Aguada San Roque', 'Neuquén', 1),
(90, 'Calle de los Sauces 470', 'Puerto Deseado', 'Santa Cruz', 1),
(91, 'Avenida del Norte 1500', 'Aimogasta', 'La Rioja', 1),
(92, 'Calle de los Encinos 480', 'Aconquija', 'Catamarca', 1),
(93, 'Pasaje de los Ríos 490', 'Adrogué', 'Buenos Aires', 1),
(94, 'Calle del Refugio 20', 'Bahía Creek', 'Río Negro', 1),
(95, 'Avenida del Este 500', 'Campo Gallo', 'Santiago del Estero', 1),
(96, 'Calle de las Letras 99', 'Adrogué', 'Buenos Aires', 1),
(97, 'Bv de los Encantos 1400', 'La Floresta', 'Córdoba', 1),
(98, 'Calle de las Maravillas 510', 'Armstrong', 'Santa Fe', 1),
(99, 'Avenida del Norte 1600', '10ma Sección', 'Mendoza', 1),
(100, 'Pasaje de los Sueños 520', 'Concepción del Bermejo', 'Chaco', 1),
(101, 'Calle de los Robles 530', 'Bella Vista', 'Corrientes', 1),
(102, 'Boulevard del Sol 800', 'Apóstoles', 'Misiones', 1),
(103, 'Calle de los Cedros 540', 'La Rinconada', 'San Juan', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositonacional`
--

CREATE TABLE `depositonacional` (
  `idDepositoNacional` int(11) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `provincia` varchar(255) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `depositonacional`
--

INSERT INTO `depositonacional` (`idDepositoNacional`, `direccion`, `provincia`, `activo`) VALUES
(1, 'Colorado 5789', 'La Rioja', 1),
(2, 'Río Bamba 339', 'Santa Fe', 1),
(3, 'Colombia 2536', 'Santa Cruz', 1),
(4, 'Calle Falsa 123', 'Buenos Aires', 1),
(5, 'Avenida Siempreviva 742', 'Córdoba', 1),
(6, 'Callejón Diagon Alley 4', 'Santa Fe', 1),
(7, 'Boulevard de los Sueños Rotos 100', 'Mendoza', 1),
(8, 'Avenida de Mayo 1200', 'Chaco', 1),
(9, 'Pasaje del Terror 666', 'Corrientes', 1),
(10, 'Calle del Sol 111', 'Misiones', 1),
(11, 'Ruta 40 Km 400', 'San Juan', 1),
(12, 'Calle de las Estrellas 10', 'Entre Ríos', 1),
(13, 'Avenida del Libertador 8500', 'Salta', 1),
(14, 'Pasaje de los Sueños 99', 'Tucumán', 1),
(15, 'Calle de la Amistad 55', 'Jujuy', 1),
(16, 'Boulevard del Parque 300', 'San Luis', 1),
(17, 'Calle de la Paz 1', 'La Pampa', 1),
(18, 'Avenida de las Palmeras 120', 'Formosa', 1),
(19, 'Calle de los Vientos 500', 'Chubut', 1),
(20, 'Avenida de los Tilos 600', 'Neuquén', 1),
(21, 'Boulevard del Mar 800', 'Santa Cruz', 1),
(22, 'Calle de las Flores 70', 'La Rioja', 1),
(23, 'Pasaje de los Poetas 150', 'Catamarca', 1),
(24, 'Calle de los Sueños 99', 'Tierra del Fuego', 1),
(25, 'Avenida de los Próceres 1400', 'Río Negro', 1),
(26, 'Calle de las Nubes 200', 'Santiago del Estero', 1),
(27, 'Avenida de los Libertadores 1500', 'Buenos Aires', 1),
(28, 'Calle de los Aromos 120', 'Córdoba', 1),
(29, 'Pasaje de los Cedros 130', 'Santa Fe', 1),
(30, 'Calle de los Pinos 140', 'Mendoza', 1),
(31, 'Avenida del Estadio 1100', 'Chaco', 1),
(32, 'Calle de los Andes 160', 'Corrientes', 1),
(33, 'Boulevard de los Héroes 500', 'Misiones', 1),
(34, 'Calle de los Gigantes 170', 'San Juan', 1),
(35, 'Avenida del Centro 1200', 'Entre Ríos', 1),
(36, 'Calle de las Almas 180', 'Salta', 1),
(37, 'Pasaje del Amanecer 190', 'Tucumán', 1),
(38, 'Calle del Descanso 2', 'Jujuy', 1),
(39, 'Boulevard del Puente 400', 'San Luis', 1),
(40, 'Calle del Refugio 3', 'La Pampa', 1),
(41, 'Avenida de las Brisas 500', 'Formosa', 1),
(42, 'Calle de los Sauces 210', 'Chubut', 1),
(43, 'Boulevard de los Arroyos 800', 'Neuquén', 1),
(44, 'Calle de los Ríos 220', 'Santa Cruz', 1),
(45, 'Avenida de las Lomas 600', 'La Rioja', 1),
(46, 'Calle de los Cielos 230', 'Catamarca', 1),
(47, 'Pasaje del Bosque 240', 'Tierra del Fuego', 1),
(48, 'Calle del Silencio 1', 'Río Negro', 1),
(49, 'Avenida del Norte 250', 'Santiago del Estero', 1),
(50, 'Calle de los Poetas 99', 'Buenos Aires', 1),
(51, 'Boulevard del Faro 700', 'Córdoba', 1),
(52, 'Calle de las Rosas 260', 'Santa Fe', 1),
(53, 'Avenida de los Abedules 1400', 'Mendoza', 1),
(54, 'Pasaje del Mirador 270', 'Chaco', 1),
(55, 'Calle de los Álamos 280', 'Corrientes', 1),
(56, 'Boulevard de los Lagos 800', 'Misiones', 1),
(57, 'Calle de los Suspiros 290', 'San Juan', 1),
(58, 'Avenida del Sol 300', 'Entre Ríos', 1),
(59, 'Calle de los Sueños 310', 'Salta', 1),
(60, 'Pasaje de las Estrellas 320', 'Tucumán', 1),
(61, 'Calle del Alba 4', 'Jujuy', 1),
(62, 'Boulevard del Monte 1000', 'San Luis', 1),
(63, 'Calle de los Encantos 330', 'La Pampa', 1),
(64, 'Avenida de los Arrayanes 500', 'Formosa', 1),
(65, 'Calle de los Nogales 340', 'Chubut', 1),
(66, 'Boulevard de los Naranjos 800', 'Neuquén', 1),
(67, 'Calle de los Cedros 350', 'Santa Cruz', 1),
(68, 'Avenida del Parque 1400', 'La Rioja', 1),
(69, 'Calle de los Tilos 360', 'Catamarca', 1),
(70, 'Pasaje de los Sueños 370', 'Tierra del Fuego', 1),
(71, 'Calle del Horizonte 10', 'Río Negro', 1),
(72, 'Avenida de los Libros 380', 'Santiago del Estero', 1),
(73, 'Calle de los Poetas 99', 'Buenos Aires', 1),
(74, 'Boulevard del Arte 1400', 'Córdoba', 1),
(75, 'Calle de las Colinas 390', 'Santa Fe', 1),
(76, 'Avenida de los Abedules 1500', 'Mendoza', 1),
(77, 'Pasaje de los Pinos 400', 'Chaco', 1),
(78, 'Calle de los Sauces 410', 'Corrientes', 1),
(79, 'Boulevard del Valle 800', 'Misiones', 1),
(80, 'Calle de los Robles 420', 'San Juan', 1),
(81, 'Avenida del Desierto 1300', 'Entre Ríos', 1),
(82, 'Calle de las Acacias 430', 'Salta', 1),
(83, 'Pasaje de las Flores 440', 'Tucumán', 1),
(84, 'Calle de los Cedros 11', 'Jujuy', 1),
(85, 'Boulevard del Lago 1100', 'San Luis', 1),
(86, 'Calle de los Nogales 450', 'La Pampa', 1),
(87, 'Avenida del Jardín 600', 'Formosa', 1),
(88, 'Calle de los Álamos 460', 'Chubut', 1),
(89, 'Boulevard del Campo 800', 'Neuquén', 1),
(90, 'Calle de los Sauces 470', 'Santa Cruz', 1),
(91, 'Avenida del Norte 1500', 'La Rioja', 1),
(92, 'Calle de los Encinos 480', 'Catamarca', 1),
(93, 'Pasaje de los Ríos 490', 'Tierra del Fuego', 1),
(94, 'Calle del Refugio 20', 'Río Negro', 1),
(95, 'Avenida del Este 500', 'Santiago del Estero', 1),
(96, 'Calle de las Letras 99', 'Buenos Aires', 1),
(97, 'Boulevard de los Encantos 1400', 'Córdoba', 1),
(98, 'Calle de las Maravillas 510', 'Santa Fe', 1),
(99, 'Avenida del Norte 1600', 'Mendoza', 1),
(100, 'Pasaje de los Sueños 520', 'Chaco', 1),
(101, 'Calle de los Robles 530', 'Corrientes', 1),
(102, 'Boulevard del Sol 800', 'Misiones', 1),
(103, 'Calle de los Cedros 540', 'San Juan', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositoprovincial`
--

CREATE TABLE `depositoprovincial` (
  `idDepositoProvincial` int(11) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `provincia` varchar(255) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `depositoprovincial`
--

INSERT INTO `depositoprovincial` (`idDepositoProvincial`, `direccion`, `provincia`, `activo`) VALUES
(1, 'Guatemala 512', 'Entre Ríos', 1),
(2, 'Perú 1020', 'Chubut', 1),
(3, 'Calle de la Paz 200', 'Buenos Aires', 1),
(4, 'Avenida de Mayo 300', 'Córdoba', 1),
(5, 'Boulevard de los Andes 400', 'Santa Fe', 1),
(6, 'Pasaje del Sol 500', 'Mendoza', 1),
(7, 'Calle de la Independencia 600', 'Tucumán', 1),
(8, 'Avenida de los Libres 700', 'La Plata', 1),
(9, 'Calle de las Flores 800', 'Chaco', 1),
(10, 'Boulevard del Parque 900', 'Corrientes', 1),
(11, 'Calle del Norte 1000', 'Misiones', 1),
(12, 'Avenida del Valle 1100', 'San Juan', 1),
(13, 'Calle de los Lagos 1200', 'Formosa', 1),
(14, 'Pasaje de los Pinos 1300', 'Neuquén', 1),
(15, 'Avenida de los Cerros 1400', 'Salta', 1),
(16, 'Calle de los Aromos 1500', 'Jujuy', 1),
(17, 'Boulevard de los Álamos 1600', 'Río Negro', 1),
(18, 'Calle de los Nogales 1700', 'Santa Cruz', 1),
(19, 'Avenida de los Tilos 1800', 'Tierra del Fuego', 1),
(20, 'Calle de los Sauces 1900', 'Catamarca', 1),
(21, 'Boulevard del Río 2000', 'La Rioja', 1),
(22, 'Calle de los Cipreses 2100', 'Entre Ríos', 1),
(23, 'Avenida del Bosque 2200', 'Santiago del Estero', 1),
(24, 'Calle de los Jacarandás 2300', 'San Luis', 1),
(25, 'Boulevard del Litoral 2400', 'La Pampa', 1),
(26, 'Calle de los Robles 2500', 'Chubut', 1),
(27, 'Avenida del Estero 2600', 'San Juan', 1),
(28, 'Calle del Lago 2700', 'Formosa', 1),
(29, 'Boulevard de las Rosas 2800', 'Río Negro', 1),
(30, 'Calle de los Álamos 2900', 'Santa Cruz', 1),
(31, 'Avenida de los Tilos 3000', 'Tierra del Fuego', 1),
(32, 'Calle de los Pinos 3100', 'Catamarca', 1),
(33, 'Boulevard del Norte 3200', 'La Rioja', 1),
(34, 'Calle del Sur 3300', 'Entre Ríos', 1),
(35, 'Avenida del Sol 3400', 'Santiago del Estero', 1),
(36, 'Calle del Sol 3500', 'San Luis', 1),
(37, 'Boulevard del Este 3600', 'La Pampa', 1),
(38, 'Calle del Oeste 3700', 'Chubut', 1),
(39, 'Avenida del Norte 3800', 'Salta', 1),
(40, 'Calle del Centro 3900', 'Jujuy', 1),
(41, 'Boulevard del Oeste 4000', 'Neuquén', 1),
(42, 'Calle del Este 4100', 'Chaco', 1),
(43, 'Avenida del Centro 4200', 'Corrientes', 1),
(44, 'Calle del Norte 4300', 'Misiones', 1),
(45, 'Boulevard del Sur 4400', 'San Juan', 1),
(46, 'Calle del Este 4500', 'Formosa', 1),
(47, 'Avenida del Oeste 4600', 'Río Negro', 1),
(48, 'Calle del Oeste 4700', 'Santa Cruz', 1),
(49, 'Boulevard del Norte 4800', 'Tierra del Fuego', 1),
(50, 'Calle del Sur 4900', 'Catamarca', 1),
(51, 'Avenida del Este 5000', 'La Rioja', 1),
(52, 'Calle del Norte 5100', 'Entre Ríos', 1),
(53, 'Boulevard del Sol 5200', 'Santiago del Estero', 1),
(54, 'Calle del Sol 5300', 'San Luis', 1),
(55, 'Avenida del Este 5400', 'La Pampa', 1),
(56, 'Calle del Oeste 5500', 'Chubut', 1),
(57, 'Boulevard del Norte 5600', 'Salta', 1),
(58, 'Calle del Centro 5700', 'Jujuy', 1),
(59, 'Avenida del Este 5800', 'Neuquén', 1),
(60, 'Calle del Oeste 5900', 'Chaco', 1),
(61, 'Boulevard del Norte 6000', 'Corrientes', 1),
(62, 'Calle del Sur 6100', 'Misiones', 1),
(63, 'Avenida del Centro 6200', 'San Juan', 1),
(64, 'Calle del Norte 6300', 'Formosa', 1),
(65, 'Boulevard del Oeste 6400', 'Río Negro', 1),
(66, 'Calle del Este 6500', 'Santa Cruz', 1),
(67, 'Avenida del Norte 6600', 'Tierra del Fuego', 1),
(68, 'Calle del Sur 6700', 'Catamarca', 1),
(69, 'Boulevard del Este 6800', 'La Rioja', 1),
(70, 'Calle del Norte 6900', 'Entre Ríos', 1),
(71, 'Avenida del Sol 7000', 'Santiago del Estero', 1),
(72, 'Calle del Sol 7100', 'San Luis', 1),
(73, 'Boulevard del Este 7200', 'La Pampa', 1),
(74, 'Calle del Oeste 7300', 'Chubut', 1),
(75, 'Avenida del Norte 7400', 'Salta', 1),
(76, 'Calle del Centro 7500', 'Jujuy', 1),
(77, 'Boulevard del Oeste 7600', 'Neuquén', 1),
(78, 'Calle del Este 7700', 'Chaco', 1),
(79, 'Avenida del Centro 7800', 'Corrientes', 1),
(80, 'Calle del Norte 7900', 'Misiones', 1),
(81, 'Boulevard del Sur 8000', 'San Juan', 1),
(82, 'Calle del Este 8100', 'Formosa', 1),
(83, 'Avenida del Oeste 8200', 'Río Negro', 1),
(84, 'Calle del Oeste 8300', 'Santa Cruz', 1),
(85, 'Boulevard del Norte 8400', 'Tierra del Fuego', 1),
(86, 'Calle del Sur 8500', 'Catamarca', 1),
(87, 'Avenida del Este 8600', 'La Rioja', 1),
(88, 'Calle del Norte 8700', 'Entre Ríos', 1),
(89, 'Boulevard del Sol 8800', 'Santiago del Estero', 1),
(90, 'Calle del Sol 8900', 'San Luis', 1),
(91, 'Avenida del Este 9000', 'La Pampa', 1),
(92, 'Calle del Oeste 9100', 'Chubut', 1),
(93, 'Boulevard del Norte 9200', 'Salta', 1),
(94, 'Calle del Centro 9300', 'Jujuy', 1),
(95, 'Avenida del Este 9400', 'Neuquén', 1),
(96, 'Calle del Oeste 9500', 'Chaco', 1),
(97, 'Boulevard del Norte 9600', 'Corrientes', 1),
(98, 'Calle del Sur 9700', 'Misiones', 1),
(99, 'Avenida del Centro 9800', 'San Juan', 1),
(100, 'Calle del Norte 9900', 'Formosa', 1),
(101, 'Boulevard del Oeste 10000', 'Río Negro', 1),
(102, 'Calle del Este 10100', 'Santa Cruz', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descarte`
--

CREATE TABLE `descarte` (
  `idDescarte` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `numeroDeSerie` int(11) NOT NULL,
  `empresaDescartante` varchar(255) NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `cantidadDeVacunas` int(11) NOT NULL,
  `fechaDeDescarte` date NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `descarte`
--

INSERT INTO `descarte` (`idDescarte`, `idUsuario`, `numeroDeSerie`, `empresaDescartante`, `motivo`, `cantidadDeVacunas`, `fechaDeDescarte`, `activo`) VALUES
(2, 3, 9, 'Veolia', 'Rotura', 10, '2024-05-10', 1),
(3, 4, 1, 'Veolia', 'Pérdida de frío', 16, '2024-06-15', 1),
(4, 5, 8, 'Clean Harbors', 'Vencida', 30, '2024-07-02', 1),
(6, 4, 9, 'Waste Management', 'Rotura', 29, '2024-07-02', 1),
(7, 5, 1, 'Veolia', 'Vencida', 20, '2024-07-09', 1),
(8, 4, 9, 'Clean Harbors', 'Rotura', 10, '2024-07-19', 1),
(9, 3, 8, 'Clean Harbors', 'Pérdida de frío', 13, '2024-07-31', 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `laboratorio`
--

INSERT INTO `laboratorio` (`idLaboratorio`, `nombreLaboratorio`, `pais`, `email`, `telefono`, `longitud`, `latitud`, `activo`) VALUES
(1, 'Johnnson', 'Argentina', 'long.eze7773@gmail.com', '0111532184', -66.309325, -33.279181, 1),
(2, 'Bago', 'Argentina', 'bayerargentina@gmail.com', '1159487659', -58.392334, -34.633208, 1),
(3, 'Pampa', 'Argentina', 'pampargentina@gmail.com', '1234445678', -66.319155, -33.292288, 1),
(4, 'Saturno', 'Argentina', 'a@gm.com', '1234567890', -66.319155, -33.292288, 1),
(5, 'Pfizer', 'Estados Unidos', 'contacto@pfizer.com', '11234567890', -73.935242, 40.73061, 1),
(6, 'Moderna', 'Estados Unidos', 'info@moderna.com', '12345678901', -71.05888, 42.360082, 1),
(7, 'AstraZeneca', 'Reino Unido', 'contact@astrazeneca.com', '442073657800', -0.127758, 51.507351, 1),
(8, 'Sinovac', 'China', 'info@sinovac.com', '861067883600', 116.407396, 39.9042, 1),
(9, 'Johnson & Johnson', 'Estados Unidos', 'contact@jnj.com', '18005263967', -74.006015, 40.712776, 1),
(10, 'Novavax', 'Estados Unidos', 'info@novavax.com', '13015562700', -76.938209, 38.992084, 1),
(11, 'BioNTech', 'Alemania', 'info@biontech.de', '49613190840', 8.682127, 50.110924, 1),
(12, 'CureVac', 'Alemania', 'info@curevac.com', '49707198830', 9.17702, 48.78232, 1),
(13, 'Sanofi', 'Francia', 'contact@sanofi.com', '33153774000', 2.352222, 48.856614, 1),
(14, 'GSK', 'Reino Unido', 'info@gsk.com', '442080475000', -0.127758, 51.507351, 1),
(15, 'Merck', 'Estados Unidos', 'contact@merck.com', '19087404000', -74.442393, 40.794717, 1),
(16, 'Roche', 'Suiza', 'info@roche.com', '41616881111', 7.588576, 47.559599, 1),
(17, 'Bayer', 'Alemania', 'contact@bayer.com', '49214301', 7.098207, 50.942155, 1),
(18, 'Lilly', 'Estados Unidos', 'info@lilly.com', '13172762000', -86.158068, 39.768403, 1),
(19, 'AbbVie', 'Estados Unidos', 'contact@abbvie.com', '18479327900', -87.629798, 41.878114, 1),
(20, 'Regeneron', 'Estados Unidos', 'info@regeneron.com', '19148477000', -73.687894, 41.05343, 1),
(21, 'Gilead', 'Estados Unidos', 'contact@gilead.com', '16505743000', -122.271114, 37.804364, 1),
(22, 'Amgen', 'Estados Unidos', 'info@amgen.com', '18054471000', -118.491191, 34.019454, 1),
(23, 'ModernaTX', 'Estados Unidos', 'info@modernatx.com', '16177146500', -71.05888, 42.360082, 1),
(24, 'Inovio', 'Estados Unidos', 'contact@inovio.com', '12674404200', -75.165222, 39.952584, 1),
(25, 'Medicago', 'Canadá', 'info@medicago.com', '14186589393', -71.217556, 46.813878, 1),
(26, 'Arcturus', 'Estados Unidos', 'contact@arcturus.com', '18589002660', -117.161087, 32.715738, 1),
(27, 'Dynavax', 'Estados Unidos', 'info@dynavax.com', '15108485100', -122.271114, 37.804364, 1),
(28, 'Vaxart', 'Estados Unidos', 'contact@vaxart.com', '16505503500', -122.419416, 37.774929, 1),
(29, 'Zydus', 'India', 'info@zydus.com', '917926868100', 72.571362, 23.022505, 1),
(30, 'Serum Institute', 'India', 'contact@seruminstitute.com', '912026609000', 73.856744, 18.52043, 1),
(31, 'Valneva', 'Francia', 'info@valneva.com', '33228073710', 2.352222, 48.856614, 1),
(32, 'Gamaleia', 'Rusia', 'contact@gamaleia.ru', '74959411535', 37.6173, 55.755825, 1),
(33, 'Bharat Biotech', 'India', 'info@bharatbiotech.com', '914023480567', 78.486671, 17.385044, 1),
(34, 'Sinopharm', 'China', 'contact@sinopharm.com', '861082848888', 116.407396, 39.9042, 1),
(35, 'Cansino', 'China', 'info@cansinotech.com', '862258035000', 117.200983, 39.084158, 1),
(36, 'NovavaxUSA', 'Estados Unidos', 'info@novavaxusa.com', '13015562700', -76.938209, 38.992084, 1),
(37, 'MedicagoCAN', 'Canadá', 'info@medicagocan.com', '14186589393', -71.217556, 46.813878, 1),
(38, 'ArcturusTX', 'Estados Unidos', 'contact@arcturustx.com', '18589002660', -117.161087, 32.715738, 1),
(39, 'DynavaxCA', 'Estados Unidos', 'info@dynavaxca.com', '15108485100', -122.271114, 37.804364, 1),
(40, 'VaxartSF', 'Estados Unidos', 'contact@vaxartsf.com', '16505503500', -122.419416, 37.774929, 1),
(41, 'ZydusIN', 'India', 'info@zydusin.com', '917926868100', 72.571362, 23.022505, 1),
(42, 'SerumIN', 'India', 'contact@serumin.com', '912026609000', 73.856744, 18.52043, 1),
(43, 'ValnevaFR', 'Francia', 'info@valnevafr.com', '33228073710', 2.352222, 48.856614, 1),
(44, 'GamaleiaRU', 'Rusia', 'contact@gamaleiaru.ru', '74959411535', 37.6173, 55.755825, 1),
(45, 'BharatIN', 'India', 'info@bharatin.com', '914023480567', 78.486671, 17.385044, 1),
(46, 'SinopharmCN', 'China', 'contact@sinopharmcn.com', '861082848888', 116.407396, 39.9042, 1),
(47, 'CansinoCN', 'China', 'info@cansinocn.com', '862258035000', 117.200983, 39.084158, 1),
(48, 'NovavaxTX', 'Estados Unidos', 'info@novavaxtx.com', '13015562700', -76.938209, 38.992084, 1),
(49, 'MedicagoQC', 'Canadá', 'info@medicagoqc.com', '14186589393', -71.217556, 46.813878, 1),
(50, 'ArcturusCA', 'Estados Unidos', 'contact@arcturusca.com', '18589002660', -117.161087, 32.715738, 1),
(51, 'DynavaxSF', 'Estados Unidos', 'info@dynavaxsf.com', '15108485100', -122.271114, 37.804364, 1),
(52, 'VaxartCA', 'Estados Unidos', 'contact@vaxartca.com', '16505503500', -122.419416, 37.774929, 1),
(53, 'ZydusHQ', 'India', 'info@zydushq.com', '917926868100', 72.571362, 23.022505, 1),
(54, 'SerumHQ', 'India', 'contact@serumhq.com', '912026609000', 73.856744, 18.52043, 1),
(55, 'ValnevaHQ', 'Francia', 'info@valnevahq.com', '33228073710', 2.352222, 48.856614, 1),
(56, 'GamaleiaHQ', 'Rusia', 'contact@gamaleiahq.ru', '74959411535', 37.6173, 55.755825, 1),
(57, 'BharatHQ', 'India', 'info@bharathq.com', '914023480567', 78.486671, 17.385044, 1),
(58, 'SinopharmHQ', 'China', 'contact@sinopharmhq.com', '861082848888', 116.407396, 39.9042, 1),
(59, 'CansinoHQ', 'China', 'info@cansinohq.com', '862258035000', 117.200983, 39.084158, 1),
(60, 'NovavaxHQ', 'Estados Unidos', 'info@novavaxhq.com', '13015562700', -76.938209, 38.992084, 1),
(61, 'MedicagoHQ', 'Canadá', 'info@medicagohq.com', '14186589393', -71.217556, 46.813878, 1),
(62, 'ArcturusHQ', 'Estados Unidos', 'contact@arcturushq.com', '18589002660', -117.161087, 32.715738, 1),
(63, 'DynavaxHQ', 'Estados Unidos', 'info@dynavaxhq.com', '15108485100', -122.271114, 37.804364, 1),
(64, 'VaxartHQ', 'Estados Unidos', 'contact@vaxarthq.com', '16505503500', -122.419416, 37.774929, 1),
(65, 'ZydusBio', 'India', 'info@zydusbio.com', '917926868100', 72.571362, 23.022505, 1),
(66, 'SerumBio', 'India', 'contact@serumbio.com', '912026609000', 73.856744, 18.52043, 1),
(67, 'ValnevaBio', 'Francia', 'info@valnevabio.com', '33228073710', 2.352222, 48.856614, 1),
(68, 'GamaleiaBio', 'Rusia', 'contact@gamaleiabio.ru', '74959411535', 37.6173, 55.755825, 1),
(69, 'BharatBio', 'India', 'info@bharatbio.com', '914023480567', 78.486671, 17.385044, 1),
(70, 'SinopharmBio', 'China', 'contact@sinopharmbio.com', '861082848888', 116.407396, 39.9042, 1),
(71, 'CansinoBio', 'China', 'info@cansinobio.com', '862258035000', 117.200983, 39.084158, 1),
(72, 'NovavaxBio', 'Estados Unidos', 'info@novavaxbio.com', '13015562700', -76.938209, 38.992084, 1),
(73, 'MedicagoBio', 'Canadá', 'info@medicagobio.com', '14186589393', -71.217556, 46.813878, 1),
(74, 'ArcturusBio', 'Estados Unidos', 'contact@arcturusbio.com', '18589002660', -117.161087, 32.715738, 1),
(75, 'DynavaxBio', 'Estados Unidos', 'info@dynavaxbio.com', '15108485100', -122.271114, 37.804364, 1),
(76, 'VaxartBio', 'Estados Unidos', 'contact@vaxartbio.com', '16505503500', -122.419416, 37.774929, 1),
(77, 'ZydusLabs', 'India', 'info@zyduslabs.com', '917926868100', 72.571362, 23.022505, 1),
(78, 'SerumLabs', 'India', 'contact@serumlabs.com', '912026609000', 73.856744, 18.52043, 1),
(79, 'ValnevaLabs', 'Francia', 'info@valnevalabs.com', '33228073710', 2.352222, 48.856614, 1),
(80, 'GamaleiaLabs', 'Rusia', 'contact@gamaleialabs.ru', '74959411535', 37.6173, 55.755825, 1),
(81, 'BharatLabs', 'India', 'info@bharatlabs.com', '914023480567', 78.486671, 17.385044, 1),
(82, 'SinopharmLabs', 'China', 'contact@sinopharmlabs.com', '861082848888', 116.407396, 39.9042, 1),
(83, 'CansinoLabs', 'China', 'info@cansinolabs.com', '862258035000', 117.200983, 39.084158, 1),
(84, 'NovavaxLabs', 'Estados Unidos', 'info@novavaxlabs.com', '13015562700', -76.938209, 38.992084, 1),
(85, 'MedicagoLabs', 'Canadá', 'info@medicagolabs.com', '14186589393', -71.217556, 46.813878, 1),
(86, 'ArcturusLabs', 'Estados Unidos', 'contact@arcturuslabs.com', '18589002660', -117.161087, 32.715738, 1),
(87, 'DynavaxLabs', 'Estados Unidos', 'info@dynavaxlabs.com', '15108485100', -122.271114, 37.804364, 1),
(88, 'VaxartLabs', 'Estados Unidos', 'contact@vaxartlabs.com', '16505503500', -122.419416, 37.774929, 1),
(89, 'ZydusResearch', 'India', 'info@zydusresearch.com', '917926868100', 72.571362, 23.022505, 1),
(90, 'SerumResearch', 'India', 'contact@serumresearch.com', '912026609000', 73.856744, 18.52043, 1),
(91, 'ValnevaResearch', 'Francia', 'info@valnevaresearch.com', '33228073710', 2.352222, 48.856614, 1),
(92, 'GamaleiaResearch', 'Rusia', 'contact@gamaleiaresearch.ru', '74959411535', 37.6173, 55.755825, 1),
(93, 'BharatResearch', 'India', 'info@bharatresearch.com', '914023480567', 78.486671, 17.385044, 1),
(94, 'SinopharmResearch', 'China', 'contact@sinopharmresearch.com', '861082848888', 116.407396, 39.9042, 1),
(95, 'CansinoResearch', 'China', 'info@cansinoresearch.com', '862258035000', 117.200983, 39.084158, 1),
(96, 'NovavaxResearch', 'Estados Unidos', 'info@novavaxresearch.com', '13015562700', -76.938209, 38.992084, 1),
(97, 'MedicagoResearch', 'Canadá', 'info@medicagoresearch.com', '14186589393', -71.217556, 46.813878, 1),
(98, 'ArcturusResearch', 'Estados Unidos', 'contact@arcturusresearch.com', '18589002660', -117.161087, 32.715738, 1),
(99, 'DynavaxResearch', 'Estados Unidos', 'info@dynavaxresearch.com', '15108485100', -122.271114, 37.804364, 1),
(100, 'VaxartResearch', 'Estados Unidos', 'contact@vaxartresearch.com', '16505503500', -122.419416, 37.774929, 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `loteinterno`
--

INSERT INTO `loteinterno` (`numeroDeSerie`, `numeroDeLote`, `idLaboratorio`, `cantidadDeVacunasTotales`, `cantidadDeVacunasRestantes`, `fechaDeLlegadaDepositoNacional`, `idDepositoNacional`, `fechaDeSalidaDepositoNacional`, `fechaDeLlegadaDepositoProvincial`, `idDepositoProvincial`, `fechaDeSalidaDepositoProvincial`, `fechaDeLlegadaCentroDeVacunacion`, `idCentroDeVacunacion`, `activo`) VALUES
(1, 1, 1, 50, 5, '2024-01-01', 1, '2024-02-01', '2024-03-01', 1, '2024-04-01', '2024-05-01', 23, 1),
(2, 5, 1, 50, 50, '2024-06-25', 2, '2024-06-26', '2024-06-27', 2, '2024-06-28', '2024-06-29', 3, 1),
(3, 2, 1, 50, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(4, 2, 1, 50, 50, '2024-01-01', 2, '2024-02-01', '2024-03-01', 3, '2024-04-01', '2024-07-12', 2, 1),
(5, 4, 3, 50, 50, '2024-07-15', 11, '2024-07-16', '2024-07-17', 12, '2024-07-18', '2024-07-19', 11, 1),
(6, 1, 1, 50, 50, '2024-01-01', 1, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(7, 4, 3, 50, 50, '2024-01-01', 1, '2024-01-01', '2024-01-01', 1, NULL, NULL, NULL, 1),
(8, 2, 1, 123, 110, '2024-01-01', 1, '2024-01-01', '2024-01-01', 1, '2024-01-01', '2024-01-01', 1, 1),
(9, 1, 1, 123, 113, '2024-01-01', 1, '2024-01-01', '2024-01-01', 1, '2024-01-01', '2024-07-01', 2, 1),
(10, 1, 1, 10, 10, '2024-06-15', 2, NULL, NULL, NULL, NULL, NULL, NULL, 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `loteproveedor`
--

INSERT INTO `loteproveedor` (`numeroDeLote`, `idLaboratorio`, `tipoDeVacuna`, `nombreComercial`, `cantidadDeLotesInternos`, `fechaDeFabricacion`, `fechaDeCompra`, `fechaDeVencimiento`, `activo`) VALUES
(1, 1, 'Tuberculosis', 'BCG', 500, '2024-02-01', '2024-02-11', '2024-05-10', 1),
(2, 1, 'Varicela', 'BCG', 500, '2024-01-01', '2024-01-01', '2029-02-03', 1),
(3, 2, 'Meningitis', 'BCG', 500, '2024-01-01', '2024-01-01', '2029-01-01', 1),
(4, 3, 'HPV', 'BCG', 550, '2024-01-01', '2024-01-01', '2029-01-02', 1),
(5, 3, 'Antigripal', 'Influenzae b', 320, '2023-11-23', '2024-01-01', '2028-11-23', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patologiabase`
--

CREATE TABLE `patologiabase` (
  `DNI` int(11) NOT NULL,
  `patologiaBase` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `patologiabase`
--

INSERT INTO `patologiabase` (`DNI`, `patologiaBase`) VALUES
(12345601, 'Diabetes'),
(12345603, 'Hipertensión'),
(12345605, 'Asma'),
(12345607, 'Obesidad'),
(12345609, 'Alergia'),
(12345611, 'Enfermedad cardíaca'),
(12345613, 'Colesterol alto'),
(12345615, 'Diabetes'),
(12345617, 'Hipertensión'),
(12345619, 'Asma'),
(12345621, 'Obesidad'),
(12345623, 'Ninguna'),
(12345625, 'Enfermedad cardíaca'),
(12345627, 'Colesterol alto'),
(12345629, 'Diabetes'),
(12345631, 'Hipertensión'),
(12345633, 'Asma'),
(12345635, 'Obesidad'),
(12345637, 'Alergia'),
(12345639, 'Ninguna'),
(12345641, 'Colesterol alto'),
(12345643, 'Diabetes'),
(12345645, 'Hipertensión'),
(12345647, 'Asma'),
(12345649, 'Obesidad'),
(12345651, 'Alergia'),
(12345653, 'Enfermedad cardíaca'),
(12345655, 'Colesterol alto'),
(12345657, 'Diabetes'),
(12345659, 'Hipertensión'),
(12345661, 'Asma'),
(12345663, 'Obesidad'),
(12345665, 'Ninguna'),
(12345667, 'Enfermedad cardíaca'),
(12345669, 'Colesterol alto'),
(12345671, 'Diabetes'),
(12345673, 'Hipertensión'),
(12345675, 'Ninguna'),
(12345677, 'Obesidad'),
(12345679, 'Ninguna'),
(12345681, 'Enfermedad cardíaca'),
(12345683, 'Colesterol alto'),
(12345685, 'Diabetes'),
(12345687, 'Hipertensión'),
(12345689, 'Asma'),
(12345691, 'Obesidad'),
(12345693, 'Alergia'),
(12345695, 'Enfermedad cardíaca'),
(12345697, 'Colesterol alto'),
(12345699, 'Diabetes'),
(27013989, 'Ninguna'),
(34229421, 'Obesidad'),
(37716731, 'Ninguna'),
(47669942, 'Ninguna'),
(49221038, 'Ninguna'),
(50479934, 'Ninguna'),
(55012879, 'Enfermedad respiratorio cronica');

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
  `direccion` varchar(255) NOT NULL,
  `localidad` varchar(255) NOT NULL,
  `provincia` varchar(255) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`DNI`, `nombre`, `apellido`, `email`, `fechaDeNacimiento`, `ocupacion`, `genero`, `direccion`, `localidad`, `provincia`, `activo`) VALUES
(12345601, 'Ana', 'Gómez', 'ana.gomez01@example.com', '2011-03-15', 'Otro', 'Femenino', 'Calle Real 1', 'Las Talas', 'San Juan', 1),
(12345603, 'Juan', 'Pérez', 'juan.perez01@example.com', '1985-07-20', 'Agente de salud', 'Masculino', 'Av. Siempre Viva 1', 'Adrogué', 'Buenos Aires', 1),
(12345605, 'María', 'Fernández', 'maria.fernandez02@example.com', '2012-06-20', 'Otro', 'Femenino', 'Calle Falsa 2', 'Las Talas', 'San Juan', 1),
(12345607, 'Carlos', 'López', 'carlos.lopez01@example.com', '1980-05-10', 'Agente de salud', 'Masculino', 'San Martín 2', 'Mendoza', 'Mendoza', 1),
(12345609, 'Lucía', 'Martínez', 'lucia.martinez02@example.com', '2013-08-12', 'Otro', 'Femenino', 'Av. Mitre 2', 'Las Talas', 'San Juan', 1),
(12345611, 'Jorge', 'Rodríguez', 'jorge.rodriguez01@example.com', '1978-09-25', 'Agente de salud', 'Masculino', 'Calle Colon 2', 'Rosario', 'Santa Fe', 1),
(12345613, 'Valeria', 'González', 'valeria.gonzalez02@example.com', '2014-03-15', 'Otro', 'Femenino', 'Calle Real 3', 'Las Talas', 'San Juan', 1),
(12345615, 'Pedro', 'Suárez', 'pedro.suarez01@example.com', '1981-11-02', 'Otro', 'Masculino', 'Av. Siempre Viva 3', 'Las Talas', 'San Juan', 1),
(12345617, 'Laura', 'Ramírez', 'laura.ramirez02@example.com', '2015-12-20', 'Otro', 'Femenino', 'Calle Falsa 3', 'Las Talas', 'San Juan', 1),
(12345619, 'Ricardo', 'Hernández', 'ricardo.hernandez01@example.com', '1983-01-20', 'Agente de salud', 'Masculino', 'San Martín 3', 'La Plata', 'Buenos Aires', 1),
(12345621, 'Sofía', 'Torres', 'sofia.torres02@example.com', '2016-04-18', 'Otro', 'Femenino', 'Av. Mitre 3', 'Las Talas', 'San Juan', 1),
(12345623, 'Miguel', 'Álvarez', 'miguel.alvarez01@example.com', '1979-06-30', 'Otro', 'Masculino', 'Calle Colon 3', 'Las Talas', 'San Juan', 1),
(12345625, 'Marta', 'Molina', 'marta.molina02@example.com', '2017-05-09', 'Otro', 'Femenino', 'Calle Real 4', 'Las Talas', 'San Juan', 1),
(12345627, 'Héctor', 'Luna', 'hector.luna01@example.com', '1987-12-25', 'Agente de salud', 'Masculino', 'Av. Siempre Viva 4', 'Mendoza', 'Mendoza', 1),
(12345629, 'Natalia', 'Reyes', 'natalia.reyes02@example.com', '2018-07-17', 'Otro', 'Femenino', 'Calle Falsa 4', 'Las Talas', 'San Juan', 1),
(12345631, 'Luis', 'Acosta', 'luis.acosta01@example.com', '1982-03-15', 'Agente de salud', 'Masculino', 'San Martín 4', 'Rosario', 'Santa Fe', 1),
(12345633, 'Andrea', 'Díaz', 'andrea.diaz02@example.com', '2019-02-20', 'Otro', 'Femenino', 'Av. Mitre 4', 'Las Talas', 'San Juan', 1),
(12345635, 'Emilio', 'Cruz', 'emilio.cruz01@example.com', '1988-11-01', 'Agente de salud', 'Masculino', 'Calle Colon 4', 'Buenos Aires', 'Buenos Aires', 1),
(12345637, 'Gabriela', 'Ortiz', 'gabriela.ortiz02@example.com', '2020-06-11', 'Otro', 'Femenino', 'Calle Real 5', 'Las Talas', 'San Juan', 1),
(12345639, 'Federico', 'Santos', 'federico.santos01@example.com', '1989-09-21', 'Otro', 'Masculino', 'Av. Siempre Viva 5', 'Las Talas', 'San Juan', 1),
(12345641, 'Patricia', 'Castro', 'patricia.castro02@example.com', '2021-12-22', 'Otro', 'Femenino', 'Calle Falsa 5', 'Las Talas', 'San Juan', 1),
(12345643, 'Martín', 'Ramos', 'martin.ramos01@example.com', '1980-05-10', 'Agente de salud', 'Masculino', 'San Martín 5', 'Córdoba', 'Córdoba', 1),
(12345645, 'Carolina', 'Blanco', 'carolina.blanco02@example.com', '2022-07-30', 'Otro', 'Femenino', 'Av. Mitre 5', 'Las Talas', 'San Juan', 1),
(12345647, 'Diego', 'Mejía', 'diego.mejia01@example.com', '1981-11-25', 'Agente de salud', 'Masculino', 'Calle Colon 5', 'Mendoza', 'Mendoza', 1),
(12345649, 'Fernanda', 'Guzmán', 'fernanda.guzman02@example.com', '2023-02-20', 'Otro', 'Femenino', 'Calle Real 6', 'Las Talas', 'San Juan', 1),
(12345651, 'Ramiro', 'Ruiz', 'ramiro.ruiz01@example.com', '1984-01-19', 'Agente de salud', 'Masculino', 'Av. Siempre Viva 6', 'Rosario', 'Santa Fe', 1),
(12345653, 'Elena', 'Herrera', 'elena.herrera02@example.com', '2010-12-15', 'Otro', 'Femenino', 'Calle Falsa 6', 'Las Talas', 'San Juan', 1),
(12345655, 'Pablo', 'Moreno', 'pablo.moreno01@example.com', '1986-08-10', 'Agente de salud', 'Masculino', 'San Martín 6', 'Buenos Aires', 'Buenos Aires', 1),
(12345657, 'Adriana', 'Rojas', 'adriana.rojas02@example.com', '2011-11-17', 'Otro', 'Femenino', 'Av. Mitre 6', 'Las Mojarras', 'Catamarca', 1),
(12345659, 'Gustavo', 'Méndez', 'gustavo.mendez01@example.com', '1982-07-04', 'Agente de salud', 'Masculino', 'Calle Colon 6', 'La Plata', 'Buenos Aires', 1),
(12345661, 'Liliana', 'Chávez', 'liliana.chavez02@example.com', '2012-03-21', 'Otro', 'Femenino', 'Calle Real 7', 'Las Mojarras', 'Catamarca', 1),
(12345663, 'Ricardo', 'Flores', 'ricardo.flores01@example.com', '1983-06-15', 'Agente de salud', 'Masculino', 'Av. Siempre Viva 7', 'Córdoba', 'Córdoba', 1),
(12345665, 'Alicia', 'Soto', 'alicia.soto02@example.com', '2013-09-25', 'Otro', 'Femenino', 'Calle Falsa 7', 'Las Mojarras', 'Catamarca', 1),
(12345667, 'Javier', 'Mora', 'javier.mora01@example.com', '1985-01-11', 'Agente de salud', 'Masculino', 'San Martín 7', 'Mendoza', 'Mendoza', 1),
(12345669, 'Daniela', 'Aguilar', 'daniela.aguilar02@example.com', '2014-04-14', 'Otro', 'Femenino', 'Av. Mitre 7', 'Las Mojarras', 'Catamarca', 1),
(12345671, 'Oscar', 'Delgado', 'oscar.delgado01@example.com', '1979-09-19', 'Agente de salud', 'Masculino', 'Calle Colon 7', 'Rosario', 'Santa Fe', 1),
(12345673, 'Cecilia', 'Ortega', 'cecilia.ortega02@example.com', '2015-06-13', 'Otro', 'Femenino', 'Calle Real 8', 'Las Mojarras', 'Catamarca', 1),
(12345675, 'Raúl', 'Salinas', 'raul.salinas01@example.com', '1980-03-12', 'otro', 'Masculino', 'Av. Siempre Viva 8', 'Alto de las Juntas', 'Catamarca', 1),
(12345677, 'Rosa', 'Carrillo', 'rosa.carrillo02@example.com', '2016-11-10', 'Otro', 'Femenino', 'Calle Falsa 8', 'Las Mojarras', 'Catamarca', 1),
(12345679, 'Eduardo', 'Vargas', 'eduardo.vargas01@example.com', '1987-05-17', 'Otro', 'Masculino', 'San Martín 8', 'Las Mojarras', 'Catamarca', 1),
(12345681, 'Clara', 'Espinoza', 'clara.espinoza02@example.com', '2017-12-19', 'Otro', 'Femenino', 'Av. Mitre 8', 'Las Mojarras', 'Catamarca', 1),
(12345683, 'Mario', 'Reyes', 'mario.reyes01@example.com', '1978-01-11', 'Agente de salud', 'Masculino', 'Calle Colon 8', 'Córdoba', 'Córdoba', 1),
(12345685, 'Patricia', 'Lara', 'patricia.lara02@example.com', '2018-05-15', 'Otro', 'Femenino', 'Calle Real 9', 'Las Mojarras', 'Catamarca', 1),
(12345687, 'Alberto', 'Peña', 'alberto.pena01@example.com', '1976-08-25', 'Agente de salud', 'Masculino', 'Av. Siempre Viva 9', 'Mendoza', 'Mendoza', 1),
(12345689, 'Yolanda', 'Montes', 'yolanda.montes02@example.com', '2019-06-24', 'Otro', 'Femenino', 'Calle Falsa 9', 'Las Mojarras', 'Catamarca', 1),
(12345691, 'Rodrigo', 'Paredes', 'rodrigo.paredes01@example.com', '1988-03-12', 'Agente de salud', 'Masculino', 'San Martín 9', 'Rosario', 'Santa Fe', 1),
(12345693, 'Isabel', 'Guerra', 'isabel.guerra02@example.com', '2020-08-23', 'Otro', 'Femenino', 'Av. Mitre 9', 'Las Mojarras', 'Catamarca', 1),
(12345695, 'Tomás', 'Rojas', 'tomas.rojas01@example.com', '1982-11-10', 'Agente de salud', 'Masculino', 'Calle Colon 9', 'Las Mojarras', 'Catamarca', 1),
(12345697, 'Ana', 'García', 'ana.garcia02@example.com', '2021-04-14', 'Otro', 'Femenino', 'Calle Real 10', 'Las Mojarras', 'Catamarca', 1),
(12345699, 'Luis', 'Martínez', 'luis.martinez01@example.com', '1989-01-19', 'Agente de salud', 'Masculino', 'Av. Siempre Viva 10', 'La Plata', 'Buenos Aires', 1),
(27013989, 'Jesica', 'Martinez', 'jkmartinez251@gmail.com', '1978-12-01', 'Otro', 'Femenino', 'Granada 2761', 'Las Mojarras', 'Catamarca', 1),
(34229421, 'Jorge Ezequiel', 'Diaz', 'diazezequiel777@gmail.com', '1988-11-09', 'Otro', 'Masculino', 'Lavalle 456', 'Las Mojarras', 'Catamarca', 1),
(37716731, 'Federico Ivan', 'Cruceño', 'fedeicru@gmail.com', '1994-03-20', 'Agente de salud', 'Masculino', 'Balcarce 123', 'La Ribera', 'San Luis', 1),
(47669942, 'Micaela', 'Calandra', 'mcalandra@gmail.com', '2006-11-27', 'Otro', 'Femenino', 'Manzana 7190 Casa 14', 'Las Mojarras', 'Catamarca', 1),
(49221038, 'Siro', 'Tassinari', 'siro@gmail.com', '2015-06-23', 'Otro', 'Masculino', 'San Juan 59', 'Las Mojarras', 'Catamarca', 1),
(50479934, 'Agostina', 'Gutierrez', 'agos@gmail.com', '2011-05-06', 'Otro', 'Femenino', 'Los Álamos', 'Las Mojarras', 'Catamarca', 1),
(55012879, 'Roma', 'Castro', 'roma@gmail.com', '2020-07-23', 'Otro', 'Femenino', 'Bulnes 147', 'Las Talas', 'San Juan', 1);

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
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`idRegistro`, `idUsuario`, `idFila`, `nombreDeTabla`, `tipoDeAccion`, `fecha`) VALUES
(87, 1, 2, 'Descarte', 'Creacion', '2024-06-20 18:45:46'),
(88, 1, 2, 'Descarte', 'Alta', '2024-06-20 18:45:46'),
(89, 1, 3, 'Descarte', 'Creacion', '2024-06-20 19:19:43'),
(90, 1, 3, 'Descarte', 'Alta', '2024-06-20 19:19:43'),
(91, 1, 1, 'Descarte', 'Eliminacion', '2024-06-20 19:19:55'),
(92, 3, 10, 'Lote interno', 'Creacion', '2024-06-21 10:32:17'),
(93, 3, 10, 'Lote interno', 'Alta', '2024-06-21 10:32:17'),
(94, 1, 1, 'Traslado', 'Modificacion', '2024-06-21 11:48:28'),
(95, 1, 1, 'Traslado', 'Baja', '2024-06-21 13:40:18'),
(96, 1, 1, 'Traslado', 'Alta', '2024-06-21 13:52:36'),
(97, 1, 1, 'Traslado', 'Modificacion', '2024-06-21 14:32:26'),
(98, 1, 1, 'Traslado', 'Baja', '2024-06-21 15:18:32'),
(99, 1, 1, 'Traslado', 'Baja', '2024-06-21 15:18:48'),
(100, 1, 1, 'Traslado', 'Baja', '2024-06-21 15:20:33'),
(101, 1, 1, 'Traslado', 'Alta', '2024-06-21 15:30:22'),
(102, 1, 1, 'Traslado', 'Baja', '2024-06-21 15:30:31'),
(103, 1, 1, 'Traslado', 'Alta', '2024-06-21 15:35:04'),
(104, 1, 1, 'Traslado', 'Baja', '2024-06-21 15:35:09'),
(105, 1, 1, 'Traslado', 'Baja', '2024-06-21 15:35:11'),
(106, 1, 1, 'Traslado', 'Baja', '2024-06-21 15:35:12'),
(107, 1, 1, 'Traslado', 'Alta', '2024-06-21 15:36:08'),
(108, 1, 1, 'Traslado', 'Baja', '2024-06-21 15:39:32'),
(109, 1, 1, 'Traslado', 'Alta', '2024-06-21 15:39:46'),
(110, 1, 1, 'Traslado', 'Baja', '2024-06-21 16:11:18'),
(111, 1, 1, 'Traslado', 'Alta', '2024-06-21 16:11:35'),
(112, 1, 1, 'Traslado', 'Baja', '2024-06-21 16:24:43'),
(113, 1, 1, 'Traslado', 'Alta', '2024-06-21 16:25:00'),
(114, 1, 1, 'Traslado', 'Baja', '2024-06-21 16:25:12'),
(115, 1, 1, 'Traslado', 'Alta', '2024-06-21 16:25:17'),
(116, 1, 2, 'Traslado', 'Creacion', '2024-06-21 16:29:33'),
(117, 1, 2, 'Traslado', 'Alta', '2024-06-21 16:29:33'),
(118, 1, 1, 'Traslado', 'Modificacion', '2024-06-21 16:29:43'),
(119, 1, 3, 'Traslado', 'Creacion', '2024-06-21 20:21:14'),
(120, 1, 3, 'Traslado', 'Alta', '2024-06-21 20:21:14'),
(121, 1, 1, 'Aplicacion', 'Modificacion', '2024-06-23 09:21:28'),
(122, 1, 1, 'Aplicacion', 'Baja', '2024-06-23 09:22:13'),
(123, 1, 1, 'Aplicacion', 'Alta', '2024-06-23 09:22:28'),
(124, 1, 2, 'Aplicacion', 'Creacion', '2024-06-23 11:32:03'),
(125, 1, 2, 'Aplicacion', 'Alta', '2024-06-23 11:32:03'),
(126, 1, 3, 'Aplicacion', 'Creacion', '2024-06-29 20:52:44'),
(127, 1, 3, 'Aplicacion', 'Alta', '2024-06-29 20:52:44'),
(128, 1, 2, 'Lote interno', 'Modificacion', '2024-06-29 21:08:48'),
(129, 1, 34229421, 'Persona', 'Modificacion', '2024-07-02 19:15:15'),
(130, 1, 37716731, 'Persona', 'Modificacion', '2024-07-10 21:01:08'),
(131, 1, 34229421, 'Persona', 'Modificacion', '2024-07-10 21:27:19'),
(132, 1, 34229421, 'Persona', 'Baja', '2024-07-10 21:28:43'),
(133, 1, 34229421, 'Persona', 'Alta', '2024-07-10 21:28:55'),
(134, 1, 27013989, 'Persona', 'Creacion', '2024-07-11 10:55:25'),
(135, 1, 27013989, 'Persona', 'Alta', '2024-07-11 10:55:25'),
(136, 1, 1, 'Centro de vacunacion', 'Modificacion', '2024-07-11 15:24:16'),
(137, 1, 2, 'Centro de vacunacion', 'Modificacion', '2024-07-11 15:25:30'),
(138, 1, 2, 'Centro de vacunacion', 'Modificacion', '2024-07-11 15:25:59'),
(139, 1, 2, 'Centro de vacunacion', 'Baja', '2024-07-11 15:26:13'),
(140, 1, 2, 'Centro de vacunacion', 'Alta', '2024-07-11 15:26:24'),
(141, 1, 3, 'Centro de vacunacion', 'Creacion', '2024-07-11 19:50:43'),
(142, 1, 3, 'Centro de vacunacion', 'Alta', '2024-07-11 19:50:43'),
(143, 1, 2, 'Deposito Nacional', 'Modificacion', '2024-07-11 20:23:20'),
(144, 1, 1, 'Deposito Nacional', 'Modificacion', '2024-07-11 20:23:51'),
(145, 1, 2, 'Deposito Nacional', 'Baja', '2024-07-11 20:24:21'),
(146, 1, 2, 'Deposito Nacional', 'Alta', '2024-07-11 20:24:30'),
(147, 1, 3, 'Deposito Nacional', 'Creacion', '2024-07-11 20:32:47'),
(148, 1, 3, 'Deposito Nacional', 'Alta', '2024-07-11 20:32:47'),
(149, 1, 2, 'Deposito Provincial', 'Modificacion', '2024-07-11 20:50:18'),
(150, 1, 1, 'Deposito Provincial', 'Modificacion', '2024-07-11 20:50:37'),
(151, 1, 47669942, 'Persona', 'Creacion', '2024-07-14 13:06:14'),
(152, 1, 47669942, 'Persona', 'Alta', '2024-07-14 13:06:15'),
(153, 1, 4, 'Aplicacion', 'Creacion', '2024-07-14 13:07:11'),
(154, 1, 4, 'Aplicacion', 'Alta', '2024-07-14 13:07:11'),
(155, 1, 4, 'Aplicacion', 'Modificacion', '2024-07-14 13:13:12'),
(156, 1, 4, 'Aplicacion', 'Modificacion', '2024-07-14 13:13:55'),
(157, 1, 50479934, 'Persona', 'Creacion', '2024-07-14 13:20:39'),
(158, 1, 50479934, 'Persona', 'Alta', '2024-07-14 13:20:39'),
(159, 1, 3, 'Aplicacion', 'Modificacion', '2024-07-14 13:24:48'),
(160, 1, 49221038, 'Persona', 'Creacion', '2024-07-14 13:32:46'),
(161, 1, 49221038, 'Persona', 'Alta', '2024-07-14 13:32:46'),
(162, 1, 5, 'Aplicacion', 'Creacion', '2024-07-14 13:43:40'),
(163, 1, 5, 'Aplicacion', 'Alta', '2024-07-14 13:43:40'),
(164, 1, 55012879, 'Persona', 'Creacion', '2024-07-14 13:46:13'),
(165, 1, 55012879, 'Persona', 'Alta', '2024-07-14 13:46:13'),
(166, 1, 6, 'Aplicacion', 'Creacion', '2024-07-14 13:46:43'),
(167, 1, 6, 'Aplicacion', 'Alta', '2024-07-14 13:46:43'),
(168, 1, 7, 'Aplicacion', 'Creacion', '2024-07-14 14:00:19'),
(169, 1, 7, 'Aplicacion', 'Alta', '2024-07-14 14:00:19'),
(170, 1, 7, 'Aplicacion', 'Modificacion', '2024-07-14 14:01:24'),
(171, 1, 8, 'Aplicacion', 'Creacion', '2024-07-14 14:02:34'),
(172, 1, 8, 'Aplicacion', 'Alta', '2024-07-14 14:02:34'),
(173, 1, 8, 'Aplicacion', 'Modificacion', '2024-07-14 14:03:20'),
(174, 1, 8, 'Aplicacion', 'Modificacion', '2024-07-14 14:03:46'),
(175, 1, 4, 'Aplicacion', 'Modificacion', '2024-07-14 14:05:02'),
(176, 1, 103, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:08:49'),
(177, 1, 102, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:08:57'),
(178, 1, 101, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:09:04'),
(179, 1, 100, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:09:12'),
(180, 1, 99, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:09:19'),
(181, 1, 98, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:12:49'),
(182, 1, 97, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:22:05'),
(183, 1, 96, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:22:14'),
(184, 1, 95, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:22:30'),
(185, 1, 94, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:22:38'),
(186, 1, 93, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:22:47'),
(187, 1, 93, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:23:02'),
(188, 1, 92, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:23:15'),
(189, 1, 89, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:23:40'),
(190, 1, 88, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:23:57'),
(191, 1, 87, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:24:06'),
(192, 1, 86, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:24:15'),
(193, 1, 85, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:24:31'),
(194, 1, 83, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:24:54'),
(195, 1, 82, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:25:17'),
(196, 1, 81, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:25:30'),
(197, 1, 80, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:25:49'),
(198, 1, 79, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:26:00'),
(199, 1, 78, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:26:18'),
(200, 1, 77, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:26:28'),
(201, 1, 76, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:26:42'),
(202, 1, 75, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:26:56'),
(203, 1, 74, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:27:10'),
(204, 1, 73, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:27:26'),
(205, 1, 72, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:27:41'),
(206, 1, 71, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:27:57'),
(207, 1, 70, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:28:07'),
(208, 1, 70, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:28:34'),
(209, 1, 69, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:28:59'),
(210, 1, 68, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:29:18'),
(211, 1, 66, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:29:40'),
(212, 1, 65, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:29:56'),
(213, 1, 64, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:30:11'),
(214, 1, 63, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:30:30'),
(215, 1, 103, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:32:14'),
(216, 1, 62, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:33:03'),
(217, 1, 61, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:33:20'),
(218, 1, 60, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:33:45'),
(219, 1, 58, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:34:11'),
(220, 1, 57, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:34:26'),
(221, 1, 55, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:34:49'),
(222, 1, 54, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:35:05'),
(223, 1, 53, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:35:18'),
(224, 1, 52, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:35:32'),
(225, 1, 51, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:35:43'),
(226, 1, 50, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:35:54'),
(227, 1, 49, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:36:11'),
(228, 1, 48, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:37:10'),
(229, 1, 47, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:37:26'),
(230, 1, 46, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:37:45'),
(231, 1, 45, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:38:08'),
(232, 1, 43, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:38:39'),
(233, 1, 42, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:39:04'),
(234, 1, 41, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:39:31'),
(235, 1, 40, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:39:44'),
(236, 1, 37, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:40:21'),
(237, 1, 36, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:40:31'),
(238, 1, 34, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:40:48'),
(239, 1, 33, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:41:00'),
(240, 1, 32, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:41:15'),
(241, 1, 31, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:41:24'),
(242, 1, 30, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:41:36'),
(243, 1, 29, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:41:51'),
(244, 1, 28, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:42:07'),
(245, 1, 27, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:42:19'),
(246, 1, 26, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:42:32'),
(247, 1, 25, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:42:44'),
(248, 1, 24, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:42:59'),
(249, 1, 23, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:44:15'),
(250, 1, 22, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:44:28'),
(251, 1, 21, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:44:40'),
(252, 1, 20, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:45:04'),
(253, 1, 19, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:45:18'),
(254, 1, 18, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:45:33'),
(255, 1, 16, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:46:01'),
(256, 1, 15, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:46:12'),
(257, 1, 14, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:46:28'),
(258, 1, 12, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:46:50'),
(259, 1, 11, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:47:01'),
(260, 1, 10, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:47:12'),
(261, 1, 7, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:47:28'),
(262, 1, 6, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:47:40'),
(263, 1, 5, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:47:52'),
(264, 1, 4, 'Centro de vacunacion', 'Modificacion', '2024-07-17 20:48:03'),
(265, 1, 12345623, 'Persona', 'Modificacion', '2024-07-18 22:50:47'),
(266, 1, 12345679, 'Persona', 'Modificacion', '2024-07-18 22:52:23'),
(267, 1, 12345675, 'Persona', 'Modificacion', '2024-07-18 22:53:06'),
(268, 1, 12345615, 'Persona', 'Modificacion', '2024-07-18 22:58:13'),
(269, 1, 12345665, 'Persona', 'Modificacion', '2024-07-18 22:59:00'),
(270, 1, 12345639, 'Persona', 'Modificacion', '2024-07-18 22:59:24'),
(271, 1, 5, 'Usuario', 'Creacion', '2024-07-21 15:42:52'),
(272, 1, 5, 'Usuario', 'Alta', '2024-07-21 15:42:52'),
(273, 4, 4, 'Aplicacion', 'Modificacion', '2024-07-22 17:29:28'),
(274, 4, 9, 'Aplicacion', 'Creacion', '2024-07-22 18:08:57'),
(275, 4, 9, 'Aplicacion', 'Alta', '2024-07-22 18:08:57'),
(276, 4, 6, 'Descarte', 'Creacion', '2024-07-23 20:29:42'),
(277, 4, 6, 'Descarte', 'Alta', '2024-07-23 20:29:42'),
(278, 4, 7, 'Descarte', 'Creacion', '2024-07-23 21:48:51'),
(279, 4, 7, 'Descarte', 'Alta', '2024-07-23 21:48:51'),
(280, 4, 6, 'Descarte', 'Modificacion', '2024-07-24 22:23:20'),
(281, 1, 27, 'Centro de vacunacion', 'Modificacion', '2024-07-24 22:30:58'),
(282, 4, 4, 'Traslado', 'Creacion', '2024-07-25 20:10:08'),
(283, 4, 4, 'Traslado', 'Alta', '2024-07-25 20:10:09'),
(284, 1, 97, 'Centro de vacunacion', 'Modificacion', '2024-07-26 17:40:25'),
(285, 4, 7, 'Aplicacion', 'Modificacion', '2024-07-27 20:01:31'),
(286, 4, 6, 'Aplicacion', 'Modificacion', '2024-07-27 20:01:43'),
(287, 4, 10, 'Aplicacion', 'Creacion', '2024-07-30 18:54:44'),
(288, 4, 10, 'Aplicacion', 'Alta', '2024-07-30 18:54:44'),
(289, 4, 11, 'Aplicacion', 'Creacion', '2024-07-30 20:21:19'),
(290, 4, 11, 'Aplicacion', 'Alta', '2024-07-30 20:21:19'),
(291, 4, 12, 'Aplicacion', 'Creacion', '2024-07-30 20:28:58'),
(292, 4, 12, 'Aplicacion', 'Alta', '2024-07-30 20:28:58'),
(293, 4, 13, 'Aplicacion', 'Creacion', '2024-07-30 20:35:30'),
(294, 4, 13, 'Aplicacion', 'Alta', '2024-07-30 20:35:30'),
(295, 4, 14, 'Aplicacion', 'Creacion', '2024-07-30 20:48:35'),
(296, 4, 14, 'Aplicacion', 'Alta', '2024-07-30 20:48:35'),
(297, 4, 15, 'Aplicacion', 'Creacion', '2024-07-30 21:07:32'),
(298, 4, 15, 'Aplicacion', 'Alta', '2024-07-30 21:07:32'),
(299, 4, 16, 'Aplicacion', 'Creacion', '2024-07-30 21:10:15'),
(300, 4, 16, 'Aplicacion', 'Alta', '2024-07-30 21:10:15'),
(301, 4, 17, 'Aplicacion', 'Creacion', '2024-07-30 21:11:40'),
(302, 4, 17, 'Aplicacion', 'Alta', '2024-07-30 21:11:40'),
(303, 4, 5, 'Traslado', 'Creacion', '2024-07-30 21:56:17'),
(304, 4, 5, 'Traslado', 'Alta', '2024-07-30 21:56:17'),
(305, 4, 5, 'Traslado', 'Modificacion', '2024-07-30 22:20:26'),
(306, 4, 6, 'Traslado', 'Creacion', '2024-07-30 22:22:06'),
(307, 4, 6, 'Traslado', 'Alta', '2024-07-30 22:22:06'),
(308, 4, 7, 'Traslado', 'Creacion', '2024-07-30 22:40:08'),
(309, 4, 7, 'Traslado', 'Alta', '2024-07-30 22:40:08'),
(310, 4, 6, 'Traslado', 'Modificacion', '2024-07-30 22:53:09'),
(311, 4, 8, 'Traslado', 'Creacion', '2024-07-30 22:55:35'),
(312, 4, 8, 'Traslado', 'Alta', '2024-07-30 22:55:35'),
(313, 4, 7, 'Traslado', 'Modificacion', '2024-07-30 22:58:59'),
(314, 4, 8, 'Traslado', 'Modificacion', '2024-07-30 22:59:31'),
(315, 4, 17, 'Traslado', 'Creacion', '2024-07-30 23:27:22'),
(316, 4, 17, 'Traslado', 'Alta', '2024-07-30 23:27:22'),
(317, 4, 4, 'Traslado', 'Modificacion', '2024-07-31 01:27:07'),
(318, 4, 12345675, 'Persona', 'Modificacion', '2024-07-31 02:05:22'),
(319, 4, 8, 'Descarte', 'Creacion', '2024-07-31 03:12:45'),
(320, 4, 8, 'Descarte', 'Alta', '2024-07-31 03:12:45'),
(321, 3, 9, 'Descarte', 'Creacion', '2024-07-31 03:29:38'),
(322, 3, 9, 'Descarte', 'Alta', '2024-07-31 03:29:38'),
(323, 3, 5, 'Descarte', 'Eliminacion', '2024-07-31 03:48:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `telefono`
--

CREATE TABLE `telefono` (
  `DNI` int(11) NOT NULL,
  `celular1` varchar(255) DEFAULT NULL,
  `celular2` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `telefono`
--

INSERT INTO `telefono` (`DNI`, `celular1`, `celular2`) VALUES
(12345601, '5493415556677', NULL),
(12345603, '5491144445566', '5491140045566'),
(12345605, '5493515556678', NULL),
(12345607, '5492614445567', '5492614440000'),
(12345609, '5492215556679', NULL),
(12345611, '5493414445570', '5493412225570'),
(12345613, '5493515556680', NULL),
(12345615, '5491144445571', NULL),
(12345617, '5492615556681', NULL),
(12345619, '5492214445572', '5492216665572'),
(12345621, '5493415556682', NULL),
(12345623, '5493514445573', '5493511118870'),
(12345625, '5491145556683', NULL),
(12345627, '5492614445574', '5492617775574'),
(12345629, '5492215556684', NULL),
(12345631, '5493414445575', '5493419995575'),
(12345633, '5493515556685', NULL),
(12345635, '5491144445576', '5491100005576'),
(12345637, '5492615556686', NULL),
(12345639, '5492214445577', '5490014445577'),
(12345641, '5493415556687', NULL),
(12345643, '5493514445578', '5491234445578'),
(12345645, '5491145556688', NULL),
(12345647, '5492614445579', '5492613215579'),
(12345649, '5492215556689', NULL),
(12345651, '5493414445580', '54934166445580'),
(12345653, '5493515556690', NULL),
(12345655, '5491144445581', '5491122885581'),
(12345657, '5492615556691', NULL),
(12345659, '5492214445582', '54922108075582'),
(12345661, '5493415556692', NULL),
(12345663, '5493514445583', '54935457905583'),
(12345665, '5491145556693', NULL),
(12345667, '5492614445584', '54920415395584'),
(12345669, '5492215556694', NULL),
(12345671, '5493414445585', '54931285675585'),
(12345673, '5493515556695', NULL),
(12345675, '5491144445586', NULL),
(12345677, '5492615556696', NULL),
(12345679, '5492214445587', NULL),
(12345681, '5493415556697', NULL),
(12345683, '5493514445588', '54935158075588'),
(12345685, '5491145556698', NULL),
(12345687, '5492614445589', '5492619305589'),
(12345689, '5492215556699', NULL),
(12345691, '5493414445590', '5493412515590'),
(12345693, '5493515556700', NULL),
(12345695, '5491144445591', '5491101025591'),
(12345697, '5492615556701', NULL),
(12345699, '5492214445592', '5492217895592'),
(27013989, '2657322453', NULL),
(34229421, '1132185230', NULL),
(37716731, '2657312733', NULL),
(47669942, '2657441896', NULL),
(49221038, NULL, NULL),
(50479934, NULL, NULL),
(55012879, NULL, NULL);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `traslado`
--

INSERT INTO `traslado` (`idTraslado`, `numeroDeSerie`, `idCentroDeVacunacion`, `fechaDeSalida`, `fechaDeLlegada`, `activo`) VALUES
(1, 1, 1, '2024-01-04', '2024-02-04', 1),
(2, 4, 2, '2024-06-12', '2024-06-13', 1),
(3, 1, 2, '2024-02-01', '2024-03-01', 1),
(4, 1, 23, '2024-07-20', '2024-07-21', 1),
(5, 4, 23, '2024-07-18', '2024-07-19', 1),
(6, 4, 46, '2024-07-18', '2024-07-20', 1),
(7, 9, 23, '2024-07-29', '2024-07-20', 1),
(8, 4, 92, '2024-07-19', '2024-07-21', 1),
(17, 9, 69, '2024-07-17', '2024-07-18', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `localidad` varchar(255) NOT NULL,
  `provincia` varchar(255) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `rol`, `nombre`, `apellido`, `email`, `password`, `localidad`, `provincia`, `activo`) VALUES
(1, 'Super Admin', 'Ezequiel', 'Diaz', 'diazezequiel777@gmail.com', '$2b$05$ifOf6qUi1UnStcHGPd9oruu.H1cVoDgUDrH/jiVW7HS6kcPttTzQu', 'Adrogué', 'Buenos Aires', 1),
(2, 'Gestor de compras', 'Federico', 'Cruceño', 'fedeicru@gmail.com', '$2b$05$ifOf6qUi1UnStcHGPd9oruu.H1cVoDgUDrH/jiVW7HS6kcPttTzQu', 'Los Molinos', 'Córdoba', 1),
(3, 'Operador de logistica', 'Patricia', 'Baigorria', 'patobaigorria@gmail.com', '$2b$05$ifOf6qUi1UnStcHGPd9oruu.H1cVoDgUDrH/jiVW7HS6kcPttTzQu', 'La Ribera', 'San Luis', 1),
(4, 'Agente de salud', 'Lautaro', 'Saucedo', 'lauchasaucedo@gmail.com', '$2b$05$6jigAHw3HE6ZiOQWv4WBieOOLE27xfHmsrh/wukTxCXbJcvVUCdDG', 'Las Mojarras', 'Catamarca', 1),
(5, 'Agente de salud', '86', 'Agente', 'agente@gmail.com', '$2b$05$k/O9Q.Jqlx9ED0XlDd1Cj.u9mqpNdGdsYOSOaSVJFORxx0MQZ1TpS', 'Las Talas', 'San Juan', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agentedesalud`
--
ALTER TABLE `agentedesalud`
  ADD PRIMARY KEY (`DNI`),
  ADD UNIQUE KEY `matricula` (`matricula`);

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
  ADD KEY `numeroDeSerie` (`numeroDeSerie`),
  ADD KEY `idUsuario` (`idUsuario`);

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
-- Indices de la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD PRIMARY KEY (`DNI`);

--
-- Indices de la tabla `traslado`
--
ALTER TABLE `traslado`
  ADD PRIMARY KEY (`idTraslado`),
  ADD KEY `idCentroDeVacunacion` (`idCentroDeVacunacion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `nombreUsuario` (`nombre`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aplicacion`
--
ALTER TABLE `aplicacion`
  MODIFY `idAplicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `centrodevacunacion`
--
ALTER TABLE `centrodevacunacion`
  MODIFY `idCentroDeVacunacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT de la tabla `depositonacional`
--
ALTER TABLE `depositonacional`
  MODIFY `idDepositoNacional` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT de la tabla `depositoprovincial`
--
ALTER TABLE `depositoprovincial`
  MODIFY `idDepositoProvincial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT de la tabla `descarte`
--
ALTER TABLE `descarte`
  MODIFY `idDescarte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `laboratorio`
--
ALTER TABLE `laboratorio`
  MODIFY `idLaboratorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT de la tabla `loteinterno`
--
ALTER TABLE `loteinterno`
  MODIFY `numeroDeSerie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `loteproveedor`
--
ALTER TABLE `loteproveedor`
  MODIFY `numeroDeLote` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `idRegistro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=324;

--
-- AUTO_INCREMENT de la tabla `traslado`
--
ALTER TABLE `traslado`
  MODIFY `idTraslado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `descarte_ibfk_2` FOREIGN KEY (`numeroDeSerie`) REFERENCES `loteinterno` (`numeroDeSerie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `descarte_ibfk_3` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

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
