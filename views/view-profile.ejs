<?php
include '../../controller/session.php';
include '../../model/database.php';
if(($_SESSION['ID'])){

// fetch the users profile
$id = $_GET['id'];
$query = "SELECT * FROM user WHERE id='$id'";
echo $query;
$result = mysqli_query($connection,$query);
$row = mysqli_fetch_assoc($result);

// for fetching date
$query = "SELECT
u.ID,
DATE_FORMAT(ul.lastEntry,'%Y-%m-%d %h:%i:%S %p') as lastEntry,
DATE_FORMAT(ul.lastExit,'%Y-%m-%d %h:%i:%S %p') as lastExit
FROM user u
INNER JOIN user_log ul
ON u.ID = ul.ID
WHERE u.ID = '$id'
ORDER BY ul.EID desc
";
$firstRow;
$result = mysqli_query($connection,$query);
    while($val = mysqli_fetch_assoc($result)){
            $firstRow = $val;
        break;
        
    };

// for fetching devices
$query="SELECT 
udl.ID,
d.deviceName,
udl.serialNumber,
DATE_FORMAT(MAX(udl.entryDate),'%Y-%m-%d %h:%i %p') as lastEntry,
DATE_FORMAT(MAX(udl.exitDate),'%Y-%m-%d %h:%i %p') as lastExit
FROM user_device_log udl
INNER JOIN device d
ON udl.serialNumber = d.serialNumber
WHERE udl.ID = '$id'
GROUP BY serialNumber
";
$device_result = mysqli_query($connection,$query);




?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/admin-student.css">
        <link rel="stylesheet" href="../css/view-profile.css">
        <link rel="stylesheet" href="../css/student-search.css">
        <script defer src="../js/view-profile.js"></script>
        <script defer src="../js/admin-script.js"></script>
        <script defer src="../js/script.js"></script>

       
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
                <div class="view-profile-header">
                    <h2>Viewing
                        <?php echo ucfirst($row['firstName']).' '.ucfirst($row['lastName']).'\'s ' ?>Profile</h2>
                    <div class="small-nav">
                        <a href=".">Home</a> > <a href="../../view/pages/admin-student.php">Student</a> >
                        <a href="#">
                            <?php echo ucfirst($row['firstName']).' '.ucfirst($row['lastName']).'' ?>
                        </a>
                    </div>
                </div>
                <form class="edit-profile-btn-container" action="../../controller/edit-profile.php" method="post">
                    <input type="text" name="stdid" class="hidden" value="<?php echo $row['ID']?>">

                    <button type="submit" name="edit">Edit Profile</button>
                </form>

                <div class="view-profile-user-profile">
                    <div class="user-img">
                        <img src="<?php echo '../images/upload/'.$row['imgUrl'];   ?>" alt="User">
                    </div>

                    <ul class="other-info">
                        <li class="user-name"><span>Full Name</span>
                            <?php echo ucfirst($row['firstName']).' '.ucfirst($row['lastName'])?>
                        </li>
                        <li class="user-id"><span>Id</span>
                            <?php echo  strtoupper($row['ID'])  ?>
                        </li>
                        <li class="user-gender"><span>Gender</span>
                            <?php echo ucfirst($row['gender'])?>
                        </li>
                        <li class="user-edu-level"><span>Educational Level</span>
                            <?php echo ucfirst($row['user_level'])?>
                        </li>
                        <li class="user-type"><span>User Type</span>
                            <?php echo ucfirst($row['user_type'])?>
                        </li>
                        <li class="user-last-entry"><span>Last Entry</span>
                            <?php if($firstRow['lastEntry']){ echo $firstRow['lastEntry'];}
                         ?>
                        </li>
                        <li class="user-last-exit"><span>Last Exit</span>
                            <?php echo $firstRow['lastExit'] ?>
                        </li>


                    </ul>

                </div>

                <div class="device_container">
                    <!-- title of the info section -->
                    <h2>Registered Devices <button class='btn-add-device' id='open-btn'>Add</button> </h2>

                    <ul class="device_header">
                        <li class="device_id"><span> ID</span></li>
                        <li class="device_name"><span>Device Name</span></li>
                        <li class="device_serial"><span>Serial Number</span></li>
                        <li class="device_entry"><span>Last Entry </span></li>
                        <li class="device_exit"><span>Last Exit </span></li>
                        <li class="action"><span>Action </span></li>
                    </ul>

                    <!-- Devices registered for the user -->
                    <div class="device_list_container">
                        <?php    
                            $count = 1;
                             while($device = mysqli_fetch_assoc($device_result)){
                                
                    ?>



                        <form action="">
                            <ul class="device_list">
                                <li class="device_id"><span><?php echo $count ?></span></li>
                                <li class="device_name"><span><?php echo $device['deviceName'] ?></span></li>
                                <li class="device_serial"><span><?php echo $device['serialNumber'] ?></span></li>
                                <li class="device_entry"><span><?php echo $device['lastEntry'] ?></span></li>
                                <li class="device_exit"><span><?php echo $device['lastExit'] ?></span></li>
                                <li class="action"> <input type="submit" name='submit' value="Edit">
                                                    
                            </li>

                            </ul>
                        </form>

                        <?php
                        $count = $count + 1;
                        }
                        ?>

                    </div>

                </div>
                <div class=" box-container add-device-container" id="add_device_container">
                    <form action="../../controller/add-device.php" method="post" class="add-device-box">
                        <span class='add-device-heading'>Add Device</span>
                        <input type="text" class="hidden" name="id" value="<?php echo $row['ID']?>">
                        <div class="input-label">
                            <label for="deviceName">Device Name</label>
                            <input type="text" name="deviceName" placeholder="Device Name">
                        </div>

                        <div class="input-label">
                            <label for="deviceSerial">Serial Number</label>
                            <input type="text" name="deviceSerial" placeholder="Serial Number">
                        </div>
                        <div class="btn-box">
                            <input type="submit" name="submit" class="btn btn_save">
                            <button class="btn btn_cancel" id="close-import-box" onclick="closeBox('box-container')">Cancel</button>
                        </div>
                    </form>
                </div>
                <!-- Edit Device section -->
                <!-- <div class=" box-container edit-device-container" id="edit_device_container">
                    <form action="../../controller/edit-device.php" method="post" class="add-device-box">
                        <span class='add-device-heading'>Edit Device</span>
                        <input type="text" class="hidden" name="id" value="<?php echo $row['ID']?>">
                        <div class="input-label">
                            <label for="deviceName">Device Name</label>
                            <input type="text" name="deviceName" placeholder="Device Name" id="edit_deviceName">
                        </div>

                        <div class="input-label">
                            <label for="deviceSerial">Serial Number</label>
                            <input type="text" name="deviceSerial" placeholder="Serial Number" id="edit_deviceSerial">
                        </div>
                        <div class="btn-box">
                            <input type="submit" name="submit" class="btn btn_save" value="Save">
                            <button class="btn btn_cancel" id="close-import-box" onclick="closeBox('box-container')">Cancel</button>
                        </div>
                    </form>
                </div> -->



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