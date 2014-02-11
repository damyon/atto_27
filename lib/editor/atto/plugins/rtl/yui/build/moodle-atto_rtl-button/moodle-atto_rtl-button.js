YUI.add('moodle-atto_rtl-button', function (Y, NAME) {

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
 * Atto text editor rtl plugin.
 *
 * @package    editor-atto
 * @copyright  2014 Jerome Mouneyrac
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
M.atto_rtl = M.atto_rtl || {
    init : function(params) {
        var click = function(e, elementid, direction) {
            e.preventDefault();
            if (!M.editor_atto.is_active(elementid)) {
                M.editor_atto.focus(elementid);
            }

            // Find opposite direction.
            var oppositedirection = 'rtl';
            if (direction === 'rtl') {
                oppositedirection = 'ltr';
            }

            M.atto_rtl.selection = M.editor_atto.get_selection();
            if (M.atto_rtl.selection !== false) {

                // Format the selection to be sure it has a tag parent (not the contenteditable).
                var parentnode = M.editor_atto.format_selection_block(elementid);
                parentnodeelement = parentnode.getDOMNode();

                var currentdirection = parentnode.getStyle("direction");
                if (currentdirection === direction) {
                    Y.DOM.removeClass(parentnodeelement, "editor_atto_" + direction);
                } else {
                    Y.DOM.addClass(parentnodeelement, "editor_atto_" + direction);
                    Y.DOM.removeClass(parentnodeelement, "editor_atto_" + oppositedirection);
                }
            }

            // Clean the YUI ids from the HTML.
            M.editor_atto.text_updated(elementid);
        };

        var rtlclick = function(e, elementid) {
            click(e, elementid, 'rtl');
        };

        var ltrclick = function(e, elementid) {
            click(e, elementid, 'ltr');
        };

        var iconurl = M.util.image_url('e/left_to_right', 'core');
        M.editor_atto.add_toolbar_button(params.elementid, 'ltr', iconurl, params.group, ltrclick, M.util.get_string('ltr', 'atto_rtl'));

        iconurl = M.util.image_url('e/right_to_left', 'core');
        M.editor_atto.add_toolbar_button(params.elementid, 'rtl', iconurl, params.group, rtlclick, M.util.get_string('rtl', 'atto_rtl'));
    }
};


}, '@VERSION@', {"requires": ["node"]});
