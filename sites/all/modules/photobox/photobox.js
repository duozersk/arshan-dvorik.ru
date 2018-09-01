/*global Drupal: false, jQuery: false */
/*jslint devel: true, browser: true, maxerr: 50, indent: 2 */
(function ($) {
  "use strict";

  Drupal.behaviors.photobox = {};
  Drupal.behaviors.photobox.attach = function(context, settings) {
    $('a.photobox', context).parent().photobox('a.photobox');
  };

})(jQuery);
