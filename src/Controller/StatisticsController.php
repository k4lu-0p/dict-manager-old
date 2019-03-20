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
        $flatRateSessions = [];
        $currentFlatRateSessions = [];
        foreach ($allFlatRates as $flatRate) {

            foreach ($flatRate->getSessions() as $key) {

                array_push($session, $key->getId());
                array_push($session, $key->getDate());
                array_push($session, idate("W", ($key->getDate())->format("U")));
                array_push($currentFlatRateSessions, $session);
                $session = [];
            }

            // Tableau final des forfaits
            array_push($flatRateSessions, $currentFlatRateSessions);
            $currentFlatRateSessions = [];
        }
        $render = $this->render('statistics/show.html.twig');
        $data = [
            'render' => $render->getContent(),
            'nbCustomers' => $nbCustomers,
            'nbFlatRates' => $nbFlatRates,
            'nbSessions' => $nbSessions,
            'customers' => $allCustomers,
            'flatRates' => $allFlatRates,
            'sessions' => $flatRateSessions,
            "dateTest" => $sessions->findOneById(2)->getDate(),
        ];

        return new JsonResponse($data, 200);
    }
}
