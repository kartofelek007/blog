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

### Screen Capture API
Kolejnym pomysłem było skorzystanie z Screen Capture API, które pozwala łapać obraz z różnych mediów, np. kamery czy pulpitu.
https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture
https://github.com/w3c/mediacapture-screen-share/issues/105

Niestety z tego co pamiętam nie za bardzo dało się tutaj łapać pojedynczą klatkę. Bardziej upierdliwe było jednak to, że za każdym razem user był odpytywany odpowiednim okienkiem co właściwie chce udostępnić. Przykład macie tutaj: https://web.dev/patterns/media/screen-record/
Nie dla mnie.

### Puppeter
Pomyślałem sobie też o innym rozwiązaniu. Gradienty generuję na bazie danych. Takie dane mogę wysłać na serwer, gdzie za pomocą <a href="https://pptr.dev/">Puppetera</a> otworzę przygotowaną stronę, która będzie generować podobny element z gradientami. Za pomocą Puppetera zrobię screenshoot takiej strony, a następnie wyślę go zakodowanego z powrotem do przeglądarki.

Implementacja tego tutaj: https://codesandbox.io/s/integration-of-frontend-and-backend-forked-k23npz
Implementacja teoretyczna, bo nie działająca (kod jest w pełni działający, nie chciało mi się bawić by specjalnie uruchamiać to na tej platformie).
Katalog public to frontend. Z niego wysyłam dane do aplikacji express siedzącej na backendzie. Ta przyjmuje dane, odpala za pomocą puppetera stronę na backendzie, odpala jej funkcję za pomocą `page.evaluate()`, robi zrzut i zwraca go na frontend. Na froncie przyjmuje te dane, generuję link i w niego klikam, co dla użytkownika równa się od razu ściągnięciu grafiki z gradientem.

Działać zadziałało.

...Chociaż...
Po przerzuceniu tego do swojego dostawcy okazało się, że na serwerze nie są zainstalowane paczki pozwalające odpalić chrome. Po zgłoszeniu uwagi administratorowi niby je zainstalował, ale wtedy coś innego się zaczęło krzaczyć.
Olałem temat i w ramach testu przeniosłem się na https://www.back4app.com/. Żeby to tam odpalić, musiałem przygotować obraz dla Dockera.
Pół dnia przygotowywałem różne obrazy w których mógł bym odpalić Puppetera. Masakra jakaś. A to instalacja wykrzaczyła się bo tak, bo nie wiadomo co. A to stawała przy wyborze strefy czasowej bo nikt nie przewidział by skryptem można było wskazać co wybrać. A to nagle instalacja Chrome na linuxa się zmieniła i trzeba inaczej do niej podchodzić, bo już nie używa się apt-get. Ale zaraz - możesz zainstalować, ale nie używaj obrazu node, tylko node xxx. Ale to też nie zadziała. Oficjalny obraz Puppetera nie odpalał czegoś tam, trzeba ten zmodyfikowany, bo ... I tak po wielu, wielu wątkach w necie powiedziałem sobie, że funkcjonalność nie warta zachodu.

Potem spróbowałem z innym serwisem: https://render.com/ tam od razu zadziałało. Jedyny problem z tym, że darmowa wersja udostępnia mierne zasoby serwera, co w tym przypadku średnio się sprawdza.

Tym miłym akcentem kończę. Całą zabawę uważam mimo wszystko za udaną. Taka forma treningu. A użytkownik? Niech sobie klepnie w Print Screen...
