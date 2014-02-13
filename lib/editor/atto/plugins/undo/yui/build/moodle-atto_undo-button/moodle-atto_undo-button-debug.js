YUI.add('moodle-atto_undo-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Atto text editor undo plugin.
 *
 * @package    editor-undo
 * @copyright  2014 Jerome Mouneyrac
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
M.atto_undo = M.atto_undo || {
    init : function(params) {

        var click = function(e, elementid, cmd) {
            e.preventDefault();
            if (!M.editor_atto.is_active(elementid)) {
                M.editor_atto.focus(elementid);
            }
            document.execCommand(cmd, false, null);
            // Clean the YUI ids from the HTML.
            M.editor_atto.text_updated(elementid);
        };

        var undoclick = function(e, elementid) {
            click(e, elementid, 'undo');
        };

        var redoclick = function(e, elementid) {
            click(e, elementid, 'redo');
        };

        /**
         * Test if the broswer supports document.execCommand('undo', false); .
         * @returns {boolean}
         */
        var browsersupportsundo = function() {

            // Check now if other browser supports it.
            // Save the focussed element.
            var activeelement = document.activeElement;

            // Creating a temp div to test if the browser support the undo execCommand.
            var undosupport = false;
            var foo = Y.Node.create('<div id="attoundotesting" contenteditable="true"' +
                'style="position: fixed; top: 0px; height:0px">a</div>');
            Y.one('body').prepend(foo);
            foo.focus();

            try {
                document.execCommand('insertText', false, 'b');
                if (foo.getHTML() === 'ba') {
                    document.execCommand('undo', false);
                    if (foo.getHTML() === 'a') {
                        document.execCommand('redo', false);
                        if (foo.getHTML() === 'ba') {
                            undosupport = true;
                        }
                    }
                }
            } catch (undosupportexception) {
                // IE9 gives us an invalid parameter error on document.execCommand('insertText'...).
                // The try/catch catches when the execCommands fail.
                return false;
            }

            // Remove the tmp contenteditable and reset the focussed element.
            Y.one('body').removeChild(foo);
            activeelement.focus();

            return undosupport;
        };

        // Retrieve undobrowsersupport global variable.
        var undobrowsersupport = Y.namespace("M.atto_undo.browsersupport");
        if (typeof undobrowsersupport.value === "undefined") {
            undobrowsersupport.value = browsersupportsundo();
        }

        // Add the undo/redo buttons.
        if (undobrowsersupport.value) {
            // Undo button.
            var iconurl = M.util.image_url('e/undo', 'core');
            M.editor_atto.add_toolbar_button(params.elementid, 'undo', iconurl, params.group, undoclick, M.util.get_string('undo', 'atto_undo'));

            // Redo button.
            iconurl = M.util.image_url('e/redo', 'core');
            M.editor_atto.add_toolbar_button(params.elementid, 'redo', iconurl, params.group, redoclick, M.util.get_string('redo', 'atto_undo'));
        }
    }
};

}, '@VERSION@', {"requires": ["node"]});
