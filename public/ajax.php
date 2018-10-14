<?php
    $student_file = "students.json";
    $student_file_content = file_get_contents($student_file);
    $student_list = json_decode($student_file_content, true);

    $operation = $_GET["ops"];
    switch($operation)
    {
        case "list":
            list_all();
            break;
        case "search":
            search($_GET["id"]);
            break;
        case "add":
            add($_GET["id"], $_GET["name"]);
            break;
        case "delete":
            delete($_GET["id"]);
            break;
        default:
            echo "Operation Not Found!";
    }

    function list_all()
    {
        global $student_file_content;
        echo $student_file_content;
    }

    function search($stu_id)
    {
        global $student_list;
        if(array_key_exists($stu_id, $student_list))
            echo $student_list[$stu_id];
        else
            echo "Student Not Found!";
    }

    function add($stu_id, $stu_name)
    {
        global $student_list, $student_file;
        if(array_key_exists($stu_id, $student_list))
        {
            echo "ID already exists!";
        }
        else
        {
            $student_list[$stu_id] = $stu_name;
            file_put_contents($student_file, json_encode($student_list));
            echo "Add Student Success!";
        }
    }

    function delete($stu_id)
    {
        global $student_list, $student_file;
        if(array_key_exists($stu_id, $student_list))
        {
            unset($student_list[$stu_id]);
            file_put_contents($student_file, json_encode($student_list));
            echo "Delete Student Success!";
        }
        else
        {
            echo "Failed! Student ID Not Found!";
        }
    }
?>
