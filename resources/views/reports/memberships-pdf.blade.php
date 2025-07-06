<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Apply Membership Healthify - Report PDF</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            color: #333;
            padding: 20px;
            font-size: 12px;
        }

        h2 {
            text-align: center;
            color: #0D5EAD;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        thead {
            background-color: #0D5EAD;
            color: white;
        }

        th,
        td {
            border: 1px solid #ccc;
            padding: 10px 8px;
            text-align: left;
        }

        th {
            font-weight: bold;
            font-size: 13px;
        }

        td {
            font-size: 12px;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:hover {
            background-color: #f1f7ff;
        }

        td.center,
        th.center {
            text-align: center;
        }

        .footer {
            margin-top: 40px;
            font-size: 11px;
            text-align: right;
            color: #666;
        }
    </style>
</head>

<body>

    <h2>Apply Membership Report - Healthify Workout</h2>

    <table>
        <thead>
            <tr>
                <th class="center">No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Membership</th>
                <th>Personal Trainer</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($memberships as $i => $m)
                <tr>
                    <td class="center">{{ $i + 1 }}.</td>
                    <td>{{ $m->name }}</td>
                    <td>{{ $m->email }}</td>
                    <td>{{ $m->membership }}</td>
                    <td style="text-align: center; vertical-align: middle;">
                        @if ($m->personalTrainer)
                            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                                <img src="{{ public_path('storage/' . $m->personalTrainer->image) }}"
                                    alt="{{ $m->personalTrainer->name }}" width="40" height="40"
                                    style="border-radius: 50%; object-fit: cover;">
                                <div>
                                    <div style="font-weight: bold;">{{ $m->personalTrainer->name }}</div>
                                    <div style="font-size: 11px; color: #666;">{{ $m->personalTrainer->specialty }}
                                    </div>
                                </div>
                            </div>
                        @else
                            N/A
                        @endif
                    </td>
                    <td>{{ ucfirst($m->status) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Generated at: {{ now('Asia/Jakarta')->format('d M Y, H:i') }} WIB
    </div>

</body>

</html>
