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
            document.execCommand(cmd, false);
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
            // Save the focussed element.
            var activeelement = document.activeElement;

            // Creating a temp div to test if the browser support the undo execCommand.
            var undosupport = false;
            var foo = Y.Node.create('<div id="attoundotesting" contenteditable="true" style="height:1px">a</div>');
            Y.one('body').prepend(foo);
            foo.focus();
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

            // Remove the tmp contenteditable and reset the focussed element.
            Y.one('body').removeChild(foo);
            activeelement.focus();

            return undosupport;
        };

        // Add the undo/redo buttons.
        if (browsersupportsundo()) {
            // Undo button.
            var iconurl = M.util.image_url('e/undo', 'core');
            M.editor_atto.add_toolbar_button(params.elementid, 'undo', iconurl, params.group, undoclick);

            // Redo button.
            iconurl = M.util.image_url('e/redo', 'core');
            M.editor_atto.add_toolbar_button(params.elementid, 'redo', iconurl, params.group, redoclick);
        }
    }
};
