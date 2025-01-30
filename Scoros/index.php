<?php

function compareFiles($inputFile1, $inputFile2, $outputFile1, $outputFile2)
{
    $lines1 = array_map('rtrim', file($inputFile1, FILE_IGNORE_NEW_LINES));
    $lines2 = array_map('rtrim', file($inputFile2, FILE_IGNORE_NEW_LINES));

    $uniqueLines1 = array_unique($lines1);
    $uniqueLines2 = array_unique($lines2);

    $output1 = fopen($outputFile1, 'w');
    $output2 = fopen($outputFile2, 'w');

    foreach ($lines1 as $line) {
        if (!in_array($line, $uniqueLines2, true)) {
            fwrite($output1, $line . PHP_EOL);
        }
    }

    foreach ($lines2 as $line) {
        if (!in_array($line, $uniqueLines1, true)) {
            fwrite($output2, $line . PHP_EOL);
        }
    }

    fclose($output1);
    fclose($output2);
}

try {
    compareFiles('file1.txt', 'file2.txt', 'output1.txt', 'output2.txt');
    echo "Files processed successfully.\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
