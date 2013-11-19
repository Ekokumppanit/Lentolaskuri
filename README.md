Lentolaskuri
============

Flight CO2 emission calculator.

Uses [Grunt: The JavaScript Task Runner](http://gruntjs.com/getting-started).

## Installation ##

### Prerequisites ###
- Webserver that runs PHP to poll the airport data
- MySQL server to hold the data
- [npm](https://npmjs.org), [bower](http://bower.io) and [grunt](http://gruntjs.com) to fetch dependencies and to build the project

Lentolaskuri has been tested and build using tested on [MAMP](http://www.mamp.info) and [LAMP](http://en.wikipedia.org/wiki/LAMP_\(software_bundle\)) stack.


### Dependencies ###

See [bower.json](https://github.com/Ekokumppanit/Lentolaskuri/blob/master/bower.json#L4) and [package.json](https://github.com/Ekokumppanit/Lentolaskuri/blob/master/package.json#L5) for complete list of packages.

To install required packages run in the project folder in your terminal of choise:

```
npm install && bower install
```

### Building the project ###
```
grunt server   # Start development server
grunt          # Build minified and optimized version for release to /dist -folder
```

### Configuration ###

1. Configure database access in ``app/api/config.sample.php`` and save as ``app/api/config.php``. The ``config.php`` file gets ignored in ``.gitignore`` so no worries.
2. Build project using ``grunt``, this generates ``dist`` folder
3. Push files and folders in ``dist/*`` to your server, for example as **http://example.com/lentolaskuri**
4. Set up MySQL database table to your server and import airport data to your database:
    - Visit **http://example.com/lentolaskuri/api/import.php** to create mysql table automagically (or import ``app/api/lentolaskuri.sql`` by hand, but change table name to one you used in ``config.php``)
    - Change variable ``$config['create_table']`` to ``false`` in ``app/api/config.php`` to prevent further table creation attempts
    - ProTip: You can make ``cron`` or similar visit this url weekly to update the latest airport data from openflights database
6. Test your lentolaskuri application
7. Donate money based on emissions to a good cause


## Credits ##

- Build by [Juho Teperi](https://github.com/Deraen) in 2013 while working for [Ekokumppanit Oy](http://www.ekokumppanit.fi)
- Previous maintainers
    - [Ismo Vuorinen](https://github.com/ivuorinen) (April to November 2013)
    - [Juho Teperi](https://github.com/Deraen) (From before Github to April 2013)

Airport data comes from [OpenFlights.org](http://openflights.org) ([airports.dat](http://sourceforge.net/p/openflights/code/HEAD/tree/openflights/data/airports.dat), [AGPL](http://www.gnu.org/licenses/agpl.html))