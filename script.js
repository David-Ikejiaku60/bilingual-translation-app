async function translateText() {
  const sourceText = document.getElementById("sourceText").value;
  const sourceLang = document.getElementById("sourceLang").value;
  const targetLang = document.getElementById("targetLang").value;
  const translatedText = document.getElementById("translatedText");

  if (!sourceText.trim()) {
    translatedText.innerText = "Please enter text to translate.";
    return;
  }

  translatedText.innerText = "Translating...";

  try {
    const encodedText = encodeURIComponent(sourceText);
    const langPair = `${sourceLang}|${targetLang}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${langPair}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data?.responseData?.translatedText) {
      translatedText.innerText = data.responseData.translatedText;
    } else {
      translatedText.innerText = "Translation failed. Please try again.";
      console.error("Unexpected response format:", data);
    }
  } catch (error) {
    translatedText.innerText = "Translation failed. Please try again.";
    console.error("Fetch error:", error);
  }
}

function updateFlag(selectId, flagId) {
  const select = document.getElementById(selectId);
  const selectedOption = select.options[select.selectedIndex];
  const flagCode = selectedOption.getAttribute('data-flag');
  document.getElementById(flagId).src = `https://flagcdn.com/24x18/${flagCode}.png`;
}
