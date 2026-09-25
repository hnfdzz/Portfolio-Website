document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. THREE.JS 3D SPACE & PLANET BACKGROUND
    // ==========================================
    function init3DSpace() {
        const container = document.getElementById("canvas3dContainer");
        if (!container || typeof THREE === "undefined") return;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // A. STARFIELD (Partikel Bintang)
        const starsCount = 1200;
        const starGeometry = new THREE.BufferGeometry();
        const starPositions = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount * 3; i += 3) {
            starPositions[i] = (Math.random() - 0.5) * 100;
            starPositions[i + 1] = (Math.random() - 0.5) * 100;
            starPositions[i + 2] = (Math.random() - 0.5) * 100;
        }

        starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
        const starMaterial = new THREE.PointsMaterial({
            color: 0x88ccff,
            size: 0.15,
            transparent: true,
            opacity: 0.8
        });
        const starField = new THREE.Points(starGeometry, starMaterial);
        scene.add(starField);

        // B. PLANET GLOBE (Wireframe Sphere + Inner Core)
        const planetGroup = new THREE.Group();

        // Inner Core
        const coreGeo = new THREE.IcosahedronGeometry(4, 2);
        const coreMat = new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            wireframe: true,
            transparent: true,
            opacity: 0.35
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        planetGroup.add(coreMesh);

        // Outer Ring / Particles Orbit
        const orbitGeo = new THREE.TorusGeometry(6, 0.05, 16, 100);
        const orbitMat = new THREE.MeshBasicMaterial({
            color: 0x60a5fa,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });
        const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
        orbitRing.rotation.x = Math.PI / 3;
        planetGroup.add(orbitRing);

        scene.add(planetGroup);

        // C. INTERAKTIVITAS (Mouse Parallax & Scroll)
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        window.addEventListener("mousemove", (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);

            // Rotasi Otomatis Planet & Bintang
            planetGroup.rotation.y += 0.003;
            planetGroup.rotation.x += 0.001;
            starField.rotation.y -= 0.0003;

            // Smooth Mouse Follow (Parallax Effect)
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            planetGroup.position.x = targetX * 1.5;
            planetGroup.position.y = -targetY * 1.5;

            renderer.render(scene, camera);
        }

        animate();

        // Window Resize Handler
        window.addEventListener("resize", () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    init3DSpace();

    // ==========================================
    // 2. HEADER SCROLL BEHAVIOR
    // ==========================================
    const headerElement = document.querySelector("header");
    if (headerElement) {
        let lastScrollY = window.scrollY;

        window.addEventListener("scroll", () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
                headerElement.classList.add("scrolled");
            } else {
                headerElement.classList.remove("scrolled");
            }

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                headerElement.classList.add("nav-hidden");
            } else {
                headerElement.classList.remove("nav-hidden");
            }

            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // ==========================================
    // 3. PROJECTS FILTERING & RENDER
    // ==========================================
    const projectsGrid = document.getElementById("projectsGrid");

    function renderProjects(filter = "all") {
        if (!projectsGrid || typeof projectsData === "undefined") return;
        projectsGrid.innerHTML = "";

        const filtered = filter === "all" 
            ? projectsData 
            : projectsData.filter(p => p.category === filter);

        filtered.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";
            card.innerHTML = `
                <div>
                    <div class="card-top">
                        <span class="card-category">${project.categoryLabel}</span>
                        <i data-lucide="arrow-up-right" style="width:20px; color:var(--text-muted);"></i>
                    </div>
                    <h3 class="card-title">${project.title}</h3>
                    <p class="card-desc">${project.description}</p>
                </div>
                <div class="card-tags">
                    ${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
            `;
            projectsGrid.appendChild(card);
        });

        if (window.lucide) {
            lucide.createIcons();
        }
    }

    renderProjects("all");

    // Filter Buttons Click Handling
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const filterValue = btn.getAttribute("data-filter");
            renderProjects(filterValue);

            if (projectsGrid) {
                projectsGrid.scrollIntoView({ 
                    behavior: "smooth", 
                    block: "start" 
                });
            }
        });
    });

    // ==========================================
    // 4. THEME TOGGLE (DARK / LIGHT)
    // ==========================================
    const themeToggleBtn = document.getElementById("themeToggle");
    const htmlElement = document.documentElement;

    themeToggleBtn?.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        htmlElement.setAttribute("data-theme", newTheme);

        themeToggleBtn.innerHTML = newTheme === "dark" 
            ? `<i data-lucide="sun"></i>` 
            : `<i data-lucide="moon"></i>`;

        if (window.lucide) {
            lucide.createIcons();
        }
    });

    // ==========================================
    // 5. INTERACTIVE HOVER & TYPEWRITER EFFECT
    // ==========================================
    const interactiveTexts = document.querySelectorAll(".interactive-text");
    interactiveTexts.forEach((textElement) => {
        textElement.addEventListener("mousemove", (e) => {
            const rect = textElement.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            textElement.style.setProperty("--mouse-x", `${x}px`);
            textElement.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    const heroTextElement = document.getElementById("heroInteractiveText");
    if (heroTextElement) {
        const wordsData = heroTextElement.getAttribute("data-words");
        if (wordsData) {
            const words = JSON.parse(wordsData);
            let wordIndex = 0;
            let charIndex = words[0].length;
            let isDeleting = true;
            let typeSpeed = 100;

            function typeEffect() {
                const currentWord = words[wordIndex];
                
                if (isDeleting) {
                    charIndex--;
                    typeSpeed = 40;
                } else {
                    charIndex++;
                    typeSpeed = 80;
                }

                heroTextElement.innerHTML = currentWord.substring(0, charIndex);

                if (!isDeleting && charIndex === currentWord.length) {
                    typeSpeed = 2200;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    typeSpeed = 400;
                }

                setTimeout(typeEffect, typeSpeed);
            }

            setTimeout(typeEffect, 2000);
        }
    }
});
