本ドキュメント内で実行するようなコマンドなどを試せる環境としてVirtualBoxを紹介します。

## VirtualBoxとは

VirtualBoxとは仮想化ソフトウェアの一つでOracle社により開発され、無料でリリースされています。

[公式サイト](https://www.virtualbox.org/)

仮想化については[仮想化とは](VirtualMachine)を参照ください。

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

### isoファイルからのインストール

![1](/articles/VirtualBox/images/first.png)
![2](/articles/VirtualBox/images/1ready_for_make.png)
![3](/articles/VirtualBox/images/2ram_cpu_cusom.png)
![4](/articles/VirtualBox/images/3list.png)

### セットップ済みvdiのサークル配布について

VirtualBoxでそのまま仮想化されたセットアップ済みのLinuxの環境をサークルで配布しています。

以下に共有からのREADMEを引用します。

---

[共有リンク](https://tidacjp-my.sharepoint.com/:f:/g/personal/241172mukasa_tid_ac_jp/IgC8QTW4NyGtR6cvHX6N8oKqASVm0H9TFagy4mPrhDtolcI?e=8A4MAM)

仮想環境を構築できるオープンソースソフトウェア(OSS)*VirtualBox*用のLinuxディストリビューション導入済みイメージです。気になるフォルダをダウンロードして使ってください。

VirtualBoxのインストールは調べれば出てくるのでやってみてね！
(わからなかったら聞いてくれればサポートします)

1. フォルダごとダウンロードし、好きな場所に置く
1. VirtualBoxを起動し、「追加」ボタンをクリック
1. ダウンロードしたフォルダ内の「***.vbox」という名前のファイルを選択
1. メインメニューにマシンが表示されるので「起動」をクリック

### ラインナップ

- LinuxMint (Cinnamon版)
  - 親しみやすい画面表示を備えた安定性の高いLinux
  - とにかく軽くて特にVirtualBox向けにオススメ！
  - 初心者にも優しいUbuntuベースでパッケージマネージャーはapt
- ZorinOS
  - 高いWindowsアプリ互換とWindowsライクな操作感がウリ！
  - どうやらMac風のレイアウトも用意されているらしい...
  - 初心者にも優しいUbuntuベースでパッケージマネージャーはapt
- ElementryOS
  - Macライクの画面表示で洗練されたUIがウリ！
  - こだわりの独自実装デスクトップが気になるなら触ってみよう！
  - 初心者にも優しいUbuntuベースでパッケージマネージャーはapt
- Mageia (KDE版)
  - 美しい画面表示で根強い人気
  - aptやDebian/Ubuntu以外も触ってみたいならオススメ！
  - パッケージマネージャーはrpm

### 構成

- CPU
  - 4コア
- RAM
  - 4096MB
- ストレージ
  - 30GB
- パッケージ
  - vi / vim
  - neovim
  - python3
  - C / C++
  - fastfetch or neofetch (マシン詳細表示)
  - ターミナル用フォント (Cascadia Code NF)
  - VirtualBox Guest Additions (クリップボード共有のみ設定済み)

