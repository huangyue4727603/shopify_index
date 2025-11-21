class ZodiacCalculator extends HTMLElement {
  constructor() {
    super()
    this.currentScreen = 'welcome'
    this.birthDate = null
    this.zodiacResult = null
    this.currentLocale = window.zodiacCurrentLocale || 'zh-CN'

    // 生肖英文key映射
    this.zodiacKeys = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig']
  }

  connectedCallback() {
    this.setupEventListeners()
  }

  getTranslation(key, zodiacKey = null) {
    const i18n = window.zodiacI18n || {}
    let locale = this.currentLocale

    // 如果当前语言不存在，fallback到中文
    if (!i18n[locale]) {
      locale = 'zh-CN'
    }

    // 如果中文也不存在，fallback到英文
    if (!i18n[locale] && i18n['en']) {
      locale = 'en'
    }

    const translations = i18n[locale]
    if (!translations) return ''

    if (key === 'zodiacName' && zodiacKey) {
      return translations.zodiacNames[zodiacKey] || zodiacKey
    }

    if (key === 'label') {
      return translations.labels || {}
    }

    if (key === 'zodiacData' && zodiacKey) {
      return translations.zodiacData[zodiacKey] || {}
    }

    return ''
  }

  setupEventListeners() {
    // 开始测试按钮
    const startBtn = this.querySelector('[data-action="start"]')
    if (startBtn) {
      startBtn.addEventListener('click', () => this.showScreen('input'))
    }

    // 日期输入
    const dateInput = this.querySelector('[data-birth-date]')
    if (dateInput) {
      dateInput.addEventListener('change', (e) => {
        this.birthDate = e.target.value
        const calculateBtn = this.querySelector('[data-action="calculate"]')
        if (calculateBtn) {
          calculateBtn.disabled = !this.birthDate
        }
      })
    }

    // 计算按钮
    const calculateBtn = this.querySelector('[data-action="calculate"]')
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        if (this.birthDate) {
          this.calculateZodiac()
          this.showScreen('result')
        }
      })
    }

    // 重新测试按钮
    const restartBtn = this.querySelector('[data-action="restart"]')
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.reset()
        this.showScreen('welcome')
      })
    }
  }

  showScreen(screenName) {
    const screens = this.querySelectorAll('[data-screen]')
    screens.forEach(screen => {
      screen.classList.toggle('active', screen.dataset.screen === screenName)
    })
    this.currentScreen = screenName
  }

  calculateZodiac() {
    if (!this.birthDate) return

    const year = new Date(this.birthDate).getFullYear()

    // 计算生肖（1900年是鼠年，索引0）
    const index = (year - 1900) % 12
    const zodiacKey = this.zodiacKeys[index]

    this.zodiacResult = {
      key: zodiacKey,
      name: this.getTranslation('zodiacName', zodiacKey),
      data: this.getTranslation('zodiacData', zodiacKey)
    }

    this.displayResult()
  }

  displayResult() {
    if (!this.zodiacResult) return

    // 显示生肖名称
    const nameEl = this.querySelector('[data-zodiac-name]')
    if (nameEl) {
      nameEl.textContent = this.zodiacResult.name
    }

    // 显示生肖图片
    const imageEl = this.querySelector('[data-zodiac-image]')
    if (imageEl) {
      const imagePath = window.zodiacImageUrls?.[this.zodiacResult.key]
      if (imagePath) {
        imageEl.src = imagePath
        imageEl.alt = this.zodiacResult.name
      }
    }

    // 显示详情
    this.displayDetails()

    // 显示产品推荐标题
    const productsTitle = this.querySelector('[data-products-title]')
    if (productsTitle) {
      const currentYear = new Date().getFullYear()
      const labels = this.getTranslation('label')
      const template = labels.productsTitle || '{year}年属{zodiac}人的专属增强磁场推荐'
      productsTitle.textContent = template
        .replace('{year}', currentYear)
        .replace('{zodiac}', this.zodiacResult.name)
    }
  }

  displayDetails() {
    const detailsContainer = this.querySelector('[data-zodiac-details]')
    if (!detailsContainer) return

    const data = this.zodiacResult.data
    const labels = this.getTranslation('label')

    if (!data || !labels) return

    const details = `
      <div class="zodiac-details">
        <div class="zodiac-details__section">
          <h4>${labels.personality || 'Personality'}</h4>
          <p>${data.personality || ''}</p>
          ${data.traits ? `<ul class="zodiac-details__list">
            ${data.traits.map(trait => `<li>${trait}</li>`).join('')}
          </ul>` : ''}
        </div>

        <div class="zodiac-details__section">
          <h4>${labels.luckyElements || 'Lucky Elements'}</h4>
          <div class="zodiac-details__grid">
            ${data.lucky ? `<div class="zodiac-details__item">
              <span class="zodiac-details__label">${labels.luckyColors || 'Lucky Colors:'}</span>
              <span class="zodiac-details__value">${data.lucky.join('、')}</span>
            </div>` : ''}
            ${data.numbers ? `<div class="zodiac-details__item">
              <span class="zodiac-details__label">${labels.luckyNumbers || 'Lucky Numbers:'}</span>
              <span class="zodiac-details__value">${data.numbers.join('、')}</span>
            </div>` : ''}
          </div>
        </div>

        ${data.career ? `<div class="zodiac-details__section">
          <h4>${labels.suitableCareer || 'Suitable Careers'}</h4>
          <div class="zodiac-details__tags">
            ${data.career.map(job => `<span class="zodiac-details__tag">${job}</span>`).join('')}
          </div>
        </div>` : ''}

        ${data.fortune2026 ? `<div class="zodiac-details__section">
          <h4>${labels.fortune2026 || '2026 Fortune'}</h4>
          <p>${data.fortune2026}</p>
        </div>` : ''}

        ${data.advice ? `<div class="zodiac-details__section">
          <h4>${labels.advice || 'Advice'}</h4>
          <p>${data.advice}</p>
        </div>` : ''}
      </div>
    `

    detailsContainer.innerHTML = details
  }

  reset() {
    this.birthDate = null
    this.zodiacResult = null

    const dateInput = this.querySelector('[data-birth-date]')
    if (dateInput) {
      dateInput.value = ''
    }

    const calculateBtn = this.querySelector('[data-action="calculate"]')
    if (calculateBtn) {
      calculateBtn.disabled = true
    }
  }
}

customElements.define('zodiac-calculator', ZodiacCalculator)
