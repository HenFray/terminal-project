# Terminal - React Terminal Emulator

**Terminal** es una aplicación de emulación de terminal simple hecha con React. Permite ejecutar comandos definidos en un archivo CSV, con soporte para saltos de línea y HTML en la salida. También incluye un comando especial `clear` para limpiar la pantalla.

## Características

- Simulación de una terminal de línea de comandos en un entorno web.
- Carga de comandos desde un archivo CSV (`commands.csv`).
- Soporte para HTML en la salida (como el uso de etiquetas `<br>` para saltos de línea).
- Comando `clear` para limpiar el historial de la terminal.
- Desplazamiento automático para mostrar siempre el último comando.
- Diseño estilo terminal con botones de control estilo macOS.

## Requisitos

- Node.js
- Yarn o npm para la gestión de paquetes.

## Instalación

1. Instala las dependencias:

    ```bash
    yarn install
    ```

    o

    ```bash
    npm install
    ```

2. Asegúrate de que el archivo `commands.csv` esté ubicado en la carpeta `public/`:

    - Estructura del archivo `commands.csv`:

      ```csv
      comando,output
      skills,"python.py <br> pandas.py <br> numpy.py <br> matplotlib.py"
      help,"Comandos disponibles: <br> - clear <br> - skills"
      ```

3. Inicia la aplicación:

    ```bash
    yarn start
    ```

    o

    ```bash
    npm start
    ```

## Estructura del Proyecto

- **`src/Terminal.tsx`**: Componente principal que emula la terminal.
- **`public/commands.csv`**: Archivo que contiene los comandos y sus correspondientes outputs.
- **`package.json`**: Archivo de configuración de dependencias del proyecto.

## Uso

### Comandos

- **clear**: Limpia la pantalla de la terminal.
- **skills**: Muestra una lista de habilidades, obtenida desde el archivo CSV.
- **help**: Muestra una lista de comandos disponibles.

Puedes modificar o agregar más comandos y salidas en el archivo `commands.csv` para personalizar la terminal.

### Personalización

- Para agregar nuevos comandos, edita el archivo `commands.csv` en la carpeta `public/`. Asegúrate de seguir el formato:

    ```csv
    comando,output
    nuevo_comando,"Salida correspondiente al nuevo comando."
    ```

- Si deseas agregar más funcionalidad o cambiar el diseño de la terminal, puedes modificar el archivo `Terminal.tsx` en la carpeta `src/`.


## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para la construcción de interfaces de usuario.
- **PapaParse**: Biblioteca para la manipulación de archivos CSV en JavaScript.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Tailwind CSS**: Framework de CSS para diseño rápido y responsivo.

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir, sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una rama nueva (`git checkout -b feature/nueva-funcionalidad`).
3. Haz tus cambios y realiza un commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Envía tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request en GitHub.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles.
