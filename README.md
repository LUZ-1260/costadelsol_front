## COSTA DEL SOL
### Node.js

[**Angular 17**](https://angular.io/guide/what-is-angular) requiere `Node.js` LTS version `^22.15.1`.


### Angular CLI

Instalar Angular CLI de manera global con el uso de una terminal.

```bash
npm install -g @angular/cli@17.2.0
```

### Instalación

``` bash
$ npm install
$ yarn install
```

### Uso Básico

``` bash
$ ng serve
```

Navegar a [http://localhost:4200](http://localhost:4200). La aplicación realizará la carga de manera automática si existen cambios en los archivos.

#### Build (Construir)

Construir `build` el proyecto. La aplicación generada se encuentra en el directorio `dist/`.

```bash
$ ng serve: build
```

## Estructura del proyecto

Acontinuación se presenta la estructura de la aplicación:

```
costadelsol_front
├── src/                         # raiz de la aplicación
│   ├── app/                     # directorio principal
|   │   ├── models/              # modelado de interfaces para el tipado de datos
|   │   ├── modules/             # modulos y componentes de la plataforma
|   │   ├── services/            # Servicios para conectar con el backend
|   │   ├── theme/               # configuraciones del template admin
|   |   │   └── layouts/         # layouts de nav y navbar
|   |   │   └── shared/          # Componentes de Material Angular
│   ├── assets/                  # images, icons, etc.
│   ├── scss/                    # scss styles
│   └── index.html               # html template
│
├── angular.json
├── readme.md
└── package.json
```
