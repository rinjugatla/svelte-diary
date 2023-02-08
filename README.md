# svelte-diary

## Udemy講座

- UdemyのSvelte講座を参考にSveltekitで日記機能を実装しました。


[【Svelte.js入門】ReactやVueに挫折した人でも大丈夫！Svelteとfirebaseでシンプルアプリ開発](https://www.udemy.com/course/sveltebasic/)

## ライブラリ

- 講座で使用されているUIライブラリ`Smelte`は更新が止まっているので`Flowbite-Svelte`を使用しました。
- [Flowbite-Svelte](https://flowbite-svelte.com/)

## 設定

### .env

公開情報には接頭語として`PUBLIC_`をつける必要があります。

```
PUBLIC_FIREBASE_API_KEY = ""
PUBLIC_FIREBASE_AUTH_DOMAIN = ""
PUBLIC_FIREBASE_PROJECT_ID = ""
PUBLIC_FIREBASE_STORAGE_BUCKET = ""
PUBLIC_FIREBASE_MESSAGING_SENDER_ID = ""
PUBLIC_FIREBASE_APP_ID = ""
```

## 課題

- 主にセキュリティに関して
  - 記事URLを知っていれば誰でも記事を閲覧、編集できる問題
  - author_idを利用して記事製作者のみ閲覧、編集できるようには変更できるがそれでよいのか
  - Cookieの取り扱い