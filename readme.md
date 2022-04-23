<h1>Technologie Chmurowe - zadanie1</h1>

<h3>Autor: Konrad Miziński</h3>

Kod źródłowy aplikacji jest w katalogu "src", wraz z komentarzami.
Serwer domyślnie nasłuchuje na porcie 3000.

Plik Dockerfile wykorzystuje wieloetapowe budowanie obrazów.
W etapie 1 "STAGE1" zostaje wykorzystany obraz bazowy "node:alpine"
do pobrania niezbędnych pakietów w aplikacji.

Drugi etap to przygotowanie już głównego obrazu opartego na obrazie "alpine",
do którego po pobraniu pakietu "node" zostaje przeniesiona aplikacja z etapu 1.

Użyte polecenia wraz z opisem:
(Przed budowaniem obrazu na hoście został zainstalowany pakiet qemu-user-static, OS: ArchLinux)

<ul>
<li>Zbudowanie obrazu</li>
<ol>
<li><b>docker buildx create --name z1builder</b> - utworzenie nowego buildera</li>
<li><b>docker buildx use z1builder</b> - mówi builx'owi, którego buildera używać</li>
<li><b>docker buildx inspect --bootstrap</b> flaga --bootstrap powoduje, że buildx upewni się że builder wystartował, jeżeli nie to go uruchomi</li>
<li><b>docker buildx build -f Dockerfile -t gmanos/zadanie1:z1img --platform linux/arm/v7,linux/arm64/v8,linux/amd64 --push .</b> - budowa obrazu na architektury linux/arm/v7,linux/arm64/v8,linux/amd64, nazwanie go "gmanos/zadanie1:z1img" i wypchnięcie do repo dockerhuba</li>
</ol>

<li> Uruchomienie obrazu:</li>
<ol>
<li><b>docker run -d -p 3000:3000 --name kmz1 gmanos/zadanie1:z1img</b> - uruchomienie obrazu na porcie 3000</li>
</ol>
<li> Wyświetlenie logów aplikacji</li>
<ol>
<li><b> docker logs kmz1</b> - w logach informacje o autorze, dacie uruchomienia i porcie</li>
</ol>
<li> Sprawdzenie ile warstw ma obraz</li>
<ol>
<li><b>docker inspect gmanos/zadanie1:z1img | jq '.[].RootFS'</b></li>
</ol>
</ul>

<h4>Test działania</hr>
<img src="images/test_aplikacji.png" />