<template>
  <v-app>
    <!-- ═══════ NAVBAR ═══════ -->
    <v-app-bar
      :elevation="0"
      :class="['navbar', { 'navbar-scrolled': scrolled }]"
      height="72"
      app
      :style="{ position: isMobile ? 'relative' : 'fixed', top: '0', left: '0', right: '0', width: '100%', zIndex: 9999 }"
    >
      <v-container class="d-flex align-center" style="max-width: 1200px;">
        <!-- Logo -->
        <a href="#hero" class="navbar-logo" @click.prevent="scrollTo('hero')">
          <span class="logo-icon">
            <v-icon size="22" color="#00D4FF">mdi-package-variant</v-icon>
          </span>
          <span class="logo-text font-display">
            <span class="text-gradient">Estoque</span> Pro
          </span>
        </a>

        <v-spacer />

        <!-- Desktop Nav Links -->
        <nav class="navbar-links d-none d-md-flex">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="'#' + link.id"
            class="nav-link font-mono"
            :class="{ active: activeSection === link.id }"
            @click.prevent="scrollTo(link.id)"
          >
            {{ link.label }}
          </a>
        </nav>

        <!-- CTA Button -->
        <v-btn
          size="small"
          class="navbar-cta d-none d-md-flex ml-6"
          href="#pricing"
          @click.prevent="scrollTo('pricing')"
        >
          <v-icon start size="16">mdi-cart</v-icon>
          Comprar Agora
        </v-btn>

        <!-- Mobile Menu -->
        <v-btn
          icon
          variant="text"
          class="d-md-none"
          @click="mobileMenu = !mobileMenu"
        >
          <v-icon>{{ mobileMenu ? 'mdi-close' : 'mdi-menu' }}</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Mobile Drawer -->
    <v-navigation-drawer
      v-model="mobileMenu"
      temporary
      location="right"
      class="mobile-drawer"
      width="280"
    >
      <div class="pa-6">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="'#' + link.id"
          class="mobile-link font-mono"
          @click.prevent="scrollTo(link.id); mobileMenu = false"
        >
          <v-icon size="18" class="mr-3">{{ link.icon }}</v-icon>
          {{ link.label }}
        </a>
      </div>
    </v-navigation-drawer>

    <!-- ═══════ MAIN CONTENT ═══════ -->
    <v-main>
      <!-- ═══════ HERO SECTION ═══════ -->
      <section id="hero" class="hero-section">
        <!-- Animated Background -->
        <div class="hero-bg">
          <div class="grid-overlay"></div>
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
          <div class="orb orb-3"></div>
          <!-- Code rain columns -->
          <div class="code-rain">
            <div v-for="n in 20" :key="n" class="rain-column" :style="rainStyle(n)">
              <span v-for="c in 15" :key="c" class="rain-char" :style="{ animationDelay: `${c * 0.15 + n * 0.3}s` }">
                {{ randomChar() }}
              </span>
            </div>
          </div>
        </div>

        <v-container class="hero-content" style="position: relative; z-index: 2;">
          <v-row align="center" justify="center" style="min-height: 100vh;">
            <v-col cols="12" class="text-center">
              <!-- Status badge -->
              <div class="status-badge reveal">
                <span class="status-dot"></span>
                <span class="font-mono">SISTEMA DISPONÍVEL</span>
              </div>

              <!-- Main heading -->
              <h1 class="hero-title reveal" style="transition-delay: 0.1s">
                <span class="hero-hi">Gerencie seu</span>
                <br>
                <span class="hero-name">
                  <span class="text-gradient">Estoque</span> com Inteligência
                </span>
              </h1>

              <!-- Typewriter subtitle -->
              <div class="hero-typewriter reveal" style="transition-delay: 0.2s">
                <span class="font-mono typewriter-prefix">&gt;&nbsp;</span>
                <span class="font-mono typewriter-text">{{ displayedText }}</span>
                <span class="typewriter-cursor">|</span>
              </div>

              <!-- Description -->
              <p class="hero-description reveal" style="transition-delay: 0.3s">
                Sistema completo de gerenciamento de estoque com controle total de produtos,
                movimentações automáticas e dashboard em tempo real.
              </p>

              <!-- CTA Buttons -->
              <div class="hero-actions reveal" style="transition-delay: 0.4s">
                <v-btn
                  size="x-large"
                  class="hero-btn-primary"
                  @click="goToRegister"
                >
                  <v-icon start>mdi-cart</v-icon>
                  Comprar Agora
                </v-btn>
                <v-btn
                  size="x-large"
                  variant="outlined"
                  class="hero-btn-secondary"
                  href="#features"
                  @click.prevent="scrollTo('features')"
                >
                  <v-icon start>mdi-information</v-icon>
                  Ver Funcionalidades
                </v-btn>
              </div>

              <!-- Scroll indicator -->
              <div class="scroll-indicator reveal" style="transition-delay: 0.6s">
                <div class="scroll-mouse">
                  <div class="scroll-dot"></div>
                </div>
                <span class="font-mono" style="font-size: 0.7rem; color: var(--cc-text-muted); margin-top: 8px;">
                  ROLAR PARA BAIXO
                </span>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- ═══════ FEATURES SECTION ═══════ -->
      <section id="features" class="features-section">
        <div class="section-divider"></div>

        <v-container>
          <v-row justify="center" class="mb-12">
            <v-col cols="12" md="8" class="text-center">
              <span class="section-label reveal">// FUNCIONALIDADES</span>
              <h2 class="section-heading reveal" style="transition-delay: 0.05s">
                Tudo que você precisa para <span class="text-gradient">gerenciar seu estoque</span>
              </h2>
              <p class="section-subtitle mx-auto mt-4 reveal" style="transition-delay: 0.1s">
                Sistema completo com todas as ferramentas necessárias para controle total
                do seu inventário.
              </p>
            </v-col>
          </v-row>

          <!-- Feature Cards -->
          <v-row justify="center">
            <v-col
              v-for="(feature, i) in features"
              :key="feature.title"
              cols="12"
              md="6"
              lg="4"
              class="reveal"
              :style="{ transitionDelay: `${0.15 + i * 0.1}s` }"
            >
              <div class="feature-card glass-card pa-8">
                <div class="feature-icon-bg" :style="{ background: feature.gradient }">
                  <v-icon size="32" color="white">{{ feature.icon }}</v-icon>
                </div>
                <h3 class="feature-title font-display mt-5 mb-3">{{ feature.title }}</h3>
                <p class="feature-desc">{{ feature.description }}</p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- ═══════ STATS SECTION ═══════ -->
      <section id="stats" class="stats-section">
        <div class="section-divider"></div>

        <v-container>
          <v-row justify="center" class="mb-12">
            <v-col cols="12" md="8" class="text-center">
              <span class="section-label reveal">// RESULTADOS</span>
              <h2 class="section-heading reveal" style="transition-delay: 0.05s">
                Números que <span class="text-gradient">fazem a diferença</span>
              </h2>
            </v-col>
          </v-row>

          <!-- Stats Row -->
          <v-row justify="center">
            <v-col
              v-for="(stat, i) in stats"
              :key="stat.label"
              cols="6"
              md="3"
              class="reveal"
              :style="{ transitionDelay: `${0.1 + i * 0.08}s` }"
            >
              <div class="stat-card glass-card text-center pa-6">
                <div class="stat-icon-wrap">
                  <v-icon :color="stat.color" size="28">{{ stat.icon }}</v-icon>
                </div>
                <div class="stat-number font-display" :style="{ color: stat.color }">
                  {{ animatedStats[i] }}{{ stat.suffix }}
                </div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- ═══════ PRICING/CTA SECTION ═══════ -->
      <section id="pricing" class="cta-section">
        <!-- Background glow -->
        <div class="cta-bg">
          <div class="cta-orb cta-orb-1"></div>
          <div class="cta-orb cta-orb-2"></div>
        </div>

        <v-container style="position: relative; z-index: 1;">
          <v-row justify="center" class="mb-10">
            <v-col cols="12" md="8" class="text-center">
              <span class="section-label reveal">// COMECE AGORA</span>
              <h2 class="cta-heading font-display reveal" style="transition-delay: 0.05s">
                Pronto para <br>
                <span class="text-gradient">transformar seu estoque?</span>
              </h2>
              <p class="section-subtitle mx-auto mt-4 reveal" style="transition-delay: 0.1s">
                Adquira agora e tenha controle total do seu inventário em minutos.
              </p>
            </v-col>
          </v-row>

          <!-- Pricing Card -->
          <v-row justify="center" class="mb-12">
            <v-col cols="12" md="6" lg="5">
              <div class="pricing-card reveal-scale" style="transition-delay: 0.15s">
                <div class="pricing-header">
                  <h3 class="pricing-title font-display">Plano Completo</h3>
                  <div class="pricing-price">
                    <span class="price-currency">R$</span>
                    <span class="price-amount">99</span>
                    <span class="price-period">/mês</span>
                  </div>
                </div>
                <div class="pricing-features">
                  <div v-for="benefit in pricingBenefits" :key="benefit" class="pricing-feature">
                    <v-icon size="20" color="#4ADE80" class="mr-2">mdi-check-circle</v-icon>
                    <span>{{ benefit }}</span>
                  </div>
                </div>
                <v-btn
                  size="x-large"
                  class="pricing-btn"
                  block
                  @click="goToRegister"
                >
                  <v-icon start>mdi-cart</v-icon>
                  Comprar Agora
                </v-btn>
              </div>
            </v-col>
          </v-row>

          <!-- CTA Buttons -->
          <v-row justify="center">
            <v-col cols="12" class="text-center reveal" style="transition-delay: 0.25s">
              <v-btn
                size="x-large"
                class="cta-btn-main mr-4 mb-3"
                @click="goToRegister"
              >
                <v-icon start>mdi-rocket-launch</v-icon>
                Criar Conta Grátis
              </v-btn>
              <v-btn
                size="x-large"
                variant="outlined"
                class="cta-btn-docs mb-3"
                href="#features"
                @click.prevent="scrollTo('features')"
              >
                <v-icon start>mdi-information</v-icon>
                Ver Detalhes
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- ═══════ FOOTER ═══════ -->
      <footer class="footer-section">
        <v-container>
          <v-row justify="center" class="text-center">
            <v-col cols="12">
              <div class="footer-logo mb-4">
                <v-icon size="24" color="#00D4FF" class="mr-2">mdi-package-variant</v-icon>
                <span class="font-display">
                  <span class="text-gradient">Estoque</span> Pro
                </span>
              </div>
              <p class="footer-text">
                Sistema de Gerenciamento de Estoque © 2024
              </p>
              <div class="footer-links mt-4">
                <v-btn
                  variant="text"
                  size="small"
                  class="footer-link"
                  @click="scrollTo('features')"
                >
                  Funcionalidades
                </v-btn>
                <v-btn
                  variant="text"
                  size="small"
                  class="footer-link"
                  @click="goToLogin"
                >
                  Login
                </v-btn>
                <v-btn
                  variant="text"
                  size="small"
                  class="footer-link"
                  @click="goToRegister"
                >
                  Cadastro
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </footer>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import '@/assets/apresentacao.css'

const router = useRouter()

const phrases = [
  'CRUD completo de produtos',
  'Movimentações de entrada e saída',
  'Atualização automática de estoque',
  'Histórico completo de transações',
  'Dashboard com métricas em tempo real',
  'Regras de validação inteligentes',
]

const displayedText = ref('')
let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let timeout = null

function typeEffect() {
  const current = phrases[phraseIndex]

  if (!isDeleting) {
    displayedText.value = current.substring(0, charIndex + 1)
    charIndex++
    if (charIndex === current.length) {
      isDeleting = true
      timeout = setTimeout(typeEffect, 2000)
      return
    }
    timeout = setTimeout(typeEffect, 60)
  } else {
    displayedText.value = current.substring(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      timeout = setTimeout(typeEffect, 400)
      return
    }
    timeout = setTimeout(typeEffect, 30)
  }
}

const codeChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ+-=<>[]{}'
function randomChar() {
  return codeChars[Math.floor(Math.random() * codeChars.length)]
}

function rainStyle(n) {
  return {
    left: `${(n - 1) * 5 + Math.random() * 2}%`,
    animationDuration: `${8 + Math.random() * 12}s`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: 0.08 + Math.random() * 0.08,
  }
}

const scrolled = ref(false)
const activeSection = ref('hero')
const mobileMenu = ref(false)
const isMobile = ref(false)

// Detectar se é mobile
function checkMobile() {
  isMobile.value = window.innerWidth < 960
}

// Adicionar listener para resize
if (typeof window !== 'undefined') {
  checkMobile()
  window.addEventListener('resize', checkMobile)
}

const navLinks = [
  { id: 'features', label: 'Funcionalidades', icon: 'mdi-star-four-points' },
  { id: 'stats', label: 'Resultados', icon: 'mdi-chart-line' },
  { id: 'pricing', label: 'Preços', icon: 'mdi-tag' },
]

const features = [
  {
    icon: 'mdi-package-variant-closed',
    title: 'CRUD de Produtos',
    description: 'Crie, edite, visualize e exclua produtos com interface intuitiva. Controle completo sobre seu catálogo de produtos.',
    gradient: 'linear-gradient(135deg, #00D4FF, #06B6D4)',
  },
  {
    icon: 'mdi-swap-horizontal',
    title: 'Movimentações (Core)',
    description: 'Sistema robusto de entrada e saída de produtos. Registre todas as movimentações com rastreabilidade completa.',
    gradient: 'linear-gradient(135deg, #7C3AED, #EC4899)',
  },
  {
    icon: 'mdi-sync',
    title: 'Atualização Automática',
    description: 'Estoque atualizado automaticamente a cada movimentação. Sem necessidade de cálculos manuais.',
    gradient: 'linear-gradient(135deg, #FBBF24, #F97316)',
  },
  {
    icon: 'mdi-history',
    title: 'Histórico Completo',
    description: 'Acompanhe todo o histórico de transações. Relatórios detalhados de todas as movimentações realizadas.',
    gradient: 'linear-gradient(135deg, #4ADE80, #10B981)',
  },
  {
    icon: 'mdi-chart-box',
    title: 'Dashboard com Métricas',
    description: 'Visualize métricas importantes em tempo real. Gráficos e indicadores para tomada de decisão inteligente.',
    gradient: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
  },
  {
    icon: 'mdi-shield-check',
    title: 'Regras de Validação',
    description: 'Configure regras personalizadas para validação de estoque. Alertas automáticos para situações críticas.',
    gradient: 'linear-gradient(135deg, #EC4899, #F43F5E)',
  },
]

const stats = [
  { icon: 'mdi-package-variant', label: 'Produtos', value: 10000, suffix: '+', color: '#00D4FF' },
  { icon: 'mdi-trending-up', label: 'Eficiência', value: 95, suffix: '%', color: '#4ADE80' },
  { icon: 'mdi-clock-fast', label: 'Tempo Real', value: 24, suffix: '/7', color: '#7C3AED' },
  { icon: 'mdi-shield-check', label: 'Confiabilidade', value: 99.9, suffix: '%', color: '#FBBF24' },
]

const animatedStats = ref(stats.map(() => 0))

const pricingBenefits = [
  'CRUD completo de produtos',
  'Movimentações ilimitadas',
  'Atualização automática',
  'Histórico completo',
  'Dashboard avançado',
  'Regras de validação',
  'Suporte prioritário',
  'Atualizações gratuitas',
]

function animateCount(index, target, duration = 2000) {
  const isFloat = !Number.isInteger(target)
  const start = performance.now()
  function update(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = eased * target
    animatedStats.value[index] = isFloat ? current.toFixed(1) : Math.floor(current)
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function handleScroll() {
  scrolled.value = window.scrollY > 50

  const sections = ['pricing', 'stats', 'features', 'hero']
  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 200) {
        activeSection.value = id
        break
      }
    }
  }
}

function goToLogin() {
  router.push('/login')
}

function goToRegister() {
  router.push('/register')
}

// Reveal animation observer
let revealObserver = null

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  timeout = setTimeout(typeEffect, 1000)

  // Setup reveal animations
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )

  setTimeout(() => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      revealObserver.observe(el)
    })

    // Animate stats when stats section is visible
    const statsSection = document.getElementById('stats')
    if (statsSection) {
      const statsObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            stats.forEach((s, i) => animateCount(i, s.value))
            statsObserver.disconnect()
          }
        },
        { threshold: 0.3 }
      )
      statsObserver.observe(statsSection)
    }
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', checkMobile)
  if (timeout) clearTimeout(timeout)
  if (revealObserver) revealObserver.disconnect()
})
</script>

<style>
/* ── Global Vuetify Overrides ────────────────────────── */
.v-application {
  background: var(--cc-bg-deep) !important;
  font-family: var(--cc-font-body) !important;
}
.v-main {
  background: transparent !important;
}

/* Navbar fixo */
.v-toolbar.v-app-bar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  z-index: 9999 !important;
}

/* Navbar não fixo em mobile */
@media (max-width: 959px) {
  .v-toolbar.v-app-bar {
    position: relative !important;
  }
}
</style>

<style scoped>
/* ── Navbar ──────────────────────────────────────────── */
.navbar {
  background: transparent !important;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
  border-bottom: 1px solid transparent !important;
}
.navbar-scrolled {
  background: rgba(5, 8, 16, 0.85) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
}
.logo-icon {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-text {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.navbar-links {
  display: flex;
  gap: 4px;
}
.nav-link {
  font-size: 0.78rem;
  color: var(--cc-text-muted);
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 10px;
  letter-spacing: 0.04em;
  transition: all 0.3s ease;
}
.nav-link:hover {
  color: var(--cc-text-primary);
  background: rgba(255, 255, 255, 0.04);
}
.nav-link.active {
  color: var(--cc-blue);
  background: rgba(0, 212, 255, 0.08);
}

.navbar-cta {
  background: linear-gradient(135deg, var(--cc-blue), var(--cc-purple)) !important;
  color: #fff !important;
  font-family: var(--cc-font-mono) !important;
  font-size: 0.72rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.06em;
  text-transform: none !important;
  padding: 0 20px !important;
  box-shadow: 0 2px 12px rgba(0, 212, 255, 0.25) !important;
}
.navbar-cta:hover {
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4) !important;
}

.mobile-drawer {
  background: var(--cc-bg-primary) !important;
  border-left: 1px solid rgba(255, 255, 255, 0.06) !important;
}
.mobile-link {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  color: var(--cc-text-secondary);
  text-decoration: none;
  border-radius: 12px;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
  transition: all 0.3s ease;
}
.mobile-link:hover {
  background: rgba(0, 212, 255, 0.08);
  color: var(--cc-blue);
}

/* ── Hero Section ─────────────────────────────────────── */
.hero-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 70%);
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: float 8s ease-in-out infinite;
}
.orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.15), transparent 70%);
  top: 10%; left: -10%;
  animation-delay: 0s;
}
.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.15), transparent 70%);
  top: 30%; right: -5%;
  animation-delay: -3s;
}
.orb-3 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent 70%);
  bottom: 10%; left: 30%;
  animation-delay: -5s;
}

.code-rain {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.rain-column {
  position: absolute;
  top: -20%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: var(--cc-font-mono);
  font-size: 14px;
  color: var(--cc-blue);
  animation: code-rain-fall linear infinite;
}
@keyframes code-rain-fall {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(120vh); }
}
.rain-char {
  opacity: 0;
  animation: rain-char-appear 0.5s ease-out forwards;
}
@keyframes rain-char-appear {
  to { opacity: 1; }
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 100px;
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.2);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--cc-blue);
  margin-bottom: 32px;
}
.status-dot {
  width: 8px; height: 8px;
  background: var(--cc-green);
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
  box-shadow: 0 0 8px var(--cc-green);
}

.hero-title {
  font-family: var(--cc-font-display);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.04em;
  margin-bottom: 28px;
}
.hero-hi {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 400;
  color: var(--cc-text-secondary);
  letter-spacing: 0;
}
.hero-name {
  font-size: clamp(3rem, 10vw, 7rem);
  display: inline-block;
}

.hero-typewriter {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  min-height: 36px;
}
.typewriter-prefix {
  color: var(--cc-blue);
  font-size: clamp(1rem, 2.5vw, 1.4rem);
}
.typewriter-text {
  color: var(--cc-text-primary);
  font-size: clamp(1rem, 2.5vw, 1.4rem);
}
.typewriter-cursor {
  font-family: var(--cc-font-mono);
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  color: var(--cc-blue);
  animation: blink 0.8s step-end infinite;
  margin-left: 2px;
}

.hero-description {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--cc-text-secondary);
  max-width: 620px;
  margin: 0 auto 40px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
}
.hero-btn-primary {
  background: linear-gradient(135deg, var(--cc-blue), var(--cc-purple)) !important;
  color: #fff !important;
  font-family: var(--cc-font-body) !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em;
  padding: 0 32px !important;
  text-transform: none !important;
  box-shadow: 0 4px 24px rgba(0, 212, 255, 0.3) !important;
  transition: all 0.3s ease !important;
}
.hero-btn-primary:hover {
  box-shadow: 0 8px 40px rgba(0, 212, 255, 0.5) !important;
  transform: translateY(-2px) !important;
}
.hero-btn-secondary {
  border-color: rgba(255, 255, 255, 0.15) !important;
  color: var(--cc-text-primary) !important;
  font-family: var(--cc-font-body) !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em;
  padding: 0 32px !important;
  text-transform: none !important;
  transition: all 0.3s ease !important;
}
.hero-btn-secondary:hover {
  border-color: var(--cc-blue) !important;
  background: rgba(0, 212, 255, 0.08) !important;
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.scroll-mouse {
  width: 26px; height: 42px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 13px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}
.scroll-dot {
  width: 4px; height: 8px;
  background: var(--cc-blue);
  border-radius: 2px;
  animation: scroll-bounce 2s ease-in-out infinite;
}
@keyframes scroll-bounce {
  0%, 100% { opacity: 1; transform: translateY(0); }
  50% { opacity: 0.3; transform: translateY(12px); }
}

/* ── Features Section ─────────────────────────────────── */
.features-section {
  padding: 120px 0;
  position: relative;
}

.section-divider {
  width: 80px;
  height: 3px;
  background: var(--cc-gradient-primary);
  border-radius: 2px;
  margin: 0 auto 60px;
}

.section-label {
  font-family: var(--cc-font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: var(--cc-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
  display: inline-block;
}

.section-heading {
  font-family: var(--cc-font-display);
  font-weight: 800;
  font-size: clamp(2rem, 5vw, 3.5rem);
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.section-subtitle {
  font-family: var(--cc-font-body);
  color: var(--cc-text-secondary);
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.7;
  max-width: 640px;
}

.glass-card {
  background: var(--cc-bg-glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: var(--cc-border-glass);
  border-radius: var(--cc-radius-lg);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.glass-card:hover {
  background: var(--cc-bg-glass-hover);
  border-color: rgba(0, 212, 255, 0.2);
  box-shadow: var(--cc-glow-blue);
  transform: translateY(-4px);
}

.feature-card {
  height: 100%;
  position: relative;
}
.feature-icon-bg {
  width: 56px; height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
.feature-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--cc-text-primary);
}
.feature-desc {
  font-size: 0.95rem;
  color: var(--cc-text-secondary);
  line-height: 1.7;
}

/* ── Stats Section ────────────────────────────────────── */
.stats-section {
  padding: 120px 0;
  position: relative;
}

.stat-card {
  text-align: center;
  position: relative;
  overflow: hidden;
}
.stat-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--cc-gradient-primary);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.stat-card:hover::after {
  opacity: 1;
}
.stat-icon-wrap {
  width: 52px; height: 52px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 6px;
  letter-spacing: -0.03em;
}
.stat-label {
  font-family: var(--cc-font-mono);
  font-size: 0.75rem;
  color: var(--cc-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ── CTA/Pricing Section ──────────────────────────────── */
.cta-section {
  padding: 120px 0 100px;
  position: relative;
  overflow: hidden;
}

.cta-heading {
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.cta-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.cta-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}
.cta-orb-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.1), transparent 70%);
  top: -20%; left: -10%;
  animation: float 10s ease-in-out infinite;
}
.cta-orb-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.1), transparent 70%);
  bottom: -20%; right: -10%;
  animation: float 12s ease-in-out infinite;
  animation-delay: -4s;
}

.pricing-card {
  background: var(--cc-bg-glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: var(--cc-border-glass);
  border-radius: var(--cc-radius-xl);
  padding: 40px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease;
}
.pricing-card:hover {
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 32px 100px rgba(0, 212, 255, 0.2);
  transform: translateY(-8px);
}

.pricing-header {
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.pricing-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--cc-text-primary);
  margin-bottom: 16px;
}
.pricing-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}
.price-currency {
  font-size: 1.2rem;
  color: var(--cc-text-secondary);
}
.price-amount {
  font-size: 3.5rem;
  font-weight: 900;
  background: var(--cc-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.price-period {
  font-size: 1rem;
  color: var(--cc-text-muted);
}

.pricing-features {
  margin-bottom: 32px;
}
.pricing-feature {
  display: flex;
  align-items: center;
  padding: 12px 0;
  color: var(--cc-text-secondary);
  font-size: 0.95rem;
}

.pricing-btn {
  background: linear-gradient(135deg, var(--cc-blue), var(--cc-purple)) !important;
  color: #fff !important;
  font-weight: 600 !important;
  text-transform: none !important;
  box-shadow: 0 4px 24px rgba(0, 212, 255, 0.3) !important;
}
.pricing-btn:hover {
  box-shadow: 0 8px 40px rgba(0, 212, 255, 0.5) !important;
  transform: translateY(-2px) !important;
}

.cta-btn-main {
  background: linear-gradient(135deg, var(--cc-blue), var(--cc-purple)) !important;
  color: #fff !important;
  font-family: var(--cc-font-body) !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em;
  padding: 0 36px !important;
  text-transform: none !important;
  box-shadow: 0 4px 24px rgba(0, 212, 255, 0.3) !important;
  transition: all 0.3s ease !important;
}
.cta-btn-main:hover {
  box-shadow: 0 8px 40px rgba(0, 212, 255, 0.5) !important;
  transform: translateY(-2px) !important;
}
.cta-btn-docs {
  border-color: rgba(255, 255, 255, 0.15) !important;
  color: var(--cc-text-primary) !important;
  font-family: var(--cc-font-body) !important;
  font-weight: 600 !important;
  padding: 0 36px !important;
  text-transform: none !important;
  transition: all 0.3s ease !important;
}
.cta-btn-docs:hover {
  border-color: var(--cc-blue) !important;
  background: rgba(0, 212, 255, 0.08) !important;
}

/* ── Footer ───────────────────────────────────────────── */
.footer-section {
  padding: 60px 0 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: var(--cc-bg-primary);
}

.footer-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
}

.footer-text {
  color: var(--cc-text-muted);
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}
.footer-link {
  color: var(--cc-text-secondary) !important;
  text-transform: none !important;
}

/* ── Reveal Animations ───────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-scale {
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-scale.visible {
  opacity: 1;
  transform: scale(1);
}

/* ── Utilities ───────────────────────────────────────── */
.font-display { font-family: var(--cc-font-display); }
.font-mono { font-family: var(--cc-font-mono); }
.text-gradient {
  background: var(--cc-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 600px) {
  .pricing-card {
    padding: 24px;
  }
}
</style>
