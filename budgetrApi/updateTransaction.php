<?php
header("Content-Type: application/json");

$dbPath = '/home/rb468/sqlite/mytest.db';

try {
    $pdo = new PDO("sqlite:$dbPath");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);

    // Validate input
    if (
        !isset($data['id'], $data['date'], $data['description'], $data['amount'], $data['category']) ||
        !trim($data['id']) || !trim($data['date']) || !trim($data['description']) ||
        !trim($data['amount']) || !trim($data['category'])
    ) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Missing or invalid fields']);
        exit;
    }

    // Prepare update query
    $stmt = $pdo->prepare("UPDATE transactions SET date = :date, description = :desc, amount = :amt, category = :cat WHERE id = :id");
    $stmt->execute([
        ':id'   => $data['id'],
        ':date' => $data['date'],
        ':desc' => $data['description'],
        ':amt'  => $data['amount'],
        ':cat'  => $data['category'],
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Transaction not found or no changes made']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
