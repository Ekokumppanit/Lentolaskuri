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
```
npm install && bower install
```

### Building the project ###
```
grunt server # Start development server
grunt # Build minified and optimized version for release
```

## Credits ##

- Build by [Juho Teperi](https://github.com/Deraen) in 2013 while working for [Ekokumppanit Oy](http://www.ekokumppanit.fi)
- Currently maintained by [Ismo Vuorinen](https://github.com/ivuorinen)

Airport data comes from [OpenFlights.org](http://openflights.org) ([airports.dat](http://sourceforge.net/p/openflights/code/HEAD/tree/openflights/data/airports.dat), [AGPL](http://www.gnu.org/licenses/agpl.html))