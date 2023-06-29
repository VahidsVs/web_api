<?php
include_once("../../interface/class_user_in_group.php");
include_once("../../class_roles_title.php");

class Menu
{

    public function getParentMenu()
    {
        $parentMenu[] = ["id" => 1, "parentId" => null, "title" => "menu_management", "url" => "#"];
        $parentMenu[] = ["id" => 2, "parentId" => null, "title" => "menu_baseInformation", "url" => "#"];
        return $parentMenu;
    }
    public function addMenu($listMenu, $newMenu)
    {
        if (is_null($newMenu["parentId"])) {
            $listMenu[] = $newMenu;
        } else {
            $existedParentMenu = $key =null;
            $key = array_search($newMenu["parentId"], array_column($listMenu, 'id'));
            !empty($key) ? $existedParentMenu = $listMenu[$key] : null;
            if (is_null($existedParentMenu)) {
                $key = array_search($newMenu["parentId"], array_column(self::getParentMenu(), 'id'));
                if(!is_null($key)) {
                    $listMenu = self::addMenu($listMenu, self::getParentMenu()[$key]);
                    $listMenu[] = $newMenu;
                }

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

        $keyPLM = array_search(RolesTitle::role_permissionLevelManagement, array_column($jsonData , 'title')); //Permission Level Management
        $keyCUM = array_search(RolesTitle::role_contactUsManagement, array_column($jsonData , 'title')); //Contact Us Management
        if(!is_null($keyPLM)) {
            $newMenu = ["id" => 101, "parentId" => 1, "title" => "menu_permission_level_management", "url" => "/admin/permission-level-management.html"];
            $menuArray = self::addMenu($menuArray, $newMenu);
        }
        if(!is_null($keyCUM)) {
            $newMenu = ["id" => 102, "parentId" => 1, "title" => "menu_contact_us_management", "url" => "/admin/contact-us-management.html"];
            $menuArray = self::addMenu($menuArray, $newMenu);
        }
     
        return $menuArray;
    }
}

?>