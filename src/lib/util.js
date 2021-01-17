export function openOrFocusOptionPage() {
  const optionsUrl = chrome.extension.getURL('option.html')
  chrome.tabs.query({}, (tabs) => {
    let found = false
    for (let i = 0; i < tabs.length; i += 1) {
      const { url } = tabs[i]
      if (url && url.match(optionsUrl)) {
        found = true
        chrome.tabs.update(tabs[i].id, { selected: true })
      }
    }
    if (!found) {
      chrome.tabs.create({ url: optionsUrl })
    }
  })
}

export function getExtensionVersion() {
  const manifest = chrome.runtime.getManifest()
  return manifest.version
}
