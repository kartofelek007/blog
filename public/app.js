function prismLanguage() {
    const pre = document.querySelectorAll(`pre[class*=language-]`);
    pre.forEach(el => {
        const reg = /language-(\w+)/gi;
        const lang = reg.exec(el.className);
        if (lang) {
            const div = document.createElement("div");
            div.classList.add("pre-cnt");
            el.before(div);
            div.append(el);
            let text = lang[1];
            if (lang[1] === "js") {
                text = "JavaScript";
            }

            const span = document.createElement("span");
            span.classList.add("pre-language");
            span.innerText = text;
            el.before(span);
        }
    })
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        prismLanguage();
    }, 0);
});