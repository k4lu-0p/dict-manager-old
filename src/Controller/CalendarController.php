<?php 

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Customer;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\FlatRateRepository;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/app/calendar")
 */
class CalendarController extends AbstractController
{

    /**
     * @Route("/session/customer/{id}", name="getSessionsCustomer")
     */
    public function getSessionsCustomer(Customer $customer, FlatRateRepository $flatRateRepository)
    {

        foreach ($customer->getFlatRates() as $flatrate) {

            $sessionsDates = [];

            foreach ($flatrate->getSessions() as $session) {

                $sessionsDates[] = [
                    'id' => $session->getId(),
                    'start' => $session->getDateStart(),
                    'end' => $session->getDateEnd()
                ];
            }

            $flatrates[] = $sessionsDates;
        }



        $render = $this->render('calendar/showForOne.html.twig', [
            'customer' => $customer
        ]);

        return new JsonResponse([
            'render' => $render->getContent(),
            'flatrates' => $flatrates
        ], 200);
    }

    /**
     * @Route("/session/update/{id}", name="updateSession")
     */
    public function updateSession(Session $session, Request $request)
    {
        dump($request->getContent());
        die();

        // TODO: Récuperer le contenu du la requete PUT
    }
}
