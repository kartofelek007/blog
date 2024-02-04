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
Ja najczęściej do takich przypadków korzystam ze strony http://bootstrap-icons.click/, którą kiedyś sobie zrobiłem. Ale nie trzeba z niej korzystać. Ja dodatkowo często korzystam ze stron: https://heroicons.com/ https://iconoir.com/ https://tabler-icons.io/ https://icones.js.org/.

Gdy skopiowana ikona jest porządnie stworzona, wtedy najczęściej posiada właściwość `fill="currentColor"`. Oznacza on, że kolor ikony będzie taki sam jak właściwość `color` danego elementu:

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
Czasami będziemy chcieli ikonę jako tło. W takim przypadku musimy zakodować kod ikony svg na odpowiedni format, który możemy użyć w CSS. I tutaj przydaje się użycie <a href="http://bootstrap-icons.click/">mojej strony</a>, ponieważ każda ikona ma opcję "CSS", która właśnie do tego służy. Jeżeli znajdziesz swoją ikonę na innej strony, jej kod wystarczy skonwertować za pomocą strony https://yoksel.github.io/url-encoder/. W tej technice `currentColor` nie zadziała. Zamiast tego wstawię tam odpowiedni kolor:

<pre class="line-numbers"><code class="language-html">
&lt;span class="icon">&lt;/span>
</code></pre>

## Użycie maski
Kolejna odmiana powyższej techniki to nie kolorowanie samej ikony, co użycie jej jako maski dla elementu, któremu ustawiamy tło. Dzięki temu w bardzo prosty sposób możemy zmieniać kolor takiej ikony:

<pre class="line-numbers"><code class="language-html">
&lt;button class="button">
    &lt;div class="icon-add"></div>
    Dodaj
&lt;/button>
</code></pre>

<pre class="line-numbers"><code class="language-scss">
%icon {
    display: inline-flex;
    width: 60px;
    height: 60px;
    -webkit-mask: $image;
    -webkit-mask-position: center;
    -webkit-mask-size: 20px;
    -webkit-mask-repeat: no-repeat;
    mask: $image;
    mask-position: center;
    mask-size: 20px;
    mask-repeat: no-repeat;
    background-color: currentColor;
}

.icon-add {
    @extend %icon;

    $image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='black' class='bi bi-chat-square-text-fill' viewBox='0 0 16 16'%3E  %3Cpath d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z'%3E%3C/path%3E%3C/svg%3E");
    -webkit-mask-image: $image;
    mask-image: $image;
}

.icon-ring {
    @extend %icon;

    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'%3E%3C/path%3E%3Cpath d='M17.451 2.344a1 1 0 0 1 1.41 -.099a12.05 12.05 0 0 1 3.048 4.064a1 1 0 1 1 -1.818 .836a10.05 10.05 0 0 0 -2.54 -3.39a1 1 0 0 1 -.1 -1.41z' stroke-width='0' fill='currentColor'%3E%3C/path%3E%3Cpath d='M5.136 2.245a1 1 0 0 1 1.312 1.51a10.05 10.05 0 0 0 -2.54 3.39a1 1 0 1 1 -1.817 -.835a12.05 12.05 0 0 1 3.045 -4.065z' stroke-width='0' fill='currentColor'%3E%3C/path%3E%3Cpath d='M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z' stroke-width='0' fill='currentColor'%3E%3C/path%3E%3Cpath d='M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z' stroke-width='0' fill='currentColor'%3E%3C/path%3E%3C/svg%3E");
    -webkit-mask-image: $image;
    mask-image: $image;
}

.button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    border: 0;
    cursor: pointer;
    color: #fff;
    background: #000;
    border-radius: 6px;
    height: 40px;
    min-width: 50px;
    padding: 0 10px;
}

.button:hover {
    color: gold;
}
</code></pre>

<style>
.icon-add {
    display: inline-flex;
    width: 30px;
    height: 30px;
    mask-position: center;
    mask-size: 20px;
    mask-repeat: no-repeat;
    background-color: currentColor;

    -webkit-mask-position: center;
    -webkit-mask-size: 20px;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='black' class='bi bi-chat-square-text-fill' viewBox='0 0 16 16'%3E  %3Cpath d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z'%3E%3C/path%3E%3C/svg%3E");;

    mask-position: center;
    mask-size: 20px;
    mask-repeat: no-repeat;
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='black' class='bi bi-chat-square-text-fill' viewBox='0 0 16 16'%3E  %3Cpath d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z'%3E%3C/path%3E%3C/svg%3E");;
}

.icon-ring {
    display: inline-flex;
    width: 30px;
    height: 30px;
    mask-position: center;
    mask-size: 20px;
    mask-repeat: no-repeat;
    background-color: currentColor;

    -webkit-mask-position: center;
    -webkit-mask-size: 20px;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'%3E%3C/path%3E%3Cpath d='M17.451 2.344a1 1 0 0 1 1.41 -.099a12.05 12.05 0 0 1 3.048 4.064a1 1 0 1 1 -1.818 .836a10.05 10.05 0 0 0 -2.54 -3.39a1 1 0 0 1 -.1 -1.41z' stroke-width='0' fill='currentColor'%3E%3C/path%3E%3Cpath d='M5.136 2.245a1 1 0 0 1 1.312 1.51a10.05 10.05 0 0 0 -2.54 3.39a1 1 0 1 1 -1.817 -.835a12.05 12.05 0 0 1 3.045 -4.065z' stroke-width='0' fill='currentColor'%3E%3C/path%3E%3Cpath d='M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z' stroke-width='0' fill='currentColor'%3E%3C/path%3E%3Cpath d='M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z' stroke-width='0' fill='currentColor'%3E%3C/path%3E%3C/svg%3E");

    mask-position: center;
    mask-size: 20px;
    mask-repeat: no-repeat;
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'%3E%3C/path%3E%3Cpath d='M17.451 2.344a1 1 0 0 1 1.41 -.099a12.05 12.05 0 0 1 3.048 4.064a1 1 0 1 1 -1.818 .836a10.05 10.05 0 0 0 -2.54 -3.39a1 1 0 0 1 -.1 -1.41z' stroke-width='0' fill='currentColor'%3E%3C/path%3E%3Cpath d='M5.136 2.245a1 1 0 0 1 1.312 1.51a10.05 10.05 0 0 0 -2.54 3.39a1 1 0 1 1 -1.817 -.835a12.05 12.05 0 0 1 3.045 -4.065z' stroke-width='0' fill='currentColor'%3E%3C/path%3E%3Cpath d='M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z' stroke-width='0' fill='currentColor'%3E%3C/path%3E%3Cpath d='M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z' stroke-width='0' fill='currentColor'%3E%3C/path%3E%3C/svg%3E");
}

.button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    border: 0;
    cursor: pointer;
    color: #fff;
    background: #000;
    border-radius: 6px;
    height: 40px;
    min-width: 50px;
    padding: 0 10px;
}

.button:hover {
    color: gold;
}
</style>

<div class="img-test">
    <button class="button">
        <div class="icon-add"></div>
        Dodaj
    </button>
    <button class="button">
        <div class="icon-ring"></div>
        Ding dong
    </button>
</div>

## Użycie filtrów
Jeżeli ikonka wrzucona jest do html jako element `img`, wtedy możemy posłużyć się filtrami:

<pre class="line-numbers"><code class="language-html">
&lt;img src="ikona.svg" class="icon">
</code></pre>

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
.icon-filter {
    width: 50px;
    height: 50px;
    background: center / cover no-repeat;
    text-indent: -999px;
    overflow: hidden;
}
.icon-filter--a { background-image: url(./clipboard2-heart-fill.svg); }
.icon-filter--b { background-image: url(./icon-link.svg); }
.icon-filter:hover {
    filter: invert(42%) sepia(93%) saturate(1400%) hue-rotate(316deg) brightness(90%) contrast(120%);
}
</style>

<div class="img-test">
    <span class="icon-filter icon-filter--a">
        Ikonka
    </span>
    <span class="icon-filter icon-filter--b">
        Ikonka
    </span>
</div>

Bardzo niezręczna technika, ale czasami trzeba po nią sięgnąć. Dobór koloru najlepiej wykonać za pomocą debuggera.

## Użycie mix-blend-mode
Kolejna technika polega na użyciu dodatkowej warstwy z `mix-blend-mode`. W poniższym przykładzie użyłem elementu `::before`:

<pre class="line-numbers"><code class="language-html">
&lt;span class="icon">&lt;/span>
</code></pre>

<pre><code class="language-js">
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
.icon-blend {
    width: 50px;
    height: 50px;
    background: center / contain no-repeat;
    text-indent: -9999px;
    display: inline-block;
    position: relative;
}
.icon-blend--a { background-image: url(./icon-link.svg); border-radius: 50%; overflow: hidden;}
.icon-blend--b { background-image: url(./clipboard2-heart-fill.svg); }
.icon-blend:hover::before {
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
    <span class="icon-blend icon-blend--a">
        Ikonka
    </span>
    <span class="icon-blend icon-blend--b">
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
    background: url(./card.png) center / contain no-repeat;
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
    -webkit-mask: url(./card.png) center / contain no-repeat;
    mask: url(./card.png) center / contain no-repeat;
}
</style>

<div class="img-test">
    <div class="card"></div>
</div>

<style>
.icon-blend-mask {
    width: 50px;
    height: 50px;
    background: center / contain no-repeat;
    text-indent: -9999px;
    display: inline-block;
    position: relative;
    background-image: url(./clipboard2-heart-fill.svg);
}
.icon-blend-mask:hover::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    mix-blend-mode: plus-lighter;
    background: red;
    -webkit-mask: url(./clipboard2-heart-fill.svg) center / contain no-repeat;
    mask: url(./clipboard2-heart-fill.svg) center / contain no-repeat;
}
</style>

<div class="img-test">
    <span class="icon-blend-mask">
        Ikonka
    </span>
</div>

Technika o tyle fajna, bo wystarczy takie `::before` złapać w edytorze i za pomocą strzałek dobrać sobie odpowiednie `mix-blend-mode` i ewentualnie zmienić kolor takiej warstwy.

## Ostatnia technika
Co mi przychodzi jeszcze do głowy? Gdy powyższe techniki zawiodą można by się pokusić o przetwarzanie kodu svg przez serwer. Takie zabawy robiłem w tym repozytorium: https://github.com/kartofelek007/svg-colors. Nigdy tego realnie nie zastosowałem, ale działać działa.
