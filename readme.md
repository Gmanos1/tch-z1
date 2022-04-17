<h1>Technologie Chmurowe - zadanie1</h1>

<h3>Autor: Konrad Miziński</h3>

Kod źródłowy aplikacji jest w katalogu "src", wraz z komentarzami.
Serwer domyślnie nasłuchuje na portcie 3000.

Plik Dockerfile wykorzystuje wieloetapowe budowanie obrazów.
W etapie 1 "STAGE1" zostaje wykorzystany obraz bazowy "node:alpine"
do pobrania niezbędnych pakietów w aplikacji.

Drugi etap to przygotowanie już głównego obrazu opartego na obrazie "alpine",
do którego po pobraniu pakietu "node" zostaje przeniesiona aplikacja z etapu 1.


Użyte polecenia wraz z opisem:
(Przed budowaniem obrazu na hoście został zainstalowany pakiet qemu-user-static, OS: ArchLinux)
a) Zbudowanie obrazu
1. docker buildx create --name z1builder
2. docker buildx use z1builder
3. docker buildx inspect --bootstrap
4. docker buildx build -f Dockerfile -t gmanos/zadanie1:z1img --platform linux/arm/v7,linux/arm64/v8,linux/amd64 --push .
5. 

b) Uruchomienie obrazu:
1. docker run -d -p 3000:3000 --name kmz1 gmanos/zadanie1:z1img

c) Wyświetlenie logów aplikacji
1. docker logs kmz1

d) Sprawdzenie ile warstw ma obraz
1. docker inspect gmanos/zadanie1:z1img | jq '.[].RootFS'