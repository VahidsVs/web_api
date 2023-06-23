<?php
class Codes
{
    #region Users
    public  const msg_isRequired = "msgIsRequired"; //is empty!
    public  const msg_isLessThan8chars = "msgLessThan8Chars"; //Username is less than 8 characters!
    public  const msg_invalidUsernameOrPassword = "msgInvalidUsernameOrPassword"; //Invalid username!
    public  const msg_invalidCaptchaInput = "msgInvalidCaptchaInput"; //Invalid username!
    public  const msg_PassAndPassConfirmNotSame = "msgPassAndPassConfirmNotSame"; //Password and password confirm are not the same! 
    public  const msg_usernameExists = "msgUsernameExists"; //Successful Create, Update, Delete
    public  const msg_groupTitleExists = "msgTitleExists"; //Successful Create, Update, Delete
    public  const msg_constraintRoleInGroup= "msgConstraintRoleInGroup"; //Successful Create, Update, Delete
    public  const msg_constraintGroupRole= "msgConstraintGroupRole"; //Successful Create, Update, Delete
    public  const msg_constraintUserInGroup= "msgConstraintUserInGroup"; //Successful Create, Update, Delete
    public  const msg_userExistsInGroup= "msgUserExistsInGroup"; //Successful Create, Update, Delete
    public  const msg_SuccessfulCUD = "msgSuccessfulCUD"; //Successful Create, Update, Delete
    #endregion
}
?>