# Mini Fox Labs — GitHub Pages website

Готовый статический сайт для Mini Fox Labs.

## Что внутри

- светлая тема по умолчанию;
- переключатель Light / Dark;
- адаптивная мобильная версия;
- блок «О нас»;
- каталог приложений;
- Privacy Policy;
- Terms of Use;
- 404 page;
- без внешних библиотек и без аналитики.

## Как опубликовать на GitHub Pages

1. Создайте новый репозиторий, например `mini-fox-labs-site`.
2. Загрузите в корень репозитория все файлы из этой папки.
3. GitHub → репозиторий → **Settings** → **Pages**.
4. В разделе **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
5. Нажмите Save.

Через короткое время сайт появится по адресу вида:

`https://USERNAME.github.io/mini-fox-labs-site/`

## Подключение minifoxlabs.com позже

После покупки домена:

1. GitHub → Settings → Pages → Custom domain.
2. Введите `minifoxlabs.com`.
3. У регистратора настройте DNS на GitHub Pages.
4. После проверки включите **Enforce HTTPS**.

После покупки домена можно также создать в корне файл `CNAME` с одной строкой:

`minifoxlabs.com`

## Перед публичным релизом

- замените заглушки Google Play на реальные ссылки;
- добавьте рабочий e-mail;
- проверьте и дополните Privacy Policy для каждого приложения;
- при необходимости добавьте Google Play developer page;
- обновите Terms, если появятся платежи, аккаунты или подписки.
