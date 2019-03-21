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
        $currentWeek = $sessions->findSessionsByCurrentWeek(idate("W", time()));
        // $currentMonth = sessions->
        $sessionsYear = $sessions->findSessionsOfCurrentYear();
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

        $currentYear = [
            "January" => "0" ,
            "February" => "0" ,
            "March" => "0" ,
            "April" => "0" ,
            "May" => "0" ,
            "June" => "0" ,
            "July" => "0" ,
            "August" => "0" ,
            "September" => "0" ,
            "October" => "0" ,
            "November" => "0" ,
            "December" => "0" ,
    ];

    foreach ($sessionsYear as $key) {
            if ($key["month"] == "January") {
                $currentYear["January"] = $key["session"];
            }
            if ($key["month"] == "February") {
                $currentYear["February"] = $key["session"];
            }
            if ($key["month"] == "March") {
                $currentYear["March"] = $key["session"];
            }
            if ($key["month"] == "April") {
                $currentYear["April"] = $key["session"];
            }
            if ($key["month"] == "May") {
                $currentYear["May"] = $key["session"];
            }
            if ($key["month"] == "June") {
                $currentYear["June"] = $key["session"];
            }
            if ($key["month"] == "July") {
                $currentYear["July"] = $key["session"];
            }
            if ($key["month"] == "August") {
                $currentYear["August"] = $key["session"];
            }
            if ($key["month"] == "September") {
                $currentYear["September"] = $key["session"];
            }
            if ($key["month"] == "October") {
                $currentYear["October"] = $key["session"];
            }
            if ($key["month"] == "November") {
                $currentYear["November"] = $key["session"];
            }
            if ($key["month"] == "December") {
                $currentYear["December"] = $key["session"];
            }
        }
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
            "currentWeek" => $currentWeek,
            "currentYear" => $currentYear
        ];

        return new JsonResponse($data, 200);
    }
}


