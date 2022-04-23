<h1>Technologie Chmurowe - zadanie1</h1>
<h2>CZĘŚĆ PODSTAWOWA</h2>
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
<li><b>docker buildx build -f Dockerfile -t gmanos/zadanie1:z1img --platform linux/arm/v7,linux/arm64/v8,linux/amd64 --push .</b> - budowa obrazu na architektury linux/arm/v7,linux/arm64/v8,linux/amd64, nazwanie go "gmanos/zadanie1:z1img" i wypchnięcie do repo <a href="https://hub.docker.com/repository/docker/gmanos/zadanie1"><b>Dockerhuba</b></a></li>
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

<h4>Test działania</h4>
<img src="images/test_aplikacji.png" />

<h2>CZĘŚĆ DODATKOWA - DODATEK1</h2>
Akcja, która wyzwala workflwo to push'nięcie na brancha "main".
Workflow bazuje na runnerze "ubuntu-latest".

Etapy workflowa:
<ol>
<li>Akcja: "checkout" - sprawdza, czy workflow ma poprawny dostęp do repo</li>
<li>Akcja: "Buildx set-up" - konfiguruje buildx'a, przez co daje możliwość budowania obrazów na wiele architektur</li>
<li>Akcja: "Docker Setup QEMU" - "instalacja" wielu architektur</li>
<li>Akcja: "Cache Docker Layers" - umożliwia cachowanie, pomiędzy uruchomieniami maszyny wirtualnej</li>
<li>Akcja: "Login to Dockerhub" - logowanie do konta Dockerhubowego</li>
<li>Akcja: "Login to GHCR" - logowanie do rejetru Githuba</li>
<li>Akcja: "Build and push" - zbudowanie i wypchnięcie obrazów na dockerhuba i github registry</li>
<li>Skrypt: "Move cache" - zaktualizowanie cache'a</li>
</ol>

<h4>Działanie cache'a</h4>
Na skrinach poniżej, widać jak cache zostaje poprawnie przywrócony (~157MB) z klucza, następnie stary cache zostaje zastępiony nowym (zostaje zaktualizowany). Wadą tego rozwiązania jest, że cache ciągle rośnie.
<img src="images/cache_restore.png" />
<img src="images/cache_update.png" />