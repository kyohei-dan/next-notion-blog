# コーディングガイドライン概要

## 目次
1. [対象ブラウザについて](#1-対象ブラウザについて)
1. [基本](#2-基本)
1. [HTML](#3-html)
1. [SCSS](#4-scss)
1. [画像](#5-画像)
1. [git](#6-git)

***

## 1. 対象ブラウザについて
- Chrome
- Safari
- Firefox
- Edge  
※いずれも最新版  
※先方の要望があればIEも対象

***

## 2. 基本

### コーディング規約
- 既存の外部プロジェクトに規約があれば、そちらを優先する
- タブ使わずスペース使う
- スペース幅: 2
- 改行: LF(\n)  
※コーディングテンプレート+VS Codeで設定済みなのでそこまで気にしなくてよい

### ファイル構成
コーディングテンプレート参照

### 共通の命名規則
他の命名規則や制限がない場合、基本的に下記に従う。
- 半角英数とハイフンを使用する
- 1文字目はアルファベット(a-z)を使用する
- 大文字、アンダースコアは使わない
- 連番の数値が付くファイル名は、0をつけて2桁にすることを推奨する (01, 02, … 09, 10, 11)
- service01/、image01.pngなど
- 数値の上限が確定している場合は1桁でもよい

***

## 3. HTML

### ファイル名の命名規則
- [共通の命名規則](#共通の命名規則)を使用（以下例）
  - company/index.php
  - company/outline.php
  - company/nantoka-kantoka.php

### id, classの命名規則
- 構造上意味のあるクラス名を、簡潔につける
- 親要素のクラス名から分かるものは省く。
- 大文字とアンダースコアは使わない
- つけなくていいクラスにまで命名しない（セクションの中に一つだけしかないもの等）
- 英語読みができるように書く　例：× list-news　○ news-list
- なるべく略語を使わない（世間的に認知度が高いものや長い単語等は除く）
- 例：× txt　○ text　/　× c-news-list　○ common-news-list

```
<!-- 単体だと曖昧なクラス名は避ける -->
<!-- 悪い例 -->
<section class="news">
  <h2 class="news-title"></h2>
  <div class=”news-inner”>
    <ul class="news-list"></ul>
  </div>
</section>

<!-- 良い例 -->
<section class="news">
  <h2></h2>
  <div class=”inner”>
    <ul></ul>
  </div>
</section>

```

🦉＜ 具体的なクラスの命名は[Alucoコーディングサンプル](http://aluco-sample.dev.a.scrw.io/)を参照（aluco / aluco）

### idとclass使い分け
__idを使うケース__
- ページの名前空間として``<body />``直下の``<div />``に使用
- ページ内リンクとして使用、それ以外は原則として使用しない
- [名前空間とは](https://www.google.com/search?q=%E5%90%8D%E5%89%8D%E7%A9%BA%E9%96%93)

### セクショニングと見出し
__要点__
- セクショニングと見出しの概念を理解する
- セクショニングは基本的に見出しを必須とするが、例外として**デザイン上見出しが省略されている**ケースもあるため、意図を汲み取った上でマークアップする
- ページと文書がどう構成されているかを常に意識して、適切なマークアップを心がける  

#### ⚠️2022/7〜のHTML LSの変更点について
HTML LSのアップデートで、アウトラインを形成するアルゴリズムが変更されました。  
これによってアルコのコーディングガイドラインに変更が入るということはありませんが、概念については各々理解するように努めてください。

### コメント ``<!-- -->``
head内の整理以外は基本使わない  
コメントがなくても見やすいコードを書くことを心がける

### その他
参考までに  
lint：[HTMLが正しく書けているか精査してくれるサイト](http://www.htmllint.net/)

***

## 4. SCSS
### ファイル名の命名規則
- [共通の命名規則](#共通の命名規則)を使用
- 頭のアンダースコアは使わない (パーシャルというやつ)  
``pages/``  
ページの名前空間として使っているidと合わせる  
``modules/``  
mixinや関数を置く場所  
``parts/``  
header, footerなど

### 命名規則
HTMLのクラス命名規則に準ずる

### 並び順
HTMLの上から順をベースに、共通パーツから記述

### SPの記述場所について
暫定：山下さん方式をテスト採用
```
/* ページごとのCSSは、PC/SPで分ける */
#about main {
  section {
    h2 {
    }

    ul {
    }
  }
}

@include f.mq(sp) {
  #about main {
    section {
      h2 {
      }

      ul {
      }
    }
  }
}
```

### モジュールとmixin
mixinを機能ごとにまとめたファイルを、コーディングテンプレート上ではモジュールと呼び、scss/site/modules/にまとめる。

### リセットCSS
destyle.css を使用

### カスタムプロパティ例
```
--color-base: #fff
--color-sub: #000
--color-accent: red

複数の時
--color-accent01: red
--color-accent02: blue

色に意味を持たせたいとき
--color-accent-danger: red (問い合わせフォームのエラー文、必須ボタン、エラー赤枠等)
--color-accent-information: blue
```
`--color-base: #fff`  
`--color-sub: #000`  
`--color-accent: red`  
`複数の時`  
`--color-accent01: red`  
`--color-accent02: blue`  
`色に意味を持たせたいとき`  
`--color-accent-danger: red (問い合わせフォームのエラー文、必須ボタン、エラー赤枠等)`  
`--color-accent-information: blue`
```
--font-noto-sans
--font-poppins
```
```
--color-background-yellow: #202124;
--error-code-color: #9aa0a6;
--heading-color: #202124;
--link-color: #000;
--text-color: #555;
```

***

## 5. 画像
### ファイル名・ディレクトリ名
[共通の命名規則](#共通の命名規則)を使用  

#### ファイル名
略語はなるべく使わない（単語が長い場合等は除く：background等）  
例：セクション名 ”company”
- ロゴ → company-logo.svg
- 写真、図、イラスト → company-image.jpg, company-image01.jpg
- アイコン → company-icon.svg
- タイトル →company-title.svg
- 背景→company-bg.png
- ボタン →company-button.png
- バナー →company-banner.png
- テキスト →company-text.svg  
※画像が多い際はフォルダで分け、画像のセクション名は除く。  
例：images/top/company/logo.svg

#### ページ
ページごとにディレクトリを作る
- images/top/
- images/about/
- images/contact/

#### 共通パーツ
共通パーツはcommon/にまとめる
- images/common/arrow.svg
- images/common/header/logo.svg
- images/common/footer/logo.svg
- images/common/contact/button.svg

#### SP
拡張子の前に-spをつける
- company-logo-sp.svg

### ファイルフォーマットの選び方

### ファイルの軽量化
- webp変換: https://squoosh.app/
- TinyPNG: https://tinypng.com/

***

## 6. git

### 基本的なgit流れ
◎gitの参考になるサイト→[参考サイト](https://qiita.com/yukiya1006/items/4a491df3595662d8f781)
1. screewのプロジェクトごとのリポジトリにあわせてローカルにファイル一式をクローンする
`git clone ssh://screew_u00@a.scrw.io:11111/screew/sites/n222222/test/.git/`
1. 開発
1. 追加・変更点をステージング  
▼ファイル単位で指定  
`git add [ファイル名]`    
▼変更したファイルをすべて指定  
`git add --all`    
1. コミット（編集作業をローカルリポジトリに記録させること）  
`git commit -m "メッセージ"`    
1. プッシュ（screewのリポジトリにプッシュする）  
`git push`    
1. パスワードが要求されるのでscreewでログインするパスワードを入力してね  
`screew_uユーザー番号@a.scrw.io's password: ◯◯◯`

### commit ルール について
ルール
1. コミットは追加や修正、削除など細かい粒度で行う 複数のタスクが混ざっているコミットは NG
1. コミットの種別を英単語の動詞で示す（Fix、Add、Removeなど）  
種別英単語＋内容 で記述する

`[Fix]`：(バグやミスの) 修正  
※軽微な問題の修正やちょっとしたエラーの解決などはこれでコミット、タイプミスの修正もこれ  
`[Add]`　(ファイルや機能の) 追加  
`[Remove]` ：(コードやファイルの) 削除  
`[Update]` ：(Fixではないコードや機能の) 修正改善　作成途中　更新作業等  
`[Upgrade]`：(パッケージやドキュメントなどの) 更新  
例：コミットの書き方  
`git commit -m "[Fix] headerが追従しない不具合を修正"`

***