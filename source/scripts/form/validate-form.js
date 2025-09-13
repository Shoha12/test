export default function validateFormInputs(form) {
  const firstName = form.querySelector('#firstname');
  const secondName = form.querySelector('#lastname');
  const phone = form.querySelector('#phone');
  const email = form.querySelector('#email');

  form.querySelectorAll('.error').forEach(el => el.remove());

  let isValid = true;

  const namePattern = /^[A-Za-zА-Яа-яЁё]{2,}$/;
  const phonePattern = /^(\+7|7|8)?\d{7,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!namePattern.test(firstName.value.trim())) {
    isValid = false;
    showError(firstName, 'Заполните имя корректно');
  }
  if (!namePattern.test(secondName.value.trim())) {
    isValid = false;
    showError(secondName, 'Заполните фамилию корректно');
  }
  if (!phonePattern.test(phone.value.trim())) {
    isValid = false;
    showError(phone, 'Укажите корректный номер телефона');
  }
  if (!emailPattern.test(email.value.trim())) {
    isValid = false;
    showError(email, 'Укажите корректную почту');
  }

  attachValidation(firstName, namePattern, 'Заполните имя корректно');
  attachValidation(secondName, namePattern, 'Заполните фамилию корректно');
  attachValidation(phone, phonePattern, 'Укажите корректный номер телефона');
  attachValidation(email, emailPattern, 'Укажите корректную почту');

  return isValid;
}

function attachValidation(input, pattern, message) {
  if (input.dataset.validationAttached) return;

  input.addEventListener('input', () => {
    if (!pattern.test(input.value.trim())) {
      showError(input, message);
    } else {
      removeError(input);
    }
  });

  input.addEventListener('blur', () => {
    if (!pattern.test(input.value.trim())) {
      showError(input, message);
    }
  });

  input.dataset.validationAttached = 'true';
}

function showError(input, message) {
  const fieldWrapper = input.closest('.form__field');
  if (!fieldWrapper) return;

  const oldError = fieldWrapper.querySelector('.error');
  if (oldError) oldError.remove();

  input.classList.add('form__field-input--error');
  const label = fieldWrapper.querySelector('.form__field-label');
  if (label) label.classList.add('form__field-label--error');

  const span = document.createElement('span');
  span.classList.add('error');
  span.textContent = message;

  fieldWrapper.appendChild(span);
}

function removeError(input) {
  const fieldWrapper = input.closest('.form__field');
  if (!fieldWrapper) return;

  const oldError = fieldWrapper.querySelector('.error');
  if (oldError) oldError.remove();

  input.classList.remove('form__field-input--error');
  const label = fieldWrapper.querySelector('.form__field-label');
  if (label) label.classList.remove('form__field-label--error');
}
