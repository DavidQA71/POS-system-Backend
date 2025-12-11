-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-11-2025 a las 00:05:20
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pos_system`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `route` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `menus`
--

INSERT INTO `menus` (`id`, `name`, `route`) VALUES
(1, 'POS', '/Pos'),
(2, 'Stock', '/Stock'),
(3, 'Users-adm', '/UserManagement');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pay_methods`
--

CREATE TABLE `pay_methods` (
  `id` int(11) NOT NULL,
  `payment` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pay_methods`
--

INSERT INTO `pay_methods` (`id`, `payment`) VALUES
(1, 'Efectivo'),
(2, 'Débito'),
(3, 'Crédito'),
(4, 'Transferencia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `stock` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `description`, `stock`, `price`) VALUES
(1, 'Pan', 100, 150.00),
(2, 'Leche entera 1L', 80, 250.00),
(3, 'Azúcar 1kg', 43, 400.00),
(4, 'Yerba mate 1kg', 50, 1200.00),
(5, 'Aceite girasol 1L', 46, 1100.00),
(6, 'Galletas surtidas', 73, 500.00),
(7, 'Fideos spaghetti 500g', 100, 350.00),
(8, 'Arroz 1kg', 100, 420.00),
(9, 'Sal fina 500g', 50, 200.00),
(10, 'Salsa de tomate 340g', 75, 280.00),
(11, 'Café instantáneo 170g', 40, 1500.00),
(12, 'Queso cremoso 1kg', 30, 2500.00),
(13, 'Jabón en polvo 800g', 60, 980.00),
(14, 'Detergente 500ml', 80, 620.00),
(15, 'Shampoo 400ml', 70, 1500.00),
(16, 'Papel higiénico x4', 100, 1200.00),
(17, 'Gaseosa cola 2.25L', 90, 1400.00),
(18, 'Agua mineral 1.5L', 110, 700.00),
(19, 'Cerveza lata 473ml', 120, 900.00),
(20, 'Vino tinto 750ml', 30, 2300.00),
(21, 'Huevos docena', 80, 1300.00),
(22, 'Manteca 200g', 40, 900.00),
(23, 'Dulce de leche 400g', 45, 950.00),
(24, 'Mayonesa 500g', 60, 1150.00),
(25, 'Mostaza 250g', 60, 800.00),
(26, 'Caramelos surtidos', 100, 300.00),
(27, 'Galletitas de chocolate', 90, 550.00),
(28, 'Helado pote 1L', 25, 2000.00),
(29, 'Pan rallado 500g', 40, 350.00),
(30, 'Cereal desayuno 300g', 30, 1100.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `description` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `description`) VALUES
(1, 'Administrador'),
(2, 'Cajero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_menu_access`
--

CREATE TABLE `role_menu_access` (
  `role_id` int(11) DEFAULT NULL,
  `menu_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `role_menu_access`
--

INSERT INTO `role_menu_access` (`role_id`, `menu_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `ticket_number` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date_sale` datetime DEFAULT NULL,
  `pay_method_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `ticket_number`, `user_id`, `date_sale`, `pay_method_id`) VALUES
(1, 1, 1, '2025-09-22 21:30:06', 2),
(2, 2, 1, '2025-09-22 21:39:22', 2),
(3, 3, 1, '2025-09-22 21:56:12', 2),
(4, 4, 1, '2025-09-22 21:57:38', 2),
(5, 5, 1, '2025-09-22 21:59:08', 2),
(6, 6, 1, '2025-09-22 22:01:46', 2),
(7, 7, 1, '2025-09-22 22:03:36', 2),
(8, 8, 1, '2025-09-22 22:08:20', 2),
(9, 9, 1, '2025-09-22 22:10:28', 2),
(10, 10, 1, '2025-09-22 22:12:16', 2),
(11, 11, 1, '2025-09-22 22:15:21', 2),
(12, 12, 1, '2025-09-22 22:17:42', 2),
(13, 13, 1, '2025-09-22 22:18:57', 2),
(14, 14, 1, '2025-09-22 22:31:11', 2),
(15, 15, 1, '2025-09-22 22:34:25', 2),
(16, 16, 1, '2025-09-24 17:18:44', 2),
(17, 17, 1, '2025-09-24 17:28:13', 2),
(18, 18, 1, '2025-09-24 17:29:48', 2),
(19, 19, 1, '2025-09-24 17:42:40', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale_items`
--

CREATE TABLE `sale_items` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `ticket_number_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sale_items`
--

INSERT INTO `sale_items` (`id`, `product_id`, `ticket_number_id`, `quantity`, `unit_price`) VALUES
(1, 5, 19, 7, 130.00),
(2, 3, 19, 17, 150.00),
(3, 5, 19, 17, 150.00),
(4, 6, 19, 17, 150.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temporary_sales_items`
--

CREATE TABLE `temporary_sales_items` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'María González', 'maria.gonzalez@email.com', 'maria123'),
(2, 'Juan Pérez', 'juan.perez@email.com', 'juan123'),
(3, 'Lucía Fernández', 'lucia.fernandez@email.com', 'lucia123'),
(4, 'Carlos Ramírez', 'carlos.ramirez@email.com', 'carlos123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pay_methods`
--
ALTER TABLE `pay_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `role_menu_access`
--
ALTER TABLE `role_menu_access`
  ADD KEY `role_id` (`role_id`),
  ADD KEY `menu_id` (`menu_id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ticket_number` (`ticket_number`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pay_method_id` (`pay_method_id`);

--
-- Indices de la tabla `sale_items`
--
ALTER TABLE `sale_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `ticket_number_id` (`ticket_number_id`);

--
-- Indices de la tabla `temporary_sales_items`
--
ALTER TABLE `temporary_sales_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_roles`
--
ALTER TABLE `user_roles`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pay_methods`
--
ALTER TABLE `pay_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `sale_items`
--
ALTER TABLE `sale_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `temporary_sales_items`
--
ALTER TABLE `temporary_sales_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `role_menu_access`
--
ALTER TABLE `role_menu_access`
  ADD CONSTRAINT `role_menu_access_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `role_menu_access_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`);

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`pay_method_id`) REFERENCES `pay_methods` (`id`);

--
-- Filtros para la tabla `sale_items`
--
ALTER TABLE `sale_items`
  ADD CONSTRAINT `sale_items_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `sale_items_ibfk_2` FOREIGN KEY (`ticket_number_id`) REFERENCES `sales` (`ticket_number`);

--
-- Filtros para la tabla `temporary_sales_items`
--
ALTER TABLE `temporary_sales_items`
  ADD CONSTRAINT `temporary_sales_items_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
