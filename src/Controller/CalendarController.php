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
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Repository\SessionRepository;
use App\Repository\CustomerRepository;

/**
 * @Route("/app/calendar")
 */
class CalendarController extends AbstractController
{

    /**
     * @Route("/session/all", name="getAllSessions")
     */
    public function getAllSessions(CustomerRepository $repo) {

        
        $allCustomer = $repo->findAll();

        foreach ($allCustomer as $customer) {
           
            foreach ($customer->getFlatRates() as $flatrate) {
    
                $sessionsDates = [];
    
                foreach ($flatrate->getSessions() as $session) {
    
                    $sessionsDates[] = [
                        'id' => $session->getId(),
                        'firstname' => $customer->getFirstname(),
                        'lastname' => $customer->getLastname(),
                        'start' => $session->getDateStart(),
                        'end' => $session->getDateEnd()
                    ];
                }
    
                $flatrates[] = $sessionsDates;
            }
        }

        // dump($flatrates);
        // die();
        
        return new JsonResponse($flatrates);
    }

    /**
     * @Route("/session/customer/{id}", name="getSessionsCustomer")
     */
    public function getSessionsCustomer(Customer $customer)
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
     * @Route("/session/update/{id}", name="updateSessionDrop")
     */
    public function updateByDropSession(Session $session, Request $request, ObjectManager $manager, ValidatorInterface $validator)
    {
        $startRaw = $request->request->get('dateStart');
        $endRaw = $request->request->get('dateEnd');


        if ($startRaw && $endRaw) {

            $start = substr($startRaw, 0, strpos($startRaw, '('));
            $end = substr($endRaw, 0, strpos($endRaw, '('));

            $dateStart = date('Y-m-d h:i:s', strtotime($start));
            $dateEnd = date('Y-m-d h:i:s', strtotime($end));

            $session->setDateStart(new \DateTime($dateStart));
            $session->setDateEnd(new \DateTime($dateEnd));

            $errors = $validator->validate($session);

            if (count($errors) > 0) {

                $errorsString = (string)$errors;
                return new JsonResponse(['error' => $errorsString]);
            } else {

                $manager->persist($session);
                $manager->flush();

                return new JsonResponse(['status' => 200]);
            }
        } else {

            return new JsonResponse(['status' => 500]);
        }
    }

    /**
     * @Route("/sessions/create/{id}", name="createSession")
     */
    public function createSession(Customer $customer, ObjectManager $manager, Request $request, ValidatorInterface $validator,  FlatRateRepository $repo)
    {

        $flatratePrice = 3000;

        $session = new Session();
        $form = $this->createForm(SessionType::class, $session);
        $form->handleRequest($request);
        $currentFlatrate = $this->getGoodCurrentFlatRate($customer);

        if ($form->isSubmitted()) {

            $data = $request->request->get('session');
            $session->setDateStart(\DateTime::createFromFormat('d/m/Y H:i a', $data['dateStart']));
            $session->setDateEnd(\DateTime::createFromFormat('d/m/Y H:i a', $data['dateEnd']));
            $session->setFree(filter_var($data['free'], FILTER_VALIDATE_BOOLEAN));

            if (!$currentFlatrate) {

                if (filter_var($data['free'], FILTER_VALIDATE_BOOLEAN)) {
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
            } else {

                $currentFlatratePrice = $currentFlatrate->getPrice();
                $currentFlatrateNumberSession = $currentFlatrate->getSessionNumber();

                if (filter_var($data['free'], FILTER_VALIDATE_BOOLEAN)) {
                    $currentFlatratePrice -= 300;
                }

                $currentFlatrate->setSessionNumber($currentFlatrateNumberSession + 1);
                $currentFlatrate->setPrice($currentFlatratePrice);
                $session->setFlatRate($currentFlatrate);
                $manager->persist($session);
            }

            $errors = $validator->validate($session);

            if (count($errors) > 0) {
                $errorsString = (string)$errors;
                return new JsonResponse(['error' => $errorsString]);
            } else {

                $manager->flush();

                return new JsonResponse([
                    'sessionId' => $session->getId(),
                    'numberFlatrate' => count($repo->findBy(['customer' => $customer]))
                ], 200);
            }
        } else {

            $render = $this->render('calendar/formCreateSession.html.twig', [
                'form' => $form->createView(),
                'customer' => $customer,
            ]);

            return new JsonResponse(['render' => $render->getContent()], 200);
        }
    }

    private function getGoodCurrentFlatRate($customer)
    {
        $all = $customer->getFlatRates()->getValues();
        foreach ($all as $flatrate) {
            if ($flatrate->getSessionNumber()  < 10) {
                return $flatrate;
                break;
            }
        }
    }

    /**
     * @Route("/sessions/modify/{id}", name="updateSession")
     */
    public function updateByFormSession(Session $session, Request $request, ObjectManager $manager)
    {
        $form = $this->createForm(SessionType::class, $session);
        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            $data = $request->request->get('session');
            $session->setDateStart(new \DateTime($data['dateStart']));
            $session->setDateEnd(new \DateTime($data['dateEnd']));
            $session->setFree(filter_var($data['free'], FILTER_VALIDATE_BOOLEAN));

            $currentFlatrate = $session->getFlatRate();
            $currentFlatratePrice = $currentFlatrate->getPrice();

            if (filter_var($data['free'], FILTER_VALIDATE_BOOLEAN)) {
                $currentFlatratePrice -= 300;
            } else {
                $currentFlatratePrice += 300;
            }

            $currentFlatrate->setPrice($currentFlatratePrice);
            $manager->persist($session);
            $manager->flush();

            return new JsonResponse([
                'status' => 200,
            ], 200);
        } else {

            $render = $this->render('calendar/formUpdateDeleteSession.html.twig', [
                'form' => $form->createView(),
                'session' => $session
            ]);

            return new JsonResponse([
                'render' => $render->getContent(),
            ], 200);
        }
    }

    /**
     * @Route("/sessions/delete/{id}", name="deleteSession")
     */
    public function deleteSession(Session $session, ObjectManager $manager)
    {
        $flatrate = $session->getFlatRate();
        $nbSession = $flatrate->getSessionNumber();

        if ($nbSession > 1) {
            $flatrate->setSessionNumber($nbSession - 1);
        } else {
            $manager->remove($flatrate);
        }

        $manager->remove($session);
        $manager->flush();

        return new JsonResponse([
            'status' => 200,
        ], 200);
    }
}
