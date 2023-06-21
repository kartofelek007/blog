---
title: 'Tworzenie layoutu 2'
pubDate: 2019-08-10
tags: ["layout", "css", "gulp", "google", "mapa", "map", "js"]
---

Wracamy do cięcia layoutu. Tym razem będzie o wiele prościej.

<!--more-->

Kolejne sekcje zaczynają się od tytułu, który jest identyczny dla wszystkich sekcji.
Dla każdej sekcji poza klasą dodam id, dzięki czemu w przyszłości będę mógł do niej linkować.

<pre data-line="3-8"><code class="language-html">
&lt;section class="section section-love-music" id="love-music">
    &lt;div class="container">
        &lt;h2 class="section-title">
            &lt;span>
                stay tuned
            &lt;/span>
            Contact With Us
        &lt;/h2>

        &lt;!-- tutaj artykuły ze zdjęciami -->
    &lt;/div>
&lt;/section>
</code></pre>

Od razu też stwórzmy stylowanie dla sekcji i nagłówka <strong>.section-header</strong>. Ja wrzucę to do klas ogólnych, ale może lepiej stworzyć plik <strong>_section.scss</strong>?

<pre><code class="language-scss">
//src/scss/components/_class.scss

.section {
    padding: 6.250em 0;
}

.section-title {
	margin-top:1rem;
	margin-bottom:8rem;
	text-align: center;
	font-size:4rem;
	text-transform: uppercase;
	position: relative;
	padding-bottom:2rem;
}
.section-title span {
	text-align: center;
	font-size:2rem;
	text-transform: lowercase;
	display: block;
	font-weight: normal;
}
.section-title:after {
	content:'';
	position: absolute;
	left:50%;
	bottom:0;
	transform:translateX(-50%);
	width:12rem;
	height:2px;
	background: $color-main;
}
</code></pre>

W powyższym kodzie HTML dodaliśmy <strong>.container</strong>, który centruje nam treść w poziomie. Pozostaje wrzucić do niego trzy artykuły.

<pre data-line="12-22"><code class="language-html">
&lt;section class="section section-love-music" id="love-music">
    &lt;div class="container">
        &lt;header class="section-header">
            &lt;h2 class="section-header-title">
                &lt;span>
                    learn how to
                &lt;/span>
                Love the music
            &lt;/h2>
        &lt;/header>

        &lt;div class="row">
            &lt;div class="col">
                &lt;article class="box">...&lt;/article>
            &lt;/div>
            &lt;div class="col">
                &lt;article class="box">...&lt;/article>
            &lt;/div>
            &lt;div class="col">
                &lt;article class="box">...&lt;/article>
            &lt;/div>
        &lt;/div>
    &lt;/div>
&lt;/section>
</code></pre>

Artykuły obok siebie możemy ustawić za pomocą grida, albo flexboxa. Nie ma tutaj jednej zasady.

Ja wybiorę flexboxa. Dzięki temu będę mógł zastosować automatyczne szerokości (flex: 1) w zależności od ilości kolumn.

Jeżeli chodzi o odstępy między kolumnami, jakiś czas temu w najnowszych przeglądarkach pojawiała się właściwość `gap: 10px`. Niestety nie zadziała ona w każdej przeglądarce. Zamiast tego możemy zastosować klasyczne podejście z padding.

<pre><code class="language-scss">
//src/scss/components/_class.scss

.row {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
	grid-template-rows: 1fr;
	gap: 1rem;
}

@media only screen and (max-width:860px) {
    .row {
		grid-template-columns: 1fr;
		gap: 5rem;
    }
}
</code></pre>

pojedynczy artykuł będzie miał postać:

<pre><code class="language-html">
&lt;article class="box">
    &lt;a href="" class="box-photo">
        &lt;span class="box-photo-overlay">&lt;/span>
        &lt;img src="images/img1.jpg" class="box-photo-img" alt="...">
    &lt;/a>
    &lt;h3 class="box-title">
        Lorem ipsum sit
    &lt;/h3>
    &lt;div class="box-content">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus recusandae quas similique deserunt
    &lt;/div>
    &lt;a href="" class="btn box-btn">Read more&lt;/a>
&lt;/article>
</code></pre>

oraz stylowanie dla niego w pliku <strong>components/_box.scss</strong>, który importujemy w pliku <strong>style.scss</strong>:

<pre><code class="language-scss">
//src/scss/components/_box.scss

.box {
	max-width: 50rem;
	margin-left: auto;
	margin-right: auto;
}

.box-photo {
	position: relative;
	display: inline-block;
	margin-bottom: 2rem;
}

.box-photo-img {
	overflow: hidden;
	display: block;
	max-width: 100%;
	height: auto;
}

.box-photo:hover .box-photo-overlay {
	opacity: 1;
}

.box-photo-overlay {
	opacity: 0;
	background: rgba(#111, 0.8);
	transition: 0.5s all;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}

.box-photo-overlay:before,
.box-photo-overlay:after {
	content: '';
	width: 6rem;
	height: 1px;
	background: rgba(#fff, 0.8);
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

.box-photo-overlay:after {
	transform: translate(-50%, -50%) rotate(-90deg);
}

.box-title {
	text-transform: uppercase;
	font-size: 1.8rem;
}

.box-content {
	margin-bottom: 4rem;
	color: #AAA;
}

.box-btn {
	text-transform: uppercase;
	font-weight: bold;
	color:#fff;
	background: #333;
	display: inline-block;
	border:0;
	padding:2rem 3.5rem;
	border-radius:4rem;
	min-width:16rem;
	transition:0.5s all;
	cursor: pointer;
	text-decoration: none;
}
.box-btn:hover {
	background: $color-main;
	color:#333;
}
</code></pre>


## Sekcja Our team
Sekcja jest bardzo podobna do tej powyższej, dlatego wygląd html będzie tutaj praktycznie identyczny. Dochodzi jedynie dodatkowa klasa, dzięki której zmienimy nieco wygląd:

<pre data-line="1"><code class="language-html">
&lt;section class="section section-our-team" id="our-team">
    &lt;div class="container">
        &lt;h2 class="section-title">
            &lt;span>
                behind the scenes
            &lt;/span>
            Meet our team
        &lt;/h2>

        &lt;div class="row">
            &lt;div class="col">
                &lt;article class="box">
                    &lt;a href="" class="box-photo">
                        &lt;span class="box-photo-overlay">&lt;/span>
                        &lt;img class="box-photo-img" src="images/photo1.png" alt="">
                    &lt;/a>
                    &lt;h2 class="box-title">
                        Lorem ipsum sit
                    &lt;/h2>
                    &lt;div class="box-content">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus recusandae quas similique deserunt
                    &lt;/div>
                    &lt;a href="" class="btn box-btn">Read more&lt;/a>
                &lt;/article>
            &lt;/div>
            &lt;div class="col">
                &lt;article class="box">
                    ...
                &lt;/article>
            &lt;/div>
            &lt;div class="col">
                &lt;article class="box">
                    ...
                &lt;/article>
            &lt;/div>
            &lt;div class="col">
                &lt;article class="box">
                    ...
                &lt;/article>
            &lt;/div>
        &lt;/div>
    &lt;/div>
&lt;/section>&lt;!-- e: section-our-team -->
</code></pre>

Dodajmy stylowanie w pliku <strong>components/_our-team.scss</strong>:

<pre><code class="language-scss">
//src/scss/components/_main-our-team.scss

.section-our-team {

}

.section-our-team .box {
	padding: 0 2rem;
	text-align: center;
}

.section-our-team .box-photo img {
	border-radius: 50%;
}

.section-our-team .box-photo-overlay {
	border-radius: 50%;
}
</code></pre>


## Sekcja main parallax
Między sekcjami znajduje się dodatkowa sekcja z tłem. Jest nawet prostsza od powyższych.

<pre data-line="5-13"><code class="language-html">
&lt;section class="section section-love-music" id="love-music">
    ...
&lt;section>

&lt;section class="main-parallax">
    &lt;h2 class="main-parallax-title">
        &lt;span>Love the&lt;/span> music 1
    &lt;/h2>
    &lt;div class="main-parallax-text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, aut.
        Lorem ipsum dolor sit amet, consectetur
    &lt;/div>
&lt;/section>&lt;!-- e: main parallax -->

&lt;section class="section section-our-team" id="about-us">
    ...
&lt;section>
</code></pre>

<pre><code class="language-scss">
//src/scss/components/_main-parallax.scss

.main-parallax {
	$c1: rgba(#222, 0.4);

	height: 51rem;
	background-image: linear-gradient($c1, $c1),
		linear-gradient(90deg, rgba(#000, 0.6), rgba(#000, 0.1), rgba(#000, 0.6)),
		url(../images/banner-paralax.jpg);
	background-position: center center;
	background-attachment: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: relative;
}

.main-parallax-title {
	font-size: 6rem;
	text-transform: uppercase;
	color: #FFF;
	font-weight:200;
	margin: 0;
	text-align: center;
}

.main-parallax-title span {
	color: $color-main;
}

.main-parallax-text {
	font-size:1.8rem;
	color: rgba(white, 0.35);
	text-align: center;
	margin-top: 1.5rem;
	max-width: 84rem;
}
</code></pre>


## Sekcja kontakt
<pre><code class="language-html">
&lt;section class="main-contact" id="contact">
    &lt;div class="container">
        &lt;h2 class="section-title">
            &lt;span>
                stay tuned
            &lt;/span>
            Contact With Us
        &lt;/h2>

        &lt;div class="main-contact-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, reiciendis ipsa illo dolorum quae accusantium architecto necessitatibus ad dolorem nam!
        &lt;/div>

        &lt;form action="..." method="POST" id="contactForm" class="form">
            &lt;div class="form-row">
                &lt;label for="formName">Name and surname:&lt;/label>
                &lt;input required type="text" name="name" id="formName" data-error-text="Wpisz poprawnie imię i nazwisko" placeholder="Name and surname">
            &lt;/div>
            &lt;div class="form-row">
                &lt;label for="formEmail">Email:&lt;/label>
                &lt;input required type="email" name="email" id="formEmail" data-error-text="Wpisz poprawny email" placeholder="Email">
            &lt;/div>
            &lt;div class="form-row">
                &lt;label for="formMessage">Message:&lt;/label>
                &lt;textarea required pattern=".+" name="message" data-error-text="Wpisz wiadomość" id="formMessage" placeholder="Message">&lt;/textarea>
            &lt;/div>
            &lt;div class="form-row form-row-last">
                &lt;button type="submit" class="btn btn-form">Wyślij&lt;/button>
            &lt;/div>
        &lt;/form>
    &lt;/div>
&lt;/section>&lt;!-- e: main contact -->
</code></pre>

<pre><code class="language-scss">
//src/scss/_mixins.scss

@mixin visuallyhidden() {
	border: 0;
	clip: rect(0 0 0 0);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
    white-space: nowrap;

	.focusable:active,
	.focusable:focus {
		clip: auto;
		height: auto;
		margin: 0;
		overflow: visible;
		position: static;
		width: auto;
	}
}
</code></pre>

<pre><code class="language-scss">
//components/_main-contact.scss

.main-contact {
    padding: 10rem 0;
}
.main-contact-text {
    margin-bottom: 7rem;
    color:#888;
}
.main-contact label {
    @include visuallyhidden();
}
</code></pre>

<pre><code class="language-scss">
//src/scss/components/_form.scss

.form {
}

.form-row {
	margin-bottom: 2rem;
}

.form input[type="text"],
.form input[type="email"],
.form textarea {
	padding: 2rem;
	border: 1px solid #C4C4C4;
	font-family: $font-main;
	border-radius: 0.7rem;
	width: 100%;
	max-width: 56rem;
	transition: 0.3s all;

	&:focus {
		border-color: #333;
		box-shadow: inset 0 0 0 1px #333;
		outline: none;
	}

	&.field-error {
		border-color: red;
	}
	&.field-error:focus {
		border-color: red;
		box-shadow: inset 0 0 0 1px red;
	}
}

.form textarea {
	max-width: 100%;
	min-height: 15rem;
	resize: vertical;
}

.form .form-error-text {
	margin-top: 0.5rem;
	color: red;
}

.form-row-last {
	display: flex;
	align-items: center;
}

.form-message {
	margin-left: 2rem;
	font-weight: bold;
}
</code></pre>

Jeżeli chodzi o oskryptowanie tego formularza, to całość opisałem <a href="http://kursjs.pl/kurs/formularze/formularz-kontaktowy.php">w tym artykule</a>. Poniżej bezczelnie sobie zapożyczę kod z końcowego dema. Do ostatniej funkcji dodałem tylko export.

<pre data-line="46"><code class="language-js">
//src/js/_form.js

function removeFieldError(field) {
    const errorText = field.nextElementSibling;
    if (errorText !== null) {
        if (errorText.classList.contains("form-error-text")) {
            errorText.remove();
        }
    }
};

function createFieldError(field, text) {
    removeFieldError(field); //przed stworzeniem usuwam by zawsze był najnowszy komunikat

    const div = document.createElement("div");
    div.classList.add("form-error-text");
    div.innerText = text;
    if (field.nextElementSibling === null) {
        field.parentElement.appendChild(div);
    } else {
        if (!field.nextElementSibling.classList.contains("form-error-text")) {
            field.parentElement.insertBefore(div, field.nextElementSibling);
        }
    }
};

function toggleErrorField(field, show) {
    const errorText = field.nextElementSibling;
    if (errorText !== null) {
        if (errorText.classList.contains("form-error-text")) {
            errorText.style.display = show ? "block" : "none";
            errorText.setAttribute('aria-hidden', show);
        }
    }
};

function markFieldAsError(field, show) {
    if (show) {
        field.classList.add("field-error");
    } else {
        field.classList.remove("field-error");
        toggleErrorField(field, false);
    }
};

export default function() {
    const form = document.querySelector("#contactForm");
    const inputs = form.querySelectorAll("[required]");

    //wyłączamy domyślną walidację
    form.setAttribute("novalidate", true);

    for (const el of inputs) {
        el.addEventListener("input", e => markFieldAsError(e.target, !e.target.checkValidity()));
    }

    form.addEventListener("submit", e => {
        e.preventDefault();

        let formErrors = false;

        //2 etap - sprawdzamy poszczególne pola gdy ktoś chce wysłać formularz
        for (const el of inputs) {
            removeFieldError(el);
            el.classList.remove("field-error");

            if (!el.checkValidity()) {
                console.log(el.dataset.errorText);
                createFieldError(el, el.dataset.errorText);
                el.classList.add("field-error");
                formErrors = true;
            }
        }

        if (!formErrors) {
            const submit = form.querySelector("[type=submit]");
            submit.disabled = true;
            submit.classList.add("element-is-busy");

            const formData = new FormData();
            for (const el of inputs) {
                formData.append(el.name, el.value)
            }

            const url = form.getAttribute("action");
            const method = form.getAttribute("method");

            fetch(url, {
                method: method.toUpperCase(),
                body: formData
            })
            .then(res => res.json())
            .then(res => {
                if (res.errors) {
                    const selectors = res.errors.map(el => `[name="${el}"]`);
                    const fieldsWithErrors = form.querySelectorAll(selectors.join(","));
                    for (const el of fieldsWithErrors) {
                        markFieldAsError(el, true);
                        toggleErrorField(el, true);
                    }
                } else {
                    if (res.status === "ok") {
                        const div = document.createElement("div");
                        div.classList.add("form-send-success");
                        div.innerText = "Wysłanie wiadomości się nie powiodło";

                        form.parentElement.insertBefore(div, form);
                        div.innerHTML = `
                            &lt;strong>Wiadomość została wysłana&lt;/strong>
                            &lt;span>Dziękujemy za kontakt. Postaramy się odpowiedzieć jak najszybciej&lt;/span>
                        `;
                        form.remove();
                    }
                    if (res.status === "error") {
                        //jeżeli istnieje komunikat o błędzie wysyłki
                        //np. generowany przy poprzednim wysyłaniu formularza
                        //usuwamy go, by nie duplikować tych komunikatów
                        const statusError = document.querySelector(".form-send-error");
                        if (statusError) {
                            statusError.remove();
                        }

                        const div = document.createElement("div");
                        div.classList.add("form-send-error");
                        div.innerText = "Wysłanie wiadomości się nie powiodło";
                        submit.parentElement.appendChild(div);
                    }
                }
            }).finally(() => {
                submit.disabled = false;
                submit.classList.remove("element-is-busy");
            });
        }
    });
}
</code></pre>

<pre data-line="4, 8"><code class="language-js">
//src/js/_app.js

import { pageHeaderSticky } from "./page-header";
import makeForm from "./_form";

document.addEventListener('DOMContentLoaded', function() {
    pageHeaderSticky();
    makeForm();
});
</code></pre>

W naszym przypadku brakuje w zasadzie tylko odrobinę stylowanie. Po pierwsze klasa `.loading`, którą zaaplikujemy dla przycisku wysyłającego:</p>

<pre><code class="language-scss">
//src/scss/components/_class.scss

.loading {
	position: relative;
}

.loading:before {
	content:'';
	display: block;
	width:3rem;
	height:3rem;
	border:2px solid rgba(#fff, 0.3);
	border-right-color:#fff;
	border-radius: 50%;
	position: absolute;
	left:50%;
	top:50%;
	transform:translate(-50%, -50%) rotate(0deg);
	animation: loadingAnim 0.6s 0s infinite linear;
}

.btn.loading {
	cursor: default;
	padding-left:5rem;
	background: #333;
	color:rgba(#fff, 0.2);
}

.btn.loading:before {
	left:3rem;
}
</code></pre>

<p>Po wysyłce tworzony będzie element `.form-send-success`, lub `.form-send-error`. Je także ostylujmy:</p>

<pre><code class="language-scss">
.form-send-success,
.form-send-error {
	border: 1px solid #ddd;
	padding: 3rem;

	strong {
		font-size: 2rem;
		display: block;
		margin-bottom: 1rem;
		color: $color-main;
	}
	span {
		display: block;
	}
}
</code></pre>

## Mapa
Kolejnym elementem będzie mapa. Dodajmy go na do html, a także dodajmy mu małe tylowanie:

<pre><code class="language-js">
&lt;div class="main-map" id="mainMap">
&lt;/div>
</code></pre>

<pre><code class="language-scss">
//src/scss/component/_map.scss
.main-map {
    height: 31.250rem;
    background: #ddd;
}
</code></pre>

## Google mapa
Pierwszy sposób na dodanie mapy to użycie GoogleMap.
Aby to zrobić po pierwsze musimy wygenerować nasz prywatny klucz. Możemy to zrobić na stronie <a href="https://developers.google.com/maps/documentation">https://developers.google.com/maps/documentation</a> przechodząc do zakładki <a href="https://developers.google.com/maps/documentation/javascript/overview">Maps Javascript Api</a>.

Aby zdobyć klucz musimy podać dane odnośnie naszej karty płatniczej. Jakiś czas temu Google mocno zmieniło podejście do developerów korzystających z ich usług. <a href="https://cloud.google.com/maps-platform/pricing/">Ceny poszły w górę</a>, ale przede wszystkim straciliśmy możliwość anonimowego używania ich produktów - konieczne staje się podpięcie karty. Jeżeli wcześniej robiłeś zakupy na AppStore, to będziesz używał tego samego konta.

Po wygenerowaniu klucza, do HTML dodajemy linijkę ze skryptem:

<pre  class="line-numbers"><code class="language-html">
&lt;script async defer src="https://maps.googleapis.com/maps/api/js?key=TWOJ_KLUCZ&callback=initMap">&lt;/script>
</code></pre>

następnie tworzymy nowy plik `src/js/_map.js`, w którym umieszczamy kod:

<pre><code class="language-js">
function mainMap() {
    const centerPnt = {lat: 52.229675, lng: 21.012230};
    const map = new google.maps.Map(document.getElementById("mainMap"), {
        zoom: 16,
        center: centerPnt,
        streetViewControl: false,
        mapTypeControl: false,
        styles : [...]
    });
    const marker = new google.maps.Marker({
        position: centerPnt,
        map: map,
        icon : 'images/marker.png'
    });
}

export { mainMap }
</code></pre>

W powyższym linku do google map, który wrzuciliśmy do HTML wywoływana jest funkcja `initMap`. Jest to sposób na ominięcie zabezpieczeń <a href="https://kursjs.pl/kurs/ajax/ajax.php#cors">CORS</a>. Żeby mapa zadziałała, musimy naszą powyższą funkcję `mainMap` wystawić poza nasz budowany webpackiem skrypt. Możemy to zrobić ustawiając ją jako właściwość obiektu window:

<pre data-line="7"><code class="language-js">
//src/js/_app.js

import { pageHeaderSticky } from "./page-header";
import makeForm from "./_form";
import mainMap from "./_map";

window.initMap = mainMap;

document.addEventListener('DOMContentLoaded', function() {
    pageHeaderSticky();
    makeForm();
});
</code></pre>

Kolorystykę (wartość właściwości style) dla mapy pobrałem ze strony <a href="https://snazzymaps.com/">https://snazzymaps.com/</a>, natomiast pozycję na którą wskazuje mapa za pomocą strony <a href="https://www.latlong.net/">https://www.latlong.net/</a>.


## Mapa MapBox
Inną możliwością jest użycie map <a href="https://www.mapbox.com/">MapBox</a>. Tutaj karty nie musimy podawać, jedyny wymóg to zarejestrowanie się na ich stronie, a i liczba darmowych odwołań do mapy jest o wiele większa.

Po zalogowaniu musimy stworzyć swój klucz poprzez kliknięcie w przycisk **"+ create a token"**. Po otrzymaniu klucza, możemy stworzyć naszą mapę poprzez kliknięcie **"Or install the Maps SDK: Web"**. W kolejnych krokach wybieram opcje jakie nas interesują.

Ja wybrałem opcję CDN. Wrzuciłem więc do html odpowiednie linijki:

<pre><code class="language-html">
&lt;script src='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js'>&lt;/script>
&lt;link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
</code></pre>

Przechodząc przez kolejne kroki dostaniemy kod, który musimy dodać do naszej strony.
Kod ten będzie załączał mapę z domyślnym wyglądem. Żeby go zmienić musimy wejść w opcję Studio, która znajduje się tuż pod avatarem w prawym górnym rogu strony MapBox.

Możemy generować własny styl, ale też możemy wybrać jeden z dostępnych na liście. Ja wybrałem ten ciemny. Kliknąłem na ikonke z 2 kropkami przy tym stylu, a następnie skopiowałem url do tych styli.

Po tych czynnościach możemy utworzyć plik `src/js/_map.js` w którym dodamy kod:

<pre><code class="language-js">
const position = [20.99995, 52.23277]; //pozycja na mapie
const token = "TWOJ_TOKEN"; //twój własny token
const styleUrl = "mapbox://..."; //adres do twoich styli

function map() {
	mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
        container: 'mainMap',
        style: styleUrl,
        zoom:13.7,
        center: position
    });
}

export { map }
</code></pre>

który następnie zaimportowałem do pliku `src/js/app.js`:

<pre data-line="5,10"><code class="language-js">
//src/js/_app.js

import { pageHeaderSticky } from "./page-header";
import makeForm from "./_form";
import {map} from './js/map';

document.addEventListener('DOMContentLoaded', function() {
    pageHeaderSticky();
    makeForm();
    map();
});
</code></pre>

Jeżeli chcemy dodać nasz własny marker, do funkcji map dodamy:

<pre data-line="14-32"><code class="language-js">
const position = [20.99995, 52.23277];
const token = "TWOJ_TOKEN";
const styleUrl = "mapbox://styles/mapbox/light-v9";

function map() {
	mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
        container: 'mainMap',
        style: styleUrl,
        zoom:13.7,
        center: position
    });

    map.on("load", function () {
      map.loadImage("images/marker.png", function(error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          map.addLayer({
            id: "markers",
            type: "symbol",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features:[{"type":"Feature","geometry":{"type":"Point","coordinates":position}}]}
            },
            layout: {
              "icon-image": "custom-marker",
            }
          });
        });
    });
}

export { map }
</code></pre>

## Footer
Pozostaje stopka.

<pre><code class="language-html">
&lt;footer class="page-footer">
    &lt;div class="container">
        &lt;ul class="page-footer-list">
            &lt;li>&lt;a href="">Home Page&lt;/a>&lt;/li>
            &lt;li>&lt;a href="">About Us&lt;/a>&lt;/li>
            &lt;li>&lt;a href="">Gallery&lt;/a>&lt;/li>
            &lt;li>&lt;a href="">Contact&lt;/a>&lt;/li>
        &lt;/ul>

        &lt;span class="copyright">
            &copy; Copyright 2020
        &lt;/span>
    &lt;/div>
&lt;/footer>
</code></pre>

<pre><code class="language-scss">
//src/scss/_page-footer.scss

.page-footer {
    background: #222;
    padding: 2.5rem 0;
}
.page-footer .container {
    display: flex;
}
.page-footer-list {
    list-style:none;
    padding:0;
    margin:0;
}
.page-footer-list li {
    padding-bottom: 0.8rem;
}
.page-footer-list a {
    color: rgba(#fff, 0.8);
    text-transform: uppercase;
    font-size: 0.813rem;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    transition: 0.4s color;
}
.page-footer-list a:hover {
    color: $color-main;
}
.page-footer .copyright {
    margin-left:auto;
    color:rgba(#fff, 0.7);
}

@media (max-width:550px) {
    .page-footer .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .page-footer-list {
        text-align: center;
    }
    .page-footer .copyright {
        margin-top: 1.875rem;
        margin-left:0;
    }
}
</code></pre>

## Podsumowanie
Tutaj możesz zobaczyć wersję końcową.

<a href="http://domanart.pl/dema/layout-music/part2/index.html" class="demo">DEMO</a>