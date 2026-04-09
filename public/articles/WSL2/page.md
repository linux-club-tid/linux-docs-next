本ドキュメント内で実行するようなコマンドなどを試せる環境としてWSL2を紹介します。

## WSL2とは?

**W**indow **S**ubsystem for **L**inuxというWindowsマシン上でLinuxを動作させるものです。

現在はWSL2というバージョンが主流です。1と比べて実際のLinux Kernelが動作したり、WSL1が変換レイヤーに近い形でLinuxを**再現**していたものに比べ、WSL2では高速な仮想化を行う(Hypr-Vベース)ことで強化されたものです。特殊な事情がなければWSL2をおすすめします。

VirtualBoxなどに比べ高速であることや、セットアップが楽という点で今回はWSL2を採用しています。

## セットアップ

1. ターミナルを開く

Windowsマークを右クリックしてWindowsのターミナルを開きます。

![open windows term](/articles/WSL2/images/open_term.png)

2. `wsl --install`

wslをインストールします。デフォルトではUbuntuがディストリビューションとしてインストールされます。

![install wsl](/articles/WSL2/images/installing_wsl.png)

3. ユーザーの設定

インストールが進むと途中でユーザー名とパスワードを入力するように要求されるため、設定します。

![set users](/articles/WSL2/images/wsl--install.png)

4. Linuxのホームディレクトリに移動

なぜかWindowsのドライブにいるので、Linuxのホームディレクトリに移動しておきます。

Linuxでは`cd`を引数なしで実行することでホームディレクトリに移動できます。

![home](/articles/WSL2/images/ls_in_wsl.png)

## 後からWSL2のLinuxに入る/起動する方法

先程と同様にWindowsターミナルを起動して新しいタブを開く際に矢印を押してUbuntuなどのインストールしたLinuxを選択します。

![attach_wsl](/articles/WSL2/images/open_ubuntu_as_new_tab.png)

## それ以外のWSLの話

[公式サイト](https://learn.microsoft.com/ja-jp/windows/wsl/install)を見てください。
[こちら](https://qiita.com/LMShion/items/f80f61ed3c1ec6368074)もメンバーにより推奨。

