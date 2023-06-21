---
title: 'Kilka słów o Electronie'
pubDate: 2020-05-20
tags: ["editor", "sublime text", "edytor"]
---

W ramach testu stworzyłem dwie małe aplikacje w Electronie.

<!--more-->

## Painter
Pierwsza z nich służy do rysowania po ekranie.

Wykonałem tutaj dwie wersje. Pierwsza była zrobiona w czystym Javascript. W testach na żywym organiźmie doszedłem do wniosku, że w sumie nie potrzeba zbyt dużo narzędzi, a zamiast nich przydało by się zarządzanie elementami na ekranie. Tak powstała wersja poniższa:

<iframe width="560" height="315" src="https://www.youtube.com/embed/3Hy6OED8XXE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Color manager
Druga aplikacja służy do zarządzania kolorami, a w zasadzie ich szybkiego pobierania. Prowadząc zajęcia dość często zdarza mi się sytuacja, gdzie w ramach pokazu trzeba dobrać jakieś ładne kolory. Mam w zakładkach przygotowane do tego odpowiednie strony, ale czemu by nie zrobić do tego aplikacji (przy okazji poćwiczyć)? Tak powstał poniższy program.

<iframe width="560" height="315" src="https://www.youtube.com/embed/rw3y8Hy8hWo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

W sumie nic specjalnego.

W ramach nauki przepisałem powyższą aplikację na Reacta i Vue.
Nie jestem ekspertem od tych frameworków więc mogę napisać tylko o moich amatorskich odczuciach.
Vue wydał mi się bardziej uporządkowany i lepiej przemyślany od Reacta. Może pisze się ciut więcej kodu, ale jest on bardziej czytelny.
W Reakcie też spoko się pisało, ale kilka rzeczy mi się nie do końca spodobało. Składnia warunkowa wewnątrz jsx wygląda kiepsko i tutaj mimo wszystko bardziej przypadły mi do gustu instrukcje warunkowe z vue. Druga rzecz to useEffect, który wydał mi się dziwny. Kto wymyślił żeby jedna funkcja spełniała trzy różne zadania w zależności od tego czy przekażesz tablicę, użyjesz return itp? Ale znowu. To tylko odczucia amatora - pewnie błędne.

W każdym bądź razie zostałem przy wersji w czystym JS. Działa zwyczajnie lepiej i o dziwo - pisało mi się ją o wiele przyjemniej.


## Ale ten wpis jest o Electronie
Po tej krótkiej przygodzie nasuwa mi się też kilka mini spostrzeżeń na temat Electrona.

Z jednej strony dość łatwo robi się w nim całe aplikacje, bo w zasadzie nie różni się to zbytnio od stworzenia aplikacji dla webu (plus masz w każdej chwili pełen dostęp do Node.js). Dodatkowo stworzony w ten sposób program powinien (w teorii) działać podobnie na większości systemów co też jest dużym plusem.

Z drugiej strony nie sposób się nie zgodzić z wszystkimi opiniami, że Electron produkuje kobylaste nie za bardzo wydajne aplikacje. Powyższe dzieła zajmują na dysku ponad 50MB każde, a po odpaleniu pożerają średnio 80-100MB pamięci. Rozumiem, że komputery idą do przodu, ale jak dla mnie to trochę przesada. Takie proste narzędzia powinny zajmować max 2-3MB na dysku i odpalać się pół sekundy, a nie kilka.

Electron przy starcie aplikacji w tle ładuje Chromium i Node, dzięki czemu możemy korzystać z wszystkich ich dobroci, a dodatkowo nie jesteśmy uzależnieni od bibliotek zainstalowanych w danym systemie.
Ale czy to tak powinno działać? To tak jakbym pisał program w C#, użył dostępu do dysku, a dodało by mi do mojej aplikacji wszystkie możliwe ficzery które znajdę na danym systemie. Może kiedyś, w innej wersji, a może zupełnie innym narzędziu zrobią tak, by wrzucało tylko to co jest realnie przez naszą aplikację używane? A może przydało by się wreszcie dogadać i wydać jakieś między systemowy Direct-ultra-fucker-X?

Kolejny problem z jakim się natknąłem to błędy samego Electrona. Podstawowe opcje takie jak fullscreen, czy alwaysOnTop nie działają jak należy. Na windowsie alwaysOntop otwiera okno nad innymi, ale nie jest to "always". Opcja fullscreen zostawia dziwne nieaktywne krawędzie przy skraju ekranu, na osx otwiera czarną pustą przestrzeń, a na Ubuntu znika boczny docker. Do tego problemy z ikonami itp. W zasadzie co chwila trzeba walczyć z pierdołami, które powinny działać jak należy, a zwyczajnie nie działają. Chcąc nie chcąc zmuszony jesteś przebijać się przez kolejne bez sensu pozamykane wątki na Githubie. Ciekawe jak na to wszystko patrzą starszy programiści, którzy chowali się na klasycznych "starych" językach.

Podsumowując - Electron - ciekawe narzędzie, ale nie do wszystkiego się nada. Powyższe aplikacje mimo że w testach działają jak należy, póki co nie trafiły do mojego codziennego warsztatu. Znalazłem dla nich bardziej prymitywne - ale szybciej działające zamienniki.




