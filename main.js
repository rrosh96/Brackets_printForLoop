/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        Menus          = brackets.getModule("command/Menus");

    
    //
    // Create colOffset to indent the for Loop properly.
    //
    function createOffset (colOffset) {
        var offset = "";
        for(var i = 0; i < colOffset; i++) {
            offset = offset.concat(" ");
        }
        return offset;
    }
    
    // Function to run when the menu item is clicked
    function dropForLoop() {
        var editor = EditorManager.getFocusedEditor();
        if(editor){
            var insertionPos  = editor.getCursorPos();
            var forLoopString = "for(var i = 0; i < 'Limit'; i++) {\n\n";
            var offset = createOffset(insertionPos.ch);
            
            forLoopString = forLoopString +  offset + "}";
            editor.document.replaceRange(forLoopString, insertionPos);
        } else {
            window.alert("Editor not available");
        }
    }


    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "helloworld.sayhello";   // package-style naming to avoid collisions
    CommandManager.register("Drop For Loop", MY_COMMAND_ID, dropForLoop);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
//    menu.addMenuItem(MY_COMMAND_ID);
    
    // We could also add a key binding at the same time:
    menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-F");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
});

