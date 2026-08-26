# Aanbouw Configurator (Vue)

Zelfstandige Vue/Vite-versie van de Aanbouw Nu-configurator. De originele lokale renderlagen, instellingen en prijsberekening zijn opgenomen; het project heeft tijdens gebruik geen verbinding met de bronsite nodig.

```bash
npm install
npm run dev
```

Productiecontrole:

```bash
npm run verify
npm run build
```

## Offerte-integratie

Bij een geldige offerteaanvraag verstuurt de app in de browser het event `aanbouw:quote-request`. Een API-koppeling kan de klant-, configuratie- en prijsgegevens uit `event.detail` doorsturen naar een eigen CRM of backend:

```js
window.addEventListener('aanbouw:quote-request', (event) => {
  console.log(event.detail)
})
```

## GitHub Pages

Проект настроен для публикации по адресу:

```text
https://USERNAME.github.io/configurator-nid/
```

После загрузки репозитория откройте `Settings → Pages` и выберите `GitHub Actions` в качестве источника публикации. Каждый push в ветку `main` автоматически запускает проверку, сборку и публикацию.

Если репозиторий называется не `configurator-nid`, измените значение `base` в `vite.config.js`.
