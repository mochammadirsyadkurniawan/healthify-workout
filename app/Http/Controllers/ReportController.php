<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ApplyMembership;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    // public function index()
    // {
    //     $memberships = ApplyMembership::all();
    //     return Inertia::render('admin/Report', [
    //         'memberships' => $memberships,
    //     ]);
    // }

    public function index()
    {
        $memberships = ApplyMembership::with('personalTrainer')->get();

        return Inertia::render('admin/Report', [
            'memberships' => $memberships,
        ]);
    }


    public function exportPDF()
    {
        $memberships = ApplyMembership::all();

        $pdf = Pdf::loadView('reports.memberships-pdf', compact('memberships'));
        return $pdf->stream('apply-membership-report.pdf');
    }

    public function exportExcel()
    {
        $memberships = \App\Models\ApplyMembership::select('name', 'email', 'membership', 'status')->get();

        $filename = "membership_report.xls"; 

        $headers = [
            "Content-Type" => "application/vnd.ms-excel",
            "Content-Disposition" => "attachment; filename=$filename",
            "Pragma" => "no-cache",
            "Expires" => "0",
        ];

        $content = '
        <html xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <style>
                table, th, td {
                    border: 1px solid #333;
                    border-collapse: collapse;
                }
                th {
                    background-color: #0D5EAD;
                    color: white;
                    font-weight: bold;
                    text-align: center;
                }
                td {
                    text-align: center;
                    padding: 5px;
                }
            </style>
        </head>
        <body>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Membership</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>';

        foreach ($memberships as $index => $m) {
            $statusColor = match ($m->status) {
                'Accepted' => 'background-color: #c6f6d5; color: #276749;',
                'Rejected' => 'background-color: #fed7d7; color: #c53030;',
                default => 'background-color: #fefcbf; color: #744210;',
            };

            $content .= "
            <tr>
                <td>" . ($index + 1) . "</td>
                <td>{$m->name}</td>
                <td>{$m->email}</td>
                <td>{$m->membership}</td>
                <td style='{$statusColor}'>{$m->status}</td>
            </tr>";
        }

        $content .= '
                </tbody>
            </table>
        </body>
        </html>';

        return response($content, 200, $headers);
    }


    public function exportCSV()
    {
        $fileName = 'membership_report.csv';
        $memberships = ApplyMembership::select('name', 'email', 'membership', 'status')->get();

        $headers = [
            "Content-type" => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        ];

        $callback = function () use ($memberships) {
            $file = fopen('php://output', 'w');
            // Header CSV
            fputcsv($file, ['Name', 'Email', 'Membership', 'Status']);

            foreach ($memberships as $row) {
                fputcsv($file, [
                    $row->name,
                    $row->email,
                    $row->membership,
                    $row->status
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}


// class ReportController extends Controller
// {
//     //

//     public function exportMembershipPDF()
//     {
//         $memberships = ApplyMembership::all();

//         $pdf = Pdf::loadView('reports.memberships-pdf', compact('memberships'));
//         return $pdf->download('apply-membership-report.pdf');
//     }

//     public function index()
//     {
//         $memberships = ApplyMembership::all();

//         return Inertia::render('admin/Report', [
//             'memberships' => $memberships
//         ]);
//     }
// }


