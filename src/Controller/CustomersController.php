<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Customer;
use App\Repository\CustomerRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use App\Form\CustomerType;

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
        $customers = $repo-> findAllBySubscribeDate();
        return $this->render('customers/showAllByRecent.html.twig', [
            'customers' => $customers,
        ]);
    }

    /**
     * @Route("/show/{id}", name="showOneCustomer")
     */
    public function showOneCustomer(Customer $customer, CustomerRepository $repo)
    {
        return $this->render('customers/showOne.html.twig', [
            'customer' => $customer
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
            $customer->setCreatedAt(new \DateTime('now +1 hour'));
            $manager->persist($customer);
            $manager->flush();
        };
        return $this->render('customers/addOne.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/edit/{id}", name="editCustomer")
     */
    public function editCustomer(Customer $customer, Request $request, ObjectManager $manager)
    {
        $form = $this->createForm(CustomerType::class, $customer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $manager->persist($customer);
            $manager->flush();
        }

        return $this->render('customers/editOne.html.twig', [
            'form' => $form->createView(),
            'customer_id' => $customer->getId(),
            'customer_firstname' => $customer->getFirstname(),
            'customer_lastname' => $customer->getLastname()
        ]);
    }
}
