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
 * Selectors.
 *
 * @type {Object}
 */
var SELECTORS = {
    BUTTON : '.atto_subscript_button',
    TAGS : 'sub'
};

/**
 * Atto text editor subscript plugin.
 *
 * @package    editor-atto
 * @copyright  2014 Rossiani Wijaya <rwijaya@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
M.atto_subscript = M.atto_subscript || {
    init : function(params) {
        var click = function(e, elementid) {
            e.preventDefault();
            if (!M.editor_atto.is_active(elementid)) {
                M.editor_atto.focus(elementid);
            }
            document.execCommand('subscript', false, null);
            // Clean the YUI ids from the HTML.
            M.editor_atto.text_updated(elementid);
        };

        var iconurl = M.util.image_url('e/subscript', 'core');
        M.editor_atto.add_toolbar_button(params.elementid, 'subscript', iconurl, params.group, click);

        // Attach an event listner to watch for "changes" in the contenteditable.
        // This includes cursor changes, we check if the button should be active or not, based
        // on the text selection.
        var editable = M.editor_atto.get_editable_node(params.elementid);
        editable.on('atto:selectionchanged', function(e) {
            var toolbar = M.editor_atto.get_toolbar_node(e.elementid);
            var button = toolbar.one(SELECTORS.BUTTON);
            if (M.editor_atto.selection_filter_matches(e.elementid, SELECTORS.TAGS, e.selectedNodes)) {
                button.addClass('active');
            } else {
                button.removeClass('active');
            }
        });
    }
};
