class Vue {
  constructor(el, configObject) {
    this.el = document.querySelector(el)
    const { data, methods } = configObject
    this._data = data
    this.methods = methods
    this.deptMap = new Map()

    this.init()
  }

  init() {
    this.collectDependency()
    this.initDataBind()
    this.render()
    this.bindEvent()
  }

  initDataBind() {
    this.data = {}
    const _this = this

    for(let key in this._data) {
      let obj = {
        get() {
          return _this._data[key]
        },
        set(newValue) {
          _this._data[key] = newValue
          // 更新
          _this.deptMap.get(key).forEach(element => {
            element.innerHTML = newValue
          })
        }
      }
      Object.defineProperty(this.data, key, obj)
      Object.defineProperty(this, key, obj)
    }
  }

  collectDependency() {
    const elements = this.el.querySelectorAll('*')
    const deptValueReg = /\{\{(.+?)\}\}/

    elements.forEach(element => {
      if (deptValueReg.test(element.innerHTML)) {
        const deptValue = deptValueReg.exec(element.innerHTML)[1].trim()
        if (this.deptMap.has(deptValue)) {
          let set = this.deptMap.get(deptValue)
          if (!set.has(element)) {
            set.add(element)
          }
          this.deptMap.set(deptValue, set)
        } else {
          this.deptMap.set(deptValue, new Set([element]))
        }
      }
    })
  }

  render() {
    for (let key in this._data) {
      this.deptMap.get(key).forEach(element => {
        element.innerHTML = this._data[key]
      })
    }
  }

  bindEvent() {
    const elements = this.el.querySelectorAll('*')
    elements.forEach(element => {
      const methodName = element.getAttribute('@click')
      if (!methodName) return
      element.addEventListener('click', this.methods[methodName].bind(this))
    })
  }
}