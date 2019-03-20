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
        $allSessions = $sessions->findAll();

        $session = [];
        $sessionsByFlatRate = [];
        $currentFlatRateSessions = [];

        foreach ($allFlatRates as $flatRate) {
            foreach ($flatRate->getSessions() as $key) {
                array_push($session, $key->getId());
                array_push($session, $key->getDate());
                // Numero de semaine
                array_push($session, idate("W", ($key->getDate())->format("U")));
                array_push($currentFlatRateSessions, $session);
                $session = [];
            }
            // Tableau final des forfaits
            array_push($sessionsByFlatRate, $currentFlatRateSessions);
            $currentFlatRateSessions = [];
        }

        // $sessionsByWeek = [];
        // $week = [];
        // foreach ($sessions->findByDateAsc() as $key) {
        //     array_push($week, "");
        // }






        $render = $this->render('statistics/show.html.twig');
        $data = [
            'render' => $render->getContent(),
            'nbCustomers' => $nbCustomers,
            'nbFlatRates' => $nbFlatRates,
            'nbSessions' => $nbSessions,
            'customers' => $allCustomers,
            'flatRates' => $allFlatRates,
            'sessionsByFlatRate' => $sessionsByFlatRate,
            // "sessionsByWeek" = $sessionsByWeek,
            "dateTest" => $sessions->findOneById(2)->getDate(),
        ];

        return new JsonResponse($data, 200);
    }
}
