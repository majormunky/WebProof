let app;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

class WebProofToolbox {
    constructor() {
        this.canvas = null;
        this.notes = {};
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
		
		let note_textbox_div = document.createElement("div");
		note_textbox_div.id = "note-textbox-wrapper";
		note_textbox_div.style.display = "none";
		note_textbox_div.style.zIndex = "10000";
		
		let note_textbox = document.createElement("textarea");
        note_textbox.id = "note-textbox";
		note_textbox.rows = 4;
		note_textbox.cols = 20;
		note_textbox.style.zIndex = "10000";
		
		let note_save_button = document.createElement("button");
		note_save_button.id = "note-save-button";
		note_save_button.innerHTML = "Save Note";
		note_save_button.style.zIndex = "10000";
		
		note_textbox_div.appendChild(note_textbox);
		note_textbox_div.appendChild(note_save_button);

        let note_table = document.createElement("table");
        note_table.id = "note-toolbox-table";
        note_table.style.display = "none";

        let note_body = document.createElement("tbody");
        note_table.appendChild(note_body);

        toolbox.appendChild(add_note_button);
		toolbox.appendChild(note_textbox_div);
        toolbox.appendChild(note_table);

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
            this.canvas.setActiveObject(r);
            this.canvas.requestRenderAll();
            document.getElementById("note-textbox-wrapper").style.display = "block";
            document.getElementById("add-note-button").disabled = true;
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

        document.getElementById("toolbox").addEventListener("click", (event) => {
            if (event.target.matches("#note-save-button")) {
                let note_content = document.getElementById("note-textbox").value;
                let note_rect_info = app.canvas.getActiveObject().toObject();
                let note = {
                    content: note_content,
                    rect: note_rect_info,
                    id: uuidv4()
                };
                this.notes[note.id] = note;
                this.render_note_table();
                this.canvas.discardActiveObject();
                this.canvas.requestRenderAll();
                document.getElementById("add-note-button").disabled = false;
                document.getElementById("note-textbox-wrapper").style.display = "none";
                document.getElementById("note-save-button").style.display = "none";
            }
        });
    }

    render_note_table() {
        let table = document.getElementById("note-toolbox-table");
        let table_body = table.querySelector("tbody");
        let rows = "";
        let note;
        for (var key in this.notes) {
            note = this.notes[key]
            rows += "<tr>";
            rows += `<td><button>View</button></td>`;
            rows += `<td>${note.content}</td>`;
            rows += "</tr>";
        }
        table_body.innerHTML = rows;
        table.style.display = "table";
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    app = new WebProofToolbox();
});
