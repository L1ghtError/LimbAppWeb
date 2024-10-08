## LimbAppWeb
### Image procesing service written on JS
Works with [Backend](https://github.com/L1ghtError/LimbService).

>[!NOTE]
>**Image processing Worker** source code recently not available.

### How to build
native:
```bash
$ npm istall
$ npm run dev
```
or
```bash
$ npm run build
```
Docker:
```bash
$ docker build -t web .
$ docker run -p 5173:80 web 
```
Docker-compose:
```bash
$ docker-compose up --build
```
> **Tech stack:**
> - [React](https://react.dev/) as ui-framework
> - [Vite](https://vite.dev/) development server
> - All smaller dependencies can be found in [package.json](https://github.com/L1ghtError/LimbAppWeb/blob/main/package.json)