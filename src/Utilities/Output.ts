class Output {
    private mainBody: HTMLDivElement;
    constructor() {
        this.mainBody = document.querySelector("#main");
    }
    outputToDocument(item: HTMLDivElement): void {
        this.mainBody.appendChild(item);
    }
}