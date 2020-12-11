class LoadingSpinner extends HTMLElement{

    constructor(){
        super();

        this.innerHTML = "Loading..."
    }
}

window.customElements.define("loading-spinner", LoadingSpinner);