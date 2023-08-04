---
title: 'Zapisywanie czesci strony jako png'
pubDate: 2023-07-30
tags: ["express", "node", "js", "html2canvas"]
---

Ostatnimi czasy rozbiłem aplikację do tworzenia różnorakich gradientów https://ggradient.com
Jedną z kolejnych funkcjonalności miało być zapisywanie wygenerowanego tła do png.
W moim przypadku zapisywany miał być element, na którym generuję tło z gradientami.

### html2canvas
Jedyne sensowne rozwiązanie jakie znam to biblioteka <a href="https://html2canvas.hertzen.com/">html2canvas</a>, która pozwala
zapisywać html w formie grafiki.
Niestety biblioteka ta ma ograniczone możliwości i nie zawsze udaje się jej idealnie przenosić na grafikę to co jest na stronie. Szczególnie gdy mówimy o zaawansowanych gradientach połączonych z `background-blend-mode`.
Fajna biblioteka, ale nie w tym przypadku.

### Screen Capture API
Kolejnym pomysłem było skorzystanie z Screen Capture API, które pozwala łapać obraz z różnych mediów, np. kamery czy pulpitu.
https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture
https://github.com/w3c/mediacapture-screen-share/issues/105
Kiedyś pisałem o tym <a href="https://kursjs.pl/kurs/canvas/canvas-images#generowanie-na-bazie-plotna">tutaj</a>.
Niestety z tego co wiem, nie za bardzo dało się tutaj łapać pojedynczą klatkę. Bardziej upierdliwe było jednak to, że za każdym razem user był odpytywany odpowiednim okienkiem co właściwie chce udostępnić. Przykład macie tutaj: https://web.dev/patterns/media/screen-record/
Nie dla mnie.

### Puppeter
Pomyślałem sobie też o innym rozwiązaniu. Gradienty generuję na bazie jakiś danych, które przekazuję do odpowiedniej funkcji. Takie dane mogę wysłać na serwer, gdzie za pomocą <a href="https://pptr.dev/">Puppetera</a> otworzę przygotowaną stronę, która będzie generować podobny element z gradientami. Za pomocą Puppetera zrobię screenshoot takiej strony, a następnie wyślę go zakodowanego z powrotem do przeglądarki.

Implementacja tego tutaj: https://codesandbox.io/s/integration-of-frontend-and-backend-forked-k23npz
Implementacja teoretyczna, nie chciało mi się bawić by specjalnie uruchamiać to na tej platformie.
Katalog public to frontend. Z niego wysyłam dane do aplikacji express siedzącej na backendzie. Ta przyjmuje dane, odpala za pomocą puppetera stronę na backendzie, odpala jej funkcję za pomocą `page.evaluate()`, robi zrzut i zwraca go na frontend. Na froncie przyjmuje te dane, generuję link i w niego klikam, co dla użytkownika równa się od razu ściągnięciu grafiki z gradientem.

