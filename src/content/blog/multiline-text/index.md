---
title: 'Tekst wieloliniowy'
pubDate: 2021-05-03
tags: ["css" , "js"]
---
W ostatnim czasie dostałem ciekawy projekt do pocięcia.
Pojawił się w nim dość często spotykany motyw z tekstem, który jest pisany w kilku liniach, gdzie każda z nich ma osobne tło.

<!--more-->


Na rozwiązanie takiego wyzwania wymyśliłem kilka sposobów - żaden idealny, ot po prostu inne.
Kilka z nich przedstawionych zostało na stronie https://css-tricks.com/multi-line-padded-text/. Większość opiera się o podobną technikę polegającą na wrzuceniu tekstu w dodatkowy element inline, który następnie stylujemy.

<pre  class="line-numbers"><code class="language-html">
&lt;h2 class="title">
    &lt;span>Lorem ipsum dolor sit.&lt;/span>
&lt;/h2>
</code></pre>

<pre  class="line-numbers"><code class="language-css">
.title {
    font-size: 20px;
    line-height: 35px;
    color: #fff;
    font-family: sans-serif;
}

.title span {
    display: inline;
    background: #000;
    line-height: inherit;
    font-size: inherit;
    padding: 5px;
    box-shadow: 0.5em 0 0 #000, -0.5em 0 0 #000;
    box-decoration-break: clone;
}
</code></pre>

Niestety nie jest to idealne rozwiązanie. Display inline nie pozwala nam w łatwy sposób dodawać odstępów między liniami. Idealnie było by, gdyby taki odstęp można było wyliczyć za pomocą jakiegoś wzoru typu `calc(1.5em + 2px)`. Ale niestety nie można, bo w sumie nie do końca wiadomo ile line-height wynosi (<a href="https://tonsky.me/blog/font-size/">1</a>). Pozostaje więc ustawianie na oko - co nie zawsze jest najwygodniejsze - zwłaszcza gdy musisz kilka razy zmieniać wielkość tekstu, bo tego wymaga layout. W poniższym demo zobaczysz, że CSS Lock też nie rozwiązuje sytuacji.

Inny pomysł, na który wpadłem to wrzucenie każdego słowa w osobny span (za pomocą JS), a następnie za pomocą flexa wyrównywanie ich do lewej strony.

Wyświetlanie inline-block daje możliwość odsunięcia linii za pomocą marginesu (albo gap dla flexa). Z minusów mamy tutaj mniejszą kontrole nad lewą i prawą krawędzią linii, ponieważ do końca nie wiadomo który span jest pierwszym i ostatnim w linii.

<a href="https://codepen.io/kartofelek007/pen/NWpKdWj">https://codepen.io/kartofelek007/pen/NWpKdWj</a>

Trzeci pomysł to podział tekstu na oddzielne linie, które obejmuje dodatkowymi elementami.
Jego realizację możesz zobaczyć pod adresem: https://github.com/kartofelek007/multiline-text