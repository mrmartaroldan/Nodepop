# Práctica despliegue de aplicaciones en servidor 

IP:  

* [Aplicación IODocs](http://52.87.205.60/) (Documentación interactiva del API)

DNS: 

* [Pagina principal nginx](http://ec2-52-87-205-60.compute-1.amazonaws.com/)
* [API](http://ec2-52-87-205-60.compute-1.amazonaws.com/api/v1/advertisements)


Archivos estáticos:

* [Foto bicicleta](http://ec2-52-87-205-60.compute-1.amazonaws.com/images/advertisements/bicicleta.jpg)
* [Foto iphone](http://ec2-52-87-205-60.compute-1.amazonaws.com/images/advertisements/iphone3gs.png)
* [Foto ipad](http://ec2-52-87-205-60.compute-1.amazonaws.com/images/advertisements/ipadmini2.png)
* [Foto estrella de la muerte](http://ec2-52-87-205-60.compute-1.amazonaws.com/images/advertisements/estrellamuerte.jpg)

# Nodepop API

Para probar la API, es necesario tener la base de datos activa y, a continuación, moverse a la caperta 'nodepop':

```cd nodepop/```

A continuación, se inicia la API:

```npm install```

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

```npm install```

```npm run start```

Para visualizar la documentación será necesario acceder con el navegador a la url:

* http://0.0.0.0:4000

Mientras que, la api corre en:

* http://localhost:3000/


