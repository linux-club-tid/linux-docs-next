## Linuxにおけるユーザーとは

Linuxにはユーザーアウントという単位で利用ユーザーを管理する機能があります。デスクトップユーザーとしては基本的にシステムで自動で作成されるユーザーと自身でインストール時に作成するユーザー以外を使うことは少ないと思いますが、以下のファイル権限管理や一部のソフトウェアにて作成されたユーザーを使う場合もあるので概要だけ把握しておいて損はないです。

ちなみに以下がインストール直後の私のArch Linuxでのユーザーリストです。改行位置は私が調整してますが`getent passwd | cut -d: -f1`というコマンドで表示できます。グループは`cat /etc/group | cut -d : -f 1`。

```linux-users
root bin daemon mail ftp http nobody dbus
systemd-coredump systemd-network systemd-oom
systemd-journal-remote systemd-resolve
systemd-timesync tss uuidd alpm pcscd polkitd
avahi alice cups brltty colord flatpak gdm
geoclue gnome-remote-desktop rtkit saned usbmux
git nvidia-persistenced
```

### なぜシステムは大量のユーザーを作成するのか?

Linuxにおけるユーザーは必ずしも人のためだけではありません。上記のユーザー名の中には`systemd-network`などの名前もあります。これらのユーザーはログインして使うためのものではなく、権限管理のためだけに存在します。そのためログインも無効化されています。

もし`http`(webサーバー系の処理用のユーザー)が乗っ取られた場合にもしそれらのプロセスが`root`などの広範囲に強力な権限をもつユーザーで実行されていた場合、システム全体が危険になります。しかし`http`にはWebサーバーの動作に必要な権限しか持たないため、被害を最小に抑えることができます。このように複数のサービスが入り乱れる環境ではそれぞれの権限を最小にする必要があるのです。[最小特権の原則とは？--cloudflare](https://www.cloudflare.com/ja-jp/learning/access-management/principle-of-least-privilege/)

マスターキーは便利ですが入居者全員が持っていては危険が過ぎます。

### 普通のユーザーは

上記の例では`alice`というのが一般ユーザーです。ログインして使うタイプのユーザーです。ただ現代のデスクトップOSで、マシンそのものを共有することは少なく、基本的には1つのマシンに1つの一般ユーザーという構成が多いでしょう。(サーバーとかは事情が違いますが)

また通常は各一般ユーザーごとにホームディレクトリが作成され、ユーザーごとのファイルを管理できます。

ユーザーは以下のコマンドで作成できますが(通常はroot権限が必要)その際に`-m`オプションを付けるとそのユーザーのホームディレクトリを作成できます。

```bash
sudo usrradd -m new_user
```

このままではパスワードが設定されておらず、不便なので`passwd`でユーザーに対してパスワードを設定する必要があります。

```bash
sudo passwd new_user
# ここでパスワードの入力を求められます
```

### グループ

Linuxにはユーザーをまとめて管理できる機能としてGroupがあります。大概はユーザー名と同じグループが作成されます。詳細は後述しますがユーザーに作られたファイルのグループ権限はユーザー名グループになります。またユーザーは複数のグループに属することができます。

普通に使ってる分にはグループを作ることも少ない(デスクトップだと基本的に1ユーザーなので)ですが、dockerやsambaなどで使うこともあったりします。

```bash
sudo groupadd developers
```

```bash
sudo usermod -aG developers alice
```

`-a`はappendで既存グループから抜けずに新しいグループへ追加します。`G`でグループを指定します。

### id

ユーザーやグループにはそれぞれに固有のidがあり、それぞれユーザーidとグループidよ呼ばれ、`/etc/passwd`ファイルに保存されています。
passwdファイルには`ユーザー名:パスワード:ユーザーID:グループID:コメント:ホームディレクトリ:ログインシェル`という文法で記述されています。

```bash
cat /etc/passwd
# ~~~
alice:x:1000:1000::/home/alice:/usr/bin/fish
# ~~~
```

以下は私の例の抜粋ですが、1つめの一般ユーザーとして`1000`が当てられています。
パスワードが`x`なのは現在はセキュリティ上等の理由でここには保存されず`シャドウパスワード`という仕組みで管理されていることを示しています。

余談ですが、`/etc/passwd`はrootがownerなのでsudoなどでroot権限を用いれば編集できますがぶっ壊すと酷いことになるので触らないことをおすすめします。
また、othersにも`Read`だけ許可されてるのでownerでもgroupでもない一般ユーザーでも`cat`などで見ることはできます。

```bash
> ls -l /etc/passwd
.rw-r--r-- 1.9k root 13 Mar 20:28 /etc/passwd
```

余談2。passwdファイルとは言いつつ現在はセキュリティなどの観点からパスワードは保存されていません。また実際のパスワードとしては`/etc/shadow`にsalt付きのハッシュ値が保存されます。ハッシュ値については[ここ](https://wa3.i-3-i.info/word11949.html)とか見て調べてください。パスワードを直接保存しないため最悪漏れても大丈夫ということだけをここでは説明します。(いつか記事にするかも...)

```bash
> ls -l /etc/shadow
.rw------- 949 root 13 Mar 20:28 /etc/shadow
```

ownerがrootかつowner以外には何も許可されていないため何もできない。

## Linuxは9つの権限を持つ

Linuxはファイルへのアクセス権限を**3種類のパーミッション**と**3種類のユーザークラス**(権限の対象となるユーザー)で管理しています

ユーザークラスは**Owner**, **Group**, **Others**の3種類で、それぞれのユーザークラスが**Read**, **Write**, **Excute(実行)**という3種類の権限を足し合わせる形で持ちます。

Ownerとはそのファイル/ディレクトリの所有者であり、1人のユーザーが対象です。グループとは先の説明通りユーザーの集合で、それをOwnerとは別に複数人を対象とした権限管理を行えます。Ohtersはその通りでその他です。

Linuxで一般ユーザーにより作成されたテキストファイルなどは大体以下の権限で作成されることが多いです。

| user class | Read | Write | Excute |
| :---: | :---: | :---: | :---: |
| Owner | o | o | x |
| Group | o | x | x |
| Others | o | x | x |

これは所有者は読み書きができ、実行は出来ない。それ以外のユーザーに対しては読みとりのみ許容されてます。

## Linuxは9つの権限を3桁の数字で表す

先程の9つの権限(3つの権限と3つの対象)をLinuxでは以下の形式で3桁で表します。

`[owner][group][others]`.

3種類のパーミッションにはそれぞれ数値が割り当てられており、Read は 4、Write は 2、Execute は 1 となっています。
各ユーザーの権限は、該当する数値を足し合わせることで計算します。

- オーナーに Write と Read を与えるなら、4+2=6。→ 6
- グループに Read だけ与えるなら、4=4。→ 4
- まったく権限を与えないなら → 0
- つまりこの例では 640 と表記します

![permission calculation](../images/permissions/cal.jpg)

### なぜ 4,2,1 なのか?

これは各値が2進数であることが原因です。Read, Write, Excuteがそれぞれ`100`, `010`, `001`となっていて以下のような表現となっている([ビットフラグ](https://developer.mozilla.org/ja/docs/Glossary/Bitwise_flags))ため加算して各パーミッションを表現できるのです。

```
Read  Write  Execute
  1     1      1    = 7  (rwx すべて許可)
  1     0      1    = 5  (rw- 書き込みなし)
  1     0      0    = 4  (r-- 読み取りのみ)
  0     0      0    = 0  (--- すべて拒否)
```

## ファイルの権限を管理する


### ファイルの権限を変える

ファイルの権限は主に`chmod`コマンドを使います。`chmod`は引数として、権限と対象のパスを要求します。権限は先程の数列を用いて**上書き**するか、`+x`などの記号を用いて**変更**ができます。

例えば以下のコマンドは`script.sh`の権限を所有者に全て許可し、それ以外には読み取りだけを許可します。

```bash
chmod 744 script.sh
```

また、chmodの権限表現にはシンボルを用いたものもあります。記法としては`who-control-permission`といった感じで、例えば所有者に実行権限を許可する場合は、`u+x`となります。これは`u`がowner(user)を表し、`+`で権限の追加、`x`が実行権限を表します。
以下に使用可能なシンボルを紹介します。

| symbol | class |
| :---: | :---: |
| `u` | owner |
| `g` | group |
| `o` | other |
| - | all |

`+x`のようにwhoを省略した場合はall扱いになります。

| symbol | control |
| :---: | :---: |
| `+` | 追加 |
| `-` | 削除 |
| `=` | 上書き |

| symbol | permission |
| :---: | :---: |
| `r` | Read(読み取り) |
| `w` | Write(書き込み) |
| `x` | Execute(実行) |

---

あくまで筆者の意見ですが、`+x`以外の操作に関しては`760`のような上書き型の方が明示度が高く操作ミスが少ないのでおすすめです。

### ファイルの所有者を変える

`chown`コマンドを使うことでファイルの所有者やグループを変更することができます。引数として`ユーザー名:グループ名 パス`を取ります。ユーザー名とグループ名に関しては、どちらかを省略した場合は影響しません。

alice, Telesというユーザー達とwork, clubというグループがあった場合。

```bash
# fileの所有者をaliceに、グループをworkに
chown alice:work file

# fileの所有者をTelesに、グループはwork
chown Teles file

# fileの所有者はTelesのまま、グループはclubに
chown :club file

# fileの所有権をaliceに、グループはaliceのログイングループ(alice group)に
chown alice: file
```

最後の例のように`user:`という記法にすると、グループはログイングループ(ユーザーと同名のグループ)になります。

## 参考

https://en.wikipedia.org/wiki/Cat#Superstitions_and_rituals
https://wiki.archlinux.org/title/Users_and_groups
https://linuc.org/study/knowledge/509/

