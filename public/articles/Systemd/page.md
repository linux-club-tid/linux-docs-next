## Systemdとは

Systemd とはサービスと呼ばれるバックグラウンドにて動作するプログラムの管理を行うソフトウェアです。

管理とは具体的にStart, stop, enable, disableなどのサービスの動作の管理やstatus, logなどの状態監視などを含みます。

## 有効化とスタートの違い

そもそもサービスとはバックグラウンドで動作するプログラムで、OSの起動時に開始されそのOSが動作している間にはずっと起動することが多いです。裏で勝手に仕事をしてくれるイメージです。
そしてそれらは有効化, 無効化という状態で自動スタートするかどうかを定義できます。また手動で始めるStartという機能(多くの場合は再起動せずにサービスを開始する際に使う)もあります。

## 基本的操作

基本的にはシステムレベルによる操作が必要なため、`sudo`で実行します。実際の操作はサブコマンドにより行われ`systemd <sub commands>`という形式です。

以下の例ではキーボードのリマップサービスである`keyd`を例にします。

```bash
# サービスの状態を確認する
sudo systemd status keyd

# サービスを有効化
sudo systemd enable keyd

# サービスを無効化
sudo systemd disable keyd

# サービスを有効にして、その場で起動
sudo systemd enable --now keyd

# サービスを開始
sudo systemd start keyd

# サービスを停止
sudo systemd stop keyd

# サービスを再起動
sudo systemd restart keyd
```

## 余談 Systemdは悪なのか?

[Distribution](Distribution#h3_subtitle-5)の記事でも触れたように以下のような批判があったりもします。

> `systemd`はその特性から、単一のソフトウェアに複数の機能(サービスの管理やログの管理など)を持たせすぎ、などの点でUnix的でないと批判されることもあります。
> しかし利便性の観点などからほとんどDistrowatchはsytemdを採用しています。(あくまで私見ですがLinuxは思想より実用性重視な哲学を持っていると思います)





