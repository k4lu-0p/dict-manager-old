<?php 

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Customer;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\FlatRateRepository;
use App\Entity\Session;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;

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
    public function updateSession(Session $session, Request $request, ObjectManager $manager)
    {
        $startRaw = $request->request->get('dateStart');
        $endRaw = $request->request->get('dateEnd');

        if ($startRaw && $endRaw) {

            $start = substr($startRaw, 0, strpos($startRaw, '('));
            $end = substr($startRaw, 0, strpos($endRaw, '('));
    
            $dateStart = date('Y-m-d h:i:s', strtotime($start));
            $dateEnd = date('Y-m-d h:i:s', strtotime($end));
    
            $session->setDateStart(new \DateTime($dateStart));
            $session->setDateEnd(new \DateTime($dateEnd));
    
            $manager->persist($session);
            $manager->flush();

            return new JsonResponse(['status' => 200]);
        } else {

            return new JsonResponse(['status' => 500 ]);
        }


    }
}
