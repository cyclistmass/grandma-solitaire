// Runs before the game. The game needs a browser from late 2023 or newer (WebAssembly with garbage collection:
// Chrome or Edge 119, Firefox 120, Safari 18.2). An older one would stop on "Loading the cards..." for ever, so
// instead say so in plain words, in her language, and how to get past it.
(function () {
  var words = {
    en: ["This browser is too old to show the cards.",
         "Please update it, then open this page again. On an Android phone: open the Play Store, look for Chrome, and tap Update."],
    it: ["Questo browser è troppo vecchio per mostrare le carte.",
         "Aggiornalo, poi apri di nuovo questa pagina. Su un telefono Android: apri il Play Store, cerca Chrome e tocca Aggiorna."],
    fr: ["Ce navigateur est trop ancien pour afficher les cartes.",
         "Mettez-le à jour, puis rouvrez cette page. Sur un téléphone Android : ouvrez le Play Store, cherchez Chrome et touchez Mettre à jour."],
    de: ["Dieser Browser ist zu alt, um die Karten zu zeigen.",
         "Bitte aktualisieren Sie ihn und öffnen Sie diese Seite dann noch einmal. Auf einem Android-Handy: Play Store öffnen, Chrome suchen und auf Aktualisieren tippen."],
    pt: ["Este navegador é antigo demais para mostrar as cartas.",
         "Atualize-o e abra esta página de novo. Num celular Android: abra a Play Store, procure o Chrome e toque em Atualizar."]
  };

  function say() {
    var lang = ((navigator.language || "en").slice(0, 2)).toLowerCase();
    var w = words[lang] || words.en;
    var box = document.getElementById("loading");
    if (!box) return;
    box.textContent = "";
    box.className = "too-old";
    var p1 = document.createElement("p"); p1.textContent = w[0];
    var p2 = document.createElement("p"); p2.textContent = w[1];
    box.appendChild(p1); box.appendChild(p2);
  }

  // The smallest module with a garbage-collected type in it: (module (type (struct))).
  var gc = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 3, 1, 95, 0]);
  var ok = false;
  try { ok = typeof WebAssembly === "object" && WebAssembly.validate(gc); } catch (e) { ok = false; }
  window.grandmaTooOld = !ok;
  if (!ok) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", say); else say();
  }
})();
