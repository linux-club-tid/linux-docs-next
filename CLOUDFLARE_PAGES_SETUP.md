# Cloudflare Pages デプロイ設定

## ⚠️ 重要：ビルドコマンドを確認してください

Cloudflare Dashboard → Pages → プロジェクト → **Settings** → **Builds & deployments**

### Build command が以下のいずれかになっていませんか？
- ❌ `npx next build` ← これはダメ！
- ❌ `next build` ← これもダメ！

### 正しい設定

| 項目 | 値 |
|------|-----|
| **Framework preset** | `Next.js (Static HTML Export)` または `None` |
| **Build command** | `npm run build` ← **必ずこれ！** |
| **Build output directory** | `out` |
| **Root directory** | (empty) |

### 環境変数

Production と Preview の両方に設定：

| 変数名 | 値 |
|--------|-----|
| `NODE_VERSION` | `20` |

## ⚙️ なぜ `npm run build` が必要か

`npm run build` を使うと：
1. **`prebuild`スクリプト**が自動実行される → 記事をJSONにバンドル
2. その後 `next build` が実行される

`npx next build` や `next build` を直接実行すると、`prebuild`がスキップされ、`articlesContent.json`が生成されないためビルドが失敗します。

## 📝 設定変更手順

1. Cloudflare Dashboard → Pages → プロジェクト
2. **Settings** タブをクリック
3. **Builds & deployments** セクションへ
4. **Edit configuration** または **Configure Production/Preview deployments** をクリック
5. **Build command** を **`npm run build`** に変更（`npx`や`next`を削除）
6. **Framework preset** を `None` に変更（プリセットが勝手にコマンドを上書きすることがあるため）
7. **Save** をクリック
8. 再度デプロイ（**Deployments** タブ → **Retry deployment**）

## デプロイ方法

設定変更後：

```bash
git add .
git commit -m "your message"
git push origin main  # または develop
```

プッシュすると自動的にビルド＆デプロイされます。

## ローカルでビルドテスト

```bash
npm run build
npx serve out
```

## 仕組み

1. `npm run build` が実行される
2. → `prebuild`スクリプトで全記事をJSONにバンドル（`lib/articlesContent.json`を生成）
3. → `next build`で静的HTMLを生成（`out/`ディレクトリ）
4. Cloudflare Pagesが`out/`をホスティング
