<?php 
session_start();
include '../../model/database.php';
unset($_SESSION['page']);   
$_SESSION['page'] = "account";

if(($_SESSION['ID']) && $_SESSION['admin']){
        
    $_SESSION['page'] = "account";
    $query ="SELECT 
        a.userName,
        a.ID,a.email,
        u.firstName,
        u.lastName,u.imgUrl
    from admin a
    inner join user u
    on u.id = a.id
    where a.id = 'ets0512/12';
    ";
    $result = mysqli_query($connection,$query);
    $row;
    if($result){
        while($row1 = mysqli_fetch_assoc($result)){
            $row = $row1;
            break;
        }
    }else{
        $row='';
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="../css/student-search.css"> -->
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/admin-account.css">
    <link rel="stylesheet" href="../css/admin-account-myaccount.css">
    <script defer src="../js/script.js"></script>
    <script defer src="../js/admin-script.js"></script>
    <title>Accounts</title>
</head>

<body>

<?php
include_once('../include/sidebar.php');

?>

        <div class="content-body ">
            <div class="burger-menu-container">

                <img src="../images/burger-menu-white.png" alt="burger menu" id="burgerMenu">
            </div>

            <div class="accounts_section">
                <div class="accounts_list_header">

                    <div class="accounts-nav">
                        <a href="../pages/admin-account-myaccount.php">My Account</a>
                        <a href="../pages/admin-account-manage-account.php">Manage Accounts</a>
                    </div>
                    <div class="personal_setting_box" id="personal_setting_box">
                        <h4 class='personal_setting_header'>
                            Personal Settings
                        </h4>
                        <div class="personal_setting_content">
                            <div class="personal_setting_img_and_change">
                                <img src="../images/upload/<?php echo $row['imgUrl']?>" alt="admin profile">
                                <!-- <div class="personal_setting_btn_box">
                                    <button id="changeProfileBtn">CHANGE</button>
                                </div> -->
                            </div>
                            <div class="personal_setting_values">
                                <div class="input-label">
                                    <label for="userName" readonly>User Name</label>
                                    <input type="text" name="userName" readonly value="<?php echo $row['userName']?>">
                                </div>
                                <div class="input-label">
                                    <label for="email" readonly>User Email Address</label>
                                    <input type="email" readonly value="<?php echo $row['email']?>">
                                </div>
                                <div class="input-label">
                                    <label for="userName" readonly>Organization ID</label>
                                    <input type="text" readonly value="<?php echo $row['ID']?>">
                                </div>
                            </div>
                            <div class="personal_setting_navs">
                                 <button onclick="openBox('personal-change-password','personal_setting_box')">  Change Password </button>
                                <button onclick="openBox('personal-change-email','personal_setting_box')">Change Email Address</button>
                                <!-- <a href="#">Enable Two Factor Authentication</a> -->
                            </div>

                        </div>

                    </div>
                    <form id="personal-change-password" class="personal-change-password" method="POST" action="../../controller/changePass.php">
                        <h4 class='personal_setting_header'>
                            Change Password
                        </h4>
                        <div class="change-password-box">
                            <div class="input-label">
                                <label for="oldPass">
                                    Current Password
                                </label>
                                <input type="password" name="oldPass" id="oldPass" required>
                            </div>
                            <div class="input-label">
                                <label for="newPass">
                                    New Password
                                </label>
                                <input type="password" name="newPass" id="newPass" required>
                            </div>
                            <div class="input-label">
                                <label for="confirmNewPass">
                                    Confirm New Password
                                </label>
                                <input type="password" name="confirmNewPass" id="confirmNewPass" required>
                            </div>
                            <div class="error-section" id="change-pass-err">

                            </div>
                            <div class="change-btn-box">
                                <input type="submit" name="btnSubmit" id="changePass" value="Change Password"  required>
                            </div>



                        </div>



                    </form>
                    <form id="personal-change-email" class="personal-change-email" method="POST" action="../../controller/changePass.php">
                        <h4 class='personal_setting_header'>
                            Change Email
                        </h4>
                        <div class="change-password-box">
                            
                            <div class="input-label">
                                <label for="newEmail">
                                    New Email
                                </label>
                                <input type="email" name="newEmail" id="newEmail" required>
                            </div>
                            <div class="input-label">
                                <label for="admin-password">
                                     Password
                                </label>
                                <input type="password" name="admin-password" id="admin-password" required>
                            </div>
                           
                            <div class="error-section" id="change-email-err">

                            </div>
                            <div class="change-btn-box">
                                <input type="submit" name="btnSubmit2" id="changeEmail" value="Change Email" >
                            </div>



                        </div>



                    </form>
                </div>
             

            </div>
            <div id="submitstatus">
                       
                       </div>
    </main>



</body>

</html>
<?php 
    }
    else{
        header("Location: ../../index.php ");
    }
?>