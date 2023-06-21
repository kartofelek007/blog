---
title: 'Generator tablic dla grafik'
pubDate: 2019-09-23
tags: ["js", "generator"]
---

Jakiś czas temu robiłem zadania dla poćwiczenia pętli po tablicach wielowymiarowych. Wymyśliłem sobie wtedy, że będą polegały na odtworzeniu <a href="https://github.com/kurs-javascript/js-podstawy/tree/master/5-tablice/2-zadanie-obrazek">zakodowanych grafik</a>.

Żeby takie zadania przygotować, musiałem wygenerować tablice, w których zakodowane były rysunki.

Stworzyłem do tego celu <a href="http://domanart.pl/dema/generator-tablic/draw-app.html">mikro aplikację w jQuery</a>, która ułatwiała mi rysowanie takich ilustracji, a na koniec zwraca w konsoli kod zakodowanej tablicy.

Działać działa, nawet zrobiłem z jej wykorzystaniem kilka takich zagadek.

Problem, który trochę mnie denerwował, to to, że kilka razy kliknąłem w zły piksel, co przy opcji "fill" (jest na dole "aplikacji") psuło całą grafikę. Mogłem dodać tutaj historię zmian (Ctrl + Z), mogłem dodać mieszanie kolorów, zmianę wielkości pędzla itp., ale pomyślałem, że przecież takie opcje są w każdym programie graficznym.

Zamiast więc wymyślać koło na nowo, zastosowałem inne podejście.
Stworzyłem sobie konwerter grafik.

<a href="http://domanart.pl/dema/generator-tablic/generator/index.html">Może komuś się przyda</a>.

A do czego to można użyć? A nie tylko do generowania tablic z rysunkami, ale i generowania całych animacji.

<a href="http://domanart.pl/dema/generator-tablic/animacja/index.html">Tutaj przykład użycia</a> takich tablic do stworzenia animacji za pomocą właściwości box-shadow.
Animację stworzyłem z wykorzystaniem <a href="http://domanart.pl/dema/generator-tablic/animacja-klatki.zip">tych grafik</a>.