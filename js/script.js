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
        const catClass = getCategoryClass(role.category);
        const catColor = categoryColorMap[catClass] || "var(--border-accent)";

        const li = document.createElement('li');
        li.innerHTML = `<a href="#role/${role.id}" class="nav-link" data-id="role/${role.id}" data-color="${catColor}">
            <span class="nav-link-text">
                ${role.no ? `<span class="nav-link-name" style="font-size: 0.75rem; opacity: 0.5; margin-right: 6px;">${String(role.no).padStart(2, '0')}</span>` : ''}
                <span class="nav-link-name">${role.name}</span>
                <span class="nav-link-en">${role.enName}</span>
            </span>
            <span class="badge ${catClass}" style="font-size: 0.6rem; padding: 1px 6px; border-radius: 2px;">${role.category}</span>
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

        <h2>ゲームの目的 / 勝利条件</h2>
        <p>以下のどちらかを満たせば勝利となりゲームが終了します。</p>
        <ul class="rules-list">
            <li>すべての他プレイヤーの体力を0にする（自分だけ生き残る）。</li>
            <li>公開されている自身の役職の「固有勝利条件」を満たす。</li>
        </ul>

        <h2>ゲームの流れ</h2>
        <div class="ability-section">
            <h4>1. ゲーム開始処理</h4>
            <ul class="rules-list">
                <li>役職カードをシャッフルして、1人2枚ずつ配り、自分の前に非公開で置く。</li>
                <li>スキルカードをシャッフルし、<strong>1人3枚ずつ</strong>手札として配る。余ったものは中央に置き、山札とする。</li>
                <li>サマリーカードを各プレイヤーに配る。</li>
                <li>スタートプレイヤーを決定する。</li>
            </ul>
        </div>
        <div class="ability-section">
            <h4>2. 最初のラウンド</h4>
            <ul class="rules-list">
                <li>スタートプレイヤーから時計回りに順に手番を行います。</li>
                <li>各プレイヤーは、所持する役職カードのうち、<strong>1枚を選んで公開</strong>します。<br>
                    <span style="font-size: 0.9em; color: var(--text-muted);">
                    ※このラウンドでは通常のアクション（スキル使用・攻撃・集中）は行いません。<br>
                    ※役職が公開された時、その役職の【スキル】があれば即座に発動します。また、【永続】【勝利】が有効になります。<br>
                    ※各プレイヤーの最大体力は、所持する役職カード2枚の最大体力の合計です（非公開の役職の最大体力は常に「5」として扱う）。現在の体力もこの最大体力と同じ値から開始します。<br>
                    ※全員が1枚ずつ公開したら最初のラウンドは終了です（手札の受け渡しは行いません）。
                    </span>
                </li>
            </ul>
        </div>
        <div class="ability-section">
            <h4>3. それ以降のラウンド（通常ラウンド）</h4>
            <p>スタートプレイヤーから時計回りに順にプレイヤーターンを行います。プレイヤーのターンでは、以下のアクションから1つを選んで行います。行ったなら、ターンを終了し、次のプレイヤーのターンになります。</p>
            <ol class="rules-list" type="A">
                <li><strong>スキルカードを使う</strong>
                    <p>手札から1枚使い、効果を処理する。使ったカードは捨て札にする。</p>
                </li>
                <li><strong>攻撃</strong><br>
                    <p>他プレイヤー1人に2ダメージを与える。<br>
                    <span style="color: var(--text-muted); margin-top: 0.5rem; display: inline-block;">※体力が0のプレイヤーに攻撃することはできない</span></p>
                </li>
                <li><strong>集中</strong>
                    <p>
                        山札からスキルカードを2枚引き、手札に加える。その後、手札から1枚選んで捨て札にする。<br>
                        山札が切れたなら、捨て札をシャッフルし、新たな山札にする。
                    </p>
                </li>
                <li><strong>役職を公開</strong>
                    <p>
                        自分の残りの非公開役職カードを公開する。<br>
                        非公開状態から公開状態になった時、【スキル】があれば発動する。<br>
                        公開している間だけ、その役職の【勝利】【永続】が有効になる。
                    </p>
                </li>
            </ol>
            <p style="font-size: 0.9em; color: var(--text-muted); margin-top: 0.5rem;">
                ※プレイヤーのターンで、何の行動もできない場合、「パス」となります。そうでない場合、必ず行動を行います。<br>
                ※プレイヤーが脱落したとき、そのプレイヤーが管理するスキルカードはすべて捨て札にします。
            </p>
        </div>
        <div class="ability-section">
            <h4>4. ラウンド終了</h4>
            <ul class="rules-list">
                <li>全員のターンが一巡したら、ラウンド終了となります。</li>
                <li><strong style="color: var(--accent-red);">ラウンド終了後、自分の手札から1枚選び、それ以外をすべて左隣のプレイヤーにそのまま渡します。</strong></li>
                <li>その後、スタートプレイヤーの左隣のプレイヤーが新たなスタートプレイヤーとなり、次のラウンドを開始します。</li>
            </ul>
        </div>
        <div class="ability-section">
            <h4>5. ゲーム終了</h4>
            <ul class="rules-list">
                <li>プレイヤーが勝利条件のいずれかを満たしたなら、ゲームを終了します。</li>
            </ul>
            <div class="priority-box" style="margin-top: 2rem;">
                <h4 style="color: #fff; margin-bottom: 0.3rem; font-family: var(--font-heading);">勝利優先度について</h4>
                <p style="font-size: 0.85rem;">複数のプレイヤーが同時に勝利条件を満たした場合、上から順に勝利が優先されます。勝利優先度が同じプレイヤーが同時に複数勝利条件を満たした場合、全員勝利となります。</p>
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
            <li>非公開の役職の最大体力は常に「5」として扱うため、<strong>役職をまったく公開していないプレイヤーの最大体力は「10」として扱います。</strong></li>
            <li>何らかの理由で現在の体力が最大体力を上回った場合、最大体力へ切り捨てます。それ以外で最大体力が変わっても、現在の体力を受け継ぎます。</li>
        </ul>

        <h2>テキストの対象指定・定義に関する裁定</h2>
        <ul class="rules-list">
            <li>特に明記されていない限り、「自分」とはそのカードを所持・使用しているプレイヤー自身を指します。<br>また、「他」と書いていなければ、条件を満たしている限り、対象として自分自身も選ぶことができ、自分自身も対象に含まれます。</li>
            <li><strong>「効果」</strong>とは、スキルカードの効果、および役職の【スキル】や【永続】を指します。「攻撃」アクションや、【勝利】は含まれません。</li>
        </ul>

        <h2>その他の特殊裁定</h2>
        <ul class="rules-list">
            <li>役職の【勝利】【スキル】【永続】は、そのカードが公開されている場合のみ有効となります。非公開状態では発動しません。</li>
            <li><strong>《03. 波及》（スキル03）の裁定:</strong> 「ちょうど1人のプレイヤー」に与えられるダメージでのみ発動します。《05. 暴露》や《06. 奇襲》などの全体効果や、2人以上が同時にダメージを受ける処理では発動しません。</li>
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
    const catClass = getCategoryClass(role.category);
    
    let html = `
        <div style="margin-bottom: 2rem;">
            <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 0.5rem;">
                <h1 class="page-title" style="margin-bottom: 0; border: none; padding: 0;">${role.name}</h1>
                <span style="font-family: var(--font-heading); color: var(--text-muted); font-size: 1.2rem;">${role.enName}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem;">
                <span class="badge ${catClass}">${role.category}</span>
            </div>
            ${role.summary ? `<div class="role-flavor" id="role-flavor"></div>` : ''}
        </div>

        <div class="stat-row">
            <div class="stat-item">
                <span class="stat-label">最大体力</span>
                <span class="stat-value">${role.hp}</span>
            </div>
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
            <div class="ability-section" style="border-left: 3px solid var(--border-accent);">
                <h4>効果</h4>
                <p style="font-size: 1.1rem; color: #fff;">${autoLink(skill.effect, skill.id)}</p>
            </div>
            
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