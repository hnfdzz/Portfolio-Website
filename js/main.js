document.addEventListener("DOMContentLoaded", () => {
    // 1. Inisialisasi Ikon Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Render Kartu Proyek Dinamis
    const projectsGrid = document.getElementById("projectsGrid");

    function renderProjects(filter = "all") {
        if (!projectsGrid) return;
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

    // Initial Render
    renderProjects("all");

    // 3. Handling Tombol Filter & Otomatis Scroll / Navigasi
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

    // 4. Toggle Tema Dark / Light
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

    // 5. Efek Spotlight Mouse pada Teks Interaktif
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

    // 6. Fitur Typewriter / Dynamic Word Swapper
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
                    typeSpeed = 2200; // Waktu jeda saat kata selesai diketik
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    typeSpeed = 400; // Jeda sebelum mengetik kata berikutnya
                }

                setTimeout(typeEffect, typeSpeed);
            }

            // Memulai efek typewriter setelah jeda 2 detik pertama
            setTimeout(typeEffect, 2000);
        }
    }
});