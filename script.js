async function translateText() {
  const sourceText = document.getElementById("sourceText").value.trim();
  const sourceLang = document.getElementById("sourceLang").value;
  const targetLang = document.getElementById("targetLang").value;
  const translatedDiv = document.getElementById("translatedText");
  const button = document.querySelector("button");

  // Clear previous result
  translatedDiv.innerText = "";
  
  if (!sourceText) {
    translatedDiv.innerText = "Please enter some text to translate.";
    return;
  }

  if (sourceLang === targetLang) {
    translatedDiv.innerText = "Please select different source and target languages.";
    return;
  }

  // Indicate loading
  button.disabled = true;
  button.innerText = "Translating...";

  try {
    // Primary: LibreTranslate API
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: sourceText,
        source: sourceLang,
        target: targetLang,
        format: "text"
      })
    });

    if (!response.ok) throw new Error("LibreTranslate failed");

    const data = await response.json();
    translatedDiv.innerText = data.translatedText || "No translation found.";
  } catch (err) {
    console.warn("LibreTranslate failed. Falling back to MyMemory...");

    try {
      // Fallback: MyMemory API
      const fallbackResponse = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(sourceText)}&langpair=${sourceLang}|${targetLang}`);
      const fallbackData = await fallbackResponse.json();

      const translated = fallbackData?.responseData?.translatedText;
      translatedDiv.innerText = translated || "Fallback failed.";
    } catch (fallbackErr) {
      translatedDiv.innerText = "Translation failed. Please check your network.";
    }
  } finally {
    button.disabled = false;
    button.innerText = "Translate";
  }
}
