<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = 'ecvick@berkeley.edu';
    $from_name = $_POST['name'];
    $from_email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Validate input data (you should add more validation as needed)

    if (!filter_var($from_email, FILTER_VALIDATE_EMAIL)) {
        echo 'Invalid email address.';
    } else {
        // Build the email headers
        $headers = 'From: ' . $from_name . ' <' . $from_email . ">\r\n";
        $headers .= 'Reply-To: ' . $from_email . "\r\n";

        // Send the email
        if (mail($to, $subject, $message, $headers)) {
            echo 'Email sent successfully.';
        } else {
            echo 'Error sending email.';
        }
    }
}
?>
