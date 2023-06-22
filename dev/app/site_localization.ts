export function getLangResources(){
    // Define arrays how many language you want to translate
    var fa: any = new Array();
    var en: any = new Array();
    
    // caption tag name <<fa>>
    fa['hello_world'] = "سلام جهان"; 

    fa['direction'] = "rtl",
    
    fa['copyright'] = "کلیه حقوق مادی و معنوی این سایت محفوظ می باشد.";

    fa['nav_link_home'] = "صفحه اصلی";
    fa['nav_link_login'] = "ورود";
    fa['nav_link_register'] = "ثبت نام";
    fa['nav_link_logout'] = "خروج";
    fa['nav_link_admin_dashboard'] = "داشبورد مدیریت";
    fa['nav_link_forget_password'] = "فراموشی کلمه عبور";
    
    fa['/'] = "صفحه اصلی";
    fa['/index.html'] = "صفحه اصلی";
    fa['/login.html'] = "ورود";
    fa['/access-denied.html'] = "ورود غیر مجاز";
    fa['/register.html'] = "ثبت نام";
    fa['/my-home.html'] = "صفحه من";
    fa['/contact-us.html'] = "ارتباط با ما";
    fa['/about-us.html'] = "درباره ما";
    
    fa['title_login'] = "ورود به سامانه";
    fa['subtitle_login'] = "وارد شوید!";
    
    fa['label_username'] = "نام کاربری (پست الکترونیک):";
    fa['label_password'] = "کلمه عبور:";
    fa['label_password_confirm'] = "تکرار کلمه عبور:";
    fa['label_remember_me'] = "مرا به خاطر بسپار";
    fa['label_firstname'] = "نام:";
    fa['label_lastname'] = "نام خانوادگی:";
    fa['label_mobile'] = "موبایل:";
    fa['label_email'] = "پست الکترونیک:";

    fa['msg_unauthorized'] = "شما به این صفحه دسترسی ندارید.";
    fa['msg_unauthorized_desc'] = "در صورت نیاز با مدیریت تماس بگیرید.";

    fa['msgIsRequired'] = "اجباری است";
    fa['msgLessThan8Chars'] = "حداقل 8 کاراکتر باشد";
    fa['msgInvalidUsernameOrPassword'] = "نام کاربری یا کلمه عبور اشتباه است";
    fa['msgPassAndPassConfirmNotSame'] = "کلمه عبور و تایید آن یکی نیست";
    fa['msgUsernameExists'] = "نام کاربری تکراری است";
    fa['msgTitleExists'] = "عنوان تکراری است";
    fa['msgInvalidCaptchaInput'] = "کد امنیتی اشتباه است";
    fa['msgSuccessfulCUD'] = "عملیات با موفقیت انجام شد";

    // caption tag name <<en>>
    en['hello_world'] = "Hello World";

    en['direction'] = "ltr",
    
    en['copyright'] = "All rights reserved.";

    en['nav_link_home'] = "Home";
    en['nav_link_login'] = "Login";
    en['nav_link_register'] = "Register";
    en['nav_link_logout'] = "Sign out";
    en['nav_link_admin_dashboard'] = "Admin dashboard";
    en['nav_link_forget_password'] = "Forget Password";
    
    en['/'] = "Home";
    en['/index.html'] = "Home";
    en['/login.html'] = "Login";
    en['/access-denied.html'] = "Access Denied";
    en['/register.html'] = "Register";
    en['/my-home.html'] = "My Page";
    en['/contact-us.html'] = "Contact Us";
    en['/about-us.html'] = "About Us";
    
    en['title_login'] = "Login to system";
    en['subtitle_login'] = "login!";
    
    en['label_username'] = "Username (Email):";
    en['label_password'] = "Password:";
    en['label_password_confirm'] = "Repeat Password:";
    en['label_remember_me'] = "Remember Me";
    en['label_firstname'] = "First Name:";
    en['label_lastname'] = "Last Name:";
    en['label_mobile'] = "Mobile:";
    en['label_email'] = "Email:";

    en['msg_unauthorized'] = "Unauthorized request.";
    en['msg_unauthorized_desc'] = "Contact to admin team.";

    en['msgIsRequired'] = "Required";
    en['msgLessThan8Chars'] = "Minimum 8 characters";
    en['msgInvalidUsernameOrPassword'] = "Username of Password is invalid";
    en['msgPassAndPassConfirmNotSame'] = "Password and Repeat Password is not match";
    en['msgUsernameExists'] = "Username is duplicated";
    en['msgTitleExists'] = "Title is duplicated";
    fa['msgInvalidCaptchaInput'] = "Invalid captcha code input";
    en['msgSuccessfulCUD'] = "Successfully submited";
    
    // Added new array defined arrays.
    var resources: any = new Array();
    resources['fa'] = fa;
    resources['en'] = en;
    
    return resources;
}