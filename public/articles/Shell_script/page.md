## Shell Scriptとは

1つのファイルに[Shell](About_shell)コマンドをまとめて記述することで実行出来る機能です。

## シェバン/shebang

スクリプトの先頭に記述して、そのスクリプトのインタープリターを指定する機能。

```bash
#!/bin/bash

# 👆️このスクリプトは`bash`で実行される
```

## 実行権限について

通常、`touch`などで作成されたファイルは実行権限を持ちません。権限については[here](permit-artile)。

そのため`chmod +x script.sh`などで実行権限をスクリプトに与える必要があります。

```bash
touch script.sh

ls -l
.rw-r--r--@    0 alice  9 Mar 16:04 script.sh
#  👆️xが無く実行権限が付与されてないことが分かる

chmod +x script.sh # <- 権限を与える
.rwxr-xr-x@    0 alice  9 Mar 16:04 script.sh
#  👆️xが付き実行権限が付与されている
```

## 基礎構文 (Bash)

shebangにpython3とかを指定すればpython scriptとかも作れますが、システム系の操作がやりやすいBashの方がスクリプトとして使う機会が多いと思うので今回はBashを使います。

以降、すべてのコードブロックにおいてshebangは省略します。
また主にスクリプトでの動作を想定していますが、普通にCLIでも使えます。

## コード規約

基本はプロジェクトなどが優先ですが、一応一般的な例?を。

- インデントは2スペース by Google
- 変数は小文字snake_case
- グローバル変数レベルのスコープは大文字

## コマンド実行

```bash
#!/bun/bash

# 行を分ければ複数のコマンドを実行出来る
echo "first command"
echo "second command"
# ; を使って1行で
echo "3"; echo "4"
```

## 変数

`name=value`。`=`にスペースは不要(というよりエラーになる)

```bash
# Bashでは=にスペースを入れてはいけない
Age=17
```

## ローカル変数と変数のスコープ

変数にはその変数が生きている期間(範囲)がありそれはスコープと呼ばれます。Bashにおいては割とスクープはゆるく、基本はグローバルに近いです。ただし`local`で宣言した場合は宣言した場所がスコープになります。関数内で`local`を使うとその変数はその関数内でのみ有効になります。これによりscriptやそれより大きいスコープの変数に影響を与えることが少ないです。

```bash
function greet() {
  local user="$1"
  ehco "Hello ${user}"
}

greet "Foo"
```

## 変数の参照

`$var-name`を使う。変数名の範囲を明示するには`${var-name}`。コマンド名の次にスペースなどの区切りがない場合インタープリターに変数名の範囲を知らせることが出来る。

```bash
echo "$Age"
```

## スクリプトが受け取る引数

通常の言語のようにスクリプトもコマンドのように引数を受け取れます。

```bash
add.sh 1 3
```

これらの引数は自動で`$1`, `$2`のような変数に代入されます。

```bash: add.sh
echo (( $1 + $2 ))
```

## コマンド結果を変数に

`$()`というコマンド置換(command substiution)を使います。`$()`内で実行されたコマンドによる標準出力は値として返ります。

```bash
USE_SYS=$(uname -m; echo $USER)

echo $USE_SYS
x86_64 alice
```

`uname -m`はマシンのCPUアーキテクチャを、`echo $USER`はシステム(シェル)によって定義されている現在のユーザー名を返す。(正確には$()によりechoで出力された変数の値がキャプチャされ、`USE_SYS`変数に代入される)

## ファイルへの書き込み

## 制御構文(if)

基本は`if [ cond ]; then xxx`で記述しますcond(条件式)に関しては`[ cond ]`と`[[ cond ]]`という2つの書き方がBashに存在し、基本的には`[[ cond ]]`が推奨されます。Bashより歴史のあるshellである`sh`などでは使えないBashだけの構文なのですが、現在書かれるスクリプトは大体Bashなので(というか shebangでBashを指定する)問題ないです。なぜ二重のほうが推奨されるかについては`### `""`に気をつけろ`にて後述しますが、安全性と利便性が高くデメリットが前述のようにほとんど無いためです。また以上の理由によりこの文書においては`[[ cond ]]`を採用しています。

cond(=条件式)については下記を参照。

**`[`と`cond`と`]`の間**はそれぞれ**スペース**が必要です。バグの原因3位。2位は`fi`の閉じ忘れ。1位は何かわからんバグ。

```bash
if [[ cond ]]; then
  then process
else
  else process
fi

if [[ cond ]]; then
  echo "cond is true"
elif [[ cond2 ]]; then
  echo "cond is false, cond2 is true"
else
  echo "all cond are false"
fi
```

また条件がTrueの場合にのみ実行する際は以下のようなフォーマットを使うことで1行で書ける。

```bash
[[ 10 -eq 10 ]] && echo "10 is 10!"
```

### if(数値評価)

以下に数値による`if`の条件に使える演算子を。symbolってのは一般的な言語による記号です(Bashでは特定の構文を除いて使えません)。

基本的に左辺は右辺より(と){desc}。という表現になっています。

| cond | desc | symbol |
| :---: | :--- | :---: |
| `-eq` | 等価(Equal to) | == |
| `-ne` | 不等価(Not Equal) | != |
| `-gt` | より大きい(Greater than) | > |
| `-ge` | 以上(Greater than or Equal) | >= |
| `-lt` | より小さい(Less than) | < |
| `-le` | 以下(Less than or Equal) | <= |

```bash
Age=18

if [[ "$Age" -ge 18 ]]; then
  echo "User is adult"
fi
```

また、`(())`で囲むことで一般的な数値計算と比較演算を行えます。

```bash
Age = 18
if (( Age >= 18 )); then
  echo "User is adult"
fi
```

### if(ファイルシステム)

ファイル存在確認なども行えます。`! -x`などで否定演算に出来る。

| cond | desc |
| :---: | --- |
| `-e` | ファイル,ディレクトリ,リンクがある |
| `-f` | ファイルがある |
| `-d` | ディレクトリがある |
| `-r` | 読めるファイルがある |
| `-w` | 書き込めるファイルがある |
| `-x` | 実行出来るファイルがある |

```bash
if [[ -f log.log ]]; then
  echo "log.log is exist"
elif [[ ! -x log.log ]]; then
  # 一般的な構成としてはlogファイルが実行出来ることは無いので、多くの場合はここはTrue
  echo "log.log is not executable"
fi
```

### if(文字列比較)

| cond | desc |
| :---: | :--- |
| `==` | 等価 |
| `!=` | 不等価 |
| `-n` | 空ではない |
| `-z` | 空である |

```bash
name="Alice"

if [[ "$name" == "Alice" ]]; then
  echo "you are Alice"
else
  echo "you are not Alice"
fi
```

## Case(並列条件分岐)

他言語でいう`match`や`switch`のように、`cond`に対して並列的に等価比較してそれぞれのケースごとの処理を行います。

```bash
case "cond" in
  match1)  process1 ;;
  match2)  process2 ;;
  match3)  process3 ;;
       *)  何にもマッチしない場合 ;;
esac
```

以下のような使い方があります。(私が実際に使ってるスクリプトの一部)

`cycle_wallpaper.sh`はデスクトップの壁紙を特定のフォルダ内の画像に`順/逆/ランダム`に切り替えるスクリプトです。`cycle_wallpaper.sh seq`や`xxx.sh rev`のように呼び出すことで方向を変えられます。

１種のサブコマンドのような機能ですがこういったものの処理にcaseは便利です。

_cycle_wallpaper.sh_
```bash: cycle_wallpaper.sh
# $1はseqなどのサブコマンドが入る
case "$1" in
  seq)  wall_path=$(seq_or_rev 0 "$WALLPAPER_DIR")  ;;
  rev)  wall_path=$(seq_or_rev 1 "$WALLPAPER_DIR")  ;;
  rnd)  wall_path=$(random_paper "$WALLPAPER_DIR")  ;;
    *)
        echo "Usage: $0 <seq|rev|rnd>" >&2
        exit 1
        ;;
esac
```

## 関数/function

`function name() {}`で関数を定義することできます。このようにすることで、重複しているコードなどを1つにまとめることが出来ます。関数の呼び出しはコマンドと同様で、引数も`()`などでくくる必要はなく連続して記述します。また引数は入力順に`$1`のような番号変数に代入されます。

引数の値(整数)によって表示内容のレベル分けを行えるシステム情報表示関数。

```bash
function show_sys() {
  local detail_lev=$1

  (( detail_lev >= 0)) && echo "you are $USER"
  (( detail_lev >= 1)) && echo "cpu arch is $(uname -m)"
  (( detail_lev >= 2)) && echo "kernel version is $(uname -r)"
  (( detail_lev >= 3)) && echo "operation system is $(uname -io)"
}

show_sys 3
```

## デフォルトで存在する変数たち

## 全体的な注意点

### `""`に気をつけろ

Bashは隙あらば変数を参照した際に中の値のスペースや改行で出力を分けようとします。便利なときもありますが、大概は記述者の意図とズレます。`"`で囲うことで1つの文字列として扱えます。特に`rm`などによってファイルを削除する際に展開を見するとひどいことになります。あとはディレクトリからファイルをリストで扱うとか。

```bash
file="my file.txt"
rm $file
# `my`と`file.txt`ファイルが削除される
```

```bash
rm "$file"
# これで$fileの中身は区切られず1つの文字列として扱われる
```

また、よくあるのがifの`[]`で変数を参照する際に、変数の値にスペースなどがった際に項が増えて動かなくなることがあります。

```bash
file="a b"

if [ -f $file ]; then # `[ -f a b ]`になってしまいバグになる
  echo "exists"
fi

if [ -f "$file" ]; then # `[ -f "a b" ]`になる
  echo "exists"
fi
```

あとは、前述のように`[[ cond ]]`とすることで展開を防ぐことも出来る。

```bash
if [[ -f $file ]]; then
  echo "exists"
fi
```

## 参考

- https://www.geeksforgeeks.org/linux-unix/bash-scripting-introduction-to-bash-and-bash-scripting/
- https://www.cyberciti.biz/tips/find-out-if-file-exists-with-conditional-expressions.html
