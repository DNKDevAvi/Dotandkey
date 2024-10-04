@echo off

REM Start JSON Server with perks.json on port 8100
start json-server --watch api/db.json --port 8000

REM Start JSON Server with perks.json on port 8100
start json-server --watch api/perks.json --port 8100

REM Start JSON Server with topmenu.json on port 8200
start json-server --watch api/topmenu.json --port 8200

REM Start JSON Server with menu.json on port 8300
start json-server --watch api/menu.json --port 8300

REM Start JSON Server with search.json on port 8400
start json-server --watch api/search.json --port 8400

REM Start JSON Server with banner.json on port 8500
start json-server --watch api/banner.json --port 8500

REM Start JSON Server with banner.json on port 8500
start json-server --watch api/topnav.json --port 8600

REM Start JSON Server with banner.json on port 8500
start json-server --watch api/hometabs.json --port 8700

REM Start JSON Server with banner.json on port 8500
start json-server --watch api/shop-all.json --port 8800

REM Start JSON Server with banner.json on port 8500
start json-server --watch api/sunscreen.json --port 8810

REM Start JSON Server with banner.json on port 8500
start json-server --watch api/moisturizer.json --port 8820

REM Wait for JSON Servers to start
timeout /t 2

REM Call the localhost API endpoints
curl http://localhost:8100/api/db
curl http://localhost:8100/api/perks
curl http://localhost:8200/api/topmenu
curl http://localhost:8300/api/menu
curl http://localhost:8400/api/search
curl http://localhost:8500/api/banner
curl http://localhost:8600/api/topnav
curl http://localhost:8700/api/tabs
curl http://localhost:8800/api/shop-all
curl http://localhost:8810/api/sunscreen
curl http://localhost:8820/api/moisturizer