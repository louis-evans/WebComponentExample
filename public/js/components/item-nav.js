class ItemNav extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode : "open"});

        this.shadowRoot.appendChild(this.createTemplate().content.cloneNode(true));

        const loadBtn = this.shadowRoot.querySelector("#BtnLoadItems");

        const authCookie = window.getCookie("auth");

        if(authCookie)
        {
            loadBtn.classList.remove("disabled");

            loadBtn.addEventListener("click", async () => 
            {
                const container = window.document.getElementById("ItemContainer");
                container.innerHTML = "";
    
                const rows = await this.loadProducts()
                
                rows.forEach(row => container.appendChild(row));
            });
        }
        else
        {
            loadBtn.addEventListener("click", () => alert("Please sign in to view products!"));
        }
    }

    /**
     * @returns {Promise<Array<HTMLElement>>}
     */
    loadProducts()
    {
        const loading = document.getElementsByTagName("loading-spinner")[0];
        loading.style.display = "block";
    
        return new Promise((resolve, reject) => 
        {
            setTimeout(() => 
            {
                const items = [
                    { "title": "12 Organic Eggs", "desc": "Dozen large organic free range eggs", "img": "/img/eggs.jpg", "price": 1.20 },
                    { "title": "Red Cabbage", "desc": "1 large red cabbage (500g)", "img": "/img/redcabbage.jpg", "price": 0.85 },
                    { "title": "Orange Juice", "desc": "1L from concentrate", "img": "/img/orange.jpg", "price": 1.15 },
                ]
                .map((item) => 
                {
                    const itemEl = document.createElement("item-card");
                    itemEl.setAttribute("title", item.title);
                    itemEl.setAttribute("description", item.desc);
                    itemEl.setAttribute("image", item.img);
                    itemEl.setAttribute("price", item.price);
                    return itemEl;
                });
        
                loading.style.display = "none";
    
                resolve(items);
        
            }, Math.random() * 1000);
        })
    };

    /**
     * @return {HTMLTemplateElement}
     */
    createTemplate(){
        const template = document.createElement("template");

        template.innerHTML = `
            <style>
                @import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            </style>
            <button id='BtnLoadItems' class='btn btn-primary mt-4 disabled'>Load Products</button>        
        `;

        return template;
    }
}

customElements.define("item-nav", ItemNav);
