<?php
include_once("../../interface/class_user_in_group.php");
include_once("../../class_roles_title.php");

class Menu
{
    public function getParentMenu()
    {
        $parentMenu[] = ["id" => 1, "parentId" => null, "title" => "menu_management", "url" => "#"];
        $parentMenu[] = ["id" => 2, "parentId" => null, "title" => "menu_media", "url" => "#"];
        return $parentMenu;
    }
    public function addMenu($listMenu, $newMenu)
    {
        if (is_null($newMenu["parentId"])) {
            $listMenu[] = $newMenu;
        } else {
            $existedParentMenu = $index = null;
            $index = array_search($newMenu["parentId"], array_column($listMenu, 'id'));

            array_key_exists($index, $listMenu) && $newMenu["parentId"] == $listMenu[$index]["id"] ? $existedParentMenu = $listMenu[$index] : $existedParentMenu = null;

            if (is_null($existedParentMenu)) {
                $index = array_search($newMenu["parentId"], array_column(self::getParentMenu(), 'id'));
                $listMenu = self::addMenu($listMenu, self::getParentMenu()[$index]);
                $listMenu[] = $newMenu;
            } else
                $listMenu[] = $newMenu;
        }
        return $listMenu;

    }
    public function getMenu($param)
    {
        $classUsersInGroup = new UserInGroup("selectWithRole", $param);
        $jsonData = $classUsersInGroup->getJsonData();
        $menuArray = [];
        // $keys = array_keys(array_column($userdb, 'uid'), 40489); if mutiple value is in array userdb

        $indexPLM = array_search(RolesTitle::role_permissionLevelManagement, array_column($jsonData, 'title')); //Permission Level Management
        $indexCUM = array_search(RolesTitle::role_contactUs, array_column($jsonData, 'title')); //Contact Us Management
        $indexPM = array_search(RolesTitle::role_postManagement, array_column($jsonData, 'title')); //Post Management
        $indexMM = array_search(RolesTitle::role_mediaManagement, array_column($jsonData, 'title')); //Media Management

        if (array_key_exists($indexPLM, $jsonData)) {
            $newMenu = ["id" => 101, "parentId" => 1, "title" => "menu_permission_level_management", "url" => "/admin/permission_level_management.html"];
            $menuArray = self::addMenu($menuArray, $newMenu);
        }
        if (array_key_exists($indexCUM, $jsonData)) {
            $newMenu = ["id" => 102, "parentId" => 1, "title" => "menu_contact_us", "url" => "/admin/contact_us.html"];
            $menuArray = self::addMenu($menuArray, $newMenu);
        }
        if (array_key_exists($indexPM, $jsonData)) {
            $newMenu = ["id" => 103, "parentId" => 1, "title" => "menu_post_management", "url" => "/admin/post.html"];
            $menuArray = self::addMenu($menuArray, $newMenu);
        }
        if (array_key_exists($indexMM, $jsonData)) {
            $newMenu = ["id" => 201, "parentId" => 2, "title" => "menu_media_management", "url" => "/admin/media_management.html"];
            $menuArray = self::addMenu($menuArray, $newMenu);
        }

        return $menuArray;
    }
}
//$existedParentMenu=null;
// foreach ($listMenu as $value) {
//     if ($value["id"] == $newMenu["parentId"]) {
//         $existedParentMenu = $value;
//         break;
//     }
// }

// foreach (self::getParentMenu() as $value) {
//     if ($value["id"] == $newMenu["parentId"]) {
//         $listMenu = self::addMenu($listMenu, $value);
//         $listMenu[] = $newMenu;
//         break;
//     }
// }
// foreach ($jsonData as $jsonRes) {
//     switch ($jsonRes["title"]) {
//         case RolesTitle::role_permissionLevelManagement:
//             $newMenu = ["id" => 101, "parentId" => 1, "title" => "menu_permission_level_management", "url" => "/admin/permission-level-management.html"];
//             $menuArray = self::addMenu($menuArray, $newMenu);
//             break;
//     }

// }


?>