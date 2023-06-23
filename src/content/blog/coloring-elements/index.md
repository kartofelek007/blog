---
title: 'Kolorowanie elementów'
pubDate: 2023-06-23
tags: ["css", "color"]
---

<style>
    .img-test {
        background-image: repeating-linear-gradient(90deg, hsla(196,0%,79%,0.06) 0px, hsla(196,0%,79%,0.06) 1px,transparent 1px, transparent 96px),repeating-linear-gradient(0deg, hsla(196,0%,79%,0.06) 0px, hsla(196,0%,79%,0.06) 1px,transparent 1px, transparent 96px),repeating-linear-gradient(0deg, hsla(196,0%,79%,0.09) 0px, hsla(196,0%,79%,0.09) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(90deg, hsla(196,0%,79%,0.09) 0px, hsla(196,0%,79%,0.09) 1px,transparent 1px, transparent 12px),linear-gradient(90deg, rgb(50,116,143),rgb(50,116,143));
        min-height: 150px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin: 10px 0;
        padding: 10px 0;
    }
</style>

Kilka technik kolorowania elementów na stronie.

## Właściwość fill
Powiedzmy, że mamy img z ikonką. Najlepiej taką ikonkę wrzucić bezpośrednio w HTML jako kod svg. Wtedy wystarczy zmienić właściwość `fill`.
Tak by było w normalnych warunkach.
Ja najczęściej do takich przypadków korzystam ze strony http://bootstrap-icons.click/, którą kiedyś sobie zrobiłem.

Jeżeli klikniemy na niej w jakąś ikonę, skopiujemy jej kod do schowka. Będzie on miał właściwość `fill="currentColor"`, co oznacza, że wystarczy ustawić color dla jej rodzica:

<pre ><code class="language-css">
.icon-inline {
    color: red;
}
.icon-inline svg {
    width: 60px;
    height: 60px;
}
</code></pre>

<pre ><code class="language-html">
&lt;div class="icon-inline">
    &lt;svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-text-fill" viewBox="0 0 16 16">
        &lt;path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z">&lt;/path>
    &lt;/svg>
&lt;/div>
</code></pre>

<style>
.icon-inline {
    color: red;
}

.icon-inline svg {
    width: 60px;
    height: 60px;
}
</style>

<div class="icon-inline">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-text-fill" viewBox="0 0 16 16">
        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"></path>
    </svg>
</div>

## Zmiana koloru ikony jako tła
Czasami będziemy mieli ikonę jako tło. W takim przypadku także użyję powyższej strony, tym razem kopiując ją jako zakodowany kod tła CSS. W pracy używam SCSS, dlatego wstawiam nowy kod ikony w poniższy sposób:

<pre ><code class="language-scss">
$colorMain : red;
$colorMainHover: blue;
$colorMainSvg : red;
$colorMainSvgHover: blue;

//jeżeli hexowy color
$colorMain : #ff0000;
$colorMainHover : #0000ff;
$colorMainSvg : %23ff0000;
$colorMainSvgHover : %230000ff;

.icon {
    width: 60px;
    height: 60px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#{$colorMainSvg}' class='bi bi-chat-square-text-fill' viewBox='0 0 16 16'%3E  %3Cpath d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z'%3E%3C/path%3E%3C/svg%3E");
}
.icon:hover {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#{$colorMainSvgHover}' class='bi bi-chat-square-text-fill' viewBox='0 0 16 16'%3E  %3Cpath d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z'%3E%3C/path%3E%3C/svg%3E");
}
</code></pre>

## Użycie filtrów
Jeżeli ikonka wrzucona jest do html jako element `img` albo img w tle css(najgorzej), możemy posłużyć się filtrami:

<pre><code class="language-js">
.icon {
    width: 50px;
    height: 50px;
    background: url(...) center / cover no-repeat;
    text-indent: -999px;
    overflow: hidden;
}
.icon:hover {
    filter: invert(42%) sepia(93%) saturate(1400%) hue-rotate(316deg) brightness(90%) contrast(120%);
}
</code></pre>


<style>
.icon {
    width: 50px;
    height: 50px;
    background: center / cover no-repeat;
    text-indent: -999px;
    overflow: hidden;
}
.icon--a { background-image: url(clipboard2-heart-fill.svg); }
.icon--b { background-image: url(icon-link.svg); }
.icon:hover {
    filter: invert(42%) sepia(93%) saturate(1400%) hue-rotate(316deg) brightness(90%) contrast(120%);
}
</style>

<div class="img-test">
    <span class="icon icon--a">
        Ikonka
    </span>
    <span class="icon icon--b">
        Ikonka
    </span>
</div>

Jak widzisz technika ta nie sprawdzi się gdy ikona jest "całością".

## Użycie mix-blend-mode
Kolejna technika polega na użyciu dodatkowej warstwy z `mix-blend-mode`. W poniższym przykładzie użyłem elementu `::before`:

<pre ><code class="language-js">
.icon {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background: url(icon-link.svg) center / contain no-repeat;
    text-indent: -9999px;
    overflow: hidden;
    display: inline-block;
    position: relative;
}

.icon:hover::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    mix-blend-mode: plus-lighter;
    background: red;
}
</code></pre>

<style>
.icon2 {
    width: 50px;
    height: 50px;
    background: center / contain no-repeat;
    text-indent: -9999px;
    display: inline-block;
    position: relative;
}
.icon2--a { background-image: url(icon-link.svg); border-radius: 50%; overflow: hidden;}
.icon2--b { background-image: url(clipboard2-heart-fill.svg); }
.icon2:hover::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    mix-blend-mode: plus-lighter;
    background: red;
}
</style>

<div class="img-test">
    <span class="icon2 icon2--a">
        Ikonka
    </span>
    <span class="icon2 icon2--b">
        Ikonka
    </span>
</div>

W powyższym przykładzie pierwsza ikona ikona jest okrągła, więc kolorującą warstwę łatwo można było przyciąć za pomocą `border-radius` i `overflow:hidden`.

Przy bardziej nieregularnych kształtach warstwę kolorującą można przyciąć za pomocą maski:

<pre data-line="19-20"><code class="language-js">
.card {
    width: 600px;
    height: 530px;
    background: url(card.png) center / contain no-repeat;
    text-indent: -9999px;
    overflow: hidden;
    display: inline-block;
    position: relative;
}

.card:hover::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    mix-blend-mode: hue;
    background: red;
    -webkit-mask: url(card.png) center / contain no-repeat;
    mask: url(card.png) center / contain no-repeat;
}
</code></pre>

<style>
.card {
    width: 600px;
    height: 530px;
    background: url(card.png) center / contain no-repeat;
    text-indent: -9999px;
    overflow: hidden;
    display: inline-block;
    position: relative;
}
.card:hover::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    mix-blend-mode: hue;
    background: red;
    -webkit-mask: url(card.png) center / contain no-repeat;
    mask: url(card.png) center / contain no-repeat;
}
</style>

<div class="img-test">
    <div class="card"></div>
</div>

<style>
.icon3 {
    width: 50px;
    height: 50px;
    background: center / contain no-repeat;
    text-indent: -9999px;
    display: inline-block;
    position: relative;
    background-image: url(clipboard2-heart-fill.svg);
}
.icon3:hover::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    mix-blend-mode: plus-lighter;
    background: red;
    -webkit-mask: url(clipboard2-heart-fill.svg) center / contain no-repeat;
    mask: url(clipboard2-heart-fill.svg) center / contain no-repeat;
}
</style>

<div class="img-test">
    <span class="icon3 ">
        Ikonka
    </span>
</div>

Technika o tyle fajna, bo wystarczy takie `::before` złapać w edytorze i za pomocą strzałek dobrać sobie odpowiednie `mix-blend-mode` i ewentualnie zmienić kolor takiej warstwy.

## Ostatnia technika
Co mi przychodzi jeszcze do głowy? Gdy powyższe techniki zawiodą można by się pokusić o przetwarzanie kodu svg przez serwer. Takie zabawy robiłem w tym repozytorium: https://github.com/kartofelek007/svg-colors. Nigdy tego realnie nie zastosowałem, ale działać działa.
