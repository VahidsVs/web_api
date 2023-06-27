export function getLangResources(lcid: string){

    let array: any = [];

    switch (lcid) {
        case 'fa':
            array.push({ Key: 'hello_world', Translate: "سلام جهان" });

            array.push({ Key: 'direction', Translate: "rtl" });
            
            array.push({ Key: 'copyright', Translate: "کلیه حقوق مادی و معنوی این سایت محفوظ می باشد." });
            
            array.push({ Key: 'nav_link_home', Translate: "صفحه اصلی" });
            array.push({ Key: 'nav_link_login', Translate: "ورود" });
            array.push({ Key: 'nav_link_register', Translate: "ثبت نام" });
            array.push({ Key: 'nav_link_logout', Translate: "خروج" });
            array.push({ Key: 'nav_link_admin_dashboard', Translate: "داشبورد مدیریت" });
            array.push({ Key: 'nav_link_profile', Translate: "پروفایل" });
            array.push({ Key: 'nav_link_forget_password', Translate: "فراموشی کلمه عبور" });
            
            array.push({ Key: 'menu_home', Translate: "صفحه اصلی" });
            array.push({ Key: 'menu_login', Translate: "ورود" });
            array.push({ Key: 'menu_unauthorized', Translate: "ورود غیر مجاز" });
            array.push({ Key: 'menu_register', Translate: "ثبت نام" });
            array.push({ Key: 'menu_profile', Translate: "پروفایل" });
            array.push({ Key: 'menu_my_home', Translate: "صفحه من" });
            array.push({ Key: 'menu_contact_us', Translate: "ارتباط با ما" });
            array.push({ Key: 'menu_about_us', Translate: "درباره ما" });
            array.push({ Key: 'menu_impressum', Translate: "اثر" });
            
            array.push({ Key: 'title_login', Translate: "ورود به سامانه" });
            array.push({ Key: 'subtitle_login', Translate: "وارد شوید!" });

            array.push({ Key: 'tab_title_editprofile', Translate: "ویرایش پروفایل" });
            array.push({ Key: 'tab_title_resetpassword', Translate: "تغییر کلمه عبور" });

            array.push({ Key: 'label_username', Translate: "نام کاربری (پست الکترونیک)" });
            array.push({ Key: 'label_password', Translate: "کلمه عبور" });
            array.push({ Key: 'label_password_confirm', Translate: "تکرار کلمه عبور" });
            array.push({ Key: 'label_remember_me', Translate: "مرا به خاطر بسپار" });
            array.push({ Key: 'label_firstname', Translate: "نام" });
            array.push({ Key: 'label_lastname', Translate: "نام خانوادگی" });
            array.push({ Key: 'label_mobile', Translate: "موبایل" });
            array.push({ Key: 'label_email', Translate: "پست الکترونیک" });
            array.push({ Key: 'label_currentpassword', Translate: "کلمه عبور فعلی" });
            
            array.push({ Key: 'btn_submit', Translate: "ثبت" });
            array.push({ Key: 'btn_edit', Translate: "ویرایش" });
            
            array.push({ Key: 'msg_unauthorized', Translate: "شما به این صفحه دسترسی ندارید." });
            array.push({ Key: 'msg_unauthorized_desc', Translate: "در صورت نیاز با مدیریت تماس بگیرید." });
            
            array.push({ Key: 'msgIsRequired', Translate: "اجباری است" });
            array.push({ Key: 'msgLessThan8Chars', Translate: "حداقل 8 کاراکتر باشد" });
            array.push({ Key: 'msgInvalidUsernameOrPassword', Translate: "نام کاربری یا کلمه عبور اشتباه است" });
            array.push({ Key: 'msgPassAndPassConfirmNotSame', Translate: "کلمه عبور و تایید آن یکی نیست" });
            array.push({ Key: 'msgUsernameExists', Translate: "نام کاربری تکراری است" });
            array.push({ Key: 'msgTitleExists', Translate: "عنوان تکراری است" });
            array.push({ Key: 'msgInvalidCaptchaInput', Translate: "کد امنیتی اشتباه است" });
            array.push({ Key: 'msgSuccessfulCUD', Translate: "عملیات با موفقیت انجام شد" });
            break;


        case 'en':
            array.push({ Key: 'hello_world', Translate: "Hello World" });

            array.push({ Key: 'direction', Translate: "ltr" });
            
            array.push({ Key: 'copyright', Translate: "All rights reserved." });
            
            array.push({ Key: 'nav_link_home', Translate: "Home" });
            array.push({ Key: 'nav_link_login', Translate: "Login" });
            array.push({ Key: 'nav_link_register', Translate: "Register" });
            array.push({ Key: 'nav_link_logout', Translate: "Sign out" });
            array.push({ Key: 'nav_link_admin_dashboard', Translate: "Admin dashboard" });
            array.push({ Key: 'nav_link_profile', Translate: "Profile" });
            array.push({ Key: 'nav_link_forget_password', Translate: "Forget Password" });
            
            array.push({ Key: 'menu_home', Translate: "Home" });
            array.push({ Key: 'menu_login', Translate: "Login" });
            array.push({ Key: 'menu_unauthorized', Translate: "Access Denied" });
            array.push({ Key: 'menu_register', Translate: "Register" });
            array.push({ Key: 'menu_profile', Translate: "Profile" });
            array.push({ Key: 'menu_my_home', Translate: "My Page" });
            array.push({ Key: 'menu_contact_us', Translate: "Contact Us" });
            array.push({ Key: 'menu_about_us', Translate: "About Us" });
            array.push({ Key: 'menu_impressum', Translate: "Impressum" });
            
            array.push({ Key: 'title_login', Translate: "Login to system" });
            array.push({ Key: 'subtitle_login', Translate: "Login!" });

            array.push({ Key: 'tab_title_editprofile', Translate: "Edit Profile" });
            array.push({ Key: 'tab_title_resetpassword', Translate: "Reset Password" });

            array.push({ Key: 'label_username', Translate: "Username (Email)" });
            array.push({ Key: 'label_password', Translate: "Password" });
            array.push({ Key: 'label_password_confirm', Translate: "Repeat Password" });
            array.push({ Key: 'label_remember_me', Translate: "Remember Me" });
            array.push({ Key: 'label_firstname', Translate: "First Name" });
            array.push({ Key: 'label_lastname', Translate: "Last Name" });
            array.push({ Key: 'label_mobile', Translate: "Mobile" });
            array.push({ Key: 'label_email', Translate: "Email" });
            array.push({ Key: 'label_currentpassword', Translate: "Current Password" });
            
            array.push({ Key: 'btn_submit', Translate: "Submit" });
            array.push({ Key: 'btn_edit', Translate: "Edit" });
            
            array.push({ Key: 'msg_unauthorized', Translate: "Unauthorized request." });
            array.push({ Key: 'msg_unauthorized_desc', Translate: "Contact to admin team." });
            
            array.push({ Key: 'msgIsRequired', Translate: "Required" });
            array.push({ Key: 'msgLessThan8Chars', Translate: "Minimum 8 characters" });
            array.push({ Key: 'msgInvalidUsernameOrPassword', Translate: "Username or Password is invalid" });
            array.push({ Key: 'msgPassAndPassConfirmNotSame', Translate: "Password and Repeat Password is not match" });
            array.push({ Key: 'msgUsernameExists', Translate: "Username is duplicated" });
            array.push({ Key: 'msgTitleExists', Translate: "Title is duplicated" });
            array.push({ Key: 'msgInvalidCaptchaInput', Translate: "Invalid captcha code input" });
            array.push({ Key: 'msgSuccessfulCUD', Translate: "Successfully submited" });
            break;
    }
    
    return array;
}