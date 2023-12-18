class FinancialCalculator extends HTMLElement {
  constructor() {
    super();


    this.attachShadow({ mode: 'open' });

    this._loanAmount = 0;
    this._interestRate = 0;
    this._loanTerm = 0;


    console.log('Калькулятор создан');
  }

  connectedCallback() {
    this.renderForm();
  }

  disconnectedCallback() {
    console.log('Калькулятор удален');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Данные обновлены: ${name}: ${newValue}`);
    this.calculateLoan();
  }

  static get observedAttributes() {
    return ['loan-amount', 'interest-rate', 'loan-term'];
  }

  get loanAmount() {
    return this._loanAmount;
  }

  set loanAmount(value) {
    this.setAttribute('loan-amount', value);
  }

  get interestRate() {
    return this._interestRate;
  }

  set interestRate(value) {
    this.setAttribute('interest-rate', value);
  }

  get loanTerm() {
    return this._loanTerm;
  }

  set loanTerm(value) {
    this.setAttribute('loan-term', value);
  }

  renderForm() {
    const form = document.createElement('form');
    form.innerHTML = `
      <label for="loan-amount">Сумма кредита:</label>
      <input type="number" id="loan-amount" value="${this.loanAmount}">
      <label for="interest-rate">Процентная ставка:</label>
      <input type="number" id="interest-rate" value="${this.interestRate}">
      <label for="loan-term">Срок кредита (в месяцах):</label>
      <input type="number" id="loan-term" value="${this.loanTerm}">
    `;

    form.addEventListener('input', (event) => {
      if (event.target.id === 'loan-amount') {
        this.loanAmount = event.target.value;
      } else if (event.target.id === 'interest-rate') {
        this.interestRate = event.target.value;
      } else if (event.target.id === 'loan-term') {
        this.loanTerm = event.target.value;
      }
    });

    this.shadowRoot.appendChild(form);

    this.calculateLoan();
  }

  calculateLoan() {
    const amount = parseFloat(this.getAttribute('loan-amount'));
    const rate = parseFloat(this.getAttribute('interest-rate'));
    const term = parseFloat(this.getAttribute('loan-term'));

    if (isNaN(amount) || isNaN(rate) || isNaN(term) || amount <= 0 || rate <= 0 || term <= 0) {
      console.error('Некорректные данные. Пожалуйста, введите корректные числовые значения.');
      return;
    }

    const monthlyInterest = (rate / 100) / 12;
    const monthlyPayment = (amount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -term));
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - amount;

    console.log('Ежемесячный платеж:', monthlyPayment.toFixed(2));
    console.log('Общая сумма, которую нужно заплатить:', totalPayment.toFixed(2));
    console.log('Общий процент по кредиту:', totalInterest.toFixed(2));
  }
}

customElements.define('financial-calculator', FinancialCalculator);
