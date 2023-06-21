---
title: 'Pasek postępu wczytywania grafik'
pubDate: 2023-06-21
tags: ["progress", "js"]
---

Jakiś czas temu zobaczyłem na grupie facebookowej temat paska postępu wczytywania grafik na stronie.
Od razu pojawiła się masa negatywnych komentarzy, że przecież nigdy takiego się nie powinno stosować bo to anty - UX.
I oczywiście - jak robisz klasyczną stronę, portal, sklep i podobne - taki pasek to raczej zła rzecz. Ale jak robisz dynamiczną, skupiającą się na wyglądzie stronę jakiejś agencji kreatywnej, to dobrze przedstawione wczytywanie też może być uzasadnione. A piszę to, bo dość często przeglądam przykłady ze strony <a href="https://tympanus.net/codrops/">https://tympanus.net/codrops/</a> gdzie co jakiś czas wrzucają zestawienia "Inspirational Websites Roundup". Wystarczy je przejrzeć by zobaczyć, że w zasadzie ciężko znaleźć tam stronę, która takiego wczytywania by nie miała.

Jeden z komentarzy na grupie mówił o tym, że takie "progress bary" są bez sensu, bo nie wiadomo ile pliki ważą i paski najczęściej działają skokowo reagując dopiero po wczytaniu danej grafiki. Tak, wynika to z faktu, że najczęściej stosowanym zabiegiem jest reakcja na zdarzenie "load" grafiki i dopiero wtedy aktualizacja stanu paska. Po przeczytaniu tego komentarza postanowiłem spróbować się z tym wyzwaniem, w wyniku czego stworzyłem pasek postępu który pokazuje realne wczytywanie plików. Zupełnie inna metoda korzystająca z XMLHttpRequest. Link do repozytorium: <a href="https://github.com/kartofelek007/progress-bar">https://github.com/kartofelek007/progress-bar</a>

<!--more-->

