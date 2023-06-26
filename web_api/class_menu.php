<?php
include_once("../../interface/class_user_in_group.php");
include_once("../../class_roles_title.php");

class Menu
{

    public function getParrentMenu()
    {
        $parrentMenu[] = ["id" => "1", "parrentId" => null, "title" => "management", "url" => "#"];
        $parrentMenu[] = ["id" => "2", "parrentId" => null, "title" => "baseInformation", "url" => "#"];
        return $parrentMenu;
    }
    public function addMenu($listMenu, $newMenu)
    {
        if (is_null($newMenu["parrentId"])) {
            $listMenu[] = $newMenu;
        } else {
            foreach ($listMenu as $value) {
                if ($value["id"] == $newMenu["parrentId"])
                    $listMenu[] = $newMenu;
                else {
                    foreach (self::getParrentMenu() as $value) {
                        if ($value["id"] == $newMenu["parrentId"]) {
                            $listMenu[] = self::addMenu($listMenu, $value);
                            $listMenu[] = $newMenu;

                        }

                    }
                }

            }

        }
        return $listMenu;

    }
    public function getMenu($param)
    {
        $classUsersInGroup = new UserInGroup("selectWithRole",$param);
        $jsonData=$classUsersInGroup->getJsonData();
        $menuArray=null;
        foreach($jsonData as $jsonRes)
        {
         switch($jsonRes["title"])
         {
            case RolesTitle::role_permissionLevelManagement:
                $newMenu=["id"=>101, "parrentId" => 1, "title" => "menu_permission_level_management", "url" => "/admin/permission-level-management.html"];
                $menuArray[]=self::addMenu($menuArray,$newMenu);
                break;
         }
        
        }
        return  $menuArray;
    }

}

?>