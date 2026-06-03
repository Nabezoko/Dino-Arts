/* ==========================================
   Dino-Arts Interactive Script
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期状態のチェック

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // リンククリック時にメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 3. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    
    const activeMenuOnScroll = () => {
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
        
        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop - 150 && 
                scrollPosition < section.offsetTop + section.offsetHeight - 150) {
                
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', activeMenuOnScroll);

    // 4. Scroll Fade-in Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in, .menu-card, .staff-card, .about-info-card, .about-map-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // 一度表示されたら監視をやめる
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        // 全ての監視対象要素に基本クラスがなければ追加する
        if (!el.classList.contains('fade-in')) {
            el.classList.add('fade-in');
        }
        observer.observe(el);
    });

    // 5. Menu Details Modal Data
    const menuData = {
        manga_meat: {
            title: "マンガ肉",
            subtitle: "manga_meat",
            img: "images/foodmenu/manga_meat.png",
            stats: [
                { type: "hunger", label: "空腹回復", value: "+30", icon: "fa-utensils" }
            ],
            desc: "原始時代を象徴する、骨付きの巨大なお肉です。直火でじっくりとローストし、外は香ばしくカリッと、中は肉汁が溢れ出すジューシーな仕上がりになっています。ひとくちかじれば、かつて地球を支配していた恐竜たちの圧倒的な生命力を感じられること間違いなし。お腹が空いたすべての冒険者のスタミナを瞬時に満たす名物メニューです。"
        },
        spring_water: {
            title: "古代の湧き水",
            subtitle: "spring_water",
            img: "images/foodmenu/spring_water.png",
            stats: [
                { type: "water", label: "水分補給", value: "+30", icon: "fa-droplet" }
            ],
            desc: "何千万年もの間、人跡未踏の秘境にある太古の地層でろ過され続けた奇跡の水。一切の不純物がなく、飲むとひんやりとした涼感が全身の隅々にまで染み渡ります。自然由来のミネラルを豊富に湛えており、過酷な探索で乾いた喉と体をリフレッシュするのに最適な一杯です。"
        },
        rex_cake: {
            title: "恐竜ケーキ",
            subtitle: "rex_cake",
            img: "images/foodmenu/rex_cake.png",
            stats: [
                { type: "hunger", label: "空腹回復", value: "+15", icon: "fa-utensils" },
                { type: "stress", label: "ストレス軽減", value: "-15", icon: "fa-brain" }
            ],
            desc: "恐竜の卵をモチーフにした、ココアクッキーと特製ピスタチオクリームで包み込んだ濃厚ながらも上品なケーキ。外側の甘い殻をスプーンで割ると、中から甘酸っぱいベリーの特製ソースがとろりと流れ出します。適度な糖分と極上の味わいが、旅の疲れと精神的なストレスをやさしく癒やしてくれます。"
        },
        glass_apple: {
            title: "ガラスリンゴ",
            subtitle: "glass_apple",
            img: "images/foodmenu/glass_apple.png",
            stats: [
                { type: "water", label: "水分補給", value: "+15", icon: "fa-droplet" },
                { type: "stress", label: "ストレス軽減", value: "-15", icon: "fa-brain" }
            ],
            desc: "太古の氷河期の終わりに実ったとされる、透き通ったクリスタルガラスのような美しい見た目の幻の果実。噛むとシャキシャキとした凍てつくような涼やかな音が響き、上品でスッキリとした甘酸っぱい果汁が口いっぱいに広がります。その神秘的な美しさは、見ているだけでも心が洗われ、精神を安定させる効果があります。"
        },
        bandage_baum: {
            title: "止血帯バウム",
            subtitle: "bandage_baum",
            img: "images/foodmenu/bandage_baum.png",
            stats: [
                { type: "hunger", label: "空腹回復", value: "+10", icon: "fa-utensils" },
                { type: "water", label: "水分補給", value: "+10", icon: "fa-droplet" },
                { type: "health", label: "体力回復", value: "+10", icon: "fa-heart" }
            ],
            desc: "巨木の年輪を模して、一層ずつ丁寧にじっくり焼き上げられたバウムクーヘン。高密度で栄養バランスに非常に優れており、持ち歩き用の携帯食としても非常に優秀です。口に含むと、しっとりとした甘さとバターのコクが広がり、疲労した肉体の回復と怪我の痛みを和らげる効果（体力回復）をもたらします。"
        },
        jerry_cider: {
            title: "ジェリ缶サイダー",
            subtitle: "jerry_cider",
            img: "images/foodmenu/jerry_cider.png",
            stats: [
                { type: "water", label: "水分補給", value: "10〜40 (ランダム)", icon: "fa-droplet" }
            ],
            desc: "ワイルドなミニジェリ缶型ボトルに注がれた、強炭酸のオリジナルサイダー。柑橘系の爽やかでツンとくる香りと、喉を刺激する強烈なシュワシュワ感が眠気と渇きを一瞬で吹き飛ばします。その時々の状況によって喉の潤い度合い（回復量）が変化する、遊び心に溢れた不思議なエネルギー飲料です。"
        },
        dino_vape: {
            title: "Dino-Vape",
            subtitle: "dino_vape",
            img: "images/foodmenu/dino_vape.png",
            stats: [
                { type: "stress", label: "ストレス軽減", value: "-30", icon: "fa-brain" }
            ],
            desc: "古代の鬱蒼とした熱帯森に自生する、精神安定作用のあるハーブから抽出した特製オイルを使用したアロマ電子タバコ（ベイプ）。優しく立ち上るエキゾチックなハーブ香のミストを深く吸い込むことで、自律神経をリラックスさせ、過酷な戦闘や日々の喧騒から生じる脳のストレスを一気にリフレッシュさせます。"
        }
    };

    // Modal elements
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalStatsContainer = document.getElementById('modal-stats');
    const modalDescription = document.getElementById('modal-description');

    // Open Modal Function
    const openModal = (itemId) => {
        const item = menuData[itemId];
        if (!item) return;

        // Set image and text
        modalImg.src = item.img;
        modalImg.alt = item.title;
        modalTitle.textContent = item.title;
        modalSubtitle.textContent = item.subtitle;
        modalDescription.textContent = item.desc;

        // Render stats badges
        modalStatsContainer.innerHTML = '';
        item.stats.forEach(stat => {
            const badge = document.createElement('span');
            badge.className = `stat-badge stat-${stat.type}`;
            badge.innerHTML = `<i class="fa-solid ${stat.icon}"></i> ${stat.label}: ${stat.value}`;
            modalStatsContainer.appendChild(badge);
        });

        // Show Modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // 背面のスクロールを防止
    };

    // Close Modal Function
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // スクロールを戻す
    };

    // Add click listeners to menu cards
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        const itemId = card.getAttribute('data-item');
        
        // 詳細ボタンのクリック時
        const detailBtn = card.querySelector('.btn-detail-trigger');
        if (detailBtn) {
            detailBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // 親要素（カード全体）へのイベント伝播を防ぐ
                openModal(itemId);
            });
        }

        // カード全体のクリック時
        card.addEventListener('click', () => {
            openModal(itemId);
        });
    });

    // Close listeners
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // ESCキー押下時にモーダルを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // 6. Hidden Features (Easter Eggs)
    // ① 最初のロゴを10回クリックするとロゴに上品な虹色の後光が指す
    const heroLogo = document.querySelector('.hero-logo-img');
    let logoClickCount = 0;
    
    if (heroLogo) {
        heroLogo.style.cursor = 'pointer';
        heroLogo.addEventListener('click', () => {
            if (heroLogo.classList.contains('rainbow-glow')) return;
            logoClickCount++;
            if (logoClickCount === 10) {
                heroLogo.classList.add('rainbow-glow');
            }
        });
    }

    // ② コンセプト欄の恐竜画像を10回クリックすると大きくなってガオーと鳴く
    const dinoImage = document.querySelector('.concept-visual .visual-img');
    let dinoClickCount = 0;
    
    if (dinoImage) {
        dinoImage.style.cursor = 'pointer';
        dinoImage.addEventListener('click', () => {
            if (dinoImage.classList.contains('roar')) return;
            dinoClickCount++;
            if (dinoClickCount === 10) {
                dinoClickCount = 0; // リセット
                dinoImage.classList.add('roar');
                
                // サウンド再生 (dinoarts/sounds/gawl.mp3)
                const roarSound = new Audio('sounds/gawl.mp3');
                roarSound.volume = 0.6;
                roarSound.play().catch(err => {
                    console.log("Audio playback blocked by browser auto-play policy:", err);
                });
                
                // アニメーション終了（1.5秒）後にクラス除去
                setTimeout(() => {
                    dinoImage.classList.remove('roar');
                }, 1500);
            }
        });
    }

    // ③ 料理人紹介の画像を10回クリックで画像の下に "READY?" 文字出現
    const staffImg = document.querySelector('.staff-img');
    const readyLink = document.getElementById('hidden-ready-link');
    let staffClickCount = 0;

    if (staffImg && readyLink) {
        staffImg.style.cursor = 'pointer';
        staffImg.addEventListener('click', () => {
            if (readyLink.classList.contains('active')) return;
            staffClickCount++;
            if (staffClickCount === 10) {
                readyLink.classList.add('active');
            }
        });
    }

    // ⑤ コナミコマンド (↑↑↓↓←→←→BA) で背景変化モード発動
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 
        'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 
        'ArrowLeft', 'ArrowRight', 
        'b', 'a'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        const key = e.key;
        const requiredKey = konamiCode[konamiIndex];

        // キー入力を大文字小文字問わず判定 (B, A用)
        if (key.toLowerCase() === requiredKey.toLowerCase()) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // コナミモードのトグル
                document.body.classList.toggle('konami-mode');
                konamiIndex = 0;
                
                // 発動時の演出用フラッシュ効果
                const flash = document.createElement('div');
                flash.style.position = 'fixed';
                flash.style.top = '0';
                flash.style.left = '0';
                flash.style.width = '100%';
                flash.style.height = '100%';
                flash.style.backgroundColor = 'rgba(212, 163, 115, 0.4)';
                flash.style.zIndex = '9999';
                flash.style.pointerEvents = 'none';
                flash.style.transition = 'opacity 0.8s ease';
                document.body.appendChild(flash);
                setTimeout(() => {
                    flash.style.opacity = '0';
                    setTimeout(() => flash.remove(), 800);
                }, 50);
            }
        } else {
            // 間違えたら最初からやり直す
            konamiIndex = (key.toLowerCase() === konamiCode[0].toLowerCase()) ? 1 : 0;
        }
    });

    // ⑥ コナミモード時の背景切り替えスクロールエフェクト
    let lastScrollY = window.scrollY;
    let transitionTriggered = {
        skyToForest: false,
        forestToSky: false,
        forestToCave: false,
        caveToForest: false
    };

    // 葉っぱが舞うエフェクト
    const triggerLeafEffect = () => {
        if (document.querySelector('.leaf-container')) return;

        const container = document.createElement('div');
        container.className = 'leaf-container';
        document.body.appendChild(container);

        const leafSVG = `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50 15 C30 30, 20 60, 50 85 C80 60, 70 30, 50 15 Z" fill="%COLOR%" /></svg>`;
        const colors = ['#4f772d', '#90a955', '#31572c', '#132a13', '#606c38'];

        for (let i = 0; i < 35; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'falling-leaf';
            
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            leaf.innerHTML = leafSVG.replace('%COLOR%', randomColor);

            leaf.style.left = `${Math.random() * 100}vw`;
            leaf.style.top = `-50px`;
            const size = Math.random() * 20 + 15; // 15px〜35px
            leaf.style.width = `${size}px`;
            leaf.style.height = `${size}px`;
            
            const duration = Math.random() * 2 + 1.5; // 1.5s〜3.5s
            leaf.style.animationDuration = `${duration}s`;
            leaf.style.animationDelay = `${Math.random() * 1.5}s`;
            
            container.appendChild(leaf);
        }

        setTimeout(() => container.remove(), 4000);
    };

    // 雲を抜けるエフェクト
    const triggerCloudEffect = () => {
        if (document.querySelector('.cloud-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'cloud-overlay';
        document.body.appendChild(overlay);

        // 左側にはける雲
        for (let i = 0; i < 4; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'transition-cloud transition-cloud-left';
            cloud.style.top = `${Math.random() * 80 + 10}%`;
            cloud.style.left = `${Math.random() * 20 - 10}%`;
            const scale = Math.random() * 1.5 + 1.5; // 大きめ
            cloud.style.transform = `scale(${scale})`;
            cloud.style.animationDelay = `${Math.random() * 0.3}s`;
            overlay.appendChild(cloud);
        }

        // 右側にはける雲
        for (let i = 0; i < 4; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'transition-cloud transition-cloud-right';
            cloud.style.top = `${Math.random() * 80 + 10}%`;
            cloud.style.left = `${Math.random() * 20 + 70}%`;
            const scale = Math.random() * 1.5 + 1.5; // 大きめ
            cloud.style.transform = `scale(${scale})`;
            cloud.style.animationDelay = `${Math.random() * 0.3}s`;
            overlay.appendChild(cloud);
        }

        setTimeout(() => overlay.remove(), 2500);
    };

    // 水泡のエフェクト
    const triggerBubbleEffect = () => {
        if (document.querySelector('.bubble-container')) return;

        const container = document.createElement('div');
        container.className = 'bubble-container';
        document.body.appendChild(container);

        for (let i = 0; i < 45; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'rising-bubble';
            
            const size = Math.random() * 15 + 6; // 6px〜21px
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}vw`;
            
            const duration = Math.random() * 1.5 + 1.2; // 1.2s〜2.7s
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${Math.random() * 1.2}s`;
            bubble.style.setProperty('--drift', `${Math.random() * 80 - 40}px`);

            container.appendChild(bubble);
        }

        setTimeout(() => container.remove(), 3500);
    };

    // スクロール時の境界監視
    window.addEventListener('scroll', () => {
        if (!document.body.classList.contains('konami-mode')) return;

        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY;
        const middleOfScreen = currentScrollY + (window.innerHeight / 2);

        const conceptSection = document.getElementById('concept');
        const staffSection = document.getElementById('staff');

        if (conceptSection && staffSection) {
            const conceptTop = conceptSection.offsetTop;
            const staffTop = staffSection.offsetTop;

            // 1. 空 ↔️ 地上の境界 (conceptTop)
            if (isScrollingDown) {
                // 下スクロール: 空 ➡️ 地上 (葉っぱ)
                if (middleOfScreen >= conceptTop && !transitionTriggered.skyToForest && currentScrollY < conceptTop) {
                    triggerLeafEffect();
                    transitionTriggered.skyToForest = true;
                    transitionTriggered.forestToSky = false;
                }
            } else {
                // 上スクロール: 地上 ➡️ 空 (雲)
                if (middleOfScreen < conceptTop && !transitionTriggered.forestToSky && currentScrollY < conceptTop + 200) {
                    triggerCloudEffect();
                    transitionTriggered.forestToSky = true;
                    transitionTriggered.skyToForest = false;
                }
            }

            // 2. 地上 ↔️ 地下の境界 (staffTop)
            if (isScrollingDown) {
                // 下スクロール: 地上 ➡️ 地下 (水泡)
                if (middleOfScreen >= staffTop && !transitionTriggered.forestToCave && currentScrollY < staffTop) {
                    triggerBubbleEffect();
                    transitionTriggered.forestToCave = true;
                    transitionTriggered.caveToForest = false;
                }
            } else {
                // 上スクロール: 地下 ➡️ 地上 (葉っぱ)
                if (middleOfScreen < staffTop && !transitionTriggered.caveToForest && currentScrollY > conceptTop) {
                    triggerLeafEffect();
                    transitionTriggered.caveToForest = true;
                    transitionTriggered.forestToCave = false;
                }
            }
        }

        lastScrollY = currentScrollY;
    });
});
