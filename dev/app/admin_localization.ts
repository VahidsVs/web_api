export function getLangResources(){
    // Define arrays how many language you want to translate
    var fa: any = new Array();
    var en: any = new Array();
    // caption tag name <<fa>>
    fa['hello_world'] = "سلام جهان";

    fa['direction'] = "rtl",

    fa['project_name'] = "نام پروژه";
    
    fa['copyright'] = "کلیه حقوق مادی و معنوی این سایت محفوظ می باشد.";

    fa['nav_link_home'] = "صفحه اصلی";
    fa['nav_link_login'] = "ورود";
    fa['nav_link_register'] = "ثبت نام";
    fa['nav_link_logout'] = "خروج";
    fa['nav_link_admin_dashboard'] = "داشبورد مدیریت";

    fa['/admin/index.html'] = "داشبورد";
    fa['/admin/permission-level-management.html'] = "مدیریت سطوح دسترسی";

    fa['tab_title_groups'] = "گروه ها";
    fa['tab_title_details'] = "جزئیات";
    fa['tab_title_grouproles'] = "دسترسی های گروه";
    fa['tab_title_groupusers'] = "اعضای گروه";
    fa['tab_title_allusers'] = "کل اعضا";

    fa['label_yes'] = "بله";
    fa['label_no'] = "خیر";
    fa['label_title'] = "عنوان";
    fa['label_username'] = "نام کاربری";
    fa['label_firstname'] = "نام";
    fa['label_lastname'] = "نام خانوادگی";
    fa['label_mobile'] = "شماره موبایل";
    fa['label_grouptitle'] = "عنوان گروه";

    fa['btn_submit'] = "ثبت";
    fa['btn_cancel'] = "انصراف";
    fa['btn_new'] = "جدید";
    fa['btn_edit'] = "ویرایش";
    fa['btn_delete'] = "حذف";
    fa['btn_select'] = "انتخاب";

    fa['window_title_selectuser'] = "انتخاب کاربر";

    fa['msg_are_you_sure'] = "آیا مطمئن هستید؟";

    fa['msgIsRequired'] = "اجباری است";
    fa['msgLessThan8Chars'] = "حداقل 8 کاراکتر باشد";
    fa['msgInvalidUsernameOrPassword'] = "نام کاربری یا کلمه عبور اشتباه است";
    fa['msgPassAndPassConfirmNotSame'] = "کلمه عبور و تایید آن یکی نیست";
    fa['msgUsernameExists'] = "نام کاربری تکراری است";
    fa['msgTitleExists'] = "عنوان تکراری است";
    fa['msgSuccessfulCUD'] = "عملیات با موفقیت انجام شد";
    fa['msgUserExistsInGroup'] = "کاربر انتخابی در گروه دیگری می باشد";
    fa['msgConstraintGroupRole'] = "گروه مورد نظر کاربر یا دسترسی دارد";
    
    //roles
    fa['permission_level_management'] = "مدیریت سطوح دسترسی";
    fa['slideshow_management'] = "مدیریت اسلایدشو";
    fa['advertisement_management'] = "مدیریت تبلیغات";

    // caption tag name <<en>>
    en['hello_world'] = "Hello World";

    en['direction'] = "ltr",

    en['project_name'] = "Project Name";
    
    en['copyright'] = "All rights reserved.";

    en['nav_link_home'] = "Home";
    en['nav_link_login'] = "Login";
    en['nav_link_register'] = "Register";
    en['nav_link_logout'] = "Sign out";
    en['nav_link_admin_dashboard'] = "Admin dashboard";

    en['/admin/index.html'] = "Dashboard";
    en['/admin/permission-level-management.html'] = "Permission Level Management";

    en['tab_title_groups'] = "Groups";
    en['tab_title_details'] = "Details";
    en['tab_title_grouproles'] = "Group Roles";
    en['tab_title_groupusers'] = "Group Users";
    en['tab_title_allusers'] = "All Users";

    en['label_yes'] = "Yes";
    en['label_no'] = "No";
    en['label_title'] = "Title";
    en['label_username'] = "Username";
    en['label_firstname'] = "First Name";
    en['label_lastname'] = "Last Name";
    en['label_mobile'] = "Mobile";
    en['label_grouptitle'] = "Group Title";

    en['btn_submit'] = "Submit";
    en['btn_cancel'] = "Cancel";
    en['btn_new'] = "New";
    en['btn_edit'] = "Edit";
    en['btn_delete'] = "Delete";
    en['btn_select'] = "Select";

    en['window_title_selectuser'] = "Select user";

    en['msg_are_you_sure'] = "Are you sure?";

    en['msgIsRequired'] = "Required";
    en['msgLessThan8Chars'] = "Minimum 8 characters";
    en['msgInvalidUsernameOrPassword'] = "Username of Password is invalid";
    en['msgPassAndPassConfirmNotSame'] = "Password and Repeat Password is not match";
    en['msgUsernameExists'] = "Username is duplicated";
    en['msgTitleExists'] = "Title is duplicated";
    en['msgSuccessfulCUD'] = "Successfully submited";
    en['msgUserExistsInGroup'] = "User exists in another group";
    en['msgConstraintGroupRole'] = "Group has permission level or user";
    
    //roles
    en['permission_level_management'] = "Permission Level Management";
    en['slideshow_management'] = "Slideshow Management";
    en['advertisement_management'] = "Advertisement Management";
    
    // Added new array defined arrays.
    var resources: any = new Array();
    resources['fa'] = fa;
    resources['en'] = en;
    
    return resources;
}