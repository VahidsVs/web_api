<?php
include_once("../../interface/class_user_in_group.php");
include_once("../../class_roles_title.php");

class Menu
{

    public function getParentMenu()
    {
        $parentMenu[] = ["id" => 1, "parentId" => null, "title" => "management", "url" => "#"];
        $parentMenu[] = ["id" => 2, "parentId" => null, "title" => "baseInformation", "url" => "#"];
        return $parentMenu;
    }
    public function addMenu($listMenu, $newMenu)
    {
        if (is_null($newMenu["parentId"])) {
            $listMenu[] = $newMenu;
        } else {
            $existedParentMenu = null;
            $key = array_search($newMenu["parentId"], array_column($listMenu, 'id'));
            print_r($key);
            $key ? $existedParentMenu = $listMenu[$key] : null;
            

            // foreach ($listMenu as $value) {
            //     if ($value["id"] == $newMenu["parentId"]) {
            //         $existedParentMenu = $value;
            //         break;
            //     }
            // }
            if (is_null($existedParentMenu)) {
                $key = array_search($newMenu["parentId"], array_column(self::getParentMenu(), 'id'));
                 if($key)
                 {
                    $listMenu = self::addMenu($listMenu, self::getParentMenu()[$key] );
                    $listMenu[] = $newMenu;
                 }

                // foreach (self::getParentMenu() as $value) {
                //     if ($value["id"] == $newMenu["parentId"]) {
                //         $listMenu = self::addMenu($listMenu, $value);
                //         $listMenu[] = $newMenu;
                //         break;
                //     }
                // }
            } else {
                $listMenu[] = $newMenu;
            }
        }
        return $listMenu;

    }
    public function getMenu($param)
    {
        $classUsersInGroup = new UserInGroup("selectWithRole", $param);
        $jsonData = $classUsersInGroup->getJsonData();
        $menuArray = [];
        foreach ($jsonData as $jsonRes) {
            switch ($jsonRes["title"]) {
                case RolesTitle::role_permissionLevelManagement:
                    $newMenu = ["id" => 101, "parentId" => 1, "title" => "menu_permission_level_management", "url" => "/admin/permission-level-management.html"];
                    $menuArray = self::addMenu($menuArray, $newMenu);
                    break;
            }

        }
        return $menuArray;
    }

}

?>