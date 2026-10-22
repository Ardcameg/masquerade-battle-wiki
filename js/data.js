const gameData = {
    roles: [
        {
            no: 1,
            id: "assassin",
            name: "暗殺者",
            enName: "The Assassin",
            hit: 1,
            summary: "相手を推殺せよ",
            victory: null,
            action: "非公開の役職を持つプレイヤー1人に、[ダメージ]3",
            skill: "追加でアクションを行う。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>【アクション】通常のアクションの代わりに、非公開の役職を持つプレイヤー1人を指定して[ダメージ]3を与えることができます。相手が2枚とも役職を公開している場合は対象に選べません。</li>
                    <li>【公開時】役職公開時に追加で1アクションを行えます。</li>
                    <li>Hitは「1」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>役職を公開していないプレイヤーに対して、確定で3ダメージを与えるアタッカーです。</li>
                            <li>役職公開時に追加アクションを行えるため、公開から即座に固有アクションやスキルカードへ繋げることができます。</li>
                            <li>《告発者》がいる場では相手が役職を公開しにくいため、固有アクションの対象を維持しやすくなります。</li>
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
            summary: "神の力で世界に平和を",
            victory: "ターン開始時：自分の体力が11以上",
            skill: "自分：[回復]4、他全員：[回復]2",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>自分の現在の体力が11以上の状態で自分のターンを迎えると勝利します。</li>
                    <li>初期HPは10ですが、最大HPの制限はないため回復効果によって11以上になります。</li>
                    <li>【公開時】自分を4回復し、他全員を2回復します。</li>
                    <li>Hitは「2」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>自身の公開時効果（自分4回復・他全員2回復）や《01. 治癒》、《06. 守護》を駆使して、自分のHPを11以上に引き上げます。</li>
                            <li>HP11以上を維持して次の自分のターンを迎える必要があるため、《06. 守護》や《13. 反射》などの防御札を手札に構えてから公開すると確実性が高まります。</li>
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
            summary: "力を見せつけろ",
            victory: null,
            skill: "HPを7にする。",
            passive: "自分が与えるすべてのダメージが+1",
            overview: `
                <ul class="wiki-list">
                    <li>Hitが0のため、2枚目の役職が非公開であれば「攻撃」のダイス判定で対象になっても受けるダメージは0となります。（※スキルカードや《暗殺者》の固有アクションによるダメージは通常通り受けます）</li>
                    <li>【公開時】自分のHPを7にします。</li>
                    <li>【永続】自分が与えるすべてのダメージが+1されます。</li>
                    <li>【永続】効果によるダメージ加算は、最後に行われます。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>2枚目の役職が非公開の状態（合計Hit 0）であれば、ダイス攻撃によるダメージを受けません。</li>
                            <li>永続の与ダメージ+1により、ダイス攻撃や《10. 強撃》（5点）、《05. 奇襲》（5点）などあらゆる攻撃のダメージが増加します。</li>
                            <li>体力が大きく減った段階で狂戦士を公開し、HPを7に戻す動きが有効です（HPが8以上のときに公開すると7に減ってしまうため注意が必要です）。</li>
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
            summary: "芸術は爆発だ！",
            victory: "自分が一度に合計7以上のダメージを複数人に与えた",
            skill: null,
            passive: "被ダメージ時：攻撃者に[ダメージ]1",
            overview: `
                <ul class="wiki-list">
                    <li>自身のアクション（ダイス攻撃、スキルカード等）で、一度に合計7以上のダメージを2人以上に与えた瞬間に勝利します。</li>
                    <li>この場合の「複数人」には自分も含めることができます。</li>
                    <li>【永続】ダメージを受けたとき、攻撃してきたプレイヤーに[ダメージ]1を与えます。</li>
                    <li>Hitは「1」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>他プレイヤーの公開役職のHitが高くなったタイミングでアクションB「攻撃」を行い、複数人にまとめてダメージを与えて合計7点以上の達成を狙います。</li>
                            <li>《12. 断罪》や《14. 増幅》などの全体攻撃・強化スキルと組み合わせることでも勝利条件を満たせます。</li>
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
            summary: "強固な体は死をも拒む",
            victory: "誰かの「攻撃」アクションで、自分だけがダメージを受けた。",
            skill: null,
            passive: "自分が受けるすべてのダメージが-1",
            overview: `
                <ul class="wiki-list">
                    <li>【永続】自分が受けるすべてのダメージが-1されます（1ダメージの攻撃であれば0になります）。</li>
                    <li>【勝利】誰かの「攻撃」アクション（ダイス攻撃）によって、自分ただ1人だけがダメージを受けたときに勝利します。</li>
                    <li>Hitは「3」です。ダイス攻撃で被弾した際も、自身の永続効果によってダメージが1軽減されます。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>他プレイヤーが2枚目を公開してHit合計が4以上になった状態や、他プレイヤーが《06. 守護》等でダメージを防いだ結果として、自分だけがダメージを受ける状況を狙います。</li>
                            <li>あらゆる被ダメージを-1できるため、細かいダメージを無効化しつつ粘り強く戦えます。</li>
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
            summary: "真実を暴け",
            victory: "ターン開始時：全員の役職が全て公開中",
            skill: "他1人：非公開の役職カードを1つ選び、公開する。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>ターン開始時に、生存している全員の役職がすべて公開中であれば勝利します。</li>
                    <li>【公開時】他プレイヤー1人の非公開の役職カードを1つ選び、強制的に公開させます。</li>
                    <li>Hitは「2」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>自身の公開時効果や《11. 取引》を活用し、他プレイヤーの非公開役職を公開させて全員公開を目指します。</li>
                            <li>告発者が公開されていると他プレイヤーは自発的に公開しにくくなるため、強制的に公開させる手段や他者の脱落を活用することが重要です。</li>
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
            summary: "最後の時を動かせ",
            victory: "脱落時：このターン終了後、追加で自分のターンを行い、攻撃者を脱落させる。",
            skill: null,
            passive: "『攻撃』アクションでダイスを1回振り直すことができる。",
            overview: `
                <ul class="wiki-list">
                    <li>【永続】自分の『攻撃』アクションでダイスを振った際、結果を1回だけ振り直すことができます。</li>
                    <li>【勝利】自身が脱落したとき、そのターン終了後に追加で自分のターンを1回行います。そのターン中に自分を脱落させた攻撃者を脱落させると勝利します。</li>
                    <li>Hitは「2」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>永続効果により、『攻撃』アクションで低い出目が出た場合や狙った対象に届かない場合にダイスを1回振り直せるため、安定したダメージ源になります。</li>
                            <li>脱落時の追加ターンで自分を倒した攻撃者を道連れにすれば逆転勝利となるため、体力が減っているプレイヤーはクロノスにトドメを刺しにくくなります。</li>
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
            summary: "屍の上に立て",
            victory: "ターン開始時：手札が5枚以上",
            skill: "捨て札から1枚選んで、手札に加える。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>ターン開始時に自分の手札が5枚以上あれば勝利します。</li>
                    <li>【公開時】捨て札から任意のスキルカードを1枚選んで手札に加えます。</li>
                    <li>Hitは「2」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>アクションC「集中」（2枚引いて手札に加え、1枚使用）を繰り返すことで手札枚数を増やします。</li>
                            <li>公開時効果で捨て札から防御札や必要なカードを回収し、手札5枚を維持してターンを迎えます。</li>
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
            summary: "全てを奪い取れ",
            victory: "ターン開始時：全員の手札の合計が1枚以下",
            skill: "他全員：手札を1枚捨てる。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>ターン開始時に、生存者全員の手札の合計枚数が1枚以下なら勝利します。</li>
                    <li>【公開時】自分以外の全プレイヤーは、手札を1枚選んで捨て札にします。</li>
                    <li>Hitは「1」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>自分の手札を使い切りつつ、他プレイヤーの手札が減ったタイミングで公開して全員に手札を1枚捨てさせ、合計1枚以下の達成を狙います。</li>
                            <li>《07. 再分配》や《18. 廃棄》を活用して場の手札を減らす動きが有効です。</li>
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
            summary: "死すらも娯楽に",
            victory: "脱落時：このラウンドで、すでに他1人以上が脱落している。",
            skill: "自分：自分と他1人の現在の体力の差と同じ量のダメージを受ける。",
            passive: null,
            overview: `
                <ul class="wiki-list">
                    <li>脱落したとき、このラウンドですでに他1人以上が脱落していれば勝利します。</li>
                    <li>【公開時】自分と他1人の現在の体力の差と同じ量のダメージを自分が受けます。</li>
                    <li>Hitは「1」です。</li>
                </ul>
            `,
            tactics: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>ラウンド中に最初の脱落者が出るまでは生き残り、誰かが倒れた後に公開時の自傷やダイス被弾で脱落して勝利を狙います。</li>
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
            ruling: "ダメージまたは回復が発生する瞬間に手札から割り込んで使用できます。ダメージは同じ量の回復に、回復は同じ量のダメージへと反転します。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常使用として任意の1人を[回復]3できます。</li>
                            <li>【割込】により、致命的なダメージを回復に変えたり、相手の回復をダメージに反転させて脱落させることができます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s02", no: 2, name: "先導", enName: "Leading", category: "防御",
            effect1: "2人：[回復]1",
            effect2: "スキルカードの対象になったとき：代わりに他プレイヤー1人を選ぶ。そのプレイヤーが効果を受ける。",
            ruling: "自身がスキルカードの対象になったときに手札から割り込んで発動します。代わりに他プレイヤー1人を選び、そのプレイヤーが効果を受けます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常使用として任意の2人をそれぞれ[回復]1します。</li>
                            <li>【割込】により、自身に向けられた攻撃スキルや妨害スキルの対象を他プレイヤーへ移し替えることができます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s03", no: 3, name: "波及", enName: "Ripple", category: "攻撃",
            effect1: "2人：[ダメージ]1",
            effect2: "ダメージを受けるとき：ダメージを受ける対象が「全員」になる。",
            ruling: "ダメージを受けるときに手札から割り込んで使用します。そのダメージを受ける対象が「全員」になります。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常使用として任意の2人にそれぞれ[ダメージ]1を与えます。</li>
                            <li>【割込】により、ダメージの対象を全員に拡大させます。《道化師》の同時脱落狙いや《爆弾魔》の勝利条件達成に活用できます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s04", no: 4, name: "偽証", enName: "Perjury", category: "妨害",
            effect1: "1人：[ダメージ]2",
            effect2: "役職カードが公開されたとき：その効果を全て無効にして非公開にする。",
            ruling: "役職カードが公開された瞬間に手札から割り込んで使用します。【公開時】などの効果をすべて無効にしたうえで、その役職を非公開（裏向き）に戻します。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常使用として任意の1人に[ダメージ]2を与えます。</li>
                            <li>【割込】により、相手の役職公開を無効化して裏向きに戻します。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s05", no: 5, name: "奇襲", enName: "Ambush", category: "攻撃",
            effect1: "全員：HPが8以上なら、HPを8にする。",
            ruling: "生存者全員のうち、現在のHPが8以上のプレイヤー全員のHPを8にします（自分がHP8以上であれば自分も含まれます）。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>HPが8以上のプレイヤー全員のHPをまとめて8にじす。</li>
                            <li>序盤の削りとして強力ですが、終盤になるにつれて価値が低くなっていきます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s06", no: 6, name: "守護", enName: "Protection", category: "防御",
            effect1: "自分：[回復]2",
            effect2: "ダメージを受けるとき：それを無効にする。",
            ruling: "自身がダメージを受けるときに手札から割り込んで使用し、そのダメージを無効（0）にします。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常使用として自分を[回復]2します。</li>
                            <li>【割込】により、受けるダメージを無効化して身を守ります。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s07", no: 7, name: "再分配", enName: "Redistribution", category: "操作",
            effect1: "全員の手札のスキルカードをシャッフルして配り直す。余った分は捨て札にする。",
            ruling: "生存している全プレイヤーの手札をすべて集めてシャッフルし、各プレイヤーに同じ枚数ずつ配り直します。均等に配りきれなかった余りのカードはすべて捨て札にします。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>全員の手札を均等に配り直すことで、手札を溜め込んでいる《死霊術師》などの手札を減らします。</li>
                            <li>余った分は捨て札になるため、場全体の総手札数が減少し、《盗賊》の勝利条件（全員の手札の合計が1枚以下）を狙いやすくなります。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s08", no: 8, name: "革命", enName: "Revolution", category: "攻撃",
            effect1: "他1人：手札1枚につき、[ダメージ]1",
            ruling: "指定した他プレイヤー1人の現在の手札枚数と同じ量のダメージを与えます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>手札を多く抱えているプレイヤーに対して大ダメージを与えます。《死霊術師》への有効な対抗策となります。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s09", no: 9, name: "隠蔽", enName: "Veil", category: "妨害",
            effect1: "1人：公開されている役職1つを非公開にする。",
            ruling: "対象プレイヤーの公開されている役職カードを1つ選び、非公開（裏向き）にします。非公開になった役職の【勝利】【永続】は無効になります。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>公開されている役職を再び非公開に戻します。</li>
                            <li>相手の永続効果や勝利条件を停止させたり、《告発者》の全員公開勝利を阻止する用途で使用します。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s10", no: 10, name: "強撃", enName: "Impact", category: "攻撃",
            effect1: "1人：[ダメージ]4",
            ruling: "対象のプレイヤー1人に[ダメージ]4を与えます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>単体に4ダメージを与える攻撃カードです。</li>
                            <li>《狂戦士》（与ダメ+1）であれば5ダメージ、《14. 増幅》と組み合わせれば8ダメージとなります。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s11", no: 11, name: "取引", enName: "Trade", category: "操作",
            effect1: "他1人：役職1つ または 手札すべてを自分と交換する",
            ruling: "他プレイヤー1人を指定し、「役職カード1つの交換」または「手札すべての交換」を行います。役職カードは公開中・非公開を問わず選択でき、交換後も公開・非公開の状態はそのまま維持されます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>相手の手札すべて、または役職カード1つを自分と交換します。</li>
                            <li>公開中の役職も交換対象に選べるため、相手の強力な公開役職を奪ったり、自分の役職を押し付けることができます。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s12", no: 12, name: "断罪", enName: "Judgement", category: "攻撃",
            effect1: "体力が最も高い全員：体力を半分(端数切上)にする。",
            ruling: "現在HPが最も高いプレイヤー全員（同率を含む）の体力を半分（端数切り上げ）にします。（例: HP 10ならHP 5になり5ダメージ分減少、HP 9ならHP 5になり4ダメージ分減少）",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>体力が最も高いプレイヤー全員の体力を一気に半減させます。</li>
                            <li>複数人に同時にダメージが発生するため、《爆弾魔》の勝利条件を満たす手段としても有効です。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s13", no: 13, name: "反射", enName: "Mirror", category: "防御",
            effect1: "1人：[ダメージ]2",
            effect2: "ダメージを受けるとき：攻撃者に反射する。",
            ruling: "自身がダメージを受けるときに手札から割り込んで発動します。自身へのダメージを無効にし、そのダメージを攻撃者に与えます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>通常使用として任意の1人に[ダメージ]2を与えます。</li>
                            <li>【割込】により、受けるダメージをそのまま攻撃者へ跳ね返します。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s14", no: 14, name: "増幅", enName: "Amplify", category: "強化",
            effect1: "手札から追加で1枚スキルカードを使用する。そのダメージ量と回復量がすべて2倍になる。",
            ruling: "手札から追加で1枚スキルカードを使用し、そのカードのダメージ量と回復量をすべて2倍にします。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>手札から追加で別のスキルを使用し、そのダメージ・回復量を2倍にします。</li>
                            <li>《10. 強撃》（8ダメージ）や《01. 治癒》（6回復）、《08. 革命》（手札枚数×2ダメージ）などと組み合わせて使用します。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s15", no: 15, name: "流転", enName: "Shift", category: "操作",
            effect1: "全員：手札を右隣の人に渡す。",
            ruling: "生存している全プレイヤーは、現在の自分の手札すべてを同時に右隣の生存プレイヤーへ渡します（このカード自身は使用により捨て札になるため、渡す手札には含まれません）。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>全員の手札がそのまま右隣のプレイヤーへ移動します。</li>
                            <li>自分が手札を使い切った状態で使用すれば、右隣のプレイヤーの手札を0枚にしつつ、左隣のプレイヤーの手札をすべて受け取ることができます。《死霊術師》の妨害や《盗賊》の勝利条件達成にも有効です。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s16", no: 16, name: "調和", enName: "Harmony", category: "操作",
            effect1: "全員：手札3枚以上なら2枚に捨てる。手札1枚以下なら2枚まで引く。",
            ruling: "生存者全員について、手札が3枚以上なら2枚になるように捨て札にし、手札が1枚以下なら2枚になるまで山札から引きます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>全員の手札枚数を2枚に揃えます。手札の多い相手を減らし、手札が少ないプレイヤーを補充します。</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "s17", no: 17, name: "反転", enName: "Reversal", category: "操作",
            effect1: "他1人：自分と体力を入れ替える。",
            ruling: "指定した他プレイヤー1人と自分の現在の体力を入れ替えます。",
            usage: `
                <div class="tactic-block">
                    <div class="tactic-desc">
                        <ul class="wiki-list">
                            <li>自分と相手の現在の体力を入れ替えます。瀕死時に体力の高い相手と入れ替えることで一気に逆転を狙えます。</li>
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
                            <li>指定した1人の手札をすべて捨てさせます。</li>
                            <li>手札枚数に依存する《死霊術師》の妨害や、《盗賊》の勝利条件達成に有効です。</li>
                        </ul>
                    </div>
                </div>
            `
        }
    ]
};
