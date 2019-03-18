<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\FlatRateRepository;
use App\Repository\SessionRepository;
use App\Repository\CustomerRepository;

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
       
        $nbCustomers = count($customers->findAll());
        $nbFlatRates = count($flatRates->findAll());
        $nbSessions = count($sessions->findAll());
        $allCustomers = $customers->findAll();
        $allFlatRates = $flatRates->findAll();
        $allSessions = [];
        $session = [];
        foreach ( $sessions->findByFlatRateAsc() as $key) {
            $test = $key;
            array_push($session, $key["date"]);
            array_push($session, $key["flatRate"]["id"]);
            array_push($allSessions, $session);
            $session = [];
        }

        $dateTest = $sessions->findOneById(2)->getDate();

        $render = $this->render('statistics/show.html.twig');
        $data = [
            'render' => $render->getContent(),
            'nbCustomers' => $nbCustomers,
            'nbFlatRates' => $nbFlatRates,
            'nbSessions' => $nbSessions,
            'customers' => $allCustomers,
            'flatRates' => $allFlatRates,
            'sessions' => $allSessions,
            "dateTest" => $dateTest,
            "test" => $test
        ];

        return new JsonResponse($data, 200);
    }
}
