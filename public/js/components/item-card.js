class ItemCard extends HTMLElement
{
    static get observedAttributes() { return ['title', 'description', 'image', 'price']; }

    constructor()
    {
        super();
        
        this.attachShadow({ mode: "open" });
        
        this.shadowRoot.appendChild(this.createTemplate().content.cloneNode(true));   
    }

    attributeChangedCallback(name, oldValue, newValue) 
    {
        switch (name) {
          case 'title':
            this.shadowRoot.querySelector("#ItemTitle").innerHTML = newValue;
            break;
          case 'description':
            this.shadowRoot.querySelector("#ItemDescription").innerHTML = newValue;
            break;
          case 'image':
            this.shadowRoot.querySelector("#ItemImage").src = newValue;
            break;
          case 'price':
            this.shadowRoot.querySelector("#ItemPrice").innerHTML = `£${(Math.round(newValue * 100) / 100).toFixed(2)}`;
            break;
        }
    }

    /**
     * @returns {HTMLTemplateElement}
     */
    createTemplate()
    {
        const template = document.createElement("template");
        template.innerHTML = `
            <style>
                #ItemPrice{
                    align-self: flex-end;
                    font-weight:bold;
                }
                #ItemImage
                {
                    width:100px;
                    height:100px;
                }
                .item-container{
                    display:flex;
                    flex-direction:row;
                    border-bottom: 1px solid black;
                    padding: 1rem;
                }

                .item-image-container{
                    flex:0.25;
                }

                .item-text-container{
                    flex:1;
                    display:flex;
                    flex-direction:column;
                }
            </style>
            <div class="item-container">
                <div class="item-image-container">
                    <img id='ItemImage' src="" alt="Item Image"/>
                </div>
                <div class="item-text-container">
                    <h3 id='ItemTitle'></h3>
                    <p id='ItemDescription'></p>
                    <span id='ItemPrice'></span>
                </div>
                
            </div>
        `;

        return template;
    }
}

window.customElements.define("item-card", ItemCard);