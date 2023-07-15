export function getLangResources(lcid: string){

    let array: any = [];

    switch (lcid) {
        case 'fa':
            array.push({ Key: 'hello_world', Translate: "سلام جهان" });

            array.push({ Key: 'direction', Translate: "rtl" });
            
            array.push({ Key: 'project_name', Translate: "نام پروژه" });
            
            array.push({ Key: 'copyright', Translate: "کلیه حقوق مادی و معنوی این سایت محفوظ می باشد." });
            
            array.push({ Key: 'nav_link_home', Translate: "صفحه اصلی" });
            array.push({ Key: 'nav_link_login', Translate: "ورود" });
            array.push({ Key: 'nav_link_register', Translate: "ثبت نام" });
            array.push({ Key: 'nav_link_logout', Translate: "خروج" });
            array.push({ Key: 'nav_link_admin_dashboard', Translate: "داشبورد مدیریت" });
            array.push({ Key: 'nav_link_profile', Translate: "پروفایل" });
            
            array.push({ Key: 'menu_management', Translate: "مدیریت" });
            array.push({ Key: 'menu_media', Translate: "رسانه" });
            array.push({ Key: 'menu_permission_level_management', Translate: "مدیریت سطوح دسترسی" });
            array.push({ Key: 'menu_contact_us', Translate: "ارتباط با ما" });
            array.push({ Key: 'menu_admin_dashboard', Translate: "داشبورد" });
            array.push({ Key: 'menu_post_management', Translate: "مدیریت پست ها" });
            array.push({ Key: 'menu_media_management', Translate: "مدیریت رسانه" });
            
            array.push({ Key: 'role_contact_us', Translate: "مدیریت ارتباط با ما" });
            array.push({ Key: 'role_permission_level_management', Translate: "مدیریت سطوح دسترسی" });
            array.push({ Key: 'role_slideshow_management', Translate: "مدیریت اسلایدشو" });
            array.push({ Key: 'role_advertisement_management', Translate: "مدیریت تبلیغات" });
            array.push({ Key: 'role_post_management', Translate: "مدیریت پست ها" });
            array.push({ Key: 'role_media_management', Translate: "مدیریت رسانه" });
            
            array.push({ Key: 'tab_title_groups', Translate: "گروه ها" });
            array.push({ Key: 'tab_title_details', Translate: "جزئیات" });
            array.push({ Key: 'tab_title_grouproles', Translate: "دسترسی های گروه" });
            array.push({ Key: 'tab_title_groupusers', Translate: "اعضای گروه" });
            array.push({ Key: 'tab_title_allusers', Translate: "کل اعضا" });
            array.push({ Key: 'tab_title_messages', Translate: "پیام ها" });
            array.push({ Key: 'tab_title_list', Translate: "لیست" });

            array.push({ Key: 'label_contains', Translate: "شامل باشد با" });
            array.push({ Key: 'label_doesnotcontain', Translate: "شامل نباشد با" });
            array.push({ Key: 'label_equal', Translate: "برابر باشد با" });
            array.push({ Key: 'label_notequal', Translate: "برابر نباشد با" });
            array.push({ Key: 'label_greaterthan', Translate: "بزرگتر از" });
            array.push({ Key: 'label_lessthan', Translate: "کوچکتر از" });
            array.push({ Key: 'label_yes', Translate: "بله" });
            array.push({ Key: 'label_no', Translate: "خیر" });
            array.push({ Key: 'label_title', Translate: "عنوان" });
            array.push({ Key: 'label_username', Translate: "نام کاربری" });
            array.push({ Key: 'label_firstname', Translate: "نام" });
            array.push({ Key: 'label_lastname', Translate: "نام خانوادگی" });
            array.push({ Key: 'label_mobile', Translate: "شماره موبایل" });
            array.push({ Key: 'label_grouptitle', Translate: "عنوان گروه" });
            array.push({ Key: 'label_name', Translate: "نام" });
            array.push({ Key: 'label_email', Translate: "ایمیل" });
            array.push({ Key: 'label_subject', Translate: "موضوع" });
            array.push({ Key: 'label_message', Translate: "پیام" });
            array.push({ Key: 'label_slug', Translate: "Slug" });
            array.push({ Key: 'label_category', Translate: "دسته بندی" });
            array.push({ Key: 'label_parent_category', Translate: "نوع دسته بندی" });
            array.push({ Key: 'label_created_at', Translate: "تاریخ ثبت" });
            array.push({ Key: 'label_updated_at', Translate: "تاریخ ویرایش" });
            array.push({ Key: 'label_status', Translate: "وضعیت" });
            array.push({ Key: 'label_summary', Translate: "خلاصه" });
            array.push({ Key: 'label_meta_keyword', Translate: "کلمات کلیدی متا" });
            array.push({ Key: 'label_meta_description', Translate: "توضیحات متا" });
            array.push({ Key: 'label_content', Translate: "محتوا" });
            array.push({ Key: 'label_filename', Translate: "نام فایل" });
            array.push({ Key: 'label_extension', Translate: "پسوند" });
            array.push({ Key: 'label_path', Translate: "مسیر" });
            array.push({ Key: 'label_file', Translate: "فایل" });
            array.push({ Key: 'label_description', Translate: "توضیحات" });
            array.push({ Key: 'label_thumbnail_path', Translate: "مسیر عکس بند انگشتی" });
            array.push({ Key: 'label_size', Translate: "سایز (KB)" });
            
            array.push({ Key: 'btn_submit', Translate: "ثبت" });
            array.push({ Key: 'btn_cancel', Translate: "انصراف" });
            array.push({ Key: 'btn_new', Translate: "جدید" });
            array.push({ Key: 'btn_edit', Translate: "ویرایش" });
            array.push({ Key: 'btn_delete', Translate: "حذف" });
            array.push({ Key: 'btn_select', Translate: "انتخاب" });
            array.push({ Key: 'btn_copy', Translate: "کپی" });
            
            array.push({ Key: 'window_title_selectuser', Translate: "انتخاب کاربر" });
            
            array.push({ Key: 'msg_are_you_sure', Translate: "آیا مطمئن هستید؟" });
            
            array.push({ Key: 'msgIsRequired', Translate: "اجباری است" });
            array.push({ Key: 'msgLessThan8Chars', Translate: "حداقل 8 کاراکتر باشد" });
            array.push({ Key: 'msgInvalidUsernameOrPassword', Translate: "نام کاربری یا کلمه عبور اشتباه است" });
            array.push({ Key: 'msgPassAndPassConfirmNotSame', Translate: "کلمه عبور و تایید آن یکی نیست" });
            array.push({ Key: 'msgUsernameExists', Translate: "نام کاربری تکراری است" });
            array.push({ Key: 'msgTitleExists', Translate: "عنوان تکراری است" });
            array.push({ Key: 'msgSuccessfulCUD', Translate: "عملیات با موفقیت انجام شد" });
            array.push({ Key: 'msgUserExistsInGroup', Translate: "کاربر انتخابی در گروه دیگری می باشد" });
            array.push({ Key: 'msgConstraintGroupRole', Translate: "گروه مورد نظر کاربر یا دسترسی دارد" });
            array.push({ Key: 'msgInvalidFileExtension', Translate: "پسوند فایل نامعتبر است" });
            array.push({ Key: 'msgInvalidFileSize', Translate: "حجم فایل نامعتبر است" });
            array.push({ Key: 'msgErrorUploadingFile', Translate: "خطا در آپلود فایل" });
            array.push({ Key: 'msgCopied', Translate: "کپی شد" });
            break;


        case 'en':
            array.push({ Key: 'hello_world', Translate: "Hello World" });

            array.push({ Key: 'direction', Translate: "ltr" });
            
            array.push({ Key: 'project_name', Translate: "Project Name" });
            
            array.push({ Key: 'copyright', Translate: "All rights reserved." });
            
            array.push({ Key: 'nav_link_home', Translate: "Home" });
            array.push({ Key: 'nav_link_login', Translate: "Login" });
            array.push({ Key: 'nav_link_register', Translate: "Register" });
            array.push({ Key: 'nav_link_logout', Translate: "Sign out" });
            array.push({ Key: 'nav_link_admin_dashboard', Translate: "Admin dashboard" });
            array.push({ Key: 'nav_link_profile', Translate: "Profile" });
            
            array.push({ Key: 'menu_management', Translate: "Management" });
            array.push({ Key: 'menu_media', Translate: "Media" });
            array.push({ Key: 'menu_permission_level_management', Translate: "Permission Level Management" });
            array.push({ Key: 'menu_contact_us', Translate: "Contact Us" });
            array.push({ Key: 'menu_admin_dashboard', Translate: "Dashboard" });
            array.push({ Key: 'menu_post_management', Translate: "Post Management" });
            array.push({ Key: 'menu_media_management', Translate: "Media Management" });
            
            array.push({ Key: 'role_contact_us', Translate: "Contact Us Management" });
            array.push({ Key: 'role_permission_level_management', Translate: "Permission Level Management" });
            array.push({ Key: 'role_slideshow_management', Translate: "Slideshow Management" });
            array.push({ Key: 'role_advertisement_management', Translate: "Advertisement Management" });
            array.push({ Key: 'role_post_management', Translate: "Post Management" });
            array.push({ Key: 'role_media_management', Translate: "Media Management" });
            
            array.push({ Key: 'tab_title_groups', Translate: "Groups" });
            array.push({ Key: 'tab_title_details', Translate: "Details" });
            array.push({ Key: 'tab_title_grouproles', Translate: "Group Roles" });
            array.push({ Key: 'tab_title_groupusers', Translate: "Group Users" });
            array.push({ Key: 'tab_title_allusers', Translate: "All Users" });
            array.push({ Key: 'tab_title_messages', Translate: "Messages" });
            array.push({ Key: 'tab_title_list', Translate: "List" });

            array.push({ Key: 'label_contains', Translate: "contains" });
            array.push({ Key: 'label_doesnotcontain', Translate: "does not contain" });
            array.push({ Key: 'label_equal', Translate: "is equal to" });
            array.push({ Key: 'label_notequal', Translate: "is not equal to" });
            array.push({ Key: 'label_greaterthan', Translate: "greater than" });
            array.push({ Key: 'label_lessthan', Translate: "less than" });
            array.push({ Key: 'label_yes', Translate: "Yes" });
            array.push({ Key: 'label_no', Translate: "No" });
            array.push({ Key: 'label_title', Translate: "Title" });
            array.push({ Key: 'label_username', Translate: "Username" });
            array.push({ Key: 'label_firstname', Translate: "First Name" });
            array.push({ Key: 'label_lastname', Translate: "Last Name" });
            array.push({ Key: 'label_mobile', Translate: "Mobile" });
            array.push({ Key: 'label_grouptitle', Translate: "Group Title" });
            array.push({ Key: 'label_name', Translate: "Name" });
            array.push({ Key: 'label_email', Translate: "Email" });
            array.push({ Key: 'label_subject', Translate: "Subject" });
            array.push({ Key: 'label_message', Translate: "Message" });
            array.push({ Key: 'label_slug', Translate: "Slug" });
            array.push({ Key: 'label_category', Translate: "Category" });
            array.push({ Key: 'label_parent_category', Translate: "Category Type" });
            array.push({ Key: 'label_created_at', Translate: "Created at" });
            array.push({ Key: 'label_updated_at', Translate: "Updated at" });
            array.push({ Key: 'label_status', Translate: "Status" });
            array.push({ Key: 'label_summary', Translate: "Summary" });
            array.push({ Key: 'label_meta_keyword', Translate: "Meta Keyword" });
            array.push({ Key: 'label_meta_description', Translate: "Meta Descripiton" });
            array.push({ Key: 'label_content', Translate: "Content" });
            array.push({ Key: 'label_filename', Translate: "File name" });
            array.push({ Key: 'label_extension', Translate: "Extension" });
            array.push({ Key: 'label_path', Translate: "Path" });
            array.push({ Key: 'label_file', Translate: "File" });
            array.push({ Key: 'label_description', Translate: "Description" });
            array.push({ Key: 'label_thumbnail_path', Translate: "Thumbnail path" });
            array.push({ Key: 'label_size', Translate: "Size (KB)" });
            
            array.push({ Key: 'btn_submit', Translate: "Submit" });
            array.push({ Key: 'btn_cancel', Translate: "Cancel" });
            array.push({ Key: 'btn_new', Translate: "New" });
            array.push({ Key: 'btn_edit', Translate: "Edit" });
            array.push({ Key: 'btn_delete', Translate: "Delete" });
            array.push({ Key: 'btn_select', Translate: "Select" });
            array.push({ Key: 'btn_copy', Translate: "Copy" });
            
            array.push({ Key: 'window_title_selectuser', Translate: "Select user" });
            
            array.push({ Key: 'msg_are_you_sure', Translate: "Are you sure?" });
            
            array.push({ Key: 'msgIsRequired', Translate: "Required" });
            array.push({ Key: 'msgLessThan8Chars', Translate: "Minimum 8 characters" });
            array.push({ Key: 'msgInvalidUsernameOrPassword', Translate: "Username of Password is invalid" });
            array.push({ Key: 'msgPassAndPassConfirmNotSame', Translate: "Password and Repeat Password is not match" });
            array.push({ Key: 'msgUsernameExists', Translate: "Username is duplicated" });
            array.push({ Key: 'msgTitleExists', Translate: "Title is duplicated" });
            array.push({ Key: 'msgSuccessfulCUD', Translate: "Successfully submited" });
            array.push({ Key: 'msgUserExistsInGroup', Translate: "User exists in another group" });
            array.push({ Key: 'msgConstraintGroupRole', Translate: "Group has permission level or user" });
            array.push({ Key: 'msgInvalidFileExtension', Translate: "Invalid file format" });
            array.push({ Key: 'msgInvalidFileSize', Translate: "Invalid file size" });
            array.push({ Key: 'msgErrorUploadingFile', Translate: "Error uploading file" });
            array.push({ Key: 'msgCopied', Translate: "Copied" });
            break;
    }
    
    return array;
}