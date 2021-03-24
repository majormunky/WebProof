let app;

class WebProofToolbox {
    constructor() {
        this.canvas = null;
        this.setup_toolbox();
        this.setup_handlers();
    }

    setup_toolbox() {
        let wrapper = document.createElement("div");
        wrapper.id = "toolbox-wrapper";

        let opener = document.createElement("div");
        opener.id = "toolbox-opener";

        let toolbox = document.createElement("div");
        toolbox.id = "toolbox";

        let add_note_button = document.createElement("button");
        add_note_button.id = "add-note-button";
        add_note_button.innerHTML = "Add Note";

        toolbox.appendChild(add_note_button)

        wrapper.appendChild(opener);
        wrapper.appendChild(toolbox);

        document.body.appendChild(wrapper);
    }

    setup_canvas() {
        let canvas_wrapper = document.createElement("div");
        canvas_wrapper.id = "canvas-wrapper";

        let new_canvas_ele = document.createElement("canvas");
        new_canvas_ele.zIndex = 1000;

        canvas_wrapper.appendChild(new_canvas_ele);

        document.body.appendChild(canvas_wrapper);

        this.canvas = new fabric.Canvas(new_canvas_ele);

        let window_size = this.get_window_size();
        
        this.canvas.setWidth(window_size.width);
        this.canvas.setHeight(window_size.height);
    }

    get_window_size() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    setup_handlers() {
        document.getElementById("add-note-button")?.addEventListener("click", (event) => {
            this.setup_canvas();
            let r = new fabric.Rect({
                left: 10,
                top: 10,
                width: 100,
                height: 40, 
                fill: 'rgba(255,255,0,0.5)',
            });
            this.canvas.add(r);
        });

        document.getElementById("toolbox-opener")?.addEventListener("click", (event) => {
            if ((event.target.classList.length == 0) || (event.target.classList.contains("opener_hide"))) {
                document.getElementById("toolbox").classList.remove("toolbox_hide");
                document.getElementById("toolbox-opener").classList.remove("opener_hide");

                document.getElementById("toolbox").classList.add("toolbox_show");
                document.getElementById("toolbox-opener").classList.add("opener_show");
            } else {
                document.getElementById("toolbox").classList.add("toolbox_show");
                document.getElementById("toolbox-opener").classList.add("opener_show");

                document.getElementById("toolbox").classList.add("toolbox_hide");
                document.getElementById("toolbox-opener").classList.add("opener_hide");    
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    app = new WebProofToolbox();
});
