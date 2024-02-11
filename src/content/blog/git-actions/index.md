---
title: 'Git Actions'
pubDate: 2023-06-28
tags: ["actions", "git"]
---

Przerzuciłem sobie bloga na <a href="https://astro.build/">Astro.js</a>, bo w porównaniu z Hugo wydaje się łatwiejszy.
A przy tak nędznie prostym blogu jak mój cokolwiek bym nie użył (nawet czysty HTML) to i tak by się sprawdziło.
Jedyna upierdliwa rzecz (ale to samo działo się przy Hugo) to konieczność budowania całości i wrzucania wygenerowanych stron na serwer.
Bloga trzymam na GitHub. Aby usprawnić sobie cały proces, skorzystałem z Git Actions.
Ekspertem od tego nie jestem. Z tego co zauważyłem, buduje się je z gotowych klocków, czy raczej modułów.

Wpierw wszedłem na https://github.com/USERNAME/blog/actions/new

Następnie kliknąłem na górze strony w "set up a workflow yourself" (tuż pod tytułem). Następnie korzystając z przykłądów w necie, nastu commitach z poprawkami doszedłem do czegoś takiego:

<pre class="line-numbers"><code class="language-js">
on: push
name: Deploy website on push
jobs:
  web-deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
    - name: Get latest code
      uses: actions/checkout@v3

    - name: Setup Node
      uses: actions/setup-node@v3

    - name: Install packages
      shell: "bash"
      run: |
        npm install

    - name: Run build
      shell: "bash"
      run: |
        npm run build

    - name: Sync files to ftp serwer
      uses: SamKirkland/FTP-Deploy-Action@v4.3.4
      with:
        server: ${{ secrets.FTP_URL }}
        username: ${{ secrets.FTP_USER }}
        port: 21
        password: ${{ secrets.FTP_PASSWORD }}
        protocol: ftps
        local-dir: dist/
        server-dir: public_html/blog/
</code></pre>

Na początku pobieram najnowszą wersję kodu. Potem instaluję wszystkie paczki, odpalam polecenie `npm run build` by zbudować katalog `dist`. Następnie z katalogu dist wrzucam zmienione pliki na mój serwer, gdzie blog mieści się w katalogu `public_html/blog`. Do wrzucenia korzystam z modułu **SamKirkland/FTP-Deploy-Action@v4.3.4**. Mała uwaga - plugin ten wymaga by ścieżki do katalogów kończyć znakiem `/`.
Nazwę serwera, użytkownika i hasło trzymam jako sekrety. Ustawia się je w zakładce Settings->Secrets and variables->Actions (https://github.com/USERNAME/blog/settings/secrets/actions). I w zasadzie tyle. Po zrobieniu commit, akcje automatycznie się odpalają i zmodyfikowane pliki trafiają na serwer.