
## フォルダ内のHEICファイルを.pngに変換する

magicはあとから入れた画像処理系のツール。

```fish
for file in *.HEIC
    magick $file (string replace -r '\.HEIC$' '.png' $file)
end
```

## HEICをちゃんとpngに変換できたか確認

先程のコマンドで経過を表示するのを忘れたのでちゃんと変換できたかわからない。そのため置換後のパスを想定して変換した分のpngがあることを確認します。あとezaはlsのモダンツール、fdはfindのモダンツール。

```fish
> eza  *.HEIC | string replace HEIC png | xargs -I{} fd {} -l
-rw-r--r--. 1 alice alice 3.0M Mar 10 22:44 ./IMG_1373.png
-rw-r--r--. 1 alice alice 1.6M Mar 10 22:44 ./IMG_1714.png
-rw-r--r--. 1 alice alice 4.7M Mar 10 22:44 ./IMG_1716.png
-rw-r--r--. 1 alice alice 6.1M Mar 10 22:44 ./IMG_2062.png
-rw-r--r--. 1 alice alice 5.7M Mar 10 22:44 ./IMG_2128.png
-rw-r--r--. 1 alice alice 6.3M Mar 10 22:44 ./IMG_2129.png
-rw-r--r--. 1 alice alice 13M Mar 10 22:44 ./IMG_2163.png
-rw-r--r--. 1 alice alice 12M Mar 10 22:44 ./IMG_2213.png
-rw-r--r--. 1 alice alice 8.3M Mar 10 22:44 ./IMG_2214.png
-rw-r--r--. 1 alice alice 13M Mar 10 22:44 ./IMG_2222.png
-rw-r--r--. 1 alice alice 11M Mar 10 22:45 ./IMG_2494.png
-rw-r--r--. 1 alice alice 14M Mar 10 22:45 ./IMG_2651.png
-rw-r--r--. 1 alice alice 9.9M Mar 10 22:45 ./IMG_2667.png
-rw-r--r--. 1 alice alice 9.4M Mar 10 22:45 ./IMG_2842.png
-rw-r--r--. 1 alice alice 8.7M Mar 10 22:45 ./IMG_2924.png
-rw-r--r--. 1 alice alice 6.3M Mar 10 22:45 ./IMG_2925.png
-rw-r--r--. 1 alice alice 6.5M Mar 10 22:45 ./IMG_2926.png
-rw-r--r--. 1 alice alice 12M Mar 10 22:45 ./IMG_9180.png
```

一応HEICのファイルリストはあったので

```fish
> eza -l *.HEIC
.rw-rw-r--@ 481k alice 10 Mar 01:05 IMG_1373.HEIC
.rw-rw-r--@ 344k alice 10 Mar 01:05 IMG_1714.HEIC
.rw-rw-r--@ 501k alice 10 Mar 01:05 IMG_1716.HEIC
.rw-rw-r--@ 954k alice 10 Mar 01:05 IMG_2062.HEIC
.rw-rw-r--@ 743k alice 10 Mar 01:05 IMG_2128.HEIC
.rw-rw-r--@ 910k alice 10 Mar 01:05 IMG_2129.HEIC
.rw-rw-r--@ 2.4M alice 10 Mar 01:05 IMG_2163.HEIC
.rw-rw-r--@ 2.3M alice 10 Mar 01:05 IMG_2213.HEIC
.rw-rw-r--@ 1.3M alice 10 Mar 01:05 IMG_2214.HEIC
.rw-rw-r--@ 2.9M alice 10 Mar 01:05 IMG_2222.HEIC
.rw-rw-r--@ 1.9M alice 10 Mar 01:05 IMG_2494.HEIC
.rw-rw-r--@ 2.8M alice 10 Mar 01:05 IMG_2651.HEIC
.rw-rw-r--@ 2.1M alice 10 Mar 01:05 IMG_2667.HEIC
.rw-rw-r--@ 1.5M alice 10 Mar 01:05 IMG_2842.HEIC
.rw-rw-r--@ 1.7M alice 10 Mar 01:05 IMG_2924.HEIC
.rw-rw-r--@ 1.2M alice 10 Mar 01:05 IMG_2925.HEIC
.rw-rw-r--@ 1.2M alice 10 Mar 01:05 IMG_2926.HEIC
.rw-rw-r--@ 1.9M alice 10 Mar 01:05 IMG_9180.HEIC
```

あってそう? 面倒なときは`wc -l`で行数を変えたり、`diff`などで差分をとっても良いかもしれません。

```fish
> eza  *.HEIC | wc -l
18

> eza  *.HEIC | string replace HEIC png | xargs -I{} fd {} -l | wc -l
18
```
