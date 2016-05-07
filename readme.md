# Nodepop API

Para probar la API, es necesario tener la base de datos activa y, a continuación, moverse a la caperta 'nodepop':

```cd nodepop/```

A continuación, se inicia la API:

```nodemon```

También se puede hacer uso de varios scripts:

* Debug:

    Si quieres hacer debug de la API, usa el siguiente comando para iniciarla.

    ```npm run debug```

* InstallDB:

    Si quieres borrar las tablas de la base de datos y añadir los anuncios y usuarios del archivo advertisementsJson.json, ejecuta el siguiente comando:

    ```npm run installDB```

* Single Core:

    Para iniciar la API con un solo core, usa el siguiente comando:

    ```npm run singlecore```

# Documentación

Para poder ver la documentación interactiva del API, será necesario moverse a la carpeta iodocs:

```cd iodocs/```

Una vez dentro, iniciaremos el servidor redis, que podemos instalar con homebrew:

```brew install redis```

```redis-server```

Para iniciar finalmente la documentación ejecutar el comando:

```npm run start```

Para visualizar la documentación será necesario acceder con el navegador a la url:

* http://0.0.0.0:4000

Mientras que, la api corre en:

* http://localhost:3000/


