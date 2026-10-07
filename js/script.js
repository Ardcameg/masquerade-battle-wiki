document.addEventListener('DOMContentLoaded', () => {
    function hideLoading() {
        const loading = document.getElementById('loading-screen');
        if (loading) {
            loading.classList.add('hidden');
            setTimeout(() => loading.style.display = 'none', 500);
        }
    }
    setTimeout(hideLoading, 800);

    initNavigation();
    handleRoute();
    window.addEventListener('hashchange', handleRoute);

    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            sidebar.classList.toggle('open');
        });
    }
});

const categoryClassMap = {
    // 役職 (Roles)
    "アタッカー": "cat-attacker",
    "サポート": "cat-support",
    "コントロール": "cat-control",
    "トリックスター": "cat-trickster",
    "タンク": "cat-tank",
    "特殊": "cat-trickster", // 互換用
    
    // スキル (Skills)
    "攻撃": "cat-attacker",
    "防御": "cat-tank",
    "回復": "cat-heal",
    "強化": "cat-special",
    "妨害": "cat-control",
    "操作": "cat-trickster",
    "全体操作": "cat-trickster", // 互換用
    "自己強化": "cat-special"  // 互換用
};

function getCategoryClass(categoryName) {
    return categoryClassMap[categoryName] || "";
}

const categoryColorMap = {
    "cat-attacker": "var(--cat-attacker)",
    "cat-support": "var(--cat-support)",
    "cat-tank": "var(--cat-tank)",
    "cat-trickster": "var(--cat-trickster)",
    "cat-control": "var(--cat-control)",
    "cat-heal": "var(--cat-heal)",
    "cat-special": "var(--cat-special)"
};

const elementColorMap = {
    "red": "#ff5252",
    "green": "#69f0ae",
    "yellow": "#ffd740",
    "purple": "#e040fb",
    "blue": "#40c4ff"
};

function autoLink(text, currentId = null) {
    if (!text) return text;
    let result = text;
    
    // Process Roles
    gameData.roles.forEach(r => {
        if (r.id === currentId) return;
        const regex = new RegExp(`[「《]?${r.name}[」》]?`, 'g');
        result = result.replace(regex, `<a href="#role/${r.id}" class="inline-link">《${r.name}》</a>`);
    });
    
    // Process Skills
    gameData.skills.forEach(s => {
        if (s.id === currentId) return;
        const sNum = parseInt(s.id.replace('s', ''), 10);
        const sNoStr = String(sNum).padStart(2, '0');
        const regex = new RegExp(`[「《]?スキル\\s*(0?${sNum})(?!\\d)[」》]?`, 'g');
        result = result.replace(regex, `<a href="#skill/${s.id}" class="inline-link">《${sNoStr}. ${s.name}》</a>`);
        if (s.name && s.name !== "欠番") {
            const regexName = new RegExp(`[「《]${s.name}[」》]`, 'g');
            result = result.replace(regexName, `<a href="#skill/${s.id}" class="inline-link">《${sNoStr}. ${s.name}》</a>`);
        }
    });
    
    result = result.replace(/\\[ダメージ\\](\\d+|手札の枚数)/g, '<span class="keyword-damage" title="[ダメージ]X: Xの分だけダメージを受ける">[ダメージ]$1</span>');
    result = result.replace(/\\[回復\\](\\d+)/g, '<span class="keyword-heal" title="[回復]X: Xの分だけ回復する">[回復]$1</span>');

    return result;
}

function initNavigation() {
    const rolesNav = document.getElementById('nav-roles');
    const skillsNav = document.getElementById('nav-skills');

    const sortedRoles = [...gameData.roles]
        .filter(role => !role.hidden)
        .sort((a, b) => (a.no || 0) - (b.no || 0));

    sortedRoles.forEach(role => {
        const elemColor = elementColorMap[role.element] || "var(--border-accent)";

        const li = document.createElement('li');
        li.innerHTML = `<a href="#role/${role.id}" class="nav-link" data-id="role/${role.id}" data-color="${elemColor}">
            <span class="nav-link-text">
                ${role.no ? `<span class="nav-link-name" style="font-size: 0.75rem; opacity: 0.5; margin-right: 6px;">${String(role.no).padStart(2, '0')}</span>` : ''}
                <span class="nav-link-name">${role.elementIcon ? `${role.elementIcon} ` : ''}${role.name}</span>
                <span class="nav-link-en">${role.enName}</span>
            </span>
            ${role.elementName ? `<span class="badge elem-${role.element}" style="font-size: 0.6rem; padding: 1px 6px; border-radius: 2px;">${role.elementName}</span>` : ''}
        </a>`;
        rolesNav.appendChild(li);
    });

    const sortedSkills = [...gameData.skills]
        .filter(skill => !skill.hidden)
        .sort((a, b) => {
            const numA = parseInt(a.id.replace(/\D/g, ''), 10);
            const numB = parseInt(b.id.replace(/\D/g, ''), 10);
            return numA - numB;
        });

    sortedSkills.forEach(skill => {
        const catClass = getCategoryClass(skill.category);
        const catColor = categoryColorMap[catClass] || "var(--border-accent)";
        const skillNo = skill.no ? String(skill.no).padStart(2, '0') : skill.id.replace(/\D/g, '');

        const li = document.createElement('li');
        li.innerHTML = `<a href="#skill/${skill.id}" class="nav-link" data-id="skill/${skill.id}" data-color="${catColor}">
            <span class="nav-link-text">
                <span class="nav-link-name" style="font-size: 0.75rem; opacity: 0.5; margin-right: 6px;">${skillNo}</span>
                <span class="nav-link-name">${skill.name}</span>
                <span class="nav-link-en">${skill.enName}</span>
            </span>
            <span class="badge ${catClass}" style="font-size: 0.6rem; padding: 1px 6px; border-radius: 2px;">${skill.category}</span>
        </a>`;
        skillsNav.appendChild(li);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = this.getAttribute('data-color') || "var(--border-accent)";
        });
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.borderLeftColor = "transparent";
            }
        });
    });
}

function handleRoute() {
    let hash = window.location.hash.substring(1);
    if (!hash) hash = 'rules';

    const highlight = document.getElementById('nav-highlight');
    let foundActive = false;

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        link.style.color = "var(--text-muted)";
        link.style.borderLeftColor = "";
        link.style.backgroundColor = "";
        
        if (link.getAttribute('href') === `#${hash}`) {
            link.classList.add('active');
            const color = link.getAttribute('data-color') || "var(--border-accent)";
            link.style.color = "var(--text-main)";
            foundActive = true;
            
            if (highlight) {
                setTimeout(() => {
                    const navContainer = document.querySelector('.sidebar-nav');
                    const linkRect = link.getBoundingClientRect();
                    const containerRect = navContainer.getBoundingClientRect();
                    const topPos = linkRect.top - containerRect.top + navContainer.scrollTop;
                    
                    highlight.style.opacity = '1';
                    highlight.style.transform = `translateY(${topPos}px)`;
                    highlight.style.borderLeftColor = color;
                }, 10);
            }
        }
    });

    if (!foundActive && highlight) {
        highlight.style.opacity = '0';
    }

    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        hamburger.classList.remove('active');
    }

    const container = document.getElementById('content-container');
    container.classList.remove('fade-in');
    void container.offsetWidth;
    container.classList.add('fade-in');

    if (hash === 'rules') {
        renderRules(container);
    } else if (hash === 'advanced-rules') {
        renderAdvancedRules(container);
    } else if (hash.startsWith('role/')) {
        const id = hash.split('/')[1];
        const role = gameData.roles.find(r => r.id === id);
        if (role) renderRole(container, role);
        else renderNotFound(container);
    } else if (hash.startsWith('skill/')) {
        const id = hash.split('/')[1];
        const skill = gameData.skills.find(s => s.id === id);
        if (skill) renderSkill(container, skill);
        else renderNotFound(container);
    } else {
        renderNotFound(container);
    }
    
    document.querySelector('.main-content').scrollTop = 0;
}

function renderRules(container) {
    container.innerHTML = `
        <h1 class="page-title">Rules & Mechanics</h1>      

        <h2>内容</h2>
        <div class="ability-section">
            <ul class="rules-list">
                <li><strong>カード: 32枚</strong>
                    <ul class="wiki-list" style="margin-top: 0.3rem;">
                        <li>役職カード: 10枚</li>
                        <li>スキルカード: 18枚</li>
                        <li>体力管理・サマリーカード: 4枚（1〜10の数字で体力を管理）</li>
                    </ul>
                </li>
                <li><strong>対象人数:</strong> 3〜4人</li>
            </ul>
        </div>

        <h2>ゲームの目的 / 勝利条件</h2>
        <p>以下のどちらかを満たせば勝利となりゲームが終了します。</p>
        <ul class="rules-list">
            <li>すべての他プレイヤーの体力を0にする（自分だけ生き残る）。</li>
            <li>公開されている自身の役職の固有勝利条件を満たす。</li>
        </ul>

        <h2>属性および弱点について</h2>
        <div class="ability-section">
            <ul class="rules-list">
                <li>役職には、🔴🔵🟡🟢🟣のうちどれかの属性が1つついている。</li>
                <li>「🔴+1」などとある場合、🔴属性の役職から受けるダメージが+1される。</li>
                <li>役職が公開されていれば、2役職でそれぞれの属性で判断され、この効果は重複します。</li>
            </ul>
            <div class="element-affinity-box" style="margin-top: 0.8rem;">
                <span style="color: #ff5252; font-weight: bold;">🔴 赤</span> は <span style="color: #69f0ae; font-weight: bold;">🟢 緑</span> に強い（🟢は🔴弱点）<br>
                <span style="color: #69f0ae; font-weight: bold;">🟢 緑</span> は <span style="color: #e040fb; font-weight: bold;">🟣 紫</span> に強い（🟣は🟢弱点）<br>
                <span style="color: #e040fb; font-weight: bold;">🟣 紫</span> は <span style="color: #ffd740; font-weight: bold;">🟡 黄</span> に強い（🟡は🟣弱点）<br>
                <span style="color: #ffd740; font-weight: bold;">🟡 黄</span> は <span style="color: #40c4ff; font-weight: bold;">🔵 青</span> に強い（🔵は🟡弱点）<br>
                <span style="color: #40c4ff; font-weight: bold;">🔵 青</span> は <span style="color: #ff5252; font-weight: bold;">🔴 赤</span> に強い（🔴は🔵弱点）
            </div>
        </div>

        <h2>スキルカードのルール</h2>
        <div class="ability-section">
            <ul class="rules-list">
                <li><strong>「Aするとき：〇〇」と書かれたカード（割り込み・リアクション）:</strong>
                    <ul class="wiki-list" style="margin-top: 0.3rem;">
                        <li>誰かがAを行うときのみ使用でき、割り込みで効果が発動する。</li>
                        <li>発動後、捨て札になる。</li>
                        <li>複数使用された場合、<strong>最後に発動したもののみ効果が発動する</strong>。</li>
                        <li>通常のターンアクションとして素出しすることはできない。</li>
                    </ul>
                </li>
                <li><strong>効果が2つ書いてあるもの:</strong>
                    <ul class="wiki-list" style="margin-top: 0.3rem;">
                        <li>そのうちどちらかしか発動できない。</li>
                    </ul>
                </li>
            </ul>
        </div>

        <h2>ゲームの流れ</h2>
        <div class="ability-section">
            <h4>1. ゲーム開始処理</h4>
            <ul class="rules-list">
                <li>役職カードをシャッフルして、1人2枚ずつ分け、自分の前に置く。</li>
                <li>スキルカードをシャッフルし、1人3枚ずつ手札として分ける。余ったものは中央に置き、山札とする。</li>
                <li>サマリーカードを各プレイヤーに配る。</li>
                <li>プレイヤーは、役職カードのうち、1枚を選んで公開する。
                    <ul class="wiki-list" style="margin-top: 0.3rem;">
                        <li>各プレイヤーの最大体力は、所持する役職カード2枚の最大体力の合計である。</li>
                        <li>非公開の役職の最大体力は常に5として扱う。</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="ability-section">
            <h4>2. ゲーム開始</h4>
            <ul class="rules-list">
                <li>スタートプレイヤーを決める。</li>
            </ul>
        </div>
        <div class="ability-section">
            <h4>3. 最初のラウンド</h4>
            <ul class="rules-list">
                <li>最初のラウンドでは、スタートプレイヤーから役職を公開するアクションのみができる。</li>
                <li>【スキル】が有れば発動し、【永続】や【勝利】も有効となる。</li>
                <li>それ以外のアクションはできず、手札ドラフトも発生しない。</li>
            </ul>
        </div>
        <div class="ability-section">
            <h4>4. ラウンド開始</h4>
            <ul class="rules-list">
                <li>ラウンドを開始する。</li>
                <li>スタートプレイヤーのターンとなる。</li>
            </ul>
        </div>
        <div class="ability-section">
            <h4>5. プレイヤーターン</h4>
            <p>プレイヤーのターンでは、以下のアクションから1つを選んで行う。行ったなら、ターンを終了し、次のプレイヤーのターンになる。</p>
            <ol class="rules-list" type="A">
                <li><strong>スキルカードを使う</strong>
                    <p>手札から1枚使い、効果を処理する。使ったカードは捨て札にする。</p>
                </li>
                <li><strong>他プレイヤー1人を「攻撃」する</strong>
                    <p>体力が0のプレイヤーには「攻撃」できない。<br>
                    対象となるプレイヤーに2ダメージを与える。</p>
                </li>
                <li><strong>集中する</strong>
                    <p>山札からスキルカードを2枚引き、手札に加える。その後、手札から1枚選んで捨て札にする。<br>
                    山札が切れたなら、捨て札をシャッフルし、新たな山札にする。</p>
                </li>
                <li><strong>役職を公開する</strong>
                    <p>非公開状態から公開状態になった時、【スキル】を発動する。<br>
                    公開している間、その役職の【勝利】【永続】が有効になる。</p>
                </li>
            </ol>
            <p style="font-size: 0.9em; color: var(--text-muted); margin-top: 0.5rem;">
                ※プレイヤーのターンで、何の行動もできない場合、「パス」となる。そうでない場合、必ず行動を行う。<br>
                ※プレイヤーが脱落したとき、そのプレイヤーが管理するスキルカードはすべて捨て札にする。
            </p>
        </div>
        <div class="ability-section">
            <h4>6. ラウンド終了</h4>
            <ul class="rules-list">
                <li>ラウンド終了後、自分の手札から1枚選び、それ以外をすべて左隣のプレイヤーにそのまま渡す。</li>
                <li>スタートプレイヤーをターンが次のプレイヤーに回し、ラウンドを最初から行う。</li>
            </ul>
        </div>
        <div class="ability-section">
            <h4>7. ゲーム終了</h4>
            <ul class="rules-list">
                <li>プレイヤーが以下の勝利条件のどれかを満たしたなら、ゲームを終了する。</li>
            </ul>
            <div class="priority-box" style="margin-top: 2rem;">
                <h4 style="color: #fff; margin-bottom: 0.3rem; font-family: var(--font-heading);">勝利優先度について</h4>
                <p style="font-size: 0.85rem;">複数のプレイヤーが同時に勝利条件を満たした場合、上から順に勝利が優先される。勝利優先度が同じプレイヤーが複数勝利条件を満たした場合、全員勝利となる。</p>
                <ol style="margin-left: 1.5rem; color: var(--border-accent); margin-top: 0.5rem; font-size: 0.9rem;">
                    <li><strong>脱落したプレイヤー</strong></li>
                    <li><strong>脱落させたプレイヤー</strong></li>
                    <li><strong>その他のプレイヤー</strong></li>
                </ol>
            </div>
        </div>
    `;
}

function renderAdvancedRules(container) {
    container.innerHTML = `
        <h1 class="page-title">詳細なゲーム仕様・裁定</h1>
        <p>ここでは、より複雑な処理や、ゲーム内の用語の厳密な定義について解説します。<br>
        大して読む必要はないです</p>

        <h2>ステータスに関する裁定</h2>
        <ul class="rules-list">
            <li>各プレイヤーの最大体力は、所持する役職カード2枚の最大体力の合計です。</li>
            <li>非公開の役職の最大体力は常に「5」として扱い、役職をまったく公開していないプレイヤーの最大体力は「10」として扱います。</li>
            <li>何らかの理由で現在の体力が最大体力を上回った場合、最大体力へ切り捨てます。それ以外で最大体力が変わっても、現在の体力を受け継ぎます。</li>
        </ul>

        <h2>属性と弱点に関する裁定</h2>
        <ul class="rules-list">
            <li><strong>弱点の計算順序:</strong> 弱点によるダメージ増加（+1）は、役職の永続能力（ゴーレムの受けるダメージ上限2など）やスキル（増幅などによる倍加）が適用された<strong>後の最終ダメージ計算時</strong>に加算されます。<br>
            <span style="color: var(--text-muted); font-size: 0.9em;">
            ※例: 狂戦士（🔴属性・与ダメ+2）が通常攻撃（2点+狂戦士永続2点=4点）を、🔴弱点を持つゴーレム（🟢属性・被ダメ上限2）に与える場合：ゴーレムの永続上限により4点➔2点となった後、🔴弱点+1が加算され、最終的に「3ダメージ」を受けます。
            </span>
            </li>
            <li><strong>2役職公開時の属性・弱点の重複:</strong>
                <ul class="wiki-list">
                    <li>属性による攻撃力は、属性1つとその弱点属性1つの、2役職の「コンビ」につき1回加算されます。</li>
                    <li>同属性の役職を2枚公開しているプレイヤーが攻撃する場合、弱点属性を1役職持つプレイヤーには攻撃力が+1、2役職持つプレイヤーには攻撃力が+2されます。</li>
                </ul>
            </li>
            <li><strong>非公開役職の属性・弱点:</strong> 非公開状態の役職の属性や弱点は無効です。プレイヤーは公開されている役職の属性・弱点のみを持ちます。</li>
            <li><strong>ダメージを伴わない効果への影響:</strong> 弱点ボーナスは「ダメージを与える」処理にのみ適用されます。回復や手札交換などの効果には影響しません。</li>
        </ul>

        <h2>テキストの対象指定・定義に関する裁定</h2>
        <ul class="rules-list">
            <li>特に明記されていない限り、「自分」とはそのカードを所持・使用しているプレイヤー自身を指します。<br>また、「他」と書いていなければ、条件を満たしている限り、対象として自分自身も選ぶことができ、自分自身も対象に含まれます。</li>
            <li><strong>「効果」</strong>とは、スキルカードの効果、および役職の【スキル】や【永続】を指します。「攻撃」アクションや、【勝利】は含まれません。</li>
        </ul>

        <h2>スキルカードの割り込み（リアクション）に関する裁定</h2>
        <ul class="rules-list">
            <li><strong>発動タイミング:</strong> 「Aするとき：〇〇」と書かれたスキルカードは、該当するトリガー事象Aが発生した瞬間にのみ手札から割り込んで使用できます。</li>
            <li><strong>使用について:</strong>ターンの通常のアクションとしては使用できず、トリガーが発生したときのみ使用できます。</li>
            <li><strong>使用後の処理:</strong> 効果を処理した後、そのカードは通常通り捨て札になります。</li>
            <li><strong>複数の割り込みが発生した場合の処理:</strong> 割り込みスキルに対して割り込みスキルを使用した場合、<strong>最後に発動したもののみ</strong>が有効となり、その効果を適用します。</li>
            <li>1つのトリガー事象に対して複数のプレイヤーが割り込みスキルを使用した場合、<strong>その全て</strong>が有効となり、<strong>スタートプレイヤーから手番順に</strong>効果を適用します。</li>
        </ul>

        <h2>その他の特殊裁定</h2>
        <ul class="rules-list">
            <li>役職の【勝利】【スキル】【永続】は、そのカードが公開されている場合のみ有効となります。非公開状態では発動しません。</li>
            <li><strong>《03. 波及》（スキル03）の裁定:</strong> 「ちょうど1人のプレイヤー」に与えられるダメージでのみ発動します。《06. 奇襲》などの全体効果や、2人以上が同時にダメージを受ける処理では発動しません。</li>
            <li><strong>《14. 反射》（スキル14）の裁定:</strong> ダメージを受ける直前に割り込み、そのダメージをそのまま攻撃者に与えます。</li>
        </ul>

        <h2>カード効果のキーワード</h2>
        <ul class="rules-list">
            <li><strong>[ダメージ]X:</strong> 「Xの分だけダメージを受ける」ことを意味します。</li>
            <li><strong>[回復]X:</strong> 「Xの分だけ回復する」ことを意味します。</li>
        </ul>
    `;
}

let glitchTimer = null;
let glitchTimeout = null;

function triggerGlitchText(element, targetText) {
    if (!element || !targetText) return;

    if (glitchTimer) clearInterval(glitchTimer);
    if (glitchTimeout) clearTimeout(glitchTimeout);

    element.textContent = '';
    element.classList.remove('glitching');

    const glitchChars = '!<>-_\\/[]{}—=+*^?#ｱｲｳｴｵｶｷｸｹｺ0123456789';
    const totalFrames = 16;
    const intervalMs = 28;

    glitchTimeout = setTimeout(() => {
        element.classList.add('glitching');
        let frame = 0;

        glitchTimer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const resolvedLength = Math.floor(progress * targetText.length);

            let output = targetText.slice(0, resolvedLength);
            for (let i = resolvedLength; i < targetText.length; i++) {
                output += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            element.textContent = output;

            if (frame >= totalFrames) {
                clearInterval(glitchTimer);
                glitchTimer = null;
                element.textContent = targetText;
                setTimeout(() => {
                    element.classList.remove('glitching');
                }, 100);
            }
        }, intervalMs);
    }, 220);
}

function renderRole(container, role) {
    let html = `
        <div style="margin-bottom: 2rem;">
            <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 0.5rem;">
                <h1 class="page-title" style="margin-bottom: 0; border: none; padding: 0;">${role.elementIcon ? `${role.elementIcon} ` : ''}${role.name}</h1>
                <span style="font-family: var(--font-heading); color: var(--text-muted); font-size: 1.2rem;">${role.enName}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.8rem; flex-wrap: wrap;">
                ${role.elementName ? `<span class="badge elem-${role.element}">属性: ${role.elementIcon} ${role.elementName}</span>` : ''}
                ${role.weaknessName ? `<span class="badge elem-${role.weakness}">弱点: ${role.weaknessIcon} (${role.weaknessName})</span>` : ''}
            </div>
            ${role.summary ? `<div class="role-flavor" id="role-flavor"></div>` : ''}
        </div>

        <div class="stat-row">
            <div class="stat-item">
                <span class="stat-label">最大体力</span>
                <span class="stat-value">${role.hp}</span>
            </div>
            ${role.elementName ? `
            <div class="stat-item">
                <span class="stat-label">属性</span>
                <span class="stat-value stat-element">${role.elementIcon} ${role.elementName}</span>
            </div>` : ''}
            ${role.weaknessName ? `
            <div class="stat-item">
                <span class="stat-label">弱点</span>
                <span class="stat-value stat-weakness">${role.weaknessIcon} <span style="font-size: 0.8rem; color: var(--text-muted);">(${role.weaknessName}から+1)</span></span>
            </div>` : ''}
        </div>

        <div class="detail-card">
    `;

    if(role.victory){
        html += `
            <div class="victory-section ability-section">
                <h4>固有勝利条件</h4>
                <p>${autoLink(role.victory, role.id)}</p>
            </div>
        `;
    }
    
    if (role.skill) {
        html += `
            <div class="ability-section">
                <h4>【スキル】</h4>
                <p>${autoLink(role.skill, role.id)}</p>
            </div>
        `;
    }

    if (role.passive) {
        html += `
            <div class="ability-section">
                <h4>【永続】</h4>
                <p>${autoLink(role.passive, role.id)}</p>
            </div>
        `;
    }

    html += `
            <div class="tactics-section">
                <h4>概要・特殊裁定</h4>
                ${autoLink(role.overview, role.id)}
            </div>
            <div class="tactics-section">
                <h4>立ち回り・ポイント</h4>
                ${autoLink(role.tactics, role.id)}
            </div>
        </div>
    `;

    container.innerHTML = html;

    if (role.summary) {
        const flavorEl = document.getElementById('role-flavor');
        if (flavorEl) {
            triggerGlitchText(flavorEl, role.summary);
        }
    }
}

function renderSkill(container, skill) {
    const catClass = getCategoryClass(skill.category);
    const skillNo = skill.no ? String(skill.no).padStart(2, '0') : skill.id.replace(/\D/g, '');
    
    const eff1 = skill.effect1 || skill.effect;
    let effectBlocksHtml = '';

    if (eff1) {
        effectBlocksHtml += `
            <div class="ability-section" style="border-left: 3px solid var(--border-accent);">
                <h4>${skill.effect2 ? '効果1' : '効果'}</h4>
                <p style="font-size: 1.1rem; color: #fff;">${autoLink(eff1, skill.id)}</p>
            </div>
        `;
    }

    if (skill.effect2) {
        effectBlocksHtml += `
            <div class="ability-section" style="border-left: 3px solid var(--border-accent);">
                <h4>効果2</h4>
                <p style="font-size: 1.1rem; color: #fff;">${autoLink(skill.effect2, skill.id)}</p>
            </div>
        `;
    }

    container.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 0.5rem;">
                <h1 class="page-title" style="margin-bottom: 0; border: none; padding: 0;">${skillNo}. ${skill.name}</h1>
                <span style="font-family: var(--font-heading); color: var(--text-muted); font-size: 1.2rem;">${skill.enName}</span>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                <span class="badge ${catClass}">${skill.category}</span>
            </div>
        </div>

        <div class="detail-card">
            ${effectBlocksHtml}
            
            <div class="tactics-section">
                <h4>使い方・ポイント</h4>
                ${autoLink(skill.usage, skill.id)}
            </div>
        </div>
    `;
}

function renderNotFound(container) {
    container.innerHTML = `
        <h1 class="page-title">404 Not Found</h1>
        <p>指定されたページが見つかりません。</p>
    `;
}