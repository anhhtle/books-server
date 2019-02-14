const reminderEmailTemplate = (mailData) => {
    return (`
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <style type="text/css">
        * {
            -webkit-font-smoothing: antialiased;
        }
        body {
            Margin: 0;
            padding: 0;
            min-width: 100%;
            font-family: Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            mso-line-height-rule: exactly;
        }
        table {
            border-spacing: 0;
            color: #333333;
            font-family: Arial, sans-serif;
        }
        img {
            border: 0;
        }
        .wrapper {
            width: 100%;
            table-layout: fixed;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        .webkit {
            max-width: 800px;
        }
        .outer {
            Margin: 0 auto;
            width: 100%;
            max-width: 800px;
        }
        .full-width-image img {
            width: 100%;
            max-width: 800px;
            height: auto;
        }
        .inner {
            padding: 10px;
        }
        p {
            Margin: 0;
            padding-bottom: 10px;
        }
        .h1 {
            font-size: 21px;
            font-weight: bold;
            Margin-top: 15px;
            Margin-bottom: 5px;
            font-family: Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .h2 {
            font-size: 18px;
            font-weight: bold;
            Margin-top: 10px;
            Margin-bottom: 5px;
            font-family: Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .one-column .contents {
            text-align: left;
            font-family: Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .one-column p {
            font-size: 14px;
            Margin-bottom: 10px;
            font-family: Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .two-column {
            text-align: center;
            font-size: 0;
        }
        .two-column .column {
            width: 100%;
            max-width: 300px;
            display: inline-block;
            vertical-align: top;
        }
        .contents {
            width: 100%;
        }
        .two-column .contents {
            font-size: 14px;
            text-align: left;
        }
        .two-column img {
            width: 100%;
            max-width: 280px;
            height: auto;
        }
        .two-column .text {
            padding-top: 10px;
        }
        .three-column {
            text-align: center;
            font-size: 0;
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .three-column .column {
            width: 100%;
            max-width: 200px;
            display: inline-block;
            vertical-align: top;
        }
        .three-column .contents {
            font-size: 14px;
            text-align: center;
        }
        .three-column img {
            width: 100%;
            max-width: 180px;
            height: auto;
        }
        .three-column .text {
            padding-top: 10px;
        }
        .img-align-vertical img {
            display: inline-block;
            vertical-align: middle;
        }
        @media only screen and (max-device-width: 480px) {
            table[class=hide], img[class=hide], td[class=hide] {
                display: none !important;
            }
            .contents1 {
                width: 100%;
            }
            .contents1 {
                width: 100%;
            }
    </style>
    <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
        table {border-collapse: collapse !important;}
    </style>
    <![endif]-->
</head>
<body style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;background-color:#f3f2f0;">
<center class="wrapper" style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#f3f2f0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f2f0;" bgcolor="#f3f2f0;">
        <tr>
            <td width="100%"><div class="webkit" style="max-width:800px;Margin:0 auto;">
                    <!--[if (gte mso 9)|(IE)]>
                    <table width="800" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0" >
                        <tr>
                            <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                    <![endif]-->
                    <!-- ======= start main body ======= -->
                    <table class="outer" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0;Margin:0 auto;width:100%;max-width:800px;">
                        <tr>
                            <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                            
                                <!-- ======= start header ======= -->
                                <table border="0" width="100%" cellpadding="0" cellspacing="0"  >
                                    <tr>
                                        <td><table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
                                                <tbody>
                                                <tr>
                                                    <td align="center"><center>
                                                            <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" style="Margin: 0 auto;">
                                                                <tbody>
                                                                <tr>
                                                                    <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0">
                                                                            <tr>
                                                                                <td>&nbsp;</td>
                                                                            </tr>
                                                                        </table></td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </center></td>
                                                </tr>
                                                </tbody>
                                            </table></td>
                                    </tr>
                                </table>
                                <table border="0" width="100%" cellpadding="0" cellspacing="0"  >
                                    <tr>
                                        <td><table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
                                                <tbody>
                                                <tr>
                                                    <td align="center"><center>
                                                            <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" style="Margin: 0 auto;">
                                                                <tbody>
                                                                <tr>
                                                                    <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" bgcolor="#FFFFFF"><!-- ======= start header ======= -->
                                                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-top:1px solid #e8e7e5">
                                                                            <tr>
                                                                                <td>&nbsp;</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <center>
                                                                                        <img src="https://lh3.googleusercontent.com/9CvYzJx3bb6eJW66Q2mwTXwLsJgRAUFmsXrqJDXmJO_a1OU_ms6bTiU9v9-bjEKWURbZn6NzQCJisCu5Oiyw_sOkfHYxNCyg31toL2EKvy61Oct3hwcCm5F6KZh_MfI-BchSKwH1p86QwDiDY74kzkuYUgViNPeY67RFxMiCpi0o8IA6_K283gMlycqmmwU10UqpnzGTKElX0djl6cBJ9Yg4dfA2p4dSpvanAF7g1MhKMxbU08R_UHv1L2Tkgh-7p7zDq85nJ7NAc8sHkOmqZuJx-OXomhB-kFo5kzP5rBHa-LqG0Dy8bRhrh_Kgy5o82P1ozHKr-KRHr5GUzNI62HU-vCz1Pf7rMZk0H4GFaldNTgHD6rvxW-EzMTEXwREBGSpwXK7O9WWi_bvSX_-DNm0bWYFNwE1oQdH5BsaxpPx0rnf58UN73fYIm_gPqgRd6wdYQFArRhYmQe0reH-oygkx32445pUeg9nUJ_inwaJsc9EhL3bb8gn3JjnP8JVi6FB_7SozXsEdW29Unwd3GhoySwWla10AUqLIU9OQCvAQYURPyWFK0ikrxmvbdU9kN1utx0jcAaYd5OI_FefEDNtgcGq_pMUfflZhDrNIpvxibdtn3ZxXUS4vr9Dzu_ZMewxKUsUn7H0djduwR9u1cscTwuAgkWo=w618-h555-no" width="60" style="margin-right: 10px;" alt="" border="0"/>
                                                                                        <h1 style="display: inline-block">The Book's Journey</h1>
                                                                                    </center>
                                                                            </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="two-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:center;font-size:0;" ><!--[if (gte mso 9)|(IE)]>
                                                                                    <table width="100%" style="border-spacing:0" >
                                                                                        <tr>
                                                                                            <td width="20%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:30px;" >
                                                                                    <![endif]-->
                                                                                    <div class="column" style="width:100%;max-width:220px;display:inline-block;vertical-align:top;">
                                                                                    </div>
                                                                                    <!--[if (gte mso 9)|(IE)]>
                                                                                    </td><td width="80%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                                                                                    <![endif]-->
                                                                                    <div class="column" style="width:100%;max-width:515px;display:inline-block;vertical-align:top;">
                                                                                        <table width="100%" style="border-spacing:0">
                                                                                            <tr>
                                                                                                <td class="inner" style="padding-top:0px;padding-bottom:10px; padding-right:10px;padding-left:10px;"><table class="contents" style="border-spacing:0; width:100%" bgcolor="#FFFFFF">
                                                                                                    </table></td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </div>
                                                                                    <!--[if (gte mso 9)|(IE)]>
                                                                                    </td>
                                                                                    </tr>
                                                                                    </table>
                                                                                    <![endif]--></td>
                                                                            </tr>
                                                                        </table></td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </center></td>
                                                </tr>
                                                </tbody>
                                            </table></td>
                                    </tr>
                                </table>
                                <!-- ======= end header ======= -->
                                <!-- ======= start hero image ======= --><!-- ======= end hero image ======= -->
                                <!-- ======= start hero article ======= -->
                                <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom: 30px; border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5" bgcolor="#FFFFFF">
                                    <tr>
                                        <td align="left" style="padding:0px 40px 40px 40px"><p style="padding: 0; color:#262626; font-size:32px; text-align:left; font-family: Verdana, Geneva, sans-serif">Hello ${mailData.name}</p>
                                            <br style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
                                            You requested for a password reset.</br>
                                            Please complete your password reset by clicking the below link</br>
                                            <br />
                                         </p></td>
                                    </tr>
                                    <tr style="margin-bottom: 20px">
                                        <td align="center">
                                            <table border="0" cellpadding="0" cellspacing="0" style="Margin:0 auto;">
                                                <tr>
                                                    <td width="250" height="60" align="center" bgcolor="#2f9780" style="-moz-border-radius: 30px; -webkit-border-radius: 30px; border-radius: 30px;">
                                                        <a href="https://books-app-server-dev.herokuapp.com/password-reset/${mailData.key}" target="_blank" style="width:250; display:block; text-decoration:none; border:0; text-align:center; font-weight:bold;font-size:18px; font-family: Arial, sans-serif; color: #ffffff" class="button_link">Reset password
                                                            <img src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/73ac4376-78ab-4d32-a0b5-b8195202e51f.jpg" width="32" height="17" style="padding-top:5px" alt="" border="0"/>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <!-- ======= end hero article ======= -->
                                <!-- ======= start footer ======= -->
                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                    <tr>
                                        <td height="30">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td height="30">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td height="30">&nbsp;</td>
                                    </tr>
                                </table>
                                <!-- ======= end footer ======= --></td>
                        </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                </div></td>
        </tr>
    </table>
</center>
</body>
</html>
    `)
}

const bookRequestEmailTemplate = (mailData) => {
    return (`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title></title>
        <style type="text/css">
            * {
                -webkit-font-smoothing: antialiased;
            }
            body {
                Margin: 0;
                padding: 0;
                min-width: 100%;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
                mso-line-height-rule: exactly;
            }
            table {
                border-spacing: 0;
                color: #333333;
                font-family: Arial, sans-serif;
            }
            img {
                border: 0;
            }
            .wrapper {
                width: 100%;
                table-layout: fixed;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
            .webkit {
                max-width: 800px;
            }
            .outer {
                Margin: 0 auto;
                width: 100%;
                max-width: 800px;
            }
            .full-width-image img {
                width: 100%;
                max-width: 800px;
                height: auto;
            }
            .inner {
                padding: 10px;
            }
            p {
                Margin: 0;
                padding-bottom: 10px;
            }
            .h1 {
                font-size: 21px;
                font-weight: bold;
                Margin-top: 15px;
                Margin-bottom: 5px;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
            }
            .h2 {
                font-size: 18px;
                font-weight: bold;
                Margin-top: 10px;
                Margin-bottom: 5px;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
            }
            .one-column .contents {
                text-align: left;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
            }
            .one-column p {
                font-size: 14px;
                Margin-bottom: 10px;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
            }
            .two-column {
                text-align: center;
                font-size: 0;
            }
            .two-column .column {
                width: 100%;
                max-width: 300px;
                display: inline-block;
                vertical-align: top;
            }
            .contents {
                width: 100%;
            }
            .two-column .contents {
                font-size: 14px;
                text-align: left;
            }
            .two-column img {
                width: 100%;
                max-width: 280px;
                height: auto;
            }
            .two-column .text {
                padding-top: 10px;
            }
            .three-column {
                text-align: center;
                font-size: 0;
                padding-top: 10px;
                padding-bottom: 10px;
            }
            .three-column .column {
                width: 100%;
                max-width: 200px;
                display: inline-block;
                vertical-align: top;
            }
            .three-column .contents {
                font-size: 14px;
                text-align: center;
            }
            .three-column img {
                width: 100%;
                max-width: 180px;
                height: auto;
            }
            .three-column .text {
                padding-top: 10px;
            }
            .img-align-vertical img {
                display: inline-block;
                vertical-align: middle;
            }
            @media only screen and (max-device-width: 480px) {
                table[class=hide], img[class=hide], td[class=hide] {
                    display: none !important;
                }
                .contents1 {
                    width: 100%;
                }
                .contents1 {
                    width: 100%;
                }
        </style>
        <!--[if (gte mso 9)|(IE)]>
        <style type="text/css">
            table {border-collapse: collapse !important;}
        </style>
        <![endif]-->
    </head>
    <body style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;background-color:#f3f2f0;">
    <center class="wrapper" style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#f3f2f0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f2f0;" bgcolor="#f3f2f0;">
            <tr>
                <td width="100%"><div class="webkit" style="max-width:800px;Margin:0 auto;">
                        <!--[if (gte mso 9)|(IE)]>
                        <table width="800" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0" >
                            <tr>
                                <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                        <![endif]-->
                        <!-- ======= start main body ======= -->
                        <table class="outer" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0;Margin:0 auto;width:100%;max-width:800px;">
                            <tr>
                                <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                                
                                    <!-- ======= start header ======= -->
                                    <table border="0" width="100%" cellpadding="0" cellspacing="0"  >
                                        <tr>
                                            <td><table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
                                                    <tbody>
                                                    <tr>
                                                        <td align="center"><center>
                                                                <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" style="Margin: 0 auto;">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0">
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                </tr>
                                                                            </table></td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </center></td>
                                                    </tr>
                                                    </tbody>
                                                </table></td>
                                        </tr>
                                    </table>
                                    <table border="0" width="100%" cellpadding="0" cellspacing="0"  >
                                        <tr>
                                            <td><table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
                                                    <tbody>
                                                    <tr>
                                                        <td align="center"><center>
                                                                <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" style="Margin: 0 auto;">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" bgcolor="#FFFFFF"><!-- ======= start header ======= -->
                                                                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-top:1px solid #e8e7e5">
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <center>
                                                                                            <img src="https://lh3.googleusercontent.com/9CvYzJx3bb6eJW66Q2mwTXwLsJgRAUFmsXrqJDXmJO_a1OU_ms6bTiU9v9-bjEKWURbZn6NzQCJisCu5Oiyw_sOkfHYxNCyg31toL2EKvy61Oct3hwcCm5F6KZh_MfI-BchSKwH1p86QwDiDY74kzkuYUgViNPeY67RFxMiCpi0o8IA6_K283gMlycqmmwU10UqpnzGTKElX0djl6cBJ9Yg4dfA2p4dSpvanAF7g1MhKMxbU08R_UHv1L2Tkgh-7p7zDq85nJ7NAc8sHkOmqZuJx-OXomhB-kFo5kzP5rBHa-LqG0Dy8bRhrh_Kgy5o82P1ozHKr-KRHr5GUzNI62HU-vCz1Pf7rMZk0H4GFaldNTgHD6rvxW-EzMTEXwREBGSpwXK7O9WWi_bvSX_-DNm0bWYFNwE1oQdH5BsaxpPx0rnf58UN73fYIm_gPqgRd6wdYQFArRhYmQe0reH-oygkx32445pUeg9nUJ_inwaJsc9EhL3bb8gn3JjnP8JVi6FB_7SozXsEdW29Unwd3GhoySwWla10AUqLIU9OQCvAQYURPyWFK0ikrxmvbdU9kN1utx0jcAaYd5OI_FefEDNtgcGq_pMUfflZhDrNIpvxibdtn3ZxXUS4vr9Dzu_ZMewxKUsUn7H0djduwR9u1cscTwuAgkWo=w618-h555-no" width="60" style="margin-right: 10px;" alt="" border="0"/>
                                                                                            <h1 style="display: inline-block">The Book's Journey</h1>
                                                                                        </center>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="two-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:center;font-size:0;" ><!--[if (gte mso 9)|(IE)]>
                                                                                        <table width="100%" style="border-spacing:0" >
                                                                                            <tr>
                                                                                                <td width="20%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:30px;" >
                                                                                        <![endif]-->
                                                                                        <div class="column" style="width:100%;max-width:220px;display:inline-block;vertical-align:top;">
                                            
                                                                                        </div>
                                                                                        <!--[if (gte mso 9)|(IE)]>
                                                                                        </td><td width="80%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                                                                                        <![endif]-->
                                                                                        <div class="column" style="width:100%;max-width:515px;display:inline-block;vertical-align:top;">
                                                                                            <table width="100%" style="border-spacing:0">
                                                                                                <tr>
                                                                                                    <td class="inner" style="padding-top:0px;padding-bottom:10px; padding-right:10px;padding-left:10px;"><table class="contents" style="border-spacing:0; width:100%" bgcolor="#FFFFFF">
                                                                                                        </table></td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </div>
                                                                                        <!--[if (gte mso 9)|(IE)]>
                                                                                        </td>
                                                                                        </tr>
                                                                                        </table>
                                                                                        <![endif]--></td>
                                                                                </tr>
                                                                            </table></td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </center></td>
                                                    </tr>
                                                    </tbody>
                                                </table></td>
                                        </tr>
                                    </table>
                                    <!-- ======= end header ======= -->
                                    <!-- ======= start hero image ======= --><!-- ======= end hero image ======= -->
                                    <!-- ======= start hero article ======= -->
                                    <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom: 30px; border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5" bgcolor="#FFFFFF">
                                        <tr>
                                            <td align="left" style="padding:0px 40px 40px 40px"><p style="padding: 0; color:#262626; font-size:32px; text-align:left; font-family: Verdana, Geneva, sans-serif">Hello ${mailData.name}</p>
                                                <br style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
                                                A user requested your book: <b>${mailData.title}</b>.</br>
                                                Please reply to the request in the app.</br>
                                                <br />
                                             </p></td>
                                        </tr>
                                    </table>
                                    <!-- ======= end hero article ======= -->
                                    <!-- ======= start footer ======= -->
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                        <tr>
                                            <td height="30">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td height="30">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td height="30">&nbsp;</td>
                                        </tr>
                                    </table>
                                    <!-- ======= end footer ======= --></td>
                            </tr>
                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </div></td>
            </tr>
        </table>
    </center>
    </body>
    </html>
    `)
}

const bookRequestCancelledEmailTemplate = (mailData) => {
    return (`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title></title>
        <style type="text/css">
            * {
                -webkit-font-smoothing: antialiased;
            }
            body {
                Margin: 0;
                padding: 0;
                min-width: 100%;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
                mso-line-height-rule: exactly;
            }
            table {
                border-spacing: 0;
                color: #333333;
                font-family: Arial, sans-serif;
            }
            img {
                border: 0;
            }
            .wrapper {
                width: 100%;
                table-layout: fixed;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
            .webkit {
                max-width: 800px;
            }
            .outer {
                Margin: 0 auto;
                width: 100%;
                max-width: 800px;
            }
            .full-width-image img {
                width: 100%;
                max-width: 800px;
                height: auto;
            }
            .inner {
                padding: 10px;
            }
            p {
                Margin: 0;
                padding-bottom: 10px;
            }
            .h1 {
                font-size: 21px;
                font-weight: bold;
                Margin-top: 15px;
                Margin-bottom: 5px;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
            }
            .h2 {
                font-size: 18px;
                font-weight: bold;
                Margin-top: 10px;
                Margin-bottom: 5px;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
            }
            .one-column .contents {
                text-align: left;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
            }
            .one-column p {
                font-size: 14px;
                Margin-bottom: 10px;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
            }
            .two-column {
                text-align: center;
                font-size: 0;
            }
            .two-column .column {
                width: 100%;
                max-width: 300px;
                display: inline-block;
                vertical-align: top;
            }
            .contents {
                width: 100%;
            }
            .two-column .contents {
                font-size: 14px;
                text-align: left;
            }
            .two-column img {
                width: 100%;
                max-width: 280px;
                height: auto;
            }
            .two-column .text {
                padding-top: 10px;
            }
            .three-column {
                text-align: center;
                font-size: 0;
                padding-top: 10px;
                padding-bottom: 10px;
            }
            .three-column .column {
                width: 100%;
                max-width: 200px;
                display: inline-block;
                vertical-align: top;
            }
            .three-column .contents {
                font-size: 14px;
                text-align: center;
            }
            .three-column img {
                width: 100%;
                max-width: 180px;
                height: auto;
            }
            .three-column .text {
                padding-top: 10px;
            }
            .img-align-vertical img {
                display: inline-block;
                vertical-align: middle;
            }
            @media only screen and (max-device-width: 480px) {
                table[class=hide], img[class=hide], td[class=hide] {
                    display: none !important;
                }
                .contents1 {
                    width: 100%;
                }
                .contents1 {
                    width: 100%;
                }
        </style>
        <!--[if (gte mso 9)|(IE)]>
        <style type="text/css">
            table {border-collapse: collapse !important;}
        </style>
        <![endif]-->
    </head>
    <body style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;background-color:#f3f2f0;">
    <center class="wrapper" style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#f3f2f0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f2f0;" bgcolor="#f3f2f0;">
            <tr>
                <td width="100%"><div class="webkit" style="max-width:800px;Margin:0 auto;">
                        <!--[if (gte mso 9)|(IE)]>
                        <table width="800" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0" >
                            <tr>
                                <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                        <![endif]-->
                        <!-- ======= start main body ======= -->
                        <table class="outer" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0;Margin:0 auto;width:100%;max-width:800px;">
                            <tr>
                                <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                                
                                    <!-- ======= start header ======= -->
                                    <table border="0" width="100%" cellpadding="0" cellspacing="0"  >
                                        <tr>
                                            <td><table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
                                                    <tbody>
                                                    <tr>
                                                        <td align="center"><center>
                                                                <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" style="Margin: 0 auto;">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0">
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                </tr>
                                                                            </table></td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </center></td>
                                                    </tr>
                                                    </tbody>
                                                </table></td>
                                        </tr>
                                    </table>
                                    <table border="0" width="100%" cellpadding="0" cellspacing="0"  >
                                        <tr>
                                            <td><table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
                                                    <tbody>
                                                    <tr>
                                                        <td align="center"><center>
                                                                <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" style="Margin: 0 auto;">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" bgcolor="#FFFFFF"><!-- ======= start header ======= -->
                                                                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-top:1px solid #e8e7e5">
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <center>
                                                                                            <img src="https://lh3.googleusercontent.com/9CvYzJx3bb6eJW66Q2mwTXwLsJgRAUFmsXrqJDXmJO_a1OU_ms6bTiU9v9-bjEKWURbZn6NzQCJisCu5Oiyw_sOkfHYxNCyg31toL2EKvy61Oct3hwcCm5F6KZh_MfI-BchSKwH1p86QwDiDY74kzkuYUgViNPeY67RFxMiCpi0o8IA6_K283gMlycqmmwU10UqpnzGTKElX0djl6cBJ9Yg4dfA2p4dSpvanAF7g1MhKMxbU08R_UHv1L2Tkgh-7p7zDq85nJ7NAc8sHkOmqZuJx-OXomhB-kFo5kzP5rBHa-LqG0Dy8bRhrh_Kgy5o82P1ozHKr-KRHr5GUzNI62HU-vCz1Pf7rMZk0H4GFaldNTgHD6rvxW-EzMTEXwREBGSpwXK7O9WWi_bvSX_-DNm0bWYFNwE1oQdH5BsaxpPx0rnf58UN73fYIm_gPqgRd6wdYQFArRhYmQe0reH-oygkx32445pUeg9nUJ_inwaJsc9EhL3bb8gn3JjnP8JVi6FB_7SozXsEdW29Unwd3GhoySwWla10AUqLIU9OQCvAQYURPyWFK0ikrxmvbdU9kN1utx0jcAaYd5OI_FefEDNtgcGq_pMUfflZhDrNIpvxibdtn3ZxXUS4vr9Dzu_ZMewxKUsUn7H0djduwR9u1cscTwuAgkWo=w618-h555-no" width="60" style="margin-right: 10px;" alt="" border="0"/>
                                                                                            <h1 style="display: inline-block">The Book's Journey</h1>
                                                                                        </center>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="two-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:center;font-size:0;" ><!--[if (gte mso 9)|(IE)]>
                                                                                        <table width="100%" style="border-spacing:0" >
                                                                                            <tr>
                                                                                                <td width="20%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:30px;" >
                                                                                        <![endif]-->
                                                                                        <div class="column" style="width:100%;max-width:220px;display:inline-block;vertical-align:top;">
                                            
                                                                                        </div>
                                                                                        <!--[if (gte mso 9)|(IE)]>
                                                                                        </td><td width="80%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                                                                                        <![endif]-->
                                                                                        <div class="column" style="width:100%;max-width:515px;display:inline-block;vertical-align:top;">
                                                                                            <table width="100%" style="border-spacing:0">
                                                                                                <tr>
                                                                                                    <td class="inner" style="padding-top:0px;padding-bottom:10px; padding-right:10px;padding-left:10px;"><table class="contents" style="border-spacing:0; width:100%" bgcolor="#FFFFFF">
                                                                                                        </table></td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </div>
                                                                                        <!--[if (gte mso 9)|(IE)]>
                                                                                        </td>
                                                                                        </tr>
                                                                                        </table>
                                                                                        <![endif]--></td>
                                                                                </tr>
                                                                            </table></td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </center></td>
                                                    </tr>
                                                    </tbody>
                                                </table></td>
                                        </tr>
                                    </table>
                                    <!-- ======= end header ======= -->
                                    <!-- ======= start hero image ======= --><!-- ======= end hero image ======= -->
                                    <!-- ======= start hero article ======= -->
                                    <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom: 30px; border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5" bgcolor="#FFFFFF">
                                        <tr>
                                            <td align="left" style="padding:0px 40px 40px 40px"><p style="padding: 0; color:#262626; font-size:32px; text-align:left; font-family: Verdana, Geneva, sans-serif">Hello ${mailData.name}</p>
                                                <p style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
                                                Your request for <b>${mailData.title}</b> was cancelled.<br>
                                                Your account was refunded 1 book token.<br>
                                                </p>
                                             </p></td>
                                        </tr>
                                    </table>
                                    <!-- ======= end hero article ======= -->
                                    <!-- ======= start footer ======= -->
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                        <tr>
                                            <td height="30">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td height="30">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td height="30">&nbsp;</td>
                                        </tr>
                                    </table>
                                    <!-- ======= end footer ======= --></td>
                            </tr>
                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </div></td>
            </tr>
        </table>
    </center>
    </body>
    </html>
    `)
}

const bookSentEmailTemplate = (mailData) => {
    return (`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title></title>
        <style type="text/css">
            * {
                -webkit-font-smoothing: antialiased;
            }
            body {
                Margin: 0;
                padding: 0;
                min-width: 100%;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
                mso-line-height-rule: exactly;
            }
            table {
                border-spacing: 0;
                color: #333333;
                font-family: Arial, sans-serif;
            }
            img {
                border: 0;
            }
            .wrapper {
                width: 100%;
                table-layout: fixed;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
            .webkit {
                max-width: 800px;
            }
            .outer {
                Margin: 0 auto;
                width: 100%;
                max-width: 800px;
            }
            .full-width-image img {
                width: 100%;
                max-width: 800px;
                height: auto;
            }
            .inner {
                padding: 10px;
            }
            p {
                Margin: 0;
                padding-bottom: 10px;
            }
            .h1 {
                font-size: 21px;
                font-weight: bold;
                Margin-top: 15px;
                Margin-bottom: 5px;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
            }
            .h2 {
                font-size: 18px;
                font-weight: bold;
                Margin-top: 10px;
                Margin-bottom: 5px;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
            }
            .one-column .contents {
                text-align: left;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
            }
            .one-column p {
                font-size: 14px;
                Margin-bottom: 10px;
                font-family: Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
            }
            .two-column {
                text-align: center;
                font-size: 0;
            }
            .two-column .column {
                width: 100%;
                max-width: 300px;
                display: inline-block;
                vertical-align: top;
            }
            .contents {
                width: 100%;
            }
            .two-column .contents {
                font-size: 14px;
                text-align: left;
            }
            .two-column img {
                width: 100%;
                max-width: 280px;
                height: auto;
            }
            .two-column .text {
                padding-top: 10px;
            }
            .three-column {
                text-align: center;
                font-size: 0;
                padding-top: 10px;
                padding-bottom: 10px;
            }
            .three-column .column {
                width: 100%;
                max-width: 200px;
                display: inline-block;
                vertical-align: top;
            }
            .three-column .contents {
                font-size: 14px;
                text-align: center;
            }
            .three-column img {
                width: 100%;
                max-width: 180px;
                height: auto;
            }
            .three-column .text {
                padding-top: 10px;
            }
            .img-align-vertical img {
                display: inline-block;
                vertical-align: middle;
            }
            @media only screen and (max-device-width: 480px) {
                table[class=hide], img[class=hide], td[class=hide] {
                    display: none !important;
                }
                .contents1 {
                    width: 100%;
                }
                .contents1 {
                    width: 100%;
                }
        </style>
        <!--[if (gte mso 9)|(IE)]>
        <style type="text/css">
            table {border-collapse: collapse !important;}
        </style>
        <![endif]-->
    </head>
    <body style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;background-color:#f3f2f0;">
    <center class="wrapper" style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#f3f2f0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f2f0;" bgcolor="#f3f2f0;">
            <tr>
                <td width="100%"><div class="webkit" style="max-width:800px;Margin:0 auto;">
                        <!--[if (gte mso 9)|(IE)]>
                        <table width="800" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0" >
                            <tr>
                                <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                        <![endif]-->
                        <!-- ======= start main body ======= -->
                        <table class="outer" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0;Margin:0 auto;width:100%;max-width:800px;">
                            <tr>
                                <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                                
                                    <!-- ======= start header ======= -->
                                    <table border="0" width="100%" cellpadding="0" cellspacing="0"  >
                                        <tr>
                                            <td><table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
                                                    <tbody>
                                                    <tr>
                                                        <td align="center"><center>
                                                                <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" style="Margin: 0 auto;">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0">
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                </tr>
                                                                            </table></td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </center></td>
                                                    </tr>
                                                    </tbody>
                                                </table></td>
                                        </tr>
                                    </table>
                                    <table border="0" width="100%" cellpadding="0" cellspacing="0"  >
                                        <tr>
                                            <td><table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
                                                    <tbody>
                                                    <tr>
                                                        <td align="center"><center>
                                                                <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" style="Margin: 0 auto;">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" bgcolor="#FFFFFF"><!-- ======= start header ======= -->
                                                                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-top:1px solid #e8e7e5">
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <center>
                                                                                            <img src="https://lh3.googleusercontent.com/9CvYzJx3bb6eJW66Q2mwTXwLsJgRAUFmsXrqJDXmJO_a1OU_ms6bTiU9v9-bjEKWURbZn6NzQCJisCu5Oiyw_sOkfHYxNCyg31toL2EKvy61Oct3hwcCm5F6KZh_MfI-BchSKwH1p86QwDiDY74kzkuYUgViNPeY67RFxMiCpi0o8IA6_K283gMlycqmmwU10UqpnzGTKElX0djl6cBJ9Yg4dfA2p4dSpvanAF7g1MhKMxbU08R_UHv1L2Tkgh-7p7zDq85nJ7NAc8sHkOmqZuJx-OXomhB-kFo5kzP5rBHa-LqG0Dy8bRhrh_Kgy5o82P1ozHKr-KRHr5GUzNI62HU-vCz1Pf7rMZk0H4GFaldNTgHD6rvxW-EzMTEXwREBGSpwXK7O9WWi_bvSX_-DNm0bWYFNwE1oQdH5BsaxpPx0rnf58UN73fYIm_gPqgRd6wdYQFArRhYmQe0reH-oygkx32445pUeg9nUJ_inwaJsc9EhL3bb8gn3JjnP8JVi6FB_7SozXsEdW29Unwd3GhoySwWla10AUqLIU9OQCvAQYURPyWFK0ikrxmvbdU9kN1utx0jcAaYd5OI_FefEDNtgcGq_pMUfflZhDrNIpvxibdtn3ZxXUS4vr9Dzu_ZMewxKUsUn7H0djduwR9u1cscTwuAgkWo=w618-h555-no" width="60" style="margin-right: 10px;" alt="" border="0"/>
                                                                                            <h1 style="display: inline-block">The Book's Journey</h1>
                                                                                        </center>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="two-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:center;font-size:0;" ><!--[if (gte mso 9)|(IE)]>
                                                                                        <table width="100%" style="border-spacing:0" >
                                                                                            <tr>
                                                                                                <td width="20%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:30px;" >
                                                                                        <![endif]-->
                                                                                        <div class="column" style="width:100%;max-width:220px;display:inline-block;vertical-align:top;">
                                            
                                                                                        </div>
                                                                                        <!--[if (gte mso 9)|(IE)]>
                                                                                        </td><td width="80%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                                                                                        <![endif]-->
                                                                                        <div class="column" style="width:100%;max-width:515px;display:inline-block;vertical-align:top;">
                                                                                            <table width="100%" style="border-spacing:0">
                                                                                                <tr>
                                                                                                    <td class="inner" style="padding-top:0px;padding-bottom:10px; padding-right:10px;padding-left:10px;"><table class="contents" style="border-spacing:0; width:100%" bgcolor="#FFFFFF">
                                                                                                        </table></td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </div>
                                                                                        <!--[if (gte mso 9)|(IE)]>
                                                                                        </td>
                                                                                        </tr>
                                                                                        </table>
                                                                                        <![endif]--></td>
                                                                                </tr>
                                                                            </table></td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </center></td>
                                                    </tr>
                                                    </tbody>
                                                </table></td>
                                        </tr>
                                    </table>
                                    <!-- ======= end header ======= -->
                                    <!-- ======= start hero image ======= --><!-- ======= end hero image ======= -->
                                    <!-- ======= start hero article ======= -->
                                    <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom: 30px; border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5" bgcolor="#FFFFFF">
                                        <tr>
                                            <td align="left" style="padding:0px 40px 40px 40px"><p style="padding: 0; color:#262626; font-size:32px; text-align:left; font-family: Verdana, Geneva, sans-serif">Hello ${mailData.name}</p>
                                                <p style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
                                                <b>${mailData.title}</b> is on it's way.<br>
                                                Please notify and/or thanks the book owner in the app when you received the book.<br><br><br>
                                                Happy reading!
                                                </p>
                                             </p></td>
                                        </tr>
                                    </table>
                                    <!-- ======= end hero article ======= -->
                                    <!-- ======= start footer ======= -->
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                        <tr>
                                            <td height="30">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td height="30">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td height="30">&nbsp;</td>
                                        </tr>
                                    </table>
                                    <!-- ======= end footer ======= --></td>
                            </tr>
                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </div></td>
            </tr>
        </table>
    </center>
    </body>
    </html>
    `)
}

module.exports = {reminderEmailTemplate, bookRequestEmailTemplate, bookRequestCancelledEmailTemplate, bookSentEmailTemplate};