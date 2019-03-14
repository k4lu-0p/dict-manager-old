<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\CustomerRepository;
use App\Repository\FlatRateRepository;
use App\Repository\SessionRepository;

/**
 * @Route("/app/statistics")
 * 
 */
class StatisticsController extends AbstractController
{
    /**
     * @Route("/", name="statistics")
     */
    public function showStatistics(CustomerRepository $customers, FlatRateRepository $flatRates, SessionRepository $sessions)
    {
        // return $this->render('statistics/show.html.twig', [
        // ]);
        $nbCustomers = 0;
        $nbFlatRates = 0;
        $nbSessions = 0;

        foreach ($customers->findAll() as $key) {
            $nbCustomers++;
        }
        foreach ($flatRates->findAll() as $key) {
            $nbFlatRates++;
        }
        foreach ($sessions->findAll() as $key) {
            $nbSessions++;
        }

        $data = [];
        $render = $this->render('statistics/show.html.twig');
        array_push($data,$render);
        array_push($data, $nbCustomers);
        array_push($data, $nbFlatRates);
        array_push($data, $nbSessions);
        return new JsonResponse($data, 200);
    }
}
