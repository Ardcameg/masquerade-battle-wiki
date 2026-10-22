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
    // 役職
    "アタッカー": "cat-attacker",
    "サポート": "cat-support",
    "コントロール": "cat-control",
    "トリックスター": "cat-trickster",
    "タンク": "cat-tank",
    "特殊": "cat-trickster",
    
    // スキル
    "攻撃": "cat-attacker",
    "防御": "cat-tank",
    "回復": "cat-heal",
    "強化": "cat-special",
    "妨害": "cat-control",
    "操作": "cat-trickster"
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

const hitColorMap = {
    0: "#69f0ae",
    1: "#ffd740",
    2: "#ff9100",
    3: "#ff5252"
};

function autoLink(text, currentId = null) {
    if (!text) return text;
    let result = text;
    
    // Process Roles
    gameData.roles.forEach(r => {
        if (r.id === currentId) return;
        const regex = new RegExp(`[「《]${r.name}[」》]`, 'g');
        result = result.replace(regex, `<a href="#role/${r.id}" class="inline-link">《${r.name}》</a>`);
    });
    
    // Process Skills: matches 《01. 治癒》, 《1. 治癒》, 《治癒》, 01. 治癒, 《スキル01》, etc.
    gameData.skills.forEach(s => {
        if (s.id === currentId) return;
        const sNum = parseInt(s.id.replace('s', ''), 10);
        const sNoStr = String(sNum).padStart(2, '0');
        const regex = new RegExp(`(?:[「《](?:0?${sNum}\\.\\s*)?${s.name}[」》]|[「《]?0?${sNum}\\.\\s*${s.name}[」》]?|[「《]?スキル\\s*0?${sNum}[」》]?)`, 'g');
        result = result.replace(regex, `<a href="#skill/${s.id}" class="inline-link">《${sNoStr}. ${s.name}》</a>`);
    });
    
    result = result.replace(/\[ダメージ\](\d+|手札の枚数|同じ量)/g, '<span class="keyword-damage" title="[ダメージ]X: Xの分だけダメージを受ける">[ダメージ]$1</span>');
    result = result.replace(/\[回復\](\d+|同じ量)/g, '<span class="keyword-heal" title="[回復]X: Xの分だけ回復する">[回復]$1</span>');
    result = result.replace(/\[体力\](\d+)/g, '<span class="keyword-heal">[体力]$1</span>');

    return result;
}

function initNavigation() {
    const rolesNav = document.getElementById('nav-roles');
    const skillsNav = document.getElementById('nav-skills');

    const sortedRoles = [...gameData.roles]
        .filter(role => !role.hidden)
        .sort((a, b) => (a.no || 0) - (b.no || 0));

    sortedRoles.forEach(role => {
        const hitColor = hitColorMap[role.hit] || "var(--border-accent)";

        const li = document.createElement('li');
        li.innerHTML = `<a href="#role/${role.id}" class="nav-link" data-id="role/${role.id}" data-color="${hitColor}">
            <span class="nav-link-text">
                ${role.no ? `<span class="nav-link-name" style="font-family: var(--font-oxanium); font-size: 0.75rem; opacity: 0.5; margin-right: 6px;">${String(role.no).padStart(2, '0')}</span>` : ''}
                <span class="nav-link-name">${role.name}</span>
                <span class="nav-link-en">${role.enName}</span>
            </span>
            <span class="badge" style="font-family: var(--font-oxanium); font-size: 0.65rem; padding: 1px 6px; border-radius: 2px; border: 1px solid ${hitColor}; color: ${hitColor};">Hit: ${role.hit}</span>
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
                <span class="nav-link-name" style="font-family: var(--font-oxanium); font-size: 0.75rem; opacity: 0.5; margin-right: 6px;">${skillNo}</span>
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
        <p>以下のどちらかを満たせば勝利となりゲームが終了する。</p>
        <ul class="rules-list">
            <li>すべての他プレイヤーの体力を0にする（自分だけ生き残る）。</li>
            <li>公開されている自身の役職の固有勝利条件を満たす。</li>
        </ul>

        <h2>ゲームの流れ</h2>
        <div class="ability-section">
            <h4>1. ゲーム開始</h4>
            <ul class="rules-list">
                <li>スタートプレイヤーを決める。</li>
            </ul>
        </div>
        <div class="ability-section">
            <h4>2. ゲーム開始処理</h4>
            <ul class="rules-list">
                <li>スタートプレイヤーの逆順に、10役職の中から公開する役職を選ぶ。全員が選び終わったら、残りからランダムに1枚ずつ配る。
                    <ul class="wiki-list" style="margin-top: 0.3rem;">
                        <li>この時点で、選んだ役職は公開しておく。</li>
                        <li>このとき公開した役職の【公開時】効果は発動しない</li>
                    </ul>
                </li>
                <li>スキルカードをシャッフルし、1人3枚ずつ手札として分ける。
                    <ul class="wiki-list" style="margin-top: 0.3rem;">
                        <li>余ったものは中央に置き、山札とする。</li>
                    </ul>
                </li>
                <li>サマリーカードを各プレイヤーに配る。</li>
                <li>各プレイヤーには、HP10が与えられる。最大HPなどは考えない。</li>
            </ul>
        </div>
        <div class="ability-section">
            <h4>3. ラウンド開始</h4>
            <ul class="rules-list">
                <li>ラウンドを開始する。</li>
                <li>スタートプレイヤーのターンとなる。</li>
            </ul>
        </div>
        <div class="ability-section">
            <h4>4. プレイヤーターン</h4>
            <p>プレイヤーのターンでは、以下のアクションから1つを選んで行う。行ったなら、ターンを終了し、次のプレイヤーのターンになる。</p>
            <ol class="rules-list" type="A">
                <li><strong>スキルカードを使う</strong>
                    <p>手札から1枚使い、効果を処理する。使ったカードは捨て札にする。</p>
                </li>
                <li><strong>「攻撃」する</strong>
                    <p>6面ダイスを振る。<br>
                    2役職の「Hit」の合計がダイスの目以下である全員は、それぞれの「Hit」の合計分のダメージを受ける。<br>
                    <span style="font-size: 0.85em; color: var(--text-muted);">※非公開の役職の「Hit」は0として計算する。</span></p>
                </li>
                <li><strong>集中する</strong>
                    <p>山札からスキルカードを2枚引き手札に加え、そのうちから1枚使う。<br>
                    山札が切れたなら、捨て札をシャッフルし、新たな山札にする。<br>
                    それでも山札がないなら、引けるだけ引く。</p>
                </li>
                <li><strong>役職を公開する</strong>
                    <p>非公開状態から公開状態になった時、【公開時】を発動する。<br>
                    公開している間、その役職の【勝利】【永続】が有効になる。</p>
                </li>
            </ol>
            <p style="font-size: 0.9em; color: var(--text-muted); margin-top: 0.5rem;">
                ※プレイヤーのターンで、何の行動もできない場合、「パス」となる。そうでない場合、必ず行動を行う。<br>
                ※プレイヤーが脱落したとき、そのプレイヤーが管理するスキルカードはすべて捨て札にする。
            </p>
        </div>
        <div class="ability-section">
            <h4>5. ラウンド終了</h4>
            <ul class="rules-list">
                <li>スタートプレイヤーをターンが次のプレイヤーに回し、ラウンドを最初から行う。</li>
            </ul>
        </div>
        <div class="ability-section">
            <h4>6. ゲーム終了</h4>
            <ul class="rules-list">
                <li>プレイヤーが勝利条件のどれかを満たしたなら、ゲームを終了する。</li>
            </ul>
            <div class="priority-box" style="margin-top: 1.5rem;">
                <h4 style="color: #fff; margin-bottom: 0.3rem; font-family: var(--font-heading);">勝利優先度について</h4>
                <p style="font-size: 0.85rem;">複数のプレイヤーが同時に勝利条件を満たした場合、上から順に勝利が優先される。勝利優先度が同じプレイヤーが複数勝利条件を満たした場合、全員勝利となる。</p>
                <ol style="margin-left: 1.5rem; color: var(--border-accent); margin-top: 0.5rem; font-size: 0.9rem;">
                    <li><strong>脱落したプレイヤー</strong></li>
                    <li><strong>脱落させたプレイヤー</strong></li>
                    <li><strong>その他のプレイヤー</strong></li>
                </ol>
            </div>
        </div>

        <h2>スキルカードのルール</h2>
        <div class="ability-section">
            <ul class="rules-list">
                <li><strong>「Aするとき：〇〇」と書かれたカード（【割込】）:</strong>
                    <ul class="wiki-list" style="margin-top: 0.3rem;">
                        <li>誰かがAを行うときのみ使用でき、割り込みで効果が発動する。</li>
                        <li>発動後、捨て札になる。</li>
                        <li>対象が同じである効果に連鎖的に使用された場合、発動した順番に全ての効果が発動する。</li>
                        <li>発動タイミングが同じだった場合、手番のプレイヤーから手番が近い順に効果が発動する。</li>
                        <li>普通のスキルカードのようには使用できない。</li>
                    </ul>
                </li>
                <li><strong>効果が2つ書いてあるもの:</strong>
                    <ul class="wiki-list" style="margin-top: 0.3rem;">
                        <li>そのうちどちらかしか発動できない。</li>
                    </ul>
                </li>
            </ul>
        </div>
    `;
}

function renderAdvancedRules(container) {
    container.innerHTML = `
        <h1 class="page-title">詳細なゲーム仕様・裁定</h1>
        <p>ここでは、システム全般の処理や用語の厳密な定義について解説します。<br>
        各スキルカード固有の裁定は、それぞれのカード個別ページに記載されています。</p>

        <h2>Hit と「攻撃」アクションに関する裁定</h2>
        <ul class="rules-list">
            <li><strong>Hitの計算:</strong> 各プレイヤーのHitは、現在公開されている2役職のHitの合計値です。非公開役職のHitは0として扱われます。</li>
            <li><strong>Hitが0のときの被ダメージ:</strong>
                <ul class="wiki-list">
                    <li>Hit合計が0のプレイヤーに対してダイス攻撃の判定（0 ≦ 出目）が成立した場合でも、受けるダメージ量は「自身のHit合計分」であるため、受けるダメージは0となります。</li>
                    <li>スキルカードや《暗殺者》の【アクション】による直接ダメージは通常通り受けます。</li>
                </ul>
            </li>
            <li><strong>各役職のHit一覧:</strong>
                <ul class="wiki-list">
                    <li>Hit 0: 《狂戦士》</li>
                    <li>Hit 1: 《暗殺者》 / 《爆弾魔》 / 《盗賊》 / 《道化師》</li>
                    <li>Hit 2: 《聖女》 / 《告発者》 / 《クロノス》 / 《死霊術師》</li>
                    <li>Hit 3: 《ゴーレム》</li>
                </ul>
            </li>
        </ul>

        <h2>役職カードの共通裁定</h2>
        <ul class="rules-list">
            <li><strong>能力の有効化:</strong> 役職カードの【公開時】は非公開から公開になった瞬間に発動し、【永続】および【勝利】は公開されている間のみ有効となります。</li>
            <li><strong>ターン開始時の勝利判定:</strong> 「ターン開始時」に条件を満たしているかを判定します。手番プレイヤーのアクション開始前に勝利が成立します。</li>
            <li><strong>強制公開された役職:</strong> 《告発者》の【公開時】効果などにより他者から役職を公開させられた場合でも、その役職の【公開時】は通常通り発動します。</li>
        </ul>

        <h2>カード効果のキーワード</h2>
        <ul class="rules-list">
            <li><strong>[ダメージ]X:</strong> Xの分だけ体力を減少させる。</li>
            <li><strong>[回復]X:</strong> Xの分だけ体力を増加させる。</li>
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
    const hitColor = hitColorMap[role.hit] || "var(--border-accent)";

    let html = `
        <div style="margin-bottom: 2rem;">
            <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 0.5rem;">
                <h1 class="page-title" style="margin-bottom: 0; border: none; padding: 0;">${role.name}</h1>
                <span style="font-family: var(--font-heading); color: var(--text-muted); font-size: 1.2rem;">${role.enName}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.8rem; flex-wrap: wrap;">
                <span class="badge" style="font-family: var(--font-oxanium); border: 1px solid ${hitColor}; color: ${hitColor}; background: rgba(0,0,0,0.3); font-size: 0.85rem; padding: 3px 10px;">Hit: ${role.hit}</span>
            </div>
            ${role.summary ? `<div class="role-flavor" id="role-flavor"></div>` : ''}
        </div>

        <div class="detail-card">
    `;

    if (role.victory) {
        html += `
            <div class="victory-section ability-section">
                <h4>【勝利】</h4>
                <p style="font-size: 1.1rem; color: #fff;">${autoLink(role.victory, role.id)}</p>
            </div>
        `;
    }

    if (role.action) {
        html += `
            <div class="ability-section">
                <h4>【アクション】</h4>
                <p style="font-size: 1.05rem; color: #fff;">${autoLink(role.action, role.id)}</p>
            </div>
        `;
    }
    
    if (role.skill) {
        html += `
            <div class="ability-section">
                <h4>【公開時】</h4>
                <p style="font-size: 1.05rem; color: #fff;">${autoLink(role.skill, role.id)}</p>
            </div>
        `;
    }

    if (role.passive) {
        html += `
            <div class="ability-section">
                <h4>【永続】</h4>
                <p style="font-size: 1.05rem; color: #fff;">${autoLink(role.passive, role.id)}</p>
            </div>
        `;
    }

    html += `
            <div class="tactics-section">
                <h4>概要・仕様</h4>
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
                <h4>${skill.effect2 ? '通常効果' : '効果'}</h4>
                <p style="font-size: 1.1rem; color: #fff;">${autoLink(eff1, skill.id)}</p>
            </div>
        `;
    }

    if (skill.effect2) {
        effectBlocksHtml += `
            <div class="ability-section" style="border-left: 3px solid #ff7043;">
                <h4>【割込】</h4>
                <p style="font-size: 1.1rem; color: #fff;">${autoLink(skill.effect2, skill.id)}</p>
            </div>
        `;
    }

    if (skill.ruling) {
        effectBlocksHtml += `
            <div class="ability-section" style="border-left: 3px solid var(--border-color); background: rgba(255, 255, 255, 0.02);">
                <h4>特殊裁定・詳細仕様</h4>
                <p style="font-size: 0.95rem; color: #ddd;">${autoLink(skill.ruling, skill.id)}</p>
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
