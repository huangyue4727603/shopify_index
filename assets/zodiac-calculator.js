class ZodiacCalculator extends HTMLElement {
  constructor() {
    super()
    this.currentScreen = 'welcome'
    this.birthDate = null
    this.zodiacResult = null

    // 生肖数据
    this.zodiacData = {
      '鼠': {
        name: '鼠',
        years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020],
        image: 'zodiac-鼠.png',
        traits: ['聪明伶俐', '适应力强', '善于社交'],
        lucky: ['蓝色', '金色', '绿色'],
        numbers: ['2', '3'],
        career: ['企业家', '作家', '艺术家'],
        personality: '鼠年出生的人通常机智聪明，适应能力强，善于社交。他们具有敏锐的观察力和商业头脑。',
        fortune2026: '2026年对属鼠人来说是充满机遇的一年，事业上会有突破性进展。',
        advice: '保持积极乐观的心态，抓住机遇，勇于尝试新事物。'
      },
      '牛': {
        name: '牛',
        years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021],
        image: 'zodiac-牛.png',
        traits: ['勤劳踏实', '坚韧不拔', '责任心强'],
        lucky: ['白色', '黄色', '绿色'],
        numbers: ['1', '9'],
        career: ['工程师', '医生', '教师'],
        personality: '牛年出生的人性格沉稳，做事踏实可靠，有很强的责任心和耐心。',
        fortune2026: '2026年属牛人运势平稳，适合稳扎稳打，积累实力。',
        advice: '保持耐心，坚持不懈，注意劳逸结合，关注健康。'
      },
      '虎': {
        name: '虎',
        years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022],
        image: 'zodiac-虎.png',
        traits: ['勇敢果断', '充满自信', '领导力强'],
        lucky: ['橙色', '灰色', '蓝色'],
        numbers: ['1', '3', '4'],
        career: ['领导者', '军人', '运动员'],
        personality: '虎年出生的人勇敢自信，具有强大的领导力和冒险精神。',
        fortune2026: '2026年属虎人运势强劲，适合大展拳脚，实现抱负。',
        advice: '发挥领导才能，但要注意团队协作，避免过于冲动。'
      },
      '兔': {
        name: '兔',
        years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023],
        image: 'zodiac-兔.png',
        traits: ['温和善良', '心思细腻', '艺术天赋'],
        lucky: ['红色', '粉色', '紫色'],
        numbers: ['3', '4', '9'],
        career: ['设计师', '外交官', '艺术家'],
        personality: '兔年出生的人温柔体贴，善解人意，具有很好的艺术品味。',
        fortune2026: '2026年属兔人运势温和，人际关系和谐，适合发展创意事业。',
        advice: '发挥创造力，保持乐观心态，注意人际关系的维护。'
      },
      '龙': {
        name: '龙',
        years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024],
        image: 'zodiac-龙.png',
        traits: ['自信热情', '魅力非凡', '创新能力强'],
        lucky: ['金色', '银色', '白色'],
        numbers: ['1', '6', '7'],
        career: ['企业家', '演员', '政治家'],
        personality: '龙年出生的人充满活力和魅力，具有强大的创造力和领导才能。',
        fortune2026: '2026年属龙人运势旺盛，是大展宏图的好时机。',
        advice: '把握机遇，发挥创造力，但要避免过于自负。'
      },
      '蛇': {
        name: '蛇',
        years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025],
        image: 'zodiac-蛇.png',
        traits: ['智慧深沉', '神秘优雅', '直觉敏锐'],
        lucky: ['黑色', '红色', '黄色'],
        numbers: ['2', '8', '9'],
        career: ['哲学家', '研究员', '顾问'],
        personality: '蛇年出生的人智慧深沉，思维缜密，具有很强的洞察力。',
        fortune2026: '2026年属蛇人运势平稳，适合深耕细作，积累智慧。',
        advice: '发挥智慧优势，保持神秘感，注意与人沟通。'
      },
      '马': {
        name: '马',
        years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026],
        image: 'zodiac-马.png',
        traits: ['热情奔放', '活力四射', '独立自由'],
        lucky: ['黄色', '绿色', '紫色'],
        numbers: ['2', '3', '7'],
        career: ['旅行家', '销售', '表演者'],
        personality: '马年出生的人热情开朗，充满活力，喜欢自由和冒险。',
        fortune2026: '2026年是属马人的本命年，运势起伏，需要谨慎行事。',
        advice: '本命年要注意稳健，佩戴红色饰品，保持积极心态。'
      },
      '羊': {
        name: '羊',
        years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027],
        image: 'zodiac-羊.png',
        traits: ['温柔体贴', '富有同情心', '艺术气质'],
        lucky: ['绿色', '红色', '紫色'],
        numbers: ['3', '4', '9'],
        career: ['护士', '教师', '慈善家'],
        personality: '羊年出生的人温柔善良，富有同情心，具有艺术天赋。',
        fortune2026: '2026年属羊人运势温和，人际关系良好，适合发展文艺事业。',
        advice: '发挥同情心，培养艺术爱好，注意自我保护。'
      },
      '猴': {
        name: '猴',
        years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028],
        image: 'zodiac-猴.png',
        traits: ['聪明机智', '活泼好动', '适应力强'],
        lucky: ['白色', '蓝色', '金色'],
        numbers: ['4', '9'],
        career: ['科学家', '发明家', '演员'],
        personality: '猴年出生的人聪明机智，反应灵敏，善于解决问题。',
        fortune2026: '2026年属猴人运势活跃，机会多多，适合创新创业。',
        advice: '发挥聪明才智，但要避免过于浮躁，保持专注。'
      },
      '鸡': {
        name: '鸡',
        years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029],
        image: 'zodiac-鸡.png',
        traits: ['勤奋努力', '追求完美', '有条不紊'],
        lucky: ['金色', '棕色', '黄色'],
        numbers: ['5', '7', '8'],
        career: ['会计师', '分析师', '管理者'],
        personality: '鸡年出生的人勤奋认真，追求完美，做事有条理。',
        fortune2026: '2026年属鸡人运势稳定，适合精益求精，提升专业能力。',
        advice: '保持勤奋，追求卓越，但要避免过于挑剔。'
      },
      '狗': {
        name: '狗',
        years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030],
        image: 'zodiac-狗.png',
        traits: ['忠诚正直', '责任心强', '勇敢可靠'],
        lucky: ['红色', '绿色', '紫色'],
        numbers: ['3', '4', '9'],
        career: ['警察', '律师', '社会工作者'],
        personality: '狗年出生的人忠诚正直，责任心强，值得信赖。',
        fortune2026: '2026年属狗人运势良好，人际关系和谐，事业稳步发展。',
        advice: '保持忠诚，发挥正义感，注意工作与生活的平衡。'
      },
      '猪': {
        name: '猪',
        years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031],
        image: 'zodiac-猪.png',
        traits: ['真诚善良', '乐观开朗', '享受生活'],
        lucky: ['黄色', '灰色', '棕色'],
        numbers: ['2', '5', '8'],
        career: ['厨师', '娱乐业', '服务业'],
        personality: '猪年出生的人真诚善良，乐观开朗，懂得享受生活。',
        fortune2026: '2026年属猪人运势平和，生活幸福，适合享受人生。',
        advice: '保持乐观心态，享受生活，注意财务管理。'
      }
    }
  }

  connectedCallback() {
    this.setupEventListeners()
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
    const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

    // 计算生肖（1900年是鼠年）
    const index = (year - 1900) % 12
    const zodiacName = zodiacAnimals[index]

    this.zodiacResult = this.zodiacData[zodiacName]
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
      // 使用Liquid预生成的图片URL映射
      const imagePath = window.zodiacImageUrls?.[this.zodiacResult.name]
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
      productsTitle.textContent = `${currentYear}年属${this.zodiacResult.name}人的专属增强磁场推荐`
    }
  }

  displayDetails() {
    const detailsContainer = this.querySelector('[data-zodiac-details]')
    if (!detailsContainer) return

    const details = `
      <div class="zodiac-details">
        <div class="zodiac-details__section">
          <h4>性格特点</h4>
          <p>${this.zodiacResult.personality}</p>
          <ul class="zodiac-details__list">
            ${this.zodiacResult.traits.map(trait => `<li>${trait}</li>`).join('')}
          </ul>
        </div>

        <div class="zodiac-details__section">
          <h4>幸运元素</h4>
          <div class="zodiac-details__grid">
            <div class="zodiac-details__item">
              <span class="zodiac-details__label">幸运颜色：</span>
              <span class="zodiac-details__value">${this.zodiacResult.lucky.join('、')}</span>
            </div>
            <div class="zodiac-details__item">
              <span class="zodiac-details__label">幸运数字：</span>
              <span class="zodiac-details__value">${this.zodiacResult.numbers.join('、')}</span>
            </div>
          </div>
        </div>

        <div class="zodiac-details__section">
          <h4>适合职业</h4>
          <div class="zodiac-details__tags">
            ${this.zodiacResult.career.map(job => `<span class="zodiac-details__tag">${job}</span>`).join('')}
          </div>
        </div>

        <div class="zodiac-details__section">
          <h4>2026年运势</h4>
          <p>${this.zodiacResult.fortune2026}</p>
        </div>

        <div class="zodiac-details__section">
          <h4>开运建议</h4>
          <p>${this.zodiacResult.advice}</p>
        </div>
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
