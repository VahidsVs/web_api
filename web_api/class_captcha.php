<?php
class Captcha
{
    function __construct()
    {

    }
    function createCaptcha()
    {
        // Generate captcha code
        $random_num = md5(random_bytes(64));
        $captcha_code = substr($random_num, 0, 6);
        // Assign captcha in session
        $_SESSION['captchaCode'] = $captcha_code;
        // Create captcha image
        $layer = imagecreatetruecolor(168, 37);
        $captcha_bg = imagecolorallocate($layer, 247, 174, 71);
        imagefill($layer, 0, 0, $captcha_bg);
        $captcha_text_color = imagecolorallocate($layer, 0, 0, 0);
        imagestring($layer, 5, 55, 10, $captcha_code, $captcha_text_color);
        // header("Content-type: image/jpeg");
        //imagejpeg($layer);
        ob_start();
        
        imagejpeg($layer);
        $imgData = ob_get_contents();
        
        ob_end_clean();
        $imgBase64 = base64_encode($imgData);

        return $imgBase64;
    }
    function checkCaptcha($inputCode)
    {
        $isCorrect=false;
        if($inputCode==$_SESSION["captchaCode"])
        $isCorrect=true;
        
        return $isCorrect;

    }
}


?>