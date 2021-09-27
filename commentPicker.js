const API_KEY = "AIzaSyCMTpJFgAHRaYjZOfp7665fgl1h-U5d1Ws";
chrome.tabs.query({active: true, currentWindow: true}).then(tabs => {
    const currentUrl = tabs[0].url;
    //現在のURLがYouTubeの動画ページなら
    if (currentUrl.indexOf('https://www.youtube.com/watch') == 0) {
        //動画のID取得
        let videoID = currentUrl.split('v=')[1].split('&')[0];
            
        let API_URL = 'https://www.googleapis.com/youtube/v3/commentThreads?key=' + API_KEY + '&textFormat=plainText&part=snippet&videoId=' + videoID + '&maxResults=50&order=relevance';
        
        //ポップアップ上のコメント表示要素
        const commentsList = document.getElementById('commentsList');
        
        //時刻文字列検知用正規表現：0:00 ~ 59:59
        const timeRegex = /([0-9]|[1-5][0-9]):[0-5][0-9]/g;
        
        //APIにコメントリクエスト
        fetch(API_URL).then(response => response.json()).then(data => {
            
            //各者のコメント関連データ(JSON)からそれぞれ
            for (let i = 0; i < data.items.length; i++) {
                //コメント抽出
                let comment = data.items[i].snippet.topLevelComment.snippet.textDisplay;
                
                //コメントが時刻を含めば
                if (comment.match(timeRegex)) {

                    //innerHTML代入用にコメントに含まれる改行コードをJS版からHTML版に変換
                    comment = comment.replace(/\n/g, '<br>');
                    
                    //コメントの時刻部分をspanタグで囲んで青くする
                    comment =  comment.replace(timeRegex, str => {
                        return "<span style=\"color:dodgerblue;\">" + str + "</span>";
                    });
                    
                    //箇条書き生成
                    let bulletItem = document.createElement('li');
                    bulletItem.innerHTML = comment;
                    commentsList.appendChild(bulletItem);
                }
                
            }
        }).then(() => {
            //span要素（時刻部分）のどれかがクリックされたら
            Array.from(document.getElementsByTagName('span')).forEach(span => {
                span.addEventListener('click', () => {
                    chrome.scripting.executeScript({
                        target: {tabId: tabs[0].id},
                        func: (timeToJump) => {
                            [mins, secs] = timeToJump.split(':');
                            document.getElementsByTagName('video')[0].currentTime = (parseInt(mins) * 60 + parseInt(secs)).toString();
                        },
                        args: [span.innerHTML]
                    });
                });
            });            
        });        
    }
});