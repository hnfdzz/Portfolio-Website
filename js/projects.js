// File: js/projects.js

const projectsData = [
    // ==========================================
    // 1. PROYEK UTAMA (FEATURED PROJECTS)
    // ==========================================
    {
        id: "spendwise",
        title: "SpendWise Studio",
        category: "software",
        categoryLabel: "Software & Web",
        description: "Aplikasi web penjelajah & pelacak keuangan fullstack dengan sistem autentikasi aman serta real-time financial insights.",
        tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth"],
        icon: "wallet"
    },
    {
        id: "ecafe",
        title: "E-Cafe System",
        category: "software",
        categoryLabel: "Software & Web",
        description: "Platform pemesanan kafe interaktif yang dilengkapi dengan sistem identitas visual empat warna kustom untuk UX optimal.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        icon: "coffee"
    },
    {
        id: "resiliops",
        title: "ResiliOps",
        category: "system",
        categoryLabel: "Systems & Cloud",
        description: "Dashboard resiliensi microservice dan chaos engineering yang mengimplementasikan Redis-backed circuit breaker untuk fault tolerance.",
        tags: ["FastAPI", "Redis", "Next.js"],
        icon: "shield-alert"
    },
    {
        id: "weeview",
        title: "WeeView",
        category: "system",
        categoryLabel: "Systems & Cloud",
        description: "Sistem berbasis WiFi CSI untuk deteksi keberadaan manusia dan estimasi pose menggunakan embedded signal processing pada ESP32-S3.",
        tags: ["Rust", "ESP32-S3", "Signal Processing"],
        icon: "wifi"
    },

    // ==========================================
    // 2. PROYEK LAINNYA & AI / DATA SCIENCE
    // ==========================================
    {
        id: "ai-1",
        title: "AI Medical Assistant & Diagnostics",
        category: "ai",
        categoryLabel: "AI & Data",
        description: "Sistem kecerdasan buatan berbasis LLM untuk membantu triase dan analisis data medis awal secara responsif.",
        tags: ["Python", "LLM", "FastAPI", "PyTorch"],
        icon: "bot"
    },
    {
        id: "ai-2",
        title: "Smart Sentiment & Trend Analyzer",
        category: "ai",
        categoryLabel: "AI & Data",
        description: "Dashboard analitik data media sosial berbasis Natural Language Processing (NLP) untuk deteksi tren waktu nyata.",
        tags: ["Python", "NLP", "Pandas", "Streamlit"],
        icon: "bar-chart-3"
    },
    {
        id: "ai-3",
        title: "Predictive Sales & Demand Analytics",
        category: "ai",
        categoryLabel: "AI & Data",
        description: "Model Machine Learning untuk memprediksi stok barang dan tren penjualan UMKM dengan akurasi tinggi.",
        tags: ["Scikit-Learn", "Python", "Data Science"],
        icon: "trending-up"
    },
    {
        id: "soft-3",
        title: "Interactive Portfolio Web 3D",
        category: "software",
        categoryLabel: "Software & Web",
        description: "Website portofolio interaktif berbasis Three.js 3D Space visual dengan arsitektur UI/UX modern.",
        tags: ["JavaScript", "Three.js", "HTML5", "CSS3"],
        icon: "globe"
    },
    {
        id: "sys-1",
        title: "Microservices Infrastructure Setup",
        category: "system",
        categoryLabel: "Systems & Cloud",
        description: "Implementasi arsitektur microservices menggunakan Docker containerization dan Nginx Reverse Proxy.",
        tags: ["Docker", "Nginx", "Linux", "DevOps"],
        icon: "server"
    },
    {
        id: "sys-2",
        title: "Automated CI/CD Pipeline Deployment",
        category: "system",
        categoryLabel: "Systems & Cloud",
        description: "Sistem otomasi integrasi dan pengujian kode otomatis dari repository GitHub langsung ke server cloud.",
        tags: ["GitHub Actions", "Docker", "AWS"],
        icon: "git-branch"
    }
];