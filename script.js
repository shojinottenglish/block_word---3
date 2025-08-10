const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const attemptsDisplay = document.getElementById('attempts');
const infoText = document.getElementById('info-text');
const startButton = document.getElementById('startButton');

// === 単語リスト ===
// 提供された単語リストをJavaScriptオブジェクトの配列として定義
const wordList = [
    { english: 'am', japanese: '午前' },
    { english: 'about', japanese: 'について、に関する' },
    { english: 'activity', japanese: '活動' },
    { english: 'actor', japanese: '俳優' },
    { english: 'after', japanese: '～のあとに' },
    { english: 'afternoon', japanese: '午後' },
    { english: 'again', japanese: 'もう一度、再び、また' },
    { english: 'against', japanese: 'に対抗して、反対して' },
    { english: 'age', japanese: '年齢' },
    { english: 'all', japanese: '全部、全員、全て、みな' },
    { english: 'along', japanese: 'に沿って' },
    { english: 'also', japanese: 'もまた' },
    { english: 'also', japanese: 'さらに' },
    { english: 'always', japanese: 'いつも' },
    { english: 'am', japanese: 'です、ます' },
    { english: 'am', japanese: 'にいる、ある' },
    { english: 'an', japanese: '1つの、1人の' },
    { english: 'and', japanese: 'それと' },
    { english: 'and', japanese: 'そして、それから' },
    { english: 'and so on', japanese: 'など' },
    { english: 'animal', japanese: '動物' },
    { english: 'another', japanese: 'ほかの、別の' },
    { english: 'apple', japanese: 'りんご' },
    { english: 'April', japanese: '４月' },
    { english: 'apron', japanese: 'エプロン、前かけ' },
    { english: 'are', japanese: 'です、ます' },
    { english: 'are', japanese: 'にいる、ある' },
    { english: 'area', japanese: '区域、場所、地域' },
    { english: 'around', japanese: 'の近くに' },
    { english: 'around', japanese: 'のまわりを回って' },
    { english: 'around', japanese: 'のあちこちに' },
    { english: 'around', japanese: 'あちこち、めぐって' },
    { english: 'art', japanese: '美術' },
    { english: 'as', japanese: 'として' },
    { english: 'at', japanese: '【場所】に、で' },
    { english: 'at', japanese: '【時刻・年齢】に' },
    { english: 'at', japanese: '【方向】をめがけて、に向かって' },
    { english: 'ate', japanese: '食べた（過去形）' },
    { english: 'August', japanese: '8月' },
    { english: 'autumn', japanese: '秋' },
    { english: 'away', japanese: 'はなれて、去って' },
    { english: 'back', japanese: '戻って、返して' },
    { english: 'bad', japanese: '悪い' },
    { english: 'That\'s too bad', japanese: 'それはいけませんね。' },
    { english: 'bag', japanese: 'かばん' },
    { english: 'baseball', japanese: '野球' },
    { english: 'bath', japanese: '入浴' },
    { english: 'be', japanese: 'である、になる' },
    { english: 'beach', japanese: '浜、海辺' },
    { english: 'bean', japanese: '豆' },
    { english: 'bear', japanese: 'クマ' },
    { english: 'beautiful', japanese: '美しい' },
    { english: 'become', japanese: 'になる' },
    { english: 'bed', japanese: 'ベッド' },
    { english: 'before', japanese: 'の前に' },
    { english: 'behind', japanese: 'の後ろに' },
    { english: 'best', japanese: '最も良い' },
    { english: 'do one\'s best', japanese: '最善をつくす' },
    { english: 'bicycle', japanese: '自転車' },
    { english: 'big', japanese: '大きい' },
    { english: 'bike', japanese: '自転車' },
    { english: 'bird', japanese: '鳥' },
    { english: 'birthday', japanese: '誕生日' },
    { english: 'black', japanese: '黒い' },
    { english: 'blue', japanese: '青い' },
    { english: 'body', japanese: '身体' },
    { english: 'book', japanese: '本' },
    { english: 'bookstore', japanese: '本屋' },
    { english: 'borrow', japanese: 'を借りる' },
    { english: 'bought', japanese: '買った（過去形）' },
    { english: 'box', japanese: '箱' },
    { english: 'boy', japanese: '少年' },
    { english: 'bread', japanese: 'パン' },
    { english: 'breakfast', japanese: '朝食' },
    { english: 'brother', japanese: '兄弟' },
    { english: 'brown', japanese: '茶色' },
    { english: 'brush', japanese: 'をみがく' },
    { english: 'build', japanese: 'を建てる' },
    { english: 'busy', japanese: '忙しい' },
    { english: 'but', japanese: 'しかし、けれども' },
    { english: 'buy', japanese: 'を買う' },
    { english: 'by', japanese: '【手段・方法・原因】によって' },
    { english: 'by', japanese: '【場所】のそばに' },
    { english: 'cake', japanese: 'ケーキ' },
    { english: 'came', japanese: '来た（過去形）' },
    { english: 'can', japanese: '【能力・可能】することができる' },
    { english: 'cannot', japanese: 'できない' },
    { english: 'cap', japanese: '帽子' },
    { english: 'car', japanese: '自動車' },
    { english: 'care', japanese: '世話' },
    { english: 'take care of', japanese: 'を大事にする' },
    { english: 'careful', japanese: '注意深い' },
    { english: 'cat', japanese: '猫' },
    { english: 'chair', japanese: 'いす' },
    { english: 'chicken', japanese: '鶏肉' },
    { english: 'child', japanese: '子供' },
    { english: 'children', japanese: '子供たち' },
    { english: 'choose', japanese: 'を選ぶ' },
    { english: 'city', japanese: '市、都会、都会' },
    { english: 'classmate', japanese: '同級生' },
    { english: 'classroom', japanese: '教室' },
    { english: 'clean', japanese: 'きれいな、清潔な' },
    { english: 'clean', japanese: 'きれいにする' },
    { english: 'climb', japanese: 'を登る' },
    { english: 'clothes', japanese: '服' },
    { english: 'cloudy', japanese: '曇った' },
    { english: 'cold', japanese: '冷たい、寒い' },
    { english: 'collect', japanese: 'を集める' },
    { english: 'come', japanese: '来る' },
    { english: 'cook', japanese: '料理する' },
    { english: 'cool', japanese: 'かっこいい' },
    { english: 'could', japanese: 'できた' },
    { english: 'country', japanese: '国' },
    { english: 'of course', japanese: 'もちろん' },
    { english: 'cousin', japanese: 'いとこ' },
    { english: 'cow', japanese: 'ウシ' },
    { english: 'cup', japanese: 'カップ' },
    { english: 'cute', japanese: 'かわいい' },
    { english: 'date', japanese: '日、日付' },
    { english: 'day', japanese: '日、１日' },
    { english: 'dear', japanese: '親愛なる' },
    { english: 'December', japanese: '12月' },
    { english: 'delicious', japanese: 'おいしい' },
    { english: 'desk', japanese: '机' },
    { english: 'dictionary', japanese: '辞書' },
    { english: 'different', japanese: '色々な、違った' },
    { english: 'difficult', japanese: '難しい' },
    { english: 'dinner', japanese: '夕食' },
    { english: 'dish', japanese: '皿、料理' },
    { english: 'do', japanese: 'をする、行う' },
    { english: 'doctor', japanese: '医者' },
    { english: 'dog', japanese: 'イヌ' },
    { english: 'door', japanese: '戸' },
    { english: 'down', japanese: '下に' },
    { english: 'down', japanese: 'に沿って' },
    { english: 'drama', japanese: '劇' },
    { english: 'draw', japanese: '描く、引く' },
    { english: 'dream', japanese: '夢' },
    { english: 'drink', japanese: 'を飲む' },
    { english: 'drop', japanese: 'を落とす' },
    { english: 'drum', japanese: '太鼓、ドラム' },
    { english: 'during', japanese: '～の間' },
    { english: 'each', japanese: 'それぞれの、各自の' },
    { english: 'each other', japanese: 'お互いに' },
    { english: 'ear', japanese: '耳' },
    { english: 'early', japanese: '早く' },
    { english: 'early', japanese: '早い' },
    { english: 'easily', japanese: '簡単に' },
    { english: 'eat', japanese: 'を食べる、食事をする' },
    { english: 'egg', japanese: '卵' },
    { english: 'eight', japanese: '8' },
    { english: 'eighteen', japanese: '18' },
    { english: 'eighth', japanese: '8番目' },
    { english: 'eighty', japanese: '80' },
    { english: 'elementary school', japanese: '小学校' },
    { english: 'eleven', japanese: '11' },
    { english: 'eleventh', japanese: '11番目' },
    { english: 'end', japanese: '最後' },
    { english: 'English', japanese: '英語' },
    { english: 'enjoy', japanese: 'を楽しむ' },
    { english: 'evening', japanese: '夕方' },
    { english: 'event', japanese: '行事' },
    { english: 'every', japanese: '毎、ごとに' },
    { english: 'everyone', japanese: 'みんな' },
    { english: 'excited', japanese: 'わくわくした' },
    { english: 'exciting', japanese: '興奮させる' },
    { english: 'excuse', japanese: 'を許す' },
    { english: 'eye', japanese: '目、視力' },
    { english: 'face', japanese: '顔' },
    { english: 'fall', japanese: '転ぶ、転倒する' },
    { english: 'fall', japanese: '秋' },
    { english: 'fall down', japanese: '倒れる' },
    { english: 'family', japanese: '家族' },
    { english: 'famous', japanese: '有名な' },
    { english: 'farmer', japanese: '農場主' },
    { english: 'fast', japanese: '速い' },
    { english: 'father', japanese: '父' },
    { english: 'favorite', japanese: '好きな、お気に入りの' },
    { english: 'February', japanese: '2月' },
    { english: 'feel', japanese: 'と感じる' },
    { english: 'felt', japanese: '感じた' },
    { english: 'festival', japanese: '祭り' },
    { english: 'fever', japanese: '熱' },
    { english: 'fifteen', japanese: '15' },
    { english: 'fifth', japanese: '5番目' },
    { english: 'fifty', japanese: '50' },
    { english: 'fine', japanese: '元気な' },
    { english: 'first', japanese: '1番め、最初' },
    { english: 'fish', japanese: '魚' },
    { english: 'five', japanese: '5' },
    { english: 'flower', japanese: '花' },
    { english: 'food', japanese: '食べ物' },
    { english: 'for', japanese: 'として' },
    { english: 'foreign', japanese: '外国の' },
    { english: 'forget', japanese: 'を忘れる' },
    { english: 'forty', japanese: '40' },
    { english: 'forward', japanese: '前方へ' },
    { english: 'look forward to ...', japanese: 'を楽しみに待つ' },
    { english: 'four', japanese: '4' },
    { english: 'fourteen', japanese: '14' },
    { english: 'fourth', japanese: '4番目' },
    { english: 'free', japanese: 'ひまな' },
    { english: 'Friday', japanese: '金曜日' },
    { english: 'friend', japanese: '友達' },
    { english: 'frog', japanese: 'カエル' },
    { english: 'from', japanese: '【時間】から' },
    { english: 'from', japanese: '【場所】から' },
    { english: 'front', japanese: '前、正面' },
    { english: 'fruit', japanese: '果物' },
    { english: 'fun', japanese: '楽しい' },
    { english: 'funny', japanese: 'おかしな' },
    { english: 'future', japanese: '未来' },
    { english: 'garbage', japanese: 'ゴミ' },
    { english: 'gave', japanese: '与えた' },
    { english: 'get', japanese: 'を得る' },
    { english: 'get', japanese: 'になる' },
    { english: 'get', japanese: '着く、到着する' },
    { english: 'girl', japanese: '少女' },
    { english: 'give', japanese: 'を与える、渡す' },
    { english: 'go', japanese: '行く' },
    { english: 'good', japanese: '良い' },
    { english: 'good', japanese: '元気な' },
    { english: 'got', japanese: '得た' },
    { english: 'grandfather', japanese: '祖父' },
    { english: 'grandmother', japanese: '祖母' },
    { english: 'grape', japanese: 'ブドウ' },
    { english: 'great', japanese: 'すばらしい' },
    { english: 'green', japanese: '緑' },
    { english: 'guess', japanese: 'を推測する' },
    { english: 'had', japanese: '持った' },
    { english: 'hair', japanese: '髪' },
    { english: 'half', japanese: '半分、2分の1' },
    { english: 'hall', japanese: '会館、ホール' },
    { english: 'hand', japanese: '手' },
    { english: 'happy', japanese: '幸せな、うれしい、楽しい' },
    { english: 'hard', japanese: '熱心に、一生懸命に' },
    { english: 'hard', japanese: 'かたい' },
    { english: 'hat', japanese: '帽子' },
    { english: 'have', japanese: 'を持っている' },
    { english: 'have', japanese: 'を食べる、飲む' },
    { english: 'have', japanese: 'を開催する' },
    { english: 'he', japanese: '彼は' },
    { english: 'head', japanese: '頭' },
    { english: 'headache', japanese: '頭痛' },
    { english: 'heart', japanese: '心' },
    { english: 'help', japanese: 'を手伝う、助ける' },
    { english: 'here', japanese: 'ここに' },
    { english: 'hers', japanese: '彼女のもの' },
    { english: 'him', japanese: '彼を' },
    { english: 'his', japanese: '彼の' },
    { english: 'his', japanese: '彼のもの' },
    { english: 'history', japanese: '歴史' },
    { english: 'homework', japanese: '宿題' },
    { english: 'hope', japanese: 'を望む' },
    { english: 'horse', japanese: '馬' },
    { english: 'hospital', japanese: '病院' },
    { english: 'hot', japanese: '暑い' },
    { english: 'hour', japanese: '1時間' },
    { english: 'house', japanese: '家、住宅' },
    { english: 'how', japanese: 'どんな' },
    { english: 'hundred', japanese: '百' },
    { english: 'hungry', japanese: '空腹の、飢えた' },
    { english: 'I', japanese: '私は[が]' },
    { english: 'ice', japanese: '氷' },
    { english: 'idea', japanese: '考え' },
    { english: 'important', japanese: '重要な、大切な' },
    { english: 'in', japanese: '中に' },
    { english: 'information', japanese: '情報' },
    { english: 'interested in', japanese: '興味をもっている' },
    { english: 'interesting', japanese: '興味深い' },
    { english: 'is', japanese: 'です、ます' },
    { english: 'is', japanese: 'にいる、ある' },
    { english: 'island', japanese: '島' },
    { english: 'it', japanese: 'それを' },
    { english: 'it', japanese: 'それは' },
    { english: 'its', japanese: 'それの、その' },
    { english: 'January', japanese: '1月' },
    { english: 'Japan', japanese: '日本' },
    { english: 'Japanese', japanese: '日本の' },
    { english: 'Japanese', japanese: '日本語、日本人' },
    { english: 'job', japanese: '仕事' },
    { english: 'join', japanese: 'に参加する' },
    { english: 'July', japanese: '7月' },
    { english: 'jump', japanese: '跳ぶ' },
    { english: 'June', japanese: '6月' },
    { english: 'junior', japanese: '年下の' },
    { english: 'junior high school', japanese: '中学校' },
    { english: 'just', japanese: 'ちょうど、まさに' },
    { english: 'kind', japanese: '親切な' },
    { english: 'king', japanese: '王様' },
    { english: 'knee', japanese: 'ひざ' },
    { english: 'know', japanese: 'を知っている' },
    { english: 'lake', japanese: '湖' },
    { english: 'language', japanese: '言葉' },
    { english: 'large', japanese: '大きい、広い' },
    { english: 'last', japanese: 'この前の' },
    { english: 'later', japanese: '～の後で' },
    { english: 'leave', japanese: '去る' },
    { english: 'left', japanese: '左' },
    { english: 'leg', japanese: '脚' }
];

// ゲームの状態変数
let score = 0;
let attempts = 3; // 試行回数
let gameInterval;
let gameStarted = false; // ボールが発射されたかどうかを管理
let targetWord = null; // 目標となる単語オブジェクト { english: '', japanese: '' }
let wordsGuessedCorrectly = new Set(); // 正しく当てた英単語のセット
let currentRoundBricks = []; // 現在のラウンドの4つのブロック

// ボールの初期速度と最大速度を定義
const INITIAL_BALL_SPEED = 3;
const MAX_BALL_SPEED = 15; // ボールの最大速度を設定（適宜調整してください）

// パドルの設定
const paddle = {
    x: canvas.width / 2 - 100,
    y: canvas.height - 60, // パドルの縦サイズを大きくしたので、Y座標を少し上へ調整
    width: 200,
    height: 35, // パドルの縦の大きさを増やす (25 -> 35)
    speed: 7, // パドルの速度
    dx: 0 // x方向の移動量
};

// ボールの設定
const ball = {
    x: canvas.width / 2,
    y: canvas.height - 75, // ボールの初期位置をパドルに合わせて調整
    radius: 12,
    speed: INITIAL_BALL_SPEED, // 初期速度を使用
    dx: 0,
    dy: 0
};

// ブロックの設定
const brick = {
    width: 140,
    height: 50,
    padding: 25,
    visible: true // ブロックの表示状態
};

// 配列をシャッフルする関数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 新しいラウンドのための4つのブロックを生成
function createBricksForRound() {
    currentRoundBricks = []; // 前のラウンドのブロックをクリア

    // まだ正解されていない単語の中からターゲットを選ぶ
    const availableWordsForTarget = wordList.filter(
        (word) => !wordsGuessedCorrectly.has(word.english)
    );

    if (availableWordsForTarget.length === 0) {
        // 全ての単語が正解された場合
        endGame(`ゲームクリア！全ての単語をマスターしました！スコア: ${score}`);
        return;
    }

    // ターゲット単語を選択
    const randomIndex = Math.floor(Math.random() * availableWordsForTarget.length);
    targetWord = availableWordsForTarget[randomIndex];

    // ダミーの単語（間違いの選択肢）を選ぶ
    const distractors = [];
    const tempWordList = wordList.filter(
        (word) => word.english !== targetWord.english && !wordsGuessedCorrectly.has(word.english)
    );
    const shuffledTempWordList = shuffleArray(tempWordList);

    // 3つのダミーを確保 (単語リストが少ない場合は不足する可能性もあるため、最大3つ)
    for (let i = 0; i < 3 && i < shuffledTempWordList.length; i++) {
        distractors.push(shuffledTempWordList[i]);
    }

    // 正解の単語とダミーの単語を合わせた配列
    let roundWords = [{ english: targetWord.english, japanese: targetWord.japanese }];
    roundWords = roundWords.concat(distractors);
    
    // roundWordsの数が4未満の場合、重複を許して単語を追加して4つにする
    while(roundWords.length < 4 && wordList.length > 0) {
        const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        // 重複チェック
        if (!roundWords.some(w => w.english === randomWord.english)) {
            roundWords.push(randomWord);
        } else {
            // もし重複していて、かつ単語リストにまだ追加できる単語がある場合、
            // すでに存在しない単語を選び直すために、wordListをフルで使って再選択を試みる
            const tempAllWords = [...wordList]; // 全単語を一時的にコピー
            const availableToAddToRound = tempAllWords.filter(w => !roundWords.some(rw => rw.english === w.english));
            if (availableToAddToRound.length > 0) {
                roundWords.push(availableToAddToRound[Math.floor(Math.random() * availableToAddToRound.length)]);
            } else {
                // すでに全単語がroundWordsにあるか、それ以外に選択肢がない場合
                // 重複を許して追加する（ただし、これはクイズとしては望ましくないが、ブロック数を確保するため）
                // 実際にはwordListを十分大きくすることが推奨される
                roundWords.push(randomWord); // 重複を許容
            }
        }
    }

    // 最終的に4つになるように調整 (もしdistractorsが3つ取れなかった場合)
    if (roundWords.length > 4) {
        roundWords = roundWords.slice(0, 4);
    } else if (roundWords.length < 4) {
        // 重複を許してでも4つにするための最終手段
        const missingCount = 4 - roundWords.length;
        for (let i = 0; i < missingCount; i++) {
            roundWords.push(wordList[Math.floor(Math.random() * wordList.length)]);
        }
    }


    // ブロックの表示順をシャッフル
    const shuffledRoundWords = shuffleArray(roundWords);

    // 4つのブロックを横一列に配置するための計算
    const totalBrickWidth = 4 * brick.width + 3 * brick.padding;
    const startX = (canvas.width - totalBrickWidth) / 2;
    const yPosition = canvas.height / 3; // 画面上部1/3くらいの高さに固定

    for (let i = 0; i < shuffledRoundWords.length; i++) {
        const word = shuffledRoundWords[i];
        const x = startX + i * (brick.width + brick.padding);
        currentRoundBricks.push({
            x,
            y: yPosition,
            status: 1, // 常に表示
            english: word.english,
            japanese: word.japanese
        });
    }

    infoText.textContent = `目指す単語: 「${targetWord.japanese}」の英単語ブロックを当てよう！`;
}

// パドルを描画
function drawPaddle() {
    ctx.beginPath();
    ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 5); // 角丸の長方形
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();

    // パドルにターゲット単語の日本語訳を表示
    if (targetWord) {
        // テキストの最大幅を考慮
        const maxTextWidth = paddle.width - 10; // パドル幅から余白を引く
        let fontSize = 28; // 初期フォントサイズ
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = '#FFFFFF'; // 白文字
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // テキストが長すぎる場合はフォントサイズを調整
        while (ctx.measureText(targetWord.japanese).width > maxTextWidth && fontSize > 8) {
            fontSize--;
            ctx.font = `${fontSize}px Arial`;
        }
        
        // パドルの中心にテキストを描画
        ctx.fillText(targetWord.japanese, paddle.x + paddle.width / 2, paddle.y + paddle.height / 2);
    }
}

// ボールを描画
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

// ブロックを描画（currentRoundBricksを使用）
function drawBricks() {
    currentRoundBricks.forEach(b => {
        if (b.status === 1) { // 表示されているブロックのみ描画
            ctx.beginPath();
            ctx.roundRect(b.x, b.y, brick.width, brick.height, 5); // 角丸の長方形
            ctx.fillStyle = '#f0ad4e'; // ブロックの色
            ctx.fill();
            ctx.closePath();

            // 英単語を描画
            ctx.font = '24px Arial'; // フォントサイズ
            ctx.fillStyle = '#000000'; // 黒文字
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(b.english, b.x + brick.width / 2, b.y + brick.height / 2);
        }
    });
}

// スコアを表示
function drawScore() {
    scoreDisplay.textContent = `スコア: ${score}`;
}

// 試行回数を表示
function drawAttempts() {
    attemptsDisplay.textContent = `残機: ${attempts}`;
}

// パドルを移動
function movePaddle() {
    paddle.x += paddle.dx;

    // 壁との衝突判定
    if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    }
}

// ボールを移動
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // 壁との衝突判定 (左右)
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1; // x方向を反転
    }

    // 壁との衝突判定 (上)
    if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }
    // 下の壁（ミス）
    else if (ball.y + ball.radius > canvas.height) {
        attempts--;
        drawAttempts();
        if (attempts === 0) {
            endGame(`ゲームオーバー！スコア: ${score}`);
        } else {
            resetBallFromPaddle(); // ボールをパドルから再発射できるようにリセット
            infoText.textContent = `ボールが落ちました！残機: ${attempts}。スペースキーで再開。`;
        }
    }

    // パドルとの衝突判定
    if (
        ball.x - ball.radius < paddle.x + paddle.width &&
        ball.x + ball.radius > paddle.x &&
        ball.y + ball.radius > paddle.y &&
        ball.y - ball.radius < paddle.y + paddle.height
    ) {
        ball.dy *= -1; // Y方向を反転
        // ボールのx方向の速度をパドルの衝突位置に応じて調整
        const collidePoint = ball.x - (paddle.x + paddle.width / 2);
        // ボールの現在の速度を使ってdxを更新
        ball.dx = (collidePoint * 0.1) * (ball.speed / INITIAL_BALL_SPEED); // スピードに応じて相対速度を調整
    }

    // ブロックとの衝突判定
    currentRoundBricks.forEach(b => {
        if (b.status === 1) { // 表示されているブロックのみ衝突判定
            if (
                ball.x - ball.radius < b.x + brick.width &&
                ball.x + ball.radius > b.x &&
                ball.y - ball.radius < b.y + brick.height &&
                ball.y + ball.radius > b.y
            ) {
                // ボールの中心とブロックの中心の相対位置を計算
                const ballCenterX = ball.x;
                const ballCenterY = ball.y;
                const brickCenterX = b.x + brick.width / 2;
                const brickCenterY = b.y + brick.height / 2;

                const dxCollision = Math.abs(ballCenterX - brickCenterX) - (brick.width / 2 + ball.radius);
                const dyCollision = Math.abs(ballCenterY - brickCenterY) - (brick.height / 2 + ball.radius);

                // 衝突面を決定 (より浅いめり込み量で判断)
                if (dxCollision > dyCollision) { // 横方向からの衝突が主
                    ball.dx *= -1; // X方向を反転
                } else { // 縦方向からの衝突が主
                    ball.dy *= -1; // Y方向を反転
                }


                if (targetWord && b.english === targetWord.english) {
                    // 正解のブロックを当てた場合
                    b.status = 0; // ブロックを非表示にする
                    score += 10;
                    drawScore();
                    wordsGuessedCorrectly.add(targetWord.english); // 正解リストに追加
                    infoText.textContent = `正解！「${targetWord.japanese}」を当てました！`;
                    resetBallFromPaddle(); // ボールをパドルから再発射できるようにリセット
                    createBricksForRound(); // 新しいラウンドを開始 (新しいターゲットとブロックを生成)
                } else {
                    // 不正解のブロックを当てた場合
                    score = Math.max(0, score - 5); // スコアを5点減少。0点以下にはならないようにする
                    drawScore();
                    infoText.textContent = `不正解！スコアが5点減りました: ${score}点。ボールのスピードが上がりました！`;
                    // ボールのスピードを1.5倍にする（最大速度まで）
                    ball.speed = Math.min(MAX_BALL_SPEED, ball.speed * 1.5);
                    // 速度が変わったので、現在のdx/dyも新しい速度に合わせて調整
                    // ただし、既に衝突判定で反転しているので、その方向を維持しつつ速度だけ調整する
                    ball.dx = (ball.dx > 0 ? 1 : -1) * ball.speed;
                    ball.dy = (ball.dy > 0 ? 1 : -1) * ball.speed;
                }
            }
        }
    });
}

// ボールをパドルから再発射できるようにリセットする関数
function resetBallFromPaddle() {
    ball.x = paddle.x + paddle.width / 2; // パドルの中心にリセット
    ball.y = paddle.y - ball.radius; // パドルのすぐ上にリセット
    ball.dx = 0; // ボールを静止状態にする
    ball.dy = 0; // ボールを静止状態にする
    ball.speed = INITIAL_BALL_SPEED; // ボールのスピードを初期値に戻す
    gameStarted = false; // ボールが打ち出されるまでゲームは一時停止
}

// すべてを描画
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
    drawPaddle();
    drawBall();
    drawBricks();
    drawScore();
    drawAttempts();
}

// ゲームの状態を更新
function update() {
    movePaddle();
    // gameStartedがtrueの場合のみボールを動かす
    if (gameStarted) {
        moveBall();
    }
    draw();
    gameInterval = requestAnimationFrame(update);
}

// キーボードイベントリスナー
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    } else if (e.key === ' ' && !gameStarted) { // スペースキーでボールを打ち出す
        if (attempts > 0) { // 残機がある場合のみ
            // ボールを発射
            ball.dx = (Math.random() < 0.5 ? 1 : -1) * ball.speed;
            ball.dy = -ball.speed; // 上方向に発射
            gameStarted = true; // ゲーム開始状態にする
            // update() はすでに requestAnimationFrame で呼び出されているので不要
        }
    }
}

function keyUp(e) {
    if (
        e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft'
    ) {
        paddle.dx = 0;
    }
}

// ゲーム開始処理
function startGame() {
    score = 0;
    attempts = 3;
    wordsGuessedCorrectly.clear(); // 正解済みの単語をリセット
    drawScore();
    drawAttempts();

    createBricksForRound(); // 最初のラウンドのブロックを生成
    resetBallFromPaddle(); // ボールをパドルから発射できるようにリセット (gameStarted=falseになる)

    startButton.style.display = 'none'; // スタートボタンを非表示にする
    infoText.textContent = `ゲームスタート！スペースキーでボールを打ち出して、「${targetWord.japanese}」の英単語ブロックを当てよう！`;
    update(); // ゲームループを開始（ボールはスペースキーで発射されるまで静止）
}

// ゲーム終了処理
function endGame(message) {
    cancelAnimationFrame(gameInterval);
    gameStarted = false;
    infoText.textContent = message + ' スタートボタンを押して、もう一度プレイ！';
    startButton.style.display = 'block'; // スタートボタンを再表示
}

// ゲームの初期化
function initGame() {
    wordsGuessedCorrectly.clear(); // 初回ロード時もクリア
    currentRoundBricks = []; // 初回ロード時もブロックをクリア
    targetWord = null; // ターゲット単語をクリア
    resetBallFromPaddle(); // 初期表示のためにボールをパドル上に配置（静止状態）
    // ball.dx と ball.dy は resetBallFromPaddle で 0 に設定される
    // gameStarted も resetBallFromPaddle で false に設定される

    draw(); // 初期状態を描画
    infoText.textContent = 'ゲームを開始するにはスタートボタンを押してください。';
    startButton.style.display = 'block';
    startButton.onclick = startGame; // スタートボタンのクリックでstartGameを呼び出す
}

// ウィンドウがロードされたらゲームを初期化
window.onload = initGame;
