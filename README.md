## Telepítés

A telepítéshez a gyökér könyvtárben elég lefuttatni az `npm i` parancsot. A telepítés automatikusan feltelepíti a `client` és a `server` könyvtárban található  függőségeket is.

## Futtatás

A kliens részét először le kell fordítani (`npm run build`), majd a szervert elindítani (`npm run start`). A szerver a `localhost:8080` fog figyelni.

## Fejleszés

A szerver fájlok módosítása után újra kell indítani a szervert, illetve a kliens fájlok módosításakor újra kell fordítani a klienst.

Létezik megoldás arra, hogy automatikus újrainduljon a szerver bármilyen szerver oldali kódmódosításra, illetve a kliens is újrafordításra kerüljön amikor a hozzá tartozó fájlok módosulnak. Ezek beállításával a fejlesztés megkönyíthető.
