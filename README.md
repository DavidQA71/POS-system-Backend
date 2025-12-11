# POS System Backend

Sistema de Punto de Venta (POS) hecho con **Node.js**, **Express**, **TypeScript** y **MySQL**.

## 🚀 Instalación

### Clonar el repositorio
```
git clone https://github.com/DavidQA71/POS-system-Backend.git

```

### Instalar dependencias
```
npm install

```

### **Crear un archivo .env con:**
```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=pos_system
JWT_SECRET=una_clave_super_secreta
```

### Ejecutar:
```
npm run start

```

## 🗄️ Base de datos

1. Entrá a **phpMyAdmin** o **MySQL Workbench**.  
2. Creá una base de datos vacía llamada `pos_system`.  
3. Importá el archivo SQL llamado `pos_system.sql`.