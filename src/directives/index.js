import Vue from 'vue'

function checkNumber (value, valueParams) {
  const { decimal = true } = valueParams || {}
  return checkNumberOverflow(value, decimal)
}

function checkNumberOverflow (value, length = 0) {
  if (length === true) {
    return false
  }
  if (!value) return false
  return value.length >= length
}

/**
 * Директива проверки ввода чисел
 * @param {Object} params - Параметры форматирования поля
 * @param {number, boolean} params.decimal - длина числа, true - неограничено
 */
export default Vue.directive('number-check', {
  bind (el, binding) {

    const keyDownHandler = (e) => {
      const value = e.target.value

      if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode === 65 && e.ctrlKey === true) ||
          // Allow: Ctrl+C
          (e.keyCode === 67 && e.ctrlKey === true) ||
          // Allow: Ctrl+X
          (e.keyCode === 88 && e.ctrlKey === true) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return
      }

      const isSelection = e.target.selectionStart !== e.target.selectionEnd
      if (((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
              (e.keyCode < 96 || e.keyCode > 105)) || (!isSelection && checkNumber(value, binding.value))) {
        e.preventDefault()
      }
    }

    const pasteHandler = (e) => {
      e.preventDefault()
    }

    el.addEventListener('keydown', keyDownHandler)
    el.addEventListener('paste', pasteHandler, true)
    el.$destroy = () => {
      el.removeEventListener('keydown', keyDownHandler)
      el.removeEventListener('paste', pasteHandler)
    }
  },
  unbind: function (el) {
    el.$destroy()
  }
})
