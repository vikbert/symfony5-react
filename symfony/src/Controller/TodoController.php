<?php

declare(strict_types = 1);

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

final class TodoController extends AbstractController
{
    public function list(LoggerInterface $logger)
    {
        $tasks = [
            ['id' => 1, 'title' => 'install firefox', 'completed' => false],
            ['id' => 2, 'title' => 'install chrome', 'completed' => false],
            ['id' => 3, 'title' => 'install safari', 'completed' => false],
        ];

        return JsonResponse::create($tasks);
    }
}
