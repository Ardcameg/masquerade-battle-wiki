const gameData = {
    roles: [
        {
            id: "assassin",
            name: "暗殺者",
            enName: "The Assassin",
            category: "アタッカー",
            hp: 3,
            summary: "情報から相手の役職を看破する役職",
            victory: "アクション：他プレイヤー1人の非公開の役職を1つ宣言できる。正解なら自分は勝利、外れたなら[ダメージ]3",
            skill: "他1人：次のラウンド終了後まで、役職を公開不可。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>相手の非公開役職をチェックし、他の公開情報から絞り込んで暗殺を仕掛けるプレッシャーを与える役職です。</li>
                    <li>外れた場合は自分が3ダメージを受けるため、相手の公開情報と残り候補を整理してから宣言します。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-title">立ち回りとポイント</div>
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>公開されている役職とスキル5の情報を手掛かりに候補を絞り、確信が持てるターンに宣言します。</li>
                            <li>外れた時の3ダメージで脱落しないよう、先に回復や防御を確保しておくと再挑戦しやすくなります。</li>
                            <li>スキル9で公開を止め、スキル10で公開役職を戻すと、推理対象を維持できます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "saint",
            name: "聖女",
            enName: "The Saint",
            category: "サポート",
            hp: 6,
            summary: "全員の体力を平坦に均す役職",
            victory: "ターン終了時：すべてのプレイヤーの現在の体力が同じ",
            skill: "体力を5回復し、回復したHPをダメージとしてすべてのプレイヤーに好きなように振り分ける",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>全体のHPを均等にするという特殊な勝利条件を持ちます。</li>
                    <li>自身のスキルで5回復した後、その回復量を全員へのダメージとして配分し、体力を揃えます。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-title">立ち回りとポイント</div>
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>公開後にスキルで5回復できるよう、受けたダメージ量と全員の現在HPを見て公開のタイミングを決めます。</li>
                            <li>スキル2で自分のHPを他人に押し付けたり、スキル13で一番元気なプレイヤーをまとめて削る動きが有効です。</li>
                            <li>聖女が公開されている間は、他プレイヤーから意図的に誰かにダメージを与えられてHPの並びを崩される展開に弱いです。</li>
                            <li>ゴーレムがいる場合、ダメージが1に軽減されてしまうため均等化の計算が狂いやすく不利です。</li>
                            <li>暗殺者がいる場合、即死を狙う動きとHPを回復して分配する聖女の動きが衝突します。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "berserker",
            name: "狂戦士",
            enName: "The Berserker",
            category: "アタッカー",
            hp: 5,
            summary: "回復を捨てて圧倒的火力を押し付ける役職",
            victory: null,
            skill: "体力をすべて回復する。",
            passive: "与えるすべてのダメージが+3、受けるすべてダメージが+1",
            overview: `
                <ul class="wiki-list">
                    <li>すべてのダメージを増やし、受けるダメージも増える高火力・高リスクの役職です。</li>
                    <li>固有勝利条件は持たないため、火力で他プレイヤーを脱落させることが主な役割です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-title">立ち回りとポイント</div>
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>公開時の全回復で攻撃を継続し、スキル11・14や通常攻撃を+3して一気に脱落を狙います。</li>
                            <li>受けるダメージも+1されるため、スキル7やスキル17で反撃を受けるターンを作らないことが重要です。</li>
                            <li>聖女の回復やゴーレムのHP上限など、相手の防御手段を見て攻撃対象を選びます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "bomber",
            name: "爆弾魔",
            enName: "The Bomber",
            category: "タンク",
            hp: 4,
            summary: "スキル空撃ちで盾を張り勝利を狙う役職",
            victory: "スキルカード使用時：誰もダメージを受けなかったなら、そのカードを裏向きで自分の前に置く。ターン終了時、これが3つある。",
            skill: null,
            passive: "自分がダメージを受ける時：自分の前の裏向きのスキルカードを1枚捨てることで、そのダメージを無効にする。",
            overview: `
                <ul class="wiki-list">
                    <li>ダメージを伴わないスキルを使用することで裏向きのカードをストックし、ターン終了時に3枚で勝利します。</li>
                    <li>スキルを使用した結果、対象なしとなったりダメージを防がれた場合でも条件は成立します。</li>
                    <li>このストックは強力な防御シールドとしても機能します。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-title">立ち回りとポイント</div>
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>スキル2、7、8、9、10、16、17、18、19、20などを使い、ダメージが発生しないターンを積み重ねます。</li>
                            <li>スキル1、スキル2、スキル7、スキル8、スキル9、スキル10、スキル16、スキル17、スキル18、スキル20など、ダメージを伴わないデバフ・バフ系スキルを連発して盾を張る動きが有効です。</li>
                            <li>伏せカードは被ダメージを無効化する盾にもなるため、勝利目前では通常攻撃で盾を削られないよう公開情報を隠します。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "golem",
            name: "ゴーレム",
            enName: "The Golem",
            category: "タンク",
            hp: 4,
            summary: "大ダメージを無力化する鉄壁の役職",
            victory: "ターン終了時：手札の枚数が自分のHPより2以上多い",
            skill: null,
            passive: "一度に減るHPの上限が2になる。",
            overview: `
                <ul class="wiki-list">
                    <li>一度に減るHPは2までなので、大ダメージを受けても致命傷になりにくい役職です。</li>
                    <li>手札が自分のHPより2枚以上多い状態をターン終了時に作る必要があります。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-title">立ち回りとポイント</div>
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>HPを低く保ちつつ、集中やスキル18で手札を増やし、ターン終了時の差を2枚以上にします。</li>
                            <li>スキル11やスキル14も2ダメージまでに抑えられるため、危険な相手の攻撃を受ける壁として機能します。</li>
                            <li>スキル20で手札を失うと勝利条件から遠ざかるため、スキル17や公開タイミングで防ぎます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "accuser",
            name: "告発者",
            enName: "The Accuser",
            category: "コントロール",
            hp: 2,
            summary: "非公開の役職を見て公開を迫る役職",
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
                    <div class="tactic-title">立ち回りとポイント</div>
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>序盤に非公開役職を1つ確認し、その情報を使って公開させる相手を選びます。</li>
                            <li>スキル5やスキル9と組み合わせると、非公開役職を残すことへの圧力を高められます。</li>
                            <li>自分のHPが2しかないため、公開を急ぎすぎず、攻撃対象にならない位置を保ちます。</li>
                            <li>暗殺者がいる場合、他人の役職を強制的に公開させていくため暗殺者のターゲットが減り、暗殺者にとっては不利になります。</li>
                            <li>スキル5やスキル13で全体の体力差を広げる展開は、聖女の均等化を妨害できます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "chronos",
            name: "クロノス",
            enName: "Chronos",
            category: "特殊",
            hp: 4,
            summary: "脱落することで勝利を掴む特殊な役職",
            victory: "脱落時：このターン終了後、追加で自分のターンを行い、自分が他1人以上を脱落させる。そのターン中、与えるすべてのダメージは2倍になる。",
            skill: "山札から3枚引く。体力を2にする。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>脱落後に追加ターンを得て、さらに他プレイヤーを1人以上脱落させる逆転型の役職です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-title">立ち回りとポイント</div>
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>公開時に山札から3枚引いて体力を2にし、脱落後の追加ターンに備えて手札を確保します。</li>
                            <li>脱落後に確実に倒せる相手を残し、追加ターン中はすべてのダメージが2倍になることを活かします。</li>
                            <li>追加ターンで誰も脱落させられないと勝利できないため、相手のHPと防御効果を事前に確認します。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "necromancer",
            name: "死霊術師",
            enName: "The Necromancer",
            category: "コントロール",
            hp: 3,
            summary: "捨て札からカードを回収し条件を揃える役職",
            victory: "ターン終了時：手札が4枚以上",
            skill: "捨て札から2枚選んで、手札に加える。望むなら、そのうち1枚を使用しても良い。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>公開時に捨て札から2枚を回収でき、さらに望むなら回収したカードをそのまま使用できます。</li>
                    <li>ターン終了時に手札4枚以上を保つ、手札重視の役職です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-title">立ち回りとポイント</div>
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>序盤から手札を温存し、公開時は捨て札の内容を見て不足している役割のカードを回収します。</li>
                            <li>回収したカードを即時使用できるため、攻撃と回収を同じ公開ターンに組み合わせられます。</li>
                            <li>スキル20やラウンド終了時の手札移動で手札が減るため、勝利判定の直前まで枚数を管理します。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "thief",
            name: "盗賊",
            enName: "The Thief",
            category: "コントロール",
            hp: 2,
            summary: "他プレイヤーの手札を枯渇させる役職",
            victory: "ターン終了時：他のすべてのプレイヤーの手札の合計が3枚以下",
            skill: null,
            passive: "自分がほかプレイヤーに2以上のダメージを与えたとき、そのプレイヤーは手札を1枚捨てる。",
            overview: `
                <ul class="wiki-list">
                    <li>自分のダメージを増やすのではなく、2以上のダメージを与えた相手の手札を削る役職です。</li>
                    <li>勝利条件は他プレイヤー全員の手札合計なので、複数人を少しずつ削る展開が得意です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-title">立ち回りとポイント</div>
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>スキル11やスキル14で2以上のダメージを与え、相手の手札を削りながら勝利条件を進めます。</li>
                            <li>スキル18やスキル20で全体の手札を減らし、最後に残った数枚をダメージ効果で削る流れが有効です。</li>
                            <li>自分のHPが2しかないため、攻撃役から狙われる前に複数の相手へ手札減少を仕掛けます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "jester",
            name: "ジェスター",
            enName: "The Jester",
            category: "特殊",
            hp: 4,
            summary: "すべてを入れ替え盤面を混沌に陥れる役職",
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
                    <div class="tactic-title">立ち回りとポイント</div>
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
                            <li>クロノス、ジェスター、暗殺者など脱落したい役職に対して撃ち込むことで、彼らの勝利条件を遠ざけることができます。</li>
                            <li>爆弾魔にとっては、伏せカードを張るための時間稼ぎとシールド維持に役立ちます。</li>
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
                            <li>自身の体力が高い時に使えば味方への大回復となり、自身の体力が低い時に使えば相手への防御無視の大ダメージとなる盤面操作カードです。</li>
                            <li>クロノス、ジェスター、暗殺者などに対して回復として使うことで、彼らの脱落による勝利を遠ざけることができます。</li>
                            <li>ダメージを伴わないため、爆弾魔にとっては伏せカードを張るための時間稼ぎになります。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s03", name: "スキル 03", enName: "Skill 03", category: "全体操作",
            effect: "次の自分のターン終了時まで、1人以上のプレイヤーに与えられるダメージはすべてのプレイヤーへのダメージとなる。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>発動中、誰かへの単体攻撃がすべて全体攻撃になるという影響力を持つカードです。</li>
                            <li>狂戦士の攻撃や、スキルによる大ダメージを全体に波及させることで、一気に複数人を脱落させる状況を作り出せます。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s04", name: "スキル 04", enName: "Skill 04", category: "妨害", hidden: true,
            effect: "欠番", 
            usage: `` 
        },
        { 
            id: "s05", name: "スキル 05", enName: "Skill 05", category: "妨害",
            effect: "他全員: 非公開の役職1つにつき[ダメージ]1、発生したダメージにつき、自分は[回復]1", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>役職を公開していないプレイヤーへ確実な2ダメージのペナルティを与える牽制カードです。</li>
                            <li>役職を公開すれば回復の恩恵を受けられるため、相手にダメージを受けるか情報を晒すかの選択を迫ることができます。</li>
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
            effect: "次の自分のターン開始時まで、自分はすべてのダメージを受けない。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>一周する間、あらゆるダメージを無効化する防御カードです。</li>
                            <li>集中攻撃を受けそうなターンや、自身の体力が危険な場面で生存を助けてくれます。</li>
                            <li>クロノス、ジェスター、暗殺者などが自身に使用するとダメージを受けなくなるため、脱落による勝利を自ら遠ざけてしまう可能性があります。</li>
                            <li>ダメージを伴わないため、爆弾魔にとっては伏せカードを張るための時間稼ぎになります。</li>
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
                            <li>狂戦士の両方公開して勝利の条件をピンポイントで潰せます。また告発者の勝利も遅延させます。</li>
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
                            <li>自身を対象に撃つことも可能になり、クロノスやジェスターなどの戦術で自害用としても使われます。</li>
                            <li>全員のHPを均等にした聖女に対して、誰か1人のHPを大きく削ることで勝利条件を崩すことができます。</li>
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
                            <li>非公開の役職か手札という、ゲームの根幹に関わるリソースを奪い取るカードです。</li>
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
                            <li>最も体力が高いプレイヤーが複数いればその全員に2ダメージが入るため、全体のHPを平たくするのに役立ちます。</li>
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
                            <li>残り体力が2以下のプレイヤーを狙い、自身の体力回復を図るのが基本となります。</li>
                            <li>HPを均等にした聖女に対して使うと、均等状態を崩し勝利条件を妨害できます。</li>
                            <li>クロノスやジェスターにトドメを刺すことで、彼らの脱落時勝利のトリガーになり得ます。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s15", name: "スキル 15", enName: "Skill 15", category: "妨害", hidden: true,
            effect: "欠番", 
            usage: `` 
        },
        { 
            id: "s16", name: "スキル 16", enName: "Skill 16", category: "自己強化",
            effect: "次に自分が使うスキルカードの数値はすべて2倍になる。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>次に使用するスキルの効果を倍増させるカードです。</li>
                            <li>組み合わせ次第で非常に大きな威力を発揮します。</li>
                            <li>ダメージ効果を倍増させて撃ち込まれると、聖女が整えたHPの均等状態が崩れやすくなります。</li>
                            <li>クロノスやジェスターがスキル11と合わせれば、自分に一撃6ダメージを与えて確実な自爆が成立します。</li>
                        </ul>
                    </div>
                </div>
            ` 
        },
        { 
            id: "s17", name: "スキル 17", enName: "Skill 17", category: "防御",
            effect: "次の自分のターン開始時まで、自分はいかなる効果の対象にならない。", 
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>あらゆる効果の対象から外れる防御カードです。</li>
                            <li>手札奪取や役職交換などの妨害もシャットアウトできるため、守り切りたいターンの盾となります。</li>
                            <li>クロノス、ジェスター、暗殺者などは自身を対象に取れなくなるなどの影響が出る可能性があります。</li>
                            <li>ダメージを伴わないため、爆弾魔にとっては伏せカードを張るための時間稼ぎになります。</li>
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
                            <li>手札枚数が勝利条件に直結する死霊術師、ゴーレム、クロノスにとっては、手札を強制的に2枚にするこのカードは厳しい影響を与えます。</li>
                            <li>他人の手札を減らすことで盗賊の勝利をアシストしたり、自分の手札を減らしやすくして狂戦士を助けたりします。</li>
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
                            <li>不利な状況から一発で形勢を逆転できるため、常に警戒して動くことになります。</li>
                            <li>クロノス、ジェスター、暗殺者などの死にたい役職の体力を無理やり回復させることで、彼らの脱落による勝利を遠ざけることができます。</li>
                            <li>ダメージを伴わないため、爆弾魔にとっては伏せカードを張るための時間稼ぎになります。</li>
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
                            <li>手札枚数が勝利条件に直結する死霊術師、ゴーレム、クロノスにとっては厳しい妨害となります。</li>
                            <li>他人の手札を枯渇させるため、盗賊の勝利をアシストします。また自分に使えば狂戦士の勝利条件を満たせます。</li>
                        </ul>
                    </div>
                </div>
            ` 
        }
    ]
};
