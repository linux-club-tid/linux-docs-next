# Cloudflare Pages デプロイ設定

## ビルド設定（Dashboard）

Cloudflare Dashboard → Pages → プロジェクト → Settings → Builds & deployments

### Production & Preview 共通設定

| 項目 | 値 |
|------|-----|
| **Framework preset** | `None` |
| **Build command** | `npm run pages:build` |
| **Build output directory** | `.open-next/assets` |
| **Root directory** | (empty) |

### 環境変数

Production と Preview の両方に設定：

| 変数名 | 値 |
|--------|-----|
| `NODE_VERSION` | `20` |

## ローカルプレビュー

```bash
npm run pages:preview
```

## デプロイ方法

```bash
git add .
git commit -m "your message"
git push origin main  # または develop
```

プッシュすると自動的にビルド＆デプロイされます。

## トラブルシューティング

### 404エラーが出る場合
- Framework preset が `None` になっているか確認
- Build output directory が `.open-next/assets` になっているか確認
- ビルドログで "OpenNext build complete" が表示されているか確認
