const gameData = {
    roles: [
        {
            no: 1,
            id: "assassin",
            name: "暗殺者",
            enName: "The Assassin",
            hit: 1,
            summary: "相手の正体を暴き、確実に仕留める",
            victory: null,
            skill: "追加で1アクションを行う。",
            passive: "【固有アクション】非公開の役職を持つプレイヤー1人に、[ダメージ]3。",
            overview: `
                <ul class="wiki-list">
                    <li>通常アクションの代わりに、非公開の役職を持つプレイヤー1人を指定して[ダメージ]3を与えることができます。相手が2枚とも役職を公開している場合は対象に選べません。</li>
                    <li>役職公開時に即座に追加で1アクションを行えます。</li>
                    <li>Hitは「1」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>役職を公開していないプレイヤーに対して、確定で3ダメージを与える強力なアタッカーです。</li>
                            <li>役職公開時に追加アクションを行えるため、公開から即座に固有アクションやスキルカードへ繋げることができます。</li>
                            <li>告発者がいる場では相手が役職を公開しにくいため、固有アクションの対象を維持しやすくなります。</li>
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
            hit: 2,
            summary: "全体の体力を引き上げ、平和をもたらす",
            victory: "ターン開始時：全員の現在の体力が11以上",
            skill: "自分：[回復]3、他全員：[回復]1",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>生存している全プレイヤーの現在の体力が11以上の状態で自分のターンを迎えると勝利します。</li>
                    <li>初期HPは10ですが、回復効果によってHPが11以上になることが可能です。</li>
                    <li>役職公開時、自分を3回復し、他全員を1回復します。</li>
                    <li>Hitは「2」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>《01. 治癒》や《02. 先導》、自身の公開スキルを駆使して、傷ついた他プレイヤーを含めた全員のHPを11以上に引き上げます。</li>
                            <li>脱落者が出ると「全員」の対象人数が減るため、終盤に少人数となった局面で全体回復を行い勝利を満たすことも狙えます。</li>
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
            hit: 0,
            summary: "攻撃をものともせず、圧倒的な一撃を叩き込む",
            victory: null,
            skill: "体力を10になるまで回復する。",
            passive: "与えるすべてのダメージが+1",
            overview: `
                <ul class="wiki-list">
                    <li>Hitが0のため、「攻撃」アクションのダイス判定（Hit &lt; 出目）で対象になっても、受けるダメージは0となります。</li>
                    <li>役職公開時、体力を10まで全回復します。すでに10以上ある場合は変化しません。</li>
                    <li>与える<strong>すべて</strong>のダメージが+1されます。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>2枚目の役職が非公開の状態であれば、ダイス攻撃によるダメージを受けません。</li>
                            <li>永続の与ダメージ+1により、ダイス攻撃や《10. 強撃》、《05. 奇襲》などあらゆる攻撃のダメージが増加します。</li>
                            <li>体力が減った段階で《狂戦士》を公開してHP10全回復を行う動きが有効です。ただし2枚目を公開して合計Hitが増加した後は、ダイス攻撃のダメージを受けるようになります。</li>
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
            hit: 1,
            summary: "一度に大ダメージを発生させて勝利する",
            victory: "自分が一度に合計6以上の[ダメージ]を与えた",
            skill: null,
            passive: "被ダメージ時：攻撃者に[ダメージ]1",
            overview: `
                <ul class="wiki-list">
                    <li>自身のアクションで、一度に合計6以上の[ダメージ]を与えた瞬間に勝利します。</li>
                    <li>ダメージを受けたとき、攻撃してきたプレイヤーに1ダメージを与えます。</li>
                    <li>Hitは「1」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>他プレイヤーの公開役職のHitが高くなったタイミングでアクションB「攻撃」を行い、複数人にまとめてダメージを与えて合計6点以上の達成を狙います。</li>
                            <li>《12. 断罪》や《05. 奇襲》、《14. 増幅》などの全体攻撃・強化スキルと組み合わせることでも勝利条件を満たせます。</li>
                            <li>被ダメージ時に攻撃者へ1ダメージを返すため、相手が安易に攻撃を仕掛けにくくなります。</li>
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
            hit: 3,
            summary: "強固な肉体で受けるダメージを抑える",
            victory: "ターン開始時：手札の枚数が自分のHPより2以上多い",
            skill: null,
            passive: "受けるすべてのダメージの上限が2になる。",
            overview: `
                <ul class="wiki-list">
                    <li>受けるダメージの上限が2になります。</li>
                    <li>ターン開始時に「手札枚数 &gt;= 自分の現在HP + 2」を満たしていれば勝利します。</li>
                    <li>Hitは「3」です。出目4以上でなければダイス攻撃を受けませんが、被弾時のダメージは大きくなります（永続効果により最大2ダメージ）。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>手札を増やしつつ、自身のHPを適度に調整することで勝利条件を満たして勝利を目指します。</li>
                            <li>大ダメージスキルをすべて2点に抑えられるため耐久力が高くなります。</li>
                            <li>《18. 廃棄》や《08. 革命》など、手札に干渉するスキルには注意が必要です。</li>
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
            hit: 2,
            summary: "すべての役職を公開させ、真実を暴く",
            victory: "ターン開始時：生存者全員の役職がすべて公開中",
            skill: "他1人：非公開の役職カードを1つ選び、公開する。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>ターン開始時に、生存しているすべてのプレイヤーの役職がすべて公開中であれば勝利します。</li>
                    <li>役職公開時、他プレイヤー1人の非公開役職を1つ指定して公開させます。</li>
                    <li>Hitは「2」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>自身の公開時スキルや《11. 取引》を活用し、他プレイヤーの非公開役職を公開させて全員公開を目指します。</li>
                            <li>告発者が公開されていると他プレイヤーは自発的に公開しにくくなるため、強制的に公開させる手段を確保することが重要です。</li>
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
            hit: 2,
            summary: "脱落した瞬間に最後の時を動かす",
            victory: "脱落時：このターン終了後、追加で自分のターンを行い、自分が他1人以上を脱落させる。",
            skill: "山札からスキルカードを1枚引く。[ダメージ]2。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>自身が脱落したとき、そのターン終了後に追加で1回ターンを行います。そのターン中に他プレイヤーを1人以上脱落させると勝利します。</li>
                    <li>役職公開時、山札からスキルカードを1枚引き、自身は2ダメージを受けます。</li>
                    <li>Hitは「2」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>手札に《10. 強撃》などの攻撃スキルを準備した状態で脱落を迎え、追加ターンで他プレイヤーを脱落させて勝利を狙います。</li>
                            <li>公開時スキルの2ダメージを利用して、自ら脱落タイミングを調整することも可能です。</li>
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
            hit: 2,
            summary: "捨て札を利用して手札を蓄える",
            victory: "ターン開始時：手札が5枚以上",
            skill: "捨て札からスキルカードを1枚選んで、手札に加える。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>ターン開始時に自分の手札が5枚以上あれば勝利します。</li>
                    <li>役職公開時、捨て札から任意のスキルカードを1枚手札に加えます。</li>
                    <li>Hitは「2」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>アクションC「集中」（2枚引いて1枚使用・1枚手札補充）を繰り返すことで手札枚数を増やします。</li>
                            <li>公開時スキルで捨て札から防御札やドロー札を回収し、手札5枚を維持してターンを迎えます。</li>
                            <li>手札枚数が増えるため、《08. 革命》のダメージ対象になりやすい点には注意が必要です。</li>
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
            hit: 1,
            summary: "相手の手札を奪い、資源を枯渇させる",
            victory: "ターン開始時：全員の手札の合計が3枚以下",
            skill: null,
            passive: "自分が他プレイヤーに2以上の[ダメージ]を与えたとき、そのプレイヤーは手札を1枚捨てる。",
            overview: `
                <ul class="wiki-list">
                    <li>ターン開始時に、生存者全員の手札の合計枚数が3枚以下なら勝利します。</li>
                    <li>他プレイヤーに2以上のダメージを与えるたびに、対象の手札を1枚捨てさせます。</li>
                    <li>Hitは「1」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>ダイス攻撃やスキル攻撃で2ダメージ以上を与え、相手の手札を継続的に減らしていきます。</li>
                            <li>《07. 再分配》や《18. 廃棄》、《16. 調和》を活用して場全体の手札を削り、合計3枚以下を目指します。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            no: 10,
            id: "jester",
            name: "道化師",
            enName: "The Jester",
            hit: 1,
            summary: "他者の死に便乗し、共に散る",
            victory: "脱落時：このラウンドで、すでに他1人以上が脱落している",
            skill: "自分：自分と他1人の現在の体力の差と同じ量の[ダメージ]を受ける。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>脱落したとき、そのラウンドですでに他1人以上が脱落していれば勝利します。</li>
                    <li>役職公開時、自分と対象のHPの差分と同じダメージを自分自身に与えます。</li>
                    <li>Hitは「1」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>ラウンド中に最初の脱落者が出るまでは生き残り、誰かが倒れた後に自傷スキルやダイス被弾で脱落して勝利を狙います。</li>
                            <li>《03. 波及》を使用して他プレイヤーを巻き込み、同時脱落を狙う立ち回りも有効です。</li>
                        </ul>
                    </div>
                </div>
            `
        }
    ],
    skills: [
        {
            id: "s01", no: 1, name: "治癒", enName: "Healing", category: "回復",
            effect1: "1人：[回復]3",
            effect2: "プレイヤーがダメージを受けるor回復するとき：ダメージは同じ量の回復に、回復は同じ量のダメージにする。",
            ruling: "ダメージまたは回復が発生する直前に手札から割り込んで使用できます。ダメージは回復に、回復はダメージへと反転します。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常使用として任意の1人を[回復]3できます。《聖女》のHP11達成サポートや自身の延命に使用します。</li>
                            <li>効果2により、致命的なダメージを回復に変えたり、相手の回復をダメージに反転させて脱落させることができます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s02", no: 2, name: "先導", enName: "Leading", category: "防御",
            effect1: "2人：[回復]1",
            effect2: "スキルカードの対象になったとき：代わりに他プレイヤー1人を選ぶ。そのプレイヤーが効果を受ける。",
            ruling: "自身がスキルカードの対象として選択された瞬間に手札から割り込んで発動します。効果の対象を別の生存プレイヤーに変更します。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常使用として任意の2人をそれぞれ[回復]1します。</li>
                            <li>効果2により、自身に向けられた攻撃スキルや妨害スキルの対象を他プレイヤーへ移し替えることができます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s03", no: 3, name: "波及", enName: "Ripple", category: "攻撃",
            effect1: "2人：[ダメージ]1",
            effect2: "ダメージを受けるとき：ダメージを受ける対象が「全員」になる。",
            ruling: "自身がダメージを受ける直前に手札から割り込んで使用します。そのダメージの対象が生存している全プレイヤーへと拡大されます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常使用として任意の2人にそれぞれ[ダメージ]1を与えます。</li>
                            <li>効果2により、自身が受ける単体ダメージを全員に拡散させます。《道化師》の同時脱落狙いや《爆弾魔》のバースト勝利に活用できます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s04", no: 4, name: "偽証", enName: "Perjury", category: "妨害",
            effect1: "1人：[ダメージ]2",
            effect2: "役職カードが公開されたとき：それを非公開にする。",
            ruling: "プレイヤーが役職カードを公開した瞬間に手札から割り込んで使用します。公開された役職を非公開（裏向き）に戻し、その公開時スキルも無効化されます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常使用として任意の1人に[ダメージ]2を与えます。</li>
                            <li>効果2により、相手の役職公開を阻止し、公開時スキルや永続能力の発動を防ぎます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s05", no: 5, name: "奇襲", enName: "Ambush", category: "攻撃",
            effect1: "全員：HPが10以上なら、[ダメージ]4。",
            ruling: "現在HPが10以上のプレイヤー全員に4ダメージを与えます。一度でもダメージを受けてHPが9以下になっているプレイヤーには効果がありません。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>序盤のHP10のプレイヤー全員にまとめて4ダメージを与えます。</li>
                            <li>《爆弾魔》が無傷の相手2人以上に命中させると、一度に8〜12ダメージを与えて勝利条件を満たすことができます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s06", no: 6, name: "守護", enName: "Protection", category: "防御",
            effect1: "自分：[回復]2",
            effect2: "ダメージを受けるとき：それを無効にする。",
            ruling: "自身がダメージを受ける直前に手札から割り込んで使用します。受ける予定のダメージを完全に0にします。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常使用として自分を[回復]2します。</li>
                            <li>効果2により、ダイス攻撃や大ダメージスキルを無効化して身を守ります。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s07", no: 7, name: "再分配", enName: "Redistribution", category: "操作",
            effect1: "全員の手札をすべて集めてシャッフルする。各プレイヤーに均等な枚数ずつ配り、余ったカードは捨て札にする。",
            ruling: "生存している全プレイヤーの手札を一度すべて回収してシャッフルし、1人あたり同じ枚数になるように配り直します。均等に配りきれなかった端数のカードはすべて捨て札になります。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>全員の手札を均等に配り直すことで、手札を溜め込んでいる《ゴーレム》や《死霊術師》の手札を減らします。</li>
                            <li>配りきれなかった端数は捨て札になるため、場全体の総手札数が減少し、《盗賊》の勝利条件を狙いやすくなります。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s08", no: 8, name: "革命", enName: "Revolution", category: "攻撃",
            effect1: "他1人：手札1枚につき、[ダメージ]1",
            ruling: "指定した他プレイヤー1人の現在の所持手札枚数と同じダメージを与えます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>手札を多く抱えているプレイヤーに対して高いダメージを与えます。手札5枚の《死霊術師》や《ゴーレム》への有効な対抗策となります。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s09", no: 9, name: "隠蔽", enName: "Veil", category: "妨害",
            effect1: "1人：公開されている役職1つを非公開にする。",
            ruling: "対象プレイヤーの公開されている役職カードを1枚選び、裏向き（非公開）に戻します。非公開に戻った役職の【永続】【勝利】は無効になります。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>公開されている役職を再び非公開に戻します。</li>
                            <li>相手の永続効果や勝利条件を停止させたり、告発者の全員公開勝利を阻止する用途で使用します。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s10", no: 10, name: "強撃", enName: "Impact", category: "攻撃",
            effect1: "1人：[ダメージ]4",
            ruling: "対象のプレイヤー1人に4ダメージを与えます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>単体に4ダメージを与える攻撃カードです。</li>
                            <li>《狂戦士》であれば5ダメージ、《14. 増幅》と組み合わせれば8ダメージとなります。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s11", no: 11, name: "取引", enName: "Trade", category: "操作",
            effect1: "他1人：手札すべて または 役職カード1つを自分と交換する。",
            ruling: "他プレイヤー1人を指定し、「手札すべての交換」または「役職カード1枚の交換」を行います。役職カードを交換する場合、公開中・非公開を問わず選択可能であり、交換後も公開・非公開の状態はそのまま維持されます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>相手の手札をすべて交換するか、役職カードを1枚交換します。</li>
                            <li>相手が公開している役職を直接指定して交換し、そのまま自分の前に公開状態で置くこともできます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s12", no: 12, name: "断罪", enName: "Judgement", category: "攻撃",
            effect1: "体力が最も高い全員：体力を半分(端数切上)にする。",
            ruling: "現在HPが生存者の中で最も高いプレイヤー全員が対象となり、それぞれのHPを半分(端数切上)にします。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>HPが単独または同率で最も高いプレイヤー全員のHPを半減させます。</li>
                            <li>複数人に同時にダメージが発生するため、《爆弾魔》のバースト勝利条件を満たす手段としても有効です。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s13", no: 13, name: "反射", enName: "Mirror", category: "防御",
            effect1: "1人：[ダメージ]2",
            effect2: "ダメージを受けるとき：攻撃者に反射する。",
            ruling: "自身がダメージを受ける直前に手札から割り込んで発動します。自身へのダメージを完全に無効化し、そのダメージをそのまま攻撃者（ダイスを振ったプレイヤー、または攻撃スキルを使用したプレイヤー）に与えます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常使用として任意の1人に[ダメージ]2を与えます。</li>
                            <li>効果2により、受ける予定だったダメージを攻撃者へ跳ね返します。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s14", no: 14, name: "増幅", enName: "Amplify", category: "強化",
            effect1: "手札から追加で1枚スキルカードを使用する。そのダメージ量と回復量がすべて2倍になる。",
            ruling: "このカードを使用後、手札から追加でもう1枚のスキルカードを使用します。その追加カードによるダメージ量および回復量の数値がすべて2倍になります。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>手札から追加で別のスキルを使用し、その効果数値を2倍にします。</li>
                            <li>《10. 強撃》や《01. 治癒》（6点回復）、《08. 革命》などと組み合わせて使用します。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s15", no: 15, name: "忍耐", enName: "Patience", category: "防御",
            effect1: "1人：[回復]2",
            effect2: "ダメージを受けて脱落するとき：脱落せず、HPを3にする。",
            ruling: "ダメージによって体力が0以下になり脱落する直前に手札から割り込んで発動します。脱落を無効化し、体力を3にします。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常使用として任意の1人を[回復]2します。</li>
                            <li>効果2により、致死ダメージを受けた際に脱落を免れてHP 3で復帰できます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s16", no: 16, name: "調和", enName: "Harmony", category: "操作",
            effect1: "全員：手札3枚以上なら2枚に捨てる。手札1枚以下なら2枚まで引く。",
            ruling: "生存している全プレイヤーを対象とし、手札が3枚以上のプレイヤーは手札が2枚になるように捨て札にし、手札が1枚以下のプレイヤーは手札が2枚になるように山札から引きます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>全員の手札枚数を2枚に調整します。手札の多い相手を減らし、手札が少ないプレイヤーを補充します。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s17", no: 17, name: "反転", enName: "Reversal", category: "操作",
            effect1: "他1人：自分と体力を入れ替える。",
            ruling: "指定した他プレイヤー1人と自身の現在の体力をそのまま入れ替えます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>自身と相手の現在の体力を入れ替えます。瀕死時に体力の高い相手と入れ替えることで、大ダメージと大回復を同時に行えます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s18", no: 18, name: "廃棄", enName: "Discard", category: "妨害",
            effect1: "1人：手札をすべて捨てる。",
            ruling: "指定したプレイヤー1人の手札をすべて捨て札にします。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>指定した相手の手札をすべて捨て札にします。</li>
                            <li>手札枚数に依存する《ゴーレム》や《死霊術師》の勝利を妨害したり、《盗賊》の勝利条件を達成する際に有効です。</li>
                        </ul>
                    </div>
                </div>
            `
        }
    ]
};