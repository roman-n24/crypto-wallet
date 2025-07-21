const selects = document.querySelectorAll('.custom-select');
const inputs = document.querySelectorAll('.input-select');
const settings = document.querySelector('.settings-popup');
const footer = document.querySelector('.footer');

selects.forEach((select, index) => {
  const selected = select.querySelector('.custom-select__selected');
  const optionsContainer = select.querySelector('.custom-select__options');
  const options = select.querySelectorAll('.custom-select__option');
  const input = inputs[index];

  selected.addEventListener('click', () => {
    document.querySelectorAll('.custom-select__options.active').forEach(open => {
      if (open !== optionsContainer) {
        open.classList.remove('active');
      }
    });

    optionsContainer.classList.toggle('active');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      const img = option.querySelector('img');
      const text = option.textContent.trim();

      selected.innerHTML = '';

      if (img) {
        const newImg = img.cloneNode();
        selected.appendChild(newImg);
      }

      selected.appendChild(document.createTextNode(' ' + text));

      const arrow = document.createElement('span');
      arrow.className = 'custom-select__arrow';
      arrow.innerHTML = `<img src="./images/chevron-selector-vertical.svg" alt="Chevron selector vertical">`;
      selected.appendChild(arrow);

      input.value = option.dataset.value;
      optionsContainer.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!select.contains(e.target)) {
      optionsContainer.classList.remove('active');
    }
  });
});

const customWidgetSelects = document.querySelectorAll('.custom-widget-select');
const widgetInputs = document.querySelectorAll('.input-widget-select');

customWidgetSelects.forEach((select, i) => {
  const icon = select.querySelector('.custom-widget-select__icon');
  const title = select.querySelector('.info-status__title');
  const optionsContainer = select.querySelector('.custom-widget-select__options');
  const input = widgetInputs[i];

  select.addEventListener('click', (e) => {
    e.stopPropagation();
    optionsContainer.classList.toggle('visible');
  });

  optionsContainer.addEventListener('click', (e) => {
    const option = e.target.closest('[data-value]');
    if (!option) {
      return
    }
    
    const optionImg = option.querySelector('.option-img');

    if (optionImg) {
        const newImg = optionImg.cloneNode();
        icon.innerHTML = ``
        icon.append(newImg)
    }

    const value = option.dataset.value;
    input.value = value;
    
    if(title) {
      title.textContent = option.textContent
    }
  });

  document.addEventListener('click', (e) => {
    if (!select.contains(e.target)) {
      optionsContainer.classList.remove('visible');
    }
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.custom-widget-select__options.visible')
    .forEach(el => el.classList.remove('visible'));
});

function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    if (popup.classList.contains('popup')) {
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      document.body.appendChild(overlay);
      setTimeout(() => overlay.classList.add('active'), 0);
    }
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    if (popup.classList.contains('popup')) {
      const overlay = document.querySelector('.overlay');
      if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
      }
    }
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

document.querySelectorAll('[data-popup-target]').forEach(button => {
  button.addEventListener('click', () => {
    const popupId = button.getAttribute('data-popup-target');
    openPopup(popupId);
  });
});

document.querySelectorAll('.popup__close').forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup, .footer-popup');
    if (popup) {
      closePopup(popup.id);
    }
  });
});

const switcher = document.querySelector('.network-switch');
const buttons = switcher.querySelectorAll('.network-switch__option');
const slider = switcher.querySelector('.network-switch__slider');

buttons.forEach((btn, index) => {
  let activeIndex = 0
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    slider.style.left = index === 0 ? '2px' : '50%';

    const selectedNetwork = btn.dataset.network;
    console.log('Selected network:', selectedNetwork);
  });
});

const input = document.querySelector('.balance-input');
const usdValue = document.querySelector('.widget-balance-swap__usd-value');
const rate = 3.18;

function adjustInputWidth() {
  const tempSpan = document.createElement('span');
  tempSpan.style.fontSize = getComputedStyle(input).fontSize;
  tempSpan.style.fontWeight = getComputedStyle(input).fontWeight;
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.position = 'absolute';
  tempSpan.style.whiteSpace = 'pre'; 
  tempSpan.textContent = input.value || input.placeholder;

  document.body.appendChild(tempSpan);
  const textWidth = tempSpan.offsetWidth;
  document.body.removeChild(tempSpan);

  input.style.width = `${Math.max(textWidth + 10, 30)}px`;
}

input.addEventListener('input', function() {
  const ton = parseFloat(this.value) || 0;
  usdValue.textContent = ton * rate.toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' USD';
  adjustInputWidth();
});

adjustInputWidth();