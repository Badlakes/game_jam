
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	
	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime)
{
	// Code to run every tick
}



class StoryManager {

    constructor() {
        this.path = "";
        this.node = "intro";
        this.ending = -1;
    }

    setPath(path) {
        this.path = path;
    }

    getPath() {
        return this.path;
    }

    getNode() {
        return this.node;
    }

    setNode(node) {
        this.node = node;
    }

    setEnding(id) {
        this.ending = id;
    }

    getEnding() {
        return this.ending;
    }

}


globalThis.story = new StoryManager();


runOnStartup(async runtime =>
{
    globalThis.typewriter = new Typewriter(runtime);
});

class Typewriter {
    constructor(runtime) {
        this.runtime = runtime;
        this.text = "";
        this.index = 0;
        this.speed = 30;
    }
    start(text) {
        this.text = text;
        this.index = 0;
    }
    tick() {
        if (this.index < this.text.length) this.index++;
        return this.text.substring(0, this.index);
    }
}



class DialogueManager {
    constructor() {
        this.fullText = "";
        this.currentText = "";
        this.index = 0;
        this.speed = 1; // letras por update
        this.finished = true;
    }

    start(text) {
        this.fullText = text;
        this.currentText = "";
        this.index = 0;
        this.finished = false;
    }

    update() {
        if (this.finished)
            return this.currentText;

        this.index += this.speed;

        if (this.index >= this.fullText.length) {
            this.index = this.fullText.length;
            this.finished = true;
        }

        this.currentText = this.fullText.substring(0, this.index);
        return this.currentText;
    }

    skip() {
        this.index = this.fullText.length;
        this.currentText = this.fullText;
        this.finished = true;
    }

    isFinished() {
        return this.finished;
    }
}

globalThis.dialogue = new DialogueManager();