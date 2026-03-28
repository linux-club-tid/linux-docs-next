## コマンド

Linux(というかほとんどのOS)にはCUI環境というものがあり、黒い画面に文字ベースで操作を行う環境です。Linuxは文化的にもCUIを使うことが多く(近年はGUI操作も増えているとは言え)使えるようになっておくことに損はありません。

まずCUIはコマンドという単位で動くことがほとんどです。コマンドはターミナルエミュレータ[^1]上で実行します。ターミナルなどのShell環境については->

```bash
> ls
CONTRIBUTING.md  eslint.config.js  node_modules  package-lock.json  README.md  tsconfig.app.json  tsconfig.node.json
draft            index.html        package.json  public             src        tsconfig.json      vite.config.ts
```

## 引数とか、オプションとか、サブコマンドだとか

前章にてコマンドが実行できることはわかりましたが、コマンドのデフォルトの動作では不十分なことがあります。コマンドはその機能についてオプションやサブコマンドといった追加の機能を引数として持つ事が多いです。

### オプション: 操作を30°くらい傾けたり、20cmくらい伸ばしてみたり

例えば`ls`は単体では直下のファイル/ディレクトリを以下のように書き出すだけです。

```bash
> ls
CONTRIBUTING.md  eslint.config.js  node_modules  package-lock.json  README.md  tsconfig.app.json  tsconfig.node.json
draft            index.html        package.json  public             src        tsconfig.json      vite.config.ts
```

---

しかし、その下のディレクトリだけ見たい時にわざわざ`cd public`などのようにディレクトリを移動する必要はありません。`ls`でコマンドの次にディレクトリパスを記述するとそのディレクトリを親として同様の操作(ディレクトリ下のファイル一覧)が可能です。

```bash
> ls public/
articles  images
```

この`public/`を引数と呼び、特に位置により意味が決まるため**位置引数(positional argument)** と呼びます。
位置引数は複数持つこともあり、`cp`や`mv`はその好例です。これらはファイルのコピーや移動を行いますが移動元 移動先と2つ以上の引数が必要です。

```bash
# a.txtとb.txtをdir/下にコピーする
> cp a.txt b.txt dir/
# a.txtとb.txtをdir/下に移動する
> mv a.txt b.txt dir/

# 差分表示
diff a.txt b.txt
```

ちなみにLinuxにおけるファイルのリネームは`mv a.txt b.txt`として階層なしの移動によって行います。

---

しかしもう少し細かい情報、たとえばファイルのownerやそれがファイルかディレクトリかなどを知りたい時などです。そういった際にはオプションという機能で追加の指示を行います。`ls`においては`-l`というオプションを使うことでリスト形式でファイルを表示させることができます。また`--size`などといった形式のコマンドもあります。

```bash
> ls -l
total 216
-rw-r--r-- 1 alice alice   2340 Feb 24 23:14 CONTRIBUTING.md
drwxr-xr-x 1 alice alice    394 Mar 11 10:23 draft
-rw-r--r-- 1 alice alice    616 Feb 24 12:11 eslint.config.js
-rw-r--r-- 1 alice alice    359 Mar  9 13:50 index.html
drwxr-xr-x 1 alice alice   6652 Mar  9 13:55 node_modules
-rw-r--r-- 1 alice alice    876 Mar  9 13:50 package.json
-rw-r--r-- 1 alice alice 181004 Mar 11 10:23 package-lock.json
drwxr-xr-x 1 alice alice     44 Mar 11 10:23 public
-rw-r--r-- 1 alice alice   2555 Feb 24 12:11 README.md
drwxr-xr-x 1 alice alice    272 Mar 11 13:44 src
-rw-r--r-- 1 alice alice    732 Feb 24 12:11 tsconfig.app.json
-rw-r--r-- 1 alice alice    119 Feb 24 12:11 tsconfig.json
-rw-r--r-- 1 alice alice    653 Feb 24 12:11 tsconfig.node.json
-rw-r--r-- 1 alice alice    197 Feb 24 14:50 vite.config.ts
```

これらはそれぞれショートオプション、ロングオプションと呼ばれ、`-`と`--`でそれぞれ指定方法が変わります。(ただ`-`の数はあくまで文化的な側面があり、ものによっては`-size`などもありえます。あくまで多くのツールはといったところです)
また、上記の例では`-l`などの意味がtrueかfalse(`-l`を付けるとリストオプションをtrueにした感じ)と言ったフラグ的な意味しか持ちませんが、オプションの中にはオプション自体が引数として値を取ることもあります。

例えば先ほどの`ls`にも`--sort`というオプションがあり、これは`time`, `size`, `extension`などの値を文字列として持ちます。`--sort time`など。これにより表示順を変えることができます。ちなみに`-h`と付けると`--size`によって表示したファイルサイズを人間が読みやすい単位で表示してくれます。

```bash
> ls --size -l --sort time -h
total 216K
   0 drwxr-xr-x 1 alice alice  272 Mar 11 13:44 src
   0 drwxr-xr-x 1 alice alice   44 Mar 11 10:23 public
180K -rw-r--r-- 1 alice alice 177K Mar 11 10:23 package-lock.json
   0 drwxr-xr-x 1 alice alice  394 Mar 11 10:23 draft
   0 drwxr-xr-x 1 alice alice 6.5K Mar  9 13:55 node_modules
4.0K -rw-r--r-- 1 alice alice  876 Mar  9 13:50 package.json
4.0K -rw-r--r-- 1 alice alice  359 Mar  9 13:50 index.html
4.0K -rw-r--r-- 1 alice alice 2.3K Feb 24 23:14 CONTRIBUTING.md
4.0K -rw-r--r-- 1 alice alice  197 Feb 24 14:50 vite.config.ts
4.0K -rw-r--r-- 1 alice alice  732 Feb 24 12:11 tsconfig.app.json
4.0K -rw-r--r-- 1 alice alice  119 Feb 24 12:11 tsconfig.json
4.0K -rw-r--r-- 1 alice alice  653 Feb 24 12:11 tsconfig.node.json
4.0K -rw-r--r-- 1 alice alice  616 Feb 24 12:11 eslint.config.js
4.0K -rw-r--r-- 1 alice alice 2.5K Feb 24 12:11 README.md
```

細かいコマンドの見方については[実践! コマンド!!!](Practice_bash)にて。

### サブコマンド: 操作を60°くらい変えたり、20cmくらい戻してみたり

プログラム内部の扱いとしては引数なのですが、コマンド上における意味は異なるので別物として紹介します。サブコマンドとは言葉通りですがその親コマンドの機能をもっと細かくしたものです。

例としては`systemctl`, `apt`などがあります。前者はLinuxにおける標準的なサービス管理ツールで、後者はUbuntuのパッケージマネージャーです。

```bash
# そのサービスを有効化
sudo systemctl enable service_name

# そのサービスを起動
sudo systemctl start service_name
```

`systemctl`は上記のように`enable`や`start`などのサブコマンドが使用できます。ほかにも多くのサブコマンドがありますが、`systemctl --help`などでヘルプを表示することでサブコマンドの一覧と説明を表示できます。

また、有名なコマンドとして`git`がありますがgitも複数の(というより全ての操作が)サブコマンドによって構成されます。

例えば`git status`で現在のgitの状況を表示できますし、`restore`コマンド使うことで変更を巻き戻すことも可能です。

## 全部テキスト、全部つなげて

ここまででコマンドを実行するための準備はできました。しかしLinuxにおけるコマンドの真骨頂であるパイプラインというものを忘れています。

パイプラインとはコマンドの結果を次のコマンドへ渡すことができる機能です。百聞は一見に如かずというのですから、まずは見てみましょう。

```bash
cat members.txt | wc -l
```

このコマンドは`cat`でファイルの内容を書き出して、`|`というパイプ演算子を用いて`cat`の出力を`wc`の入力として流しています。`wc`はワードカウントするコマンドで、`-l`オプションを用いることで入力の行数(lines)を出力します。

このようにLinux(というよりはUnix)では出力をテキストストリーム(結果を一気に書き出して入力するのではなく、一定の領域に出力を貯めてから流すを繰り返す手法)を用いることが多く、別のソフトウェア同士でもある程度の互換性を持たせるように使うことが可能です。

もし出力がバイナリなどの出力したソフトウェアしか解釈できない形で出力されると、次のコマンドがそのバイナリを解釈出来ない(難しい・面倒)ため、テキストによる出力が推奨されています。これにより互いに知り得ないコマンド同士でもパイプで繋げて処理を記述することができます。

そのため、**全部を繋げる**ことができます。

### 標準出力と入力

そもそもCLIなどのShell環境には**標準出力(stdout)**と**標準入力(stdin)**というものがあります。標準出力とはそのままの通り、プログラムが書き出す内容そのものです。Pythonで言う`print()`ですし、C言語で言う`printf()`です。標準入力とはShell環境から受け取る入力です。Pythonでは`input()`, Cでは`scanf()`です。

これらはパイプと呼ばれる空間を用いて出力から入力に流すことができ、上記のようなデータの処理の流れを一方向的に実行できます。

またPythonなどでプログラム(特に`input()`などを用いた)を書いたことのある人は疑問に思うかもしれません。パイプからの入力も質問などの入力も同じ`input()`だったら区別つかなくない?と。実際普通にそのままのコードでは区別がつかないため、引数で必要な値はオプションは定義できるようにしたり、`isatty()`でターミナル上で起動したのか、パイプライン経由で起動したのかを判別して入力方法を切り替えるなどの手法が取られます。

## 関連

- [Shellについて](About_shell)
- [Shell script](Shell_script)

[^1]: 余談: 昔はPCではなく今で言うサーバーのようなタイプのコンピューターがほとんどのため、各個人はそのコンピューターにターミナルというIOデバイスをつないで使用していました。現代ではPCとして個人が各デバイスを持つようになったため、ターミナルは不要になりましたが、コンピューターへのコマンド窓口としてターミナルを再現したソフトウェアとしてターミナルエミュレータと呼ばれるものが使われています。
