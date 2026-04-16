本ドキュメント内で実行するようなコマンドなどを試せる環境としてVirtualBoxを紹介します。

## VirtualBoxとは

VirtualBoxとは仮想化ソフトウェアの一つでOracle社により開発され、無料でリリースされています。

[公式サイト](https://www.virtualbox.org/)

仮想化については[仮想化とは](VirtualMachine)

## インストール

(公式ダウンロード)(https://www.virtualbox.org/wiki/Downloads)からインストーラーをダウンロードしてインストールしてください。

ホストがLinuxの場合は各distributionのパッケージ管理からインストールできる場合もあります。
ただLinux on Linuxになる場合はカーネルモジュールなどの関連である程度の操作が必要になることがあります。

_Examples_
```bash
sudo pacman -Syu virtualbox
```

以下のブログなどによる解決が望めます。
[Ubuntu Linux 上の VirtualBox で Kernel driver not installed エラー Qiita](https://qiita.com/nanbuwks/items/04bc8836a4a121d9a45b)

## セットアップ

VirtualBoxにおける仮想環境のセットアップには幾つかの手法があり、isoなどのイメージファイルからインストールを行う場合と、vdiなどのセットアップ済みのVirtulBoxの環境のアーカイブを用いて手元でまた再現するなどの手法があります。

## セットップ済みvdiのサークル配布について

[共有リンク](https://tidacjp-my.sharepoint.com/:f:/g/personal/241172mukasa_tid_ac_jp/IgC8QTW4NyGtR6cvHX6N8oKqASVm0H9TFagy4mPrhDtolcI?e=8A4MAM)

