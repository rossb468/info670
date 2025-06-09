<?php
header("Content-Type: application/json");

$dbPath = '/home/rb468/sqlite/mytest.db';

try {
	$pdo = new PDO("sqlite:$dbPath");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	$data = json_decode(file_get_contents('php://input'), true);

	if (
		!isset($data['id'], $data['date'], $data['description'], $data['amount'], $data['category']) ||
		!trim($data['id']) || !trim($data['date']) || !trim($data['description']) || !trim($data['amount']) || !trim($data['category'])
	) {
		http_response_code(400);
		echo json_encode(['status' => 'error', 'message' => 'Missing or invalid fields']);
		exit;
	}

	$stmt = $pdo->prepare("INSERT INTO transactions (id, date, description, amount, category) VALUES (:id, :date, :desc, :amt, :cat)");
	$stmt->execute([
	':id' => $data['id'],
        ':date' => $data['date'],
        ':desc' => $data['description'],
        ':amt' => $data['amount'],
        ':cat' => $data['category'],
	]);

	echo  json_encode(['status' => 'success']);
}
catch (PDOException $e) {
	http_response_code(500);
	echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
