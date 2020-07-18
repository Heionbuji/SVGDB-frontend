## SVGDB frontend

Frontend of [SVGDB.me](https://svgdb.me)

## Issues / Contact

For issues or suggestions, you can use the issues tab on this repository. Alternatively, I can be contacted for whatever reason at svgdb@protonmail.com

## Contributing

To get the project running on your machine, first clone the repository
```
git clone https://github.com/Heionbuji/SVGDB-frontend.git
```
Then install the dependencies with
```
npm ci
```
Rename the .env.example file to just .env (and modify it if needed)


And start a development server with
```
npm run start
```

Not that there's much you can actually do, since the backend is (at least for now) not open source.

However, if you do want to do something, you can use the production backend. Just use it responsibly. You can do this by modifying two variables in the .env file:
```
REACT_APP_API_URL=https://svgdb.me/api
REACT_APP_ASSETS_URL=https://svgdb.me/assets
```