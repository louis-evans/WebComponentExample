class NavAccount extends HTMLElement
{
    constructor()
    {
        super();

        this.attachShadow({mode: "open"});

        const template= this.createTemplate();

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const authCookie = window.getCookie("auth");

        if(authCookie)
        {
            const btn = this.shadowRoot.querySelector("#BtnSignOut");

            btn.style.display = 'block';
            btn.addEventListener("click", this.OnSignOut);

            const userName = atob(authCookie).split("=")[1];            

            btn.innerText = `Hello ${userName}!`

            this.shadowRoot.querySelector("#BtnSignIn").remove();
        }
        else
        {
            this.shadowRoot.querySelector("#BtnSignIn").style.display = 'block';
            this.shadowRoot.querySelector("#BtnSignIn").addEventListener("click", this.OnSignIn);    

            this.shadowRoot.querySelector("#BtnSignOut").remove();
        }
    }

    OnSignIn()
    {
        $("#AuthModal").modal();
    }

    OnSignOut()
    {
        setCookie("auth", "", -1);
        location.reload();
    }
    
    /**
     * @returns {HTMLTemplateElement}
     */
    createTemplate()
    {
        const template = document.createElement("template");

        template.innerHTML = `
            <style>
                @import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            </style>
            <button id='BtnSignIn' style='display:none;'class='btn btn-link text-white'>Sign In</button>
            <button id='BtnSignOut' style='display:none;'class='btn btn-link text-white'></button>
        `;

        return template;
    }
}

window.customElements.define("nav-account", NavAccount);