class CustomCard extends HTMLElement {
    constructor() {
      super();
  
      const template = document.getElementById('card-template');
      const templateContent = template.content;
  
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
  }
  
  customElements.define('custom-card', CustomCard);
  