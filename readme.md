# Waveline Music Server
<img src="https://preview.redd.it/3vujqpdulbi41.png?width=2756&format=png&auto=webp&s=2cd56216825a7e9d9145e6b1fb2eb7750bb079d3">

<a href="https://play.google.com/store/apps/details?id=com.waveline.app" target="_blank">
<img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" width="200">
</a>



### Getting started

Clone the repo
```Sh
$ git clone https://github.com/wellenline/waveline-server.git
$ cd waveline-server
```

### Artist pictures from Spotify
To display artist pictures you need to sign up for Spotify Developer Account and create a new application
https://developer.spotify.com/dashboard/login


### Using docker-compose
```docker
version: "3"
services:
  app:
    container_name: waveline-api
    restart: always
    build: ./
    environment:
      - MONGO_URL=mongodb://YOUR_MONGO_USER:YOUR_MONGO_PASS@mongodb/waveline?authSource=admin
      - MUSIC_PATH=/music
      - ART_PATH=/art
      - SPOTIFY_ID=YOUR_SPOTIFY_ID
      - SPOTIFY_SECRET=YOUR_SPOTIFY_SECRET
      - AUTH_ENABLED=true
      - API_KEY=12345 # replace it with something more secure
      - PORT=5000
      - HOST=http://127.0.0.1:5000
    volumes:
      - YOUR_MUSIC_PATH:/music
      - .cache:/art
    ports:
      - "5000:5000"
    links:
      - mongodb
    depends_on:
      - mongodb
  mongodb:
    image: mongo:latest
    container_name: "mongodb"
    environment:
      - MONGO_DATA_DIR=/data
      - MONGO_LOG_DIR=/dev/null
      - MONGO_INITDB_ROOT_USERNAME=YOUR_MONGO_USER
      - MONGO_INITDB_ROOT_PASSWORD=YOUR_MONGO_PASS
    volumes:
      - ./data/mongo:/data
    ports:
      - 27018:27017
    command: mongod --auth --logpath=/dev/null
 ```

```sh
$ docker-compose up -d
```

### Sample .env file
```env
MUSIC_PATH=./demo
ART_PATH=.art
SPOTIFY_ID=xxxxx
SPOTIFY_SECRET=xxxxx
MONGO_URL=mongodb://localhost/waveline-3
AUTH_ENABLED=false
API_KEY=059481784pcascaf4lawg
PORT=5000
HOST=http://192.168.1.120:5000


```
### Building from source
```sh
$ npm i
$ npm run build
$ npm start
```

## Roadmap
Waveline is a personal project and my current goals are

* Offline mode
* Improved Caching
* Casting support
* Desktop app
* iOS version


## API
#### System
|                |Description                    |
|----------------|-------------------------------|
|`GET /system/sync`|Start a new music sync|
|`GET /system/info`|Get music library details|


#### Tracks
|                |Description                    |
|----------------|-------------------------------|
|`GET /tracks`|All tracks (params: skip, limit, genre, favourties, artist, album)|
|`GET /tracks/play/:id`|Stream track|
|`GET /tracks/like/:id`| Toggle track favourite |
|`GET /tracks/new`|New Tracks|

#### Search
|                |Description                    |
|----------------|-------------------------------|
|`GET /search`| Search (params: q) |


#### Albums
|                |Description                    |
|----------------|-------------------------------|
|`GET /albums`| Get all albums (params: skip, limit) |
|`GET /albums/random`| Get 10 random albums |
|`GET /albums/new`| Get new albums |

#### Genres
|                |Description                    |
|----------------|-------------------------------|
|`GET /genres`| Get all genres |

#### Artists
|                |Description                    |
|----------------|-------------------------------|
|`GET /artists`| Get all artists |
|`GET /artists/new`| Get new artists |

#### Playlists
|                |Description                    |
|----------------|-------------------------------|
|`GET /playlists`| Get all playlists |
|`POST /playlists`| Create a new playlist `{name: string, tracks: []}` |
|`PUT /playlists/:id`| Update playlist `{name: string, tracks: []}` |
|`DELTE /playlists/:id`| Delete playlist |


#### Art
|                |Description                    |
|----------------|-------------------------------|
|`GET /art/:id`| Album art |
