# Cloudflare Pages デプロイ設定

## ビルド設定（Dashboard）

Cloudflare Dashboard → Pages → プロジェクト → Settings → Builds & deployments

### Production & Preview 共通設定

| 項目 | 値 |
|------|-----|
| **Framework preset** | `Next.js (Static HTML Export)` |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | (empty) |

### 環境変数

Production と Preview の両方に設定：

| 変数名 | 値 |
|--------|-----|
| `NODE_VERSION` | `20` |

## デプロイ方法

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

1. `prebuild`スクリプトで全記事をJSONにバンドル
2. `next build`で静的HTMLを生成（`out/`ディレクトリ）
3. Cloudflare Pagesが`out/`をホスティング
