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
     * @Route("/show/all", name="customers")
     */
    public function showCustomers(CustomerRepository $repo)
    {
        $customers = $repo->findAll();
        return $this->render('customers/index.html.twig', [
            'customers' => $customers,
        ]);
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
            $manager->persist($customer);
            $manager->flush();
        }
        return $this->render('customers/add.html.twig', [
            'form' => $form->createView()
            ]);
    }

    /**
     * @Route("/show/{id}", name="showCustomer")
     */
    public function showCustomer(Customer $customer){
        return $this->render('customers/details.html.twig', [
            'customerId' => $customer->getId()
            ]);
    }

    /**
     * @Route("/edit/{id}", name="editCustomer")
     */
    public function editCustomer(Request $request, ObjectManager $manager, Customer $customer){
        
        $form = $this->createForm(CustomerType::class, $customer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $manager->persist($customer);
            $manager->flush();
        }
        
        return $this->render('customers/edit.html.twig', [
            'customer_firstname' => $customer->getFirstname(),
            'customer_lastname' => $customer->getLastname(),
            'customer_id' => $customer->getId(),
            'form' => $form->createView()
            ]);

    }

    /**
     * @Route("/delete/{id}", name="deleteCustomer")
     */
    public function deleteCustomer(Customer $customer){
        return $this->render('customers/delete.html.twig', [
            'customerFirstname' => $customer->getFirstname(),
            'customerLastname' => $customer->getLastname()
            ]);
    }
}
