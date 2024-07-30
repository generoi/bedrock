<?php

/*
Plugin Name:  Disable weak password
Plugin URI:   https://genero.fi
Description:  Removes the checkbox to confirm the use of a weak password
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

add_action('admin_enqueue_scripts', function ($hook) {
    if ($hook == 'user-edit.php' or $hook == 'user-new.php' or $hook == 'profile.php' or $hook == 'wp-login?action=rp') {
        echo '
            <script>
                window.addEventListener("load", function () {
                  var newUser = document.getElementById("createuser");
                  var editCurrentUser = document.getElementById("your-profile");

                  if (newUser || editCurrentUser) {
                    document.querySelector(".pw-weak").remove();
                  }
                });
            </script>
        ';
    }
});
