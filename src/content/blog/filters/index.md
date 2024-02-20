---
title: 'Backdrop filters'
pubDate: 2024-02-20
tags: ["css"]
---

Istnieje właściwość <strong>filter</strong>, która pozwala nam dodawać filtry dla danego elementu. Nie będę tutaj sztucznie silił się, by opisać tą właściwość. <a href="https://css-tricks.com/almanac/properties/f/filter/">Tu macie fajny opis</a>, a tu <a href="https://codepen.io/DeyJordan/pen/oNaavJg">jeden z wielu eksperymentów</a>.

Tym wpisem chciałem tylko zwrócić uwagę, że istnieje też właściwość <strong>backdrop-filter</strong>, która działa bardzo podobnie ale dla elementów leżących w tle danego elementu. Nadaje się więc idealnie np. dla tła wszelakich okienek.

Ciekawe jest to, że jedną z dostępnych wartości jest <strong>url()</strong>, w którym możemy np. wskazać filtr z svg, co pozwala nam symulować np. efekt wody: <a href="https://www.youtube.com/watch?v=LHkvf3SNAPM">https://www.youtube.com/watch?v=LHkvf3SNAPM</a>.

Ale jeszcze bardziej ciekawe jest to, że podobne filtry svg możemy stosować dla <strong>backdrop-filter</strong>, co pozwala nam na przykład uzyskać efekt szkła:

<a href="https://codepen.io/kartofelek007/pen/MWxxqVb" class="demo">Przykład użycia</a>

