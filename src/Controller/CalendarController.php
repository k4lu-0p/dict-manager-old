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
use App\Entity\Bill;

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

        $render = $this->render('calendar/showForOne.html.twig', [
            'customer' => $customer
        ]);

        if (count($customer->getFlatRates()) > 0) {
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

            return new JsonResponse([
                'render' => $render->getContent(),
                'flatrates' => $flatrates
            ], 200);
        } else {
            return new JsonResponse([
                'render' => $render->getContent(),
                // 'flatrates' => $flatrates
            ], 200);
        }
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
    public function createSession(Customer $customer, ObjectManager $manager, Request $request)
    {

        $flatratePrice = 3000;

        $session = new Session();
        $form = $this->createForm(SessionType::class, $session);
        $form->handleRequest($request);


        $allFlatrates = $customer->getFlatRates()->getValues();
        $lastFlatRate = end($allFlatrates);
        $lastFlatRateNumberSession = $lastFlatRate ? $lastFlatRate->getSessionNumber() : $lastFlatRate;
        
        if ($form->isSubmitted()) {

            $data = $request->request->get('session');
            $session->setDateStart(new \DateTime($data['dateStart']));
            $session->setDateEnd(new \DateTime($data['dateEnd']));

            $session->setFree($data['free']);

            if (count($customer->getFlatRates()) == 0 || $lastFlatRateNumberSession >= 10) {

                if ($data['free']) {
                    $flatratePrice -= 300;
                }

                $flatrate = new FlatRate();
                $flatrate->setCreatedAt(new \DateTime('now'));
                $flatrate->setCustomer($customer);
                $flatrate->setPrice($flatratePrice);
                $flatrate->setSessionNumber(1);
                $manager->persist($flatrate);

                $session->setFlatRate($flatrate);
                $manager->persist($session);

                $bill = new Bill();
                $bill->setCreatedAt(new \DateTime('now'));
                $bill->setCustomer($customer);
                $bill->setTax(0);
                $bill->setFlatRate($flatrate);
                $manager->persist($bill);
            } elseif ($lastFlatRateNumberSession < 10) {

                $lastFlatRate->setSessionNumber($lastFlatRateNumberSession + 1);
                $session->setFlatRate($lastFlatRate);
                $manager->persist($session);
            }

            $manager->flush();

            return new JsonResponse([
                'sessionId' => $session->getId(),
                'numberFlatrate' => count($allFlatrates)
            ], 200);
        } else {

            $render = $this->render('calendar/formCreateSession.html.twig', [
                'form' => $form->createView(),
                'customer' => $customer,

            ]);

            return new JsonResponse(['render' => $render->getContent()], 200);
        }

        // TODO: Fouiller dans tout les forfaits du client, et regarder si ils sont tous à 10 sessions.
        // SI un forfait n'est pas à 10 , compléter avec la session créée ici-même.
    }
}
