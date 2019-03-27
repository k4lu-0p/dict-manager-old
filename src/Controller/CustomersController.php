<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Customer;
use App\Repository\CustomerRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use App\Form\CustomerType;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use App\Service\Makani;
use Proxies\__CG__\App\Entity\FlatRate;
use App\Form\FlaterateType;
use App\Entity\Session;

/**
 * @Route("/app/customers")
 */
class CustomersController extends AbstractController
{
    /**
     * @Route("/show/all", name="showAllcustomers")
     */
    public function showAllCustomers(CustomerRepository $repo)
    {
        $customers = $repo->findAllByAlphabeticalLastName();
        return $this->render('customers/showAll.html.twig', [
            'customers' => $customers,
        ]);
    }

    /**
     * @Route("/show/ajax", name="showAllcustomersAjax")
     */
    public function showAllCustomersAjax(CustomerRepository $repo)
    {
        $customers = $repo->findAllByAlphabeticalLastName();
        return $this->render('customers/showAllAjax.html.twig', [
            'customers' => $customers,
        ]);
    }

    /**
     * @Route("/show/alphabetics", name="showAllcustomersByAlphabetics")
     */
    public function showAllCustomersByAlphabetics(CustomerRepository $repo)
    {
        $customers = $repo->findAllByAlphabeticalLastName();
        return $this->render('customers/showAllByAlphabetics.html.twig', [
            'customers' => $customers,
        ]);
    }

    /**
     * @Route("/show/recent", name="showAllcustomersByRecent")
     */
    public function showAllCustomersByRecent(CustomerRepository $repo)
    {
        $customers = $repo->findAllBySubscribeDate();
        return $this->render('customers/showAllByRecent.html.twig', [
            'customers' => $customers,
        ]);
    }

    /**
     * @Route("/show/{id}", name="showOneCustomer")
     */
    public function showOneCustomer(Customer $customer, CustomerRepository $repo)
    {
        $coord = ['lat' => '', 'lng' => ''];

        if (strlen($customer->getAddressNumber()) == 10) {
            $makani_no = substr_replace($customer->getAddressNumber(), " ", -5, -6);
            $data = Makani::Query($makani_no)->toJson();
            $coord['lat'] = $data->lat;
            $coord['lng'] = $data->lng;
        }

        return $this->render('customers/showOne.html.twig', [
            'customer' => $customer,
            'coord' => $coord
        ]);
    }

    /**
     * @Route("/delete/{id}", name="deleteOneCustomer")
     */
    public function deleteOneCustomer($id, ObjectManager $manager)
    {
        $repo = $this->getDoctrine()->getRepository(Customer::class);
        $manager->remove($repo->find($id));
        $manager->flush();

        return $this->redirectToRoute('showAllcustomers');
    }

    /**
     * @Route("/add", name="addCustomer")
     */
    public function addCustomer(Request $request, ObjectManager $manager)
    {
        $customer = new Customer();

        $form = $this->createForm(CustomerType::class, $customer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $file = $form->get('picture')->getData();

            $fileName = $this->generateUniqueFileName() . '.' . $file->guessExtension();

            try {
                $file->move(
                    $this->getParameter('pictures_directory'),
                    $fileName
                );
            } catch (FileException $e) { }

            $customer->setPicture($fileName);
            $customer->setCreatedAt(new \DateTime('now +1 hour'));
            $manager->persist($customer);
            $manager->flush();

            return $this->redirectToRoute('showAllcustomers');
        } else {
            return $this->render('customers/addOne.html.twig', [
                'form' => $form->createView()
            ]);
        };
    }

    /**
     * @return string
     */
    private function generateUniqueFileName()
    {
        return md5(uniqid());
    }

    /**
     * @Route("/edit/{id}", name="editCustomer")
     */
    public function editCustomer(Customer $customer, Request $request, ObjectManager $manager)
    {
        $form = $this->createForm(CustomerType::class, $customer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $file = $form->get('picture')->getData();

            if ($file != null) {

                $fileName = $this->generateUniqueFileName() . '.' . $file->guessExtension();

                try {
                    $file->move(
                        $this->getParameter('pictures_directory'),
                        $fileName
                    );
                } catch (FileException $e) { }

                $customer->setPicture($fileName);
            } else {
                $customer->setPicture('user.png');
            }

            $manager->persist($customer);
            $manager->flush();

            return $this->redirectToRoute('showAllcustomers');
        } else {
            return $this->render('customers/editOne.html.twig', [
                'form' => $form->createView(),
                'customer_id' => $customer->getId(),
                'customer_firstname' => $customer->getFirstname(),
                'customer_lastname' => $customer->getLastname()
            ]);
        }
    }

    /**
     * @Route("/search", name="searchCustomer")
     */
    public function searchCustomer(Request $request, CustomerRepository $repo)
    {
        $res = $repo->findBySearch($request->get('search'));
        return $this->render('customers/search.html.twig', [
            'customers' => $res
        ]);
    }
}
