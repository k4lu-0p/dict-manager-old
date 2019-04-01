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
use App\Form\SessionType;
use App\Entity\FlatRate;

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

            return new JsonResponse(['status' => 500]);
        }
    }

    /**
     * @Route("/sessions/create/{id}", name="createSession")
     */
    public function createSession(Customer $customer, ObjectManager $manager, Request $request, FlatRateRepository $flatRateRepository)
    {


        $flatrate = $flatRateRepository->findFlateRateInsufficientSession($customer->getId());
        dump($flatrate);
        die();
        $session = new Session();

        $form = $this->createForm(SessionType::class, $session);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $manager->persist($session);
            $manager->flush();
        } else {
            $render = $this->render('calendar/formCreateSession.html.twig', [
                'form' => $form->createView(),
                'customer' => $customer
            ]);

            return new JsonResponse(['render' => $render->getContent()], 200);
        }

        // TODO: Fouiller dans tout les forfaits du client, et regarder si ils sont tous à 10 sessions.
        // SI un forfait n'est pas à 10 , compléter avec la session créée ici-même.
    }
}
