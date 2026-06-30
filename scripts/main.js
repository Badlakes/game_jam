runOnStartup(async runtime => {
    globalThis.story = new StoryManager(runtime);
    globalThis.dialogue = new DialogueManager();
    
    runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime) {
    runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime) {
    const dialogText = runtime.objects.DialogText.getFirstInstance();
    if (dialogText) {
        dialogText.text = dialogue.update();
    }
}

class StoryManager {
    constructor(runtime) {
        this.runtime = runtime;
        this.path = "";
        this.nextNode = "intro";
        this.ending = -1;
    }
    runCurrentStory() {
    const flow = this.runtime.objects.Flow.getFirstInstance();
    flow.startFlowchartByName("StoryNode", this.nextNode, "", true);
    
        // Pequeno delay pra garantir que o nó já carregou
        setTimeout(() => {
            const text = flow.getOutputValue("dialogue");
            if (text) dialogue.start(text);
        }, 0);
    }
    goto(node) { this.nextNode = node; }
    setPath(path) { this.path = path; }
    getPath() { return this.path; }
}

class DialogueManager {
    constructor() {
        this.fullText = "";
        this.currentText = "";
        this.index = 0;
        this.speed = 1;
        this.finished = true;
    }
    start(text) {
        this.fullText = text;
        this.currentText = "";
        this.index = 0;
        this.finished = false;
    }
    update() {
        if (this.finished) return this.currentText;
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
    isFinished() { return this.finished; }
}

