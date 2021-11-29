# YouTube見どころピッカー
## ツールの概要
YouTubeで**他の視聴者がおすすめする見どころ**（再生時刻を含むコメント）を抽出します。
## 具体的な機能
拡張機能をクリックすると出現するポップアップに、現在見ている動画に対する他の視聴者の**コメントの中から再生時間を含むもののみ**に絞って表示され（評価順50件の中から抜粋）、の**時刻部分の青字をクリックするとその時刻にジャンプ**できます。

<img width="960" alt="使用イメージ" src="https://user-images.githubusercontent.com/53012895/143849220-603de17f-329b-40e3-ac9f-9e473bd126e5.png">

## 使用言語・OSなど
* 使用言語：JavaScript, HTML, CSS
* 動作OS：Windows11（バージョン21H2）
* 動作ブラウザ：Google Chrome(96.0.4664.45 (Official Build) （64 ビット） (cohort: 96_win_45))
## 注力した点
コメントの取得方法。**YouTube Data API**を用いたが、リクエストURLにおけるクエリストリングの指定方法などの仕様の説明が不明瞭で戸惑った。またYouTubeの再生時刻の表現が、分単位において10分未満の場合"09"などではなく1桁の0~9であらわされるため、コメントからの正規表現による時刻文字列の抽出に少し戸惑った。
