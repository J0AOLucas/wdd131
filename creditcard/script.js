document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkoutCreditCard');
  const cardNumberInput = document.getElementById('creditCardNumber');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');
  const cvcInput = document.getElementById('cvc');
  const feedback = document.getElementById('feedback');

  cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    if (formattedValue.length <= 19) {
      e.target.value = formattedValue;
    } else {
      e.target.value = formattedValue.substring(0, 19);
    }
  });

  monthInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) value = value.substring(0, 2);
    
    if (value.length === 2) {
      const month = parseInt(value);
      if (month < 1 || month > 12) {
        e.target.setCustomValidity('Mês deve ser entre 01 e 12');
      } else {
        e.target.setCustomValidity('');
        if (month < 10 && value[0] !== '0') {
          e.target.value = '0' + month;
        } else {
          e.target.value = value;
        }
      }
    } else {
      e.target.value = value;
      e.target.setCustomValidity('');
    }
  });

  yearInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) value = value.substring(0, 2);
    e.target.value = value;
  });

  cvcInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.substring(0, 4);
    e.target.value = value;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    feedback.classList.add('hide');
    feedback.className = 'hide';

    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    if (cardNumber !== '1234123412341234') {
      showFeedback('Número do cartão inválido. Use: 1234 1234 1234 1234', 'error');
      cardNumberInput.focus();
      return;
    }

    if (!monthInput.value || monthInput.value.length !== 2) {
      showFeedback('Por favor, preencha o mês de expiração (MM)', 'error');
      monthInput.focus();
      return;
    }

    if (!yearInput.value || yearInput.value.length !== 2) {
      showFeedback('Por favor, preencha o ano de expiração (YY)', 'error');
      yearInput.focus();
      return;
    }

    const enteredMonth = parseInt(monthInput.value);
    const enteredYear = parseInt(yearInput.value);

    if (enteredMonth < 1 || enteredMonth > 12) {
      showFeedback('Mês inválido. Use um valor entre 01 e 12', 'error');
      monthInput.focus();
      return;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (enteredYear < currentYear) {
      showFeedback('O cartão está expirado. Por favor, use uma data válida.', 'error');
      monthInput.focus();
      return;
    }

    if (enteredYear === currentYear && enteredMonth < currentMonth) {
      showFeedback('O cartão está expirado. Por favor, use uma data válida.', 'error');
      monthInput.focus();
      return;
    }

    const cardHolder = document.getElementById('cardHolder').value.trim();
    const cvc = cvcInput.value.trim();

    if (!cardHolder) {
      showFeedback('Por favor, preencha o nome do titular do cartão', 'error');
      document.getElementById('cardHolder').focus();
      return;
    }

    if (!cvc || cvc.length < 3) {
      showFeedback('Por favor, preencha o CVC/CVV (3 ou 4 dígitos)', 'error');
      cvcInput.focus();
      return;
    }

    showFeedback('Cartão de crédito validado com sucesso! ✅', 'success');
    
    setTimeout(() => {
      form.reset();
      feedback.classList.add('hide');
    }, 3000);
  });

  function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.classList.remove('hide');
    feedback.classList.add(type);
  }
});

