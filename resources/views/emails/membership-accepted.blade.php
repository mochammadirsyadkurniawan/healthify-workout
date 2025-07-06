<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Membership Diterima</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #eeeeee;
        }
        .header h1 {
            color: #4CAF50;
            margin: 0;
        }
        .content {
            padding: 20px 0;
        }
        .content p {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #aaaaaa;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>Selamat, {{ $membership->user->name }}!</h1>
    </div>

    <div class="content">
        <p>Pengajuan membership Anda telah <strong>diterima</strong> 🎉.</p>

        <p><strong>Jenis Membership:</strong> {{ $membership->membership_type }}</p>
        <p><strong>Status:</strong> <span style="color: #4CAF50;">Diterima</span></p>

        <p>Terima kasih telah bergabung bersama kami! Kami tidak sabar untuk melihat Anda berlatih bersama kami 💪.</p>
        <a href="{{ url('/') }}" class="button">Kunjungi Website Kami</a>
    </div>
    <div class="footer">
        &copy; {{ date('Y') }} Nama Gym Kamu. Semua Hak Dilindungi.
    </div>
</div>
</body>
</html>
