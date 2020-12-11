class AuthForm  extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(this.createTemplate().content.cloneNode(true));
        this.shadowRoot.querySelector("#BtnSignIn").addEventListener("click", this.OnSignInSubmit.bind(this));
    }

    OnSignInSubmit() 
    {
        const email = this.shadowRoot.querySelector("#email").value;
        const pass = this.shadowRoot.querySelector("#password").value;

        if(!email || !pass){
            alert("Invalid credentials!");
            return;
        }

        $("#AuthModal").modal("hide");

        setCookie("auth", btoa("username=" + email), 2);

        location.reload();
    };

    /**
     * @returns {HTMLTemplateElement}
     */
    createTemplate(){
        const template = document.createElement("template");

        template.innerHTML = `
            <style>
                @import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            </style>
            <form>
                <div class="form-group">
                <label for='email'>Email address</label>
                <input type="email" class="form-control" id="email">
                </div>
                <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password">
                </div>
                <button id='BtnSignIn' type="button" class="btn btn-primary" style="float: right;">Sign In</button>
            </form>
        `;

        return template;
    }
}

customElements.define("auth-form", AuthForm);