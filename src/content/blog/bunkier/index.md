---
title: 'Bunkier gra'
pubDate: 2020-05-27
tags: ["games"]
---

W ramach odskoczni od ciut ostatnio nudnego frontendu postanowiłem wrócić do mojego starszego projektu.

<!--more-->

Problem z tym projektem był taki, że - no właśnie - znowu winne baby. Pracowałem nad nim bardzo dawno temu - gdy byłem jeszcze młody, piękny, bogaty. W tamtych czasach nie znałem czegoś takiego jak system wersjonowania, a wszystko trzymałem na swoim pięknym talerzowym dysku. Czy kontynuować? Pożyczyłem owy dysk mojej siostrze, co by sobie przegrała kilka filmów. Niestety niespełna kilkuletni siostrzeniec nie wiedział, że dyskiem się nie rzuca. No i tak całą pracę wziął szlak. Także tamtego pamiętnego dnia dołączyłem do grupy ludzi, którzy zaczęli robić backupy (co nie zawsze jest prawdą, ale tak mówię, by wyjść na pro).

Na szczęście został mi w starym portfolio dołączony plik ze skompilowaną grą. Zawsze coś.
Któregoś dnia swojego życia znalazłem w necie rozpakowywacz do takich exe. Jakoś udało się uzyskać strukturę plików przypominającą tamtą. Przypominającą, bo nie działającą.

Ostatnimi czasy postanowiłem zmierzyć się z tym starym tworem. Wśród rozpakowanej zawartości miałem kilka sprajtów, kilka plików dźwiękowych i grę, która przy próbie uruchomienia rzucała jakieś 2k błędów.

Zacząłem od naprawy błędów. Jako tako by działało. Potem zacząłem porządki. Szybko okazało się, że stary kod trzeba mocno pozmieniać, większość grafik się do niczego nie przyda, dużo rzeczy brakuje i w zasadzie powinienem zacząć większość od nowa.
W obecnej wersji w zasadzie obstało się tylko kilka pojedynczych grafik i niektóre dźwięki. Całą resztę robię od początku.

I znowu choć na moment ożyła zajawka gdy się po nocach dziuba pixel artową grafikę. Co w wielu momentach nie jest dla mnie proste, bo ponownie udowadniam sobie, że w necie możesz znaleźć wszystko, tylko dziwnym trafem większość wyników nie nadaje się do niczego.

Poniżej kilka nagrań ja wiem - devloga?

Pierwsza wersja tunelów. Tutaj już chwilę pracowałem nad grafiką. Potem pomyślałem, że w sumie nie podobają mi się takie niskie ściany...
<iframe width="560" height="315" src="https://www.youtube.com/embed/jM_i6ptuUpU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>

Poprawiony system alarmu, który będzie występował w niektórych levelach.
<iframe width="560" height="315" src="https://www.youtube.com/embed/HqqlyHUyfPM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>

Podobnie z broniami. Starych było może więcej, ale nie byłem zadowolony z ich działania. Gdy piszę te słowa wciąż pracuję nad tym elementem. Możliwe, że kolejnym będzie miotacz ognia, ale tutaj chyba już użyję systemu cząstek. W sumie nie jestem tutaj ekspertem, a cały projekt traktuję jako poligon doświadczalny. Na poniższym filmie widać też nieco powiększone ściany, które teraz dają więcej możliwości na detale.
<iframe width="560" height="315" src="https://www.youtube.com/embed/mJTi6Nj0lb0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Edit
Poniżej trzy kolejne filmy.

W międzyczasie idąc za różnymi opisami w internecie spróbowałem użyć innego silnika. Wybór padł na Godot. Na pewno jest bardziej ułożony niż GameMaker, ma o wiele więcej ficzerów, o wiele więcej możliwości, jest nowszy w wielu rozwiązaniach, a i uczy lepszych wzorców (np. delta time, używanie wektorów czy emitowanie zdarzeń). Jest także w wielu momentach zwyczajnie bardziej przemyślany, co wiele razy mocno skróciło mi kod. Po krótkiej zabawie miałem efekt dość podobny do tego z GameMakera:

<iframe width="560" height="315" src="https://www.youtube.com/embed/6wGh--HWVkw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Niestety, efekt końcowy działa wolniej niż ten z GameMakera. Ponoć to wina używanego języka, który nie jest za szybki. Dodatkowo jak na taki "nowy" silnik, kilku rzeczy tam brakuje i są nie do końca dopracowane. Najbardziej upierdliwą sprawą wydaje mi się brak sensownego wykrywania drogi, a samemu nie chce mi się wymyślać jak zaimplementować A*. Trzeba czekać na kolejne wersje.

Wróciłem więc do tej wersji:

<iframe width="560" height="315" src="https://www.youtube.com/embed/4TLNIri4bGU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

...przy okazji tworząc wersję Zombie:

<iframe width="560" height="315" src="https://www.youtube.com/embed/3Li0JGPDouk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I tyle.
Żeby to miało ręce i nogi trzeba by dokończyć sporo rzeczy. Z każdym dniem jednak praca staje się coraz powolniejsza. Tak naprawdę od początku planowałem, że będzie to tylko forma eksperymentu i powrotu do starego projektu - i nic więcej.
Przy okazji człowiek zobaczył, jak my z tymi naszymi [CSS + JS] mamy dobrze. To nie to co GameMaker, gdzie timerów nie ma, sensowne tablice wprowadzili dopiero w najnowszej wersji, a o jakiś css-transition czy animacjach człowiek może zapomnieć...

<iframe width="560" height="315" src="https://www.youtube.com/embed/VipDHUrAHiE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>