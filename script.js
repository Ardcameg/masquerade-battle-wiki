document.addEventListener('DOMContentLoaded', () => {
    // Remove loading screen safely
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
});

// Maps Japanese category names to CSS classes
const categoryClassMap = {
    // Rolls
    "アタッカー": "cat-attacker",
    "サポート": "cat-support",
    "コントロール": "cat-control",
    "特殊": "cat-trickster",
    
    // Skills
    "回復": "cat-heal",
    "防御": "cat-tank",
    "攻撃": "cat-attacker",
    "妨害": "cat-control",
    "全体操作": "cat-trickster",
    "自己強化": "cat-special"
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

// Automatically converts mentions of roles and skills into links
function autoLink(text) {
    if (!text) return text;
    let result = text;
    
    // Process Roles
    gameData.roles.forEach(r => {
        const regex = new RegExp(`「?${r.name}」?`, 'g');
        result = result.replace(regex, `<a href="#role/${r.id}" class="inline-link">「${r.name}」</a>`);
    });
    
    // Process Skills
    gameData.skills.forEach(s => {
        const sNum = s.id.replace('s', ''); // e.g. "01"
        const regex = new RegExp(`「?スキル\\s*${sNum}」?`, 'g');
        result = result.replace(regex, `<a href="#skill/${s.id}" class="inline-link">「スキル${sNum}」</a>`);
    });
    
    return result;
}

function initNavigation() {
    const rolesNav = document.getElementById('nav-roles');
    const skillsNav = document.getElementById('nav-skills');

    // Group Roles by Category
    const rolesByCategory = {};
    gameData.roles.forEach(role => {
        if (role.hidden) return;
        if (!rolesByCategory[role.category]) rolesByCategory[role.category] = [];
        rolesByCategory[role.category].push(role);
    });

    for (const [category, roles] of Object.entries(rolesByCategory)) {
        const catClass = getCategoryClass(category);
        const catColor = categoryColorMap[catClass] || "var(--border-accent)";
        
        const catLi = document.createElement('li');
        catLi.className = 'nav-category';
        catLi.style.color = catColor;
        catLi.textContent = category;
        rolesNav.appendChild(catLi);

        roles.forEach(role => {
            const li = document.createElement('li');
            
            // Build detailed tooltip
            let tooltip = `【勝利条件】\n${role.victory}`;
            if (role.skill) tooltip += `\n\n【スキル】\n${role.skill}`;
            if (role.passive) tooltip += `\n\n【永続効果】\n${role.passive}`;
            
            li.innerHTML = `<a href="#role/${role.id}" class="nav-link" data-id="role/${role.id}" data-color="${catColor}" title="${tooltip}">
                ${role.name} <span style="font-size: 0.65rem; opacity: 0.5; margin-left: 5px;">${role.enName}</span>
            </a>`;
            rolesNav.appendChild(li);
        });
    }

    // Group Skills by Category
    const skillsByCategory = {};
    gameData.skills.forEach(skill => {
        if (skill.hidden) return;
        if (!skillsByCategory[skill.category]) skillsByCategory[skill.category] = [];
        skillsByCategory[skill.category].push(skill);
    });

    for (const [category, skills] of Object.entries(skillsByCategory)) {
        const catClass = getCategoryClass(category);
        const catColor = categoryColorMap[catClass] || "var(--border-accent)";

        const catLi = document.createElement('li');
        catLi.className = 'nav-category';
        catLi.style.color = catColor;
        catLi.textContent = category;
        skillsNav.appendChild(catLi);

        skills.forEach(skill => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#skill/${skill.id}" class="nav-link" data-id="skill/${skill.id}" data-color="${catColor}" title="${skill.effect}">
                ${skill.name} <span style="font-size: 0.65rem; opacity: 0.5; margin-left: 5px;">${skill.enName}</span>
            </a>`;
            skillsNav.appendChild(li);
        });
    }

    // Add hover effects for colored borders
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
    if (!hash) hash = 'home';

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        link.style.borderLeftColor = "transparent";
        link.style.color = "var(--text-muted)";
        link.style.backgroundColor = "transparent";
        
        if (link.getAttribute('href') === `#${hash}`) {
            link.classList.add('active');
            const color = link.getAttribute('data-color') || "var(--border-accent)";
            link.style.borderLeftColor = color;
            link.style.color = "var(--text-main)";
            // Add subtle background highlight for active link
            link.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
        }
    });

    const container = document.getElementById('content-container');
    
    // Trigger smooth fade-in
    container.classList.remove('fade-in');
    void container.offsetWidth; // force reflow
    container.classList.add('fade-in');

    if (hash === 'home') {
        renderHome(container);
    } else if (hash === 'rules') {
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
    
    // Scroll to top on route change
    document.querySelector('.main-content').scrollTop = 0;
}

function renderHome(container) {
    container.innerHTML = `
        <h1 class="page-title">Masquerade Battle</h1>
        <p>「マスカレード・バトル」のルールWikiへようこそ。本作は3〜4人用の正体隠匿系バトルロイヤルカードゲームです。</p>
        <div class="detail-card" style="margin-top: 1.5rem;">
            <h2>ゲームの概要</h2>
            <p>各プレイヤーは固有の能力と勝利条件を持つ「役職カード」を隠し持ち、スキルカードを駆使して他のプレイヤーの体力を0にすることを目指します。最後まで生き残るか、自身の「固有勝利条件」を満たしたプレイヤーが勝者となります。</p>
            <div class="stat-row" style="margin-top: 1.5rem;">
                <div class="stat-item">
                    <span class="stat-label">プレイ人数</span>
                    <span class="stat-value">3〜4人</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">32枚 (役職10枚 / スキル18枚 / 体力管理カード4枚)</span>
                </div>
            </div>
            <p style="margin-top: 1rem; color: var(--border-accent);">左のメニューから、詳しいルールや各カードの詳細を確認してください。</p>
        </div>
    `;
}

function renderRules(container) {
    container.innerHTML = `
        <h1 class="page-title">Rules & Mechanics</h1>
        
        <h2>ゲームの目的 / 勝利条件</h2>
        <p>基本となる勝利条件は <strong>「すべての他プレイヤーの体力を0にすること（最後まで生き残ること）」</strong> です。<br>
        ただし、各役職には「固有勝利条件」が設定されており、それを満たすことでも勝利となります。</p>

        <h2>ゲームの流れ</h2>
        <div class="ability-section">
            <h4>1. ゲーム開始処理</h4>
            <ul class="rules-list">
                <li>役職カードをシャッフルして、1人2枚ずつ分ける。</li>
                <li>スキルカードをシャッフルし、1人3枚ずつ分ける。（余りは山札）</li>
                <li>プレイヤーは、役職カードのうち、1枚を選んで公開する。</li>
            </ul>
        </div>
        <div class="ability-section">
            <h4>2. ゲーム開始 〜 ラウンド開始</h4>
            <ul class="rules-list">
                <li>スタートプレイヤーを決める。</li>
                <li>ラウンドを開始し、スタートプレイヤーのターンとなる。</li>
            </ul>
        </div>
        <div class="ability-section">
            <h4>3. プレイヤーターン</h4>
            <p>自分のターンでは、以下のいずれか <strong>1つ</strong> を行い、ターンを終了します（何もできない場合は「パス」となります）。</p>
            <ul class="rules-list">
                <li><strong>スキルカードを使う:</strong> 一度使ったら、自分の前においておく。（[迅速]効果のあるカードは使用後に追加で1つアクションが可能）</li>
                <li><strong>スキルカードを回収する:</strong> 自分の前にあるスキルカードを手札に戻す。※[消滅] のついたカードは回収できない。</li>
                <li><strong>カードを引く:</strong> 山札から1枚引き、手札から1枚捨てる。（山札が切れたら捨て札をシャッフルして山札にする）</li>
                <li><strong>他プレイヤーを攻撃する:</strong> 体力が1以上の他プレイヤー1人に1ダメージを与える。（体力が0のプレイヤーには攻撃できない）</li>
            </ul>
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(196, 161, 90, 0.05); border-left: 3px solid var(--border-accent);">
                <h4 style="color: var(--border-accent); font-family: var(--font-heading); margin-bottom: 0.5rem;">※役職カードの公開について</h4>
                <p style="font-size: 0.9rem; line-height: 1.6;">
                    上記のアクションとは別に、自分のターン中であれば<strong>いつでも（アクションの前でも後でも）</strong>、裏向きに伏せている役職カードを1枚公開することができます。<br>
                    公開した役職に【スキル】がある場合、公開と同時にそのスキルが発動します。<br>
                    また、公開することで初めてその役職の【永続】効果や【固有勝利条件】が有効になります（非公開状態では発動・適用されません）。
                </p>
            </div>
        </div>
        <div class="ability-section">
            <h4>4. ラウンド終了 〜 ゲーム終了</h4>
            <ul class="rules-list">
                <li>ターンが一周したら、スタートプレイヤーの左隣のプレイヤーが新しいスタートプレイヤーとなり、次ラウンドを始める。</li>
                <li>プレイヤーが「自分だけ生き残る」または「公開している役職の固有勝利条件を満たす」のいずれかを達成した時点でゲーム終了となる。</li>
            </ul>
        </div>



        <div class="priority-box">
            <h4 style="color: #fff; margin-bottom: 0.3rem; font-family: var(--font-heading);">勝利優先度について</h4>
            <p style="font-size: 0.85rem;">複数のプレイヤーが同時に勝利条件を満たした場合、以下の順で優先されます（優先度が同じ場合は全員勝利）。</p>
            <ol style="margin-left: 1.5rem; color: var(--border-accent); margin-top: 0.5rem; font-size: 0.9rem;">
                <li>脱落した(ダメージを受けた)プレイヤー</li>
                <li>脱落させた(ダメージを与えた)プレイヤー</li>
                <li>その他のプレイヤー</li>
            </ol>
        </div>
    `;
}

function renderRole(container, role) {
    const catClass = getCategoryClass(role.category);
    container.innerHTML = `
        <div class="detail-card role-card">
            <div class="detail-header">
                <div>
                    <h1>${role.name}</h1>
                    <span style="font-family: var(--font-heading); color: var(--text-muted); letter-spacing: 2px;">${role.enName}</span>
                </div>
                <div class="badges">
                    <span class="badge ${catClass}">${role.category}</span>
                </div>
            </div>
            <p style="font-style: italic; color: var(--text-muted); margin-bottom: 1.5rem;">"${role.summary}"</p>
            
            <div class="stat-row">
                <div class="stat-item">
                    <span class="stat-label">最大HP</span>
                    <span class="stat-value" style="color: var(--accent-red);">${role.hp}</span>
                </div>
            </div>

            <div class="ability-section victory-section">
                <h4>固有勝利条件</h4>
                <p>${autoLink(role.victory)}</p>
            </div>

            ${role.skill ? `
            <div class="ability-section">
                <h4>スキル</h4>
                <p>${autoLink(role.skill)}</p>
            </div>` : ''}

            ${role.passive ? `
            <div class="ability-section">
                <h4>永続効果</h4>
                <p>${autoLink(role.passive)}</p>
            </div>` : ''}

            <div class="supplementary-sections" style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
                ${role.overview ? `
                <div class="tactics-section" style="margin-top: 0; padding-top: 0; border-top: none; margin-bottom: 2rem;">
                    <h4>役職概要・特殊裁定</h4>
                    ${autoLink(role.overview)}
                </div>` : ''}

                <div class="tactics-section" style="margin-top: 0; padding-top: 0; border-top: none;">
                    <h4>立ち回り</h4>
                    ${autoLink(role.tactics)}
                </div>
            </div>
        </div>
    `;
}

function renderSkill(container, skill) {
    const catClass = getCategoryClass(skill.category);
    container.innerHTML = `
        <div class="detail-card skill-card">
            <div class="detail-header">
                <div>
                    <h1>${skill.name}</h1>
                    <span style="font-family: var(--font-heading); color: var(--text-muted); letter-spacing: 2px;">${skill.enName}</span>
                </div>
                <div class="badges">
                    <span class="badge ${catClass}">${skill.category}</span>
                    ${skill.ephemeral ? `<span class="badge ephemeral">消滅</span>` : ''}
                    ${skill.fast ? `<span class="badge fast">迅速</span>` : ''}
                </div>
            </div>
            
            <div class="ability-section">
                <h4>効果</h4>
                <p style="font-size: 1.1rem; font-weight: bold; color: #fff;">${autoLink(skill.effect)}</p>
            </div>

            <div class="supplementary-sections" style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
                <div class="tactics-section" style="margin-top: 0; padding-top: 0; border-top: none;">
                    <h4>使い方・ポイント</h4>
                    ${autoLink(skill.usage)}
                </div>
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

function renderAdvancedRules(container) {
    container.innerHTML = `
        <h1 class="page-title">詳細なゲーム仕様・裁定</h1>
        <p>ここでは、より複雑な処理や、ゲーム内の用語の厳密な定義について解説します。</p>

        <h2>ステータスに関する裁定</h2>
        <ul class="rules-list">
            <li><strong>最大体力:</strong> ゲーム開始時に配られた2枚の役職（公開用・非公開用）の「最大HP」を合計した数値が、そのプレイヤーの初期の最大体力となります（おおよそ8〜10になります）。</li>
            <li>役職をまったく公開していないプレイヤーの最大体力は、暫定的に「5」として扱います。</li>
            <li><strong>体力の受け継ぎ:</strong> 役職が交換されたとき、現在の体力をそのまま受け継ぎます。ただし、受け継いだ体力が新しい最大体力を上回っていた場合のみ、最大体力と同じ値に切り捨てられます。</li>
        </ul>

        <h2>テキストの対象指定に関する裁定</h2>
        <ul class="rules-list">
            <li><strong>全員:</strong> 人数が明記されていない限り、盤面にいるすべてのプレイヤーを指します。</li>
            <li><strong>自分を含むか:</strong> 「他」と書いていなければ、条件を満たしている限り自分自身も対象に含みます。</li>
            <li><strong>自分:</strong> 特に明記されていない限り、「自分」とはそのカードを所持・使用しているプレイヤー自身を指します。</li>
        </ul>

        <h2>その他の特殊裁定</h2>
        <ul class="rules-list">
            <li><strong>役職の非公開状態:</strong> 公開していない役職の【永続】効果は発動せず、【固有勝利条件】は条件を満たしていても勝利することができません。</li>
            <li><strong>全体攻撃:</strong> 全体攻撃は「全員」を対象とするため、自分自身もダメージを受けます（「他のすべての」と記載されている場合は例外です）。</li>
            <li><strong>[消滅] カードの扱い:</strong> [消滅] カードは使用しても捨て札にはならず、自分の前においておきます。手札への回収はできませんが、「他プレイヤーの前にあるカードを選ぶ」効果（例：スキル20など）の対象として選択することは可能です。</li>
            <li><strong>クロノスの処理:</strong> パッシブ効果により体力が0になっても即座には脱落しませんが、ラウンドが終了する前に何らかの手段で体力を1以上に回復した場合、そのまま脱落せずにゲームを続行します。</li>
        </ul>
    `;
}
