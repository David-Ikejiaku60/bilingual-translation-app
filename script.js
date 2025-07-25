async function translateText() {
  const text = document.getElementById("sourceText").value;
  const targetLang = document.getElementById("targetLang").value;
  const translatedText = document.getElementById("translatedText");

  if (!text) {
    translatedText.innerText = "Please enter text to translate.";
    return;
  }

  translatedText.innerText = "Translating...";

  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLang,
        format: "text"
      }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    translatedText.innerText = data.translatedText;
  } catch (error) {
    translatedText.innerText = "Translation failed. Please try again.";
    console.error(error);
  }
}
