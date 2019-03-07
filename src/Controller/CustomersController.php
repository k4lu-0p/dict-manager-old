<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CustomerRepository;
use App\Entity\Customer;

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
        // dump($customers);die;
        return $this->render('customers/index.html.twig', [
            'customers' => $customers,
        ]);
    }

// Probleme de autowire

    /**
     * @Route("/show/{id}", name="customer")
     */
    public function showTheCustomer(Customer $customer, CustomerRepository $repo)
    {
        $customer->getId();
        // dump($customer->getId());die;
        return $this->render('customers/index.html.twig', [
            'customer' => $customer,
        ]);
    }

    /**
     * @Route("/edit/{id}", name="editCustomer")
     */
    public function editCustomer(Customer $customer)
    {
        $test = $customer->getId();
        // dump($test);die;
        return $this->render('customers/edit.html.twig', [
            'customer' => $test,
        ]);
    }

    /**
     * @Route("/delete/{id}", name="deleteCustomer")
     */
    public function deleteCustomer(Customer $customer)
    {
        $customer->getId();
        // dump($customers);die;
        return $this->render('customers/index.html.twig', [
            'customer' => $customer,
        ]);
    }
}
