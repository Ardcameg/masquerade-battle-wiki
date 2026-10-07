const gameData = {
    roles: [
        {
            no: 1,
            id: "assassin",
            name: "暗殺者",
            enName: "The Assassin",
            element: "red",
            elementName: "赤",
            elementIcon: "🔴",
            weakness: "blue",
            weaknessName: "青",
            weaknessIcon: "🔵+1",
            hp: 4,
            summary: "相手を推殺せよ",
            victory: null,
            skill: "使用されていない役職カードを1枚見る。その後、自分は追加で1アクションを行ってもよい。",
            passive: "アクション：他プレイヤー1人の非公開の役職を1つ宣言できる。正解なら対象に[ダメージ]7、外れたなら自分に[ダメージ]1。",
            overview: `
                <ul class="wiki-list">
                    <li>【永続】能力により、通常アクションの代わりに他プレイヤーの非公開役職を推理・宣言できます。</li>
                    <li>正解なら対象に[ダメージ]7、外れたなら自分に[ダメージ]1を受けます。</li>
                    <li>公開時スキルにより、ゲームで使用されていない中央の役職カード（1枚）を密かに確認し、除外情報を得た上で即座に追加で1アクション（宣言、スキル使用、攻撃、集中等）を行えます。</li>
                    <li>属性は🔴（赤）であり、🟢属性（聖女・ゴーレム）へのダメージが+1されます。</li>
                    <li>弱点は🔵（青）であり、🔵属性（告発者・盗賊）から受けるダメージが+1されます。</li>
                    <li>狂戦士と同様に固有勝利を持たず、高打点で全滅勝利を目指す役職です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>役職公開時に未使用カード1枚を確認しつつ即座に追加アクションを行えるため、手札や盤面状況に応じて宣言・攻撃・スキル使用を柔軟に選択できます。</li>
                            <li>推理が当たれば7ダメージを与えられるため、中盤以降の相手を一撃で仕留める強力なフィニッシャーとなります。</li>
                            <li>除外の完全確定（2枚確認）ではなく1枚確認にとどまるため、読み合いの余地を残しつつリスクを抑えた宣言が可能です。</li>
                            <li>自身の🔴属性を活かし、防御の堅い🟢属性（聖女・ゴーレム）に対して弱点打撃を与えて崩す役割も担えます。</li>
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
            element: "green",
            elementName: "緑",
            elementIcon: "🟢",
            weakness: "red",
            weaknessName: "赤",
            weaknessIcon: "🔴+1",
            hp: 6,
            summary: "この舞踏会に平和を",
            victory: "ラウンド終了時：すべてのプレイヤーの現在の体力が同じ",
            skill: "体力を5回復し、回復した分以下のダメージを1人に与える。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>全体のHPを均等にするという特殊な勝利条件を持ちます。</li>
                    <li>自身のスキルで5回復した後、その回復量以下のダメージを1人に与えることで、緻密に体力を揃えにいくことができます。</li>
                    <li>属性は🟢（緑）であり、🟣属性（クロノス・ジェスター）へのダメージが+1されます。</li>
                    <li>弱点は🔴（赤）であり、🔴属性（暗殺者・狂戦士）から受けるダメージが+1されます。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>公開時のスキルで回復した量以下のダメージを特定の相手1人に与えられるため、突出して体力が高い相手をピンポイントで削って全員の体力を揃えやすくなります。</li>
                            <li>スキル13で体力が最も高いプレイヤーを半減させたり、スキル19でHPを入れ替える動きと相性抜群です。</li>
                            <li>弱点である🔴属性（狂戦士など）からの集中砲火には注意が必要ですが、高い最大HP（6）を活かして粘り強く体力調整を行います。</li>
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
            element: "red",
            elementName: "赤",
            elementIcon: "🔴",
            weakness: "blue",
            weaknessName: "青",
            weaknessIcon: "🔵+1",
            hp: 5,
            summary: "力こそパワー",
            victory: null,
            skill: "体力をすべて回復する。",
            passive: "与えるすべてのダメージが+2、受けるすべてダメージが+1",
            overview: `
                <ul class="wiki-list">
                    <li>すべてのダメージを増やし、受けるダメージも増える高火力・高リスクの役職です。</li>
                    <li>属性は🔴（赤）であり、🟢属性（聖女・ゴーレム）へのダメージが+1されます。</li>
                    <li>弱点は🔵（青）であり、🔵属性（告発者・盗賊）から受けるダメージが+1されます（永続の受けるダメージ+1と合わせて、青からの攻撃は+2ダメージとなります）。</li>
                    <li>固有勝利条件は持たないため、火力で他プレイヤーを脱落させることが主な目的です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>公開時の全回復で体力を立て直し、永続の与ダメージ+2を活かして通常攻撃や攻撃スキルで一気に脱落を狙います。</li>
                            <li>🟢属性（ゴーレムや聖女）に対しては🔴属性の弱点ボーナスが加算されるため、ゴーレムのダメージ上限2をも突き破って強烈な打撃を与えることができます。</li>
                            <li>受けるダメージが+1されるうえ、🔵属性からの攻撃は弱点でさらに+1されるため、油断すると一瞬で削られる点には注意が必要です。</li>
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
            element: "yellow",
            elementName: "黄",
            elementIcon: "🟡",
            weakness: "purple",
            weaknessName: "紫",
            weaknessIcon: "🟣+1",
            hp: 3,
            summary: "気づかれないように準備せよ",
            victory: "スキルカード使用時：誰もダメージを受けなかったなら、そのカードを裏向きで自分の前に置く。ラウンド終了時、これが3つある。",
            skill: null,
            passive: "被ダメージ時：自分の前の裏向きのスキルカードを任意の枚数捨ててもよい。1枚につき、そのダメージを-2する。",
            overview: `
                <ul class="wiki-list">
                    <li>ダメージを伴わないスキルを使用することで裏向きのカードをストックし、ラウンド終了時に3枚で勝利します。</li>
                    <li>スキルを使用した結果、対象なしとなったりダメージを防がれたりした場合でも条件は成立します。</li>
                    <li>このストックはシールド（1枚につきダメージ-2、複数枚使用可能）としても機能します。</li>
                    <li>属性は🟡（黄）であり、🔵属性（告発者・盗賊）へのダメージが+1されます。</li>
                    <li>弱点は🟣（紫）であり、🟣属性（クロノス・ジェスター）から受けるダメージが+1されます。</li>
                    <li>この役職が非公開になったり交換されたとき、自分の前にある裏向きのカードは全て捨て札になります。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>ダメージを伴わないスキルを連発して盾を張り、安全を確保しながら3枚蓄積を目指します。</li>
                            <li>伏せカードは1枚につきダメージを2軽減する盾（通常攻撃なら1枚、強撃や大技なら2枚で防ぐ）にもなりますが、勝利目前ではあえてダメージを受けることも必要です。</li>
                            <li>🟣属性（クロノス・ジェスター）からの攻撃が弱点となるため、相手の手札や行動には注意を払いましょう。</li>
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
            element: "green",
            elementName: "緑",
            elementIcon: "🟢",
            weakness: "red",
            weaknessName: "赤",
            weaknessIcon: "🔴+1",
            hp: 2,
            summary: "鉄壁の体で死をも防ぐ",
            victory: "ラウンド終了時：手札の枚数が自分のHPより2以上多い",
            skill: null,
            passive: "受ける全てのダメージの上限が2になる。",
            overview: `
                <ul class="wiki-list">
                    <li>受ける全てのダメージの上限が2になる強力な防御特性を持つ役職です。</li>
                    <li>勝利条件はラウンド終了時に「手札の枚数が自分のHPより2以上多い」ことです。</li>
                    <li>属性は🟢（緑）であり、🟣属性（クロノス・ジェスター）へのダメージが+1されます。</li>
                    <li>弱点は🔴（赤）であり、🔴属性（暗殺者・狂戦士）から受けるダメージが+1されます。</li>
                    <li><strong>【重要】</strong>受けるダメージの上限が2になる永続能力が適用された<strong>後</strong>に弱点ボーナスが加算されるため、🔴属性からの攻撃では最大3ダメージを受ける点に注意が必要です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>HPが2であれば手札4枚以上、HPが1であれば手札3枚以上でラウンド終了時に勝利できます。</li>
                            <li>集中アクションやスキルカードを活かして手札を増やし、一気に勝利条件を満たします。</li>
                            <li>通常であればどんな大ダメージも2ダメージに抑えられますが、弱点である🔴属性からの攻撃は上限2の後に+1されて3ダメージとなり即死するリスクがあるため、赤属性アタッカーの動きを警戒しましょう。</li>
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
            element: "blue",
            elementName: "青",
            elementIcon: "🔵",
            weakness: "yellow",
            weaknessName: "黄",
            weaknessIcon: "🟡+1",
            hp: 3,
            summary: "全てを公に",
            victory: "ラウンド終了時：すべてのプレイヤーの役職カードが2枚とも公開されている",
            skill: "非公開の役職カードを1つ選び、自分だけ見る。それを公開させても良い。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>非公開の役職を1つ確認し、その情報を使って公開を迫れる情報操作型の役職です。</li>
                    <li>相手に公開させるかどうかは任意なので、状況に応じて判断できます。</li>
                    <li>属性は🔵（青）であり、🔴属性（暗殺者・狂戦士）へのダメージが+1されます。</li>
                    <li>弱点は🟡（黄）であり、🟡属性（爆弾魔・死霊術師）から受けるダメージが+1されます。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>序盤に非公開役職を1つ確認し、その情報を使って公開させる相手を選びます。</li>
                            <li>自身の属性が🔵のため、強力な🔴属性（暗殺者・狂戦士）に対して弱点攻撃で牽制することが可能です。</li>
                            <li>最大HPが3に向上したことで、ラウンド終了時まで粘り強く全員公開の完成を目指せます。</li>
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
            element: "purple",
            elementName: "紫",
            elementIcon: "🟣",
            weakness: "green",
            weaknessName: "緑",
            weaknessIcon: "🟢+1",
            hp: 4,
            summary: "死を超えろ",
            victory: "脱落時：このターン終了後、追加で自分のターンを行い、自分が他1人以上を脱落させる。",
            skill: "山札から1枚引く。[ダメージ]2",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>公開時に山札から1枚引きつつ自身に2ダメージを受ける、自傷と手札補充を兼ねたスキルを持ちます。</li>
                    <li>脱落時に追加ターンを獲得し、そのターン中に他プレイヤーを1人以上脱落させることで逆転勝利する役職です。</li>
                    <li>属性は🟣（紫）であり、🟡属性（爆弾魔・死霊術師）へのダメージが+1されます。</li>
                    <li>弱点は🟢（緑）であり、🟢属性（聖女・ゴーレム）から受けるダメージが+1されます。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>スキルの自傷を利用して能動的に自身の脱落タイミングをコントロールできます。</li>
                            <li>脱落後の追加ターンで確実に誰かを倒せるよう、相手の現在HPや防御札の有無を計算に入れて脱落しましょう。</li>
                            <li>🟡属性（爆弾魔・死霊術師）に対して弱点を突けるため、追加ターン中のトドメの打点としても頼りになります。</li>
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
            element: "yellow",
            elementName: "黄",
            elementIcon: "🟡",
            weakness: "purple",
            weaknessName: "紫",
            weaknessIcon: "🟣+1",
            hp: 3,
            summary: "屍の上に立て",
            victory: "ラウンド終了時：手札が5枚以上",
            skill: "捨て札から2枚選んで、手札に加える。その後、そのうち1枚を使用しても良い。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>公開時に捨て札から2枚を回収でき、さらにそのうち1枚をそのまま使用することもできます。</li>
                    <li>ラウンド終了時に手札5枚以上を保持することで勝利する、リソース重視の役職です。</li>
                    <li>属性は🟡（黄）であり、🔵属性（告発者・盗賊）へのダメージが+1されます。</li>
                    <li>弱点は🟣（紫）であり、🟣属性（クロノス・ジェスター）から受けるダメージが+1されます。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>公開時の2枚回収や集中アクションを活かし、一気に手札を稼いでラウンド終了時の手札5枚勝利を目指します。</li>
                            <li>回収したカードを即時使用することも選べるため、状況に応じた柔軟な対応が可能です。</li>
                            <li>手札を枯らそうとする盗賊（🔵属性）に対しては、自身の🟡属性攻撃で弱点を突いて体力を削る動きが有効です。</li>
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
            element: "blue",
            elementName: "青",
            elementIcon: "🔵",
            weakness: "yellow",
            weaknessName: "黄",
            weaknessIcon: "🟡+1",
            hp: 2,
            summary: "全てを奪い取れ",
            victory: "ラウンド終了時：他のすべてのプレイヤーの手札の合計が4枚以下",
            skill: null,
            passive: "自分がほかプレイヤーに2以上のダメージを与えたとき、そのプレイヤーは手札を1枚捨てる。",
            overview: `
                <ul class="wiki-list">
                    <li>自分が他プレイヤーに2以上のダメージを与えるたびに、対象の手札を1枚捨てさせる永続効果を持ちます。</li>
                    <li>ラウンド終了時に「他のすべてのプレイヤーの手札の合計が4枚以下」であれば勝利します。</li>
                    <li>属性は🔵（青）であり、🔴属性（暗殺者・狂戦士）へのダメージが+1されます。</li>
                    <li>弱点は🟡（黄）であり、🟡属性（爆弾魔・死霊術師）から受けるダメージが+1されます。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常攻撃（2ダメージ）や攻撃系スキルで継続的に相手の手札を削り、リソースを奪い尽くします。</li>
                            <li>ラウンド終了時は各プレイヤーが1枚残して他を回すため、手札が減りやすいタイミングを見計らって一気に全体の合計枚数を4枚以下に追い込みます。</li>
                            <li>自身の属性が🔵のため、🔴属性（狂戦士など）に対して弱点ダメージを与えることができ、狂戦士に対しても強烈なカウンターとなります。</li>
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
            element: "purple",
            elementName: "紫",
            elementIcon: "🟣",
            weakness: "green",
            weaknessName: "緑",
            weaknessIcon: "🟢+1",
            hp: 4,
            summary: "混沌に陥れろ",
            victory: "脱落時：自分を含めて同時に2人以上が脱落した",
            skill: "他1人を選び、自分か対象のどちらかを選ぶ。そのプレイヤーの現在の体力を、もう一方と同じにする。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>スキルでは自分と対象のどちらか一方を選び、そのプレイヤーの現在体力をもう一方と同じ値にします。</li>
                    <li>脱落時に自分を含めて同時に2人以上が脱落していれば勝利します。</li>
                    <li>属性は🟣（紫）であり、🟡属性（爆弾魔・死霊術師）へのダメージが+1されます。</li>
                    <li>弱点は🟢（緑）であり、🟢属性（聖女・ゴーレム）から受けるダメージが+1されます。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>スキル3の全体ダメージ波及や、全体攻撃スキル、反射スキルなどを巻き込んで相手と相打ち・同時脱落を狙うトリッキーな勝利を狙います。</li>
                            <li>他プレイヤーの体力を自分と同じにするスキルを駆使し、全員が瀕死の状況を作り出してから一斉攻撃を誘発するのが理想的です。</li>
                        </ul>
                    </div>
                </div>
            `
        }
    ],
    skills: [
        { 
            id: "s01", no: 1, name: "治癒", enName: "Healing", category: "回復",
            effect1: "1人：[回復]2",
            effect2: "プレイヤーがダメージを受けるor回復するとき：ダメージは同じ量の回復に、回復は同じ量のダメージにする。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常使用として、任意のプレイヤー1人を2回復できます。自身の延命はもちろん、他プレイヤーのHPをコントロールする用途にも使えます。</li>
                            <li><strong>【割り込み効果】</strong>誰かがダメージを受ける、または回復する瞬間に手札から割り込んで使用できます。ダメージは同じ量の回復に、回復は同じ量のダメージへと反転します。</li>
                            <li>自身への致命打を大回復に変えて生き残ったり、相手の大回復スキルを逆手に取ってトドメを刺す強力なカウンターとしても機能します。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s02", no: 2, name: "先導", enName: "Leading", category: "防御",
            effect1: "効果の対象になったとき：自分の代わりに効果を受ける対象を選ぶ。すでに対象になっているプレイヤーを選んだ場合、そのプレイヤーは効果を2回受ける。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>自身が単体攻撃やスキルの対象になった際に手札から割り込んで発動し、身代わりに他のプレイヤーに対象をなすりつけるカウンターカードです。</li>
                            <li>すでに対象になっているプレイヤーを選んだ場合は効果を2回受けるため、攻撃してきた相手自身を指定して返り討ちにすることも可能です。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s03", no: 3, name: "波及", enName: "Ripple", category: "操作",
            effect1: "全員：次の自分のターン終了時まで、ちょうど1人のプレイヤーに与えられるダメージはすべてのプレイヤーへのダメージとなる。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>発動中、誰か1人への単体攻撃がすべて全体攻撃になるという影響力を持つカードです。</li>
                            <li><strong>※「ちょうど1人」に与えられるダメージでのみ発動します。</strong>スキル06（奇襲）など、2人以上を対象とする全体ダメージでは発動しません。</li>
                            <li>狂戦士の攻撃や、スキルによる大ダメージを全体に波及させることで、一気に複数人を脱落させる状況を作り出せます。</li>
                            <li>攻撃者自身も、与えたダメージを受けることになります。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s04", no: 4, name: "欠番", enName: "Skill 04", category: "妨害", hidden: true,
            effect1: "欠番", 
            usage: `このページが見れているのはおかしいよ` 
        },
        { 
            id: "s05", no: 5, name: "偽証", enName: "Perjury", category: "妨害",
            effect1: "役職カードが公開されたとき：スキルなどを無効にしたうえで、非公開に戻す。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>いずれかのプレイヤーが役職カードを公開した瞬間に、手札から割り込んで発動できるカウンターカードです。</li>
                            <li>公開された役職カードの公開時【スキル】や効果を無効化し、そのカードを非公開（裏向き）に戻します。</li>
                            <li>狂戦士の全回復や聖女の5回復+ダメージ、暗殺者のアクション追加などの強力な公開時スキルを不発に終わらせる強力な妨害手段です。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s06", no: 6, name: "奇襲", enName: "Ambush", category: "攻撃",
            effect1: "全員：ダメージを受けていなければ、[ダメージ]4。", 
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
            id: "s07", no: 7, name: "守護", enName: "Protection", category: "防御",
            effect1: "自分：次の自分のターン開始時まで、自分はすべてのダメージを受けない。", 
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
            id: "s08", no: 8, name: "威圧", enName: "Intimidation", category: "妨害",
            effect1: "他1人：次の手番で「攻撃」不可。", 
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
            id: "s09", no: 9, name: "沈黙", enName: "Silence", category: "妨害",
            effect1: "全員：次のラウンド終了後まで、役職カードを公開不可。", 
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
            id: "s10", no: 10, name: "隠蔽", enName: "Veil", category: "妨害",
            effect1: "1人：公開されている役職1つを非公開にする。", 
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
            id: "s11", no: 11, name: "強撃", enName: "Impact", category: "攻撃",
            effect1: "1人：[ダメージ]3", 
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
            id: "s12", no: 12, name: "取引", enName: "Trade", category: "操作",
            effect1: "他1人：非公開の役職1つ または 手札すべてを自分と交換する", 
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
            id: "s13", no: 13, name: "断罪", enName: "Judgement", category: "攻撃",
            effect1: "体力が最も高い全員：体力を半分(端数切上)にする。", 
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
            id: "s14", no: 14, name: "反射", enName: "Mirror", category: "防御",
            effect1: "ダメージを受けるとき：攻撃者に反射する。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>自身がダメージを受ける直前に手札から割り込んで発動し、受けるはずだったダメージをそのまま攻撃してきた相手に跳ね返すカウンターカードです。</li>
                            <li>大ダメージを狙ってきた狂戦士や、奇襲・強撃などの攻撃スキルを逆手に取って攻撃者を返り討ちにできます。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s15", no: 15, name: "欠番", enName: "Skill 15", category: "妨害", hidden: true,
            effect1: "欠番", 
            usage: `このページが見れているのはおかしいよ` 
        },
        { 
            id: "s16", no: 16, name: "増幅", enName: "Amplify", category: "強化",
            effect1: "自分：次に使うスキルカードのダメージ量と回復量がすべて2倍になる。", 
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
            id: "s17", no: 17, name: "隠遁", enName: "Stealth", category: "防御",
            effect1: "自分：次の自分のターン開始時まで、いかなる効果の対象にならない。", 
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
            id: "s18", no: 18, name: "調和", enName: "Harmony", category: "操作",
            effect1: "全員：手札3枚以上なら2枚に捨てる。手札1枚以下なら2枚まで引く。", 
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
            id: "s19", no: 19, name: "反転", enName: "Reversal", category: "操作",
            effect1: "他1人：自分と体力を入れ替える。", 
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
            id: "s20", no: 20, name: "廃棄", enName: "Discard", category: "妨害",
            effect1: "1人：手札をすべて捨てる。", 
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