const gameData = {
    roles: [
        {
            no: 1,
            id: "assassin",
            name: "暗殺者",
            enName: "The Assassin",
            category: "アタッカー",
            hp: 4,
            summary: "相手を推殺せよ",
            victory: "アクション：他プレイヤー1人の非公開の役職を1つ宣言できる。正解なら対象に[ダメージ]5、外れたなら自分に[ダメージ]2。この効果によって他プレイヤーが脱落したなら、自分は勝利する。",
            skill: "他1人：次のラウンド終了後まで、役職を公開不可。その後、自分は追加で1アクション行ってもよい。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>固有のアクションで、他プレイヤーの非公開役職を推理して宣言する役職です。</li>
                    <li>正解なら対象に[ダメージ]5、外れたなら自分に[ダメージ]2を受けます。この効果によって他プレイヤーが脱落したなら勝利します。</li>
                    <li>公開時スキルにより、他プレイヤー1人の役職公開を次のラウンド終了後まで封じ、さらに追加で即座に1アクションを行うことができます。</li>
                    <li>固有のアクションは、通常のアクション（スキル、攻撃、集中、公開）の代わりとして行います。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>役職公開時に相手の公開を封じつつ、即座に追加アクションが得られるため、テンポを失わずに攻撃や推理アクションを仕掛けられます。</li>
                            <li>正解時の5ダメージは強力で、削れた相手をそのまま暗殺して一撃勝利を狙えます。</li>
                            <li>外れた場合の反動も2ダメージと軽いため、候補が絞れた段階で積極的に宣言を狙う戦術が有効です。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            no: 2,
            id: "saint",
            name: "聖女",
            enName: "The Saint",
            category: "サポート",
            hp: 6,
            summary: "この舞踏会に平和を",
            victory: "ターン終了時：すべてのプレイヤーの現在の体力が同じ",
            skill: "体力を5回復し、回復した分以下のダメージを1人に与える。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>全体のHPを均等にするという特殊な勝利条件を持ちます。</li>
                    <li>自身のスキルで5回復した後、その回復量以下のダメージを1人に与えることで、緻密に体力を揃えにいくことができます。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>公開時のスキルで回復した量以下のダメージを特定の相手1人に与えられるため、突出して体力が高い相手をピンポイントで削って全員の体力を揃えやすくなります。</li>
                            <li>スキル2で自分のHPを他人に合わせたり、スキル13で体力が最も高いプレイヤーを半減させる動きと相性抜群です。</li>
                            <li>ゴーレムがいる場合、ダメージが2に制限される点に注意して調整する必要があります。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            no: 3,
            id: "berserker",
            name: "狂戦士",
            enName: "The Berserker",
            category: "アタッカー",
            hp: 5,
            summary: "力こそパワー",
            victory: null,
            skill: "体力をすべて回復する。",
            passive: "与えるすべてのダメージが+2、受けるすべてダメージが+1",
            overview: `
                <ul class="wiki-list">
                    <li>すべてのダメージを増やし、受けるダメージも増える高火力・高リスクの役職です。</li>
                    <li>固有勝利条件は持たないため、火力で他プレイヤーを脱落させることが主な目的です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>公開時の全回復で攻撃を継続し、スキル11スキル14や通常攻撃を+2して一気に脱落を狙います。</li>
                            <li>受けるダメージも+1されるため、自分の体力を過信しすぎないことが重要です。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            no: 4,
            id: "bomber",
            name: "爆弾魔",
            enName: "The Bomber",
            category: "タンク",
            hp: 4,
            summary: "気づかれないように準備せよ",
            victory: "スキルカード使用時：誰もダメージを受けなかったなら、そのカードを裏向きで自分の前に置く。ターン終了時、これが3つある。",
            skill: null,
            passive: "自分がダメージを受ける時：自分の前の裏向きのスキルカードを1枚捨てることで、そのダメージを無効にする。",
            overview: `
                <ul class="wiki-list">
                    <li>ダメージを伴わないスキルを使用することで裏向きのカードをストックし、ターン終了時に3枚で勝利します。</li>
                    <li>スキルを使用した結果、対象なしとなったりダメージを防がれたりした場合でも条件は成立します。</li>
                    <li>このストックはシールドとしても機能します。</li>
                    <li>この役職が非公開になったり交換されたとき、自分の前にある裏向きのカードは全て捨て札になります。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>ダメージを伴わないスキルを連発して盾を張る動きが有効です。</li>
                            <li>伏せカードは被ダメージを無効化する盾にもなりますが、勝利目前ではあえてダメージを受けることも必要です。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            no: 5,
            id: "golem",
            name: "ゴーレム",
            enName: "The Golem",
            category: "タンク",
            hp: 2,
            summary: "鉄壁の体で死をも防ぐ",
            victory: "ターン終了時：手札の枚数が自分のHPより2以上多い",
            skill: null,
            passive: "受ける全てのダメージの上限が2になる。",
            overview: `
                <ul class="wiki-list">
                    <li>受ける全てのダメージの上限が2になる強力な防御特性を持つ役職です。</li>
                    <li>勝利条件はターン終了時に「手札の枚数が自分のHPより2以上多い」ことです。</li>
                    <li>最大HPが2と低いため、条件達成に必要な手札枚数は比較的少なく済みますが、集中攻撃には注意が必要です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>HPが2であれば手札4枚以上、HPが1であれば手札3枚以上でターン終了時に勝利できます。</li>
                            <li>集中アクションやスキルカードを活かして手札を増やし、一気に勝利条件を満たします。</li>
                            <li>どんな大ダメージ攻撃（狂戦士の攻撃や暗殺者の5ダメージなど）も2ダメージに抑えられるため、強気に手札を溜める立ち回りが可能です。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            no: 6,
            id: "accuser",
            name: "告発者",
            enName: "The Accuser",
            category: "コントロール",
            hp: 2,
            summary: "全てを公に",
            victory: "ターン終了時：他のすべてのプレイヤーの役職カードが2枚とも公開されている",
            skill: "非公開の役職カードを1つ選び、自分だけ見る。それを公開させても良い。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>非公開の役職を1つ確認し、その情報を使って公開を迫れる情報操作型の役職です。</li>
                    <li>相手に公開させるかどうかは任意なので、暗殺者の推理材料として利用する選択もできます。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>序盤に非公開役職を1つ確認し、その情報を使って公開させる相手を選びます。</li>
                            <li>スキル5やスキル9と組み合わせると、非公開役職を残すことへの圧力を高められます。</li>
                            <li>自分のHPが2と低いため、公開を急ぎすぎず、タイミングを見極める必要があります。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            no: 7,
            id: "chronos",
            name: "クロノス",
            enName: "Chronos",
            category: "特殊",
            hp: 4,
            summary: "死を超えろ",
            victory: "脱落時：このターン終了後、追加で自分のターンを行い、自分が他1人以上を脱落させる。そのターン中、与えるすべてのダメージは2倍になる。",
            skill: "山札から1枚引く。[ダメージ]2",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>公開時に山札から1枚引きつつ自身に2ダメージを受ける、自傷と手札補充を兼ねたスキルを持ちます。</li>
                    <li>脱落時に追加ターンを獲得し、そのターン中に与えるすべてのダメージを2倍にして他プレイヤーを1人以上脱落させることで逆転勝利する役職です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>スキルの自傷を利用して能動的に自身の脱落タイミングをコントロールできます。</li>
                            <li>脱落後の追加ターンでは全ダメージが2倍になるため、通常攻撃で4ダメージ、スキル11なら6ダメージと圧倒的な火力を叩き込めます。</li>
                            <li>追加ターンで確実に誰かを倒せるよう、相手の現在HPや防御札の有無を計算に入れて脱落しましょう。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            no: 8,
            id: "necromancer",
            name: "死霊術師",
            enName: "The Necromancer",
            category: "コントロール",
            hp: 3,
            summary: "屍の上に立て",
            victory: "ターン終了時：手札が5枚以上",
            skill: "捨て札から2枚選んで、手札に加える。その後、そのうち1枚を使用しても良い。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>公開時に捨て札から2枚を回収でき、さらにそのうち1枚をそのまま使用することもできます。</li>
                    <li>ターン終了時に手札5枚以上を保持することで勝利する、リソース重視の役職です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>公開時の2枚回収を活かし、一気に手札を稼いでターン終了時の手札5枚勝利を目指します。</li>
                            <li>回収したカードを即時使用することも選べるため、状況に応じた柔軟な対応が可能です。</li>
                            <li>ラウンド終了時の手札移動（1枚キープして残りを左隣に渡す）のタイミングに注意し、自分のターン終了時に5枚揃えて勝利を決めましょう。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            no: 9,
            id: "thief",
            name: "盗賊",
            enName: "The Thief",
            category: "コントロール",
            hp: 2,
            summary: "全てを奪い取れ",
            victory: "ターン終了時：他のすべてのプレイヤーの手札の合計が4枚以下",
            skill: null,
            passive: "自分がほかプレイヤーに2以上のダメージを与えたとき、そのプレイヤーは手札を1枚捨てる。",
            overview: `
                <ul class="wiki-list">
                    <li>自分が他プレイヤーに2以上のダメージを与えるたびに、対象の手札を1枚捨てさせる永続効果を持ちます。</li>
                    <li>ターン終了時に「他のすべてのプレイヤーの手札の合計が4枚以下」であれば勝利します。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常攻撃（2ダメージ）や攻撃系スキルで継続的に相手の手札を削り、リソースを奪い尽くします。</li>
                            <li>ラウンド終了時は各プレイヤーが1枚残して他を回すため、手札が減りやすいタイミングを見計らって一気に全体の合計枚数を4枚以下に追い込みます。</li>
                            <li>最大HPが2と低いため、攻撃に専念しすぎて自身が脱落しないよう立ち回ることが肝要です。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            no: 10,
            id: "jester",
            name: "ジェスター",
            enName: "The Jester",
            category: "特殊",
            hp: 4,
            summary: "混沌に陥れろ",
            victory: "脱落時：2番目に脱落しているか、自分を含めて2人以上が脱落した",
            skill: "他1人を選び、自分か対象のどちらかを選ぶ。そのプレイヤーの現在の体力を、もう一方と同じにする。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>スキルでは自分と対象のどちらか一方を選び、そのプレイヤーの現在体力をもう一方と同じ値にします。</li>
                    <li>脱落時に自分を含めて2人以上が脱落していれば勝利するため、盤面の脱落順を見極めます。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>自分が脱落しても2人以上の脱落者がいれば勝利できるため、終盤の乱戦で勝利条件を満たしやすい役職です。</li>
                            <li>スキル19で相手の体力を自分と同じにし、脱落順を調整する動きが有効です。</li>
                            <li>勝利条件を警戒されると最後の一撃を避けられるため、脱落者が出る前から自然に体力を削っておきます。</li>
                        </ul>
                    </div>
                </div>
            `
        }
    ],
    skills: [
        { 
            id: "s01", name: "スキル 01", enName: "Skill 01", category: "回復",
            effect: "1人：[回復]2", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>任意のプレイヤーを2回復できる、扱いやすいサポート・防御カードです。</li>
                            <li>自身の延命に使うのはもちろん、他プレイヤーを回復させて恩を売ったり、他者のトドメを妨害してゲーム展開をコントロールする用途にも使えます。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s02", name: "スキル 02", enName: "Skill 02", category: "全体操作",
            effect: "1人：体力を自分と同じ値にする。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>自身の体力が低い時に使えば相手への大ダメージとなり、自身の体力が高いときに使えばジェスターなどの勝利を妨害できる、盤面操作カードです。</li>
                            <li>一度に大きく体力が減らないゴーレムなどには注意しましょう。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s03", name: "スキル 03", enName: "Skill 03", category: "全体操作",
            effect: "全員：次の自分のターン終了時まで、1人以上のプレイヤーに与えられるダメージはすべてのプレイヤーへのダメージとなる。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>発動中、誰かへの単体攻撃がすべて全体攻撃になるという影響力を持つカードです。</li>
                            <li>狂戦士の攻撃や、スキルによる大ダメージを全体に波及させることで、一気に複数人を脱落させる状況を作り出せます。</li>
                            <li>攻撃者自身も、与えたダメージを受けることになります。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s04", name: "スキル 04", enName: "Skill 04", category: "妨害", hidden: true,
            effect: "欠番", 
            usage: `このページが見れているのはおかしいよ` 
        },
        { 
            id: "s05", name: "スキル 05", enName: "Skill 05", category: "妨害",
            effect: "非公開の役職を持つ全員: 非公開の役職1つにつき[ダメージ]1、発生したダメージにつき、自分は[回復]1", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>非公開の役職の数だけ、相手はダメージを受け、自分は回復するカードです。</li>
                            <li>役職の公開が進んだ終盤では効果が最大限活用できないため、序盤や中盤で使っておきたいカードです。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s06", name: "スキル 06", enName: "Skill 06", category: "攻撃",
            effect: "全員：ダメージを受けていなければ、[ダメージ]4。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>序盤の無傷な状態のプレイヤーたちにまとめて大ダメージを与えるカードです。</li>
                            <li>ダメージを受けているプレイヤーが増える終盤には効果を発揮しなくなるため、早めに撃つのが基本です。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s07", name: "スキル 07", enName: "Skill 07", category: "防御",
            effect: "自分：次の自分のターン開始時まで、自分はすべてのダメージを受けない。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>一周する間、あらゆるダメージを無効化する防御カードです。</li>
                            <li>集中攻撃を受けそうなターンや、自身の体力が危険な場面で生存を助けてくれます。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s08", name: "スキル 08", enName: "Skill 08", category: "妨害",
            effect: "他1人：次の手番で「攻撃」不可。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>指定した相手の攻撃アクションを封じ、手数を減らす妨害カードです。</li>
                            <li>狂戦士のような通常攻撃を主体とする役職に対して特に有効に働きます。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s09", name: "スキル 09", enName: "Skill 09", category: "妨害",
            effect: "全員：次のラウンド終了後まで、役職カードを公開不可。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>役職の公開を封じることで、相手のスキル発動や勝利条件の達成を長期間遅延させることができます。</li>
                            <li>役職公開を封じることで、告発者の勝利条件を防ぐことができます。</li>
                            <li>相手の未公開役職が維持されるため、暗殺者にとっては当てられるターゲットが減らず有利に働きます。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s10", name: "スキル 10", enName: "Skill 10", category: "妨害",
            effect: "1人：公開されている役職1つを非公開にする。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>公開された役職を再び未公開状態に戻すリセット効果です。</li>
                            <li>相手の固有勝利や永続能力をピンポイントでオフにできるため、終盤の妨害において重宝します。</li>
                            <li>一度公開された役職が裏返ることで、暗殺者にとっては新たなターゲットとして当てられる余地が生まれます。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s11", name: "スキル 11", enName: "Skill 11", category: "攻撃",
            effect: "1人：[ダメージ]3", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>無条件で3ダメージを与える強力な攻撃カードです。</li>
                            <li>自身を対象に撃つことも可能なため、クロノスやジェスターなどの戦術で自害用としても有効です。</li>
                            <li>全員のHPを均等にする聖女に対して、誰か1人のHPを大きく削ることで勝利条件を崩すことができます。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s12", name: "スキル 12", enName: "Skill 12", category: "全体操作",
            effect: "他1人：非公開の役職1つ または 手札すべてを自分と交換する", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>非公開の役職か手札という、リソースを奪い取るカードです。</li>
                            <li>強力な手札を持つ相手と交換したり、相手の役職を奪って自身の勝利プランを変更するなど、柔軟な立ち回りが可能になります。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s13", name: "スキル 13", enName: "Skill 13", category: "攻撃",
            effect: "体力が最も高い全員：体力を半分(端数切上)にする。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>体力優位に立っているプレイヤーに平等にダメージを与えるカードです。</li>
                            <li>最も体力が高いプレイヤーが複数いればその全員に効果が及ぶため、全体のHPを平たくするのに役立ちます。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s14", name: "スキル 14", enName: "Skill 14", category: "攻撃",
            effect: "他1人：[ダメージ]2。対象が脱落した場合、自分は[回復]1。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>2ダメージを与えて倒せば1回復できるスキルです。</li>
                            <li>単純なダメージソースとして使うこともできます。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s15", name: "スキル 15", enName: "Skill 15", category: "妨害", hidden: true,
            effect: "欠番", 
            usage: `このページが見れているのはおかしいよ` 
        },
        { 
            id: "s16", name: "スキル 16", enName: "Skill 16", category: "自己強化",
            effect: "自分：次に使うスキルカードのダメージ量と回復量がすべて2倍になる。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>次に使用するスキルのダメージ量や回復量を倍増させる自己強化カードです。</li>
                            <li>組み合わせ次第で非常に大きな威力を発揮します。</li>
                            <li>他のプレイヤーがこのカードを使ったときは、次の相手の行動をしっかりと予想して行動することが求められます。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s17", name: "スキル 17", enName: "Skill 17", category: "防御",
            effect: "自分：次の自分のターン開始時まで、いかなる効果の対象にならない。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>あらゆる効果の対象から外れる防御カードです。</li>
                            <li>手札奪取や役職交換などの妨害もシャットアウトできるため、守り切りたいターンの盾となります。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s18", name: "スキル 18", enName: "Skill 18", category: "全体操作",
            effect: "全員：手札3枚以上なら2枚に捨てる。手札1枚以下なら2枚まで引く。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>全員の手札を2枚に平準化するリソース操作カードです。</li>
                            <li>手札を大量に抱えている相手の手札を削り、自分や左隣に有利な状況を作るなどの運用が可能です。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s19", name: "スキル 19", enName: "Skill 19", category: "全体操作",
            effect: "他1人：自分と体力を入れ替える。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>自身が瀕死であるほど、相手にダメージを与えつつ自身が回復できるカードです。</li>
                            <li>逆に、自身のHPが高いときに使用し、相手の計算を崩すこともできます。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s20", name: "スキル 20", enName: "Skill 20", category: "妨害",
            effect: "1人：手札をすべて捨てる。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>指定した相手の手札を0枚にするカードです。</li>
                            <li>相手の行動の選択肢を奪い、手札枚数に依存する勝利条件を崩すことができます。</li>
                            <li>自分にあえて使い、次のラウンドで隣のプレイヤーをあえて困らせることも手です。</li>
                        </ul>
                    </div>
                </div>
            ` 
        }
    ]
};